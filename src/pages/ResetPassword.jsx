import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// --- Import SuccessModal ---
import SuccessModal from "../components/Global/SuccessModal";

// --- Import รูปภาพ ---
import bgDesktop from "../assets/images/j-login-bg.jpg";
import bgMobile from "../assets/images/j-login-bg.jpg";
import logoLogin from "../assets/icons/creative-logo.svg";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const [tokenInput, setTokenInput] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (token) {
      setTokenInput(token);
    }
  }, [token]);

  // สั่งหยุดการเลื่อนหน้าจอเพื่อให้พฤติกรรมตรงกับหน้า Login
  useEffect(() => {
    if (window.lenis) window.lenis.stop();
    document.body.style.overflow = "hidden";

    return () => {
      if (window.lenis) window.lenis.start();
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleResetPassword = async () => {
    setErrors({});
    let newErrors = {};

    if (!tokenInput.trim()) newErrors.token = "PLEASE PROVIDE A RESET TOKEN";
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
          token: tokenInput,
          password: newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "เกิดข้อผิดพลาดในการรีเซ็ตรหัสผ่าน");
      }

      // โชว์ SuccessModal เมื่อสำเร็จ
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        navigate("/login");
      }, 3000); // 3000 มิลลิวินาที = 3 วินาที
    } catch (err) {
      console.error("Reset Password Error:", err);
      setErrors({ token: err.message || "Token ไม่ถูกต้อง หรือหมดอายุแล้ว" });
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

      <div className="flex flex-col justify-center relative z-10 w-full max-w-[540px] md:max-w-[648px] min-h-[600px] md:min-h-[709px] p-8 md:p-10 text-center bg-black/30 backdrop-blur-md border border-white/20 shadow-2xl mx-4 scale-80">
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
          กรุณากรอกรหัสผ่านใหม่ของคุณเพื่อใช้ในการเข้าสู่ระบบครั้งต่อไป
        </p>

        <div className="space-y-4 text-left">
          {/* Token Input */}
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Paste your token here..."
              disabled={isLoading}
              className={`w-full px-6 py-3 md:py-3.5 bg-black/30 placeholder-white/80 text-white outline-none focus:ring-1 text-sm shadow-lg border-2 transition-colors duration-300 ${
                errors.token
                  ? "border-red-500 focus:ring-red-500/50"
                  : "border-white/20 focus:ring-white"
              } ${isLoading ? "opacity-50" : ""}`}
              value={tokenInput}
              onChange={(e) => {
                setTokenInput(e.target.value);
                if (errors.token) setErrors({ ...errors, token: "" });
              }}
            />
            {errors.token && (
              <p className="text-red-400 text-[14px] mt-1.5 pl-4 font-bold tracking-wide">
                {errors.token}
              </p>
            )}
          </div>

          {/* New Password Input */}
          <div className="flex flex-col">
            <input
              type="password"
              placeholder="New Password (••••••••)"
              disabled={isLoading}
              className={`w-full px-6 py-3 md:py-3.5 bg-black/30 placeholder-white/80 text-white outline-none focus:ring-1 text-sm shadow-lg border-2 transition-colors duration-300 ${
                errors.newPassword
                  ? "border-red-500 focus:ring-red-500/50"
                  : "border-white/20 focus:ring-white"
              } ${isLoading ? "opacity-50" : ""}`}
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                if (errors.newPassword)
                  setErrors({ ...errors, newPassword: "" });
              }}
            />
            {errors.newPassword && (
              <p className="text-red-400 text-[14px] mt-1.5 pl-4 font-bold tracking-wide">
                {errors.newPassword}
              </p>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className="flex flex-col">
            <input
              type="password"
              placeholder="Confirm Password (••••••••)"
              disabled={isLoading}
              className={`w-full px-6 py-3 md:py-3.5 bg-black/30 placeholder-white/80 text-white outline-none focus:ring-1 text-sm shadow-lg border-2 transition-colors duration-300 ${
                errors.confirmPassword
                  ? "border-red-500 focus:ring-red-500/50"
                  : "border-white/20 focus:ring-white"
              } ${isLoading ? "opacity-50" : ""}`}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword)
                  setErrors({ ...errors, confirmPassword: "" });
              }}
            />
            {errors.confirmPassword && (
              <p className="text-red-400 text-[14px] mt-1.5 pl-4 font-bold tracking-wide">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </div>

        <button
          onClick={handleResetPassword}
          disabled={isLoading}
          className={`w-full py-5 mt-8 bg-[#ffffff] text-black text-xl font-bold shadow-xl transition-all active:scale-95 ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "PROCESSING..." : "RESET PASSWORD"}
        </button>

        <div className="mt-6 text-sm text-white/90">
          <p
            className="cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </p>
        </div>
      </div>

      {/* ใช้งาน SuccessModal */}
      <SuccessModal
        isOpen={isSuccess}
        onClose={() => {
          setIsSuccess(false);
          navigate("/login");
        }}
        title="Reset Successful!"
        message="รหัสผ่านของคุณถูกเปลี่ยนเรียบร้อยแล้ว"
        buttonText="LOGIN NOW"
      />
    </div>
  );
};

export default ResetPassword;
