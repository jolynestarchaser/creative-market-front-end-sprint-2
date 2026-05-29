import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// --- Import รูปภาพ ---
import bgDesktop from "../assets/images/j-login-bg.jpg";
import bgMobile from "../assets/images/j-login-bg.jpg";
import logoLogin from "../assets/icons/creative-logo.svg";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogin = async () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      newErrors.email = "Please enter your email!!";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format (e.g. name@mail.com)";
    }

    if (!password) {
      newErrors.password = "Please enter your password!!";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // ใช้ URL เต็มๆ ยิงตรงไปที่ Backend เลย (ไม่ต้องผ่าน Proxy)
      const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:7777";
      const apiUrl = `${apiBaseUrl}/api/auth/login`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        // สำคัญมาก: ต้องมี credentials: 'include' เพื่อรับ Cookie 
        credentials: 'include', 
      });

      const data = await response.json();

      if (response.ok) {
        setErrors({});
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

      <div className="flex flex-col justify-center relative z-10 w-full max-w-[540px] md:max-w-[648px] min-h-[600px] md:min-h-[709px] p-8 md:p-10 text-center bg-black/30 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl mx-4 scale-80">
        <div className="mb-6 md:mb-8 flex justify-center">
          <img
            src={logoLogin}
            alt="Logo"
            className="w-[75%] md:w-[85%] h-auto object-contain"
          />
        </div>

        <div className="space-y-4 text-left">
          <label className="block text-white !text-xl !md:text-2xl font-medium mb-1 pl-4 opacity-90">
            Enter your email
          </label>

          <div className={`relative transition-all duration-300 ${errors.email ? "pb-5" : "pb-0"}`}>
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full px-6 py-3 md:py-3.5 rounded-[16px] bg-black/50 placeholder-white/80 text-white border-2 border-white outline-none focus:ring-4 focus:ring-white/50 text-sm shadow-lg"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: "" });
              }}
            />
            {errors.email && (
              <p className="absolute left-1/2 -translate-x-1/2 -bottom-1 z-20 px-3 py-0 text-[14px] font-bold text-red-600 bg-white rounded-md border border-red-200 shadow-sm transition-all duration-300 mt-0 translate-y-0.75 md:translate-y-0.5 whitespace-nowrap leading-tight ">
                {errors.email}
              </p>
            )}
          </div>

          <div className={`relative transition-all duration-300 ${errors.password ? "pb-5" : "pb-0"}`}>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-6 py-3 md:py-3.5 rounded-[16px] bg-black/50 placeholder-white/80 text-white border-2 border-white outline-none focus:ring-4 focus:ring-white/50 text-sm shadow-lg"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: "" });
              }}
            />
            {errors.password && (
              <p className="absolute left-1/2 -translate-x-1/2 -bottom-1 z-20 px-3 py-0 text-[14px] font-bold text-red-600 bg-white rounded-md border border-red-200 shadow-sm transition-all duration-300 mt-0 translate-y-0.75 md:translate-y-0.5 whitespace-nowrap leading-tight ">
                {errors.password}
              </p>
            )}
          </div>
        </div>

        <button
          onClick={handleLogin}
          className="w-full py-5 mt-4 bg-[#1e1a3d] hover:bg-[#2d2859] hover:brightness-150 text-white text-xl font-bold rounded-[16px] shadow-xl transition-all active:scale-95"
        >
          Login
        </button>

        <div className="mt-6 text-xs md:text-sm text-white/90 space-y-2">
          <p
            className="cursor-pointer hover:underline"
            onClick={() => navigate("/forgot-password")}
          >
            forgot your password?
          </p>
          <p>
            Not have one ?{" "}
            <span
              className="font-extrabold underline cursor-pointer hover:text-white"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </div>
      </div>

      {isSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#7b74c4] border border-white/20 p-8 rounded-[32px] w-full max-w-[400px] text-center shadow-2xl mx-4 transform scale-100 transition-all duration-300">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-500/20 text-green-400 mb-6 border border-green-500/30">
              <svg
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 -translate-y-5 md:-translate-y-5">
              Welcome back!
            </h3>
            <p className="text-white/80 text-sm mb-6 -translate-y-4.5 md:-translate-y-5">
              Login Successful.
            </p>
            <button
              onClick={() => {
                setIsSuccess(false);
                window.location.href = "/";
              }}
              className="w-full py-3 bg-[#1e1a3d] hover:bg-[#2d2859] hover:brightness-120 text-white font-bold rounded-full shadow-lg transition-all active:scale-95 text-base"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;