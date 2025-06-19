'use client';

import { useState, useEffect } from 'react';
type InvoiceStatus = 'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE';

type Project = {
    id: number;
    name: string;
};

export default function CreateInvoiceForm() {
    const [client, setClient] = useState('');
    const [projectId, setProjectId] = useState<number | ''>('');
    const [issueDate, setIssueDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [totalAmount, setTotalAmount] = useState<number | ''>('');
    const [tax, setTax] = useState<number | ''>('');
    const [discount, setDiscount] = useState<number | ''>('');
    const [status, setStatus] = useState<InvoiceStatus>('DRAFT');

    const [projects, setProjects] = useState<Project[]>([]);
    const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');

    useEffect(() => {
        fetch('http://localhost:8080/projects')
            .then(res => res.json())
            .then(setProjects)
            .catch(err => {
                console.error('Failed to load projects', err);
            });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (projectId === '') {
            alert('Bitte ein Projekt auswählen.');
            return;
        }

        const payload = {
            client,
            project: { id: projectId },
            issueDate,
            dueDate,
            totalAmount: totalAmount || 0,
            tax: tax || 0,
            discount: discount || 0,
            status,
        };

        try {
            const res = await fetch('http://localhost:8080/invoices', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                setFormStatus('success');
                setClient('');
                setProjectId('');
                setIssueDate('');
                setDueDate('');
                setTotalAmount('');
                setTax('');
                setDiscount('');
                setStatus('DRAFT');
            } else {
                setFormStatus('error');
            }
        } catch (err) {
            console.error(err);
            setFormStatus('error');
        }
    };

    return (
        <div className="bg-white shadow-md rounded-xl p-6 max-w-md mx-auto space-y-6 mt-8">
            <h2 className="text-xl font-semibold text-gray-700">Create new Invoice</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Client"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    required
                    className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />

                <select
                    value={projectId}
                    onChange={(e) => setProjectId(Number(e.target.value))}
                    required
                    className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                    <option value="">-- Select Project --</option>
                    {projects.map((p) => (
                        <option key={p.id} value={p.id}>
                            {p.name}
                        </option>
                    ))}
                </select>

                <label className="block">
                    <span className="text-gray-700">Issue Date</span>
                    <input
                        type="date"
                        value={issueDate}
                        onChange={(e) => setIssueDate(e.target.value)}
                        required
                        className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                </label>

                <label className="block">
                    <span className="text-gray-700">Due Date</span>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                        className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                </label>

                <input
                    type="number"
                    step="0.01"
                    placeholder="Amount"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(parseFloat(e.target.value))}
                    required
                    className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />

                <input
                    type="number"
                    step="0.01"
                    placeholder="Tax"
                    value={tax}
                    onChange={(e) => setTax(parseFloat(e.target.value))}
                    className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />

                <input
                    type="number"
                    step="0.01"
                    placeholder="Discount"
                    value={discount}
                    onChange={(e) => setDiscount(parseFloat(e.target.value))}
                    className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as InvoiceStatus)}
                    className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                    <option value="DRAFT">DRAFT</option>
                    <option value="SENT">SENT</option>
                    <option value="PAID">PAID</option>
                    <option value="OVERDUE">OVERDUE</option>
                </select>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition"
                >
                    Create
                </button>
            </form>

            {formStatus === 'success' && (
                <div className="text-green-600 text-sm">Successfully created Invoice!</div>
            )}
            {formStatus === 'error' && (
                <div className="text-red-600 text-sm">Error. Please try again.</div>
            )}
        </div>
    );
}
