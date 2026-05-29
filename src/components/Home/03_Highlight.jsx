import spotlightSvg from "../../assets/logos/highlight-artist-spotlight.svg";
import spotlightUnderlineSvg from "../../assets/logos/highlight-artist-spotlight-underline.svg";
import artistImg from "../../assets/images/highlight-artist.png";
import shibaImg from "../../assets/images/highlight-shiba.png";

const Highlight = () => {
  return (
    <section className="hidden md:block bg-white w-full">
      <div className="max-w-7xl mx-auto w-auto px-7 grid grid-cols-1 py-6 md:grid-cols-2 gap-8  ">
        {/* ================= LEFT ================= */}

        <div className="flex flex-col items-center md:text-left w-full max-w-xl mx-auto gap-10 ">
          {/* 1. SVG Title & Underline */}
          <div className="flex flex-col items-center md:items-start w-full mt-15">
            <img src={spotlightSvg} alt="Artist Spotlight" className="w-full" />
            <img
              src={spotlightUnderlineSvg}
              alt="Artist Spotlight Underline"
              className="w-full mt-2"
            />
          </div>

          {/* 2. Subtitle */}
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 text-center w-full mt-10">
            The Mosaic SHIBA
          </h2>

          {/* 3. Testimonial Box */}
          <div className="relative border-3 border-[#393276] rounded-2xl p-8 w-full bg-white">
            <img
              src={artistImg}
              alt="Artist Image"
              className="absolute -left-10 top-1/2 -translate-y-1/2 w-20 h-20 rounded-full object-cover shadow-md bg-blue-300"
            />

            <p className="text-base lg:text-2xl font-medium leading-loose pl-8 text-[#26215C]">
              "ทุกลายเส้นและช่องสีคือจังหวะหัวใจที่ฉันตั้งใจ วางลงไปทีละชิ้น
              เพื่อประกอบความสุขที่จับต้องได้ ส่งตรงจากมือฉันถึงคุณ"
            </p>
            <p className="text-right text-[#393276] text-6xl font-['Arizonia',cursive] mt-4 pr-4">
              Aurelia
            </p>
          </div>

          {/* 4. Button */}
          {/* <button className="bg-black text-white px-8 py-5 rounde rounded-xl font-bold flex items-center justify-center gap-3 w-full hover:bg-gray-800 transition-all text-base tracking-widest cursor-pointer">
            <span className="text-xl">VIEW ARTIST</span>
            <span className="text-xl leading-none">↗</span>
          </button> */}
        </div>

        {/* ================= RIGHT ================= */}
        <div className="hidden md:block w-full">
          <img
            src={shibaImg}
            alt="The Mosaic Shiba"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Highlight;
