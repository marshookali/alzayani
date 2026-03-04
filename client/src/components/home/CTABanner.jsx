import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const CTABanner = () => (
  <section
    className="relative section-padding overflow-hidden"
    style={{
      background: 'linear-gradient(135deg, #0D1B2A 0%, #1A2E44 50%, #0D1B2A 100%)',
    }}
  >
    {/* Decorative */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#C9A84C]/10 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#C9A84C]/5 blur-3xl" />
    </div>

    <div className="container-custom relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto"
      >
        <span className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase mb-4 block">
          Ready to Ride?
        </span>
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Reserve Your{' '}
          <span className="text-gold-gradient">Dream Car</span>{' '}
          Today
        </h2>
        <p className="text-white/70 text-lg mb-8 leading-relaxed">
          Join thousands of satisfied customers who trust McGrow Al Zayani for their premium car rental needs across Bahrain.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/fleet"
            className="btn-sweep inline-flex items-center gap-2 px-8 py-4 bg-[#C9A84C] text-[#0D1B2A] font-bold rounded-xl hover:bg-[#E8C97A] transition-all duration-300 hover:scale-105 text-base"
          >
            Browse Our Fleet <ArrowRight size={18} />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-300 text-base"
          >
            Contact Us
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CTABanner;
