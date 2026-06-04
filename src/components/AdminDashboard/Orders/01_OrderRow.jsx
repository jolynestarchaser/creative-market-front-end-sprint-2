import { Fragment, useState } from "react";

const serverBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:7777";

const statusClasses = {
  paid: "bg-emerald-50 text-emerald-600",
  pending: "bg-amber-50 text-amber-600",
  cancelled: "bg-rose-50 text-rose-600",
};

const courierOptions = ["Thailand post", "Flash express", "E-mail"];

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

const renderProductImage = (item) =>
  item.image ? (
    <img
      src={item.image}
      alt={item.name}
      className="h-10 w-10 rounded-xl bg-gray-100 object-cover"
    />
  ) : (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-sm font-semibold text-gray-500">
      {item.name.charAt(0).toUpperCase()}
    </div>
  );

const OrderRow = ({ order }) => {
  const [expanded, setExpanded] = useState(false);
  const [courier, setCourier] = useState(order.courier || "");
  const [trackingNumber, setTrackingNumber] = useState(
    order.trackingNumber || "",
  );
  const [isEditing, setIsEditing] = useState(
    !order.courier && !order.trackingNumber,
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const primaryItem = order.items?.[0];
  const extraItems = order.items?.slice(1) || [];
  const canEditShipping = order.status === "paid";
  const courierFieldClass = isEditing
    ? "w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-violet-300"
    : "w-full rounded-xl border border-transparent bg-transparent px-0 py-2 text-sm text-gray-700 outline-none";
  const trackingFieldClass = isEditing
    ? "w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-violet-300"
    : "w-full rounded-xl border border-transparent bg-transparent px-0 py-2 text-sm text-gray-700 outline-none";

  if (!primaryItem) {
    return null;
  }

  const handleSaveShipping = async () => {
    try {
      setSaving(true);
      setMessage("");

      const response = await fetch(
        `${serverBaseUrl}/api/admin-dashboard/orders/${order.orderId}/shipping`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            courier,
            trackingNumber,
          }),
        },
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to update shipping details");
      }

      setCourier(result.data?.courier || "");
      setTrackingNumber(result.data?.trackingNumber || "");
      setMessage("Saved");
      setMessageType("success");
      setIsEditing(false);
    } catch (error) {
      setMessage(error.message || "Failed to update shipping details");
      setMessageType("error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Fragment>
      <tr className="align-top transition-colors hover:bg-gray-50/50">
        <td className="px-4 py-4 md:px-6">
          <div className="flex items-center gap-3">
            {renderProductImage(primaryItem)}
            <div>
              <p className="text-sm font-medium text-gray-800">
                {primaryItem.name}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                by {primaryItem.artist}
              </p>
              <p className="mt-2 text-sm text-gray-400">
                {primaryItem.quantity} item(s)
              </p>
              {extraItems.length > 0 ? (
                <button
                  type="button"
                  onClick={() => setExpanded((value) => !value)}
                  className="mt-2 text-xs font-semibold text-violet-600 transition hover:text-violet-700"
                >
                  {expanded
                    ? "Hide additional items"
                    : `View ${extraItems.length} more item(s)`}
                </button>
              ) : null}
            </div>
          </div>
        </td>
        <td className="px-4 py-4 text-center text-sm text-gray-400">
          {order.status === "paid" && order.paidAt
            ? formatDate(order.paidAt)
            : ""}
        </td>
        <td className="px-4 py-4 text-center text-sm font-medium text-gray-700">
          {formatAmount(primaryItem.price)}
        </td>
        <td className="px-4 py-4 text-center text-sm text-gray-600">
          {order.customer}
        </td>
        <td className="px-4 py-4 text-center text-sm font-bold text-gray-900">
          {formatAmount(order.totalAmount)}
        </td>
        <td className="px-4 py-4 text-center">
          <span
            className={`inline-block rounded-full px-3 py-1 text-[10px] font-bold tracking-wide ${statusClasses[order.status]}`}
          >
            {order.statusLabel}
          </span>
        </td>
        <td className="px-4 py-4">
          {canEditShipping ? (
            <div className="mx-auto min-w-45 max-w-45 text-center">
              {isEditing ? (
                <select
                  value={courier}
                  onChange={(event) => setCourier(event.target.value)}
                  className={courierFieldClass}
                >
                  <option value="">Select courier</option>
                  {courierOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <div className={courierFieldClass}>{courier || "-"}</div>
              )}
            </div>
          ) : null}
        </td>
        <td className="px-4 py-4 md:px-6">
          {canEditShipping ? (
            <div className="mx-auto min-w-55 max-w-55 text-center">
              <input
                type="text"
                value={trackingNumber}
                onChange={(event) => setTrackingNumber(event.target.value)}
                disabled={!isEditing}
                placeholder="Enter tracking number"
                className={trackingFieldClass}
              />
            </div>
          ) : null}
        </td>
        <td className="px-4 py-4 md:px-6">
          {canEditShipping ? (
            <div className="mx-auto flex min-w-24 max-w-24 flex-col items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  if (isEditing) {
                    handleSaveShipping();
                    return;
                  }

                  setIsEditing(true);
                  setMessage("");
                }}
                disabled={saving}
                className="w-full rounded-xl bg-violet-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? "Saving..." : isEditing ? "Save" : "Edit"}
              </button>
              {message ? (
                <span
                  className={`text-center text-xs ${
                    messageType === "success"
                      ? "text-emerald-600"
                      : "text-rose-500"
                  }`}
                >
                  {message}
                </span>
              ) : null}
            </div>
          ) : null}
        </td>
      </tr>

      {extraItems.map((item) => (
        <tr
          key={item.id}
          className={`align-top transition-all duration-300 ease-out ${
            expanded ? "opacity-100" : "hidden opacity-0"
          }`}
        >
          <td className="px-4 py-4 pl-10 md:px-6 md:pl-12">
            <div className="flex items-center gap-3">
              {renderProductImage(item)}
              <div>
                <p className="text-sm font-medium text-gray-800">{item.name}</p>
                <p className="mt-1 text-xs text-gray-500">by {item.artist}</p>
                <p className="mt-2 text-sm text-gray-400">
                  {item.quantity} item(s)
                </p>
              </div>
            </div>
          </td>
          <td className="px-4 py-4 text-center text-sm text-gray-300" />
          <td className="px-4 py-4 text-center text-sm font-medium text-gray-700">
            {formatAmount(item.price)}
          </td>
          <td className="px-4 py-4 text-center text-sm text-gray-300" />
          <td className="px-4 py-4 text-center text-sm text-gray-300" />
          <td className="px-4 py-4 text-center text-sm text-gray-300" />
          <td className="px-4 py-4 text-center text-sm text-gray-300" />
          <td className="px-4 py-4 text-center text-sm text-gray-300 md:px-6" />
          <td className="px-4 py-4 text-center text-sm text-gray-300 md:px-6" />
        </tr>
      ))}
    </Fragment>
  );
};

export default OrderRow;
