import { useState } from "react";
import { statusLabels } from "../../../data/dashboardOrders";

const statusClasses = {
  COMPLETED: "bg-emerald-50 text-emerald-600",
  PAYABLE: "bg-amber-50 text-amber-600",
  RECEIVABLE: "bg-sky-50 text-sky-600",
};

const OrderRow = ({ order, onSaveOrder, placeEditButtonRight = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    courier: order.courier || "",
    trackingNumber: order.trackingNumber || "",
  });

  const handleStartEdit = () => {
    setFormValues({
      courier: order.courier || "",
      trackingNumber: order.trackingNumber || "",
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    onSaveOrder(order.id, {
      courier: formValues.courier.trim(),
      trackingNumber: formValues.trackingNumber.trim(),
    });
    setIsEditing(false);
  };

  const courier = order.courier || "-";
  const trackingNumber = order.trackingNumber || "-";
  const courierClassName = order.courier
    ? "font-semibold text-gray-900"
    : "font-semibold text-gray-300";
  const trackingClassName = order.trackingNumber
    ? "font-semibold text-gray-900"
    : "font-semibold text-gray-300";

  return (
    <tr className="align-top transition-colors hover:bg-gray-50/50">
      <td className="px-4 py-4 md:px-6">
        <div className="flex items-center gap-3">
          <img
            src={order.image}
            alt={order.product}
            className="h-10 w-10 rounded-xl bg-gray-100 object-cover"
          />
          <div>
            <p className="text-sm font-medium text-gray-800">{order.product}</p>
            <p className="mt-1 text-xs text-gray-500">by {order.artist}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-4 text-sm text-gray-400">{order.date}</td>
      <td className="px-4 py-4 text-sm font-medium text-gray-700">
        {order.items}
      </td>
      <td className="px-4 py-4 text-sm text-gray-600">{order.customer}</td>
      <td className="px-4 py-4 text-right text-sm font-bold text-gray-900">
        {order.price}
      </td>
      <td className="px-4 py-4">
        <span
          className={`inline-block rounded-full px-3 py-1 text-[10px] font-bold tracking-wide ${statusClasses[order.status]}`}
        >
          {statusLabels[order.status]}
        </span>
      </td>
      <td className="px-4 py-4">
        <div className="min-w-[180px]">
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
            Courier
          </p>
          {isEditing ? (
            <input
              type="text"
              value={formValues.courier}
              onChange={(event) =>
                setFormValues((currentValues) => ({
                  ...currentValues,
                  courier: event.target.value,
                }))
              }
              placeholder="Add courier"
              className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium text-gray-900 outline-none transition focus:border-violet-300"
            />
          ) : (
            <p className={`mt-2 text-sm ${courierClassName}`}>{courier}</p>
          )}
        </div>
      </td>
      <td className="px-4 py-4 md:px-6">
        <div className="min-w-[220px]">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
              Tracking Number
            </p>
            {placeEditButtonRight && !isEditing ? (
              <button
                type="button"
                onClick={handleStartEdit}
                className="text-xs font-semibold text-violet-600 transition hover:text-violet-700"
              >
                Edit
              </button>
            ) : null}
          </div>
          {isEditing ? (
            <>
              <input
                type="text"
                value={formValues.trackingNumber}
                onChange={(event) =>
                  setFormValues((currentValues) => ({
                    ...currentValues,
                    trackingNumber: event.target.value,
                  }))
                }
                placeholder="Add tracking number"
                className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium text-gray-900 outline-none transition focus:border-violet-300"
              />
              <div className="mt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="rounded-xl border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-600 transition hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="rounded-xl bg-[#1e1b4b] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#2b2670]"
                >
                  Save
                </button>
              </div>
            </>
          ) : (
            <p className={`mt-2 text-sm ${trackingClassName}`}>
              {trackingNumber}
            </p>
          )}
          {!placeEditButtonRight && !isEditing ? (
            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={handleStartEdit}
                className="text-xs font-semibold text-violet-600 transition hover:text-violet-700"
              >
                Edit
              </button>
            </div>
          ) : null}
        </div>
      </td>
    </tr>
  );
};

export default OrderRow;
