import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Phone, Mail, MapPin, Edit3, Save, X, Car, Calendar, AlertTriangle } from 'lucide-react';
import { updateUser } from '../store/authSlice';
import { mockVehicles } from '../data/mockData';

const mockBookings = [
  {
    id: 'AZ-123456',
    vehicleId: '1',
    pickupDate: '2024-02-15T10:00',
    returnDate: '2024-02-18T10:00',
    pickupLocation: 'Manama City Centre',
    total: 148.5,
    status: 'completed',
  },
  {
    id: 'AZ-789012',
    vehicleId: '2',
    pickupDate: '2024-03-10T09:00',
    returnDate: '2024-03-13T09:00',
    pickupLocation: 'Bahrain International Airport',
    total: 396.0,
    status: 'upcoming',
  },
];

const Profile = () => {
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'profile';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...user });

  const handleSave = () => {
    dispatch(updateUser(form));
    setEditing(false);
  };

  const tabs = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'bookings', label: 'My Bookings', icon: Car },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#0D1B2A] pt-28 pb-16">
        <div className="container-custom flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-[#C9A84C] flex items-center justify-center">
            <span className="text-[#0D1B2A] font-bold text-2xl">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">{user?.firstName} {user?.lastName}</h1>
            <p className="text-gray-400">{user?.email}</p>
          </div>
        </div>

        <div className="container-custom mt-8 flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-[#C9A84C] text-[#0D1B2A]' : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
            >
              <tab.icon size={16} /> {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="container-custom py-10 max-w-3xl">
        {activeTab === 'profile' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Personal Details</h2>
              {!editing ? (
                <button onClick={() => setEditing(true)} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#0D1B2A] border border-[#0D1B2A] rounded-lg hover:bg-[#0D1B2A] hover:text-white transition-all">
                  <Edit3 size={14} /> Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <Save size={14} /> Save
                  </button>
                  <button onClick={() => { setEditing(false); setForm({ ...user }); }} className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-600">
                    <X size={14} /> Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { label: 'First Name', key: 'firstName', icon: User },
                { label: 'Last Name', key: 'lastName', icon: User },
                { label: 'Email', key: 'email', icon: Mail },
                { label: 'Phone', key: 'phone', icon: Phone },
              ].map(({ label, key, icon: Icon }) => (
                <div key={key}>
                  <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Icon size={12} /> {label}
                  </label>
                  {editing ? (
                    <input
                      value={form[key] || ''}
                      onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0D1B2A] focus:ring-2 focus:ring-[#0D1B2A]/10"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium px-4 py-3 bg-gray-50 rounded-xl text-sm">{user?.[key] || '—'}</p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'bookings' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Booking History</h2>
            {mockBookings.map((booking) => {
              const vehicle = mockVehicles.find((v) => v.id === booking.vehicleId);
              return (
                <div key={booking.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col sm:flex-row">
                  <img src={vehicle?.images[0]} alt={vehicle?.name} className="w-full sm:w-40 h-32 sm:h-auto object-cover flex-shrink-0" />
                  <div className="p-5 flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${booking.status === 'upcoming' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                          }`}>
                          {booking.status === 'upcoming' ? '🕐 Upcoming' : '✓ Completed'}
                        </span>
                        <span className="text-xs text-gray-400 font-mono">{booking.id}</span>
                      </div>
                      <h3 className="font-bold text-gray-900">{vehicle?.name}</h3>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                        <Calendar size={12} />
                        {new Date(booking.pickupDate).toLocaleDateString()} – {new Date(booking.returnDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                        <MapPin size={12} /> {booking.pickupLocation}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#0D1B2A]">${booking.total}</p>
                      {booking.status === 'upcoming' && (
                        <button className="mt-2 text-xs text-red-500 hover:text-red-700 flex items-center gap-1 ml-auto">
                          <AlertTriangle size={12} /> Cancel Booking
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Profile;
