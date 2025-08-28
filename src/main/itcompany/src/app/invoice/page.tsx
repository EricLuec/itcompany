'use client';
import { useEffect, useState } from 'react';
import { useBudgets } from '@/context/CompanyBudgetContext';
import {useInvoices} from "@/context/InvoiceContext";

export type InvoiceStatus = 'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE';

export type Invoice = {
    id: number;
    client: string;
    companyBudgetId: number | null;
    issueDate: string;
    dueDate: string;
    totalAmount: number;
    status: InvoiceStatus;
};

export default function InvoicePage() {
    const { invoices, setInvoices} = useInvoices();
    const [filtered, setFiltered] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);

    const [clientFilter, setClientFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState<InvoiceStatus | ''>('');

    useEffect(() => {
        fetch('http://localhost:8080/invoices')
            .then((res) => res.json())
            .then((data) => {
                setInvoices(data);
                setFiltered(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Fetch error:', err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        let result = invoices;

        if (clientFilter) {
            result = result.filter((inv) =>
                inv.client.toLowerCase().includes(clientFilter.toLowerCase())
            );
        }

        if (statusFilter) {
            result = result.filter((inv) => inv.status === statusFilter);
        }

        setFiltered(filtered);
    }, [clientFilter, statusFilter, invoices]);

    async function deleteInvoice(id: number) {
        if (!confirm('Diese Rechnung wirklich löschen?')) return;

        try {
            const res = await fetch(`http://localhost:8080/invoices/${id}`, {
                method: 'DELETE',
                mode: 'cors',
            });

            if (!res.ok) {
                throw new Error(`Fehler beim Löschen: ${res.status}`);
            }

            setInvoices((prev) => prev.filter((inv) => inv.id !== id));
        } catch (err) {
            console.error(err);
            alert('Löschen fehlgeschlagen.');
        }
    }

    if (loading) {
        return <div className="text-center py-10 text-gray-500">Loading Data…</div>;
    }

    const getBudgetName = (budgetId: number | null) => {
        if (!budgetId) return '-';
        const budget = invoices.find((b) => b.id === budgetId);
        return budget ? budget.client : '-';
    };

    return (
        <div className="p-6 space-y-6">
            <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
                <h2 className="text-lg font-semibold">Filter</h2>
                <div className="flex flex-wrap gap-4">
                    <input
                        type="text"
                        placeholder="Search for client..."
                        className="border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        value={clientFilter}
                        onChange={(e) => setClientFilter(e.target.value)}
                    />

                    <select
                        className="border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as InvoiceStatus | '')}
                    >
                        <option value="">Status</option>
                        <option value="DRAFT">Draft</option>
                        <option value="SENT">Sent</option>
                        <option value="PAID">Paid</option>
                        <option value="OVERDUE">Overdue</option>
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
                    <thead>
                    <tr className="bg-blue-500 text-white text-left">
                        <th className="px-6 py-3">ID</th>
                        <th className="px-6 py-3">Client</th>
                        <th className="px-6 py-3">Budget</th>
                        <th className="px-6 py-3">Issue Date</th>
                        <th className="px-6 py-3">Due Date</th>
                        <th className="px-6 py-3">Total Amount</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Aktionen</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filtered.map((inv) => (
                        <tr key={inv.id} className="border-t hover:bg-blue-50 transition">
                            <td className="px-6 py-4">{inv.id}</td>
                            <td className="px-6 py-4">{inv.client}</td>
                            <td className="px-6 py-4">{getBudgetName(inv.companyBudgetId)}</td>
                            <td className="px-6 py-4">{new Date(inv.issueDate).toLocaleDateString()}</td>
                            <td className="px-6 py-4">{new Date(inv.dueDate).toLocaleDateString()}</td>
                            <td className="px-6 py-4">{inv.totalAmount} CHF</td>
                            <td className="px-6 py-4">
                                <span
                                    className={`px-2 py-1 rounded-full text-sm font-medium ${
                                        inv.status === 'PAID'
                                            ? 'bg-green-100 text-green-800'
                                            : inv.status === 'OVERDUE'
                                                ? 'bg-red-100 text-red-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                    }`}
                                >
                                    {inv.status}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <button
                                    onClick={() => deleteInvoice(inv.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-sm"
                                >
                                    Löschen
                                </button>
                            </td>
                        </tr>
                    ))}
                    {filtered.length === 0 && (
                        <tr>
                            <td colSpan={8} className="text-center py-6 text-gray-500">
                                No results found.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
