import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Shield, Star, Clock } from 'lucide-react';
import { loginSchema } from '../utils/validators';
import { setCredentials } from '../store/authSlice';

const perks = [
  { icon: Shield, text: 'Secure & trusted platform' },
  { icon: Star, text: 'Exclusive member discounts' },
  { icon: Clock, text: 'Manage bookings anytime' },
];

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [shake, setShake] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data) => {
    setLoading(true);
    setAuthError('');
    await new Promise((r) => setTimeout(r, 1000));

    if (data.email && data.password.length >= 6) {
      const mockUser = {
        id: '1', firstName: 'Demo', lastName: 'User',
        email: data.email, phone: '+973 1234 5678',
      };
      dispatch(setCredentials({ user: mockUser, token: 'mock-jwt-token-' + Date.now() }));
      navigate(from, { replace: true });
    } else {
      setAuthError('Invalid email or password. Please try again.');
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#060D1A] flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden flex-col justify-between p-14">
        {/* BG Image */}
        <img
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1400&q=85"
          alt="Car"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628]/95 via-[#0A1628]/80 to-[#112240]/70" />

        {/* Grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-login" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-login)" />
        </svg>

        {/* Gold glow */}
        <div className="absolute -bottom-20 left-20 w-80 h-80 rounded-full bg-[#C9A84C]/10 blur-3xl pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10">
          <div className="bg-white/95 rounded-xl p-1.5 inline-block shadow-md">
            <img src="/logo.png" alt="McGrow Al Zayani" className="h-11 w-auto object-contain" />
          </div>
        </div>

        {/* Main text */}
        <div className="relative z-10">
          <h1 className="text-5xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
            Welcome Back<br />
            <span className="text-gold-gradient">to the Fleet</span>
          </h1>
          <p className="text-gray-300 text-base leading-relaxed mb-10 max-w-sm">
            Bahrain's premier car rental service. Sign in to access exclusive deals and manage your bookings.
          </p>

          <div className="space-y-3.5">
            {perks.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#C9A84C]/15 flex items-center justify-center flex-shrink-0">
                  <Icon size={15} className="text-[#C9A84C]" />
                </div>
                <span className="text-gray-400 text-sm">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="relative z-10">
          <p className="text-gray-600 text-xs">© {new Date().getFullYear()} McGrow Al Zayani Car Rental</p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-14">
        <motion.div
          animate={shake ? { x: [-8, 8, -8, 8, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="w-full max-w-[420px]"
        >
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="bg-white/95 rounded-xl p-1.5 inline-block">
              <img src="/logo.png" alt="Logo" className="h-9 w-auto object-contain" />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-1.5">Welcome back</h2>
            <p className="text-gray-500 text-sm">Sign in to your account to manage bookings</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <AnimatePresence>
              {authError && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-4 bg-red-500/10 border border-red-500/25 rounded-2xl text-red-400 text-sm"
                >
                  {authError}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email */}
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  {...register('email')}
                  placeholder="your@email.com"
                  className={`input-dark pl-11 ${errors.email ? 'border-red-400/70' : ''}`}
                />
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  placeholder="Your password"
                  className={`input-dark pl-11 pr-12 ${errors.password ? 'border-red-400/70' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-gray-400 text-sm cursor-pointer">
                <input type="checkbox" {...register('rememberMe')} className="w-4 h-4 rounded accent-[#C9A84C]" />
                Remember me
              </label>
              <a href="#" className="text-[#C9A84C] text-sm hover:underline">Forgot password?</a>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-[#C9A84C] to-[#E8C97A] text-[#0A1628] font-bold rounded-2xl flex items-center justify-center gap-2.5 hover:shadow-[0_8px_30px_rgba(201,168,76,0.45)] transition-all disabled:opacity-60 mt-1"
            >
              {loading ? (
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <>Sign In <ArrowRight size={17} /></>
              )}
            </motion.button>

            <p className="text-center text-gray-500 text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#C9A84C] hover:underline font-semibold">Create account</Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
