import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Car } from 'lucide-react';
import { loginSchema } from '../utils/validators';
import { setCredentials } from '../store/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [shake, setShake] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setAuthError('');
    await new Promise((r) => setTimeout(r, 1000));

    // Mock auth — accept any valid email/password combination
    if (data.email && data.password.length >= 6) {
      const mockUser = {
        id: '1',
        firstName: 'Demo',
        lastName: 'User',
        email: data.email,
        phone: '+973 1234 5678',
      };
      dispatch(setCredentials({ user: mockUser, token: 'mock-jwt-token-' + Date.now() }));
      navigate(from, { replace: true });
    } else {
      setAuthError('Invalid email or password');
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#060F18] flex">
      {/* Left: Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-center items-center p-12">
        <img
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80"
          alt="Car"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B2A]/90 to-[#0D1B2A]/60" />
        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[#C9A84C] flex items-center justify-center">
              <Car size={32} className="text-[#0D1B2A]" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            McGrow Al Zayani
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-md">
            Bahrain's premier car rental service. Premium vehicles, exceptional service.
          </p>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <motion.div
          animate={shake ? { x: [-8, 8, -8, 8, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6 lg:hidden">
              <div className="w-10 h-10 rounded-xl bg-[#C9A84C] flex items-center justify-center">
                <Car size={20} className="text-[#0D1B2A]" />
              </div>
              <div>
                <p className="text-white font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>McGrow</p>
                <p className="text-[#C9A84C] text-xs tracking-widest uppercase">Al Zayani</p>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Welcome back</h2>
            <p className="text-gray-400">Sign in to your account to manage bookings</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Error */}
            <AnimatePresence>
              {authError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm"
                >
                  {authError}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email */}
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider mb-1.5 block">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  {...register('email')}
                  placeholder="your@email.com"
                  className={`w-full pl-11 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none transition-all ${errors.email ? 'border-red-500' : 'border-white/10 focus:border-[#C9A84C] focus:bg-white/8'
                    }`}
                />
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider mb-1.5 block">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  placeholder="Your password"
                  className={`w-full pl-11 pr-12 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none transition-all ${errors.password ? 'border-red-500' : 'border-white/10 focus:border-[#C9A84C]'
                    }`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
              className="w-full py-4 bg-[#C9A84C] text-[#0D1B2A] font-bold rounded-xl hover:bg-[#E8C97A] transition-all disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : 'Sign In'}
            </motion.button>

            <p className="text-center text-gray-400 text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#C9A84C] hover:underline font-medium">Create account</Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
