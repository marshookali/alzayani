import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageSquare } from 'lucide-react';
import { contactSchema } from '../utils/validators';

const subjects = ['General Inquiry', 'Booking Question', 'Vehicle Information', 'Complaint', 'Partnership', 'Other'];

const contactItems = [
  { icon: MapPin, label: 'Address', value: 'Building 123, Road 456\nManama, Kingdom of Bahrain', color: '#3B82F6' },
  { icon: Phone, label: 'Phone', value: '+973 1712 3456\n+973 1712 3457', href: 'tel:+97317123456', color: '#10B981' },
  { icon: Mail, label: 'Email', value: 'info@alzayani.bh\nsupport@alzayani.bh', href: 'mailto:info@alzayani.bh', color: '#F59E0B' },
  { icon: Clock, label: 'Hours', value: 'Mon–Sat: 8:00 AM – 8:00 PM\nSunday: 10:00 AM – 6:00 PM', color: '#8B5CF6' },
];

const Contact = () => {
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setSuccess(true);
    reset();
    setTimeout(() => setSuccess(false), 5000);
  };

  const fieldCls = (name) =>
    `input-light ${errors[name] ? 'border-red-400 focus:border-red-400 bg-red-50/50' : ''}`;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-navy relative overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 left-1/3 w-96 h-96 rounded-full bg-[#C9A84C]/6 blur-[70px]" />
        </div>
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
            <div className="section-label">Get in Touch</div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-3">Contact Us</h1>
            <p className="text-gray-400 text-lg">We're here to help — reach out anytime.</p>
          </motion.div>
        </div>
      </div>

      <div className="section-padding bg-[#F8F8F6]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* Left: Contact Info */}
            <div className="lg:col-span-2 space-y-5">
              {/* Info Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-navy rounded-3xl p-8 relative overflow-hidden"
              >
                <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full bg-[#C9A84C]/8 blur-2xl pointer-events-none" />
                <h2 className="text-xl font-bold text-white mb-7 relative z-10">Contact Information</h2>
                <div className="space-y-5 relative z-10">
                  {contactItems.map(({ icon: Icon, label, value, href, color }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}20` }}>
                        <Icon size={16} style={{ color }} />
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wider mb-0.5">{label}</p>
                        {href ? (
                          <a href={href} className="text-white text-sm whitespace-pre-line hover:text-[#C9A84C] transition-colors">{value}</a>
                        ) : (
                          <p className="text-white text-sm whitespace-pre-line">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden shadow-md h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14451.23!2d50.5873!3d26.2172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49af9000000001%3A0x0!2sManama%2C%20Bahrain!5e0!3m2!1sen!2s!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="McGrow Al Zayani Location"
                />
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-10"
              >
                <div className="flex items-center gap-3 mb-7">
                  <div className="w-10 h-10 rounded-xl bg-[#0A1628]/6 flex items-center justify-center">
                    <MessageSquare size={18} className="text-[#0A1628]" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Send Us a Message</h2>
                </div>

                <AnimatePresence>
                  {success && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3 p-4 bg-green-50 border border-green-200/60 rounded-2xl mb-6 text-green-700"
                    >
                      <CheckCircle size={18} />
                      <span className="text-sm font-medium">Message sent! We'll get back to you within 24 hours.</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Full Name *</label>
                      <input {...register('name')} placeholder="John Doe" className={fieldCls('name')} />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Email *</label>
                      <input {...register('email')} type="email" placeholder="your@email.com" className={fieldCls('email')} />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Phone</label>
                      <input {...register('phone')} type="tel" placeholder="+973 1234 5678" className="input-light" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Subject *</label>
                      <select {...register('subject')} className={fieldCls('subject')}>
                        <option value="">Select a subject…</option>
                        {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Message *</label>
                    <textarea
                      {...register('message')}
                      rows={5}
                      placeholder="How can we help you? Describe your inquiry in detail…"
                      className={`${fieldCls('message')} resize-none`}
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gradient-to-r from-[#0A1628] to-[#112240] text-white font-bold rounded-2xl flex items-center justify-center gap-2.5 hover:shadow-xl transition-all disabled:opacity-60"
                  >
                    {submitting ? (
                      <><svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg> Sending…</>
                    ) : (
                      <><Send size={17} /> Send Message</>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
