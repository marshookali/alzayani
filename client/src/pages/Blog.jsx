import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Tag, User, ArrowRight } from 'lucide-react';
import { blogPosts } from '../data/mockData';

const categories = ['All', 'Travel Tips', 'Guides', 'Family Travel', 'Industry News'];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All' ? blogPosts : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-[#0D1B2A] pt-28 pb-14">
        <div className="container-custom">
          <span className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase mb-3 block">Our Blog</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Tips, Guides & News</h1>
          <p className="text-gray-400 text-lg max-w-xl">
            Stay informed with travel tips, car guides, and the latest news from the world of car rental.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${cat === activeCategory
                    ? 'bg-[#C9A84C] text-[#0D1B2A]'
                    : 'border border-white/20 text-white/70 hover:border-[#C9A84C] hover:text-[#C9A84C]'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#C9A84C] text-[#0D1B2A] rounded-full text-xs font-bold">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                    <span className="flex items-center gap-1">
                      <User size={12} /> {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Tag size={12} /> {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#C9A84C] transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-2">{post.excerpt}</p>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-[#0D1B2A] font-semibold text-sm hover:text-[#C9A84C] transition-colors group/link"
                  >
                    Read Article
                    <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
