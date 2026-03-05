import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Phone, Eye, EyeOff, ArrowRight, Check } from 'lucide-react';
import { registerSchema } from '../utils/validators';
import { setCredentials } from '../store/authSlice';

const benefits = [
  'Access exclusive member rates',
  'Faster checkout experience',
  'Track all your bookings',
  'Priority customer support',
];

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    const mockUser = {
      id: Date.now().toString(),
      firstName: data.firstName, lastName: data.lastName,
      email: data.email, phone: data.phone,
    };
    dispatch(setCredentials({ user: mockUser, token: 'mock-jwt-token-' + Date.now() }));
    navigate('/');
    setLoading(false);
  };

  const Field = ({ label, name, type = 'text', placeholder, icon: Icon, showToggle }) => (
    <div>
      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">{label}</label>
      <div className="relative">
        {Icon && <Icon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />}
        <input
          type={showToggle ? (showPassword ? 'text' : 'password') : type}
          {...register(name)}
          placeholder={placeholder}
          className={`input-dark ${Icon ? 'pl-11' : 'pl-4'} ${showToggle ? 'pr-11' : ''} ${errors[name] ? 'border-red-400/70' : ''}`}
        />
        {showToggle && (
          <button type="button" onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors">
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {errors[name] && <p className="text-red-400 text-xs mt-1">{errors[name].message}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#060D1A] flex">
      {/* Left branding */}
      <div className="hidden lg:flex lg:w-[42%] relative overflow-hidden flex-col justify-between p-14">
        <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80" alt="Luxury car"
          className="absolute inset-0 w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628]/95 via-[#0A1628]/80 to-[#112240]/70" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-reg" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-reg)" />
        </svg>
        <div className="absolute -top-24 right-8 w-80 h-80 rounded-full bg-[#C9A84C]/6 blur-3xl pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10">
          <div className="bg-white/95 rounded-xl p-1.5 inline-block">
            <img src="/logo.png" alt="McGrow Al Zayani" className="h-11 w-auto object-contain" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-white mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
            Join <span className="text-gold-gradient">McGrow</span><br />Al Zayani
          </h2>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">Create your account and unlock premium benefits.</p>
          <div className="space-y-3">
            {benefits.map((b) => (
              <div key={b} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#C9A84C]/15 flex items-center justify-center flex-shrink-0">
                  <Check size={12} className="text-[#C9A84C]" />
                </div>
                <span className="text-gray-400 text-sm">{b}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-gray-600 text-xs">© {new Date().getFullYear()} McGrow Al Zayani Car Rental</p>
      </div>

      {/* Right: Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-14 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-[460px]"
        >
          {/* Mobile logo */}
          <div className="mb-7 lg:hidden">
            <div className="bg-white/95 rounded-xl p-1.5 inline-block">
              <img src="/logo.png" alt="Logo" className="h-9 w-auto object-contain" />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-1.5">Create Account</h2>
            <p className="text-gray-500 text-sm">Start your premium car rental experience</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="First Name" name="firstName" placeholder="John" icon={User} />
              <Field label="Last Name" name="lastName" placeholder="Doe" icon={User} />
            </div>
            <Field label="Email Address" name="email" type="email" placeholder="your@email.com" icon={Mail} />
            <Field label="Phone Number" name="phone" type="tel" placeholder="+973 1234 5678" icon={Phone} />
            <Field label="Password" name="password" type="password" placeholder="At least 8 characters" icon={Lock} showToggle />
            <Field label="Confirm Password" name="confirmPassword" type="password" placeholder="Repeat your password" icon={Lock} />

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-[#C9A84C] to-[#E8C97A] text-[#0A1628] font-bold rounded-2xl flex items-center justify-center gap-2.5 hover:shadow-[0_8px_30px_rgba(201,168,76,0.45)] transition-all disabled:opacity-60 mt-2"
            >
              {loading ? (
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <>Create Account <ArrowRight size={17} /></>
              )}
            </motion.button>

            <p className="text-center text-gray-500 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-[#C9A84C] hover:underline font-semibold">Sign in</Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
