import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

const ImageGallery = ({ images = [], vehicleName = '' }) => {
  const [mainIdx, setMainIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  const openLightbox = (idx) => {
    setLightboxIdx(idx);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const lightboxPrev = (e) => {
    e.stopPropagation();
    setLightboxIdx((i) => (i - 1 + images.length) % images.length);
  };

  const lightboxNext = (e) => {
    e.stopPropagation();
    setLightboxIdx((i) => (i + 1) % images.length);
  };

  return (
    <div className="space-y-3">
      {/* Main Image */}
      <div
        className="relative overflow-hidden rounded-2xl cursor-zoom-in group"
        style={{ aspectRatio: '16/10' }}
        onClick={() => openLightbox(mainIdx)}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={mainIdx}
            src={images[mainIdx]}
            alt={`${vehicleName} - view ${mainIdx + 1}`}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Zoom overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white">
            <ZoomIn size={22} />
          </div>
        </div>

        {/* Image counter */}
        <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
          {mainIdx + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-2">
        {images.slice(0, 4).map((img, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.04 }}
            onClick={() => setMainIdx(i)}
            className={`relative overflow-hidden rounded-xl cursor-pointer ${i === mainIdx ? 'ring-2 ring-[#C9A84C] ring-offset-2' : ''
              }`}
            style={{ aspectRatio: '4/3' }}
          >
            <img
              src={img}
              alt={`thumbnail ${i + 1}`}
              className={`w-full h-full object-cover transition-all duration-300 ${i === mainIdx ? 'brightness-100' : 'brightness-75 hover:brightness-100'
                }`}
            />
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-overlay"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white z-10"
            >
              <X size={20} />
            </button>

            <button
              onClick={lightboxPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white z-10"
            >
              <ChevronLeft size={24} />
            </button>

            <motion.div
              className="relative max-w-5xl max-h-[85vh] mx-auto px-16"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={lightboxIdx}
                  src={images[lightboxIdx]}
                  alt={`${vehicleName} lightbox ${lightboxIdx + 1}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-contain rounded-xl max-h-[85vh]"
                />
              </AnimatePresence>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-sm px-4 py-1.5 rounded-full">
                {lightboxIdx + 1} / {images.length}
              </div>
            </motion.div>

            <button
              onClick={lightboxNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white z-10"
            >
              <ChevronRight size={24} />
            </button>

            {/* Dot Nav */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setLightboxIdx(i); }}
                  className={`w-2 h-2 rounded-full transition-all ${i === lightboxIdx ? 'bg-white w-6' : 'bg-white/40'}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageGallery;
