import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// --- Import SuccessModal ---
import SuccessModal from "../components/Global/SuccessModal"; // ปรับ Path ให้ตรงกับโปรเจกต์คุณ

// --- Import รูปภาพ ---
import bgDesktop from "../assets/images/j-login-bg.jpg";
import bgMobile from "../assets/images/j-login-bg.jpg";
import logoLogin from "../assets/icons/creative-logo.svg";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, setUserRole } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

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

  const handleLogin = async () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      newErrors.email = "PLEASE ENTER YOUR EMAIL";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "INVALID EMAIL FORMAT (e.g. name@mail.com)";
    }

    if (!password) {
      newErrors.password = "PLEASE ENTER YOUR PASSWORD";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const apiBaseUrl =
        import.meta.env.VITE_API_URL || "http://localhost:7777";
      const apiUrl = `${apiBaseUrl}/api/auth/login`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        setErrors({});
        setIsLoggedIn(true);
        setUserRole(data.role);
        setIsSuccess(true);
      } else {
        setErrors({ password: data.message || "Invalid email or password!!" });
      }
    } catch (error) {
      console.error("Login Error:", error);
      setErrors({ password: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้" });
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
        <div className="mb-6 md:mb-8 flex justify-center">
          <img
            src={logoLogin}
            alt="Logo"
            className="w-[75%] md:w-[85%] h-auto object-contain"
          />
        </div>

        <div className="space-y-4 text-left">
          {/* <label className="block text-white text-xl !md:text-2xl font-medium mb-6  opacity-90">
            ENTER YOUR EMAIL AND PASSWORD
          </label> */}

          {/* Email Input */}
          <div className="flex flex-col">
            <input
              type="email"
              placeholder="Enter your email address"
              className={`w-full px-6 py-3 md:py-3.5 bg-black/30 placeholder-white/80 text-white outline-none focus:ring-1 text-sm shadow-lg border-2 transition-colors duration-300 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500/50"
                  : "border-white/20 focus:ring-white"
              }`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: "" });
              }}
            />
            {errors.email && (
              <p className="text-red-400 text-[14px] mt-1.5 pl-4 font-bold tracking-wide">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className="flex flex-col mt-4">
            <input
              type="password"
              placeholder="Enter your password"
              className={`w-full px-6 py-3 md:py-3.5 bg-black/30 placeholder-white/80 text-white outline-none focus:ring-1 text-sm shadow-lg border-2 transition-colors duration-300 ${
                errors.password
                  ? "border-red-500 focus:ring-red-500/50"
                  : "border-white/20 focus:ring-white"
              }`}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: "" });
              }}
            />
            {errors.password && (
              <p className="text-red-400 text-[14px] mt-1.5 pl-4 font-bold tracking-wide">
                {errors.password}
              </p>
            )}
          </div>
        </div>

        <button
          onClick={handleLogin}
          className="w-full py-5 mt-6 bg-[#ffffff]   text-black text-xl font-bold shadow-xl transition-all active:scale-95"
        >
          LOGIN
        </button>

        <div className="mt-6 text-xs md:text-sm text-white/90 space-y-2">
          <p
            className="cursor-pointer hover:underline"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Your Password?
          </p>
          <p>
            Not have one ?{" "}
            <span
              className="font-extrabold underline cursor-pointer hover:text-white"
              onClick={() => navigate("/register")}
            >
              REGISTER
            </span>
          </p>
        </div>
      </div>

      {/* ใช้งาน SuccessModal */}
      <SuccessModal
        isOpen={isSuccess}
        onClose={() => {
          setIsSuccess(false);
          window.location.href = "/";
        }}
        title="Welcome back!"
        message="Login Successful."
        buttonText="OK"
      />
    </div>
  );
};

export default LoginPage;
