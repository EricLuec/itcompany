'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
    const pathname = usePathname()

    const linkClass = (href: string) =>
        `hover:text-blue-400 ${
            pathname === href ? 'text-blue-500 font-semibold' : ''
        }`

    return (
        <nav className="bg-gray-900 text-white px-4 py-3 flex gap-6">
            <Link href="/" className={linkClass('/')}>Start</Link>
            <Link href="/contact" className={linkClass('/contact')}>Kontakt</Link>
        </nav>
    )
}