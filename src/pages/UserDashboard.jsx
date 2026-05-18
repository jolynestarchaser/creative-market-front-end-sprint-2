import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/UserDashboard/01_Sidebar";
import Overview from "../components/UserDashboard/Overview/00_Overview";
import MyOrders from "../components/UserDashboard/MyOrders/00_MyOrders";
import MyAddress from "../components/UserDashboard/MyAddress/00_MyAddress";
import useDashboardOrders from "../hooks/useDashboardOrders";

const UserDashboard = () => {
  const [activePage, setActivePage] = useState("overview");
  const [orders] = useDashboardOrders();
  const navigate = useNavigate();

  const renderPage = () => {
    switch (activePage) {
      case "my-orders":
        return <MyOrders orders={orders} />;
      case "my-address":
        return <MyAddress />;
      case "overview":
      default:
        return (
          <Overview
            orders={orders}
            onOpenOrders={() => setActivePage("my-orders")}
          />
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-[#eeedf8]">
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        onOpenAdmin={() => navigate("/admindashboard")}
      />
      <main className="flex-1 p-6 lg:p-10">{renderPage()}</main>
    </div>
  );
};

export default UserDashboard;
