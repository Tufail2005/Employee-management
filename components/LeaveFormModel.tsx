"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Input from "./Input"; // Assuming you have this component

interface LeaveFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    id: string;
    name: string;
    defaultDays: number | string;
  } | null;
}

export default function LeaveFormModel({
  isOpen,
  onClose,
  initialData,
}: LeaveFormModalProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [defaultDays, setDefaultDays] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        // Edit Mode
        setName(initialData.name);
        setDefaultDays(String(initialData.defaultDays));
      } else {
        // Create Mode
        setName("");
        setDefaultDays("");
      }
      // Clear old errors
      setError("");
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
        ? `/api/leavesType/${initialData.id}` // Edit URL
        : "/api/leavesType"; // Create URL

      const method = isEditMode ? "PATCH" : "POST"; // PATCH updates, POST creates

      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, defaultDays: Number(defaultDays) }),
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
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-blue-600">
          <h2 className="text-xl font-bold text-white">
            {initialData ? "Edit Leave" : "Create Leave"}
          </h2>
        </div>

        {/* Form */}
        <form className="p-6 space-y-5" onSubmit={handleSubmit}>
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
              {error}
            </div>
          )}

          <Input
            label="Leave Name"
            type="text"
            placeholder="e.g. Sick leave"
            value={name}
            onChangeState={setName}
          />

          <Input
            label="Default Days"
            type="number"
            placeholder="0"
            value={defaultDays}
            onChangeState={setDefaultDays}
          />

          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg transition-all shadow-md ${
                isSubmitting
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isSubmitting
                ? "Saving..."
                : initialData
                ? "Update Leave"
                : "Create Leave"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
