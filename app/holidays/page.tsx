import prisma from "@/lib/prisma";
import Button from "@/components/Button";
import SearchSection from "@/components/SearchSection";
import CreateHolidayBtn from "@/components/CreateHolidayBtn";

export default async function Holidays() {
  const holidayList = await prisma.holidays.findMany();

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
          <SearchSection list={holidayList} />
        </div>
      </div>
    </div>
  );
}
