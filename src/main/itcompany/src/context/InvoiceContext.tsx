'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

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
};

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export function InvoiceProvider({ children }: { children: ReactNode }) {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8080/invoices')
            .then((res) => res.json())
            .then((json) => {
                setInvoices(json);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Fetch error:', err);
                setLoading(false);
            });
    }, []);

    return (
        <InvoiceContext.Provider value={{ invoices, setInvoices, loading }}>
            {children}
        </InvoiceContext.Provider>
    );
}

export function useInvoices() {
    const context = useContext(InvoiceContext);
    if (!context) throw new Error('useInvoices must be used within an InvoiceProvider');
    return context;
}
