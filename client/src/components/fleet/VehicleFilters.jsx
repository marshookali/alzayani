import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setTypeFilter, setTransmissionFilter, setFuelTypeFilter,
  setFeaturesFilter, setPriceRange, clearFilters
} from '../../store/filterSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';

const typeOptions = ['Sedan', 'SUV', 'Luxury', 'Economy'];
const fuelOptions = ['Petrol', 'Diesel', 'Hybrid', 'Electric'];
const featureOptions = ['AC', 'Bluetooth', 'GPS', 'Child Seat'];

const FilterContent = ({ onClose }) => {
  const dispatch = useDispatch();
  const filters = useSelector((s) => s.filters);

  const toggleArray = (arr, value, setter) => {
    const updated = arr.includes(value)
      ? arr.filter((i) => i !== value)
      : [...arr, value];
    dispatch(setter(updated));
  };

  return (
    <div className="space-y-6">
      {/* Clear All */}
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-900">Filters</h3>
        <button
          onClick={() => dispatch(clearFilters())}
          className="text-xs text-[#C9A84C] hover:underline font-medium"
        >
          Clear All
        </button>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Price Range (per day)</h4>
        <div className="flex items-center gap-3 mb-2">
          <input
            type="number"
            value={filters.priceMin}
            onChange={(e) => dispatch(setPriceRange({ min: +e.target.value, max: filters.priceMax }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#0D1B2A]"
            placeholder="Min"
            min={0}
          />
          <span className="text-gray-400">—</span>
          <input
            type="number"
            value={filters.priceMax}
            onChange={(e) => dispatch(setPriceRange({ min: filters.priceMin, max: +e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#0D1B2A]"
            placeholder="Max"
            min={0}
          />
        </div>
        <p className="text-xs text-gray-400">${filters.priceMin} – ${filters.priceMax}/day</p>
      </div>

      <hr className="border-gray-100" />

      {/* Vehicle Type */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Vehicle Type</h4>
        <div className="space-y-2.5">
          {typeOptions.map((opt) => (
            <label key={opt} className="flex items-center gap-3 cursor-pointer group">
              <div
                onClick={() => toggleArray(filters.type, opt, setTypeFilter)}
                className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-colors ${filters.type.includes(opt)
                    ? 'bg-[#0D1B2A] border-[#0D1B2A]'
                    : 'border-gray-300 group-hover:border-[#0D1B2A]'
                  }`}
              >
                {filters.type.includes(opt) && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-gray-600">{opt}</span>
            </label>
          ))}
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Transmission */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Transmission</h4>
        <div className="space-y-2.5">
          {['Automatic', 'Manual', 'Any'].map((opt) => (
            <label key={opt} className="flex items-center gap-3 cursor-pointer">
              <div
                onClick={() => dispatch(setTransmissionFilter(opt === 'Any' ? '' : opt))}
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${(opt === 'Any' ? '' : opt) === filters.transmission
                    ? 'border-[#0D1B2A]'
                    : 'border-gray-300'
                  }`}
              >
                {(opt === 'Any' ? '' : opt) === filters.transmission && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0D1B2A]" />
                )}
              </div>
              <span className="text-sm text-gray-600">{opt}</span>
            </label>
          ))}
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Fuel Type */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Fuel Type</h4>
        <div className="space-y-2.5">
          {fuelOptions.map((opt) => (
            <label key={opt} className="flex items-center gap-3 cursor-pointer group">
              <div
                onClick={() => toggleArray(filters.fuelType, opt, setFuelTypeFilter)}
                className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-colors ${filters.fuelType.includes(opt)
                    ? 'bg-[#0D1B2A] border-[#0D1B2A]'
                    : 'border-gray-300 group-hover:border-[#0D1B2A]'
                  }`}
              >
                {filters.fuelType.includes(opt) && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-gray-600">{opt}</span>
            </label>
          ))}
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Features */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Features</h4>
        <div className="grid grid-cols-2 gap-2.5">
          {featureOptions.map((opt) => {
            const key = opt.toLowerCase().replace(' ', '');
            const active = filters.features.includes(opt);
            return (
              <button
                key={opt}
                onClick={() => toggleArray(filters.features, opt, setFeaturesFilter)}
                className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${active
                    ? 'bg-[#0D1B2A] text-white border-[#0D1B2A]'
                    : 'border-gray-200 text-gray-600 hover:border-[#0D1B2A]'
                  }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="w-full py-3 bg-[#0D1B2A] text-white rounded-xl font-semibold text-sm hover:bg-[#1A2E44] transition-colors"
        >
          Apply Filters
        </button>
      )}
    </div>
  );
};

const VehicleFilters = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const filters = useSelector((s) => s.filters);

  const activeCount = [
    filters.type.length > 0,
    !!filters.transmission,
    filters.fuelType.length > 0,
    filters.features.length > 0,
    filters.priceMin > 0 || filters.priceMax < 500,
  ].filter(Boolean).length;

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 border-2 border-[#0D1B2A] rounded-xl text-sm font-semibold text-[#0D1B2A] hover:bg-[#0D1B2A] hover:text-white transition-all"
        >
          <SlidersHorizontal size={16} />
          Filters
          {activeCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-[#C9A84C] text-[#0D1B2A] text-xs font-bold flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 sticky top-24">
          <FilterContent />
        </div>
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 400, damping: 40 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-white z-50 overflow-y-auto"
            >
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <h2 className="font-bold text-gray-900 text-lg">Filters</h2>
                <button onClick={() => setMobileOpen(false)} className="text-gray-400 hover:text-gray-900">
                  <X size={22} />
                </button>
              </div>
              <div className="p-5">
                <FilterContent onClose={() => setMobileOpen(false)} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default VehicleFilters;
