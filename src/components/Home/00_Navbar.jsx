import React, { useState } from "react";
import logo from "../../assets/logos/logo.svg";
import { Link } from "react-router-dom"; // แก้ไขตัวนำเข้าจาก react-router เป็น react-router-dom จ้า
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext"; // 🌟 ดึงพลังตะกร้าส่วนกลางมาอัปเดตตัวเลขแบบ Real-time

const Navbar = () => {
  const { isLoggedIn, user, userRole, logout } = useAuth();
  const { cartCount } = useCart(); // 🛒 ดึงแต้มสินค้าในตะกร้าจริงจาก MongoDB มาแสดงผลออโต้

  const [isOpen, setIsOpen] = useState(false);

  // 🚪 ฟังก์ชันกดปุ่ม Logout ตัวจริง (เรียกพลังงานล้างคุกกี้สลายตัวจากกล่องกลาง)
  const handleLogoutClick = () => {
    logout();
    setIsOpen(false); // ปิดแท็บเมนูลัดมือถือด้วยเพื่อความเนี๊ยบจ้า
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-black text-white flex-wrap relative z-50">
      {/* 1. Logo Section */}
      <Link
        to="/"
        className="flex items-center cursor-pointer hover:opacity-80 transition-all"
      >
        <img src={logo} alt="logo" className="h-7 w-auto " />
      </Link>

      {/* 2. Menu Links Section */}
      <ul className="hidden md:flex items-center gap-3 text-xl h-auto font-medium ">
        <Link to="/">
          <li className="hover:text-gray-400 cursor-pointer transition-all">
            Home
          </li>
        </Link>
        <span className="text-gray-500">|</span>
        <Link
          to="/#about-section"
          className="hover:text-gray-400 cursor-pointer transition-all"
        >
          About
        </Link>
        <span className="text-gray-500">|</span>

        {/* ================= Category (Hover Version) ================= */}
        <li className="relative cursor-pointer group py-2">
          <div className="flex items-center gap-1 hover:text-gray-400 transition-all">
            Category
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>

          <div className="absolute top-full left-0 pt-4 w-56 z-50 hidden group-hover:block">
            <div className="bg-black border border-gray-800 py-3 rounded-sm shadow-2xl animate-fade-in">
              <ul className="flex flex-col text-base text-white">
                <li className="px-6 py-2 hover:bg-gray-900 hover:text-white transition-colors">
                  <Link to="/market?category=Visual Art">Visual Art</Link>
                </li>
                <li className="px-6 py-2 hover:bg-gray-900 hover:text-white transition-colors">
                  <Link
                    to={`/market?category=${encodeURIComponent("Craft & Handmade")}`}
                  >
                    Craft & Handmade
                  </Link>
                </li>
                <li className="px-6 py-2 hover:bg-gray-900 hover:text-white transition-colors">
                  <Link
                    to={`/market?category=${encodeURIComponent("Music & Sound")}`}
                  >
                    Music & Sound
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>

      {/* 3. Buttons Section (Desktop เวอร์ชันหน้าจอใหญ่) */}
      <div className="hidden md:flex items-center gap-6">
        {!isLoggedIn ? (
          // ---------------- กรณีที่ 1: แขกทั่วไป (ยังไม่ได้ล็อกอิน) ----------------
          <>
            <Link to="/login">
              <button className="bg-white text-black px-4 py-2 hover:bg-gray-400 cursor-pointer transition-all w-30 font-medium">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-black text-white px-4 py-2 hover:bg-white hover:text-black cursor-pointer transition-all w-30 border border-white font-medium">
                Register
              </button>
            </Link>
          </>
        ) : (
          // ---------------- กรณีที่ 2: ล็อกอินเข้าระบบสำเร็จแล้ว ----------------
          <div className="flex items-center gap-6">
            {/* ตะกร้าสินค้าแสดงเฉพาะคนยศ "user" พร้อมตัวเลขจริงนับแต้มรวมสะสม */}
            {userRole === "user" && (
              <Link
                to="/cart"
                className="relative cursor-pointer hover:text-gray-400 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            {/* โปรไฟล์พ่นชื่อจริงทักทายอัตโนมัติจากตู้เก็บข้อมูลผู้ใช้ตัวจริงหลังบ้านจ้า */}
            <Link
              to={userRole === "admin" ? "/admin-dashboard" : "/user-dashboard"}
              className="cursor-pointer hover:text-purple-400 transition-colors flex items-center gap-3"
              title={
                userRole === "admin"
                  ? "Go to Admin Dashboard"
                  : "Go to User Dashboard"
              }
            >
              <span className="text-base font-semibold tracking-wide text-gray-200">
                {userRole === "admin"
                  ? "Hi, Admin"
                  : `Hi, ${user?.username || "User"}`}
              </span>

              <div
                className={`p-1 rounded-full border-2 ${userRole === "admin" ? "border-red-500" : "border-purple-500"}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-7 h-7"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </Link>

            {/* ปุ่ม Logout ปลุกคำสั่งล้างสิทธิ์แบบเบ็ดเสร็จร้อยเปอร์เซ็นต์ */}
            <button
              onClick={handleLogoutClick}
              className="text-red-400 hover:text-red-500 font-medium cursor-pointer transition-colors text-base border border-red-500/30 px-3 py-1 rounded-sm hover:bg-red-500/10"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* 4. Mobile Menu Icons */}
      <div className="flex md:hidden items-center gap-4 relative z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer hover:text-gray-400 transition-colors"
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>

        {!isLoggedIn && (
          <Link
            to="/login"
            className="cursor-pointer hover:text-gray-400 transition-colors"
            title="Login / Register"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-7 h-7"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        )}
      </div>

      {/* 5. Mobile Dropdown Menu */}
      {isOpen && (
        <div className="w-full md:hidden flex flex-col mt-4 border-t border-gray-800 pt-4 pb-2 animate-fade-in relative z-40">
          {!isLoggedIn ? (
            <div className="flex gap-4 mt-8 px-2">
              <Link
                to="/login"
                className="w-full"
                onClick={() => setIsOpen(false)}
              >
                <button className="bg-white text-black px-4 py-3 hover:bg-gray-300 transition-all w-full font-bold rounded-sm cursor-pointer">
                  Login
                </button>
              </Link>
              <Link
                to="/register"
                className="w-full"
                onClick={() => setIsOpen(false)}
              >
                <button className="bg-transparent text-white px-4 py-3 hover:bg-gray-800 transition-all w-full border border-white font-bold rounded-sm cursor-pointer">
                  Register
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3 mt-6 border-t border-gray-800 pt-4 px-2">
              <div className="flex flex-col gap-1 mb-2">
                <div className="text-sm text-gray-500 tracking-widest font-bold uppercase">
                  Account Actions
                </div>
                <div
                  className={`text-base font-bold ${userRole === "admin" ? "text-red-400" : "text-purple-400"}`}
                >
                  {userRole === "admin"
                    ? "Welcome, Admin ✨"
                    : `Welcome, ${user?.username || "Member"} ✨`}
                </div>
              </div>

              {userRole === "user" && (
                <Link
                  to="/cart"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between text-white hover:text-purple-400 py-2 transition-colors"
                >
                  <span className="flex items-center gap-3 text-lg font-medium">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                    My Cart
                  </span>
                  {cartCount > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {cartCount} Items
                    </span>
                  )}
                </Link>
              )}

              <Link
                to={
                  userRole === "admin" ? "/admin-dashboard" : "/user-dashboard"
                }
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 text-white hover:text-purple-400 py-2 transition-colors text-lg font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={`w-6 h-6 ${userRole === "admin" ? "text-red-500" : "text-purple-500"}`}
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                    clipRule="evenodd"
                  />
                </svg>
                {userRole === "admin" ? "Admin Dashboard" : "My Dashboard"}
              </Link>

              <button
                onClick={handleLogoutClick}
                className="flex items-center gap-3 text-red-400 hover:text-red-500 py-3 transition-colors text-lg font-bold border-t border-gray-900 mt-2 cursor-pointer w-full text-left bg-transparent"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                  />
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
