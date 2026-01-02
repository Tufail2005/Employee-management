import CreateEmployeeForm from "@/components/createEmployee"
import SideBar from "@/components/SideBar"

export default function Dashboard(){
    return(
        <div className="flex min-h-screen bg-gray-100">
            <div className="w-72 sticky top-6 h-fit">
                <SideBar />
            </div>

            {/* <div className="flex-1">
                <CreateEmployeeForm />
            </div> */}
        </div>
    )
}