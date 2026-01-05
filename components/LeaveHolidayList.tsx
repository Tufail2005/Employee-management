import { LeaveHolidayListProps } from "./SearchSection";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

export default function LeaveHolidayList({ list, type}: LeaveHolidayListProps) {
    return (
        <div className="divide-y divide-gray-100">
            {list.map((obj) => (
                <div 
                    key={obj.id} 
                    className="grid grid-cols-4 px-6 py-4 items-center hover:bg-gray-50/80 transition-colors"
                >
                    {/* 1. Name Column */}
                    <div className="text-sm font-medium text-gray-900">
                        {obj.name}
                    </div>

                    {/* 2. Date Column */}
                    <div className="text-sm text-gray-600 font-mono italic">
                        {"date" in obj 
                            ? obj.date.toISOString().split('T')[0] 
                            : `${obj.defaultDays} days`}
                    </div>

                    {/* 3. Description Column */}
                    {"description" in obj && <div className="text-sm text-gray-500 truncate pr-8">
                        {obj.description}
                    </div>
                    }

                    {/* 4. Actions Column */}
                    <div className="flex justify-center gap-2">
                        <EditButton id={obj.id} type={type} />
                        <DeleteButton id={obj.id} type={type}/>
                    </div>
                </div>
            ))}
        </div>
    );
}