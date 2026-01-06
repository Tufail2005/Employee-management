"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LeaveHolidayListProps } from "./SearchSection";
import LeaveFormModel from "./LeaveFormModel";
import HolidayFormModel from "./HolidayFormModel";
export default function LeaveHolidayList({ list }: LeaveHolidayListProps) {
    const router = useRouter();

    // State for controlling the Edit Modal
    const [editingLeave, setEditingLeave] = useState<any | null>(null);
    const [editingHoliday, setEditingHoliday] = useState<any | null>(null);

    // Helper to distinguish types
    const isHoliday = (obj: any) => "date" in obj;

    const handleEditClick = (obj: any) => {
        if (isHoliday(obj)) {
        setEditingHoliday(obj);
        } else {
        setEditingLeave(obj);
        }
    };

    const handleDelete = async (id: string, isLeaveType: boolean) => {
        const confirmed = window.confirm(
        "Are you sure you want to delete this item?"
        );
        if (!confirmed) return;

        try {
        const endpoint = isLeaveType
            ? `/api/leavesType/${id}`
            : `/api/holidays/${id}`;

        const res = await fetch(endpoint, {
            method: "DELETE",
        });

        if (res.ok) {
            router.refresh();
        } else {
            const errorData = await res.json();
            alert(`Error: ${errorData.error || "Failed to delete"}`);
        }
        } catch (error) {
        console.error("An unexpected error occurred:", error);
        alert("An unexpected error occurred.");
        }
    };

    return (
        <>
        <div className="divide-y divide-gray-100">
            {list.map((obj) => (
            <div
                key={obj.id}
                className="grid grid-cols-4 px-6 py-4 items-center hover:bg-gray-50/80 transition-colors"
            >
                {/* Name */}
                <div className="text-sm font-medium text-gray-900">{obj.name}</div>

                {/* Date or Days */}
                <div className="text-sm text-gray-600 font-mono italic">
                {"date" in obj
                    ? new Date(obj.date).toISOString().split("T")[0]
                    : `${obj.defaultDays} days`}
                </div>

                {/* Description */}
                <div className="text-sm text-gray-500">
                {"description" in obj ? obj.description : ""}
                </div>

                {/* Actions */}
                <div className="flex justify-center gap-2">
                {/* EDIT BUTTON */}
                <button
                    onClick={() => handleEditClick(obj)} // Open model with this object
                    className="flex items-center gap-1.5 border border-gray-300 rounded px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
                >
                    {/* ... svg icon ... */}
                    edit
                </button>

                <button
                    onClick={() => handleDelete(obj.id, "defaultDays" in obj)}
                    className="flex items-center gap-1.5 border border-red-100 rounded px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                >
                    {/* ... svg icon ... */}
                    delete
                </button>
                </div>
            </div>
            ))}
        </div>

        {/* Render the Model for Editing and deleting */}

        {/* 1. Modal for Leaves */}
        <LeaveFormModel
            isOpen={!!editingLeave} // if editingitem is present then return true else false
            initialData={editingLeave} // PASSING THE DATA
            onClose={() => setEditingLeave(null)}
        />

        <HolidayFormModel
            isOpen={!!editingHoliday}
            initialData={editingHoliday}
            onClose={() => setEditingHoliday(null)}
        />
        </>
    );
}
