"use client";

import Link from "next/link";
import { useState } from "react";

export default function AccordianSideBar() {
  const [openPOP, setOpenPOP] = useState(0);

  return (
    <div className="flex flex-col gap-1">
      <button
        className={`w-full text-left px-4 py-2 text-sm font-medium rounded-lg transition-colors flex justify-between items-center ${
          openPOP === 1
            ? "bg-gray-200 text-gray-900"
            : "text-gray-700 hover:bg-gray-100"
        }`}
        onClick={() => setOpenPOP(openPOP === 1 ? 0 : 1)}
      >
        <span>Leave Settings</span>
        <span
          className={`transform transition-transform ${
            openPOP === 1 ? "rotate-180" : ""
          }`}
        >
          ▾
        </span>
      </button>

      {openPOP === 1 && (
        <div className="ml-4 mt-1 flex flex-col gap-1 border-l-2 border-gray-200 pl-2">
          <Link
            href="/holidays"
            className="px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
          >
            Holidays
          </Link>
          <Link
            href="/leavetypes"
            className="px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
          >
            Leave Types
          </Link>
        </div>
      )}
    </div>
  );
}
