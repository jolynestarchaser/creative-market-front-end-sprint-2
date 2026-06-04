import { LayoutDashboard } from "lucide-react";
import StatsCard from "./01_StatsCard";
import SalesChart from "./02_SalesChart";
import ProductBreakdown from "./03_ProductBreakdown";
import RecentOrders from "./04_RecentOrders";

const formatCurrency = (value) =>
  `฿ ${Number(value || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const Overview = ({ stats, loading, error, onOpenOrders }) => {
  const summaryStats = [
    { label: "TOTAL REVENUE", value: formatCurrency(stats.totalSales) },
    { label: "TOTAL ORDERS", value: String(stats.orderCount) },
    { label: "TOTAL ITEMS", value: String(stats.itemSold) },
    {
      label: "AVERAGE ORDER VALUE",
      value: formatCurrency(stats.averageOrderValue),
    },
  ];

  if (loading) {
    return <section className="text-sm text-gray-500">Loading dashboard...</section>;
  }

  if (error) {
    return <section className="text-sm text-red-500">{error}</section>;
  }

  return (
    <section className="space-y-4">
      <header className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
          <LayoutDashboard className="h-5 w-5" strokeWidth={1.8} />
        </span>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Overview
          </h1>
          <p className="text-sm text-gray-500">Keep track of your sales data</p>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {summaryStats.map((stat) => (
          <StatsCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <SalesChart chartData={stats.salesOverview} />
        <ProductBreakdown
          items={stats.categoryBreakdown}
          totalItems={stats.itemSold}
        />
      </div>

      <RecentOrders orders={stats.recentOrders} onOpenOrders={onOpenOrders} />
    </section>
  );
};

export default Overview;
