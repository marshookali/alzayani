import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, MapPin, Headphones } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 500, suffix: '+', label: 'Vehicles in Fleet', icon: '🚗' },
  { value: 50000, suffix: '+', label: 'Happy Customers', icon: '⭐' },
  { value: 22, suffix: '+', label: 'Years of Excellence', icon: '🏆' },
  { value: 12, suffix: '', label: 'Pickup Locations', icon: '📍' },
];

const whyUs = [
  {
    icon: Shield,
    title: 'Fully Insured Fleet',
    desc: 'Every vehicle comes with comprehensive insurance coverage for your complete peace of mind.',
    color: '#3B82F6',
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    desc: 'Always here for you. Book online or call us anytime — day or night.',
    color: '#10B981',
  },
  {
    icon: MapPin,
    title: 'Multiple Locations',
    desc: 'Convenient pickup across Bahrain including the international airport.',
    color: '#F59E0B',
  },
  {
    icon: Headphones,
    title: 'Dedicated Support',
    desc: 'Our expert team is on hand to help with every aspect of your rental journey.',
    color: '#8B5CF6',
  },
];

const StatsSection = () => {
  const numbersRef = useRef([]);

  useEffect(() => {
    numbersRef.current.forEach((el, i) => {
      if (!el) return;
      const target = stats[i].value;
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.fromTo(
            { val: 0 },
            {
              val: target,
              duration: 2.2,
              ease: 'power2.out',
              onUpdate: function () {
                el.textContent = Math.round(this.targets()[0].val).toLocaleString();
              },
            }
          );
        },
      });
    });
  }, []);

  return (
    <section className="bg-gradient-navy relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1B3460]/40 blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C9A84C]/5 rounded-full blur-3xl" />
      </div>

      {/* Stats Grid */}
      <div className="container-custom relative z-10 py-20 md:py-28">
        <div className="text-center mb-16">
          <div className="section-label mx-auto">By the Numbers</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
            Al Zayani at a Glance
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-0">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: i * 0.1 }}
              className="relative group"
            >
              <div className="text-center p-8 rounded-2xl border border-white/8 hover:border-[#C9A84C]/30 bg-white/3 hover:bg-white/6 transition-all duration-500">
                <div className="text-3xl mb-4 filter drop-shadow-sm">{stat.icon}</div>
                <div className="flex items-baseline justify-center gap-0.5 mb-2">
                  <span
                    ref={(el) => (numbersRef.current[i] = el)}
                    className="text-4xl md:text-5xl font-bold text-white tracking-tight"
                  >
                    0
                  </span>
                  <span className="text-4xl md:text-5xl font-bold text-[#C9A84C]">{stat.suffix}</span>
                </div>
                <p className="text-gray-400 text-sm font-medium tracking-wide">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/6" />

      {/* Why Choose Us */}
      <div className="container-custom relative z-10 py-20 md:py-28">
        <div className="text-center mb-16">
          <div className="section-label mx-auto">Why Choose Us</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
            The Al Zayani Difference
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
            For over two decades, we have set the standard for premium car rental service in Bahrain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {whyUs.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: i * 0.1 }}
              className="group relative p-8 rounded-2xl border border-white/8 hover:border-[#C9A84C]/25 bg-white/3 hover:bg-white/5 transition-all duration-500 overflow-hidden"
            >
              {/* Colored glow bg */}
              <div
                className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-15 transition-opacity duration-500"
                style={{ background: item.color, transform: 'translate(30%, -30%)' }}
              />
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 flex-shrink-0 transition-all duration-400"
                style={{ background: `${item.color}20` }}
              >
                <item.icon size={22} style={{ color: item.color }} />
              </div>
              <h3 className="text-white font-semibold text-base mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
