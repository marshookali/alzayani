import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { heroSlides } from '../../data/mockData';

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const progressRef = useRef(null);
  const INTERVAL = 5000;

  const resetProgress = useCallback(() => {
    setProgress(0);
    if (progressRef.current) {
      progressRef.current.style.transition = 'none';
      progressRef.current.style.width = '0%';
      setTimeout(() => {
        if (progressRef.current) {
          progressRef.current.style.transition = `width ${INTERVAL}ms linear`;
          progressRef.current.style.width = '100%';
        }
      }, 20);
    }
  }, []);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % heroSlides.length);
    resetProgress();
  }, [resetProgress]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    resetProgress();
  }, [resetProgress]);

  const goTo = useCallback((idx) => {
    setCurrent(idx);
    resetProgress();
  }, [resetProgress]);

  useEffect(() => {
    if (isPlaying) {
      resetProgress();
      intervalRef.current = setInterval(next, INTERVAL);
    } else {
      clearInterval(intervalRef.current);
      if (progressRef.current) {
        progressRef.current.style.transition = 'none';
      }
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, next, resetProgress]);

  const slide = heroSlides[current];

  return (
    <section
      className="relative w-full h-screen min-h-[760px] overflow-hidden"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Background Images */}
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1.0 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.headline}
            className="w-full h-full object-cover"
            loading="eager"
          />
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B2A]/85 via-[#0D1B2A]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/60 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container-custom w-full pt-20 pb-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              className="max-w-xl space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase text-[#C9A84C] border border-[#C9A84C]/40 bg-[#C9A84C]/10">
                  Premium Car Rental · Bahrain
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {slide.headline}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="text-xl text-white/80 leading-relaxed max-w-lg"
              >
                {slide.subtext}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7, delay: 0.55 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  to={slide.ctaLink}
                  className="btn-sweep inline-flex items-center gap-2 px-8 py-4 bg-[#C9A84C] text-[#0D1B2A] font-bold rounded-xl hover:bg-[#E8C97A] transition-all duration-300 hover:scale-105 hover:shadow-xl text-base"
                >
                  {slide.ctaText}
                  <ChevronRight size={18} />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:border-white hover:bg-white/10 transition-all duration-300 text-base"
                >
                  Contact Us
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Dot Indicators + Controls */}
      <div className="absolute bottom-10 left-0 right-0 z-20">
        <div className="container-custom flex items-center justify-between">
          <div className="flex items-center gap-3">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className={`transition-all duration-300 rounded-full ${idx === current
                  ? 'w-8 h-3 bg-[#C9A84C]'
                  : 'w-3 h-3 bg-white/40 hover:bg-white/60'
                  }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-white/20 text-white hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-300 flex items-center justify-center bg-black/20"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-full border border-white/20 text-white hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-300 flex items-center justify-center bg-black/20"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-white/20 text-white hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-300 flex items-center justify-center bg-black/20"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
        <div
          ref={progressRef}
          className="h-full bg-[#C9A84C]"
          style={{ width: '0%', transition: `width ${INTERVAL}ms linear` }}
        />
      </div>

      {/* Slide Counter */}
      <div className="absolute top-1/2 right-8 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center gap-2">
        <span className="text-white font-bold text-2xl">{String(current + 1).padStart(2, '0')}</span>
        <div className="w-px h-12 bg-white/30" />
        <span className="text-white/50 text-sm">{String(heroSlides.length).padStart(2, '0')}</span>
      </div>
    </section>
  );
};

export default HeroSlider;
