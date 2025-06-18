import './globals.css'
import Sidebar from './components/Sidebar'

export const metadata = {
    title: 'Virtual IT-Company'
}

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="de">
        <body className="bg-gray-50 text-gray-800 font-sans">
        <Sidebar/>
        <div className="ml-100% min-h-screen">
            <main className="p-8">{children}</main>
        </div>
        </body>
        </html>
    )
}
