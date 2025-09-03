'use client';

import React, { useState, useEffect } from 'react';
import { useEmployees, Employee } from '@/context/EmployeeContext';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement, LineElement, PointElement } from 'chart.js';

ChartJS.register(
    Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement, LineElement, PointElement
);

interface DashboardStats {
    totalEmployees: number;
    averageSalary: number;
    employeesPerManager: Record<string, number>;
    salaryDistribution: Record<string, number>;
    departmentSalaries: Record<string, number>;
    monthlyHiring: { [key: string]: number };
}

export default function DashboardPage() {
    const { employees } = useEmployees();
    const [stats, setStats] = useState<DashboardStats>({
        totalEmployees: 0,
        averageSalary: 0,
        employeesPerManager: {},
        salaryDistribution: {},
        departmentSalaries: {},
        monthlyHiring: {},
    });

    useEffect(() => {
        if (employees.length > 0) {
            const totalEmployees = employees.length;
            const totalSalary = employees.reduce((acc, emp) => acc + emp.salary, 0);
            const averageSalary = totalSalary / totalEmployees;

            const employeesPerManager = employees.reduce((acc, emp) => {
                if (emp.manager) {
                    acc[emp.manager] = acc[emp.manager] ? acc[emp.manager] + 1 : 1;
                }
                return acc;
            }, {} as Record<string, number>);

            const salaryDistribution = employees.reduce((acc, emp) => {
                const range = emp.salary < 3000 ? '0-3000' : emp.salary < 5000 ? '3000-5000' : '5000+';
                acc[range] = acc[range] ? acc[range] + 1 : 1;
                return acc;
            }, {} as Record<string, number>);

            const departmentSalaries = employees.reduce((acc, emp) => {
                if (emp.sector) {
                    if (!acc[emp.sector.id]) {
                        acc[emp.sector.id] = { totalSalary: 0, employeeCount: 0 };
                    }
                    acc[emp.sector.id].totalSalary += emp.salary;
                    acc[emp.sector.id].employeeCount++;
                }
                return acc;
            }, {} as Record<string, { totalSalary: number; employeeCount: number }>);

            const departmentAvgSalaries = Object.keys(departmentSalaries).reduce((acc, dept) => {
                const { totalSalary, employeeCount } = departmentSalaries[dept];
                acc[dept] = totalSalary / employeeCount;
                return acc;
            }, {} as Record<string, number>);

            const monthlyHiring = employees.reduce((acc, emp) => {
                const month = new Date(emp.hireDate).toLocaleString('default', { month: 'short', year: 'numeric' });
                acc[month] = acc[month] ? acc[month] + 1 : 1;
                return acc;
            }, {} as { [key: string]: number });

            setStats({
                totalEmployees,
                averageSalary,
                employeesPerManager,
                salaryDistribution,
                departmentSalaries: departmentAvgSalaries,
                monthlyHiring,
            });
        }
    }, [employees]);

    const barChartData = {
        labels: Object.keys(stats.employeesPerManager),
        datasets: [
            {
                label: 'Employees per Manager',
                data: Object.values(stats.employeesPerManager),
                backgroundColor: '#4A90E2',
            },
        ],
    };

    const doughnutChartData = {
        labels: Object.keys(stats.salaryDistribution),
        datasets: [
            {
                label: 'Salary Distribution',
                data: Object.values(stats.salaryDistribution),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    const departmentSalaryData = {
        labels: Object.keys(stats.departmentSalaries),
        datasets: [
            {
                label: 'Average Salary by Department',
                data: Object.values(stats.departmentSalaries),
                backgroundColor: '#FF9F40',
            },
        ],
    };

    const monthlyHiringData = {
        labels: Object.keys(stats.monthlyHiring),
        datasets: [
            {
                label: 'Employees Hired per Month',
                data: Object.values(stats.monthlyHiring),
                fill: false,
                borderColor: '#4CAF50',
                tension: 0.1,
            },
        ],
    };

    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
            <div className="bg-white shadow-md rounded-xl p-6 space-y-6">
                <h2 className="text-lg font-semibold">Employee Dashboard</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-blue-500 text-white p-6 rounded-xl shadow-lg">
                        <h3 className="text-xl font-semibold">Total Employees</h3>
                        <p className="text-2xl">{stats.totalEmployees}</p>
                    </div>

                    <div className="bg-green-500 text-white p-6 rounded-xl shadow-lg">
                        <h3 className="text-xl font-semibold">Average Salary</h3>
                        <p className="text-2xl">{stats.averageSalary.toFixed(2)} €</p>
                    </div>

                    <div className="bg-yellow-500 text-white p-6 rounded-xl shadow-lg">
                        <h3 className="text-xl font-semibold">Employees per Manager</h3>
                        <div className="h-64">
                            <Bar data={barChartData} options={{ responsive: true }} />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                    <div className="bg-purple-500 text-white p-6 rounded-xl shadow-lg">
                        <h3 className="text-xl font-semibold">Salary Distribution</h3>
                        <div className="h-64">
                            <Doughnut data={doughnutChartData} options={{ responsive: true }} />
                        </div>
                    </div>

                    <div className="bg-orange-500 text-white p-6 rounded-xl shadow-lg">
                        <h3 className="text-xl font-semibold">Average Salary by Department</h3>
                        <div className="h-64">
                            <Bar data={departmentSalaryData} options={{ responsive: true }} />
                        </div>
                    </div>
                </div>

                <div className="bg-teal-500 text-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-semibold">Monthly Hiring</h3>
                    <div className="h-64">
                        <Line data={monthlyHiringData} options={{ responsive: true }} />
                    </div>
                </div>

                <div className="bg-white shadow-md rounded-xl p-6">
                    <h2 className="text-lg font-semibold mb-4">Latest Employees</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
                            <thead>
                            <tr className="bg-blue-500 text-white text-left">
                                <th className="px-6 py-3">ID</th>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Hire-Date</th>
                            </tr>
                            </thead>
                            <tbody>
                            {employees.slice(0, 5).map((emp) => (
                                <tr key={emp.id} className="border-t hover:bg-blue-50 transition">
                                    <td className="px-6 py-4">{emp.id}</td>
                                    <td className="px-6 py-4">{emp.firstName} {emp.lastName}</td>
                                    <td className="px-6 py-4">{emp.hireDate ? new Date(emp.hireDate).toLocaleDateString() : '—'}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
