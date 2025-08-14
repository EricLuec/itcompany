'use client';

import Link from 'next/link';
import { InventoryProvider } from '@/context/InventoryContext';
import { EmployeeProvider } from '@/context/EmployeeContext';

export default function InventoryLayout({ children }: { children: React.ReactNode }) {
    return (
        <EmployeeProvider>
            <InventoryProvider>
                <div>
                    <nav className="bg-white shadow-md px-6 py-4 flex space-x-6 justify-center">
                        <Link className="px-4 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition" href="/inventory">
                            Inventory Starter
                        </Link>
                        <Link className="px-4 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition" href="/inventory/dashboard">
                            Dashboard
                        </Link>
                        <Link className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition" href="/inventory/newInventory">
                            Create new Inventory
                        </Link>
                    </nav>
                    <section>{children}</section>
                </div>
            </InventoryProvider>
        </EmployeeProvider>
    );
}
