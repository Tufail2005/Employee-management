import prisma from "@/lib/prisma";
import LeaveStatus from "./LeaveStatusButton";
import { redis } from "@/lib/redis";

export default async function LeaveReqList() {
  const CACHE_KEY = "leaves:all";
    let leaves = [];

    const cachedData = await redis.get(CACHE_KEY);

    if(cachedData){
        console.log("🚀 Cache HIT")
        // Redis stores strings, so we must parse it back to an Object
        leaves = JSON.parse(cachedData); //parse=> string to object 
    }else{
        console.log("🐢 Cache MISS");
        leaves = await prisma.leave.findMany({
          include: {
            user: true,
          },
          orderBy: {
            createAt: "desc",
          },
        });
    };
    if (leaves) {
            await redis.set(CACHE_KEY, JSON.stringify(leaves), 'EX', 900);
    }



  return (
    <div className=" w-full max-w-3xl bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
      {/* Header Section */}
      <div className="text-center text-emerald-800 font-semibold text-lg p-4 border-b border-gray-100 mt-7">
        <h2>
          Leave Requests ({leaves.length})
        </h2>
      </div>

      {/* List Container */}
      <div className="p-6">
        {leaves.map((leave:any) => (
          <div key={leave.id}>
            {/* Single List Item Card */}
            <div className="flex items-center justify-between border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
              {/* Left Side: Avatar + Info */}
              <div className="flex items-start gap-4">
                {/* Avatar (GK) */}
                <div className="h-12 w-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xl shrink-0">
                  {leave.user.name?.substring(0, 2).toUpperCase() || "EE"}
                </div>

                {/* Text Content */}
                <div className="flex flex-col gap-1">
                  <div className="text-gray-900 text-sm">
                    <span className="font-bold text-base mr-1">
                      {leave.user.name}
                    </span>
                    <span>
                      requested
                      {new Date(leave.startDate).toLocaleDateString("en-US", {
                        dateStyle: "short",
                      })}
                      -
                      {new Date(leave.endDate).toLocaleDateString("en-US", {
                        dateStyle: "short",
                      })}
                      off
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 font-medium">
                    {leave.createAt.toLocaleString("en-US", {
                      dateStyle: "short",
                      timeStyle: "medium",
                    })}
                  </div>
                </div>
              </div>

              {/* Right Side: Status Badge */}
              <div className="shrink-0">
                <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-md text-xs font-semibold border border-gray-400 cursor-pointer  hover:bg-emerald-500 transition-colors">
                  <LeaveStatus id={leave.id} status={leave.status}/>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
