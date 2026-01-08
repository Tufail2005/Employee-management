import BasicInfo from "@/components/BasicInfo"
import ReqButton from "@/components/LeaveReqButton"
import { authOption } from "@/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function EmployeeDashboard() {

    const session = await getServerSession(authOption);

    if (!session || !session.user) {
        redirect("/login");
    }
    
    const userId = session.user.id;
    const userName = session.user.name || "Employee";

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                
                {/* 1. Header Section */}
                <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                            Welcome back, {userName}
                        </h1>
                        <p className="mt-2 text-sm text-gray-500">
                            your profile, and submit leave requests.
                        </p>
                    </div>
                    {/* The Request Button floats top-right for easy access */}
                    <div className="flex-shrink-0">
                        <ReqButton/>
                    </div>
                </div>


                {/* 3. Main Content Area */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                        <h2 className="font-semibold text-gray-800">
                            Personal Information
                        </h2>
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-100 text-blue-700">
                            Active
                        </span>
                    </div>
                    
                    <div className="p-6 md:p-8">
                        <BasicInfo id={userId}/>
                    </div>
                </div>

            </main>
        </div>
    )
}