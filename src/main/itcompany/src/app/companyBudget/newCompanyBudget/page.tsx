'use client';
import { useState } from 'react';

export default function CreateCompanyBudgetForm() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [totalFunds, setTotalFunds] = useState<number | ''>('');
    const [reservedFunds, setReservedFunds] = useState<number | ''>('');
    const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const availableFunds =
            (typeof totalFunds === 'number' ? totalFunds : 0) -
            (typeof reservedFunds === 'number' ? reservedFunds : 0);

        const payload = {
            name,
            description,
            totalFunds: totalFunds || 0,
            reservedFunds: reservedFunds || 0,
            availableFunds,
        };

        try {
            const res = await fetch('http://localhost:8080/companyBudget', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                setFormStatus('success');
                setName('');
                setDescription('');
                setTotalFunds('');
                setReservedFunds('');
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
            <h2 className="text-xl font-semibold text-gray-700">Create Company Budget</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />

                <input
                    type="number"
                    step="0.01"
                    placeholder="Total Funds"
                    value={totalFunds}
                    onChange={(e) => setTotalFunds(parseFloat(e.target.value))}
                    required
                    className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition"
                >
                    Create Budget
                </button>
            </form>

            {formStatus === 'success' && (
                <div className="text-green-600 text-sm">Successfully created budget!</div>
            )}
            {formStatus === 'error' && (
                <div className="text-red-600 text-sm">Error. Please try again.</div>
            )}
        </div>
    );
}
