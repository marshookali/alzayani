import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Calendar, MapPin, CreditCard, Banknote, Check, ArrowLeft } from 'lucide-react';
import { checkoutSchema } from '../utils/validators';
import { setBookingId } from '../store/bookingSlice';
import { generateBookingRef, formatUSD } from '../utils/priceCalculator';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const booking = useSelector((s) => s.booking);
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { paymentMethod: 'cash', agreeTerms: false },
  });

  const payment = watch('paymentMethod');

  if (!booking.vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">No booking in progress</h2>
          <Link to="/fleet" className="text-[#C9A84C] hover:underline">Browse our fleet</Link>
        </div>
      </div>
    );
  }

  const onSubmit = async (data) => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    const ref = generateBookingRef();
    dispatch(setBookingId(ref));
    navigate(`/confirmation/${ref}`);
  };

  const InputField = ({ label, name, type = 'text', icon: Icon, ...props }) => (
    <div>
      <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
        {Icon && <Icon size={12} />} {label}
      </label>
      <input
        type={type}
        {...register(name)}
        {...props}
        className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-all ${errors[name] ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-[#0D1B2A] focus:ring-2 focus:ring-[#0D1B2A]/10'
          }`}
      />
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name].message}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#0D1B2A] pt-28 pb-10">
        <div className="container-custom">
          <Link to={`/vehicle/${booking.vehicle?.id}`} className="inline-flex items-center gap-2 text-gray-400 hover:text-[#C9A84C] transition-colors text-sm mb-4">
            <ArrowLeft size={16} /> Back to Vehicle
          </Link>
          <h1 className="text-3xl font-bold text-white">Complete Your Booking</h1>
        </div>
      </div>

      <div className="container-custom py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Driver Details */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <User size={20} className="text-[#C9A84C]" /> Driver Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField label="First Name" name="firstName" icon={User} placeholder="John" />
                  <InputField label="Last Name" name="lastName" icon={User} placeholder="Doe" />
                  <InputField label="Email" name="email" type="email" icon={Mail} placeholder="john@example.com" />
                  <InputField label="Phone" name="phone" type="tel" icon={Phone} placeholder="+973 1234 5678" />
                  <InputField label="Date of Birth" name="dateOfBirth" type="date" icon={Calendar} />
                  <InputField label="Address" name="address" icon={MapPin} placeholder="Your full address" />
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <CreditCard size={20} className="text-[#C9A84C]" /> Payment Method
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { value: 'cash', label: 'Cash on Pickup', desc: 'Pay when you collect the car', icon: Banknote },
                    { value: 'card', label: 'Credit/Debit Card', desc: 'Secure online payment', icon: CreditCard },
                  ].map(({ value, label, desc, icon: Icon }) => (
                    <label
                      key={value}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${payment === value ? 'border-[#0D1B2A] bg-[#0D1B2A]/5' : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      <input type="radio" value={value} {...register('paymentMethod')} className="hidden" />
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${payment === value ? 'bg-[#0D1B2A]' : 'bg-gray-100'}`}>
                        <Icon size={20} className={payment === value ? 'text-white' : 'text-gray-500'} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{label}</p>
                        <p className="text-gray-400 text-xs">{desc}</p>
                      </div>
                      {payment === value && <Check size={18} className="text-[#0D1B2A] ml-auto" />}
                    </label>
                  ))}
                </div>
              </div>

              {/* Terms */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" {...register('agreeTerms')} className="w-5 h-5 mt-0.5 rounded accent-[#0D1B2A] flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-700">
                      I agree to the{' '}
                      <a href="#" className="text-[#C9A84C] hover:underline">Rental Agreement</a>{' '}
                      and{' '}
                      <a href="#" className="text-[#C9A84C] hover:underline">Terms of Service</a>.
                    </p>
                    {errors.agreeTerms && <p className="text-red-500 text-xs mt-1">{errors.agreeTerms.message}</p>}
                  </div>
                </label>
              </div>

              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-[#C9A84C] text-[#0D1B2A] font-bold text-lg rounded-xl flex items-center justify-center gap-2 hover:bg-[#E8C97A] transition-all disabled:opacity-60"
              >
                {submitting ? (
                  <><svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg> Confirming...</>
                ) : (
                  <><Check size={20} /> Confirm Booking</>
                )}
              </motion.button>
            </motion.form>
          </div>

          {/* Sidebar Summary */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden sticky top-24"
            >
              <div className="bg-[#0D1B2A] px-6 py-4">
                <h3 className="text-white font-bold">Booking Summary</h3>
              </div>
              {booking.vehicle && (
                <>
                  <img src={booking.vehicle.images[0]} alt={booking.vehicle.name} className="w-full h-40 object-cover" />
                  <div className="p-5 space-y-3">
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">{booking.vehicle.name}</h4>
                      <span className="text-xs text-gray-400">{booking.vehicle.type}</span>
                    </div>
                    <hr className="border-gray-100" />
                    {booking.pickupDate && (
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-gray-600">
                          <span>Pickup</span>
                          <span className="font-medium">{new Date(booking.pickupDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Return</span>
                          <span className="font-medium">{new Date(booking.returnDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Duration</span>
                          <span className="font-medium">{booking.totalDays} {booking.totalDays === 1 ? 'day' : 'days'}</span>
                        </div>
                      </div>
                    )}
                    <hr className="border-gray-100" />
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span><span>{formatUSD(booking.subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>VAT (10%)</span><span>{formatUSD(booking.vat)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg text-[#0D1B2A] pt-1 border-t border-gray-100 mt-1">
                        <span>Total</span><span>{formatUSD(booking.total)}</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
