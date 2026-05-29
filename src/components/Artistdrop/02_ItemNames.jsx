import React from "react";
import { IoChevronDown } from "react-icons/io5";
import FormInput from "../Global/FormInput"; // ปรับ Path ตามที่คุณเก็บไฟล์ไว้

export default function ItemDetails({ formData, onChange, errors }) {
  return (
    <div className="bg-white p-8 border border-gray-200 shadow-sm space-y-8 ">
      {/* 1. Item Name - เรียกใช้ FormInput ของคุณได้เลย! */}
      <FormInput
        label="Item Name"
        name="itemName"
        value={formData.itemName}
        onChange={onChange}
        error={errors.itemName}
        required={true}
        placeholder="e.g. 'Silent Symphony #01'"
      />

      {/* 2. Description (ใช้เป็น Textarea และใส่ Description ได้เลย) */}
      <FormInput
        label="Description"
        description="The description will be included on the item's detail page."
        name="description"
        value={formData.description}
        onChange={onChange}
        required={true}
        error={errors.description}
        isTextArea={true} // บอกให้รู้ว่าเป็น Textarea
        placeholder="Provide a detailed description of your item."
      />

      {/* 4. Category */}
      <div>
        <label className="block text-base font-bold text-black mb-1">
          Category <span className="text-red-500">*</span>{" "}
          {/* [เพิ่มใหม่] ดอกจัน */}
        </label>
        <span className="block text-sm text-gray-500 mb-3">
          Select a category to help users find your item.
        </span>
        <div className="relative">
          <select
            name="category"
            value={formData.category}
            onChange={onChange}
            // [ปรับแก้] เช็คเงื่อนไข errors.category เพื่อเปลี่ยนกรอบเป็นสีแดง
            className={`w-full border p-3 appearance-none outline-none focus:border-black focus:ring-1 focus:ring-black cursor-pointer text-gray-800 ${
              errors.category
                ? "border-red-500 bg-red-50"
                : "border-gray-400 bg-white"
            }`}
          >
            <option value="" disabled hidden>
              Select category
            </option>
            <option value="visual art">Visual Art</option>
            <option value="craft and handmade">Craft & Handmade</option>
            <option value="music and sound">Music & Sound</option>
          </select>
          <IoChevronDown className="absolute right-4 top-[1.1rem] text-gray-600 text-xl pointer-events-none" />
        </div>
        {/* [เพิ่มใหม่] แสดงข้อความ Error ด้านล่าง Dropdown */}
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">{errors.category}</p>
        )}
      </div>

      {/* 5. Quantity */}
      <FormInput
        label="Quantity"
        description="The number of items that can be minted. No hidden costs."
        type="number"
        name="quantity"
        value={formData.quantity}
        onChange={onChange}
        placeholder="e.g. 1"
      />

      <hr className="border-gray-100" />

      {/* 4. Price - ประยุกต์ UI เดิมแต่ครอบกรอบแดงเมื่อมี Error */}
      <div>
        <label className="block text-base font-bold text-black mb-3">
          Price *
        </label>
        <div
          className={`flex items-center border ${
            errors.price
              ? "border-red-500 focus-within:ring-red-500 bg-red-50"
              : "border-gray-400 focus-within:border-black focus-within:ring-1 focus-within:ring-black"
          }`}
        >
          <span className="pl-4 pr-3 py-3 font-semibold text-black">฿</span>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={onChange}
            placeholder="0.00"
            step="0.01"
            className="w-full p-3 outline-none bg-transparent placeholder-gray-400 text-gray-800"
          />
        </div>
        {errors.price && (
          <p className="text-red-500 text-sm mt-1">{errors.price}</p>
        )}
      </div>
    </div>
  );
}
