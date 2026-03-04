import { useLocation } from 'react-router-dom';
import VehicleFilters from '../components/fleet/VehicleFilters';
import VehicleGrid from '../components/fleet/VehicleGrid';

const Fleet = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchQuery = params.get('query') || '';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Hero */}
      <div className="bg-[#0D1B2A] pt-28 pb-14">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Our Fleet
          </h1>
          <p className="text-gray-400 text-lg">
            Choose from our extensive collection of premium vehicles
          </p>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mt-4 text-gray-500">
            <a href="/" className="hover:text-[#C9A84C] transition-colors">Home</a>
            <span>/</span>
            <span className="text-[#C9A84C]">Fleet</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-10">
        <div className="flex gap-8 items-start">
          <VehicleFilters />
          <VehicleGrid searchQuery={searchQuery} />
        </div>
      </div>
    </div>
  );
};

export default Fleet;
