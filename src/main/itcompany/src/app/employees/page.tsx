'use client';

import { useEffect, useState } from 'react';

type Employee = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    salary: number;
    hireDate: string;
    manager: string;
    items: any[]; // Oder type Item[] falls du den Typ definieren willst
};

export default function EmployeePage() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [filtered, setFiltered] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);

    const [nameFilter, setNameFilter] = useState('');
    const [managerFilter, setManagerFilter] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/employees')
            .then(res => res.json())
            .then(data => {
                setEmployees(data);
                setFiltered(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error loading employees:', err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        let result = employees;

        if (nameFilter) {
            result = result.filter(e =>
                (e.firstName + ' ' + e.lastName)
                    .toLowerCase()
                    .includes(nameFilter.toLowerCase())
            );
        }

        if (managerFilter) {
            result = result.filter(e =>
                e.manager?.toLowerCase().includes(managerFilter.toLowerCase())
            );
        }

        setFiltered(result);
    }, [nameFilter, managerFilter, employees]);

    if (loading) {
        return <div className="text-center py-10 text-gray-500">Loading Employees…</div>;
    }

    return (
        <div className="p-6 space-y-6">
            <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
                <h2 className="text-lg font-semibold">Filter</h2>
                <div className="flex flex-wrap gap-4">
                    <input
                        type="text"
                        placeholder="Name suchen..."
                        className="border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Manager suchen..."
                        className="border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        value={managerFilter}
                        onChange={(e) => setManagerFilter(e.target.value)}
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
                    <thead>
                    <tr className="bg-blue-500 text-white text-left">
                        <th className="px-6 py-3">ID</th>
                        <th className="px-6 py-3">Name</th>
                        <th className="px-6 py-3">E-Mail</th>
                        <th className="px-6 py-3">Gehalt</th>
                        <th className="px-6 py-3">Einstellungsdatum</th>
                        <th className="px-6 py-3">Manager</th>
                        <th className="px-6 py-3">Items</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filtered.map((emp) => (
                        <tr key={emp.id} className="border-t hover:bg-blue-50 transition">
                            <td className="px-6 py-4">{emp.id}</td>
                            <td className="px-6 py-4">{emp.firstName} {emp.lastName}</td>
                            <td className="px-6 py-4">{emp.email}</td>
                            <td className="px-6 py-4">{emp.salary} €</td>
                            <td className="px-6 py-4">
                                {emp.hireDate ? new Date(emp.hireDate).toLocaleDateString() : '—'}
                            </td>
                            <td className="px-6 py-4">{emp.manager || '—'}</td>
                            <td className="px-6 py-4">{emp.items?.length || 0}</td>
                        </tr>
                    ))}
                    {filtered.length === 0 && (
                        <tr>
                            <td colSpan={7} className="text-center py-6 text-gray-500">
                                Keine Mitarbeiter gefunden.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
