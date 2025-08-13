'use client';

import { useEffect, useState } from 'react';

type Inventory = {
    id: number;
    name: string;
};

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
    inventory: Inventory | null;
    employee: Employee | null; // neu
};

export default function ItemsPage() {
    const [items, setItems] = useState<Item[]>([]);
    const [inventories, setInventories] = useState<Inventory[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);

    const [editItem, setEditItem] = useState<Item | null>(null);
    const [newEmployeeId, setNewEmployeeId] = useState<number | ''>('');

    useEffect(() => {
        Promise.all([
            fetch('http://localhost:8080/items').then((res) => res.json()),
            fetch('http://localhost:8080/inventory').then((res) => res.json()),
            fetch('http://localhost:8080/employees').then((res) => res.json()),
        ])
            .then(([itemsData, inventoriesData, employeesData]) => {
                setItems(itemsData);
                setInventories(inventoriesData);
                setEmployees(employeesData);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching data:', err);
                setLoading(false);
            });
    }, []);

    async function deleteItem(id: number) {
        if (!confirm('Diesen Artikel wirklich löschen?')) return;

        try {
            const res = await fetch(`http://localhost:8080/items/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error(`Fehler beim Löschen: ${res.status}`);
            setItems((prev) => prev.filter((item) => item.id !== id));
        } catch (err) {
            console.error(err);
            alert('Löschen fehlgeschlagen.');
        }
    }

    async function saveEmployeeChange() {
        if (!editItem) return;

        try {
            const updatedItem = {
                ...editItem,
                employee: newEmployeeId ? { id: newEmployeeId } : null
            };

            const res = await fetch(`http://localhost:8080/items/${editItem.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedItem),
            });

            if (!res.ok) throw new Error(`Fehler beim Update: ${res.status}`);

            // Get the updated item from the response
            const responseItem = await res.json();

            // Update lokal die Items-Liste
            setItems((prev) =>
                prev.map((item) =>
                    item.id === editItem.id ? responseItem : item
                )
            );

            setEditItem(null);
            setEditItem(null);
            setEditItem(null);
            setNewEmployeeId('');
        } catch (err) {
            console.error(err);
            alert('Update fehlgeschlagen.');
        }
    }

    if (loading) return <div className="text-center py-10 text-gray-500">Loading items...</div>;

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
                        <th className="px-6 py-3">Aktionen</th>
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
                                        setNewEmployeeId(item.employee?.id || '');
                                    }}
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-full text-sm"
                                >
                                    Edit Employee
                                </button>
                                <button
                                    onClick={() => deleteItem(item.id)}
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
                                setNewEmployeeId(val === '' ? '' : Number(val));
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
