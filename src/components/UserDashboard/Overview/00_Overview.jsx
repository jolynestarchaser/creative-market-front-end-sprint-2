import UserCard from "./01_UserCard";
import StatsCard from "./02_StatsCard";
import OrdersStatus from "./03_OrdersStatus";
import OrdersHistory from "./04_OrdersHistory";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value || 0);

const Overview = ({
  profile,
  summary,
  statusOrders,
  historyOrders,
  loading,
  error,
  onOpenOrders,
}) => {
  if (loading) {
    return <section className="text-sm text-gray-500">Loading dashboard...</section>;
  }

  if (error) {
    return <section className="text-sm text-red-500">{error}</section>;
  }

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
          Overview
        </h1>
      </header>

      <div className="grid gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-[1.4fr_0.8fr_0.8fr]">
        <UserCard profile={profile} />
        <StatsCard label="Total Orders" value={summary.totalOrders} />
        <StatsCard
          label="Total Spend"
          value={`฿ ${formatCurrency(summary.totalSpend)}`}
          theme="dark"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <OrdersStatus orders={statusOrders} onOpenOrders={onOpenOrders} />
        <OrdersHistory orders={historyOrders} onOpenOrders={onOpenOrders} />
      </div>
    </section>
  );
};

export default Overview;
