import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Heart, Users, Leaf, ArrowRight, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const values = [
  { icon: Award, title: 'Excellence', desc: 'We set the highest standards in everything we do — from fleet quality to the service we deliver.', color: '#F59E0B' },
  { icon: Heart, title: 'Passion', desc: 'We love cars and love helping people find their perfect vehicle for every occasion.', color: '#EF4444' },
  { icon: Users, title: 'People First', desc: 'Our customers are at the heart of every decision. We go above and beyond to exceed expectations.', color: '#3B82F6' },
  { icon: Leaf, title: 'Sustainability', desc: 'Committed to growing our hybrid and electric fleet to reduce our environmental impact.', color: '#22C55E' },
];

const stats = [
  { value: '500+', label: 'Vehicles' },
  { value: '50K+', label: 'Happy Customers' },
  { value: '22+', label: 'Years Experience' },
  { value: '12', label: 'Locations' },
];

const milestones = [
  { year: '2002', title: 'Founded', desc: 'Started with 20 vehicles and a vision to redefine car rental in Bahrain.' },
  { year: '2008', title: 'Expansion', desc: 'Opened our second and third branches across Manama and Muharraq.' },
  { year: '2015', title: 'Fleet of 200+', desc: 'Grew to over 200 premium vehicles, serving 10,000+ annual customers.' },
  { year: '2024', title: 'Market Leader', desc: '500+ vehicles, 12 locations, and Bahrain\'s most trusted rental brand.' },
];

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[75vh] min-h-[520px] overflow-hidden flex items-center">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=90"
          alt="About hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/95 via-[#0A1628]/65 to-[#0A1628]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/60 via-transparent to-transparent" />

        <div className="container-custom relative z-10 pt-24">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="max-w-2xl"
          >
            <div className="section-label">Our Story</div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-5 leading-[1.08]">
              Driving Bahrain<br />
              <span className="text-gold-gradient">Forward</span>
            </h1>
            <div className="divider-gold" />
            <p className="text-white/75 text-xl leading-relaxed max-w-lg">
              For over 22 years, McGrow Al Zayani has been the trusted name for premium car rentals across the Kingdom of Bahrain.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="section-label">About Us</div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#0A1628] mb-4">A Legacy of<br />Excellence</h2>
              <div className="divider-gold" />
              <div className="space-y-4 text-gray-500 leading-relaxed text-sm">
                <p>
                  Founded in 2002 by the Al Zayani family, McGrow started with a small fleet of 20 vehicles and a big dream: to redefine car rental in Bahrain. Today, with over 500 vehicles and 12 locations, we are the Kingdom's most trusted car rental brand.
                </p>
                <p>
                  Over two decades, we have served government officials, corporate clients, tourists, and everyday families. Our diverse fleet ranges from budget-friendly economy cars to exotic luxury vehicles.
                </p>
                <p>
                  We take pride in our commitment to safety, reliability, and exceptional customer service — every vehicle is meticulously maintained and fully insured.
                </p>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                {['ISO Certified', 'Award Winning', 'Fully Insured', '24/7 Support'].map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0A1628] bg-gray-50 border border-gray-100 px-3 py-2 rounded-xl">
                    <CheckCircle size={11} className="text-[#C9A84C]" /> {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80"
                alt="Our showroom"
                className="w-full rounded-3xl shadow-2xl object-cover aspect-[4/3]"
              />
              {/* Float badge */}
              <div className="absolute -bottom-6 -left-5 bg-gradient-to-br from-[#C9A84C] to-[#9A7A32] text-[#0A1628] p-6 rounded-2xl shadow-xl">
                <p className="text-4xl font-bold">22+</p>
                <p className="text-xs font-bold mt-0.5 opacity-80">Years of Excellence</p>
              </div>
              {/* Second float badge */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
                <p className="text-2xl font-bold text-[#0A1628]">500+</p>
                <p className="text-xs text-gray-500 mt-0.5">Premium Vehicles</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-gradient-navy py-16">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl border border-white/8 bg-white/3"
              >
                <p className="text-4xl md:text-5xl font-bold text-gold-gradient">{stat.value}</p>
                <p className="text-gray-400 mt-2 text-sm font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-[#F8F8F6]">
        <div className="container-custom">
          <div className="text-center mb-14">
            <div className="section-label mx-auto">Our Journey</div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A1628]">Key Milestones</h2>
          </div>
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#C9A84C]/60 via-[#C9A84C]/20 to-transparent hidden md:block" />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center gap-6 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right md:pr-10' : 'md:pl-10'}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                      <span className="text-[#C9A84C] font-bold text-sm">{m.year}</span>
                      <h3 className="text-lg font-bold text-[#0A1628] mt-1 mb-2">{m.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                  {/* Dot */}
                  <div className="hidden md:flex w-4 h-4 rounded-full bg-[#C9A84C] border-4 border-white shadow-md flex-shrink-0 z-10" />
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <div className="section-label mx-auto">What We Believe</div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A1628]">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-7 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-400 bg-white relative overflow-hidden"
              >
                <div
                  className="absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ background: val.color, transform: 'translate(30%, -30%)' }}
                />
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: `${val.color}18` }}>
                  <val.icon size={22} style={{ color: val.color }} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{val.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-navy relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 left-1/4 w-[400px] h-[400px] rounded-full bg-[#C9A84C]/6 blur-[80px]" />
        </div>
        <div className="container-custom text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Ready to Experience<br />the Difference?</h2>
          <p className="text-gray-400 mb-8 text-lg max-w-md mx-auto">Join over 50,000 satisfied customers across Bahrain.</p>
          <Link to="/fleet" className="btn-primary inline-flex text-base px-8 py-4">
            Reserve Your Car <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
