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
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        {/* Search Bar */}
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="ค้นหาสินค้า..."
            className="w-full border-2 border-black/80 py-2 px-4 pr-10  text-black placeholder-black/60 focus:outline-none"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black" />
        </div>
        {/* Dynamic Title */}
        <div className="w-full md:w-1/3 flex justify-center text-center">
          <h1 className="text-3xl font-bold text-[#000000] tracking-wide">
            {activeCategory !== "All" ? activeCategory : " "}
          </h1>
        </div>

        {/* Filter Button */}
        <div className="w-full md:w-1/3 flex justify-end">
          <button
            onClick={() => setIsFilterActive(!isFilterActive)}
            className={`flex items-center gap-2 px-6 py-2  font-semibold border-2 transition-all duration-300 ${
              isFilterActive
                ? "bg-black border-white text-white"
                : "bg-white border-black text-black hover:bg-gray-50"
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
              className={`px-5 py-1.5  text-sm font-semibold border transition-colors ${
                activeCategory === categoryName
                  ? "bg-black text-white border-black" // สีปุ่มตอนถูกกด
                  : "bg-transparent text-black border-black/40 hover:bg-black/10"
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
