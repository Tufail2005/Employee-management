"use client"

import Input from "@/components/Input"
import { useState } from "react"
import { useRouter } from "next/navigation";

interface LeaveRequestFormProps {
    onClose: () => void;
}

export default function LeaveRequestForm({ onClose}: LeaveRequestFormProps) {

    const router = useRouter();
    const [reason, setReason] = useState("");
    const [sdate, setSDate] = useState("");
    const [edate, setEDate] = useState("");
    
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        // 1. Validation
        if (!reason || !sdate || !edate) {
            setError("Please fill in all required fields.");
            setIsSubmitting(false);
            return;
        }

        if (new Date(sdate) > new Date(edate)) {
            setError("End date cannot be before start date.");
            setIsSubmitting(false);
            return;
        }

        try {
            const res = await fetch(`/api/leave`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    reason,
                    startDate: sdate,
                    endDate: edate
                })
            });

            // --- CHANGED LOGIC START ---
            if (!res.ok) {
                // 1. Read raw text first
                const text = await res.text(); 
                
                try {
                    // 2. Try to parse it as JSON
                    const data = JSON.parse(text);
                    throw new Error(data.message || "Something went wrong");
                } catch {
                    // 3. If JSON parse fails, use the raw text or status text
                    throw new Error(text || res.statusText || "Request failed");
                }
            }
            // --- CHANGED LOGIC END ---

            router.refresh(); 
            onClose();

        } catch (err: any) {
            console.error("Submission error:", err);
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl transform transition-all scale-100 overflow-hidden">
                    
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-blue-600">
                        <h2 className="text-xl font-bold text-white items-center">
                            Create Leave Request
                        </h2>
                        <button onClick={onClose} className="text-white hover:text-gray-200">
                            ✕
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-5">
                        
                        {error && (
                            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 flex-shrink-0">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                <span>{error}</span>
                            </div>
                        )}

                        <Input
                            label="Reason for leave"
                            type="text"
                            placeholder="e.g. Sick Leave, Vacation"
                            value={reason}
                            onChangeState={setReason}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Start Date"
                                type="date"
                                placeholder="Select date"
                                value={sdate}
                                onChangeState={setSDate}
                            />

                            <Input
                                label="End Date"
                                type="date"
                                placeholder="Select date"
                                value={edate}
                                onChangeState={setEDate}
                            />
                        </div>

                        {/* Buttons */}
                        <div className="pt-4 flex items-center justify-end gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg transition-all shadow-md ${
                                    isSubmitting
                                        ? "bg-blue-400 cursor-not-allowed"
                                        : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
                                }`}
                            >
                                {isSubmitting ? "Submitting..." : "Submit Request"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}