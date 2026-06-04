import React from 'react';
import { ShoppingCart, User } from 'lucide-react';

export default function CartHeader() {
  return (
    <div className="flex items-center justify-center gap-3 text-sm text-[#4C1D95]">
      <ShoppingCart size={20} />
      <div className="w-12 h-[2px] bg-gray-300"></div> {/* เส้นสีอ่อน */}
      <div className="w-2 h-2 rounded-full bg-gray-300"></div>
      <div className="w-12 h-[2px] bg-gray-300"></div>
      <div className="w-2 h-2 rounded-full bg-gray-300"></div>
      <div className="w-12 h-[2px] bg-gray-300"></div>
      <User size={20} className="text-gray-400" />
    </div>
  );
}