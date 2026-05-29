import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import ProductCard from "../components/Market/ProductCard";
import MarketHeader from "../components/Market/MarketHeader";

const Market = () => {
  const [cartCount, setCartCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const [isLoggedIn, setIsLoggedIn] = useState(true); //only for testing
  const [userRole, setUserRole] = useState("user"); //only for testing

  const activeCategory = searchParams.get("category") || "All";
  const categories = ["All", "Visual Art", "Craft & Handmade", "Music & Sound"];

  const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:7777";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${apiBaseUrl}/api/products`);
        const data = await res.json();
        if (data.success) setProducts(data.data);
      } catch (err) {
        console.error("Fetch products failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [apiBaseUrl]);

  const handleCategoryChange = (newCategory) => {
    setSearchParams({ category: newCategory });
  };

  const handleAddToCart = () => {
    setCartCount((prevCount) => prevCount + 1);
  };

  // ── Filter (ทำงานกับข้อมูลจริง) ──
  const filteredProducts = products.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchCategory =
      activeCategory === "All" || product.category === activeCategory;
    return matchSearch && matchCategory;
  });

  // ── Skeleton Cards ──
  const SkeletonCard = () => (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden animate-pulse">
      <div className="w-full aspect-square bg-gray-200" />
      <div className="p-4 flex flex-col gap-3">
        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-5/6" />
        <div className="h-3 bg-gray-200 rounded w-2/3" />
        <div className="mt-2 flex justify-between items-center">
          <div className="h-3 bg-gray-200 rounded w-1/4" />
          <div className="h-5 bg-gray-200 rounded w-1/4" />
        </div>
        <div className="h-9 bg-gray-200 rounded-lg w-full mt-1" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F7FF] py-8 px-4 md:px-12 font-['Anuphan',sans-serif]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <MarketHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isFilterActive={isFilterActive}
          setIsFilterActive={setIsFilterActive}
          activeCategory={activeCategory}
          setActiveCategory={handleCategoryChange}
          categories={categories}
        />

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            // skeleton 8 ช่อง
            Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Link key={product._id} to={`/product/${product.slug}`}>
                <ProductCard
                  product={product}
                  isLoggedIn={isLoggedIn} //only for testing
                  userRole={userRole} //only for testing
                  onAddToCartSuccess={handleAddToCart}
                />
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-white rounded-xl border-2 border-dashed border-gray-200">
              <p className="text-gray-500 text-lg">
                Didn't found what you were looking for
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Market;
