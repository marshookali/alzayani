import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Users, Fuel, Settings, Briefcase, ArrowRight, Heart } from 'lucide-react';
import { useState } from 'react';

const VehicleCard = ({ vehicle }) => {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-400 border border-gray-100 group"
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
        <Link to={`/vehicle/${vehicle.id}`}>
          <img
            src={vehicle.images[0]}
            alt={vehicle.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-600"
            loading="lazy"
          />
        </Link>
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#0D1B2A] text-white">
            {vehicle.type}
          </span>
          {vehicle.fuelType === 'Hybrid' || vehicle.fuelType === 'Electric' ? (
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-500 text-white">
              Eco
            </span>
          ) : null}
        </div>

        <div className="absolute top-3 right-3 flex items-center gap-2">
          <button
            onClick={(e) => { e.preventDefault(); setWishlisted(!wishlisted); }}
            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur transition-colors ${wishlisted ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-500 hover:text-red-500'}`}
          >
            <Heart size={14} className={wishlisted ? 'fill-current' : ''} />
          </button>
          <div className="flex items-center gap-1 bg-white/90 backdrop-blur px-2 py-1 rounded-full">
            <Star size={12} className="text-[#C9A84C] fill-[#C9A84C]" />
            <span className="text-xs font-semibold text-gray-800">{vehicle.rating}</span>
            <span className="text-xs text-gray-500">({vehicle.reviews})</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <Link to={`/vehicle/${vehicle.id}`}>
          <h3 className="font-bold text-gray-900 text-lg truncate mb-2 hover:text-[#C9A84C] transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
            {vehicle.name}
          </h3>
        </Link>

        <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-4">
          <span className="flex items-center gap-1.5">
            <Users size={13} className="text-gray-400" />{vehicle.seats} Passengers
          </span>
          <span className="flex items-center gap-1.5">
            <Briefcase size={13} className="text-gray-400" />{vehicle.luggage} Bags
          </span>
          <span className="flex items-center gap-1.5">
            <Settings size={13} className="text-gray-400" />{vehicle.transmission}
          </span>
          <span className="flex items-center gap-1.5">
            <Fuel size={13} className="text-gray-400" />{vehicle.fuelType}
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <div>
            <span className="text-2xl font-bold text-[#0D1B2A]">${vehicle.dailyRate}</span>
            <span className="text-gray-400 text-xs">/day</span>
          </div>
          <Link
            to={`/vehicle/${vehicle.id}`}
            className="btn-sweep flex items-center gap-1.5 px-5 py-2.5 bg-[#0D1B2A] text-white text-sm font-semibold rounded-xl hover:bg-[#C9A84C] hover:text-[#0D1B2A] transition-all duration-300"
          >
            Book Now <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default VehicleCard;
