import { statusLabels } from "../../../data/dashboardOrders";

const statusClasses = {
  COMPLETED: "bg-emerald-100 text-emerald-600",
  PAYABLE: "bg-amber-100 text-amber-600",
  RECEIVABLE: "bg-sky-100 text-sky-600",
};

const OrdersStatus = ({ orders, onOpenOrders }) => {
  const recentOrders = orders.slice(0, 3);

  return (
    <div>
      <div className="mb-5">
        <h3 className="text-xl font-bold text-gray-900">Orders status</h3>
        <p className="mt-1 text-sm text-gray-400">
          Track your most recent purchases in one place.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white pb-4">
        <div className="overflow-x-auto">
          <table className="w-full table-fixed text-left">
            <thead className="bg-gray-200/50">
              <tr className="border-b border-gray-100 text-xs uppercase tracking-[0.2em] text-gray-500">
                <th className="w-[52%] py-3 pl-4 font-semibold md:pl-8">
                  Product
                </th>
                <th className="w-[24%] py-4 font-semibold">Status</th>
                <th className="py-4 pr-4 text-right font-semibold md:pr-8">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-200 last:border-b-0"
                >
                  <td className="py-4 pl-4 md:pl-8">
                    <div className="flex items-center gap-3">
                      <img
                        src={order.image}
                        alt={order.product}
                        className="h-12 w-12 rounded-2xl object-cover"
                      />
                      <span className="text-sm font-medium text-gray-800">
                        {order.product}
                      </span>
                    </div>
                  </td>
                  <td className="py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClasses[order.status]}`}
                    >
                      {statusLabels[order.status]}
                    </span>
                  </td>
                  <td className="py-4 pr-4 text-right text-sm font-semibold text-gray-900 md:pr-8">
                    {order.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center border-t border-gray-100 px-4 pt-4 md:px-8">
          <button
            type="button"
            onClick={onOpenOrders}
            className="text-sm font-semibold text-violet-600 transition hover:text-violet-700"
          >
            View Full Order Status →
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrdersStatus;
