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
                <main className="ml-64 p-8 min-h-screen">{children}</main>
            </body>
        </html>
    )
}
