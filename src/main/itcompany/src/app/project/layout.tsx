'use client'
import { ProjectProvider } from '@/context/ProjectContext';
import { EmployeeProvider } from '@/context/EmployeeContext';
import Link from 'next/link';

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProjectProvider>
            <EmployeeProvider>
                <div>
                    <nav className="bg-white shadow-md rounded-2xl px-6 py-4 flex space-x-6 justify-center">
                        <Link
                            className="px-4 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
                            href="/project"
                        >
                            Project Starter
                        </Link>
                        <Link
                            className="px-4 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
                            href="/project/dashboard"
                        >
                            Dashboard
                        </Link>
                        <Link
                            className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition"
                            href="/project/newProject"
                        >
                            Create new Project
                        </Link>
                    </nav>
                    <section>{children}</section>
                </div>
            </EmployeeProvider>
        </ProjectProvider>
    );
}
