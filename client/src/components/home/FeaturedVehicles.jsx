import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Users, Fuel, Settings, ArrowRight } from 'lucide-react';
import { mockVehicles } from '../../data/mockData';

gsap.registerPlugin(ScrollTrigger);

const VehicleCard = ({ vehicle, index }) => (
  <Link to={`/vehicle/${vehicle.id}`} className="block group cursor-pointer">
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-400 hover:-translate-y-2 border border-gray-100">
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
        <img
          src={vehicle.images[0]}
          alt={vehicle.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#0D1B2A] text-white">
            {vehicle.type}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur px-2 py-1 rounded-full">
          <Star size={12} className="text-[#C9A84C] fill-[#C9A84C]" />
          <span className="text-xs font-semibold text-gray-800">{vehicle.rating}</span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-bold text-gray-900 text-lg truncate mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
          {vehicle.name}
        </h3>

        <div className="flex items-center gap-5 text-xs text-gray-500 mb-5">
          <span className="flex items-center gap-1"><Users size={12} />{vehicle.seats} Seats</span>
          <span className="flex items-center gap-1"><Settings size={12} />{vehicle.transmission}</span>
          <span className="flex items-center gap-1"><Fuel size={12} />{vehicle.fuelType}</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-[#0D1B2A]">${vehicle.dailyRate}</span>
            <span className="text-gray-400 text-sm">/day</span>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="btn-sweep px-4 py-2 bg-[#0D1B2A] text-white text-sm font-semibold rounded-xl hover:bg-[#1A2E44] transition-colors flex items-center gap-1.5"
          >
            Book Now <ArrowRight size={14} />
          </motion.div>
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
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  const featured = mockVehicles.slice(0, 4);

  return (
    <section ref={sectionRef} className="section-padding bg-[#F5F5F0]">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase mb-2 block">
              Our Fleet
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0D1B2A]">
              Featured Vehicles
            </h2>
            <p className="text-gray-500 mt-3 max-w-md">
              Handpicked for quality, comfort, and performance. Find the perfect car for your journey.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="hidden md:block"
          >
            <Link
              to="/fleet"
              className="flex items-center gap-2 text-[#0D1B2A] font-semibold hover:text-[#C9A84C] transition-colors group"
            >
              View All Vehicles
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {featured.map((vehicle, index) => (
            <div
              key={vehicle.id}
              ref={(el) => (cardsRef.current[index] = el)}
              style={{ opacity: 0 }}
            >
              <VehicleCard vehicle={vehicle} index={index} />
            </div>
          ))}
        </div>

        <div className="text-center mt-10 md:hidden">
          <Link to="/fleet" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0D1B2A] text-white font-semibold rounded-xl hover:bg-[#1A2E44] transition-colors">
            View All Vehicles <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVehicles;
