import { useEffect, useRef, useState } from "react";
import product1 from "../../assets/images/cyber-necklace-01.png";

const ProductGallery = ({ images = [product1], audioSrc }) => {
  const mainImage = images?.[0] || product1;
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const modalScrollRef = useRef(null);

  const hasAudio = Boolean(audioSrc);

  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";

      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  const handleImageClick = () => {
    if (hasAudio) return;
    setIsOpen(true);
  };

  const handleToggleAudio = (event) => {
    event.stopPropagation();

    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleModalWheel = (event) => {
    event.stopPropagation();

    if (modalScrollRef.current) {
      modalScrollRef.current.scrollTop += event.deltaY;
    }
  };

  return (
    <section className="w-full">
      <div className="relative overflow-hidden border border-[#6b648b] bg-white">
        <button
          type="button"
          onClick={handleImageClick}
          className={`block aspect-[4/4.8] w-full bg-white sm:aspect-[4/5] ${
            hasAudio ? "cursor-default" : "cursor-pointer"
          }`}
          aria-label={
            hasAudio
              ? "Product image with audio preview"
              : "View larger product image"
          }
        >
          <img
            src={mainImage}
            alt="Product"
            className="h-full w-full object-cover"
          />
        </button>

        {hasAudio && (
          <>
            <button
              type="button"
              onClick={handleToggleAudio}
              className="absolute left-1/2 top-1/2 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl font-bold text-[#393276] shadow-lg transition hover:bg-white"
              aria-label={
                isPlaying ? "Pause audio preview" : "Play audio preview"
              }
            >
              {isPlaying ? "Ⅱ" : "▶"}
            </button>

            <audio
              ref={audioRef}
              src={audioSrc}
              onEnded={() => setIsPlaying(false)}
            />
          </>
        )}
      </div>

      {!hasAudio && isOpen && (
        <div className="fixed inset-0 z-50 bg-black/70">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="fixed right-6 top-6 z-20 rounded-full bg-white px-3 py-1 text-xl font-bold text-[#393276] shadow"
            aria-label="Close larger product image"
          >
            ×
          </button>

          <div
            ref={modalScrollRef}
            className="fixed inset-0 z-10 h-screen overflow-y-auto overscroll-contain px-4 py-8"
            onClick={() => setIsOpen(false)}
            onWheel={handleModalWheel}
          >
            <div className="mx-auto flex w-full justify-center">
              <img
                src={mainImage}
                alt="Product enlarged"
                className="block h-auto w-full max-w-5xl rounded-lg bg-white object-contain shadow-2xl"
                onClick={(event) => event.stopPropagation()}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductGallery;
