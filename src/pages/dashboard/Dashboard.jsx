import { Outlet } from "react-router";
import Sidebar from "../../components/dashoard/Sidebar";
import TopBar from "../../components/dashoard/TopBar";

const Dashboard = () => {
  return (
    <div className="bg-[#F7F7FF] min-h-screen">
      <div className="container flex gap-6">
        <div className="flex">
          <Sidebar />
        </div>
        <div className="w-full">
          <TopBar />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
