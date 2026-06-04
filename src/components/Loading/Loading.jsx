import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import HeartLogo from "../../assets/icons/heart.svg?react";

export default function Loading({ onComplete }) {
  const containerRef = useRef(null);
  const heartRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ✨ 1. อนิเมชั่นกระพริบ (ลดความสว่าง + ย่อขนาดลงนิดนึงให้ดูมีมิติ)
      gsap.to(heartRef.current, {
        opacity: 0.3, // จางลงเหลือ 30%
        duration: 0.8, // จังหวะการกระพริบ (0.8 วินาทีต่อรอบ)
        repeat: -1, // วนลูปไม่สิ้นสุด
        yoyo: true, // ให้เด้งกลับไปกลับมา (สว่าง -> จาง -> สว่าง)
        ease: "power1.inOut",
      });

      // ⏱️ 2. จำลองเวลาโหลด (สมมติให้โชว์หน้าโหลด 2.5 วินาที แล้วค่อยเฟดออก)
      // หมายเหตุ: ถ้าในอนาคตคุณดึง API จริง สามารถลบ setTimeout ออก
      // แล้วเรียกคำสั่งเฟดเอาท์นี้เมื่อ API โหลดเสร็จได้เลยครับ
      const loadTimer = setTimeout(() => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: "power2.out",
          onComplete: () => {
            if (onComplete) onComplete(); // ส่งสัญญาณเปิดหน้า Home
          },
        });
      }, 2500);

      return () => clearTimeout(loadTimer); // ล้างเวลาเมื่อ component โดนทำลาย
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      // พื้นหลังสีเข้ม (สีเดียวกับแบบเดิม) จัดให้อยู่ตรงกลางจอ
      className="fixed inset-0 w-screen h-screen bg-black flex justify-center items-center z-[99999]"
    >
      <div
        ref={heartRef}
        // กำหนดขนาดไอคอน และตั้งค่าสีของหัวใจ (ตัวอย่างใช้สีม่วง #5b21b6)
        className="w-[120px] h-[120px] text-[#5b21b6] flex justify-center items-center"
      >
        <HeartLogo className="w-full h-full fill-current" />
      </div>
    </div>
  );
}
