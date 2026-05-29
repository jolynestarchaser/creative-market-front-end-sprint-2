import ProductHeaderBar from "../components/Product/01_ProductHeaderBar";
import ProductGallery from "../components/Product/02_ProductGallery";
import ProductInfo from "../components/Product/03_ProductInfo";
import ArtistInfo from "../components/Product/04_ArtistInfo";
import ProductPurchasePanel from "../components/Product/05_ProductPurchasePanel";
import ProductShowcase from "../components/Product/06_ProductShowcase";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import { productSamples } from "../data/productSamples"; ไม่ใช้ข้อมูลจาก mock data แล้ว

const Product = () => {
  const navigate = useNavigate();
  const { productSlug } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:7777/api/products/${productSlug}`,
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Failed to fetch product");
        }

        setProduct(result.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (productSlug) {
      fetchProduct();
    }
  }, [productSlug]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#eeecfb]">
        <p className="text-lg font-semibold text-[#2f2b78]">
          Loading product...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#eeecfb]">
        <p className="text-lg font-semibold text-red-500">{error}</p>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#eeecfb]">
        <p className="text-lg font-semibold text-[#2f2b78]">
          Product not found
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-[#eeecfb]">
      <ProductHeaderBar category={product.category} />

      <section className="mx-auto flex max-w-7xl flex-col gap-6 px-4 pb-10 sm:px-6 md:gap-8 md:px-8 md:pb-12">
        <div className="grid grid-cols-1 gap-5 md:gap-6 lg:grid-cols-[1.02fr_1fr] lg:items-start">
          <div className="w-full">
            <ProductGallery images={product.images} />
          </div>

          <div className="flex w-full flex-col gap-6 md:gap-8">
            <ProductInfo product={product} />
            <ArtistInfo paragraphs={product.fromArtist} />
            <ProductPurchasePanel product={product} />
          </div>
        </div>

        <ProductShowcase image={product.images[0]} />
      </section>
    </main>
  );
};

export default Product;
