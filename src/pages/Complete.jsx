import React from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, User, Truck } from "lucide-react";

export default function Complete() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#F3EFFF] flex flex-col items-center  p-6">
      <div className="text-center mb-30">
        <h1 className="text-3xl font-bold mb-3 text-[#393276]">Complete</h1>
        <div className="flex items-center justify-center gap-3 text-sm text-[#4C1D95]">
          <ShoppingCart size={20} />
          <div className="w-12 h-[2px] bg-[#4C1D95]"></div>
          <div className="w-2 h-2 rounded-full bg-[#4C1D95]"></div>
          <div className="w-12 h-[2px] bg-[#4C1D95]"></div>
          <div className="w-2 h-2 rounded-full bg-[#4C1D95]"></div>
          <div className="w-12 h-[2px] bg-[#4C1D95]"></div>
          <User size={20} />
        </div>
      </div>

      {/* กล่องข้อความ Complete สีขาว */}
      <div className="bg-white border border-gray-300 p-12 text-center max-w-md w-full space-y-6">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-[#10B981] rounded-full flex items-center justify-center text-white text-3xl">
            ✓
          </div>
        </div>

        <h2 className="text-3xl font-bold text-[#1E1B4B]">Complete</h2>

        {/* ไอคอนรถบรรทุก */}
        <div className="flex justify-center">
          <Truck size={48} className="text-[#1E1B4B]" />
        </div>

        <p className="text-sm text-purple-400">wait for artist shipping</p>

        <button
          type="button"
          onClick={() => navigate("/")} //
          className="w-full bg-[#1E1B4B] text-white py-3 rounded-md font-bold text-sm hover:bg-[#312E81] transition-all shadow-md active:scale-95"
        >
          BACK TO GALLERY
        </button>
      </div>
    </div>
  );
}
