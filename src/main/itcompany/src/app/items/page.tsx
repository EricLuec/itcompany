'use client';

import { useState } from 'react';
import { useItems } from '@/context/ItemContext'; // Importiere den useItems Hook

type Employee = {
    id: number;
    firstName: string;
    lastName: string;
};

type Item = {
    id: number;
    name: string;
    description: string;
    category: string;
    price: number;
    purchaseDate: string;
    inventory: { name: string } | null;
    employee: Employee | null;
};

export default function ItemsPage() {
    const { items, inventories, employees, loading, deleteItem, updateItemEmployee } = useItems(); // Zugriff auf den ItemContext
    const [editItem, setEditItem] = useState<Item | null>(null);
    const [newEmployeeId, setNewEmployeeId] = useState<number | ''>('');

    if (loading) return <div className="text-center py-10 text-gray-500">Loading items...</div>;

    const saveEmployeeChange = async () => {
        if (editItem) {
            await updateItemEmployee(editItem.id, newEmployeeId ? newEmployeeId : null);
            setEditItem(null);
        }
    };

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">All Items</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
                    <thead>
                    <tr className="bg-blue-500 text-white text-left">
                        <th className="px-6 py-3">ID</th>
                        <th className="px-6 py-3">Name</th>
                        <th className="px-6 py-3">Description</th>
                        <th className="px-6 py-3">Category</th>
                        <th className="px-6 py-3">Price</th>
                        <th className="px-6 py-3">Purchase Date</th>
                        <th className="px-6 py-3">Inventory</th>
                        <th className="px-6 py-3">Employee</th>
                        <th className="px-6 py-3">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item) => (
                        <tr key={item.id} className="border-t hover:bg-blue-50 transition">
                            <td className="px-6 py-4">{item.id}</td>
                            <td className="px-6 py-4">{item.name}</td>
                            <td className="px-6 py-4">{item.description}</td>
                            <td className="px-6 py-4">{item.category}</td>
                            <td className="px-6 py-4">{item.price} €</td>
                            <td className="px-6 py-4">{new Date(item.purchaseDate).toLocaleDateString()}</td>
                            <td className="px-6 py-4">{item.inventory?.name || '-'}</td>
                            <td className="px-6 py-4">{item.employee ? `${item.employee.firstName} ${item.employee.lastName}` : '-'}</td>
                            <td className="px-6 py-4 space-x-2">
                                <button
                                    onClick={() => {
                                        setEditItem(item);
                                        setNewEmployeeId(item.employee?.id || ''); // Setze den Mitarbeiter zum Bearbeiten
                                    }}
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-full text-sm"
                                >
                                    Edit Employee
                                </button>
                                <button
                                    onClick={() => deleteItem(item.id)} // deleteItem aus dem Context verwenden
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-sm"
                                >
                                    Löschen
                                </button>
                            </td>
                        </tr>
                    ))}
                    {items.length === 0 && (
                        <tr>
                            <td colSpan={9} className="text-center py-6 text-gray-500">
                                No items found.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {editItem && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-xl w-96 space-y-4">
                        <h3 className="text-lg font-semibold">
                            Employee ändern für: {editItem.name}
                        </h3>
                        <select
                            value={newEmployeeId}
                            onChange={(e) => {
                                const val = e.target.value;
                                setNewEmployeeId(val === '' ? '' : Number(val)); // Update the employee selection
                            }}
                            className="w-full border rounded-xl px-4 py-2"
                        >
                            <option value="">-- Kein Employee --</option>
                            {employees.map((emp) => (
                                <option key={emp.id} value={emp.id}>
                                    {emp.firstName} {emp.lastName}
                                </option>
                            ))}
                        </select>

                        <div className="flex justify-end gap-2">
                            <button onClick={() => setEditItem(null)} className="px-4 py-2 rounded bg-gray-300">
                                Cancel
                            </button>
                            <button onClick={saveEmployeeChange} className="px-4 py-2 rounded bg-blue-600 text-white">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
