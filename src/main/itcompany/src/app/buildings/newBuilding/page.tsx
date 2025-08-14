'use client';

import { useState } from 'react';
import Select from 'react-select';
import { useSectors } from '@/context/SectorContext';
import {useBuildings} from "@/context/BuildingContext";
export default function CreateBuildingForm() {
    const { sectors, refreshSectors } = useSectors();
    const {refreshBuildings } = useBuildings();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [city, setCity] = useState('');
    const [capacity, setCapacity] = useState(0);
    const [buildingDate, setBuildingDate] = useState('');
    const [selectedSectors, setSelectedSectors] = useState<{ value: number; label: string }[]>([]);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            name,
            description,
            city,
            capacity,
            buildingDate,
            sectorList: selectedSectors.map((s) => ({ id: s.value })),
        };

        try {
            const res = await fetch('http://localhost:8080/buildings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                setMessage('Building created successfully!');
                setName('');
                setDescription('');
                setCity('');
                setCapacity(0);
                setBuildingDate('');
                setSelectedSectors([]);
                await refreshBuildings();
            } else {
                setMessage('Failed to create building.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error occurred while creating building.');
        }
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <form
                onSubmit={handleSubmit}
                className="space-y-4 bg-white shadow-md rounded-xl p-6"
            >
                <h2 className="text-xl font-semibold mb-4">Create New Building</h2>

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                />

                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                />

                <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                />

                <input
                    type="number"
                    placeholder="Capacity"
                    value={capacity}
                    onChange={(e) => setCapacity(parseInt(e.target.value))}
                    className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                />

                <input
                    type="date"
                    value={buildingDate}
                    onChange={(e) => setBuildingDate(e.target.value)}
                    className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                />

                <div>
                    <label className="block mb-1 font-medium">Sectors</label>
                    <Select
                        isMulti
                        options={sectors.map((sector) => ({
                            value: sector.id,
                            label: sector.name,
                        }))}
                        value={selectedSectors}
                        onChange={(selected) =>
                            setSelectedSectors(selected as { value: number; label: string }[])
                        }
                        className="react-select-container"
                        classNamePrefix="react-select"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
                >
                    Create
                </button>

                {message && (
                    <div className="text-center text-green-600 mt-2">{message}</div>
                )}
            </form>
        </div>
    );
}
