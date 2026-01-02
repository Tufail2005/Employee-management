import Link from "next/link"
import AccordianSideBar from "./AccordianSideBar"

export default function SideBar() {
    return (
        <aside className="w-64 h-screen bg-gray-50 border-r border-gray-200 p-4 flex flex-col gap-2">
            <div className="mb-4 px-2">
                <h1 className="text-xl font-bold text-blue-600">Employee Dashboard</h1>
            </div>
            
            <nav className="flex flex-col gap-1">
                <Link 
                    href="/dashboard" 
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                >
                    HR Dashboard
                </Link>
                
                <Link 
                    href="/employees" 
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                >
                    Employee Dashboard
                </Link>

                <AccordianSideBar />
            </nav>
        </aside>
    )
}