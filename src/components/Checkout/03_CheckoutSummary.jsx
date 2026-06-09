import React from "react";
import { useNavigate } from "react-router-dom";

export default function CheckoutSummary({
  cartItems,
  subtotal,
  hasAddress,
  address,
  paymentMethod,
  onCreateOrder,
  loading,
  isPaymentPage = false,
}) {
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!hasAddress || !address) {
      alert("กรุณาระบุที่อยู่สำหรับจัดส่ง");
      return;
    }

    if (!paymentMethod) {
      alert("กรุณาเลือกช่องทางการชำระเงินก่อนดำเนินการต่อค่ะ");
      return;
    }

    try {
      // 1. API: POST /api/orders/checkout - สร้างคำสั่งซื้อจริง
      const orderData = await onCreateOrder({
        paymentMethod: paymentMethod, // ส่งค่าที่เป็น lowercase ตามมาตรฐาน (promptpay)
        shippingAddress: {
          recipientName: address.recipientName,
          phone: address.phone,
          street: address.street,
          district: address.district || "",
          province: address.province,
          postcode: address.postcode,
        },
      });

      if (orderData) {
        // 2. ส่งข้อมูลไปหน้า Payment ผ่าน State รวมถึง Snapshot ของตะกร้า
        navigate("/payment", {
          state: {
            orderId: orderData._id || orderData.id,
            amount: orderData.totalPrice || subtotal,
            // ⭐️ แนบรายการสินค้าไปดัวย (Snapshot)
            orderItemsSnapshot: cartItems,
          },
        });
      }
    } catch (err) {
      console.error("Checkout process failed:", err);
      alert("เกิดข้อผิดพลาดในการสั่งซื้อ: " + err.message);
    }
  };

  return (
    <div className="space-y-4">
      <div className="border border-violet-600 rounded-lg p-4 bg-[#151516] space-y-4">
        {cartItems.map((item) => {
          const product = item;
          return (
            <div
              key={item._id || item.id || product.productId || Math.random()}
              className="flex gap-4 border-b border-violet-300 pb-4 last:border-0 last:pb-0"
            >
              <img
                src={
                  product.images?.[0] ||
                  item.image ||
                  "https://placehold.co/100x100"
                }
                alt={product.name || item.name}
                className="w-16 h-16 bg-[#D9D9D9] rounded-sm shrink-0 object-cover"
              />
              <div className="flex flex-col justify-between py-1">
                <div>
                  {/* ⭐️ แก้ไข: แสดง Tags แทนชื่อสินค้าเพื่อความสอดคล้อง */}
                  <h4 className="font-bold text-sm text-white">
                    {product.name || item.name}
                  </h4>
                  <p className="text-[10px] text-gray-400">
                    {product.tags && product.tags.length > 0
                      ? product.tags.join(" ")
                      : product.category || "Digital Art"}
                  </p>
                  <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                </div>
                <p className="font-bold text-sm text-violet-600">
                  ฿ {(product.price || item.price || 0).toLocaleString()}.-
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border border-violet-600 rounded-lg p-5 bg-[#151516]">
        <h3 className="font-bold mb-4 text-sm text-white">
          สรุปยอดเงินในตะกร้า
        </h3>
        <div className="space-y-3 text-sm border-b border-purple-200 pb-3 mb-3">
          <div className="flex justify-between">
            <span className="text-white">ยอดรวม</span>
            <span className="font-bold text-white">
              ฿ {subtotal.toLocaleString()}.-
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/60">ค่าจัดส่ง</span>
            <span className="text-green-600 font-bold">Free</span>
          </div>
        </div>
        <div className="flex justify-between text-sm font-bold mb-5 text-violet-600">
          <span className="text-white">ยอดรวมทั้งสิ้น</span>
          <span>฿ {subtotal.toLocaleString()}.-</span>
        </div>

        {!isPaymentPage ? (
          <button
            onClick={handleCheckout}
            disabled={loading || cartItems.length === 0}
            className="w-full bg-violet-600 text-white py-2.5 rounded font-semibold hover:bg-violet-300 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "กำลังสร้างคำสั่งซื้อ..." : "ยืนยันการสั่งซื้อ"}
          </button>
        ) : (
          <div className="bg-purple-50 p-2 rounded text-center">
            <p className="text-[10px] text-violet-600 font-bold uppercase tracking-widest">
              รอการชำระเงิน
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
