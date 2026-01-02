import React from "react";

export default function LeaveReqList() {
  return (
    <div className="w-full max-w-3xl bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
      <button className="flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-2 rounded-md font-medium transition-colors mb-6">
        <span className="text-lg">+</span>
        Create Employee
      </button>
      {/* Header Section */}
      <div className="p-4 border-b border-gray-100 mt-7">
        <h2 className="text-center text-emerald-800 font-semibold text-lg">
          Leave Requests
        </h2>
      </div>

      {/* List Container */}
      <div className="p-6">
        {/* Single List Item Card */}
        <div className="flex items-center justify-between border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
          {/* Left Side: Avatar + Info */}
          <div className="flex items-start gap-4">
            {/* Avatar (GK) */}
            <div className="h-12 w-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xl shrink-0">
              GK
            </div>

            {/* Text Content */}
            <div className="flex flex-col gap-1">
              <div className="text-gray-900 text-sm">
                <span className="font-bold text-base mr-1">Guru kiran</span>
                <span>requested 8/31/2025 - 9/9/2025 off</span>
              </div>
              <div className="text-xs text-gray-400 font-medium">
                8/28/2025, 4:16:23 PM
              </div>
            </div>
          </div>

          {/* Right Side: Status Badge */}
          <div className="shrink-0">
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-md text-xs font-semibold border border-gray-200">
              Pending
            </span>
          </div>
        </div>
      </div>

      {/* 2nd block */}
      <div className="p-6">
        {/* Single List Item Card */}
        <div className="flex items-center justify-between border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
          {/* Left Side: Avatar + Info */}
          <div className="flex items-start gap-4">
            {/* Avatar (GK) */}
            <div className="h-12 w-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xl shrink-0">
              AD
            </div>

            {/* Text Content */}
            <div className="flex flex-col gap-1">
              <div className="text-gray-900 text-sm">
                <span className="font-bold text-base mr-1">Ashis Dutta</span>
                <span>requested 2/1/2026 - 5/1/2026 off</span>
              </div>
              <div className="text-xs text-gray-400 font-medium">
                8/28/2025, 4:16:23 PM
              </div>
            </div>
          </div>

          {/* Right Side: Status Badge */}
          <div className="shrink-0">
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-md text-xs font-semibold border border-gray-200">
              Pending
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
