import React from "react";

import { FaGithub } from "react-icons/fa";

import logo from "../../assets/logos/logo.svg";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white py-12  md:px-20 font-['Anuphan',sans-serif]">
      <div className=" flex flex-col md:flex-row justify-between  gap-10">
        {/* ================= 1. LEFT: LOGO ================= */}
        <div className="w-full  md:w-auto flex justify-center mt-4">
          <img
            src={logo}
            alt="Creative Market"
            className="h-12 md:h-16 w-auto"
          />
        </div>

        {/* ================= 2. MIDDLE: LINKS & COPYRIGHT ================= */}
        <div className="flex-1 flex flex-col items-center gap-8">
          {/* Link Columns */}
          <div className="flex gap-12 md:gap-20 text-sm md:text-base text-gray-300">
            {/* Column */}
            <ul className="flex flex-col gap-2">
              <li className="hover:text-white cursor-pointer transition-colors">
                From small commits to meaningful creations
              </li>
            </ul>
          </div>

          {/* Copyright */}
          <p className="text-gray-500 text-xs md:text-sm tracking-wide">
            © 2026 Creative Market. All rights reserved.
          </p>
        </div>
        {/* ================= 3. RIGHT: GITHUB ================= */}
        <div className="w-full md:w-auto flex flex-col items-center md:items-end gap-3 mt-2 md:mt-0">
          {/* 1. เปลี่ยนหัวข้อข้อความให้น่าดึงดูด */}
          <h4 className="text-lg font-bold tracking-wider uppercase text-gray-400">
            Open Source
          </h4>

          {/* 2. ปุ่มลิงก์ GitHub เดี่ยวแบบโมเดิร์น */}
          <a
            href="https://github.com/AshaJenvasu/creative-market-front-end" // อย่าลืมให้เพื่อนหรือตัวเธอเองมาใส่ลิงก์จริงตรงนี้น้า
            target="_blank" // เปิดแท็บใหม่เวลาคนกด จะได้ไม่ปลิวหลุดจากหน้าเว็บเราจ้า
            rel="noopener noreferrer" // Security Best Practice ป้องกันช่องโหว่เมื่อใช้ target="_blank"
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700 bg-zinc-900/50 hover:bg-white hover:text-black hover:border-white text-gray-300 transition-all duration-300 text-sm md:text-base font-medium cursor-pointer group"
          >
            <FaGithub
              size={20}
              className="transition-transform group-hover:scale-110"
            />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
