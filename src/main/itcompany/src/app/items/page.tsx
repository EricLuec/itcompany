'use client';

import { useEffect, useState } from 'react';

type Inventory = {
    id: number;
    name: string;
};

type Item = {
    id: number;
    name: string;
    description: string;
    category: string;
    price: number;
    purchaseDate: string;
    inventory: Inventory | null;
};

export default function ItemsPage() {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8080/items')
            .then((res) => res.json())
            .then((data) => {
                setItems(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching items:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-center py-10 text-gray-500">Loading items...</div>;
    }

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
                            <td className="px-6 py-4">
                                {new Date(item.purchaseDate).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">
                                {item.inventory ? item.inventory.name : '-'}
                            </td>
                        </tr>
                    ))}
                    {items.length === 0 && (
                        <tr>
                            <td colSpan={7} className="text-center py-6 text-gray-500">
                                No items found.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
