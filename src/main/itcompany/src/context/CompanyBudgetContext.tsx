'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type CompanyBudget = {
    id: number;
    name: string;
    description: string;
    totalFunds: number;
    reservedFunds: number;
    availableFunds: number;
};

type BudgetContextType = {
    budgets: CompanyBudget[];
    loading: boolean;
    refreshBudgets: () => void;
    addBudget: (budget: Omit<CompanyBudget, 'id'>) => Promise<void>;
    updateBudget: (budget: CompanyBudget) => Promise<void>;
    deleteBudget: (id: number) => Promise<void>;
};

const BudgetContext = createContext<BudgetContextType>({
    budgets: [],
    loading: true,
    refreshBudgets: () => {},
    addBudget: async () => {},
    updateBudget: async () => {},
    deleteBudget: async () => {},
});

export const BudgetProvider = ({ children }: { children: ReactNode }) => {
    const [budgets, setBudgets] = useState<CompanyBudget[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchBudgets = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:8080/companyBudget');
            const data = await res.json();
            setBudgets(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
            setBudgets([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBudgets();
    }, []);

    const addBudget = async (budget: Omit<CompanyBudget, 'id'>) => {
        try {
            const res = await fetch('http://localhost:8080/companyBudget', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(budget),
            });
            const newBudget = await res.json();
            setBudgets(prev => [...prev, newBudget]);
        } catch (err) {
            console.error(err);
        }
    };

    const updateBudget = async (budget: CompanyBudget) => {
        try {
            const res = await fetch(`http://localhost:8080/companyBudget/${budget.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(budget),
            });
            if (!res.ok) throw new Error('Update failed');
            setBudgets(prev => prev.map(b => (b.id === budget.id ? budget : b)));
        } catch (err) {
            console.error(err);
        }
    };

    const deleteBudget = async (id: number) => {
        try {
            const res = await fetch(`http://localhost:8080/companyBudget/${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Delete failed');
            setBudgets(prev => prev.filter(b => b.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <BudgetContext.Provider
            value={{ budgets, loading, refreshBudgets: fetchBudgets, addBudget, updateBudget, deleteBudget }}
        >
            {children}
        </BudgetContext.Provider>
    );
};

export const useBudgets = () => useContext(BudgetContext);
