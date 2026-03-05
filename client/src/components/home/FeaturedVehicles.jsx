import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Users, Fuel, Settings, ArrowRight } from 'lucide-react';
import { mockVehicles } from '../../data/mockData';

gsap.registerPlugin(ScrollTrigger);

const VehicleCard = ({ vehicle }) => (
  <Link to={`/vehicle/${vehicle.id}`} className="block group cursor-pointer">
    <div className="card h-full">
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
        <img
          src={vehicle.images[0]}
          alt={vehicle.name}
          className="w-full h-full object-cover transform group-hover:scale-107 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        {/* Type badge */}
        <div className="absolute top-3.5 left-3.5">
          <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-[#0A1628]/85 backdrop-blur-sm text-white tracking-wide">
            {vehicle.type}
          </span>
        </div>

        {/* Rating */}
        <div className="absolute top-3.5 right-3.5 flex items-center gap-1 bg-white/92 backdrop-blur px-2.5 py-1.5 rounded-full shadow-sm">
          <Star size={11} className="text-[#C9A84C] fill-[#C9A84C]" />
          <span className="text-xs font-bold text-gray-800">{vehicle.rating}</span>
        </div>

        {/* Arrow reveal on hover */}
        <div className="absolute bottom-3.5 right-3.5 w-9 h-9 bg-[#C9A84C] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-md">
          <ArrowRight size={15} className="text-[#0A1628]" />
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5">
        <h3
          className="font-bold text-gray-900 text-lg mb-3 truncate group-hover:text-[#C9A84C] transition-colors duration-300"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          {vehicle.name}
        </h3>

        {/* Specs row */}
        <div className="flex items-center gap-3.5 text-xs text-gray-400 mb-5">
          <span className="flex items-center gap-1">
            <Users size={12} /> {vehicle.seats}
          </span>
          <span className="w-px h-3 bg-gray-200" />
          <span className="flex items-center gap-1">
            <Settings size={12} /> {vehicle.transmission}
          </span>
          <span className="w-px h-3 bg-gray-200" />
          <span className="flex items-center gap-1">
            <Fuel size={12} /> {vehicle.fuelType}
          </span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-3.5 border-t border-gray-100/80">
          <div>
            <span className="text-2xl font-bold text-[#0A1628]">${vehicle.dailyRate}</span>
            <span className="text-gray-400 text-xs ml-1">/day</span>
          </div>
          <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0A1628] group-hover:bg-[#C9A84C] text-white group-hover:text-[#0A1628] text-xs font-bold rounded-xl transition-all duration-300">
            Book Now <ArrowRight size={13} />
          </span>
        </div>
      </div>
    </div>
  </Link>
);

const FeaturedVehicles = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    gsap.fromTo(
      cards,
      { opacity: 0, y: 48 },
      {
        opacity: 1, y: 0,
        stagger: 0.12,
        duration: 0.75,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
      }
    );
  }, []);

  const featured = mockVehicles.slice(0, 6);

  return (
    <section ref={sectionRef} className="section-padding" style={{ background: 'var(--off-white)' }}>
      <div className="container-custom">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="section-label">Our Fleet</div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A1628] leading-tight">
              Featured Vehicles
            </h2>
            <div className="divider-gold" />
            <p className="text-gray-500 max-w-sm leading-relaxed text-sm">
              Handpicked for quality, comfort, and performance — every car is ready for your journey.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="hidden md:block"
          >
            <Link
              to="/fleet"
              className="inline-flex items-center gap-2 px-6 py-3.5 border-2 border-[#0A1628] text-[#0A1628] font-semibold rounded-xl hover:bg-[#0A1628] hover:text-white transition-all duration-300 group text-sm"
            >
              View All Vehicles
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
          {featured.map((vehicle, index) => (
            <div
              key={vehicle.id}
              ref={(el) => (cardsRef.current[index] = el)}
              style={{ opacity: 0 }}
            >
              <VehicleCard vehicle={vehicle} />
            </div>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="text-center mt-10 md:hidden">
          <Link to="/fleet" className="btn-primary inline-flex">
            View All Vehicles <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVehicles;
