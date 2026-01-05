import CreateEmpBtn from "./CreateEmpBtn";
import LeaveReqList from "./LeaveReqList";
import OnLeaveList from "./OnleaveList";
export default function Hero() {
  return (
    <div>
      <CreateEmpBtn />
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="lg:col-span-1">
          <LeaveReqList />
        </div>
        <div className="lg:col-span-1">
          <OnLeaveList />
        </div>
      </div>
    </div>
  );
}
