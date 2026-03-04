import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, ArrowRight, Tag } from 'lucide-react';
import { format, differenceInCalendarDays } from 'date-fns';
import { locations } from '../../data/mockData';
import { setBookingVehicle, setBookingDates, setBookingLocations, setBookingPrice } from '../../store/bookingSlice';
import { calculatePrice, formatUSD } from '../../utils/priceCalculator';

const BookingForm = ({ vehicle }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const existingBooking = useSelector((s) => s.booking);

  const today = format(new Date(), "yyyy-MM-dd'T'HH:mm");

  const [form, setForm] = useState({
    pickupDate: existingBooking.pickupDate || '',
    returnDate: existingBooking.returnDate || '',
    pickupLocation: existingBooking.pickupLocation || '',
    returnLocation: existingBooking.returnLocation || '',
  });
  const [sameReturn, setSameReturn] = useState(true);
  const [errors, setErrors] = useState({});
  const [price, setPrice] = useState(null);

  useEffect(() => {
    if (form.pickupDate && form.returnDate) {
      const calc = calculatePrice(form.pickupDate, form.returnDate, vehicle.dailyRate);
      setPrice(calc);

      if (calc) {
        dispatch(setBookingPrice(calc));
        dispatch(setBookingDates({ pickupDate: form.pickupDate, returnDate: form.returnDate }));
        dispatch(setBookingLocations({
          pickupLocation: form.pickupLocation,
          returnLocation: sameReturn ? form.pickupLocation : form.returnLocation,
        }));
      }
    } else {
      setPrice(null);
    }
  }, [form.pickupDate, form.returnDate, form.pickupLocation, form.returnLocation, sameReturn, vehicle.dailyRate]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.pickupLocation) errs.pickupLocation = 'Select pickup location';
    if (!form.pickupDate) errs.pickupDate = 'Select pickup date';
    if (!form.returnDate) errs.returnDate = 'Select return date';
    if (form.pickupDate && form.returnDate && new Date(form.returnDate) <= new Date(form.pickupDate)) {
      errs.returnDate = 'Return must be after pickup';
    }
    return errs;
  };

  const handleProceed = () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    dispatch(setBookingVehicle(vehicle));
    navigate('/checkout');
  };

  const fieldCls = (name) => `w-full px-4 py-3 rounded-xl border text-gray-900 text-sm focus:outline-none transition-all ${errors[name] ? 'border-red-400 focus:border-red-400 bg-red-50' : 'border-gray-200 focus:border-[#0D1B2A] focus:ring-2 focus:ring-[#0D1B2A]/10'
    }`;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-lg sticky top-24 overflow-hidden">
      {/* Header */}
      <div className="bg-[#0D1B2A] px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Daily Rate</p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-white">${vehicle.dailyRate}</span>
              <span className="text-gray-400 text-sm">/day</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-xs">+ 10% VAT</p>
            <div className="flex items-center gap-1 mt-1">
              <Tag size={14} className="text-[#C9A84C]" />
              <span className="text-[#C9A84C] text-sm font-medium">Free cancellation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="p-6 space-y-4">
        {/* Pickup Location */}
        <div>
          <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <MapPin size={12} /> Pickup Location
          </label>
          <select name="pickupLocation" value={form.pickupLocation} onChange={handleChange} className={fieldCls('pickupLocation')}>
            <option value="">Select location...</option>
            {locations.map((loc) => <option key={loc} value={loc}>{loc}</option>)}
          </select>
          {errors.pickupLocation && <p className="text-red-500 text-xs mt-1">{errors.pickupLocation}</p>}
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 gap-3">
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Calendar size={12} /> Pickup Date & Time
            </label>
            <input type="datetime-local" name="pickupDate" value={form.pickupDate} min={today} onChange={handleChange} className={fieldCls('pickupDate')} />
            {errors.pickupDate && <p className="text-red-500 text-xs mt-1">{errors.pickupDate}</p>}
          </div>
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Calendar size={12} /> Return Date & Time
            </label>
            <input type="datetime-local" name="returnDate" value={form.returnDate} min={form.pickupDate || today} onChange={handleChange} className={fieldCls('returnDate')} />
            {errors.returnDate && <p className="text-red-500 text-xs mt-1">{errors.returnDate}</p>}
          </div>
        </div>

        {/* Same Return */}
        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
          <input type="checkbox" checked={sameReturn} onChange={(e) => setSameReturn(e.target.checked)} className="w-4 h-4 rounded accent-[#0D1B2A]" />
          Same return location
        </label>

        {!sameReturn && (
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <MapPin size={12} /> Return Location
            </label>
            <select name="returnLocation" value={form.returnLocation} onChange={handleChange} className={fieldCls('returnLocation')}>
              <option value="">Select location...</option>
              {locations.map((loc) => <option key={loc} value={loc}>{loc}</option>)}
            </select>
          </div>
        )}

        {/* Price Breakdown */}
        <AnimatePresence>
          {price && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-[#F5F5F0] rounded-xl p-4 space-y-2.5">
                <p className="text-sm font-semibold text-gray-700 mb-2">Price Breakdown</p>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${vehicle.dailyRate} × {price.totalDays} {price.totalDays === 1 ? 'day' : 'days'}</span>
                  <span className="font-medium">{formatUSD(price.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>VAT (10%)</span>
                  <span className="font-medium">{formatUSD(price.vat)}</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between text-base font-bold text-[#0D1B2A]">
                  <span>Total</span>
                  <span>{formatUSD(price.total)}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleProceed}
          disabled={!price}
          className={`w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-300 ${price
              ? 'bg-[#C9A84C] text-[#0D1B2A] hover:bg-[#E8C97A] hover:shadow-lg'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
        >
          Proceed to Checkout <ArrowRight size={18} />
        </motion.button>

        <p className="text-center text-xs text-gray-400">Free cancellation · No hidden fees</p>
      </div>
    </div>
  );
};

export default BookingForm;
