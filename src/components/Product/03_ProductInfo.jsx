const defaultDescription = [
  "Description ใช้สำหรับแสดงรายละเอียดสินค้า ข้อมูลทั่วไปของชิ้นงาน และจุดเด่นที่อยากให้ผู้ชมเข้าใจก่อนตัดสินใจซื้อ",
  "สามารถวางเป็นข้อความตัวอย่างไว้ก่อนเพื่อดูการจัดวาง spacing ของ layout และค่อยเปลี่ยนเป็นข้อมูลจริงภายหลังได้",
  "ส่วนนี้ควรเป็นเนื้อหาของสินค้าโดยตรง เช่น วัสดุ ขนาด หรือคอนเซปต์ของงาน",
];

const ProductInfo = ({ product }) => {
  const description = product?.description || defaultDescription;

  return (
    <section className="w-full text-[#2f2b78]">
      <div className="flex flex-col gap-4 md:gap-5">
        <div className="flex flex-col gap-4 border-b-2 border-[#6b648b] pb-4 md:pb-5 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#2f2b78] sm:text-4xl md:text-[2.75rem]">
            {product?.name || "Cybernecklace"}
          </h2>

          <p className="text-base font-medium tracking-[-0.01em] text-[#4b45a3] sm:text-lg lg:text-right">
            {product?.artist || "Starchaser"}
          </p>
        </div>

        <div className="space-y-3 text-[13px] font-normal leading-6 text-[#3e3a55] sm:text-[15px] md:text-base md:leading-7">
          {description.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductInfo;
