import React from "react";
import prisma from "@/lib/prisma";

export default async function OnLeaveList() {
  const today = new Date();
  const Onleaves = await prisma.leave.findMany({
    where: {
      startDate: {
        gte: today,
      },

      endDate: {
        lte: today,
      },
    },
    include: {
      user: true,
    },
    orderBy: {
      createAt: "desc",
    },
  });
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
        <h3 className="text-emerald-800 font-medium mb-3 text-sm">
          Today ({Onleaves.length})
        </h3>

        {Onleaves.map((onleave) => (
          <div>
            {/* Single Employee Card */}
            <div className="flex items-center gap-3 border border-gray-200 rounded-lg p-3 bg-white">
              {/* Avatar (GK) */}
              <div className="h-10 w-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0">
                {onleave.user.name?.substring(0, 2).toUpperCase() || "EE"}
              </div>

              {/* Text Content */}
              <div className="flex flex-col">
                <span className="font-bold text-gray-900 text-sm">
                  {onleave.user.name}
                </span>
                <span className="text-xs text-gray-500">
                  Leave{" "}
                  {onleave.startDate.toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                  })}{" "}
                  -{" "}
                  {onleave.endDate.toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
