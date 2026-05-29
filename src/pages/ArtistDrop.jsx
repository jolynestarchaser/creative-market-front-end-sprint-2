import React, { useState } from "react";
// import Navbar from "../components/Home/00_Navbar";
// import Footer from "../components/Home/08_Footer";
import UploadFiles from "../components/Artistdrop/01_UploadFiles";
import ItemNames from "../components/Artistdrop/02_ItemNames";
import SuccessModal from "../components/Global/SuccessModal";

const ArtistDrop = () => {
  // 1. สร้าง State รวมสำหรับข้อมูลทั้งหมด
  const [formData, setFormData] = useState({
    file: null,
    itemName: "",
    description: "",
    category: "",
    quantity: 1,
    price: "",
  });

  // 2. สร้าง State สำหรับเก็บข้อความ Error
  const [errors, setErrors] = useState({});
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  // ฟังก์ชันจัดการเมื่อพิมพ์ข้อมูล
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // ถ้ามีการพิมพ์แก้ ให้ลบ Error ของช่องนั้นออก
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // ฟังก์ชันจัดการเมื่ออัปโหลดไฟล์
  const handleFileChange = (file) => {
    setFormData((prev) => ({ ...prev, file }));
    if (errors.file) {
      setErrors((prev) => ({ ...prev, file: "" }));
    }
  };

  // 3. ฟังก์ชันตรวจสอบความถูกต้อง (Validate)
  const validateForm = () => {
    const newErrors = {};

    if (!formData.file) newErrors.file = "Please upload your art file.";
    if (!formData.itemName.trim())
      newErrors.itemName = "Item Name is required.";
    // [เพิ่มใหม่] เช็ค Description
    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    }

    // [เพิ่มใหม่] เช็ค Category
    if (!formData.category) {
      newErrors.category = "Please select a category.";
    }
    if (!formData.price) {
      newErrors.price = "Price is required.";
    } else if (Number(formData.price) <= 0) {
      newErrors.price = "Price must be greater than 0.";
    }
    // สามารถเพิ่มเงื่อนไขอื่นๆ ได้ เช่น description ต้องไม่เกินกี่ตัวอักษร

    setErrors(newErrors);

    // ถ้าไม่มี error เลย (Object ว่าง) จะ return true
    return Object.keys(newErrors).length === 0;
  };

  // 4. ฟังก์ชัน Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form is valid! Ready to submit:", formData);
      // ตรงนี้ในอนาคตคือส่งข้อมูลไป Backend

      // [แก้ไข] เมื่อ Validate ผ่าน ให้เปิด Pop-up
      setIsSuccessOpen(true);
    } else {
      console.log("Validation Failed:", errors);
    }
  };

  return (
    <main className="flex-col max-w-4xl mx-auto px-5 md:px-8 relative">
      {/* ส่วน Header */}
      <div className="mb-12 mt-12">
        <h1 className="text-5xl font-bold text-black font-['Anuphan',sans-serif]">
          Create New Item
        </h1>
        <p className="text-base text-gray-500 font-['Anuphan',sans-serif]">
          Drop your new art to your collection.
        </p>
      </div>

      <p className="text-base font-bold font-['Anuphan',sans-serif] mb-4">
        Upload File *
      </p>

      {/* 1. เรียกใช้ UploadFiles พร้อมส่ง Props */}
      <UploadFiles
        selectedFile={formData.file}
        onFileChange={handleFileChange}
        error={errors.file}
      />

      <div className="space-y-8 mt-8"></div>

      {/* 2. เรียกใช้ ItemNames พร้อมส่ง Props */}
      <ItemNames
        formData={formData}
        onChange={handleInputChange}
        errors={errors}
      />

      <div className="space-y-8 mt-8"></div>

      {/* ส่วนปุ่ม Submit */}
      <div className="flex pt-4 pb-4 pl-10 content-end justify-end">
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-black text-white px-10 py-4 text-sm font-bold tracking-widest hover:bg-gray-800 transition-colors"
        >
          CREATE ITEM
        </button>
      </div>
      <div className="space-y-8 mt-8"></div>

      {/* ---------------------------------------------------- */}
      {/* 3. เรียกใช้ SuccessModal ตรงนี้ */}
      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)} // สั่งปิดเมื่อกดปุ่ม CLOSE
        title="Item Created!"
        message="Your new art has been successfully added to your collection."
        buttonText="GO TO MY COLLECTION"
      />
      {/* ---------------------------------------------------- */}
    </main>
  );
};

export default ArtistDrop;
