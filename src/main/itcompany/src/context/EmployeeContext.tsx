'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    salary: number;
    hireDate: string;
    manager?: string;
    items?: any[];
}

interface EmployeeContextType {
    employees: Employee[];
    setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
    addEmployee: (employee: Employee) => void;
    refreshEmployees: () => Promise<void>;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export const EmployeeProvider = ({ children }: { children: ReactNode }) => {
    const [employees, setEmployees] = useState<Employee[]>([]);

    // Employees vom Backend laden
    const refreshEmployees = async () => {
        try {
            const res = await fetch('http://localhost:8080/employees');
            if (!res.ok) throw new Error(`Fehler beim Laden: ${res.status}`);
            const data: Employee[] = await res.json();
            setEmployees(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        refreshEmployees();
    }, []);

    const addEmployee = (employee: Employee) => {
        setEmployees(prev => [...prev, employee]);
    };

    return (
        <EmployeeContext.Provider value={{ employees, setEmployees, addEmployee, refreshEmployees }}>
            {children}
        </EmployeeContext.Provider>
    );
};

// Hook für Komponenten
export const useEmployeeContext = () => {
    const context = useContext(EmployeeContext);
    if (!context) {
        throw new Error('useEmployeeContext must be used within EmployeeProvider');
    }
    return context;
};

// Optional: Hook mit allen Methoden für die EmployeePage
export const useEmployees = () => useEmployeeContext();
