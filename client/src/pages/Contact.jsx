import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { contactSchema } from '../utils/validators';

const subjects = [
  'General Inquiry',
  'Booking Question',
  'Vehicle Information',
  'Complaint',
  'Partnership',
  'Other',
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

  const fieldCls = (name) => `w-full px-4 py-3 border rounded-xl text-sm text-gray-900 focus:outline-none transition-all ${errors[name] ? 'border-red-400 bg-red-50 focus:border-red-400' : 'border-gray-200 focus:border-[#0D1B2A] focus:ring-2 focus:ring-[#0D1B2A]/10'
    }`;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-[#0D1B2A] pt-28 pb-14">
        <div className="container-custom">
          <span className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase mb-3 block">Get in Touch</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Contact Us</h1>
          <p className="text-gray-400 text-lg">We're here to help — reach out anytime</p>
        </div>
      </div>

      <div className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Left: Contact Info + Map */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-[#0D1B2A] rounded-2xl p-7 text-white"
              >
                <h2 className="text-xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-5">
                  {[
                    { icon: MapPin, label: 'Address', value: 'Building 123, Road 456\nManama, Kingdom of Bahrain' },
                    { icon: Phone, label: 'Phone', value: '+973 1712 3456\n+973 1712 3457' },
                    { icon: Mail, label: 'Email', value: 'info@alzayani.bh\nsupport@alzayani.bh' },
                    { icon: Clock, label: 'Hours', value: 'Mon–Sat: 8:00 AM – 8:00 PM\nSunday: 10:00 AM – 6:00 PM' },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/20 flex items-center justify-center flex-shrink-0">
                        <Icon size={18} className="text-[#C9A84C]" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">{label}</p>
                        <p className="text-white text-sm whitespace-pre-line">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Map Embed */}
              <div className="rounded-2xl overflow-hidden shadow-md h-60">
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
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">Send Us a Message</h2>

                {/* Success Toast */}
                <AnimatePresence>
                  {success && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl mb-5 text-green-700"
                    >
                      <CheckCircle size={20} />
                      <span className="text-sm font-medium">Message sent! We'll get back to you within 24 hours.</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block">Full Name *</label>
                      <input {...register('name')} placeholder="John Doe" className={fieldCls('name')} />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block">Email *</label>
                      <input {...register('email')} type="email" placeholder="your@email.com" className={fieldCls('email')} />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block">Phone</label>
                      <input {...register('phone')} type="tel" placeholder="+973 1234 5678" className={fieldCls('phone')} />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block">Subject *</label>
                      <select {...register('subject')} className={fieldCls('subject')}>
                        <option value="">Select a subject...</option>
                        {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block">Message *</label>
                    <textarea
                      {...register('message')}
                      rows={5}
                      placeholder="How can we help you? Describe your inquiry in detail..."
                      className={`${fieldCls('message')} resize-none`}
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-[#0D1B2A] text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#1A2E44] transition-all disabled:opacity-60"
                  >
                    {submitting ? (
                      <><svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg> Sending...</>
                    ) : (
                      <><Send size={18} /> Send Message</>
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
