'use client';

import { useEffect, useState } from 'react';

type SalaryClass = 'A' | 'B' | 'C' | 'D';
type Sector = {
    id: number;
    name: string;
    description: string;
    salaryClass: SalaryClass;
};

export default function SectorPage() {
    const [data, setData] = useState<Sector[]>([]);
    const [filtered, setFiltered] = useState<Sector[]>([]);
    const [loading, setLoading] = useState(true);

    const [nameFilter, setNameFilter] = useState('');
    const [salaryFilter, setSalaryFilter] = useState<string>(''); // '' = Alle

    useEffect(() => {
        fetch('http://localhost:8080/sectors')
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
            result = result.filter((e) =>
                e.name.toLowerCase().includes(nameFilter.toLowerCase())
            );
        }

        if (salaryFilter) {
            result = result.filter((e) => e.salaryClass === salaryFilter);
        }

        setFiltered(result);
    }, [nameFilter, salaryFilter, data]);

    if (loading) {
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
                        </tr>
                    ))}

                    {filtered.length === 0 && (
                        <tr>
                            <td colSpan={4} className="text-center py-6 text-gray-500">
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
