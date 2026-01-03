import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function EmployeeList() {
    const users = await prisma.user.findMany({});

    return (
        <div className="divide-y divide-gray-200">
        {users.map((user) => (
            <div key={user.id} className="grid grid-cols-5 px-6 py-4 items-center hover:bg-gray-50 transition-colors">
            
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                {user.name?.substring(0, 2).toUpperCase() || "EE"}
                </div>
                <div>
                <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{user.name}</p>
            </div>
          </div>

          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium bg-yellow-100 text-green-700 border border-yellow-200">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              active
            </span>
          </div>

          <div className="text-sm text-gray-600 capitalize">
            {user.role || "staff"}
          </div>

          <div className="text-sm text-gray-600">
            {user.phoneNo || "+91 00000 00000"}
          </div>

          <div className="text-right">
            <Link
              href={`/employeedetails/${user.id}`}
              className="border border-gray-300 rounded px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100 transition-all shadow-sm"
            >
              see_details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
