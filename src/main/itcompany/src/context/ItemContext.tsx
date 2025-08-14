'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Inventory = {
    id: number;
    name: string;
};

export type Employee = {
    id: number;
    firstName: string;
    lastName: string;
};

export type Item = {
    id: number;
    name: string;
    description: string;
    category: string;
    price: number;
    purchaseDate: string;
    inventory: Inventory | null;
    employee: Employee | null;
};

type ItemContextType = {
    items: Item[];
    inventories: Inventory[];
    employees: Employee[];
    loading: boolean;
    refreshData: () => Promise<void>;
    deleteItem: (id: number) => Promise<void>;
    updateItemEmployee: (itemId: number, employeeId: number | null) => Promise<void>;
};

const ItemContext = createContext<ItemContextType | undefined>(undefined);

export function ItemProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<Item[]>([]);
    const [inventories, setInventories] = useState<Inventory[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [itemsRes, inventoriesRes, employeesRes] = await Promise.all([
                fetch('http://localhost:8080/items'),
                fetch('http://localhost:8080/inventory'),
                fetch('http://localhost:8080/employees'),
            ]);
            const [itemsData, inventoriesData, employeesData] = await Promise.all([
                itemsRes.json(),
                inventoriesRes.json(),
                employeesRes.json(),
            ]);
            setItems(itemsData);
            setInventories(inventoriesData);
            setEmployees(employeesData);
        } catch (err) {
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refreshData = async () => {
        await fetchData();
    };

    const deleteItem = async (id: number) => {
        if (!confirm('Diesen Artikel wirklich löschen?')) return;
        try {
            const res = await fetch(`http://localhost:8080/items/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Delete failed');
            setItems((prev) => prev.filter((item) => item.id !== id));
        } catch (err) {
            console.error(err);
            alert('Löschen fehlgeschlagen.');
        }
    };

    const updateItemEmployee = async (itemId: number, employeeId: number | null) => {
        const item = items.find((i) => i.id === itemId);
        if (!item) return;

        const updatedItem = {
            ...item,
            employee: employeeId ? { id: employeeId } : null,
        };

        try {
            const res = await fetch(`http://localhost:8080/items/${itemId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedItem),
            });
            if (!res.ok) throw new Error('Update failed');
            const responseItem = await res.json();
            setItems((prev) => prev.map((i) => (i.id === itemId ? responseItem : i)));
        } catch (err) {
            console.error(err);
            alert('Update fehlgeschlagen.');
        }
    };

    return (
        <ItemContext.Provider
            value={{ items, inventories, employees, loading, refreshData, deleteItem, updateItemEmployee }}
        >
            {children}
        </ItemContext.Provider>
    );
}

export function useItems() {
    const context = useContext(ItemContext);
    if (!context) throw new Error('useItems must be used within an ItemProvider');
    return context;
}
