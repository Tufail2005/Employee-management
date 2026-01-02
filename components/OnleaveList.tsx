import React from "react";

export default function OnLeaveList() {
  return (
    <div className="w-full max-w-sm bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
      {/* Header Section */}
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-center text-emerald-800 font-semibold text-lg">
          On Leave
        </h2>
      </div>

      {/* Content Container */}
      <div className="p-4">
        {/* Date Group Header */}
        <h3 className="text-emerald-800 font-medium mb-3 text-sm">Today (1)</h3>

        {/* Single Employee Card */}
        <div className="flex items-center gap-3 border border-gray-200 rounded-lg p-3 bg-white">
          {/* Avatar (GK) */}
          <div className="h-10 w-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0">
            GK
          </div>

          {/* Text Content */}
          <div className="flex flex-col">
            <span className="font-bold text-gray-900 text-sm">Guru Kiran</span>
            <span className="text-xs text-gray-500">Leave Aug 23 - Sep 7</span>
          </div>
        </div>
      </div>
    </div>
  );
}
