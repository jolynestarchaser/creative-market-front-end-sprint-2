import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // สั่งให้หน้าต่างเบราว์เซอร์เลื่อนกลับไปที่จุด (x: 0, y: 0) แบบทันที
    window.scrollTo(0, 0);
  }, [pathname]); // จะทำงานทุกครั้งที่ pathname (เส้นทาง URL) เปลี่ยนแปลงจ้ะ

  return null; // คอมโพเนนต์นี้ไม่ต้องแสดงผลอะไรบนหน้าจอจ้ะ
};

export default ScrollToTop;
