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
    deleteSector: (id: number) => Promise<void>;
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

    const deleteSector = async (id: number) => {
        try {
            const res = await fetch(`http://localhost:8080/sectors/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                throw new Error('Failed to delete sector');
            }

            setSectors((prevSectors) => prevSectors.filter((sector) => sector.id !== id));
        } catch (err) {
            console.error('Error deleting sector:', err);
        }
    };

    useEffect(() => {
        fetchSectors();
    }, []);

    return (
        <SectorContext.Provider value={{ sectors, refreshSectors: fetchSectors, deleteSector }}>
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
