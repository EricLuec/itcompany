'use client';

import { useEffect, useState } from 'react';
import Select from 'react-select';

type ProjectStatus = 'PLANNED' | 'ACTIVE' | 'COMPLETED';

type Employee = {
    id: number;
    firstName: string;
    lastName: string;
};

type Option = {
    value: number;
    label: string;
};

export default function CreateProjectForm() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [managerId, setManagerId] = useState<number | null>(null);
    const [workerIds, setWorkerIds] = useState<Option[]>([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [budget, setBudget] = useState<number | ''>('');
    const [status, setStatus] = useState<ProjectStatus>('PLANNED');
    const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [employees, setEmployees] = useState<Employee[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/employees')
            .then(res => res.json())
            .then(setEmployees)
            .catch(err => console.error('Error while loading the employees:', err));
    }, []);

    const employeeOptions: Option[] = employees.map(e => ({
        value: e.id,
        label: `${e.firstName} ${e.lastName}`,
    }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            name,
            description,
            manager: managerId ? employees.find(e => e.id === managerId)?.firstName + ' ' + employees.find(e => e.id === managerId)?.lastName : '',
            creationDate: new Date().toISOString().split('T')[0],
            workerList: workerIds.map((w) => employees.find(e => e.id === w.value)?.firstName + ' ' + employees.find(e => e.id === w.value)?.lastName),
            startDate,
            endDate,
            budget: budget || 0,
            status,
            employees: workerIds.map(w => ({ id: w.value })),
        };

        try {
            const res = await fetch('http://localhost:8080/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                setFormStatus('success');
                setName('');
                setDescription('');
                setManagerId(null);
                setWorkerIds([]);
                setStartDate('');
                setEndDate('');
                setBudget('');
                setStatus('PLANNED');
            } else {
                setFormStatus('error');
            }
        } catch (err) {
            console.error('Error while creating:', err);
            setFormStatus('error');
        }
    };

    return (
        <div className="bg-white shadow-md rounded-xl p-6 max-w-xl mx-auto mt-8 space-y-6">
            <h2 className="text-xl font-semibold text-gray-700">Create new Project</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Projektname"
                    required
                    className="w-full border rounded-full px-4 py-2"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Beschreibung"
                    className="w-full border rounded-lg px-4 py-2"
                />

                <Select
                    options={employeeOptions}
                    value={employeeOptions.find(o => o.value === managerId) || null}
                    onChange={(opt) => setManagerId(opt?.value || null)}
                    placeholder="Manager auswählen..."
                    className="w-full"
                    isClearable
                />

                <Select
                    options={employeeOptions}
                    value={workerIds}
                    onChange={(opts) => setWorkerIds(opts as Option[])}
                    isMulti
                    placeholder="Mitarbeiter auswählen..."
                    className="w-full"
                />

                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                    className="w-full border rounded-full px-4 py-2"
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                    className="w-full border rounded-full px-4 py-2"
                />
                <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(parseInt(e.target.value))}
                    placeholder="Budget"
                    required
                    className="w-full border rounded-full px-4 py-2"
                />

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ProjectStatus)}
                    className="w-full border rounded-full px-4 py-2"
                >
                    <option value="PLANNED">Planned</option>
                    <option value="ACTIVE">Active</option>
                    <option value="COMPLETED">Completed</option>
                </select>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition"
                >
                    Create Project
                </button>
            </form>

            {formStatus === 'success' && (
                <div className="text-green-600 text-sm">Successfully created project!</div>
            )}
            {formStatus === 'error' && (
                <div className="text-red-600 text-sm">Error while creating.</div>
            )}
        </div>
    );
}
