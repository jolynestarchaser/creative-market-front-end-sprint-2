import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom'; 

import bgDesktop from "../assets/images/t_pages_login_destop_bg.jpg"; 
import bgMobile from "../assets/images/t_pages_login_moble_bg.png"; 

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); 
  const [tokenInput, setTokenInput] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSuccess, setIsSuccess] = useState(false);

  // เมื่อเปิดหน้านี้ขึ้นมา ให้ไปเช็คว่ามี ?token=xxxxxx ติดมาบนลิงก์ไหม ถ้ามีให้ดึงมาใส่ในฟอร์มทันที
  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');
    if (tokenFromUrl) {
      setTokenInput(tokenFromUrl); 
    }
  }, [searchParams]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleResetPassword = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!tokenInput) newErrors.token = "Please enter token!!";
    if (!newPassword) newErrors.newPassword = "Please enter new password!!";
    else if (newPassword.length < 6) newErrors.newPassword = "Password must be at least 6 characters!!";
    
    if (confirmPassword !== newPassword) newErrors.confirmPassword = "Passwords do not match!!";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // ดึงข้อมูล Token ที่โปรแกรมฝั่ง ForgotPassword เคยบันทึกเก็บไว้ใน LocalStorage มาตรวจสอบ
    const savedTokenData = JSON.parse(localStorage.getItem('resetPasswordToken'));

    // ทำหน้าที่เป็นผู้ตรวจกุญแจ: เช็คว่า Token ที่กรอก (หรือมาจากลิงก์) ตรงกับที่ระบบเราเซฟไว้ไหม
    if (!savedTokenData || savedTokenData.token !== tokenInput.trim()) {
      setErrors({ token: "Invalid token numbers!!" });
      return;
    }

    // ถ้าโค้ดเช็คแล้วว่ากุญแจถูกต้อง ทำการเปลี่ยนรหัสผ่านจริงในฐานข้อมูลจำลอง (users)
    let storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    
    storedUsers = storedUsers.map(user => {
      if (user.email === savedTokenData.email) {
        return { ...user, password: newPassword }; 
      }
      return user;
    });

    localStorage.setItem('users', JSON.stringify(storedUsers));
    
    // ทำลาย Token ทิ้งเพื่อความปลอดภัย ไม่ให้เอามาใช้ซ้ำได้อีก
    localStorage.removeItem('resetPasswordToken');

    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 h-screen flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500"
        style={{ 
          backgroundImage: `url(${windowWidth >= 768 ? bgDesktop : bgMobile})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center' 
        }}
      />

      <div className="scale-85 md:scale-75 relative z-10 bg-[#7b74c4]/60 backdrop-blur-md w-full max-w-[540px] min-h-[500px] rounded-[40px] shadow-2xl p-8 md:p-10 text-center border border-white/20 mx-6">
        <h2 className="text-3xl font-bold text-white mb-6">Reset Password</h2>

        <form onSubmit={handleResetPassword} className="space-y-4 text-left">
          
          <div className={`relative transition-all duration-300 ${errors.token ? 'pb-5' : 'pb-0'}`}>
            <label className="block text-white text-sm font-medium mb-1 pl-4 opacity-90">Token (กรอกให้อัตโนมัติเมื่อคลิกจากอีเมล)</label>
            <input
              type="text"
              placeholder="Enter 6-digit Token"
              className={`w-full px-6 py-3 rounded-full bg-[#a9a4e4] placeholder-white/80 text-white border-2 outline-none text-sm shadow-lg ${errors.token ? 'border-red-500' : 'border-white'}`}
              value={tokenInput}
              onChange={(e) => {
                setTokenInput(e.target.value);
                if (errors.token) setErrors(prev => ({ ...prev, token: '' }));
              }}
            />
            {errors.token && <p className="absolute left-1/2 -translate-x-1/2 -bottom-1 z-20 px-3 py-0 text-[14px] font-bold text-red-600 bg-white rounded-md border border-red-200 whitespace-nowrap">{errors.token}</p>}
          </div>

          <div className={`relative transition-all duration-300 ${errors.newPassword ? 'pb-5' : 'pb-0'}`}>
            <label className="block text-white text-sm font-medium mb-1 pl-4 opacity-90">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              className={`w-full px-6 py-3 rounded-full bg-[#a9a4e4] placeholder-white/80 text-white border-2 outline-none text-sm shadow-lg ${errors.newPassword ? 'border-red-500' : 'border-white'}`}
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                if (errors.newPassword) setErrors(prev => ({ ...prev, newPassword: '' }));
              }}
            />
            {errors.newPassword && <p className="absolute left-1/2 -translate-x-1/2 -bottom-1 z-20 px-3 py-0 text-[14px] font-bold text-red-600 bg-white rounded-md border border-red-200 whitespace-nowrap">{errors.newPassword}</p>}
          </div>

          <div className={`relative transition-all duration-300 ${errors.confirmPassword ? 'pb-5' : 'pb-0'}`}>
            <label className="block text-white text-sm font-medium mb-1 pl-4 opacity-90">Confirm New Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              className={`w-full px-6 py-3 rounded-full bg-[#a9a4e4] placeholder-white/80 text-white border-2 outline-none text-sm shadow-lg ${errors.confirmPassword ? 'border-red-500' : 'border-white'}`}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: '' }));
              }}
            />
            {errors.confirmPassword && <p className="absolute left-1/2 -translate-x-1/2 -bottom-1 z-20 px-3 py-0 text-[14px] font-bold text-red-600 bg-white rounded-md border border-red-200 whitespace-nowrap">{errors.confirmPassword}</p>}
          </div>

          <button type="submit" className="w-full py-4 mt-6 bg-[#1e1a3d] hover:bg-[#2d2859] hover:brightness-150 text-white text-lg font-bold rounded-full shadow-xl transition-all active:scale-95">
            Reset Password
          </button>
        </form>
      </div>

      {/* Modal แจ้งเตือนเมื่อทำรายการสำเร็จ */}
      {isSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-[#7b74c4] border border-white/20 p-8 rounded-[32px] w-full max-w-[400px] text-center shadow-2xl mx-4">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-500/20 text-green-400 mb-6 border border-green-500/30">
              <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Reset Successful!</h3>
            <p className="text-white/80 text-sm mb-6">เปลี่ยนรหัสผ่านใหม่เรียบร้อยแล้วครับ</p>
            <button onClick={() => navigate('/login')} className="w-full py-3 bg-[#1e1a3d] hover:bg-[#2d2859] text-white font-bold rounded-full shadow-lg text-base">
              Go to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;