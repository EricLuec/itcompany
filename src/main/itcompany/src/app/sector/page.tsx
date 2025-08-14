'use client';

import { useEffect, useState } from 'react';
import { useSectors, Sector } from '@/context/SectorContext';

export default function SectorPage() {
    const { sectors, deleteSector } = useSectors();
    const [filtered, setFiltered] = useState<Sector[]>([]);
    const [nameFilter, setNameFilter] = useState('');
    const [salaryFilter, setSalaryFilter] = useState<string>('');

    useEffect(() => {
        let result = sectors;

        if (nameFilter) {
            result = result.filter((e) =>
                e.name.toLowerCase().includes(nameFilter.toLowerCase())
            );
        }

        if (salaryFilter) {
            result = result.filter((e) => e.salaryClass === salaryFilter);
        }

        setFiltered(result);
    }, [nameFilter, salaryFilter, sectors]);

    const handleDelete = (id: number) => {
        if (window.confirm('Möchten Sie diesen Sektor wirklich löschen?')) {
            deleteSector(id);
        }
    };

    if (!sectors.length) {
        return <div className="text-center py-10 text-gray-500">Loading Data…</div>;
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

                    <select
                        className="border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        value={salaryFilter}
                        onChange={(e) => setSalaryFilter(e.target.value)}
                    >
                        <option value="">All Salary-Classes</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
                    <thead>
                    <tr className="bg-blue-500 text-white text-left">
                        <th className="px-6 py-3">ID</th>
                        <th className="px-6 py-3">Name</th>
                        <th className="px-6 py-3">Beschreibung</th>
                        <th className="px-6 py-3">Gehaltsklasse</th>
                        <th className="px-6 py-3">Aktionen</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filtered.map((sector) => (
                        <tr key={sector.id} className="border-t hover:bg-blue-50 transition">
                            <td className="px-6 py-4">{sector.id}</td>
                            <td className="px-6 py-4">{sector.name}</td>
                            <td className="px-6 py-4">{sector.description}</td>
                            <td className="px-6 py-4">
                                <span
                                    className={`px-2 py-1 rounded-full text-sm font-medium ${
                                        sector.salaryClass === 'A'
                                            ? 'bg-green-100 text-green-800'
                                            : sector.salaryClass === 'B'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : sector.salaryClass === 'C'
                                                    ? 'bg-orange-100 text-orange-800'
                                                    : 'bg-red-100 text-red-800'
                                    }`}
                                >
                                    {sector.salaryClass}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <button
                                    onClick={() => handleDelete(sector.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-sm"
                                >
                                    Löschen
                                </button>
                            </td>
                        </tr>
                    ))}

                    {filtered.length === 0 && (
                        <tr>
                            <td colSpan={5} className="text-center py-6 text-gray-500">
                                Keine Ergebnisse gefunden.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
