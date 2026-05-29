import React from "react";
import { FaSearch, FaFilter } from "react-icons/fa";

function MarketHeader({
  setSearchQuery,
  isFilterActive,
  setIsFilterActive,
  activeCategory,
  setActiveCategory,
  categories,
}) {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        {/* Search Bar */}
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="ค้นหาสินค้า..."
            className="w-full border-2 border-[#373373] rounded-md py-2 px-4 pr-10 bg-[#F8F7FF] text-[#373373] placeholder-[#373373] focus:outline-none"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#373373]" />
        </div>
        {/* Dynamic Title */}
        <div className="w-full md:w-1/3 flex justify-center text-center">
          <h1 className="text-3xl font-bold text-[#373373] tracking-wide">
            {activeCategory !== "All" ? activeCategory : " "}
          </h1>
        </div>

        {/* Filter Button */}
        <div className="w-full md:w-1/3 flex justify-end">
          <button
            onClick={() => setIsFilterActive(!isFilterActive)}
            className={`flex items-center gap-2 px-6 py-2 rounded-xl font-semibold border-2 transition-all duration-300 ${
              isFilterActive
                ? "bg-[#251E52] border-[#251E52] text-[#A29EE4]"
                : "bg-white border-[#251E52] text-[#373373] hover:bg-gray-50"
            }`}
          >
            <FaFilter /> Filters
          </button>
        </div>
      </div>

      {/* Filter Options */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isFilterActive ? "max-h-20 opacity-100 mb-8" : "max-h-0 opacity-0 mb-0"}`}
      >
        <div className="flex justify-end gap-3 flex-wrap">
          {categories.map((categoryName) => (
            <button
              key={categoryName}
              onClick={() => setActiveCategory(categoryName)}
              className={`px-5 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
                activeCategory === categoryName
                  ? "bg-[#6D5DD3] text-white border-[#6D5DD3]" // สีปุ่มตอนถูกกด
                  : "bg-transparent text-[#373373] border-[#373373] hover:bg-[#EBE9FF]"
              }`}
            >
              {categoryName}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default MarketHeader;
