'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type SalaryClass = 'A' | 'B' | 'C' | 'D';

export type Sector = {
    id: number;
    name: string;
    description: string;
    salaryClass: SalaryClass;
};

type SectorContextType = {
    sectors: Sector[];
    refreshSectors: () => Promise<void>;
};

const SectorContext = createContext<SectorContextType | undefined>(undefined);

export const SectorProvider = ({ children }: { children: ReactNode }) => {
    const [sectors, setSectors] = useState<Sector[]>([]);

    const fetchSectors = async () => {
        try {
            const res = await fetch('http://localhost:8080/sectors');
            const data: Sector[] = await res.json();
            setSectors(data);
        } catch (err) {
            console.error('Failed to fetch sectors:', err);
        }
    };

    useEffect(() => {
        fetchSectors();
    }, []);

    return (
        <SectorContext.Provider value={{ sectors, refreshSectors: fetchSectors }}>
            {children}
        </SectorContext.Provider>
    );
};

export const useSectors = () => {
    const context = useContext(SectorContext);
    if (!context) {
        throw new Error('useSectors must be used within a SectorProvider');
    }
    return context;
};
