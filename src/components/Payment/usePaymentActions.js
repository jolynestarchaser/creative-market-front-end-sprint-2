import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useCartActions } from "../Cart/useCartActions";

const usePaymentActions = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { refreshCart } = useCart();
  const { clearCart } = useCartActions();
  const serverBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:7777";

  // ฟังก์ชันอัปเดตสถานะออเดอร์เป็น "paid"
  const confirmPayment = async (orderId) => {
    setLoading(true);
    try {
      // สำหรับการทดสอบ (Mock) ถ้าไม่มี orderId ให้ผ่านไปหน้า complete เลย
      if (!orderId || orderId === "MOCK_ORDER_12345") {
        console.log("Mock Payment Confirmed");
        setTimeout(async () => {
          await clearCart(); // ล้างตะกร้าแม้จะอยู่ในโหมด Mock
          navigate("/complete");
        }, 1000);
        return;
      }

      const res = await fetch(`${serverBaseUrl}/api/orders/status/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "paid" }),
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok && data.success) {
        await clearCart(); // 👈 Double Check: ล้างตะกร้าผ่าน API เฉพาะทางอีกครั้งเพื่อความชัวร์
        navigate("/complete");
      } else {
        throw new Error(data.message || "Payment confirmation failed");
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    confirmPayment,
    loading,
  };
};

export default usePaymentActions;
