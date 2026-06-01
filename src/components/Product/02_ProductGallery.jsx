import { useState } from "react";
import product1 from "../../assets/images/cyber-necklace-01.png";

const ProductGallery = ({ images = [product1] }) => {
  const mainImage = images?.[0] || product1;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="w-full">
      <div className="overflow-hidden border border-[#6b648b] bg-white">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="block aspect-[4/4.8] w-full bg-white sm:aspect-[4/5]"
          aria-label="View larger product image"
        >
          <img
            src={mainImage}
            alt="Product"
            className="h-full w-full object-cover"
          />
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/70 px-4 py-8"
          onClick={() => setIsOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="fixed right-6 top-6 z-10 rounded-full bg-white px-3 py-1 text-xl font-bold text-[#393276] shadow"
            aria-label="Close larger product image"
          >
            ×
          </button>

          <div className="mx-auto flex w-full justify-center">
            <img
              src={mainImage}
              alt="Product enlarged"
              className="w-full max-w-5xl rounded-lg bg-white object-contain shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductGallery;
