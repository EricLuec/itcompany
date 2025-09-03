'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Sector {
    id: number;
    name: string;
    code: string;
}

export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    salary: number;
    hireDate: string;
    manager?: string;
    items?: any[];
    sector?: Sector;
}

interface EmployeeContextType {
    employees: Employee[];
    setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
    addEmployee: (employee: Employee) => void;
    refreshEmployees: () => Promise<void>;
    deleteEmployee: (id: number) => Promise<void>;
    editEmployee: (id: number, updatedEmployee: Employee) => Promise<void>;
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

    const deleteEmployee = async (id: number) => {
        try {
            const res = await fetch(`http://localhost:8080/employees/${id}`, { method: 'DELETE' });

            if (!res.ok) throw new Error(`Fehler beim Löschen: ${res.status}`);

            // Mitarbeiter aus dem State entfernen
            setEmployees((prev) => prev.filter((e) => e.id !== id));
        } catch (err) {
            console.error(err);
            alert('Löschen fehlgeschlagen.');
        }
    };

    const editEmployee = async (id: number, updatedEmployee: Employee) => {
        try {
            const res = await fetch(`http://localhost:8080/employees/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedEmployee),
            });

            if (!res.ok) throw new Error(`Fehler beim Bearbeiten: ${res.status}`);

            setEmployees((prev) =>
                prev.map((e) => (e.id === id ? { ...e, ...updatedEmployee } : e))
            );
        } catch (err) {
            console.error(err);
            alert('Bearbeiten fehlgeschlagen.');
        }
    };

    const addEmployee = (employee: Employee) => {
        setEmployees((prev) => [...prev, employee]);
    };

    useEffect(() => {
        refreshEmployees();
    }, []);

    return (
        <EmployeeContext.Provider value={{ employees, setEmployees, addEmployee, refreshEmployees, deleteEmployee, editEmployee }}>
            {children}
        </EmployeeContext.Provider>
    );
};

export const useEmployeeContext = () => {
    const context = useContext(EmployeeContext);
    if (!context) {
        throw new Error('useEmployeeContext must be used within EmployeeProvider');
    }
    return context;
};

export const useEmployees = () => useEmployeeContext();
