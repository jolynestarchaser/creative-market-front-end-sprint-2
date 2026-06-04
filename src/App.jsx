import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";

import LoadingScreen from "./components/Loading/Loading";

import Lenis from "lenis";
import "lenis/dist/lenis.css";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";

import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import Product from "./pages/Product";
import Market from "./pages/Market";
import Cart from "./pages/Cart"; //bank
import Checkout from "./pages/Checkout"; //bank
import Payment from "./pages/Payment"; //bank
import Complete from "./pages/Complete"; //bank
import Register from "./pages/Register";
import LoginPage from "./pages/LoginPage";
import ArtistDrop from "./pages/ArtistDrop";
import ArtistRegisterForm from "./pages/ArtistRegister";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// สร้าง Router Map
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // เหมือนCase มือถือสวมเข้าไปในลูกทุกตัวที่เป็นChildren (Navbar + Outlet + Footer)
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/product",
        element: <Product />,
      },
      {
        path: "/product/:productSlug",
        element: <Product />,
      },
      {
        path: "/market",
        element: <Market />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/complete",
        element: <Complete />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/artist-drop",
        element: <ArtistDrop />,
      },
      {
        path: "/artist-register",
        element: <ArtistRegisterForm />,
      },

      // ถ้ามีหน้าอื่น เช่น /register ก็เอามาใส่ตรงนี้
      {
        path: "/user-dashboard",
        element: <UserDashboard />,
      },
      {
        path: "/admin-dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password/:token",
        element: <ResetPassword />,
      },
    ],
  },
]);

function App() {
  // ➕ 1. เพิ่ม State สำหรับเช็คสถานะการ Loading (เริ่มต้นเป็น true เพื่อให้โชว์หน้าโหลดก่อน)
  const [isLoading, setIsLoading] = useState(window.location.pathname === "/");

  useEffect(() => {
    // ตั้งค่า Lenis Scroll (เรียกใช้งานปกติ)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  // ➕ 2. ฟังก์ชันที่จะถูกเรียกเมื่อแอนิเมชันเติมน้ำในคอมโพเนนต์ Loading ทำงานจนเต็มและจบลง
  const handleLoadingComplete = () => {
    setIsLoading(false); // ปลดล็อกหน้าจอ เพื่อเข้าสู่หน้าเว็บหลัก
  };

  // ➕ 3. ปรับเงื่อนไขในส่วนของการ Return หน้าจอออกไปแสดงผล
  return (
    <>
      {isLoading ? (
        // ส่งฟังก์ชันต้อนรับเมื่อโหลดเสร็จผ่าน prop ชื่อ onComplete ไปให้คอมโพเนนต์ Loading
        <LoadingScreen onComplete={handleLoadingComplete} />
      ) : (
        // พอโหลดเสร็จแล้ว ค่อยยอมให้แสดงหน้าเว็บและระบบเปลี่ยนหน้า (Router) ทำงาน
        <RouterProvider router={router} />
      )}
    </>
  );
}

export default App;
