import React from "react";
// import underline from "../../assets/logos/artist-love-underline.svg";
// import img1 from "../../assets/images/artist-love-1.png";
// import img2 from "../../assets/images/artist-love-2.png";
// import img3 from "../../assets/images/artist-love-3.png";
import Collab from "../../assets/images/collab.jpg";
import { Link } from "react-router";
const ArtistLove = () => {
  return (
    <div
      className="w-full h-screen bg-fixed bg-center bg-cover bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: `url(${Collab})` }}
    >
      {/* ส่วนของเนื้อหาข้อความ (ปรับแต่งหรือลบออกได้) */}
      <div className="text-center">
        <a
          href="https://audlist.xyz/club"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          <h1 className="text-white text-4xl md:text-6xl font-bold bg-black/40 border-white/40 border-2 px-8 py-4 rounded-xl backdrop-blur-sm hover:bg-black/60 transition-all cursor-pointer">
            Community for artists
          </h1>
        </a>
        <p className="text-white mt-4 text-lg text-center drop md:text-xl">
          Creative Market x Audtlist
        </p>
      </div>
    </div>
  );
};

// (
//     <section className="hidden md:block w-full bg-white py-20 overflow-hidden font-['Rock_Salt',cursive]">
//       <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 px-6">
//         {/* ================= 1. ด้านซ้าย: TEXT SECTION ================= */}
//         <div className="w-full md:w-2/5 flex flex-col items-center md:items-start text-center md:text-left">
//           <h2 className="text-5xl lg:text-6xl block mb-6 leading-tight">
//             Support
//           </h2>
//           <h2 className="text-3xl lg:text-5xl leading-[1.6] tracking-normal block">
//             The Artists <br /> You Love
//           </h2>
//           <img src={underline} alt="Underline" className="w-full mt-6" />
//         </div>

//         {/* ================= 2. ด้านขวา: (หั่น 3 ภาพ) ================= */}
//         {/* ตัวแม่ใส่ -skew-x-[12deg] เพื่อบิดทั้งแผง */}
//         <div className="w-full md:w-3/5 relative flex overflow-hidden border-[12px] border-white transform -skew-x-[12deg] shadow-2xl">
//           {/* ก้อนที่ 1: Bob Ross Style */}
//           <div className="w-1/3 aspect-[3/5] overflow-hidden group border-r-[12px] border-white">
//             <img
//               src={img1}
//               alt="Artist 1"
//               className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 transform skew-x-[12deg] scale-125"
//             />
//           </div>

//           {/* ก้อนที่ 2: Cartoon Style */}
//           <div className="w-1/3 aspect-[3/5] overflow-hidden group">
//             <img
//               src={img2}
//               alt="Artist 2"
//               className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 transform skew-x-[12deg] scale-125"
//             />
//           </div>

//           {/* ก้อนที่ 3: 3D Character (พื้นหลังสีฟ้าเทอควอยซ์) */}
//           <div className="w-1/3 aspect-[3/5] overflow-hidden group">
//             <img
//               src={img3}
//               alt="Artist 3"
//               className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 transform skew-x-[12deg] scale-125"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

export default ArtistLove;
