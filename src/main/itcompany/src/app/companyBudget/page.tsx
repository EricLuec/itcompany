'use client';
import { useEffect, useState } from 'react';

type CompanyBudget = {
    id: number;
    name: string;
    description: string;
    totalFunds: number;
    reservedFunds: number;
    availableFunds: number;
};

export default function CompanyBudgetPage() {
    const [budgets, setBudgets] = useState<CompanyBudget[]>([]);
    const [filtered, setFiltered] = useState<CompanyBudget[]>([]);
    const [loading, setLoading] = useState(true);
    const [nameFilter, setNameFilter] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/companyBudget')
            .then((res) => res.json())
            .then((data) => {
                setBudgets(data);
                setFiltered(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching budgets:', err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const result = nameFilter
            ? budgets.filter((b) =>
                b.name.toLowerCase().includes(nameFilter.toLowerCase())
            )
            : budgets;
        setFiltered(result);
    }, [nameFilter, budgets]);

    async function deleteBudget(id: number) {
        if (!confirm('Diesen Budget-Eintrag wirklich löschen?')) return;

        try {
            const res = await fetch(`http://localhost:8080/companyBudget/${id}`, {
                method: 'DELETE',
                mode: 'cors',
            });

            if (!res.ok) {
                throw new Error(`Fehler beim Löschen: ${res.status}`);
            }

            setBudgets(prev => prev.filter(b => b.id !== id));
        } catch (err) {
            console.error(err);
            alert('Löschen fehlgeschlagen.');
        }
    }

    if (loading) {
        return <div className="text-center py-10 text-gray-500">Loading Budgets…</div>;
    }

    return (
        <div className="p-6 space-y-6">
            <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
                <h2 className="text-lg font-semibold">Filter</h2>
                <input
                    type="text"
                    placeholder="Search by name..."
                    className="border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                />
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
                    <thead>
                    <tr className="bg-blue-500 text-white text-left">
                        <th className="px-6 py-3">ID</th>
                        <th className="px-6 py-3">Name</th>
                        <th className="px-6 py-3">Description</th>
                        <th className="px-6 py-3">Total</th>
                        <th className="px-6 py-3">Reserved</th>
                        <th className="px-6 py-3">Available</th>
                        <th className="px-6 py-3">Aktionen</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filtered.map((b) => (
                        <tr key={b.id} className="border-t hover:bg-blue-50 transition">
                            <td className="px-6 py-4">{b.id}</td>
                            <td className="px-6 py-4">{b.name}</td>
                            <td className="px-6 py-4">{b.description}</td>
                            <td className="px-6 py-4">{b.totalFunds.toFixed(2)} CHF</td>
                            <td className="px-6 py-4">{b.reservedFunds.toFixed(2)} CHF</td>
                            <td className="px-6 py-4">{b.availableFunds.toFixed(2)} CHF</td>
                            <td className="px-6 py-4">
                                <button
                                    onClick={() => deleteBudget(b.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-sm"
                                >
                                    Löschen
                                </button>
                            </td>
                        </tr>
                    ))}
                    {filtered.length === 0 && (
                        <tr>
                            <td colSpan={7} className="text-center py-6 text-gray-500">
                                No budgets found.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
