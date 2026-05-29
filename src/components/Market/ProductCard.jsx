import { useState } from "react";

const ProductCard = ({ product, isLoggedIn, userRole, onAddToCartSuccess }) => {
  const [toast, setToast] = useState(null); // null | "success" | "error"
  const [adding, setAdding] = useState(false);

  // แก้จาก VITE_API_URL
  const serverBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:7777";
  const apiBaseUrl = `${serverBaseUrl}/api`;

  const productImgSrc =
    product.images?.[0] ??
    "https://res.cloudinary.com/duc5gow6f/image/upload/v1779948614/frieren-01_jbkbxq.png";
  const showToast = (type) => {
    setToast(type);
    setTimeout(() => setToast(null), 2500);
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();

    // 🛡️ [ด่านเช็คความปลอดภัยที่ 1]: ถ้ายังไม่ได้ล็อกอิน ให้ดีดออกทันทีจ้า
    if (!isLoggedIn) {
      alert("กรุณาเข้าสู่ระบบก่อนเลือกซื้อสินค้าค่ะ");
      return; // สั่ง return ทันทีเพื่อเบรกสคริปต์ด้านล่างไม่ให้รันต่อ
    }

    // 🛡️ [ด่านเช็คความปลอดภัยที่ 2]: ล็อกอินแล้ว แต่ยศไม่ใช่ "user" (เช่นเป็นแอดมิน) ก็ซื้อไม่ได้จ้า
    if (userRole !== "user") {
      alert(
        "ขออภัยด้วยนะคะ บัญชีประเภทผู้ดูแลระบบ (Admin) ไม่สามารถเพิ่มสินค้าลงตะกร้าได้ค่ะ ✗",
      );
      return;
    }

    // เมื่อผ่านด่านตรวจความปลอดภัยครบถ้วนแล้ว โค้ดส่งข้อมูลไปหลังบ้านตัวเดิมของเธอถึงจะเริ่มรันจ้า
    setAdding(true);
    try {
      const res = await fetch(`${apiBaseUrl}/cart/add`, {
        // 1. แก้ไข Path ให้วิ่งไปรูท /add ตามสเปคหลังบ้าน
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "mock-user-id-123456", // 2. จำลองค่า userId รอไว้ก่อน (ในอนาคตจะดึงมาจากตัวแปร user ล็อกอินจริงจ้า)
          productId: product._id, // 3. เปลี่ยนจาก slug มาส่ง _id ของสินค้าจาก MongoDB ไปให้ตามที่หลังบ้านรอรับ
          quantity: 1, // 4. ส่งจำนวนชิ้นไปให้ตรงเป๊ะ
        }),
      });
      if (!res.ok) throw new Error();
      showToast("success");

      if (onAddToCartSuccess) {
        onAddToCartSuccess();
      }
    } catch {
      showToast("error");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="relative bg-white border border-gray-300 flex flex-col group cursor-pointer hover:shadow-lg transition-shadow rounded-xl overflow-hidden">
      {/* Toast */}
      {toast && (
        <div
          className={`absolute top-3 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full text-white text-xs font-semibold shadow-lg transition-all ${
            toast === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {toast === "success" ? `✓ Added to cart!` : "✗ Failed, try again"}
        </div>
      )}

      {/* Image */}
      <div className="w-full aspect-square overflow-hidden border-b border-gray-300">
        <img
          src={productImgSrc}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col grow gap-2">
        <h2 className="text-lg font-bold text-[#373373] text-center mb-1 truncate">
          {product.name}
        </h2>
        <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed min-h-[3.3rem]">
          {product.description?.[0] || "ไม่มีคำอธิบายสินค้า"}
        </p>

        <div className="mt-auto pt-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-gray-400 font-medium">
                Artist
              </span>
              <span className="text-xs font-bold text-gray-700">
                by {product.artist}
              </span>
            </div>
            <span className="text-xl font-extrabold text-[#373373]">
              ฿{product.price?.toLocaleString()}
            </span>
          </div>

          <div className="flex flex-wrap gap-1">
            {product.tags?.map((tag, index) => (
              <span
                key={index}
                className="bg-purple-50 text-purple-600 text-[10px] px-2 py-0.5 rounded-full font-semibold border border-purple-100"
              >
                {tag}
              </span>
            ))}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={adding}
            className="w-full bg-[#6D5DD3] hover:bg-[#5b4db8] disabled:opacity-60 text-white py-2.5 rounded-lg font-medium transition-colors duration-300 shadow-sm hover:cursor-pointer text-sm mt-1"
          >
            {adding ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
