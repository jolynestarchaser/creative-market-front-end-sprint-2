const statusClasses = {
  paid: "bg-emerald-50 text-emerald-600",
  pending: "bg-amber-50 text-amber-600",
  cancelled: "bg-rose-50 text-rose-600",
};

const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const formatAmount = (value) =>
  `฿${Number(value || 0).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;

const RecentOrders = ({ orders, onOpenOrders }) => {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
        <p className="mt-1 text-sm text-gray-400">
          Monitor your latest customer transactions
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-gray-100 bg-gray-50">
              <tr className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                <th className="px-4 py-4 font-semibold md:px-6">Product</th>
                <th className="px-4 py-4 text-center font-semibold">Payment Date</th>
                <th className="px-4 py-4 text-center font-semibold">Items</th>
                <th className="px-4 py-4 text-center font-semibold">Customer</th>
                <th className="px-4 py-4 text-center font-semibold">Amount</th>
                <th className="px-4 py-4 text-center font-semibold md:px-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map((order) => (
                <tr key={order.id} className="align-top transition-colors hover:bg-gray-50/50">
                  <td className="px-4 py-4 md:px-6">
                    <div className="flex items-center gap-3">
                      {order.image ? (
                        <img
                          src={order.image}
                          alt={order.name}
                          className="h-10 w-10 rounded-xl bg-gray-100 object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-sm font-semibold text-gray-500">
                          {order.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-800">{order.name}</p>
                        <p className="mt-1 text-xs text-gray-500">by {order.artist}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center text-sm text-gray-400">
                    {formatDate(order.date)}
                  </td>
                  <td className="px-4 py-4 text-center text-sm font-medium text-gray-700">
                    {order.quantity}
                  </td>
                  <td className="px-4 py-4 text-center text-sm text-gray-600">{order.customer}</td>
                  <td className="px-4 py-4 text-center text-sm font-bold text-gray-900">
                    {formatAmount(order.amount)}
                  </td>
                  <td className="px-4 py-4 text-center md:px-6">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-[10px] font-bold tracking-wide ${statusClasses[order.status]}`}
                    >
                      {order.statusLabel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-100 px-4 py-4 text-center">
          <button
            type="button"
            onClick={onOpenOrders}
            className="text-sm font-semibold text-violet-600 transition hover:text-violet-700"
          >
            View Full Order Status →
          </button>
        </div>
      </div>
    </section>
  );
};

export default RecentOrders;
