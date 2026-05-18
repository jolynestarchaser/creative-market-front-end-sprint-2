import { useEffect, useState } from "react";
import { loadDashboardOrders, saveDashboardOrders } from "../data/dashboardOrders";

const useDashboardOrders = () => {
  const [orders, setOrders] = useState(loadDashboardOrders);

  useEffect(() => {
    saveDashboardOrders(orders);
  }, [orders]);

  return [orders, setOrders];
};

export default useDashboardOrders;
