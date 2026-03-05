import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setTypeFilter, setTransmissionFilter, setFuelTypeFilter,
  setFeaturesFilter, setPriceRange, clearFilters
} from '../../store/filterSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, Check } from 'lucide-react';

const typeOptions = ['Sedan', 'SUV', 'Luxury', 'Economy'];
const fuelOptions = ['Petrol', 'Diesel', 'Hybrid', 'Electric'];
const featureOptions = ['AC', 'Bluetooth', 'GPS', 'Child Seat'];
const transmissionOptions = ['Any', 'Automatic', 'Manual'];

const FilterContent = ({ onClose }) => {
  const dispatch = useDispatch();
  const filters = useSelector((s) => s.filters);

  const toggleArray = (arr, value, setter) => {
    const updated = arr.includes(value) ? arr.filter((i) => i !== value) : [...arr, value];
    dispatch(setter(updated));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-900 text-base">Filters</h3>
        <button
          onClick={() => dispatch(clearFilters())}
          className="text-xs text-[#C9A84C] hover:underline font-semibold"
        >
          Clear All
        </button>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Price / Day</h4>
        <div className="flex items-center gap-2.5 mb-1.5">
          <input
            type="number"
            value={filters.priceMin}
            onChange={(e) => dispatch(setPriceRange({ min: +e.target.value, max: filters.priceMax }))}
            className="w-full border-1.5 border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#0A1628] transition-colors"
            placeholder="Min"
            min={0}
          />
          <span className="text-gray-300 text-lg">—</span>
          <input
            type="number"
            value={filters.priceMax}
            onChange={(e) => dispatch(setPriceRange({ min: filters.priceMin, max: +e.target.value }))}
            className="w-full border-1.5 border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#0A1628] transition-colors"
            placeholder="Max"
            min={0}
          />
        </div>
        <p className="text-xs text-gray-400">${filters.priceMin} – ${filters.priceMax}/day</p>
      </div>

      <div className="h-px bg-gray-100" />

      {/* Vehicle Type */}
      <div>
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Vehicle Type</h4>
        <div className="grid grid-cols-2 gap-2">
          {typeOptions.map((opt) => {
            const active = filters.type.includes(opt);
            return (
              <button
                key={opt}
                onClick={() => toggleArray(filters.type, opt, setTypeFilter)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all duration-200 ${active
                    ? 'bg-[#0A1628] text-white border-[#0A1628]'
                    : 'border-gray-200 text-gray-600 hover:border-[#0A1628] hover:text-[#0A1628]'
                  }`}
              >
                {active && <Check size={11} />}
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      <div className="h-px bg-gray-100" />

      {/* Transmission */}
      <div>
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Transmission</h4>
        <div className="flex flex-col gap-2">
          {transmissionOptions.map((opt) => {
            const val = opt === 'Any' ? '' : opt;
            const active = val === filters.transmission;
            return (
              <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                <div
                  onClick={() => dispatch(setTransmissionFilter(val))}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${active ? 'border-[#0A1628] bg-[#0A1628]' : 'border-gray-300 group-hover:border-[#0A1628]'
                    }`}
                >
                  {active && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <span className="text-sm text-gray-600">{opt}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="h-px bg-gray-100" />

      {/* Fuel Type */}
      <div>
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Fuel Type</h4>
        <div className="grid grid-cols-2 gap-2">
          {fuelOptions.map((opt) => {
            const active = filters.fuelType.includes(opt);
            return (
              <button
                key={opt}
                onClick={() => toggleArray(filters.fuelType, opt, setFuelTypeFilter)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all duration-200 ${active
                    ? 'bg-[#0A1628] text-white border-[#0A1628]'
                    : 'border-gray-200 text-gray-600 hover:border-[#0A1628] hover:text-[#0A1628]'
                  }`}
              >
                {active && <Check size={11} />}
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      <div className="h-px bg-gray-100" />

      {/* Features */}
      <div>
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Features</h4>
        <div className="grid grid-cols-2 gap-2">
          {featureOptions.map((opt) => {
            const active = filters.features.includes(opt);
            return (
              <button
                key={opt}
                onClick={() => toggleArray(filters.features, opt, setFeaturesFilter)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all duration-200 ${active
                    ? 'bg-[#C9A84C] text-[#0A1628] border-[#C9A84C]'
                    : 'border-gray-200 text-gray-600 hover:border-[#C9A84C]'
                  }`}
              >
                {active && <Check size={11} />}
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="w-full py-3.5 bg-gradient-to-r from-[#0A1628] to-[#112240] text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity"
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
          className="flex items-center gap-2 px-5 py-3 bg-[#0A1628] text-white rounded-xl text-sm font-semibold hover:bg-[#112240] transition-colors shadow-md"
        >
          <SlidersHorizontal size={15} />
          Filters
          {activeCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-[#C9A84C] text-[#0A1628] text-xs font-bold flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-60 flex-shrink-0">
        <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100/80 sticky top-24">
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
              className="fixed inset-0 bg-black/55 backdrop-blur-sm z-40 lg:hidden"
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
                <h2 className="font-bold text-gray-900 text-base">Filters</h2>
                <button onClick={() => setMobileOpen(false)} className="text-gray-400 hover:text-gray-700 transition-colors p-1">
                  <X size={20} />
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
