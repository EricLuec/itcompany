'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';

export type Sector = {
    id: number;
    name: string;
};

export type Building = {
    id: number;
    name: string;
    description: string;
    city: string;
    capacity: number;
    buildingDate: string;
    sectorList: Sector[];
};

type BuildingContextType = {
    buildings: Building[];
    loading: boolean;
    refreshBuildings: () => Promise<void>;
};

const BuildingContext = createContext<BuildingContextType | undefined>(undefined);

export const BuildingProvider = ({ children }: { children: ReactNode }) => {
    const [buildings, setBuildings] = useState<Building[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchBuildings = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:8080/buildings');
            const data: Building[] = await res.json();
            setBuildings(data);
        } catch (err) {
            console.error('Fetch buildings error:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBuildings();
    }, [fetchBuildings]);

    return (
        <BuildingContext.Provider value={{ buildings, loading, refreshBuildings: fetchBuildings }}>
            {children}
        </BuildingContext.Provider>
    );
};

export const useBuildings = () => {
    const context = useContext(BuildingContext);
    if (!context) {
        throw new Error('useBuildings must be used within a BuildingProvider');
    }
    return context;
};
