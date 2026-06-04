const formatAmount = (value) => `฿${Number(value || 0).toLocaleString("en-US")}`;

const OrdersHistory = ({ orders, onOpenOrders }) => {
  const historyOrders = orders.slice(0, 6);

  return (
    <div>
      <div className="mb-5">
        <h3 className="text-xl font-bold text-gray-900">Orders history</h3>
        <p className="mt-1 text-sm text-gray-400">
          ประวัติคำสั่งซื้อที่สำเร็จแล้ว
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white pb-4">
        <div className="overflow-x-auto">
          <table className="w-full table-fixed text-left">
            <thead className="bg-gray-200/50">
              <tr className="border-b border-gray-100 text-xs uppercase tracking-[0.2em] text-gray-500">
                <th className="w-[72%] py-3 pl-4 font-semibold md:pl-8">
                  Product
                </th>
                <th className="py-4 pr-4 text-right font-semibold md:pr-8">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {historyOrders.length > 0 ? (
                historyOrders.map((order) => {
                  const primaryItem = order.items[0];

                  if (!primaryItem) {
                    return null;
                  }

                  return (
                    <tr
                      key={order.id}
                      className="border-b border-gray-200 last:border-b-0"
                    >
                      <td className="py-4 pl-4 md:pl-8">
                        <div className="flex items-center gap-3">
                          {primaryItem.image ? (
                            <img
                              src={primaryItem.image}
                              alt={primaryItem.name}
                              className="h-12 w-12 rounded-2xl object-cover"
                            />
                          ) : (
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-sm font-semibold text-gray-500">
                              {primaryItem.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div>
                            <span className="text-sm font-medium text-gray-800">
                              {primaryItem.name}
                            </span>
                            <p className="mt-1 text-xs text-gray-400">
                              {order.totalQuantity} item
                              {order.totalQuantity > 1 ? "s" : ""}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 pr-4 text-right text-sm font-semibold text-gray-900 md:pr-8">
                        {formatAmount(order.totalAmount)}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="2"
                    className="px-4 py-6 text-center text-sm text-gray-400 md:px-8"
                  >
                    ไม่มีประวัติคำสั่งซื้อที่สำเร็จแล้ว
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center border-t border-gray-100 px-4 pt-4 md:px-8">
          <button
            type="button"
            onClick={onOpenOrders}
            className="text-sm font-semibold text-violet-600 transition hover:text-violet-700"
          >
            View Full History →
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrdersHistory;
