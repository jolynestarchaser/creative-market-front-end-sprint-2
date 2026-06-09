import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// --- Import SuccessModal ---
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
  const [blockEndTime, setBlockEndTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);

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
        console.error(err);
      }
    };
    checkAuth();
  }, [navigate]);

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

  useEffect(() => {
    const checkRateLimitStatus = async () => {
      try {
        const apiBaseUrl =
          import.meta.env.VITE_API_URL || "http://localhost:7777";
        const response = await fetch(
          `${apiBaseUrl}/api/auth/forgot-password/status`,
        );
        const data = await response.json();

        if (data.isBlocked) {
          setBlockEndTime(Date.now() + data.timeLeft * 1000);
          setTimeLeft(data.timeLeft);
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkRateLimitStatus();
  }, []);

  useEffect(() => {
    if (!blockEndTime) return;

    const interval = setInterval(() => {
      const now = Date.now();
      if (now >= blockEndTime) {
        setBlockEndTime(null);
        setTimeLeft(0);
        setError("");
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

  const handleRequestToken = async (e) => {
    e.preventDefault();
    if (blockEndTime !== null) return;

    setError("");

    if (!email) {
      setError("PLEASE ENTER YOUR EMAIL");
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
        if (response.status === 429) {
          const resetTimeStr = response.headers.get("RateLimit-Reset");
          const retryAfterStr = response.headers.get("Retry-After");

          let waitTimeSeconds = 3 * 60;

          if (resetTimeStr) {
            waitTimeSeconds = parseInt(resetTimeStr, 10);
          } else if (retryAfterStr) {
            waitTimeSeconds = parseInt(retryAfterStr, 10);
          }

          setBlockEndTime(Date.now() + waitTimeSeconds * 1000);
          setTimeLeft(waitTimeSeconds);
        }
        throw new Error(data.message || "เกิดข้อผิดพลาดในการส่งข้อมูล");
      }

      setIsSuccess(true);
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
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500"
        style={{
          backgroundImage: `url(${windowWidth >= 768 ? bgDesktop : bgMobile})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="scale-80 relative z-10 bg-black/30 backdrop-blur-md w-full max-w-[540px] md:max-w-[648px] h-auto p-8 md:p-10 text-center border border-white/20 shadow-2xl mx-4 flex flex-col justify-center">
        <h2 className="!text-[36px] md:!text-[40px] font-bold text-white mb-6">
          FORGOT PASSWORD
        </h2>

        <p className="text-white/80 text-sm mb-6 text-middle leading-relaxed">
          Enter your email address, and a password reset link will be sent to
          your email
        </p>

        {/* --- ส่วนผสม: ดีไซน์ของเพื่อน + โลจิกของพี่ตรี --- */}
        <form onSubmit={handleRequestToken} className="space-y-4 text-left">
          {/* <label className="text-white text-lg font-medium mb-4 pl-4 opacity-90 translate-y-7 md:translate-y-3.5">
            Enter your email
          </label> */}
          <div
            className={`relative transition-all duration-300 ${error ? "pb-5" : "pb-0"}`}
          >
            <input
              type="email"
              placeholder="name@email.com"
              disabled={isLoading || blockEndTime !== null}
              className={`w-full px-6 py-3 md:py-3.5 bg-black/60 placeholder-white/80 text-white outline-none focus:ring-1 text-sm shadow-lg border-2 transition-colors duration-300 ${
                error
                  ? "border-red-500 focus:ring-red-500/50"
                  : "border-white/20 focus:ring-white"
              } ${isLoading || blockEndTime !== null ? "opacity-50 cursor-not-allowed" : ""}`}
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

          <button
            type="submit"
            disabled={isLoading || blockEndTime !== null}
            className={`w-full py-5 mt-4 text-black text-xl font-bold shadow-xl transition-all active:scale-95 flex justify-center items-center gap-2 ${
              blockEndTime !== null
                ? "bg-[#1e1a3d]/50 cursor-not-allowed"
                : "bg-[#ffffff] "
            }`}
          >
            {isLoading
              ? "กำลังส่งอีเมล..."
              : blockEndTime !== null
                ? `กรุณารอ ${formatTime(timeLeft)}`
                : "Request Reset Link"}
          </button>
        </form>

        <div className="mt-6 text-sm text-white/90 translate-y-5 md:translate-y-2.5">
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
