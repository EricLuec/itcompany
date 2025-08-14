'use client'
import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

export type Inventory = { id: number; name: string; description: string; items: {
        description: string;
        id: number; name: string; price: number }[]; responsibleEmployee?: { firstName: string; lastName: string }; building?: { name: string }; createdDate: string };

type InventoryContextType = {
    inventories: Inventory[];
    loading: boolean;
    refreshInventories: () => Promise<void>;
    deleteInventory: (id: number) => Promise<void>;
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

    const deleteInventory = async (id: number) => {
        try {
            // Löschen des Inventars vom Server
            const res = await fetch(`http://localhost:8080/inventory/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                throw new Error('Failed to delete inventory');
            }

            setInventories((prevInventories) => prevInventories.filter((inv) => inv.id !== id));
        } catch (err) {
            console.error('Error deleting inventory:', err);
        }
    };

    useEffect(() => {
        refreshInventories().catch(console.error);
    }, [refreshInventories]);

    return (
        <InventoryContext.Provider value={{ inventories, loading, refreshInventories, deleteInventory }}>
            {children}
        </InventoryContext.Provider>
    );
}

export function useInventories() {
    const context = useContext(InventoryContext);
    if (!context) throw new Error('useInventories must be used within InventoryProvider');
    return context;
}
