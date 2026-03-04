import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Search, ArrowRight } from 'lucide-react';
import { locations } from '../../data/mockData';
import { format } from 'date-fns';

const VehicleSearch = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [sameReturn, setSameReturn] = useState(true);
  const [errors, setErrors] = useState({});

  const today = format(new Date(), "yyyy-MM-dd'T'HH:mm");

  const [form, setForm] = useState({
    pickupLocation: '',
    pickupDate: '',
    returnDate: '',
    returnLocation: '',
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.pickupLocation) newErrors.pickupLocation = 'Select a pickup location';
    if (!form.pickupDate) newErrors.pickupDate = 'Select pickup date';
    if (!form.returnDate) newErrors.returnDate = 'Select return date';
    if (form.returnDate && form.pickupDate && new Date(form.returnDate) <= new Date(form.pickupDate)) {
      newErrors.returnDate = 'Return date must be after pickup date';
    }
    if (!sameReturn && !form.returnLocation) newErrors.returnLocation = 'Select return location';
    return newErrors;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length) { setErrors(newErrors); return; }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);

    const params = new URLSearchParams({
      pickup: form.pickupLocation,
      pickupDate: form.pickupDate,
      returnDate: form.returnDate,
      returnLocation: sameReturn ? form.pickupLocation : form.returnLocation,
    });
    navigate(`/fleet?${params.toString()}`);
  };

  const fieldClass = (name) => `w-full px-4 py-4 bg-white/8 backdrop-blur border rounded-xl text-white placeholder-white/40 text-sm focus:outline-none transition-all duration-200 ${errors[name] ? 'border-red-400 focus:border-red-400' : 'border-white/15 focus:border-[#C9A84C] focus:bg-white/15'
    }`;

  return (
    <section className="relative -mt-20 z-20 container-custom pb-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="bg-[#0D1B2A]/92 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
      >
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 rounded-xl bg-[#C9A84C] flex items-center justify-center flex-shrink-0">
            <Search size={20} className="text-[#0D1B2A]" />
          </div>
          <div>
            <h2 className="text-white font-bold text-2xl" style={{ fontFamily: 'Inter, sans-serif' }}>Find Your Perfect Car</h2>
            <p className="text-white/50 text-sm mt-1">Select location, dates and search available vehicles</p>
          </div>
        </div>

        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pickup Location */}
            <div>
              <label className="text-xs text-white/60 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <MapPin size={12} /> Pickup Location
              </label>
              <select
                name="pickupLocation"
                value={form.pickupLocation}
                onChange={handleChange}
                className={fieldClass('pickupLocation')}
              >
                <option value="" className="text-gray-800">Select location...</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc} className="text-gray-800">{loc}</option>
                ))}
              </select>
              {errors.pickupLocation && <p className="text-red-400 text-xs mt-1">{errors.pickupLocation}</p>}
            </div>

            {/* Pickup Date */}
            <div>
              <label className="text-xs text-white/55 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Calendar size={12} /> Pickup Date & Time
              </label>
              <input
                type="datetime-local"
                name="pickupDate"
                value={form.pickupDate}
                min={today}
                onChange={handleChange}
                className={fieldClass('pickupDate')}
              />
              {errors.pickupDate && <p className="text-red-400 text-xs mt-1">{errors.pickupDate}</p>}
            </div>

            {/* Return Date */}
            <div>
              <label className="text-xs text-white/55 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Calendar size={12} /> Return Date & Time
              </label>
              <input
                type="datetime-local"
                name="returnDate"
                value={form.returnDate}
                min={form.pickupDate || today}
                onChange={handleChange}
                className={fieldClass('returnDate')}
              />
              {errors.returnDate && <p className="text-red-400 text-xs mt-1">{errors.returnDate}</p>}
            </div>

            {/* Return Location or Search */}
            <div>
              {!sameReturn ? (
                <>
                  <label className="text-xs text-white/60 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <MapPin size={12} /> Return Location
                  </label>
                  <select
                    name="returnLocation"
                    value={form.returnLocation}
                    onChange={handleChange}
                    className={fieldClass('returnLocation')}
                  >
                    <option value="" className="text-gray-800">Select location...</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc} className="text-gray-800">{loc}</option>
                    ))}
                  </select>
                  {errors.returnLocation && <p className="text-red-400 text-xs mt-1">{errors.returnLocation}</p>}
                </>
              ) : (
                <>
                  <label className="text-xs text-white/55 uppercase tracking-wider mb-2 block">&nbsp;</label>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-[#C9A84C] hover:bg-[#E8C97A] text-[#0D1B2A] font-bold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:opacity-60 text-sm tracking-wide"
                  >
                    {loading ? (
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    ) : (
                      <>Search Vehicles <ArrowRight size={16} /></>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-3 pt-3">
            <label className="flex items-center gap-2 text-white/70 text-sm cursor-pointer hover:text-white transition-colors">
              <input
                type="checkbox"
                checked={sameReturn}
                onChange={(e) => setSameReturn(e.target.checked)}
                className="w-4 h-4 rounded accent-[#C9A84C]"
              />
              Same location for return
            </label>
            {!sameReturn && (
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-[#C9A84C] hover:bg-[#E8C97A] text-[#0D1B2A] font-bold rounded-xl flex items-center gap-2 transition-all duration-300 hover:scale-[1.02] disabled:opacity-60"
              >
                {loading ? 'Searching...' : <><Search size={16} /> Search Vehicles</>}
              </button>
            )}
          </div>
        </form>
      </motion.div>
    </section>
  );
};

export default VehicleSearch;
