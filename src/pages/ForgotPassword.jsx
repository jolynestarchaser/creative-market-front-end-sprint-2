import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

import bgDesktop from "../assets/images/j-login-bg.jpg";
import bgMobile from "../assets/images/j-login-bg.jpg";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleRequestToken = (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!email) {
      setError("Please enter your email address!!");
      return;
    }

    // ตรวจสอบว่ามีอีเมลนี้สมัครไว้ในระบบจำลอง (LocalStorage) หรือไม่
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = storedUsers.some((user) => user.email === email);

    if (!userExists) {
      setError("This email address is not registered!!");
      return;
    }

    setIsLoading(true);

    // 1. ตัวโปรแกรมของเราสร้าง (สุ่ม) Token 6 หลักขึ้นมาเอง
    const mockToken = Math.floor(100000 + Math.random() * 900000).toString();

    // 2. เซฟเก็บไว้ในเครื่องเราชั่วคราว เพื่อเอาไว้เทียบตอนที่เขากดลิงก์กลับมา
    localStorage.setItem(
      "resetPasswordToken",
      JSON.stringify({ email, token: mockToken }),
    );

    // 3. สร้างลิงก์ที่จะแนบไปในจดหมาย (พ่วงเอา Token แปะไปบน URL ด้วย)
    const resetLink = `${window.location.origin}/reset-password?token=${mockToken}`;

    // 4. เตรียมข้อมูลส่งให้พนักงาน (EmailJS) ถือไปส่ง
    const templateParams = {
      to_email: email,
      reset_link: resetLink,
    };

    // 5. เรียกใช้ EmailJS เพื่อยิงอีเมลจริงออกไป
    // *** อย่าลืมเอา KEY จริงจากเว็บ EmailJS มาใส่แทนที่อักษรตัวใหญ่ด้านล่างนะครับ ***
    emailjs
      .send(
        "service_gbu9e6o", // Service ID ของเรา
        "template_x07aydb", // Template ID ของเรา
        templateParams,
        "Ar5pOgj3RsyZ6mrUh", // Public Key ของเรา
      )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        setSuccessMessage(
          "ระบบได้ส่งลิงก์กู้คืนรหัสผ่านไปยังอีเมลของคุณเรียบร้อยแล้ว กรุณาเช็คที่กล่องข้อความของคุณครับ",
        );
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("FAILED...", err);
        setError("เกิดข้อผิดพลาดในการส่งอีเมล กรุณาลองใหม่อีกครั้ง");
        setIsLoading(false);
      });
  };

  return (
    <div className="fixed inset-0 h-screen flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500"
        style={{
          backgroundImage: `url(${windowWidth >= 768 ? bgDesktop : bgMobile})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="scale-85 md:scale-75 relative z-10 bg-[#7b74c4]/60 backdrop-blur-md w-full max-w-[540px] h-auto min-h-[350px] md:min-h-[420px] rounded-[40px] shadow-2xl p-8 md:p-10 text-center border border-white/20 mx-6 -translate-y-10 md:-translate-y-15">
        <h2 className="text-3xl font-bold text-white mb-6 -translate-y-0 md:-translate-y-2.5">
          Forgot Password
        </h2>

        {successMessage ? (
          <div className="text-left bg-green-500/20 border border-green-500/40 p-4 rounded-xl text-white space-y-4">
            <p className="text-sm font-medium">{successMessage}</p>
            <p className="text-xs text-white/70">
              *ไปเปิดอีเมลแล้วคลิกลิงก์เพื่อตั้งรหัสผ่านใหม่ได้เลยครับ
            </p>
          </div>
        ) : (
          <>
            <p className="text-white/80 text-sm mb-6 text-left pl-2 translate-y-5 md:translate-y-1.5">
              กรอกอีเมลของคุณ
              ระบบจะส่งลิงก์สำหรับรีเซ็ตรหัสผ่านไปให้ทางอีเมลจริงครับ
            </p>

            <form onSubmit={handleRequestToken} className="space-y-4 text-left">
              <label className="block text-white text-lg font-medium mb-1 pl-4 opacity-90 translate-y-7 md:translate-y-3.5">
                Enter your email
              </label>
              <div
                className={`relative transition-all duration-300 ${error ? "pb-5" : "pb-0"}`}
              >
                <input
                  type="email"
                  placeholder="name@mail.com"
                  disabled={isLoading}
                  className={`w-full px-6 py-3 rounded-full bg-[#a9a4e4] placeholder-white/80 text-white border-2 outline-none focus:ring-4 focus:ring-white/50 text-sm shadow-lg translate-y-8 md:translate-y-5 ${error ? "border-red-500" : "border-white"} ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                />
                {error && (
                  <p className="absolute left-1/2 -translate-x-1/2 -bottom-1 z-20 px-3 py-0 text-[14px] font-bold text-red-600 bg-white rounded-md border border-red-200 shadow-sm whitespace-nowrap translate-y-15 md:translate-y-7.5">
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 mt-6 bg-[#1e1a3d] hover:bg-[#2d2859] hover:brightness-150 text-white text-lg font-bold rounded-full shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 translate-y-7.5 md:translate-y-5"
              >
                {isLoading ? "กำลังส่งอีเมล..." : "Request Reset Link"}
              </button>
            </form>
          </>
        )}

        <div className="mt-6 text-sm text-white/90 translate-y-5 md:translate-y-5">
          <p>
            Remember your password?{" "}
            <span
              className="font-extrabold underline cursor-pointer hover:text-white "
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
