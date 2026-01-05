"use client"
import { useState } from "react"
import Input from "./Input"
import LeaveHolidayList from "./LeaveHolidayList"
import TableHeader from "./TableHeader"
import LeaveTableHeader from "./LeaveTableHeader"
interface HolidayItem {
    id: string;
    name: string;
    date: Date;
    description: string;
}
interface LeaveTypeItem {
    id: string;
    name: string;
    defaultDays: number;
}

export interface LeaveHolidayListProps {
    list: (HolidayItem | LeaveTypeItem)[];
    type: 'leave' | 'holiday';
}

export default function SearchSection({ list }: LeaveHolidayListProps) {
    const [searchValue, setSearchValue] = useState("");

    const filteredList = list.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
    )
    const isLeaveType = list.length > 0 && "defaultDays" in list[0];
    if(isLeaveType){
    }
    return (
        <div className="space-y-6">
            {/* Search Input Container */}
            <div className="max-w-sm">
                <Input 
                    placeholder="Search holidays..."
                    type="text"
                    value={searchValue}
                    onChangeState={setSearchValue}
                />
            </div>

            {/* Table Frame */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                {isLeaveType
                ?<LeaveTableHeader col1="name" col2="default days"/>
                :<TableHeader col1="holiday" col2="date" col3="description"/>
            }

                {/* List Logic */}
                {filteredList.length === 0 ? (
                    <div className="p-16 text-center">
                        <p className="text-gray-400 text-sm">Not matching "{searchValue}"</p>
                    </div>
                ) : (
                    <LeaveHolidayList list={filteredList} type={isLeaveType?"leave":"holiday"}/>
                )}
            </div>
        </div>
    );
}