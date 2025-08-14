'use client';
import { useState, useEffect } from 'react';
import { useEmployees, Employee } from '@/context/EmployeeContext';

export default function EmployeePage() {
    const { employees, setEmployees, refreshEmployees } = useEmployees();
    const [filtered, setFiltered] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [nameFilter, setNameFilter] = useState('');
    const [managerFilter, setManagerFilter] = useState('');

    useEffect(() => {
        if (employees.length > 0) setLoading(false);
    }, [employees]);

    useEffect(() => {
        let result = employees;

        if (nameFilter) {
            result = result.filter(e =>
                `${e.firstName} ${e.lastName}`.toLowerCase().includes(nameFilter.toLowerCase())
            );
        }

        if (managerFilter) {
            result = result.filter(e =>
                e.manager?.toLowerCase().includes(managerFilter.toLowerCase())
            );
        }

        setFiltered(result);
    }, [nameFilter, managerFilter, employees]);

    async function deleteEmployee(id: number) {
        if (!confirm('Diesen Mitarbeiter wirklich löschen?')) return;

        try {
            const res = await fetch(`http://localhost:8080/employees/${id}`, { method: 'DELETE' });

            if (!res.ok) throw new Error(`Fehler beim Löschen: ${res.status}`);

            setEmployees(prev => prev.filter(e => e.id !== id));
        } catch (err) {
            console.error(err);
            alert('Löschen fehlgeschlagen.');
        }
    }

    if (loading) {
        return <div className="text-center py-10 text-gray-500">Loading Employees…</div>;
    }

    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
            <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
                <h2 className="text-lg font-semibold">Filter</h2>
                <div className="flex flex-wrap gap-4">
                    <input
                        type="text"
                        placeholder="Search name..."
                        className="border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Search manager..."
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
                        <th className="px-6 py-3">Salary</th>
                        <th className="px-6 py-3">Hire-Date</th>
                        <th className="px-6 py-3">Manager</th>
                        <th className="px-6 py-3">Items</th>
                        <th className="px-6 py-3">Aktionen</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filtered.map(emp => (
                        <tr key={emp.id} className="border-t hover:bg-blue-50 transition">
                            <td className="px-6 py-4">{emp.id}</td>
                            <td className="px-6 py-4">{emp.firstName} {emp.lastName}</td>
                            <td className="px-6 py-4">{emp.email}</td>
                            <td className="px-6 py-4">{emp.salary} €</td>
                            <td className="px-6 py-4">{emp.hireDate ? new Date(emp.hireDate).toLocaleDateString() : '—'}</td>
                            <td className="px-6 py-4">{emp.manager || '—'}</td>
                            <td className="px-6 py-4">{emp.items?.length || 0}</td>
                            <td className="px-6 py-4">
                                <button
                                    onClick={() => deleteEmployee(emp.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-sm"
                                >
                                    Löschen
                                </button>
                            </td>
                        </tr>
                    ))}
                    {filtered.length === 0 && (
                        <tr>
                            <td colSpan={8} className="text-center py-6 text-gray-500">
                                No employees found.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
