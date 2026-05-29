import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Market = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ดึงค่า URL จาก Vite Env
  const serverBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:7777";
  const apiBaseUrl = `${serverBaseUrl}/api`;
  const getImg = (images) =>
    images?.[0] ??
    "https://res.cloudinary.com/duc5gow6f/image/upload/v1779948614/frieren-01_jbkbxq.png";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/products`);
        const data = await response.json();
        if (data.success) {
          setProducts(data.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [apiBaseUrl]);

  const limitedProduct = products.find(
    (p) => p._id === "6a1685fc96d193295d2a496a",
  );
  const droppedProduct = products.find(
    (p) => p._id === "6a17c381d7b9296b299277da",
  );
  const newArtistProduct = products.find(
    (p) => p._id === "6a17d6fa366cc8cf0470d4d9",
  );
  const trendingProduct = products.find(
    (p) => p._id === "6a17c675e44f15d5e0a44c43",
  );

  if (loading)
    return (
      <section className="relative w-full bg-[#111016] py-20 overflow-hidden font-['Anuphan',sans-serif]">
        <div className="relative max-w-7xl mx-auto px-6 z-10 flex flex-col gap-6">
          {/* Row 1 skeleton */}
          <div className="flex flex-col md:flex-row gap-8 w-full h-87.5">
            <div className="w-full md:w-1/2 h-full rounded-3xl bg-[#1a1a1a] animate-pulse" />
            <div className="md:w-1/2 h-full flex flex-col justify-center gap-4">
              <div className="h-16 w-3/4 rounded-xl bg-[#1a1a1a] animate-pulse" />
              <div className="h-16 w-1/2 rounded-xl bg-[#1a1a1a] animate-pulse" />
            </div>
          </div>

          {/* Row 2 skeleton */}
          <div className="flex flex-col md:flex-row gap-6 w-full mt-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex-1 aspect-square rounded-3xl bg-[#1a1a1a] animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );

  return (
    <section className="relative w-full bg-[#111016] py-20 overflow-hidden font-['Anuphan',sans-serif]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 md:w-200 h-125 md:h-200 bg-purple-600/20 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="relative max-w-7xl mx-auto px-6 z-10 flex flex-col gap-6">
        {/* ==================== Row 1 ==================== */}
        <div className="flex flex-col md:flex-row gap-8 w-full cursor-pointer h-87.5">
          <div className="w-full md:w-1/2 group h-full relative">
            {limitedProduct ? (
              <Link to={`/product/${limitedProduct?.slug}`}>
                <div className="relative overflow-hidden rounded-3xl bg-white h-full shadow-2xl">
                  <div className="absolute top-0 left-0 bg-black text-white text-xl font-bold px-4 py-2 z-30 tracking-widest">
                    LIMITED
                  </div>
                  <img
                    src={getImg(limitedProduct?.images)}
                    alt={limitedProduct?.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 md:p-8 flex flex-col gap-1 z-20">
                    <h3 className="text-2xl md:text-4xl font-bold text-white truncate">
                      {limitedProduct?.name}
                    </h3>
                    <p className="text-sm md:text-lg text-gray-200">
                      by{" "}
                      <span className="font-bold text-white">
                        {limitedProduct?.artist}
                      </span>
                    </p>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="w-full h-full bg-[#1a1a1a] rounded-3xl flex items-center justify-center text-gray-500">
                No Limited Product
              </div>
            )}
          </div>

          <Link
            to="/market"
            className="md:w-1/2 h-full flex flex-col justify-center text-white group relative"
          >
            <h2 className="text-8xl font-bold uppercase">
              <span className="text-[#6D5DD3]">E</span>XPLORING
              <br />
              MARKET
            </h2>
          </Link>
        </div>

        {/* ==================== Row 2 ==================== */}
        <div className="flex flex-col md:flex-row gap-6 w-full mt-6">
          {/* Card 1: Just Dropped  */}
          <div className="md:flex-3 group cursor-pointer relative overflow-hidden rounded-3xl bg-[#1a1a1a] aspect-square shadow-xl">
            {droppedProduct ? (
              <Link to={`/product/${droppedProduct?.slug}`}>
                <div className="absolute top-0 left-0 bg-black text-white text-xl font-bold px-3 py-1.5 z-20 tracking-widest uppercase">
                  Just Dropped
                </div>
                <img
                  src={getImg(droppedProduct?.images)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt={droppedProduct?.name}
                />
                <div className="absolute bottom-0 left-0 w-full bg-white/80 backdrop-blur-md p-5 border-t border-gray-100">
                  <h4 className="text-xl font-bold text-gray-900 leading-tight">
                    {droppedProduct?.name}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    by{" "}
                    <span className="font-bold">{droppedProduct?.artist}</span>
                  </p>
                </div>
              </Link>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                No Drop Data
              </div>
            )}
          </div>

          {/* Card 2: New Artist (Cybernecklace) */}
          <div className="md:flex-3 group cursor-pointer relative overflow-hidden rounded-3xl bg-[#1a1a1a] aspect-square shadow-xl">
            {newArtistProduct ? (
              <Link to={`/product/${newArtistProduct?.slug}`}>
                <div className="absolute top-0 left-0 bg-black text-white text-xl font-bold px-3 py-1.5 z-20 tracking-widest uppercase">
                  New Artist
                </div>
                <img
                  src={getImg(newArtistProduct?.images)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt={newArtistProduct?.name}
                />
                <div className="absolute bottom-0 left-0 w-full bg-white/80 backdrop-blur-md p-5 border-t border-gray-100">
                  <h4 className="text-xl font-bold text-gray-900 leading-tight">
                    {newArtistProduct?.name}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    by{" "}
                    <span className="font-bold">
                      {newArtistProduct?.artist}
                    </span>
                  </p>
                </div>
              </Link>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                No Artist Data
              </div>
            )}
          </div>

          {/* Card 3: Trending (รูปจานใบเดิมคงไว้ ไม่ต้องดึงจาก DB จ้ะ) */}
          <div className="md:flex-4 group cursor-pointer relative overflow-hidden rounded-3xl bg-[#1a1a1a] aspect-square shadow-xl">
            <Link to={`/product/${trendingProduct?.slug}`}>
              <div className="absolute top-0 left-0 bg-black text-white text-xl font-bold px-3 py-1.5 z-20 tracking-widest uppercase">
                Trending
              </div>
              <img
                src={getImg(trendingProduct?.images)}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                alt="Trending Ceramic"
              />
              <div className="absolute bottom-0 left-0 w-full bg-white/80 backdrop-blur-md p-5 flex flex-col border-t border-gray-100">
                <h4 className="text-xl font-bold text-gray-900 leading-tight">
                  {trendingProduct?.name}
                </h4>
                <p className="text-xs text-gray-600 mt-1">
                  by{" "}
                  <span className="font-bold">{trendingProduct?.artist}</span>
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Market;
