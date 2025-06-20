'use client'
import { useEffect, useState } from 'react';

type Building = {
    name: string;
};

type Employee = {
    firstName: string;
    lastName: string;
};

type Item = {
    name: string;
};

type Inventory = {
    id: number;
    name: string;
    description: string;
    createdDate: string;
    building: Building | null;
    responsibleEmployee: Employee | null;
    items: Item[];
    generalValue: number;
};

export default function InventoryPage() {
    const [data, setData] = useState<Inventory[]>([]);
    const [filtered, setFiltered] = useState<Inventory[]>([]);
    const [loading, setLoading] = useState(true);

    const [nameFilter, setNameFilter] = useState('');
    const [employeeFilter, setEmployeeFilter] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/inventory')
            .then((res) => res.json())
            .then((json) => {
                setData(json);
                setFiltered(json);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Fetch error:', err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        let result = data;

        if (nameFilter) {
            result = result.filter((inv) =>
                inv.name.toLowerCase().includes(nameFilter.toLowerCase())
            );
        }

        if (employeeFilter) {
            result = result.filter((inv) =>
                `${inv.responsibleEmployee?.firstName ?? ''} ${inv.responsibleEmployee?.lastName ?? ''}`
                    .toLowerCase()
                    .includes(employeeFilter.toLowerCase())
            );
        }

        setFiltered(result);
    }, [nameFilter, employeeFilter, data]);

    if (loading) {
        return <div className="text-center py-10 text-gray-500">Loading Inventory...</div>;
    }

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
                        onChange={(e) => setNameFilter(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Search by employee..."
                        className="border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        value={employeeFilter}
                        onChange={(e) => setEmployeeFilter(e.target.value)}
                    />
                </div>
            </div>

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
                        <th className="px-6 py-3">Value</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filtered.map((inv) => (
                        <tr key={inv.id} className="border-t hover:bg-blue-50 transition">
                            <td className="px-6 py-4">{inv.id}</td>
                            <td className="px-6 py-4">{inv.name}</td>
                            <td className="px-6 py-4">{inv.description}</td>
                            <td className="px-6 py-4">{new Date(inv.createdDate).toLocaleDateString()}</td>
                            <td className="px-6 py-4">{inv.building?.name || '-'}</td>
                            <td className="px-6 py-4">
                                {inv.responsibleEmployee
                                    ? `${inv.responsibleEmployee.firstName} ${inv.responsibleEmployee.lastName}`
                                    : '-'}
                            </td>
                            <td className="px-6 py-4">
                                {inv.items.map((item) => item.name).join(', ') || '-'}
                            </td>
                            <td className="px-6 py-4">{inv.generalValue}</td>
                        </tr>
                    ))}
                    {filtered.length === 0 && (
                        <tr>
                            <td colSpan={8} className="text-center py-6 text-gray-500">
                                No results found.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
