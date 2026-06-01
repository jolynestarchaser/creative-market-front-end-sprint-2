import { useEffect, useState } from "react";

const serverBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:7777";

const initialState = {
  profile: null,
  summary: {
    totalOrders: 0,
    totalSpend: 0,
  },
  statusOrders: [],
  historyOrders: [],
  ordersSummary: {
    totalOrders: 0,
    totalSpend: 0,
    completedOrders: 0,
  },
  orders: [],
};

const useUserDashboard = () => {
  const [dashboardData, setDashboardData] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const options = {
          credentials: "include",
          signal: controller.signal,
        };

        const requests = await Promise.all([
          fetch(`${serverBaseUrl}/api/user-dashboard/me`, options),
          fetch(`${serverBaseUrl}/api/user-dashboard/my-summary`, options),
          fetch(`${serverBaseUrl}/api/user-dashboard/my-status`, options),
          fetch(`${serverBaseUrl}/api/user-dashboard/my-history`, options),
          fetch(`${serverBaseUrl}/api/user-dashboard/my-orders`, options),
        ]);

        const responses = await Promise.all(requests.map((request) => request.json()));
        const failedIndex = requests.findIndex((request) => !request.ok);

        if (failedIndex >= 0) {
          throw new Error(
            responses[failedIndex]?.message || "Failed to load dashboard data",
          );
        }

        setDashboardData({
          profile: responses[0].data,
          summary: responses[1].data,
          statusOrders: responses[2].data,
          historyOrders: responses[3].data,
          ordersSummary: responses[4].data.summary,
          orders: responses[4].data.orders,
        });
      } catch (fetchError) {
        if (fetchError.name === "AbortError") {
          return;
        }

        setError(fetchError.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();

    return () => controller.abort();
  }, []);

  return { dashboardData, loading, error };
};

export default useUserDashboard;
