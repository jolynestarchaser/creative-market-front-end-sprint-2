import React, { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthContext"; // ดึงข้อมูลล็อกอินมาเช็คคู่กันจ้า

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [loadingCart, setLoadingCart] = useState(false);

  const { isLoggedIn } = useAuth(); // ส่องดูว่าล็อกอินอยู่ไหม ถ้าไม่ล็อกอินจะไม่ดึงข้อมูลตะกร้าให้รกระบบจ้า
  const serverBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:7777";

  // 📥 ฟังก์ชันดึงข้อมูลสินค้าในตะกร้าจริงมาจากหลังบ้าน (GET /api/cart)
  const fetchCartData = async () => {
    if (!isLoggedIn) {
      setCartItems([]);
      setCartCount(0);
      return;
    }

    setLoadingCart(true);
    try {
      const res = await fetch(`${serverBaseUrl}/api/cart`, {
        method: "GET",
        credentials: "include",
      });

      // 🛡️ เพิ่มตัวดักจับตรงนี้จ้า! ถ้าหลังบ้านบอกว่า 401 (หมดสิทธิ์) ให้เคลียร์ค่าทิ้งทันที
      if (res.status === 401) {
        setCartItems([]);
        setCartCount(0);
        setLoadingCart(false);
        return; // เบรกสคริปต์ ไม่ปล่อยให้พ่น Uncaught Error บน Console จ้า!
      }

      const data = await res.json();
      if (res.ok && data.success) {
        const items = data.data?.items || data.cart?.items || [];
        setCartItems(items);
        const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(totalCount);
      }
    } catch (error) {
      console.error("Fetch cart data failed:", error);
    } finally {
      setLoadingCart(false);
    }
  };

  // 🔔 ฟังก์ชันอัปเดตตัวเลขเพิ่มแต้มตะกร้าแบบ Real-time บนหน้าจอทันทีเมื่อกดปุ่มสำเร็จ
  const refreshCart = () => {
    fetchCartData();
  };

  // ทุกครั้งที่สถานะล็อกอินเปลี่ยน (เช่น ล็อกอินสำเร็จ หรือกดเอาท์) ให้ดึงข้อมูลตะกร้าใหม่ทันทีออโต้
  useEffect(() => {
    fetchCartData();
  }, [isLoggedIn]);

  return (
    <CartContext.Provider
      value={{ cartItems, cartCount, loadingCart, refreshCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
