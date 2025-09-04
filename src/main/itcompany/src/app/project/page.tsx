'use client';
import { useState } from 'react';
import {useProjects} from '@/context/ProjectContext';

export default function ProjectPage() {
    const { projects, loading, deleteProject } = useProjects();
    const [nameFilter, setNameFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const filtered = projects.filter(p =>
        (!nameFilter || p.name.toLowerCase().includes(nameFilter.toLowerCase())) &&
        (!statusFilter || p.status === statusFilter)
    );


    if (loading) return <div className="text-center py-10 text-gray-500">Loading…</div>;

    return (
        <div className="p-6 space-y-6">
            <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
                <h2 className="text-lg font-semibold">Filter</h2>
                <div className="flex flex-wrap gap-4">
                    <input
                        placeholder="Projektname suchen..."
                        className="border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        value={nameFilter}
                        onChange={e => setNameFilter(e.target.value)}
                    />
                    <select
                        className="border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value)}
                    >
                        <option value="">Alle Status</option>
                        <option value="PLANNED">Geplant</option>
                        <option value="ACTIVE">Aktiv</option>
                        <option value="COMPLETED">Abgeschlossen</option>
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
                    <thead>
                    <tr className="bg-blue-500 text-white text-left">
                        <th className="px-6 py-3">ID</th>
                        <th className="px-6 py-3">Name</th>
                        <th className="px-6 py-3">Manager</th>
                        <th className="px-6 py-3">Budget</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Aktionen</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filtered.map(p => (
                        <tr key={p.id} className="border-t hover:bg-blue-50 transition">
                            <td className="px-6 py-4">{p.id}</td>
                            <td className="px-6 py-4">{p.name}</td>
                            <td className="px-6 py-4">{p.manager}</td>
                            <td className="px-6 py-4">{p.budget} €</td>
                            <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                      p.status === 'PLANNED' ? 'bg-yellow-100 text-yellow-800' :
                          p.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                              'bg-gray-300 text-gray-800'
                  }`}>{p.status}</span>
                            </td>
                            <td className="px-6 py-4">
                                <button onClick={() => deleteProject(p.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-sm"
                                >
                                    Löschen
                                </button>
                            </td>
                        </tr>
                    ))}
                    {filtered.length === 0 && (
                        <tr>
                            <td colSpan={6} className="text-center py-6 text-gray-500">
                                Keine Projekte gefunden.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
