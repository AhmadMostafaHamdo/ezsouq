import { Outlet } from "react-router";
import Sidebar from "../../components/dashoard/Sidebar";

const Dashboard = () => {
  return (
    <div className="bg-[#F7F7FF] min-h-screen">
      <div className="container flex gap-6">
        <div>
          <Sidebar />
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
