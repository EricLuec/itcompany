'use client';
import Link from 'next/link';
import {EmployeeProvider} from '@/context/EmployeeContext';
import {SectorProvider} from "@/context/SectorContext";

export default function EmployeeLayout({children}: { children: React.ReactNode }) {
    return (
        <SectorProvider>
            <EmployeeProvider>
                <div className="min-h-screen bg-gray-50">
                    <nav className="bg-white shadow-md px-6 py-4 flex flex-wrap gap-4 justify-center">
                        <Link
                            className="px-4 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
                            href="/employees"
                        >
                            Employee Starter
                        </Link>
                        <Link
                            className="px-4 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
                            href="/employees/dashboard"
                        >
                            Dashboard
                        </Link>
                        <Link
                            className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition"
                            href="/employees/newEmployee"
                        >
                            Create new Employee
                        </Link>
                    </nav>
                    <section className="p-6">{children}</section>
                </div>
            </EmployeeProvider>
        </SectorProvider>
    );
}
