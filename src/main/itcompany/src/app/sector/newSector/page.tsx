'use client';

import { useState } from 'react';
import { useSectors, SalaryClass } from '@/context/SectorContext';

export default function CreateSectorForm() {
    const { refreshSectors } = useSectors();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [salaryClass, setSalaryClass] = useState<SalaryClass>('A');
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = { name, description, salaryClass };

        try {
            const res = await fetch('http://localhost:8080/sectors', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                setStatus('success');
                setName('');
                setDescription('');
                setSalaryClass('A');

                refreshSectors();
            } else {
                setStatus('error');
            }
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    return (
        <div className="bg-white shadow-md rounded-xl p-6 max-w-md mx-auto space-y-6 mt-8">
            <h2 className="text-xl font-semibold text-gray-700">Create new Sector</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />

                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />

                <select
                    value={salaryClass}
                    onChange={(e) => setSalaryClass(e.target.value as SalaryClass)}
                    className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                    <option value="A">SalaryClass A</option>
                    <option value="B">SalaryClass B</option>
                    <option value="C">SalaryClass C</option>
                    <option value="D">SalaryClass D</option>
                </select>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition"
                >
                    Create
                </button>
            </form>

            {status === 'success' && (
                <div className="text-green-600 text-sm">Successfully created Sector!</div>
            )}
            {status === 'error' && (
                <div className="text-red-600 text-sm">Error. Try again.</div>
            )}
        </div>
    );
}
