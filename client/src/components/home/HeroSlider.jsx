import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { heroSlides } from '../../data/mockData';

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef(null);
  const progressRef = useRef(null);
  const INTERVAL = 5500;

  const resetProgress = useCallback(() => {
    if (progressRef.current) {
      progressRef.current.style.transition = 'none';
      progressRef.current.style.width = '0%';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (progressRef.current) {
            progressRef.current.style.transition = `width ${INTERVAL}ms linear`;
            progressRef.current.style.width = '100%';
          }
        });
      });
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
      if (progressRef.current) progressRef.current.style.transition = 'none';
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, next, resetProgress]);

  const slide = heroSlides[current];

  return (
    <section
      className="relative w-full h-screen min-h-[700px] overflow-hidden"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Background */}
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1.0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <img src={slide.image} alt={slide.headline} className="w-full h-full object-cover" loading="eager" />
          {/* Multi-layer overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/92 via-[#0A1628]/55 to-[#0A1628]/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/75 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/20 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Decorative vertical line */}
      <div className="absolute left-[92%] top-1/4 bottom-1/4 w-px bg-white/10 hidden xl:block" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container-custom w-full pt-24 pb-36">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              className="max-w-2xl space-y-7"
            >
              {/* Label */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.65, delay: 0.05 }}
              >
                <span className="section-label">Premium Car Rental · Bahrain</span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.75, delay: 0.18 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight"
              >
                {slide.headline}
              </motion.h1>

              {/* Divider */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="divider-gold"
                style={{ transformOrigin: 'left' }}
              />

              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.7, delay: 0.38 }}
                className="text-lg md:text-xl text-white/75 leading-relaxed max-w-lg font-light"
              >
                {slide.subtext}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.7, delay: 0.52 }}
                className="flex flex-wrap gap-4 pt-2"
              >
                <Link to={slide.ctaLink} className="btn-primary text-base px-8 py-4">
                  {slide.ctaText}
                  <ChevronRight size={18} />
                </Link>
                <Link to="/contact" className="btn-outline text-base px-8 py-4">
                  Contact Us
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide Counter — right side */}
      <div className="absolute top-1/2 right-8 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center gap-3">
        <span className="text-white font-bold text-2xl tracking-wide">{String(current + 1).padStart(2, '0')}</span>
        <div className="w-px h-14 bg-gradient-to-b from-white/40 to-transparent" />
        <span className="text-white/35 text-sm">{String(heroSlides.length).padStart(2, '0')}</span>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-10 left-0 right-0 z-20">
        <div className="container-custom flex items-center justify-between">
          {/* Dot indicators */}
          <div className="flex items-center gap-2.5">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className={`transition-all duration-400 rounded-full ${idx === current
                    ? 'w-10 h-2.5 bg-[#C9A84C] shadow-[0_0_12px_rgba(201,168,76,0.6)]'
                    : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/55'
                  }`}
              />
            ))}
          </div>

          {/* Play/Prev/Next */}
          <div className="flex items-center gap-2">
            {[prev, () => setIsPlaying(!isPlaying), next].map((fn, i) => {
              const icons = [
                <ChevronLeft size={16} />,
                isPlaying ? <Pause size={14} /> : <Play size={14} />,
                <ChevronRight size={16} />
              ];
              return (
                <button
                  key={i}
                  onClick={fn}
                  className="w-9 h-9 rounded-full glass flex items-center justify-center text-white hover:border-[#C9A84C]/60 hover:text-[#C9A84C] transition-all duration-300"
                >
                  {icons[i]}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/8 z-20">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-[#C9A84C] to-[#E8C97A]"
          style={{ width: '0%' }}
        />
      </div>
    </section>
  );
};

export default HeroSlider;
