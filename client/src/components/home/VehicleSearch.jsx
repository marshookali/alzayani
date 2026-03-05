import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, ArrowRight, Car } from 'lucide-react';
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
    if (!form.pickupLocation) newErrors.pickupLocation = 'Required';
    if (!form.pickupDate) newErrors.pickupDate = 'Required';
    if (!form.returnDate) newErrors.returnDate = 'Required';
    if (form.returnDate && form.pickupDate && new Date(form.returnDate) <= new Date(form.pickupDate))
      newErrors.returnDate = 'Must be after pickup';
    if (!sameReturn && !form.returnLocation) newErrors.returnLocation = 'Required';
    return newErrors;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length) { setErrors(newErrors); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    const params = new URLSearchParams({
      pickup: form.pickupLocation,
      pickupDate: form.pickupDate,
      returnDate: form.returnDate,
      returnLocation: sameReturn ? form.pickupLocation : form.returnLocation,
    });
    navigate(`/fleet?${params.toString()}`);
  };

  const fieldCls = (name) =>
    `input-dark ${errors[name] ? 'border-red-400/60 focus:border-red-400' : ''}`;

  return (
    <section className="relative -mt-20 z-20 container-custom pb-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl"
        style={{
          background: 'linear-gradient(145deg, rgba(17,34,64,0.98) 0%, rgba(10,22,40,0.99) 100%)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)',
        }}
      >
        {/* Subtle glow accent */}
        <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-[#C9A84C]/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 left-16 w-48 h-48 rounded-full bg-[#1B3460]/40 blur-3xl pointer-events-none" />

        {/* Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-8 md:px-10 pt-8 pb-6 border-b border-white/6">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#C9A84C] to-[#9A7A32] flex items-center justify-center flex-shrink-0 shadow-lg">
              <Car size={20} className="text-[#0A1628]" />
            </div>
            <div>
              <h2 className="text-white font-bold text-xl md:text-2xl" style={{ fontFamily: 'Playfair Display, serif' }}>
                Find Your Perfect Car
              </h2>
              <p className="text-white/40 text-xs mt-0.5">Search available vehicles across all Bahrain locations</p>
            </div>
          </div>
          {/* Same return toggle */}
          <label className="flex items-center gap-2.5 text-white/55 text-sm cursor-pointer hover:text-white/80 transition-colors select-none flex-shrink-0">
            <div
              onClick={() => setSameReturn(!sameReturn)}
              className={`relative w-10 h-5 rounded-full transition-colors duration-300 cursor-pointer ${sameReturn ? 'bg-[#C9A84C]' : 'bg-white/15'}`}
            >
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${sameReturn ? 'left-5.5' : 'left-0.5'}`} style={{ left: sameReturn ? '22px' : '2px' }} />
            </div>
            Same return location
          </label>
        </div>

        {/* Form */}
        <div className="px-8 md:px-10 py-7">
          <form onSubmit={handleSearch}>
            <div className={`grid gap-4 ${!sameReturn ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-5' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'}`}>

              {/* Pickup Location */}
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-xs font-semibold text-white/45 uppercase tracking-widest">
                  <MapPin size={10} className="text-[#C9A84C]" /> Pickup Location
                </label>
                <select name="pickupLocation" value={form.pickupLocation} onChange={handleChange} className={fieldCls('pickupLocation')}>
                  <option value="">Select location…</option>
                  {locations.map((loc) => <option key={loc} value={loc}>{loc}</option>)}
                </select>
                {errors.pickupLocation && <p className="text-red-400 text-xs">{errors.pickupLocation}</p>}
              </div>

              {/* Pickup Date */}
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-xs font-semibold text-white/45 uppercase tracking-widest">
                  <Calendar size={10} className="text-[#C9A84C]" /> Pickup Date
                </label>
                <input type="datetime-local" name="pickupDate" value={form.pickupDate} min={today} onChange={handleChange} className={fieldCls('pickupDate')} />
                {errors.pickupDate && <p className="text-red-400 text-xs">{errors.pickupDate}</p>}
              </div>

              {/* Return Date */}
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-xs font-semibold text-white/45 uppercase tracking-widest">
                  <Calendar size={10} className="text-[#C9A84C]" /> Return Date
                </label>
                <input type="datetime-local" name="returnDate" value={form.returnDate} min={form.pickupDate || today} onChange={handleChange} className={fieldCls('returnDate')} />
                {errors.returnDate && <p className="text-red-400 text-xs">{errors.returnDate}</p>}
              </div>

              {/* Return Location — only if different */}
              {!sameReturn && (
                <div className="space-y-2">
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-white/45 uppercase tracking-widest">
                    <MapPin size={10} className="text-[#C9A84C]" /> Return Location
                  </label>
                  <select name="returnLocation" value={form.returnLocation} onChange={handleChange} className={fieldCls('returnLocation')}>
                    <option value="">Select location…</option>
                    {locations.map((loc) => <option key={loc} value={loc}>{loc}</option>)}
                  </select>
                  {errors.returnLocation && <p className="text-red-400 text-xs">{errors.returnLocation}</p>}
                </div>
              )}

              {/* Search Button */}
              <div className="space-y-2">
                <span className="block text-xs opacity-0 select-none">Search</span>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-[50px] bg-gradient-to-r from-[#C9A84C] to-[#E8C97A] hover:from-[#d4b560] hover:to-[#efd485] text-[#0A1628] font-bold rounded-xl flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(201,168,76,0.45)] disabled:opacity-50 disabled:cursor-not-allowed text-sm tracking-wide"
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
              </div>
            </div>
          </form>

          {/* Bottom hints */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5 mt-5 pt-4 border-t border-white/5">
            {['Free cancellation up to 24h', '500+ vehicles available', 'Instant confirmation'].map((hint) => (
              <span key={hint} className="flex items-center gap-1.5 text-white/30 text-xs">
                <span className="w-1 h-1 rounded-full bg-[#C9A84C] opacity-70" />
                {hint}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default VehicleSearch;
