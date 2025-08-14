'use client';

import { useState } from 'react';
import { useInventories, Inventory } from '@/context/InventoryContext';

export default function InventoryPage() {
    const { inventories, loading, deleteInventory } = useInventories();
    const [nameFilter, setNameFilter] = useState('');
    const [employeeFilter, setEmployeeFilter] = useState('');
    const [expandedRows, setExpandedRows] = useState<number[]>([]);

    if (loading) {
        return <div className="text-center py-10 text-gray-500">Loading Inventory...</div>;
    }

    const filtered = inventories.filter(inv =>
        inv.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
        `${inv.responsibleEmployee?.firstName ?? ''} ${inv.responsibleEmployee?.lastName ?? ''}`
            .toLowerCase()
            .includes(employeeFilter.toLowerCase())
    );

    const toggleRow = (id: number) => {
        setExpandedRows(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
    };

    return (
        <div className="p-6 space-y-6">
            <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
                <h2 className="text-lg font-semibold">Filter</h2>
                <div className="flex flex-wrap gap-4">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        className="border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        value={nameFilter}
                        onChange={e => setNameFilter(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Search by employee..."
                        className="border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        value={employeeFilter}
                        onChange={e => setEmployeeFilter(e.target.value)}
                    />
                </div>
            </div>

            {/* Tabelle */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
                    <thead>
                    <tr className="bg-blue-500 text-white text-left">
                        <th className="px-6 py-3">ID</th>
                        <th className="px-6 py-3">Name</th>
                        <th className="px-6 py-3">Description</th>
                        <th className="px-6 py-3">Created</th>
                        <th className="px-6 py-3">Building</th>
                        <th className="px-6 py-3">Responsible</th>
                        <th className="px-6 py-3">Items</th>
                        <th className="px-6 py-3">Value (€)</th>
                        <th className="px-6 py-3">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filtered.map(inv => {
                        const totalValue = inv.items.reduce((sum, item) => sum + item.price, 0);
                        const isExpanded = expandedRows.includes(inv.id);

                        return (
                            <tr key={inv.id} className="border-t hover:bg-blue-50 transition">
                                <td className="px-6 py-4">{inv.id}</td>
                                <td className="px-6 py-4">{inv.name}</td>
                                <td className="px-6 py-4">{inv.description}</td>
                                <td className="px-6 py-4">{new Date(inv.createdDate).toLocaleDateString()}</td>
                                <td className="px-6 py-4">{inv.building?.name || '-'}</td>
                                <td className="px-6 py-4">{inv.responsibleEmployee ? `${inv.responsibleEmployee.firstName} ${inv.responsibleEmployee.lastName}` : '-'}</td>
                                <td className="px-6 py-4">
                                    {inv.items.length > 0 ? (
                                        <div className="space-y-2">
                                            <div>
                                                {inv.items.slice(0, 2).map(item => (
                                                    <span key={item.id} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full mr-2">
                                                            {item.name} (€{item.price})
                                                        </span>
                                                ))}
                                                {inv.items.length > 2 && (
                                                    <button
                                                        onClick={() => toggleRow(inv.id)}
                                                        className="text-blue-600 text-xs underline ml-2"
                                                    >
                                                        {isExpanded ? 'Show less' : `+${inv.items.length - 2} more`}
                                                    </button>
                                                )}
                                            </div>
                                            {isExpanded && (
                                                <div className="bg-gray-50 border rounded p-2 space-y-1">
                                                    {inv.items.map(item => (
                                                        <div key={item.id} className="text-sm text-gray-700">
                                                            • {item.name} – {item.description || 'No description'} (€{item.price})
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ) : '-'}
                                </td>
                                <td className="px-6 py-4 font-semibold">{totalValue}</td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => deleteInventory(inv.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-sm"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                    {filtered.length === 0 && (
                        <tr>
                            <td colSpan={9} className="text-center py-6 text-gray-500">No results found.</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
