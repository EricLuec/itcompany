'use client';

import {useState, useEffect} from 'react';
import Select from 'react-select';

type Inventory = {
    id: number;
    name: string;
};

export default function CreateItemForm() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState<number | ''>('');
    const [purchaseDate, setPurchaseDate] = useState(() =>
        new Date().toISOString().split('T')[0]
    );
    const [selectedInventories, setSelectedInventories] = useState<{ label: string; value: number }[]>([]);

    const [inventories, setInventories] = useState<Inventory[]>([]);
    const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');

    useEffect(() => {
        fetch('http://localhost:8080/inventory')
            .then((res) => res.json())
            .then(setInventories)
            .catch(console.error);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const inventoryId = selectedInventories[0]?.value;

        const payload = {
            name,
            description,
            price: price || 0,
            purchaseDate,
            inventory: inventoryId ? {id: inventoryId} : null,
        };

        try {
            const res = await fetch('http://localhost:8080/items', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                setFormStatus('success');
                setName('');
                setDescription('');
                setPrice('');
                setPurchaseDate(new Date().toISOString().split('T')[0]);
                setSelectedInventories([]);
            } else {
                setFormStatus('error');
            }
        } catch (err) {
            console.error(err);
            setFormStatus('error');
        }
    };

    const inventoryOptions = inventories.map((inv) => ({
        value: inv.id,
        label: inv.name,
    }));

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="bg-white shadow-md rounded-xl p-6 space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800">Create New Item</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-300"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <textarea
                        placeholder="Description"
                        rows={3}
                        className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-300"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="Price"
                        className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-300"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                    />

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Select Inventory</label>
                        <Select
                            isMulti
                            options={inventoryOptions}
                            value={selectedInventories}
                            onChange={(selected) => setSelectedInventories(selected as any)}
                            className="text-black"
                            classNamePrefix="react-select"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
                    >
                        Create Item
                    </button>
                </form>

                {formStatus === 'success' && (
                    <div className="text-green-600 text-sm">Item successfully created.</div>
                )}
                {formStatus === 'error' && (
                    <div className="text-red-600 text-sm">Something went wrong. Please try again.</div>
                )}
            </div>
        </div>
    );
}
