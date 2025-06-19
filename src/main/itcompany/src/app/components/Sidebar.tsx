'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
    { name: 'Startseite', href: '/' },
    { name: 'Employees', href: '/employees' },
    { name: 'Sector', href: '/sector' },
    { name: 'Inventory', href: '/inventory' },
    { name: 'Buildings', href: '/building' },
    { name: 'Invoices', href: '/invoice' },

]

export default function Sidebar() {
    const pathname = usePathname()

    return (
        <aside className="w-64 bg-gray-100 p-4 border-r h-screen fixed top-0 left-0 ">
            <div className="mb-8 text-2xl font-bold text-blue-600">MeinLogo</div>
            <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`p-4 rounded-xl shadow-md transition-all ${
                            pathname === item.href
                                ? 'bg-blue-500 text-white'
                                : 'bg-white hover:bg-blue-100'
                        }`}
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>
        </aside>
    )
}
