import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Phone, Eye, EyeOff, Car, Check } from 'lucide-react';
import { registerSchema } from '../utils/validators';
import { setCredentials } from '../store/authSlice';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    const mockUser = {
      id: Date.now().toString(),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
    };
    dispatch(setCredentials({ user: mockUser, token: 'mock-jwt-token-' + Date.now() }));
    navigate('/');
    setLoading(false);
  };

  const Field = ({ label, name, type = 'text', placeholder, icon: Icon }) => (
    <div>
      <label className="text-xs text-gray-400 uppercase tracking-wider mb-1.5 block">{label}</label>
      <div className="relative">
        {Icon && <Icon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />}
        <input type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          {...register(name)}
          placeholder={placeholder}
          className={`w-full ${Icon ? 'pl-11' : 'pl-4'} pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none transition-all ${errors[name] ? 'border-red-500' : 'border-white/10 focus:border-[#C9A84C]'
            }`}
        />
        {name === 'password' && (
          <button type="button" onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {errors[name] && <p className="text-red-400 text-xs mt-1">{errors[name].message}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#060F18] flex">
      {/* Left branding */}
      <div className="hidden lg:flex lg:w-2/5 relative overflow-hidden flex-col justify-center items-center p-12">
        <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80" alt="Luxury car"
          className="absolute inset-0 w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-[#0D1B2A]/80" />
        <div className="relative z-10 space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#C9A84C] flex items-center justify-center mx-auto">
            <Car size={32} className="text-[#0D1B2A]" />
          </div>
          <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
            Join McGrow Al Zayani
          </h2>
          <div className="space-y-3 text-left">
            {['Access exclusive member rates', 'Faster checkout experience', 'Track all your bookings', 'Priority customer support'].map((b) => (
              <div key={b} className="flex items-center gap-3 text-gray-300 text-sm">
                <Check size={16} className="text-[#C9A84C] flex-shrink-0" /> {b}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6 lg:hidden">
              <div className="w-10 h-10 rounded-xl bg-[#C9A84C] flex items-center justify-center">
                <Car size={20} className="text-[#0D1B2A]" />
              </div>
              <p className="text-white font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>McGrow Al Zayani</p>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-gray-400">Start your premium car rental experience</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="First Name" name="firstName" placeholder="John" icon={User} />
              <Field label="Last Name" name="lastName" placeholder="Doe" icon={User} />
            </div>
            <Field label="Email Address" name="email" type="email" placeholder="your@email.com" icon={Mail} />
            <Field label="Phone Number" name="phone" type="tel" placeholder="+973 1234 5678" icon={Phone} />
            <Field label="Password" name="password" type="password" placeholder="At least 8 characters" icon={Lock} />
            <Field label="Confirm Password" name="confirmPassword" type="password" placeholder="Repeat your password" icon={Lock} />

            <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-[#C9A84C] text-[#0D1B2A] font-bold rounded-xl hover:bg-[#E8C97A] transition-all disabled:opacity-60 flex items-center justify-center gap-2 mt-2">
              {loading ? (
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : 'Create Account'}
            </motion.button>

            <p className="text-center text-gray-400 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-[#C9A84C] hover:underline font-medium">Sign in</Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
