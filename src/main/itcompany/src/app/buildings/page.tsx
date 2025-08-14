'use client';

import { useState, useMemo } from 'react';
import { useBuildings, Building } from '@/context/BuildingContext';

export default function BuildingPage() {
    const { buildings, loading } = useBuildings();
    const [cityFilter, setCityFilter] = useState('');
    const [nameFilter, setNameFilter] = useState('');

    const filtered = useMemo(() => {
        return buildings.filter((b) =>
            (!cityFilter || b.city.toLowerCase().includes(cityFilter.toLowerCase())) &&
            (!nameFilter || b.name.toLowerCase().includes(nameFilter.toLowerCase()))
        );
    }, [buildings, cityFilter, nameFilter]);

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
                        placeholder="Search by name..."
                        className="border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Search by city..."
                        className="border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        value={cityFilter}
                        onChange={(e) => setCityFilter(e.target.value)}
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
                        <th className="px-6 py-3">City</th>
                        <th className="px-6 py-3">Capacity</th>
                        <th className="px-6 py-3">Building Date</th>
                        <th className="px-6 py-3">Sectors</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filtered.map((building) => (
                        <tr key={building.id} className="border-t hover:bg-blue-50 transition">
                            <td className="px-6 py-4">{building.id}</td>
                            <td className="px-6 py-4">{building.name}</td>
                            <td className="px-6 py-4">{building.description}</td>
                            <td className="px-6 py-4">{building.city}</td>
                            <td className="px-6 py-4">{building.capacity}</td>
                            <td className="px-6 py-4">
                                {new Date(building.buildingDate).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">
                                {building.sectorList.map((s) => s.name).join(', ') || '-'}
                            </td>
                        </tr>
                    ))}
                    {filtered.length === 0 && (
                        <tr>
                            <td colSpan={7} className="text-center py-6 text-gray-500">
                                No buildings found.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
