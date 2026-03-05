import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Users, Fuel, Settings, Briefcase, ArrowRight, Heart } from 'lucide-react';
import { useState } from 'react';

const VehicleCard = ({ vehicle }) => {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="card group"
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
        <Link to={`/vehicle/${vehicle.id}`}>
          <img
            src={vehicle.images[0]}
            alt={vehicle.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
        </Link>
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-350" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#0A1628]/85 backdrop-blur-sm text-white">
            {vehicle.type}
          </span>
          {(vehicle.fuelType === 'Hybrid' || vehicle.fuelType === 'Electric') && (
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white">Eco</span>
          )}
        </div>

        {/* Wishlist + Rating */}
        <div className="absolute top-3 right-3 flex flex-col items-end gap-2">
          <button
            onClick={(e) => { e.preventDefault(); setWishlisted(!wishlisted); }}
            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-all ${wishlisted ? 'bg-red-500 text-white shadow-md' : 'bg-white/85 text-gray-400 hover:text-red-500'
              }`}
          >
            <Heart size={13} className={wishlisted ? 'fill-current' : ''} />
          </button>
          <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm">
            <Star size={11} className="text-[#C9A84C] fill-[#C9A84C]" />
            <span className="text-xs font-bold text-gray-800">{vehicle.rating}</span>
            <span className="text-xs text-gray-400">({vehicle.reviews})</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <Link to={`/vehicle/${vehicle.id}`}>
          <h3 className="font-bold text-gray-900 text-lg truncate mb-3 hover:text-[#C9A84C] transition-colors" style={{ fontFamily: 'Playfair Display, serif' }}>
            {vehicle.name}
          </h3>
        </Link>

        <div className="grid grid-cols-2 gap-1.5 text-xs text-gray-400 mb-4">
          <span className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1.5 rounded-lg">
            <Users size={11} className="text-gray-400" />{vehicle.seats} Pass.
          </span>
          <span className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1.5 rounded-lg">
            <Briefcase size={11} className="text-gray-400" />{vehicle.luggage} Bags
          </span>
          <span className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1.5 rounded-lg">
            <Settings size={11} className="text-gray-400" />{vehicle.transmission}
          </span>
          <span className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1.5 rounded-lg">
            <Fuel size={11} className="text-gray-400" />{vehicle.fuelType}
          </span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <span className="text-2xl font-bold text-[#0A1628]">${vehicle.dailyRate}</span>
            <span className="text-gray-400 text-xs ml-1">/day</span>
          </div>
          <Link
            to={`/vehicle/${vehicle.id}`}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-[#0A1628] text-white text-xs font-bold rounded-xl hover:bg-[#C9A84C] hover:text-[#0A1628] transition-all duration-300"
          >
            Book Now <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default VehicleCard;
