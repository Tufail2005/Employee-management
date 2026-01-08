"use client"
import { useState } from "react"
import LeaveRequestForm from "./LeaveRequestForm"

export default function ReqButton() {
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="font-sans">
            <button
                onClick={() => setShowForm(!showForm)}
                className={`
                    flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 shadow-sm border focus:outline-none focus:ring-2 focus:ring-offset-2
                    ${showForm
                        ? "bg-red-50 text-red-600 border-red-200 hover:bg-red-100 focus:ring-red-500"
                        : "bg-blue-600 text-white border-transparent hover:bg-blue-700 hover:shadow-md focus:ring-blue-500 active:scale-95"
                    }
                `}
            >
                {/* Optional: Icon logic for better UI */}
                {!showForm && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                )}
                
                {showForm ? "Close Form" : "Request Leave"}
            </button>

            {showForm && (
                // Added a wrapper with margin and animation fade-in utility if needed
                <div className="mt-4 animate-in fade-in zoom-in duration-200">
                    <LeaveRequestForm onClose={() => setShowForm(false)} />
                </div>
            )}
        </div>
    )
}