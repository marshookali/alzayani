import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Heart, Users, Leaf, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const values = [
  { icon: Award, title: 'Excellence', desc: 'We set the highest standards in everything we do — from the vehicles we offer to the service we provide.' },
  { icon: Heart, title: 'Passion', desc: 'We love cars and we love helping people find their perfect vehicle for every occasion.' },
  { icon: Users, title: 'People First', desc: 'Our customers are at the heart of every decision. We go above and beyond to exceed expectations.' },
  { icon: Leaf, title: 'Sustainability', desc: 'We are committed to growing our hybrid and electric fleet to reduce our environmental impact.' },
];

const stats = [
  { value: '500+', label: 'Vehicles' },
  { value: '50K+', label: 'Happy Customers' },
  { value: '22+', label: 'Years Experience' },
  { value: '12', label: 'Locations' },
];

const About = () => {
  const statsRef = useRef([]);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden flex items-center">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=90"
          alt="About hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B2A]/90 to-[#0D1B2A]/50" />
        <div className="container-custom relative z-10 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase mb-3 block">
              Our Story
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-5">
              Driving Bahrain Forward
            </h1>
            <p className="text-white/80 text-xl leading-relaxed">
              For over 22 years, McGrow Al Zayani has been the trusted name for premium car rentals across the Kingdom of Bahrain.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase mb-3 block">About Us</span>
              <h2 className="text-4xl font-bold text-[#0D1B2A] mb-6">A Legacy of Excellence</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2002 by the Al Zayani family, McGrow started with a small fleet of 20 vehicles and a big dream: to redefine car rental in Bahrain. Today, with over 500 vehicles and 12 locations, we are proud to be the Kingdom's most trusted car rental brand.
                </p>
                <p>
                  Over the past two decades, we have served government officials, corporate clients, tourists, and everyday families. Our diverse fleet ranges from budget-friendly economy cars to exotic luxury vehicles, ensuring we have the perfect car for every need and budget.
                </p>
                <p>
                  We take pride in our commitment to safety, reliability, and exceptional customer service. Every vehicle in our fleet is meticulously maintained and fully insured, giving you complete peace of mind.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80"
                alt="Our showroom"
                className="w-full rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#C9A84C] text-[#0D1B2A] p-6 rounded-2xl shadow-xl">
                <p className="text-4xl font-bold">22+</p>
                <p className="text-sm font-semibold mt-1">Years of Excellence</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#0D1B2A] py-16">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-bold text-[#C9A84C]">{stat.value}</p>
                <p className="text-gray-400 mt-2 text-sm font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase mb-3 block">What We Believe</span>
            <h2 className="text-4xl font-bold text-[#0D1B2A]">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0D1B2A] flex items-center justify-center mb-4 group-hover:bg-[#C9A84C] transition-colors">
                  <val.icon size={22} className="text-white group-hover:text-[#0D1B2A] transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{val.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-[#0D1B2A]">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Experience the Difference?</h2>
          <p className="text-gray-400 mb-8 text-lg">Join over 50,000 satisfied customers across Bahrain</p>
          <Link to="/fleet" className="btn-sweep inline-flex items-center gap-2 px-8 py-4 bg-[#C9A84C] text-[#0D1B2A] font-bold rounded-xl hover:bg-[#E8C97A] transition-all hover:scale-105">
            Reserve Your Car <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
