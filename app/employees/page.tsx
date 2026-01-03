import EmployeeList from "@/components/EmployeeList";

export default function Employees() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex items-center gap-4 mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Employees Management
        </h1>
      </div>

      {/* Search and View Toggles */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="search_by_name"
          className="border border-gray-300 rounded-md px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <div className="flex border border-gray-300 rounded-md overflow-hidden bg-white"></div>
      </div>

      {/* Employee Table Container */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        {/* Table Header */}
        <div className="grid grid-cols-5 bg-gray-50 border-b border-gray-200 px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          <div>name</div>
          <div>status</div>
          <div>role</div>
          <div>contact_number</div>
          <div className="text-right"></div>
        </div>

        <EmployeeList />
      </div>
    </div>
  );
}
