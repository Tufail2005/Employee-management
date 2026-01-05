"use client";
import { useState, useEffect } from "react";
import Input from "./Input";
import { useRouter } from "next/navigation";

interface HolidayFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    id: string;
    name: string;
    date: number | string;
    description: string;
  } | null;
}

export default function HolidayFormModel({
  isOpen,
  onClose,
  initialData,
}: HolidayFormModalProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        // Edit Mode: Prefill data
        setName(initialData.name);
        setDate(String(initialData.date));
        setDescription(String(initialData.description));
      } else {
        // Create Mode: Reset
        setName("");
        setDate("");
        setDescription("");
      }
      setError(""); // Clear old errors
    }
  }, [isOpen, initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Determine Method and URL
      const isEditMode = !!initialData; // true if initialData exists
      const url = isEditMode
        ? `/api/holidays/${initialData.id}` // Edit URL
        : "/api/holidays"; // Create URL

      const method = isEditMode ? "PATCH" : "POST"; // PATCH updates, POST creates

      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          date,
          description,
        }),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Operation failed");
      }

      // Success: Refresh data and close
      router.refresh();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl transform transition-all scale-100 overflow-hidden">
        {/* Header Section */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100  bg-blue-600">
          <h2 className="text-xl font-bold text-gray-800 items-center">
            {initialData ? "Edit Holiday" : "Create Holiday"}
          </h2>
        </div>

        {/* Form Section */}
        <form className="p-6 space-y-5" onSubmit={handleSubmit}>
          {/* Error Banner */}
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </div>
          )}

          <Input
            label="Holiday Name"
            type="text"
            placeholder="e.g. Summer Vacation"
            value={name}
            onChangeState={setName}
          />

          <Input
            label="Date"
            type="date"
            placeholder="Select date"
            value={date}
            onChangeState={setDate}
          />

          <Input
            label="Description"
            type="description"
            placeholder="Add a few details..."
            value={description}
            onChangeState={setDescription}
          />

          {/* Footer / Action Buttons */}
          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-md hover:shadow-lg hover:cursor-pointer ${
                isSubmitting
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isSubmitting
                ? "Saving..."
                : initialData
                ? "Update Holiday"
                : "Create Holiday"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
