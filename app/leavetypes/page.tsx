import prisma from "@/lib/prisma";
import Button from "@/components/Button";
import SearchSection from "@/components/SearchSection";
import CreateLeaveBtn from "@/components/CreateLeaveBtn";
import { redis } from "@/lib/redis";


export default async function LeaveTypes() {
  const CACHE_KEY = "leavetype:all";
    let LeaveTypeList = [];

    const cachedData = await redis.get(CACHE_KEY);

    if(cachedData){
        console.log("🚀 Cache HIT")
        // Redis stores strings, so we must parse it back to an Object
        LeaveTypeList = JSON.parse(cachedData); //parse=> string to object 
    }else{
        console.log("🐢 Cache MISS");
        LeaveTypeList = await prisma.leaveType.findMany();
    };
    if (LeaveTypeList) {
            await redis.set(CACHE_KEY, JSON.stringify(LeaveTypeList), 'EX', 900);
    }


  return (
    <div className="min-h-screen bg-gray-50/50 p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold text-green-900 tracking-tight">
              Leave Types
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Manage leave types and their default days
            </p>
          </div>
          <div>
            <CreateLeaveBtn />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="space-y-6">
          <SearchSection list={LeaveTypeList} type="leave"/>
        </div>
      </div>
    </div>
  );
}
