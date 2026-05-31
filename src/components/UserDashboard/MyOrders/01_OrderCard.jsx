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

const OrderCard = ({ order }) => {
  return (
    <article className="flex flex-col gap-5 rounded-2xl bg-white p-5 md:flex-row md:items-center md:gap-6 md:p-6">
      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-2xl font-bold text-gray-500 shadow-sm md:h-24 md:w-24">
        {order.name.charAt(0).toUpperCase()}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-lg font-bold text-gray-900">{order.name}</h3>
        <p className="mt-1 text-sm text-gray-500">Order #{order.orderId}</p>
        <p className="mt-3 text-sm text-gray-400">{order.quantity} item(s)</p>
      </div>

      <div className="grid shrink-0 gap-4 text-sm text-gray-500 md:min-w-[420px] md:grid-cols-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
            Date
          </p>
          <p className="mt-1 font-semibold text-gray-900">
            {formatDate(order.createdAt)}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
            Price
          </p>
          <p className="mt-1 font-semibold text-gray-900">
            ฿{order.price.toLocaleString("en-US")}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
            Amount
          </p>
          <p className="mt-1 font-semibold text-gray-900">
            ฿{order.lineTotal.toLocaleString("en-US")}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
            Status
          </p>
          <span
            className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClasses[order.status]}`}
          >
            {order.statusLabel}
          </span>
        </div>
      </div>
    </article>
  );
};

export default OrderCard;
