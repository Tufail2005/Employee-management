import LeaveReqList from "./LeaveReqList";
import OnLeaveList from "./OnleaveList";
export default function Hero() {
  return (
    <div className="className= min-h-screen bg-gray-50 p-8 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className=" lg:col-span-1 bg-red-400">
          <h1>side bar</h1>
        </div>
        <div className="lg:col-span-2">
          <LeaveReqList />
        </div>
        <div className="lg:col-span-1">
          <OnLeaveList />
        </div>
      </div>
    </div>
  );
}
