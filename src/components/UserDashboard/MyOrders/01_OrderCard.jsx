import { useState } from "react";

const statusClasses = {
  paid: "bg-emerald-100 text-emerald-600",
  pending: "bg-amber-100 text-amber-600",
  cancelled: "bg-rose-100 text-rose-600",
};

const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const formatAmount = (value) =>
  `฿${Number(value || 0).toLocaleString("en-US")}`;

const OrderCard = ({ order }) => {
  const [expanded, setExpanded] = useState(false);
  const primaryItem = order.items[0];
  const extraItems = order.items.slice(1);

  if (!primaryItem) {
    return null;
  }

  const renderOrderItem = (item, isPrimary = false) => (
    <div
      key={item.id}
      className={`flex flex-col gap-5 ${
        isPrimary
          ? "md:flex-row md:items-center md:gap-6"
          : "py-4 md:flex-row md:items-center md:gap-6"
      }`}
    >
      {item.image ? (
        <img
          src={item.image}
          alt={item.name}
          className="h-20 w-20 shrink-0 rounded-2xl bg-gray-100 object-cover shadow-sm md:h-24 md:w-24"
        />
      ) : (
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-2xl font-bold text-gray-500 shadow-sm md:h-24 md:w-24">
          {item.name.charAt(0).toUpperCase()}
        </div>
      )}

      <div className="min-w-0 flex-1">
        <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
        <p className="mt-1 text-sm text-gray-500">
          {item.artist !== "-"
            ? `by ${item.artist}`
            : `Order #${order.orderId}`}
        </p>
        <p className="mt-3 text-sm text-gray-400">{item.quantity} item(s)</p>

        {isPrimary && extraItems.length > 0 && (
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="mt-3 text-sm font-semibold text-violet-600 transition hover:text-violet-700"
          >
            {expanded
              ? "Hide additional items"
              : `View ${extraItems.length} more item(s)`}
          </button>
        )}
      </div>

      <div className="grid shrink-0 gap-4 text-sm text-gray-500 md:min-w-105 md:grid-cols-4 lg:w-[760px] lg:grid-cols-[140px_100px_120px_110px_190px]">
        <div>
          <p
            className={`text-xs uppercase tracking-[0.2em] text-gray-400 ${
              isPrimary ? "" : "invisible"
            }`}
          >
            Date
          </p>
          <p
            className={`mt-1 font-semibold text-gray-900 ${
              isPrimary ? "" : "invisible"
            }`}
          >
            {formatDate(order.createdAt)}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
            Price
          </p>
          <p className="mt-1 font-semibold text-gray-900">
            {formatAmount(item.price)}
          </p>
        </div>
        <div>
          <p
            className={`text-xs uppercase tracking-[0.2em] text-gray-400 ${
              isPrimary ? "" : "invisible"
            }`}
          >
            Amount
          </p>
          <p
            className={`mt-1 font-semibold text-gray-900 ${
              isPrimary ? "" : "invisible"
            }`}
          >
            {formatAmount(isPrimary ? order.totalAmount : item.lineTotal)}
          </p>
        </div>
        <div>
          <p
            className={`text-xs uppercase tracking-[0.2em] text-gray-400 ${
              isPrimary ? "" : "invisible"
            }`}
          >
            Status
          </p>
          <span
            className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
              statusClasses[order.status]
            } ${isPrimary ? "" : "invisible"}`}
          >
            {order.statusLabel}
          </span>
        </div>
        <div className="min-w-0">
          <p
            className={`text-xs uppercase tracking-[0.2em] text-gray-400 ${
              isPrimary ? "" : "invisible"
            }`}
          >
            Shipping Info
          </p>
          <div
            className={`mt-1 space-y-1 text-sm text-gray-500 ${
              isPrimary ? "" : "invisible"
            }`}
          >
            <p className="break-words">
              Courier:{" "}
              <span className="font-medium text-gray-800">
                {order.courier || "-"}
              </span>
            </p>
            <p className="break-words">
              Tracking Number:{" "}
              <span className="font-medium text-gray-800">
                {order.trackingNumber || "-"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <article className="rounded-2xl bg-white p-5 md:p-6">
      {renderOrderItem(primaryItem, true)}

      {extraItems.length > 0 && (
        <div
          className={`overflow-hidden border-t border-gray-100 transition-all duration-300 ease-out ${
            expanded
              ? "mt-5 max-h-200 translate-y-0 pt-5 opacity-100"
              : "mt-0 max-h-0 -translate-y-2 pt-0 opacity-0"
          }`}
        >
          <div className="space-y-3">
            {extraItems.map((item) => renderOrderItem(item))}
          </div>
        </div>
      )}
    </article>
  );
};

export default OrderCard;
