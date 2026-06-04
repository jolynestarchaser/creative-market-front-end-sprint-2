import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// --- Import SuccessModal (สอดคล้องกับหน้า Login/Register) ---
import SuccessModal from "../components/Global/SuccessModal";

// --- Import รูปภาพ ---
import bgDesktop from "../assets/images/j-login-bg.jpg";
import bgMobile from "../assets/images/j-login-bg.jpg";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // 1. สั่งหยุด Lenis ทันทีที่เข้าหน้านี้
    if (window.lenis) window.lenis.stop();

    // 2. ล็อกระดับ CSS body ไม่ให้สกรอลล์สำรองเด้ง (Bouncing)
    document.body.style.overflow = "hidden";

    return () => {
      // 3. ปลดล็อกคืนค่าให้หน้าอื่นเลื่อนได้ปกติ ตอนย้ายออกจากหน้านี้
      if (window.lenis) window.lenis.start();
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleRequestToken = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email address!!");
      return;
    }

    setIsLoading(true);

    try {
      const apiBaseUrl =
        import.meta.env.VITE_API_URL || "http://localhost:7777";
      const apiUrl = `${apiBaseUrl}/api/auth/forgot-password`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "เกิดข้อผิดพลาดในการส่งข้อมูล");
      }

      setIsSuccess(true); // เปลี่ยนมาเปิด SuccessModal แทนการสลับ UI ในหน้าเดิม
    } catch (err) {
      console.error("FAILED...", err);
      setError(
        err.message || "เกิดข้อผิดพลาดในการส่งอีเมล กรุณาลองใหม่อีกครั้ง",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 h-screen flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500"
        style={{
          backgroundImage: `url(${windowWidth >= 768 ? bgDesktop : bgMobile})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Main Container - ปรับเป็นสไตล์กระจกเงาเข้ม (bg-black/30 backdrop-blur-md) */}
      <div className="scale-80 relative z-10 bg-black/30 backdrop-blur-md w-full max-w-[540px] md:max-w-[648px] h-auto p-8 md:p-10 text-center border border-white/20 shadow-2xl mx-4 flex flex-col justify-center">
        <h2 className="!text-[36px] md:!text-[40px] font-bold text-white mb-6">
          FORGOT PASSWORD
        </h2>

        <p className="text-white/80 text-sm mb-6 text-middle leading-relaxed">
          Enter your email address, and a password reset link will be sent to
          your email
        </p>

        <form onSubmit={handleRequestToken} className="space-y-4 text-left">
          {/* <label className="block text-white !text-xl font-medium mb-1 pl-4 opacity-90">
            Enter your email
          </label> */}

          {/* Email Input - จัดระเบียบการ Flow ของ Error แบบเดียวกับหน้า Login */}
          <div className="flex flex-col">
            <input
              type="email"
              placeholder="name@mail.com"
              disabled={isLoading}
              className={`w-full px-6 py-3 md:py-3.5 bg-black/60 placeholder-white/80 text-white outline-none focus:ring-1 text-sm shadow-lg border-2 transition-colors duration-300 ${
                error
                  ? "border-red-500 focus:ring-red-500/50"
                  : "border-white/20 focus:ring-white"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
            />
            {error && (
              <p className="text-red-400 text-[14px] mt-1.5 pl-4 font-bold tracking-wide">
                {error}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-5 mt-6 bg-[#ffffff]  text-black text-xl font-bold shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            {isLoading ? "กำลังส่งอีเมล..." : "Request Reset Link"}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-6 text-xs md:text-sm text-white/90">
          <p>
            Remember your password?{" "}
            <span
              className="font-extrabold underline cursor-pointer hover:text-white"
              onClick={() => navigate("/login")}
            >
              LOGIN
            </span>
          </p>
        </div>
      </div>

      {/* เรียกใช้งาน Global SuccessModal เมื่อยิง API กู้คืนรหัสผ่านสำเร็จ */}
      <SuccessModal
        isOpen={isSuccess}
        onClose={() => {
          setIsSuccess(false);
          navigate("/login");
        }}
        title="Email Sent!"
        message="ระบบได้ส่งลิงก์กู้คืนรหัสผ่านไปยังอีเมลของคุณเรียบร้อยแล้ว กรุณาเช็คกล่องข้อความครับ"
        buttonText="Go to Login"
      />
    </div>
  );
};

export default ForgotPassword;
