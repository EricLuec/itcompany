'use client';

import {useState, useEffect} from 'react';

type Building = {
    id: number;
    name: string;
};

type Employee = {
    id: number;
    firstName: string;
    lastName: string;
};

export default function CreateInventoryForm() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const today = new Date().toISOString().split('T')[0];
    const [createdDate, setCreatedDate] = useState(today);
    const [buildingId, setBuildingId] = useState<number | ''>('');
    const [employeeId, setEmployeeId] = useState<number | ''>('');
    const [generalValue, setGeneralValue] = useState<number | ''>('');

    const [buildings, setBuildings] = useState<Building[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');

    useEffect(() => {
        fetch('http://localhost:8080/buildings')
            .then(res => res.json())
            .then(setBuildings)
            .catch(console.error);

        fetch('http://localhost:8080/employees')
            .then(res => res.json())
            .then(setEmployees)
            .catch(console.error);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const selectedBuilding = buildings.find(b => b.id === buildingId) || null;
        const selectedEmployee = employees.find(emp => emp.id === employeeId) || null;

        setCreatedDate(today);

        const payload = {
            name,
            description,
            createdDate,
            generalValue: generalValue || 0,
            building: selectedBuilding,
            responsibleEmployee: selectedEmployee,
            items: [],
        };

        try {
            const res = await fetch('http://localhost:8080/inventory', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                setFormStatus('success');
                setName('');
                setDescription('');
                setCreatedDate('');
                setBuildingId('');
                setEmployeeId('');
                setGeneralValue('');
            } else {
                setFormStatus('error');
            }
        } catch (err) {
            console.error(err);
            setFormStatus('error');
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-6">
            <div className="bg-white shadow-md rounded-xl p-6 space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800">Create New Inventory</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Inventory Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />

                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
                    />

                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <select
                                value={buildingId}
                                onChange={(e) => setBuildingId(Number(e.target.value))}
                                className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            >
                                <option value="">-- Select Building --</option>
                                {buildings.map((b) => (
                                    <option key={b.id} value={b.id}>
                                        {b.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="w-1/2">
                            <select
                                value={employeeId}
                                onChange={(e) => setEmployeeId(Number(e.target.value))}
                                className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            >
                                <option value="">-- Select Responsible Employee --</option>
                                {employees.map((e) => (
                                    <option key={e.id} value={e.id}>
                                        {e.firstName} {e.lastName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
                    >
                        Create Inventory
                    </button>
                </form>

                {formStatus === 'success' && (
                    <div className="text-green-600 text-sm">Inventory successfully created.</div>
                )}
                {formStatus === 'error' && (
                    <div className="text-red-600 text-sm">Something went wrong. Please try again.</div>
                )}
            </div>
        </div>
    );
}
