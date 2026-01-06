import React from "react";
import prisma from "@/lib/prisma";
import { redis } from "@/lib/redis";
export default async function OnLeaveList() {
  const CACHE_KEY = "onLeaveList:all";
    let Onleaves = [];

    const cachedData = await redis.get(CACHE_KEY);

    if(cachedData){
        console.log("🚀 Cache HIT")
        // Redis stores strings, so we must parse it back to an Object
        Onleaves = JSON.parse(cachedData); //parse=> string to object 
    }else{
        console.log("🐢 Cache MISS");
        const today = new Date();
        Onleaves = await await prisma.leave.findMany({
              where: {
                startDate: {
                  lte: today,
                },

                endDate: {
                  gte: today,
                },
                status:"approved"
              },
              include: {
                user: true,
              },
              orderBy: {
                createAt: "desc",
              },
            });
          };
    if (Onleaves) {
            await redis.set(CACHE_KEY, JSON.stringify(Onleaves), 'EX', 900);
    }


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

        {Onleaves.map((onleave:any) => (
          <div key={onleave.id}>
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
