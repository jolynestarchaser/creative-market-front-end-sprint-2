import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// --- Import SuccessModal (สอดคล้องกับหน้า Login) ---
import SuccessModal from "../components/Global/SuccessModal";

// --- Import รูปภาพ ---
import bgDesktop from "../assets/images/j-login-bg.jpg";
import bgMobile from "../assets/images/j-login-bg.jpg";
import imgRegisterDesktop from "../assets/images/register.jpg";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, userAnswer: "" });
  const [errors, setErrors] = useState({});

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // ควบคุมสถานะ Loading

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const generateCaptcha = () => {
    const n1 = Math.floor(Math.random() * 10) + 1;
    const n2 = Math.floor(Math.random() * 10) + 1;
    setCaptcha({ num1: n1, num2: n2, userAnswer: "" });
  };

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
    generateCaptcha();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "userAnswer") {
      setCaptcha({ ...captcha, userAnswer: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validate = () => {
    let newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Please enter your email!!";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format (e.g. name@mail.com)";
    }

    if (!formData.password) {
      newErrors.password = "Please enter your password!!";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters!!";
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match!!";
    }

    if (parseInt(captcha.userAnswer) !== captcha.num1 + captcha.num2) {
      newErrors.userAnswer = "Incorrect answer!!";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    // เริ่มโหลดและล็อคปุ่ม
    setIsLoading(true);

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:7777";

    try {
      const emailCheckRes = await fetch(
        `${API_URL}/api/users/check-email?email=${formData.email}`,
      );
      const emailCheck = await emailCheckRes.json();

      if (emailCheck.exists) {
        setErrors({ ...errors, email: "Email already in use" });
        generateCaptcha(); // รีเฟรช CAPTCHA เมื่ออีเมลซ้ำ
        return;
      }

      const registerRes = await fetch(`${API_URL}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const registerData = await registerRes.json();

      if (!registerRes.ok) {
        setErrors({
          ...errors,
          email: registerData.message || "Something went wrong",
        });
        generateCaptcha(); // รีเฟรช CAPTCHA เมื่อ Backend ส่ง Error แจ้งเตือนกลับมา
        return;
      }

      setIsSuccess(true);
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({ ...errors, email: "Failed to connect to the server" });
      generateCaptcha(); // รีเฟรช CAPTCHA เมื่อเชื่อมต่อเซิร์ฟเวอร์ไม่ได้
    } finally {
      // ปลดล็อคปุ่มเสมอ
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 w-full h-screen flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat md:bg-[url('/path-to-your-desktop-bg.png')] bg-[url('/path-to-your-mobile-bg.png')]">
      <div
        className="absolute inset-0 bg-cover bg-no-repeat transition-all duration-500"
        style={{
          backgroundImage: `url(${windowWidth >= 768 ? bgDesktop : bgMobile})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* ปรับกล่องหลักให้เป็น bg-black/30 backdrop-blur-md และ border-white/20 เพื่อล้อกับหน้า Login */}
      <div className="scale-80 relative z-10 bg-black/30 backdrop-blur-md w-full max-w-[400px] md:max-w-[1096px] min-h-[500px] md:min-h-[688px] h-auto shadow-2xl flex flex-col md:flex-row overflow-hidden border border-white/20 mx-auto py-10 px-6 md:p-0">
        {/* รูปด้านซ้าย */}
        <div className="hidden md:block w-1/2 p-6">
          <img
            src={imgRegisterDesktop}
            alt="Taxi"
            className="w-full h-full object-cover "
          />
        </div>

        {/* ฟอร์มกรอกข้อมูลด้านขวา */}
        <div className="w-full md:w-1/2 p-0 md:p-10 flex flex-col justify-center text-white">
          <h2 className="!text-[48px] !font-bold !text-center mb-8 md:mb-10 !text-[#ffffff] mx-auto mt-0">
            REGISTER
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="flex flex-col">
              <input
                type="email"
                name="email"
                placeholder="Enter your email address!!"
                disabled={isLoading}
                className={`w-full px-6 py-3 md:py-3.5 bg-black/50 placeholder-white/80 text-white outline-none focus:ring-2 text-sm shadow-lg border-2 transition-colors duration-300 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500/50"
                    : "border-white focus:ring-white"
                } ${isLoading ? "opacity-50" : ""}`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-400 text-[14px] mt-1.5 pl-4 font-bold tracking-wide">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="flex flex-col">
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                disabled={isLoading}
                className={`w-full px-6 py-3 md:py-3.5 bg-black/50 placeholder-white/80 text-white outline-none focus:ring-2 text-sm shadow-lg border-2 transition-colors duration-300 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500/50"
                    : "border-white focus:ring-white"
                } ${isLoading ? "opacity-50" : ""}`}
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-red-400 text-[14px] mt-1.5 pl-4 font-bold tracking-wide">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="flex flex-col">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Enter password confirmation"
                disabled={isLoading}
                className={`w-full px-6 py-3 md:py-3.5 bg-black/50 placeholder-white/80 text-white outline-none focus:ring-2 text-sm shadow-lg border-2 transition-colors duration-300 ${
                  errors.confirmPassword
                    ? "border-red-500 focus:ring-red-500/50"
                    : "border-white focus:ring-white"
                } ${isLoading ? "opacity-50" : ""}`}
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <p className="text-red-400 text-[14px] mt-1.5 pl-4 font-bold tracking-wide">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Captcha Field */}
            <div className="flex flex-col">
              <div
                className={`flex items-center justify-center gap-3 bg-black/50 p-2.5 border-2 transition-colors duration-300 ${
                  errors.userAnswer ? "border-red-500" : "border-white"
                }`}
              >
                <span className="bg-[#1e1a3d] px-4 py-1.5 font-bold text-sm text-white">
                  {captcha.num1} + {captcha.num2} =
                </span>
                <input
                  type="number"
                  name="userAnswer"
                  placeholder="?"
                  disabled={isLoading}
                  className={`w-16 p-1.5 ] bg-white text-[#1e1a3d] text-center font-bold outline-none ${isLoading ? "opacity-50" : ""}`}
                  value={captcha.userAnswer}
                  onChange={handleChange}
                />
              </div>
              {errors.userAnswer && (
                <p className="text-red-400 text-[14px] mt-1.5 pl-4 font-bold tracking-wide">
                  {errors.userAnswer}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-5 mt-4 text-black text-xl font-bold shadow-xl transition-all active:scale-95 flex justify-center items-center gap-2 
                ${
                  isLoading
                    ? "bg-[#1e1a3d]/50 cursor-not-allowed"
                    : "bg-[#ffffff] "
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
              ) : (
                "Create an account"
              )}
            </button>
          </form>

          <p className="text-center text-xs md:text-sm mx-auto mt-6">
            Already have one?{" "}
            <Link
              to="/login"
              className="font-extrabold underline hover:text-white"
            >
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* เรียกใช้ Global SuccessModal แทน Popup ตัวเดิม */}
      <SuccessModal
        isOpen={isSuccess}
        onClose={() => navigate("/login")}
        title="Registration Successful!"
        message="Your account has been created successfully."
        buttonText="Go to Login"
      />
    </div>
  );
};

export default Register;
