import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import { Menu, X, ChevronDown, User, LogOut, Settings, Phone } from 'lucide-react';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Fleet', to: '/fleet' },
  { label: 'About', to: '/about' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setUserMenuOpen(false);
    navigate('/');
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'glass-dark shadow-2xl py-3' : 'bg-transparent py-5'
          }`}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="bg-white/95 rounded-xl p-1.5 group-hover:scale-105 transition-transform duration-300 shadow-md">
              <img src="/logo.png" alt="McGrow Al Zayani Logo" className="h-10 sm:h-11 w-auto object-contain" />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isActive
                    ? 'text-[#C9A84C]'
                    : 'text-white/85 hover:text-white hover:bg-white/8'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#C9A84C]"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-2">
            <a
              href="tel:+97317123456"
              className="flex items-center gap-1.5 text-white/70 hover:text-white text-xs font-medium px-3 py-2 rounded-lg hover:bg-white/8 transition-all"
            >
              <Phone size={13} className="text-[#C9A84C]" />
              +973 1712 3456
            </a>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 text-white hover:text-[#C9A84C] px-3 py-2 rounded-xl text-sm font-medium transition-all bg-white/8 hover:bg-white/14 border border-white/10"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#9A7A32] flex items-center justify-center ring-2 ring-[#C9A84C]/30">
                    <span className="text-[#0A1628] text-xs font-bold">
                      {user?.firstName?.[0]}{user?.lastName?.[0]}
                    </span>
                  </div>
                  {user?.firstName}
                  <ChevronDown size={14} className={`transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                      onMouseLeave={() => setUserMenuOpen(false)}
                    >
                      <div className="p-1">
                        <Link to="/profile" onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                          <User size={15} className="text-gray-400" /> My Profile
                        </Link>
                        <Link to="/profile?tab=bookings" onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                          <Settings size={15} className="text-gray-400" /> My Bookings
                        </Link>
                        <div className="h-px bg-gray-100 mx-2 my-1" />
                        <button onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                          <LogOut size={15} /> Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link to="/login"
                  className="text-white/80 hover:text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-white/8 transition-all">
                  Sign In
                </Link>
                <Link to="/register"
                  className="btn-primary text-sm px-5 py-2.5">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white p-2.5 rounded-xl hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            <motion.div animate={{ rotate: mobileOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.div>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 380, damping: 38 }}
              className="fixed top-0 right-0 bottom-0 w-[300px] bg-gradient-navy z-50 lg:hidden flex flex-col overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/8">
                <div className="bg-white/10 rounded-xl p-2">
                  <img src="/logo.png" alt="Logo" className="h-8 w-auto object-contain" />
                </div>
                <button onClick={() => setMobileOpen(false)} className="text-white/60 hover:text-white transition-colors p-1">
                  <X size={22} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 p-5 space-y-1">
                {navLinks.map((link, i) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === '/'}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3.5 rounded-xl text-sm font-semibold transition-all ${isActive
                        ? 'bg-[#C9A84C] text-[#0A1628] shadow-md'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>

              {/* Phone */}
              <div className="px-5 pb-2">
                <a href="tel:+97317123456"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/6 text-white/70 text-sm font-medium">
                  <Phone size={14} className="text-[#C9A84C]" /> +973 1712 3456
                </a>
              </div>

              {/* Auth */}
              <div className="p-5 border-t border-white/8 space-y-2.5">
                {isAuthenticated ? (
                  <>
                    <Link to="/profile" onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 w-full px-4 py-3.5 bg-white/8 hover:bg-white/14 rounded-xl text-white text-sm font-medium transition-colors">
                      <User size={15} /> My Profile
                    </Link>
                    <button onClick={() => { handleLogout(); setMobileOpen(false); }}
                      className="flex items-center gap-3 w-full px-4 py-3.5 bg-red-500/15 rounded-xl text-red-400 text-sm font-medium hover:bg-red-500/25 transition-colors">
                      <LogOut size={15} /> Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center w-full px-4 py-3.5 border border-white/15 rounded-xl text-white text-sm font-medium hover:bg-white/8 transition-colors">
                      Sign In
                    </Link>
                    <Link to="/register" onClick={() => setMobileOpen(false)}
                      className="btn-primary w-full justify-center text-sm py-3.5">
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
