import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Share2, ArrowLeft } from 'lucide-react';
import { mockVehicles } from '../data/mockData';
import ImageGallery from '../components/vehicle/ImageGallery';
import VehicleSpecs from '../components/vehicle/VehicleSpecs';
import BookingForm from '../components/vehicle/BookingForm';
import VehicleCard from '../components/fleet/VehicleCard';

const VehicleDetail = () => {
  const { id } = useParams();
  const vehicle = mockVehicles.find((v) => v.id === id);
  const related = mockVehicles.filter((v) => v.id !== id && v.type === vehicle?.type).slice(0, 3);

  if (!vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🚗</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Vehicle not found</h2>
          <Link to="/fleet" className="text-[#C9A84C] hover:underline">Back to Fleet</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-[#0D1B2A] pt-28 pb-10">
        <div className="container-custom">
          <Link
            to="/fleet"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#C9A84C] transition-colors text-sm mb-5"
          >
            <ArrowLeft size={16} /> Back to Fleet
          </Link>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#C9A84C] text-[#0D1B2A] mb-3">
                {vehicle.type}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-white">{vehicle.name}</h1>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(vehicle.rating) ? 'text-[#C9A84C] fill-[#C9A84C]' : 'text-gray-600'}
                    />
                  ))}
                </div>
                <span className="text-gray-400 text-sm">{vehicle.rating} ({vehicle.reviews} reviews)</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-lg text-white text-sm hover:border-white/40 transition-colors">
                <Share2 size={16} /> Share
              </button>
              <div className="text-right">
                <p className="text-gray-400 text-xs">Starting from</p>
                <p className="text-3xl font-bold text-[#C9A84C]">${vehicle.dailyRate}<span className="text-sm text-gray-400">/day</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Gallery + Specs */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ImageGallery images={vehicle.images} vehicleName={vehicle.name} />
            </motion.div>

            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-3">About This Vehicle</h2>
              <p className="text-gray-600 leading-relaxed">{vehicle.description}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <VehicleSpecs vehicle={vehicle} />
            </motion.div>
          </div>

          {/* Right: Booking Form */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <BookingForm vehicle={vehicle} />
            </motion.div>
          </div>
        </div>

        {/* Related Vehicles */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Vehicles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((v) => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleDetail;
