import Link from 'next/link';
import { InventoryProvider } from '@/context/InventoryContext';
import { ItemProvider } from "@/context/ItemContext";
import { EmployeeProvider } from '@/context/EmployeeContext'; // EmployeeProvider importieren

export default function ItemLayout({ children }: { children: React.ReactNode }) {
    return (
        <EmployeeProvider> {/* EmployeeProvider um das Layout legen */}
            <InventoryProvider>
                <ItemProvider>
                    <div>
                        <nav className="bg-white shadow-md px-6 py-4 flex space-x-6 justify-center">
                            <Link className="px-4 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition" href="/items">Items Starter</Link>
                            <Link className="px-4 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition" href="/items/dashboard">Dashboard</Link>
                            <Link className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition" href="/items/newItem">Create new Item</Link>
                        </nav>
                        <section>
                            {children}
                        </section>
                    </div>
                </ItemProvider>
            </InventoryProvider>
        </EmployeeProvider>
    );
}
