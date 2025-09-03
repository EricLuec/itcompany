'use client';
import {createContext, useContext, useEffect, useState, ReactNode, useCallback} from 'react';

export type InvoiceStatus = 'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE';

export type CompanyBudget = {
    id: number;
    name: string;
};

export type Invoice = {
    id: number;
    client: string;
    companyBudget: CompanyBudget | null;
    issueDate: string;
    dueDate: string;
    totalAmount: number;
    status: InvoiceStatus;
};

type InvoiceContextType = {
    invoices: Invoice[];
    setInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>;
    loading: boolean;
    deleteInvoice: (id: number) => Promise<void>;
};

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export function InvoiceProvider({ children }: { children: ReactNode }) {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);

    const refreshInvoices = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:8080/invoices');
            const data = await res.json();
            setInvoices(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteInvoice = async (id: number) => {
        try {
            const res = await fetch(`http://localhost:8080/invoices/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                throw new Error('Failed to delete invoice');
            }

            setInvoices((prevInventories) => prevInventories.filter((inv) => inv.id !== id));
        } catch (err) {
            console.error('Error deleting inventory:', err);
        }
    };

    useEffect(() => {
        refreshInvoices().catch(console.error);
    }, [refreshInvoices]);

    return (
        <InvoiceContext.Provider value={{ invoices, setInvoices, loading, deleteInvoice }}>
            {children}
        </InvoiceContext.Provider>
    );
}

export function useInvoices() {
    const context = useContext(InvoiceContext);
    if (!context) throw new Error('useInvoices must be used within an InvoiceProvider');
    return context;
}
