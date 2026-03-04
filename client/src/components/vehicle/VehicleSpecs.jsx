import { Users, Briefcase, Car, Fuel, Settings, Wind, Gauge, Calendar, Bluetooth, MapPin, Baby } from 'lucide-react';

const specs = [
  { icon: Users, label: 'Seats', key: 'seats', format: (v) => `${v} Passengers` },
  { icon: Briefcase, label: 'Luggage', key: 'luggage', format: (v) => `${v} Large Bags` },
  { icon: Car, label: 'Doors', key: 'doors', format: (v) => `${v} Doors` },
  { icon: Fuel, label: 'Fuel Type', key: 'fuelType', format: (v) => v },
  { icon: Settings, label: 'Transmission', key: 'transmission', format: (v) => v },
  { icon: Wind, label: 'Air Conditioning', key: 'ac', format: (v) => (v ? 'Yes' : 'No') },
  { icon: Gauge, label: 'Engine', key: 'engine', format: (v) => v },
  { icon: Calendar, label: 'Year', key: 'year', format: (v) => v },
  { icon: Bluetooth, label: 'Bluetooth', key: 'bluetooth', format: (v) => (v ? 'Yes' : 'No') },
  { icon: MapPin, label: 'GPS', key: 'gps', format: (v) => (v ? 'Yes' : 'No') },
];

const VehicleSpecs = ({ vehicle }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900">Vehicle Specifications</h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
          {specs.map((spec, i) => (
            <div
              key={spec.key}
              className={`flex items-center gap-4 py-4 px-2 ${i < specs.length - (specs.length % 2 === 0 ? 2 : 1) ? 'border-b border-gray-100' : ''
                }`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#0D1B2A]/5 flex items-center justify-center flex-shrink-0">
                <spec.icon size={18} className="text-[#0D1B2A]" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{spec.label}</p>
                <p className="text-gray-900 font-semibold text-base">{spec.format(vehicle[spec.key])}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="px-6 pb-6">
        <p className="text-sm font-semibold text-gray-700 mb-3">Standard Features</p>
        <div className="flex flex-wrap gap-2">
          {vehicle.ac && <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full border border-green-200">✓ Air Conditioning</span>}
          {vehicle.bluetooth && <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-200">✓ Bluetooth</span>}
          {vehicle.gps && <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full border border-purple-200">✓ GPS Navigation</span>}
          {vehicle.childSeat && <span className="px-3 py-1 bg-orange-50 text-orange-700 text-xs font-medium rounded-full border border-orange-200">✓ Child Seat</span>}
        </div>
      </div>
    </div>
  );
};

export default VehicleSpecs;
