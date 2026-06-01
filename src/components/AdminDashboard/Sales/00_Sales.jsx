import { BarChart3 } from "lucide-react";
import StatsCard from "../Overview/01_StatsCard";
import SalesChart from "../Overview/02_SalesChart";
import ProductBreakdown from "../Overview/03_ProductBreakdown";

const formatCurrency = (value, includePrefix = true) => {
  const formattedValue = Number(value || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return includePrefix ? `THB ${formattedValue}` : formattedValue;
};

const Sales = ({ stats, loading, error }) => {
  const summaryStats = [
    { label: "TOTAL SALES", value: formatCurrency(stats.totalSales) },
    { label: "ORDER", value: String(stats.orderCount) },
    { label: "ITEM SOLD", value: String(stats.itemSold) },
    {
      label: "AVERAGE ORDER VALUE",
      value: formatCurrency(stats.averageOrderValue, false),
    },
  ];

  if (loading) {
    return <section className="text-sm text-gray-500">Loading sales data...</section>;
  }

  if (error) {
    return <section className="text-sm text-red-500">{error}</section>;
  }

  return (
    <section className="space-y-4">
      <header className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
          <BarChart3 className="h-5 w-5" strokeWidth={1.8} />
        </span>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Sales
          </h1>
          <p className="text-sm text-gray-500">
            Monitor revenue and product performance
          </p>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {summaryStats.map((stat) => (
          <StatsCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <SalesChart chartData={stats.salesOverview} />
        <ProductBreakdown items={stats.categoryBreakdown} totalItems={stats.itemSold} />
      </div>
    </section>
  );
};

export default Sales;
