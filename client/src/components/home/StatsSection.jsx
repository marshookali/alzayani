import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, MapPin, Headphones } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 500, suffix: '+', label: 'Vehicles Available', icon: '🚗' },
  { value: 50000, suffix: '+', label: 'Happy Customers', icon: '😊' },
  { value: 22, suffix: '+', label: 'Years Experience', icon: '🏆' },
  { value: 12, suffix: '', label: 'Pickup Locations', icon: '📍' },
];

const whyUs = [
  {
    icon: Shield,
    title: 'Fully Insured Fleet',
    desc: 'Every vehicle comes with comprehensive insurance coverage for your complete peace of mind.',
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    desc: 'We are always here. Book online or call us anytime for assistance and support.',
  },
  {
    icon: MapPin,
    title: 'Multiple Locations',
    desc: 'Convenient pickup and drop-off points across Bahrain including the airport.',
  },
  {
    icon: Headphones,
    title: 'Dedicated Support',
    desc: 'Our expert team is on hand to help with every aspect of your rental experience.',
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
              duration: 2,
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
    <section className="bg-[#0D1B2A] section-padding">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mb-24">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="flex items-center justify-center">
                <span
                  ref={(el) => (numbersRef.current[i] = el)}
                  className="text-4xl md:text-5xl font-bold text-white"
                >
                  0
                </span>
                <span className="text-4xl md:text-5xl font-bold text-[#C9A84C]">{stat.suffix}</span>
              </div>
              <p className="text-gray-400 mt-3 text-sm font-medium tracking-wide">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="text-center mb-14">
          <span className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase mb-2 block">Why Choose Us</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">The Al Zayani Difference</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          {whyUs.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-8 rounded-2xl border border-white/10 hover:border-[#C9A84C]/40 hover:bg-white/5 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#C9A84C]/20 flex items-center justify-center mb-4 group-hover:bg-[#C9A84C] transition-colors duration-300">
                <item.icon size={22} className="text-[#C9A84C] group-hover:text-[#0D1B2A] transition-colors" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
