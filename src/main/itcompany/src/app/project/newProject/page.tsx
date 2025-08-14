'use client';
import { useState } from 'react';
import Select from 'react-select';
import { useProjects, ProjectStatus, Project } from '@/context/ProjectContext';
import { useEmployeeContext } from '@/context/EmployeeContext';

type Option = {
    value: number;
    label: string;
};

export default function CreateProjectForm() {
    const { addProject } = useProjects();
    const { employees } = useEmployeeContext();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [managerId, setManagerId] = useState<number | null>(null);
    const [workerIds, setWorkerIds] = useState<Option[]>([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [budget, setBudget] = useState<number | ''>('');
    const [status, setStatus] = useState<ProjectStatus>('PLANNED');
    const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const employeeOptions: Option[] = employees.map(e => ({
        value: e.id,
        label: `${e.firstName} ${e.lastName}`,
    }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const manager = managerId ? employees.find(e => e.id === managerId) : undefined;
        const workers = workerIds
            .map(w => employees.find(e => e.id === w.value))
            .filter(Boolean) as typeof employees;

        const newProject: Project = {
            id: Date.now(), // temporär
            name,
            description,
            manager: manager ? `${manager.firstName} ${manager.lastName}` : '',
            workerList: workers.map(w => `${w.firstName} ${w.lastName}`),
            creationDate: new Date().toISOString().split('T')[0],
            startDate,
            endDate,
            budget: budget || 0,
            status,
        };

        try {
            const res = await fetch('http://localhost:8080/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProject),
            });

            if (res.ok) {
                const savedProject = await res.json();
                addProject(savedProject);
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
            console.error(err);
            setFormStatus('error');
        }
    };

    return (
        <div className="bg-white shadow-md rounded-xl p-6 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Projektname"
                    required
                    className="w-full border rounded-full px-4 py-2"
                />
                <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Beschreibung"
                    className="w-full border rounded-lg px-4 py-2"
                />
                <Select
                    options={employeeOptions}
                    value={employeeOptions.find(o => o.value === managerId) || null}
                    onChange={opt => setManagerId(opt?.value || null)}
                    placeholder="Manager auswählen..."
                    className="w-full"
                    isClearable
                />
                <Select
                    options={employeeOptions}
                    value={workerIds}
                    onChange={opts => setWorkerIds(opts as Option[])}
                    isMulti
                    placeholder="Mitarbeiter auswählen..."
                    className="w-full"
                />
                <input
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    required
                    className="w-full border rounded-full px-4 py-2"
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    required
                    className="w-full border rounded-full px-4 py-2"
                />
                <input
                    type="number"
                    value={budget}
                    onChange={e => setBudget(parseInt(e.target.value) || '')}
                    placeholder="Budget"
                    required
                    className="w-full border rounded-full px-4 py-2"
                />
                <select
                    value={status}
                    onChange={e => setStatus(e.target.value as ProjectStatus)}
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
                    Projekt erstellen
                </button>
            </form>
            {formStatus === 'success' && (
                <div className="text-green-600 text-sm">Projekt erfolgreich erstellt!</div>
            )}
            {formStatus === 'error' && (
                <div className="text-red-600 text-sm">Fehler beim Erstellen des Projekts.</div>
            )}
        </div>
    );
}
