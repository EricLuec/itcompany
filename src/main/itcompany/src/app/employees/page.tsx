'use client';

import React, { useState, useEffect } from 'react';
import { useEmployees, Employee } from '@/context/EmployeeContext';
import { useSectors, Sector } from '@/context/SectorContext';
import Select from 'react-select';

type SectorOption = { value: number; label: string };

export default function EmployeePage() {
    const { employees, setEmployees, deleteEmployee } = useEmployees();
    const { sectors } = useSectors();

    const [filtered, setFiltered] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [nameFilter, setNameFilter] = useState('');
    const [managerFilter, setManagerFilter] = useState('');
    const [sectorFilter, setSectorFilter] = useState('');
    const [editEmployee, setEditEmployee] = useState<Employee | null>(null);
    const [isEditing, setIsEditing] = useState(false);

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

        if (sectorFilter) {
            result = result.filter(e =>
                e.sector?.name?.toLowerCase().includes(sectorFilter.toLowerCase())
            );
        }

        setFiltered(result);
    }, [nameFilter, managerFilter, sectorFilter, employees]);

    async function handleDelete(id: number) {
        if (!confirm('Diesen Mitarbeiter wirklich löschen?')) return;
        await deleteEmployee(id);
    }

    function handleEdit(employee: Employee) {
        setEditEmployee(employee);
        setIsEditing(true);
    }

    async function handleUpdate(employee: Employee) {
        try {
            const res = await fetch(`http://localhost:8080/employees/${employee.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(employee),
            });

            if (!res.ok) throw new Error(`Fehler beim Aktualisieren: ${res.status}`);

            const updatedEmployee = await res.json();
            setEmployees(prev => prev.map(emp => (emp.id === updatedEmployee.id ? updatedEmployee : emp)));
            setIsEditing(false);
            setEditEmployee(null);
        } catch (err) {
            console.error(err);
            alert('Aktualisieren fehlgeschlagen.');
        }
    }

    if (loading) {
        return <div className="text-center py-10 text-gray-500">Loading Employees…</div>;
    }

    const sectorOptions: SectorOption[] = sectors.map(s => ({
        value: s.id,
        label: s.name,
    }));

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
                    <input
                        type="text"
                        placeholder="Search sector..."
                        className="border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        value={sectorFilter}
                        onChange={(e) => setSectorFilter(e.target.value)}
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
                        <th className="px-6 py-3">Sector</th>
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
                            <td className="px-6 py-4">{emp.sector?.name || '—'}</td>
                            <td className="px-6 py-4">{emp.items?.length || 0}</td>
                            <td className="px-6 py-4">
                                <button
                                    onClick={() => handleEdit(emp)}
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-full text-sm mr-2"
                                >
                                    Bearbeiten
                                </button>
                                <button
                                    onClick={() => handleDelete(emp.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-sm"
                                >
                                    Löschen
                                </button>
                            </td>
                        </tr>
                    ))}
                    {filtered.length === 0 && (
                        <tr>
                            <td colSpan={9} className="text-center py-6 text-gray-500">
                                No employees found.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            {isEditing && editEmployee && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-xl max-w-lg w-full">
                        <h3 className="text-xl font-semibold mb-4">Edit Employee</h3>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (editEmployee) handleUpdate(editEmployee);
                            }}
                        >
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    value={editEmployee.firstName}
                                    onChange={(e) => setEditEmployee({ ...editEmployee, firstName: e.target.value })}
                                    className="w-full border px-4 py-2 rounded"
                                    placeholder="First Name"
                                />
                                <input
                                    type="text"
                                    value={editEmployee.lastName}
                                    onChange={(e) => setEditEmployee({ ...editEmployee, lastName: e.target.value })}
                                    className="w-full border px-4 py-2 rounded"
                                    placeholder="Last Name"
                                />
                                <input
                                    type="email"
                                    value={editEmployee.email}
                                    onChange={(e) => setEditEmployee({ ...editEmployee, email: e.target.value })}
                                    className="w-full border px-4 py-2 rounded"
                                    placeholder="Email"
                                />
                                <input
                                    type="number"
                                    value={editEmployee.salary}
                                    onChange={(e) => setEditEmployee({ ...editEmployee, salary: parseFloat(e.target.value) })}
                                    className="w-full border px-4 py-2 rounded"
                                    placeholder="Salary"
                                />
                                <input
                                    type="date"
                                    value={editEmployee.hireDate ? new Date(editEmployee.hireDate).toISOString().split('T')[0] : ''}
                                    onChange={(e) => setEditEmployee({ ...editEmployee, hireDate: e.target.value })}
                                    className="w-full border px-4 py-2 rounded"
                                />

                                <Select
                                    options={sectorOptions}
                                    value={editEmployee.sector ? { value: editEmployee.sector.id, label: editEmployee.sector.name } : null}
                                    onChange={(option) => {
                                        const found = sectors.find(s => s.id === option?.value);
                                        setEditEmployee({ ...editEmployee, sector: found || undefined });
                                    }}
                                    isClearable
                                    placeholder="Select sector..."
                                    className="rounded"
                                    classNamePrefix="react-select"
                                />

                                <input
                                    type="text"
                                    value={editEmployee.manager || ''}
                                    onChange={(e) => setEditEmployee({ ...editEmployee, manager: e.target.value })}
                                    className="w-full border px-4 py-2 rounded"
                                    placeholder="Manager"
                                />

                                <div className="flex justify-end gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                                    >
                                        Abbrechen
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 text-white rounded"
                                    >
                                        Speichern
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
