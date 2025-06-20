import Link from 'next/link';

export default function BuildingLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <nav className="bg-white shadow-md px-6 py-4 flex space-x-6 justify-center">
                <Link className="px-4 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition" href="/buildings">Building Starter</Link>
                <Link className="px-4 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition" href="/buildings/dashboard">Dashboard</Link>
                <Link className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition" href="/buildings/newBuilding">Create new Building</Link>
            </nav>
            <section>
                {children}
            </section>
        </div>
    );
}