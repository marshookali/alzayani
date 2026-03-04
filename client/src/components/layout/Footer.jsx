import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, Car } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#060F18] text-white">
      {/* Main footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="space-y-5">
            <Link to="/" className="flex items-center gap-3">
              <div className="bg-white rounded-xl p-1.5 shadow-sm inline-block">
                <img src="/logo.png" alt="McGrow Al Zayani Logo" className="h-10 sm:h-12 w-auto object-contain" />
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Bahrain's premier car rental service since 2002. We offer a premium fleet of vehicles with exceptional service and competitive rates.
            </p>
            <div className="flex items-center gap-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#C9A84C] flex items-center justify-center text-gray-400 hover:text-[#0D1B2A] transition-all duration-300 hover:scale-110"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', to: '/' },
                { label: 'Our Fleet', to: '/fleet' },
                { label: 'About Us', to: '/about' },
                { label: 'Blog & Tips', to: '/blog' },
                { label: 'Contact Us', to: '/contact' },
                { label: 'My Bookings', to: '/profile' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-[#C9A84C] text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#C9A84C] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[#C9A84C] mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  Building 123, Road 456<br />
                  Manama, Kingdom of Bahrain
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-[#C9A84C] flex-shrink-0" />
                <a href="tel:+97317123456" className="text-gray-400 text-sm hover:text-[#C9A84C] transition-colors">
                  +973 1712 3456
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[#C9A84C] flex-shrink-0" />
                <a href="mailto:info@alzayani.bh" className="text-gray-400 text-sm hover:text-[#C9A84C] transition-colors">
                  info@alzayani.bh
                </a>
              </li>
            </ul>
            <div className="mt-5 p-3 rounded-lg border border-white/10">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Working Hours</p>
              <p className="text-sm text-gray-300">Mon – Sat: 8:00 AM – 8:00 PM</p>
              <p className="text-sm text-gray-300">Sunday: 10:00 AM – 6:00 PM</p>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe for exclusive deals, new additions to our fleet, and travel tips.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
              />
              <button
                type="submit"
                className="w-full py-3 bg-[#C9A84C] text-[#0D1B2A] rounded-lg font-semibold text-sm hover:bg-[#E8C97A] transition-all duration-300 hover:scale-[1.02]"
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
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © {currentYear} McGrow Al Zayani Car Rental. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
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
