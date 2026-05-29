import { Outlet } from "react-router-dom";

import ScrollToTop from "../components/ScrollToTop";

import Navbar from "../components/Home/00_Navbar";
import Footer from "../components/Home/08_Footer";

const MainLayout = () => (
  <>
    <ScrollToTop />
    <Navbar />
    <div className="min-h-screen">
      <Outlet /> {/* ตรงนี้แหละที่ Home หรือหน้าอื่นๆ จะมาเสียบแทน*/}
    </div>
    <Footer />
  </>
);

export default MainLayout;
