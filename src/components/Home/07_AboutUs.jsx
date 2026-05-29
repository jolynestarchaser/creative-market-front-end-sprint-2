import React from "react";

import logoCreative from "../../assets/logos/about-us-main-logo.svg";
import leftStarIcon from "../../assets/icons/about-us-left-star.svg";
import rightStarIcon from "../../assets/icons/about-us-right-star.svg";
import lin from "../../assets/icons/about-us-lin.svg";
import sign from "../../assets/icons/about-us-sign.svg";
import asha from "../../assets/icons/about-us-asha.svg";
import tri from "../../assets/icons/about-us-tri.svg";
import joe from "../../assets/icons/about-us-joe.svg";
import bank from "../../assets/icons/about-us-bank.svg";

const AboutUs = () => {
  const teamMembers = [
    {
      id: 1,
      handle: "@lattawanksp",
      color: "text-[#FFF000]",
      img: lin,
      githubUrl: "https://github.com/lattawanksp",
    },
    {
      id: 2,
      handle: "@Wathisa",
      color: "text-[#FFA6D9]",
      img: sign,
      githubUrl: "https://github.com/Wathisa",
    },
    {
      id: 3,
      handle: "@AshaJenvasu",
      color: "text-[#FF2A2A]",
      img: asha,
      githubUrl: "https://github.com/AshaJenvasu",
    },
    {
      id: 4,
      handle: "@devmontri-github",
      color: "text-[#1E67FF]",
      img: tri,
      githubUrl: "https://github.com/devmontri-gitlhub",
    },
    {
      id: 5,
      handle: "@jolynestarchaser",
      color: "text-[#00FF00]",
      img: joe,
      githubUrl: "https://github.com/jolynestarchaser",
    },
    {
      id: 6,
      handle: "@billie89-33",
      color: "text-[#D16BFF]",
      img: bank,
      githubUrl: "https://github.com/billie89-33",
    },
  ];

  return (
    <section
      section
      id="about-section"
      className=" w-full bg-[#111016] text-white py-24 px-6 font-['Anuphan',_sans-serif]"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* ================= 1. ABOUT US HEADER ================= */}
        <h2 className="text-3xl font-bold mb-10 tracking-wide">About us</h2>

        {/* Logo & Stars Row */}
        <div className="flex items-center justify-center gap-6 md:gap-34 w-full mb-10">
          {/* ดาวดวงซ้าย */}
          <img
            src={leftStarIcon}
            alt="star"
            className="w-8 md:w-12 hidden md:block"
          />

          {/* Main Logo Text */}
          <img
            src={logoCreative}
            alt="Creative Market"
            className="w-full max-w-[280px] md:max-w-3xl"
          />

          {/* ดาวดวงขวา */}
          <img
            src={rightStarIcon}
            alt="star"
            className="w-8 md:w-12 hidden md:block"
          />
        </div>

        {/* Description Text */}
        <p className="text-center text-[#AFA9EC] max-w-4xl text-sm md:text-base leading-relaxed mb-32">
          ศูนย์รวมตลาดออนไลน์ที่อุทิศให้แก่ผลงานศิลปะ งานฝีมือ
          และงานออกแบบที่รังสรรค์ด้วยมือมนุษย์แบบ 100%
          เพราะเราเชื่อมั่นอย่างแรงกล้าว่า
          ศิลปะคือภาษากลางอันลึกซึ้งที่ใช้ถ่ายทอดอารมณ์ ประสบการณ์ชีวิต
          และจิตวิญญาณของมนุษย์
          ซึ่งเป็นเสน่ห์อันเป็นเอกลักษณ์และเปี่ยมด้วยความจริงแท้
          ที่ไม่มีเทคโนโลยีหรือปัญญาประดิษฐ์ (AI) ใดๆ จะสามารถลอกเลียนแบบได้
        </p>

        {/* ================= 2. MEET THE TEAM ================= */}
        <h3 className="text-2xl font-bold mb-16 tracking-wide">
          Meet the team
        </h3>

        {/* Team Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-12 w-full place-items-center">
          {teamMembers.map((member) => (
            <a
              href={member.githubUrl}
              key={member.id}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group cursor-pointer"
            >
              <div
                key={member.id}
                className="flex flex-col items-center group cursor-pointer"
              >
                {/* รูปหน้าคน */}
                <div className="w-32 h-32 md:w-36 md:h-36 mb-4 transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-105">
                  <img
                    src={member.img}
                    alt={member.handle}
                    className="w-full h-full object-contain drop-shadow-md"
                  />
                </div>
                {/* ชื่อ handle  */}
                <p className={`text-xs md:text-sm font-medium ${member.color}`}>
                  {member.handle}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
