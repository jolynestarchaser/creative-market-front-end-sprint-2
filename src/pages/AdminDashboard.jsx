import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/AdminDashboard/01_Sidebar";
import Overview from "../components/AdminDashboard/Overview/00_Overview";
import Orders from "../components/AdminDashboard/Orders/00_Orders";
import Sales from "../components/AdminDashboard/Sales/00_Sales";
import useDashboardOrders from "../hooks/useDashboardOrders";

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState("overview");
  const [orders, setOrders] = useDashboardOrders();
  const navigate = useNavigate();

  useEffect(() => {
    if (activePage === "customer") {
      navigate("/userdashboard");
    }
  }, [activePage, navigate]);

  const renderPage = () => {
    switch (activePage) {
      case "orders":
        return <Orders orders={orders} onUpdateOrders={setOrders} />;
      case "sales":
        return <Sales />;
      case "overview":
      default:
        return (
          <Overview
            orders={orders}
            onUpdateOrders={setOrders}
            onOpenOrders={() => setActivePage("orders")}
          />
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-[#eeedf8]">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <main className="flex-1 overflow-auto p-5 md:p-8">{renderPage()}</main>
    </div>
  );
};

export default AdminDashboard;
