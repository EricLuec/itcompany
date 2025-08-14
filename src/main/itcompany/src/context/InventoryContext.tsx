'use client'
import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

export type Inventory = { id: number; name: string };

type InventoryContextType = {
    inventories: Inventory[];
    loading: boolean;
    refreshInventories: () => Promise<void>;
};

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export function InventoryProvider({ children }: { children: ReactNode }) {
    const [inventories, setInventories] = useState<Inventory[]>([]);
    const [loading, setLoading] = useState(true);

    const refreshInventories = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:8080/inventory');
            const data = await res.json();
            setInventories(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        refreshInventories().catch(console.error);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <InventoryContext.Provider value={{ inventories, loading, refreshInventories }}>
            {children}
        </InventoryContext.Provider>
    );
}

export function useInventories() {
    const context = useContext(InventoryContext);
    if (!context) throw new Error('useInventories must be used within InventoryProvider');
    return context;
}