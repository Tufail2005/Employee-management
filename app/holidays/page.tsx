import prisma from "@/lib/prisma";
import Button from "@/components/Button";
import SearchSection from "@/components/SearchSection";
import CreateHolidayBtn from "@/components/CreateHolidayBtn";
import { redis } from "@/lib/redis";
export default async function Holidays() {

  const CACHE_KEY = "holidays:all";
    let holidayList = [];

    const cachedData = await redis.get(CACHE_KEY);

    if(cachedData){
        console.log("🚀 Cache HIT")
        // Redis stores strings, so we must parse it back to an Object
        holidayList = JSON.parse(cachedData); //parse=> string to object 
    }else{
        console.log("🐢 Cache MISS");
        holidayList = await prisma.holidays.findMany();
    };
    if (holidayList) {
            await redis.set(CACHE_KEY, JSON.stringify(holidayList), 'EX', 900);
    }
    

  return (
    <div className="min-h-screen bg-gray-50/50 p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold text-green-900 tracking-tight">
              holidays
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Manage holidays for your organization
            </p>
          </div>
          <div>
            <CreateHolidayBtn />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="space-y-6">
          <SearchSection list={holidayList} type="holiday" />
        </div>
      </div>
    </div>
  );
}
