import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { mockVehicles } from '../../data/mockData';
import VehicleCard from './VehicleCard';
import LoadingSkeleton from '../common/LoadingSkeleton';

const ITEMS_PER_PAGE = 8;

const VehicleGrid = ({ searchQuery }) => {
  const filters = useSelector((s) => s.filters);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [loading] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery || '');

  const filtered = useMemo(() => {
    return mockVehicles.filter((v) => {
      if (filters.type.length && !filters.type.includes(v.type)) return false;
      if (filters.transmission && v.transmission !== filters.transmission) return false;
      if (filters.fuelType.length && !filters.fuelType.includes(v.fuelType)) return false;
      if (v.dailyRate < filters.priceMin || v.dailyRate > filters.priceMax) return false;
      if (filters.features.includes('AC') && !v.ac) return false;
      if (filters.features.includes('Bluetooth') && !v.bluetooth) return false;
      if (filters.features.includes('GPS') && !v.gps) return false;
      if (filters.features.includes('Child Seat') && !v.childSeat) return false;
      if (localSearch) {
        const q = localSearch.toLowerCase();
        if (!v.name.toLowerCase().includes(q) && !v.type.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [filters, localSearch]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div className="flex-1 min-w-0">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={localSearch}
          onChange={(e) => { setLocalSearch(e.target.value); setVisibleCount(ITEMS_PER_PAGE); }}
          placeholder="Search vehicles by name or type…"
          className="w-full pl-11 pr-10 py-3.5 border border-gray-200 rounded-2xl text-sm text-gray-900 focus:outline-none focus:border-[#0A1628] focus:ring-2 focus:ring-[#0A1628]/8 transition-all bg-white shadow-sm"
        />
        {localSearch && (
          <button onClick={() => setLocalSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors">
            <X size={15} />
          </button>
        )}
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          Showing <span className="font-semibold text-gray-900">{visible.length}</span> of <span className="font-semibold text-gray-900">{filtered.length}</span> vehicles
        </p>
      </div>

      {/* Loading */}
      {loading && <LoadingSkeleton count={8} variant="card" />}

      {/* Grid */}
      {!loading && (
        <>
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="text-6xl mb-4">🚗</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No vehicles found</h3>
              <p className="text-gray-500 text-sm max-w-xs">
                Try adjusting your filters or search terms to find the perfect car.
              </p>
            </motion.div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence>
                  {visible.map((vehicle, i) => (
                    <motion.div
                      key={vehicle.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                    >
                      <VehicleCard vehicle={vehicle} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Load More */}
              {hasMore && (
                <div className="text-center mt-12">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setVisibleCount((c) => c + ITEMS_PER_PAGE)}
                    className="px-8 py-3.5 bg-gradient-to-r from-[#0A1628] to-[#112240] text-white font-semibold rounded-2xl hover:shadow-lg transition-all duration-300 text-sm"
                  >
                    Load More Vehicles ({filtered.length - visibleCount} remaining)
                  </motion.button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default VehicleGrid;
