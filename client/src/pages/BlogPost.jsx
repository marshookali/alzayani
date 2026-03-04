import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Tag, User, ArrowLeft, Facebook, Twitter, Linkedin } from 'lucide-react';
import { blogPosts } from '../data/mockData';

const blogContent = {
  'top-5-road-trips-from-bahrain': `
## Exploring Beyond the City

Bahrain may be a small island, but it offers surprisingly diverse landscapes for road trippers. Here are our top 5 picks:

### 1. The Tree of Life
This ancient mesquite tree stands alone in the desert, approximately 2km from Jaww. A mysterious landmark that has survived for 400 years without an obvious water source. Best visited in the early morning for the most stunning light.

### 2. Hawar Islands
While technically requiring a boat, renting a car to reach the causeway and ferry terminal opens up this stunning archipelago. Home to rare bird species and pristine beaches.

### 3. Al Areen Wildlife Park
A great family destination, the park houses Arabian oryx, flamingos, and various desert animals. Located in the southern governorate, it's about a 30-minute drive from Manama.

### 4. Riffa Fort
Perched atop a hill with panoramic views, Riffa Fort is one of Bahrain's most significant historical sites. The drive through Riffa town itself is charming.

### 5. Royal Camel Farm
A unique experience where you can get up close with these majestic animals. Located near Janabiyah, it's a must-visit for photography enthusiasts.

## Tips for Your Road Trip

- Book your rental in advance, especially during holidays
- Always carry water and sunscreen
- Check road conditions before heading to desert areas
- GPS is highly recommended for off-road adventures
  `,
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);
  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">📝</div>
          <h2 className="text-2xl font-bold mb-2">Article not found</h2>
          <Link to="/blog" className="text-[#C9A84C] hover:underline">Back to Blog</Link>
        </div>
      </div>
    );
  }

  const content = blogContent[slug] || `${post.excerpt}\n\nThis is a sample article. Full content will be available when the backend is connected. Stay tuned for more insights and tips from the McGrow Al Zayani team.`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/90 via-[#0D1B2A]/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 pt-28">
          <div className="container-custom">
            <Link to="/blog" className="inline-flex items-center gap-2 text-gray-300 hover:text-[#C9A84C] text-sm mb-4 transition-colors">
              <ArrowLeft size={16} /> Back to Blog
            </Link>
            <span className="inline-block px-3 py-1 bg-[#C9A84C] text-[#0D1B2A] rounded-full text-xs font-bold mb-3">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-white max-w-3xl">{post.title}</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-12 max-w-4xl">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-5 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-200">
          <span className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#0D1B2A] text-white flex items-center justify-center text-xs font-bold">
              {post.author[0]}
            </div>
            {post.author}
          </span>
          <span className="flex items-center gap-1.5"><Tag size={14} /> {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          <span className="flex items-center gap-1.5"><Clock size={14} /> {post.readTime}</span>
        </div>

        {/* Article body */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4"
        >
          {content.split('\n').map((line, i) => {
            if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold text-[#0D1B2A] mt-8 mb-4">{line.slice(3)}</h2>;
            if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold text-[#0D1B2A] mt-6 mb-3">{line.slice(4)}</h3>;
            if (line.startsWith('- ')) return <li key={i} className="ml-5 text-gray-600">{line.slice(2)}</li>;
            if (line.trim()) return <p key={i} className="text-gray-700">{line}</p>;
            return null;
          })}
        </motion.div>

        {/* Share */}
        <div className="mt-10 pt-8 border-t border-gray-200">
          <p className="text-sm font-semibold text-gray-700 mb-3">Share this article</p>
          <div className="flex gap-3">
            {[
              { icon: Facebook, label: 'Facebook', color: 'hover:bg-blue-600' },
              { icon: Twitter, label: 'Twitter', color: 'hover:bg-sky-500' },
              { icon: Linkedin, label: 'LinkedIn', color: 'hover:bg-blue-700' },
            ].map(({ icon: Icon, label, color }) => (
              <button key={label} className={`flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:text-white transition-all duration-300 ${color}`}>
                <Icon size={16} /> {label}
              </button>
            ))}
          </div>
        </div>

        {/* Related Posts */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map((p) => (
                <Link key={p.id} to={`/blog/${p.slug}`} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100">
                  <img src={p.image} alt={p.title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="p-4">
                    <span className="text-[#C9A84C] text-xs font-semibold">{p.category}</span>
                    <h3 className="font-bold text-gray-900 mt-1 group-hover:text-[#C9A84C] transition-colors">{p.title}</h3>
                    <p className="text-gray-400 text-xs mt-1">{p.readTime}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPost;
