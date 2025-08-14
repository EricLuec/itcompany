'use client';

import { useState } from 'react';
import Select from 'react-select';
import { useEmployeeContext } from '@/context/EmployeeContext';

type ManagerOption = {
    value: number;
    label: string;
};

export default function CreateEmployeeForm() {
    const { employees, addEmployee } = useEmployeeContext();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [salary, setSalary] = useState<number | ''>('');
    const [manager, setManager] = useState<ManagerOption | null>(null);
    const [hireDate, setHireDate] = useState('');
    const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const managerOptions: ManagerOption[] = employees.map(e => ({
        value: e.id,
        label: `${e.firstName} ${e.lastName}`,
    }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            firstName,
            lastName,
            email,
            salary: salary || 0,
            manager: manager ? manager.label : '',
            hireDate,
        };

        try {
            const res = await fetch('http://localhost:8080/employees', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                const newEmployee = await res.json();
                addEmployee(newEmployee);

                setFirstName('');
                setLastName('');
                setEmail('');
                setSalary('');
                setManager(null);
                setHireDate('');
                setFormStatus('success');
            } else {
                setFormStatus('error');
            }
        } catch (err) {
            console.error(err);
            setFormStatus('error');
        }
    };

    return (
        <div className="bg-white shadow-md rounded-xl p-6 max-w-md mx-auto space-y-6 mt-8">
            <h2 className="text-xl font-semibold text-gray-700">Create new Employee</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="FirstName"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    required
                    className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />

                <input
                    type="text"
                    placeholder="LastName"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    required
                    className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />

                <input
                    type="email"
                    placeholder="E-Mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />

                <input
                    type="number"
                    placeholder="Salary (CHF)"
                    value={salary}
                    onChange={e => setSalary(parseInt(e.target.value) || '')}
                    required
                    className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />

                <div>
                    <label className="block mb-1 text-gray-700 font-medium">Manager</label>
                    <Select
                        options={managerOptions}
                        value={manager}
                        onChange={setManager}
                        isClearable
                        placeholder="Select manager..."
                        className="rounded"
                        classNamePrefix="react-select"
                    />
                </div>

                <label className="block">
                    <span className="text-gray-700">Hire-Date</span>
                    <input
                        type="date"
                        value={hireDate}
                        onChange={e => setHireDate(e.target.value)}
                        required
                        className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                </label>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition"
                >
                    Create
                </button>
            </form>

            {formStatus === 'success' && (
                <div className="text-green-600 text-sm mt-2">Successfully created Employee!</div>
            )}
            {formStatus === 'error' && (
                <div className="text-red-600 text-sm mt-2">Error, please try again.</div>
            )}
        </div>
    );
}
