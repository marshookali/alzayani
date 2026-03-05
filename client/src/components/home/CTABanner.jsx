import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Car } from 'lucide-react';

const CTABanner = () => (
  <section className="relative overflow-hidden py-28 md:py-36">
    {/* Background */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#112240] to-[#0A1628]" />

    {/* Decorative elements */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] rounded-full bg-[#C9A84C]/6 blur-[80px]" />
      <div className="absolute -bottom-40 right-1/4 w-[500px] h-[500px] rounded-full bg-[#1B3460]/50 blur-[80px]" />
      {/* Grid pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid-cta" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-cta)" />
      </svg>
    </div>

    <div className="container-custom relative z-10 flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.85 }}
        className="max-w-3xl mx-auto"
      >
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-[#C9A84C]/15 border border-[#C9A84C]/25 mb-7 animate-float">
          <Car size={28} className="text-[#C9A84C]" />
        </div>

        <div className="section-label mx-auto mb-5">Ready to Ride?</div>

        <h2
          className="text-4xl md:text-6xl font-bold text-white mb-5 leading-[1.1] tracking-tight"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Reserve Your{' '}
          <span className="text-gold-gradient">Dream Car</span>{' '}
          Today
        </h2>

        <p className="text-white/60 text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
          Join thousands of satisfied customers who trust McGrow Al Zayani for their premium car rental needs across the Kingdom of Bahrain.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/fleet" className="btn-primary text-base px-9 py-4 text-[0.9rem]">
            Browse Our Fleet <ArrowRight size={18} />
          </Link>
          <Link to="/contact" className="btn-outline text-base px-9 py-4 text-[0.9rem]">
            Contact Us
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-8 border-t border-white/8">
          {[
            { value: '500+', label: 'Vehicles' },
            { value: '50K+', label: 'Customers' },
            { value: '22+', label: 'Years' },
            { value: '12', label: 'Locations' },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <p className="text-2xl font-bold text-gold-gradient">{item.value}</p>
              <p className="text-gray-500 text-xs mt-0.5">{item.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default CTABanner;
