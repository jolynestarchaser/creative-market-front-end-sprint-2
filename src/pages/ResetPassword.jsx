import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

// --- Import SuccessModal ---
import SuccessModal from "../components/Global/SuccessModal";

// --- Import รูปภาพ ---
import bgDesktop from "../assets/images/j-login-bg.jpg";
import bgMobile from "../assets/images/j-login-bg.jpg";
import logoLogin from "../assets/icons/creative-logo.svg";

const ResetPassword = () => {
  const navigate = useNavigate();
  // ดึง Token จาก URL (เช่น /reset-password/abc1234)
  const { token } = useParams();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [blockEndTime, setBlockEndTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);

  // เช็คสถานะ Auth
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const apiBaseUrl =
          import.meta.env.VITE_API_URL || "http://localhost:7777";
        const response = await fetch(`${apiBaseUrl}/api/auth/me`, {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.user && data.user.role === "user") {
            navigate("/");
          }
        }
      } catch (err) {
        console.error("Auth check failed:", err);
      }
    };
    checkAuth();
  }, [navigate]);

  // สั่งหยุด Lenis ตอนเข้าหน้านี้
  useEffect(() => {
    if (window.lenis) window.lenis.stop();
    document.body.style.overflow = "hidden";

    return () => {
      if (window.lenis) window.lenis.start();
      document.body.style.overflow = "unset";
    };
  }, []);

  // จัดการ Resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // เช็คสถานะ Rate Limit จาก Backend ทันทีที่โหลดหน้า
  useEffect(() => {
    const checkRateLimitStatus = async () => {
      try {
        const apiBaseUrl =
          import.meta.env.VITE_API_URL || "http://localhost:7777";
        const response = await fetch(
          `${apiBaseUrl}/api/auth/reset-password/status`,
        );
        const data = await response.json();

        if (data.isBlocked) {
          setBlockEndTime(Date.now() + data.timeLeft * 1000);
          setTimeLeft(data.timeLeft);
        }
      } catch (error) {
        console.error("Rate limit check failed:", error);
      }
    };
    checkRateLimitStatus();
  }, []);

  // ระบบนับเวลาถอยหลังอิงเวลาเครื่อง
  useEffect(() => {
    if (!blockEndTime) return;

    const interval = setInterval(() => {
      const now = Date.now();
      if (now >= blockEndTime) {
        setBlockEndTime(null);
        setTimeLeft(0);
        setErrors((prev) => ({ ...prev, global: null }));
        clearInterval(interval);
      } else {
        setTimeLeft(Math.ceil((blockEndTime - now) / 1000));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [blockEndTime]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleResetPassword = async (e) => {
    if (e) e.preventDefault();
    if (blockEndTime !== null || isLoading) return;

    setErrors({});
    let newErrors = {};

    // ถ้าไม่มี Token จาก URL (ไม่ได้กดมาจากอีเมล) ให้โชว์ Error
    if (!token) {
      setErrors({
        global:
          "ไม่พบ Token สำหรับรีเซ็ตรหัสผ่าน กรุณากดลิงก์จากอีเมลใหม่อีกครั้ง",
      });
      return;
    }

    if (!newPassword) newErrors.newPassword = "PASSWORD CANNOT BE EMPTY";
    else if (newPassword.length < 6)
      newErrors.newPassword = "PASSWORD MUST BE AT LEAST 6 CHARACTERS";
    if (newPassword !== confirmPassword)
      newErrors.confirmPassword = "PASSWORDS DO NOT MATCH";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    // Delay 2 วินาที
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const apiBaseUrl =
        import.meta.env.VITE_API_URL || "http://localhost:7777";
      const apiUrl = `${apiBaseUrl}/api/auth/reset-password`;

      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token, // ส่ง Token ที่ได้จาก URL ตรงๆ ได้เลย
          password: newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          const waitTimeSeconds = data.timeLeft || 180;
          setBlockEndTime(Date.now() + waitTimeSeconds * 1000);
          setTimeLeft(waitTimeSeconds);
        }
        throw new Error(data.message || "เกิดข้อผิดพลาดในการรีเซ็ตรหัสผ่าน");
      }

      setIsSuccess(true);
    } catch (err) {
      console.error("Reset Password Error:", err);
      setErrors({
        global:
          err.message ||
          "ลิงก์นี้หมดอายุหรือถูกใช้งานไปแล้ว กรุณาทำรายการขอลืมรหัสผ่านใหม่อีกครั้ง",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed align inset-0 min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat md:bg-[url('/path-to-your-desktop-bg.png')] bg-[url('/path-to-your-mobile-bg.png')]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500"
        style={{
          backgroundImage: `url(${windowWidth >= 768 ? bgDesktop : bgMobile})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="flex flex-col justify-center relative z-10 w-full max-w-[540px] md:max-w-[648px] min-h-[600px] md:min-h-[709px] p-8 md:p-10 text-center bg-black/30 backdrop-blur-md border border-white/20 shadow-2xl mx-4 scale-[0.8]">
        <div className="mb-4 md:mb-6 flex justify-center">
          <img
            src={logoLogin}
            alt="Logo"
            className="w-[75%] md:w-[85%] h-auto object-contain"
          />
        </div>

        <h2 className="text-2xl font-bold text-white mb-2 text-center tracking-wide">
          RESET PASSWORD
        </h2>
        <p className="text-white/80 text-sm mb-6 text-center">
          Please enter your new password for your next login.
        </p>

        <form
          onSubmit={handleResetPassword}
          className="space-y-4 text-left relative z-20"
        >
          {/* ป้ายเตือน Global Error */}
          {errors.global && (
            <div className="bg-red-500/20 border border-red-500/50 text-[#ffebed] px-4 py-3 rounded-xl text-[14px] text-center font-medium shadow-sm animate-pulse leading-relaxed mb-4">
              {errors.global}
              {(errors.global.includes("หมดอายุ") ||
                errors.global.includes("ไม่ถูกต้อง") ||
                errors.global.includes("ไม่พบ Token")) && (
                <span className="block mt-2">
                  Please request a new password.{" "}
                  <Link
                    to="/forgot-password"
                    className="inline-block text-[#1e1a3d] bg-white/90 font-bold decoration-2 hover:bg-white hover:scale-105 px-3 py-1 rounded-full shadow-md transition-all duration-300 ml-1"
                  >
                    Here
                  </Link>
                </span>
              )}
            </div>
          )}

          {/* New Password Input */}
          <div
            className={`relative transition-all duration-300 ${errors.newPassword ? "pb-5" : "pb-0"}`}
          >
            <label className="block text-white text-[15px] font-medium mb-1 pl-4 opacity-90">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              disabled={isLoading || blockEndTime !== null}
              className={`w-full px-6 py-3 md:py-3.5 bg-black/30 placeholder-white/80 text-white outline-none focus:ring-1 text-sm shadow-lg border-2 transition-colors duration-300 ${
                errors.newPassword
                  ? "border-red-500 focus:ring-red-500/50"
                  : "border-white/20 focus:ring-white"
              } ${isLoading || blockEndTime !== null ? "opacity-50 cursor-not-allowed" : ""}`}
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                if (errors.newPassword)
                  setErrors({ ...errors, newPassword: "" });
              }}
            />
            {errors.newPassword && (
              <p className="absolute left-1/2 -translate-x-1/2 -bottom-1 z-20 px-3 py-0 text-[14px] font-bold text-red-600 bg-white rounded-md border border-red-200 shadow-sm whitespace-nowrap">
                {errors.newPassword}
              </p>
            )}
          </div>

          {/* Confirm Password Input */}
          <div
            className={`relative transition-all duration-300 ${errors.confirmPassword ? "pb-5" : "pb-0"}`}
          >
            <label className="block text-white text-[15px] font-medium mb-1 pl-4 opacity-90">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm new password"
              disabled={isLoading || blockEndTime !== null}
              className={`w-full px-6 py-3 md:py-3.5 bg-black/30 placeholder-white/80 text-white outline-none focus:ring-1 text-sm shadow-lg border-2 transition-colors duration-300 ${
                errors.confirmPassword
                  ? "border-red-500 focus:ring-red-500/50"
                  : "border-white/20 focus:ring-white"
              } ${isLoading || blockEndTime !== null ? "opacity-50 cursor-not-allowed" : ""}`}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword)
                  setErrors({ ...errors, confirmPassword: "" });
              }}
            />
            {errors.confirmPassword && (
              <p className="absolute left-1/2 -translate-x-1/2 -bottom-1 z-20 px-3 py-0 text-[14px] font-bold text-red-600 bg-white rounded-md border border-red-200 shadow-sm whitespace-nowrap">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || blockEndTime !== null}
            className={`w-full py-5 mt-4 bg-[#ffffff] text-black text-xl font-bold shadow-xl transition-all active:scale-95 ${
              blockEndTime !== null
            }`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : blockEndTime !== null ? (
              `Please wait ${formatTime(timeLeft)}`
            ) : (
              "Reset Password"
            )}
          </button>
        </form>

        <div className="mt-6 text-sm text-white/90">
          <p
            className="cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </p>
        </div>
      </div>

      <SuccessModal
        isOpen={isSuccess}
        onClose={() => {
          setIsSuccess(false);
          navigate("/login");
        }}
        title="Reset Successful!"
        message="Your password has been successfully changed."
        buttonText="LOGIN NOW"
      />
    </div>
  );
};

export default ResetPassword;
