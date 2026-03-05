import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', to: '/' },
    { label: 'Our Fleet', to: '/fleet' },
    { label: 'About Us', to: '/about' },
    { label: 'Blog & Tips', to: '/blog' },
    { label: 'Contact Us', to: '/contact' },
    { label: 'My Bookings', to: '/profile' },
  ];

  const contactItems = [
    { icon: MapPin, label: 'Building 123, Road 456\nManama, Kingdom of Bahrain' },
    { icon: Phone, label: '+973 1712 3456', href: 'tel:+97317123456' },
    { icon: Mail, label: 'info@alzayani.bh', href: 'mailto:info@alzayani.bh' },
    { icon: Clock, label: 'Mon–Sat: 8AM–8PM\nSunday: 10AM–6PM' },
  ];

  return (
    <footer className="bg-[#060D1A] text-white relative overflow-hidden">
      {/* Decorative top border */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent" />

      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-[#C9A84C]/4 blur-[80px] pointer-events-none" />

      {/* Main content */}
      <div className="container-custom relative z-10 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Brand */}
          <div className="lg:col-span-1 space-y-5">
            <Link to="/">
              <div className="bg-white/95 rounded-xl p-1.5 inline-block shadow-sm hover:scale-105 transition-transform duration-300">
                <img src="/logo.png" alt="McGrow Al Zayani Logo" className="h-11 w-auto object-contain" />
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Bahrain's premier car rental service since 2002. Premium vehicles, exceptional service, competitive rates.
            </p>
            <div className="flex items-center gap-2.5">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#C9A84C] flex items-center justify-center text-gray-400 hover:text-[#0A1628] transition-all duration-300 hover:scale-110"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-[0.15em] mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-[#C9A84C] text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 text-[#C9A84C]" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-[0.15em] mb-5">Contact</h4>
            <ul className="space-y-4">
              {contactItems.map(({ icon: Icon, label, href }) => (
                <li key={label} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#C9A84C]/10 border border-[#C9A84C]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={13} className="text-[#C9A84C]" />
                  </div>
                  {href ? (
                    <a href={href} className="text-gray-400 hover:text-[#C9A84C] text-sm whitespace-pre-line transition-colors">
                      {label}
                    </a>
                  ) : (
                    <span className="text-gray-400 text-sm whitespace-pre-line">{label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-[0.15em] mb-5">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              Subscribe for exclusive deals, fleet updates, and travel tips.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2.5">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#C9A84C]/60 focus:bg-white/8 transition-all"
              />
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#C9A84C] to-[#E8C97A] text-[#0A1628] rounded-xl font-bold text-sm hover:opacity-90 transition-all duration-300 hover:scale-[1.02]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs text-center sm:text-left">
            © {currentYear} McGrow Al Zayani Car Rental. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {['Privacy Policy', 'Terms of Service', 'Sitemap'].map((item) => (
              <a key={item} href="#" className="text-gray-500 hover:text-[#C9A84C] text-xs transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
