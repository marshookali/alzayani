import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { CheckCircle, Car, Calendar, MapPin, Download, BookOpen } from 'lucide-react';
import { formatUSD } from '../utils/priceCalculator';

const Confirmation = () => {
  const booking = useSelector((s) => s.booking);
  const { isAuthenticated } = useSelector((s) => s.auth);

  const bookingId = booking.bookingId || 'AZ-000000';

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16">
      <div className="container-custom max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.2 }}
            className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle size={48} className="text-green-500" />
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Booking Confirmed! 🎉
          </h1>
          <p className="text-gray-600 text-lg mb-4">
            Thank you for choosing McGrow Al Zayani. Your booking has been confirmed.
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#0D1B2A] rounded-xl">
            <span className="text-gray-400 text-sm">Booking Reference:</span>
            <span className="text-[#C9A84C] font-mono font-bold text-xl">{bookingId}</span>
          </div>
        </motion.div>

        {/* Booking Details Card */}
        {booking.vehicle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden mb-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <img
                src={booking.vehicle.images[0]}
                alt={booking.vehicle.name}
                className="w-full h-48 md:h-full object-cover"
              />
              <div className="p-6 space-y-4">
                <div>
                  <span className="text-xs text-[#C9A84C] uppercase tracking-wider font-semibold">
                    {booking.vehicle.type}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 mt-1">{booking.vehicle.name}</h2>
                </div>

                <div className="space-y-3 text-sm">
                  {booking.pickupDate && (
                    <>
                      <div className="flex items-center gap-3 text-gray-600">
                        <Calendar size={16} className="text-[#C9A84C]" />
                        <div>
                          <p className="text-xs text-gray-400">Pickup</p>
                          <p className="font-medium">{new Date(booking.pickupDate).toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600">
                        <Calendar size={16} className="text-[#C9A84C]" />
                        <div>
                          <p className="text-xs text-gray-400">Return</p>
                          <p className="font-medium">{new Date(booking.returnDate).toLocaleString()}</p>
                        </div>
                      </div>
                    </>
                  )}
                  {booking.pickupLocation && (
                    <div className="flex items-center gap-3 text-gray-600">
                      <MapPin size={16} className="text-[#C9A84C]" />
                      <div>
                        <p className="text-xs text-gray-400">Pickup Location</p>
                        <p className="font-medium">{booking.pickupLocation}</p>
                      </div>
                    </div>
                  )}
                </div>

                <hr className="border-gray-100" />
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">Total Paid</span>
                  <span className="text-2xl font-bold text-[#0D1B2A]">{formatUSD(booking.total)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <button className="flex items-center gap-2 px-6 py-3 bg-[#0D1B2A] text-white font-semibold rounded-xl hover:bg-[#1A2E44] transition-colors">
            <Download size={18} /> Download Receipt
          </button>
          {isAuthenticated && (
            <Link to="/profile?tab=bookings" className="flex items-center gap-2 px-6 py-3 border-2 border-[#0D1B2A] text-[#0D1B2A] font-semibold rounded-xl hover:bg-[#0D1B2A] hover:text-white transition-colors">
              <BookOpen size={18} /> View My Bookings
            </Link>
          )}
          <Link to="/fleet" className="flex items-center gap-2 px-6 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-gray-400 transition-colors">
            <Car size={18} /> Browse More Vehicles
          </Link>
        </motion.div>

        <p className="text-center text-gray-400 text-sm mt-8">
          A confirmation email will be sent to you shortly. For assistance, contact us at{' '}
          <a href="tel:+97317123456" className="text-[#C9A84C]">+973 1712 3456</a>
        </p>
      </div>
    </div>
  );
};

export default Confirmation;
