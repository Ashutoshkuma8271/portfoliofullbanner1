import React, { useState, useEffect } from 'react';
import { BLOG_POSTS } from '../data/folioData';
import { BlogPost } from '../types';
import { SkeletonImage } from '../components/SkeletonImage';
import { BookOpen, Search, ArrowRight, Clock, Calendar, Eye, Tag, X, Share2, CheckCircle2, Sparkles } from 'lucide-react';

interface BlogScreenProps {
  onOpenCollaborate: () => void;
}

export const BlogScreen: React.FC<BlogScreenProps> = ({ onOpenCollaborate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSent, setNewsletterSent] = useState(false);

  const [posts, setPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('zk_admin_posts');
    return saved ? JSON.parse(saved) : BLOG_POSTS;
  });

  useEffect(() => {
    const checkPosts = () => {
      const saved = localStorage.getItem('zk_admin_posts');
      if (saved) {
        try {
          setPosts(JSON.parse(saved));
        } catch {
          // ignore parsing error
        }
      }
    };
    window.addEventListener('storage', checkPosts);
    // Also re-check when component becomes visible
    checkPosts();
    return () => window.removeEventListener('storage', checkPosts);
  }, []);

  const categories = ['All', 'Trade & FDI', 'Cinema & Media', 'Women Leadership', 'Investment Advisory'];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSent(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 3500);
  };

  return (
    <div className="w-full min-h-screen bg-[#11100e] text-[#e5e2e3] overflow-x-hidden animate-page-enter">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-16 space-y-12 sm:space-y-16">
      {/* Header */}
      <section className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-5 border-b border-[#2e2617] pb-6 sm:pb-8">
        <div className="max-w-3xl space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1f1a14] border border-[#d4af37]/40 text-[#f2ca50] text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.22em] rounded-full shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#f2ca50]" />
            <span>Executive Thought Leadership</span>
          </div>
          <h1 className="font-['Cinzel'] text-[24px] sm:text-[34px] lg:text-[42px] font-normal leading-tight text-[#f4efe6]">
            Insights, Bilateral Gazettes &amp; <span className="italic font-serif text-[#f2ca50]">Monographs</span>
          </h1>
          <p className="font-['Montserrat'] text-[12.5px] sm:text-[14px] text-[#c8beaa] font-light leading-relaxed max-w-2xl">
            In-depth strategic analyses, statecraft whitepapers, and cultural commentary covering GCC–India trade corridors, transnational cinematic co-productions, and civic governance.
          </p>
        </div>

        {/* Search Input */}
        <div className="w-full lg:w-72 relative shrink-0">
          <Search className="w-4 h-4 text-[#99907c] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topics, keywords..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#1c1b1c] border border-[#4d4635] text-[12.5px] sm:text-[13px] text-[#e5e2e3] placeholder:text-[#99907c] focus:border-[#f2ca50] focus:outline-none rounded-lg shadow-inner transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#99907c] hover:text-[#f2ca50] p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </section>

      {/* Category Pills - Sleek Horizontal Scrolling on Mobile */}
      <section className="w-full overflow-x-auto no-scrollbar -mx-5 px-5 lg:mx-0 lg:px-0">
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-max pb-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 sm:px-4 py-2 rounded-lg font-sans text-[10.5px] sm:text-[11px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#d4af37] via-[#f2ca50] to-[#e6bc48] text-[#1a1402] shadow-[0_2px_12px_rgba(212,175,55,0.25)]'
                    : 'bg-[#1c1b1c] border border-[#4d4635]/60 text-[#d0c5af] hover:border-[#f2ca50]/70 hover:text-[#f4efe6]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="group bg-[#1c1b1c] border border-[#4d4635]/60 hover:border-[#f2ca50]/70 rounded-xl overflow-hidden shadow-xl transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="aspect-[16/9] overflow-hidden relative bg-[#14120f]">
                <SkeletonImage
                  src={post.image}
                  alt={post.title}
                  fallbackSrc="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1000&q=80"
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-105"
                />
                <div className="absolute top-3 left-3 px-3 py-1 bg-[#0e0e0f]/85 backdrop-blur-sm border border-[#f2ca50]/40 text-[#f2ca50] font-sans text-[10px] font-bold uppercase tracking-wider rounded z-10">
                  {post.category}
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-3">
                <div className="flex items-center gap-4 text-[11px] text-[#99907c] font-mono">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#f2ca50]" />
                    {post.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#e9c176]" />
                    {post.readTime}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    {post.views.toLocaleString()} reads
                  </span>
                </div>

                <h3
                  onClick={() => setActiveArticle(post)}
                  className="font-serif text-[22px] sm:text-[24px] text-[#e5e2e3] group-hover:text-[#f2ca50] transition-colors leading-snug cursor-pointer"
                >
                  {post.title}
                </h3>

                <p className="font-sans text-[14px] text-[#d0c5af] leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {post.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-[#0e0e0f] border border-[#4d4635]/40 text-[10px] text-[#ffdea5] rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 pt-0 border-t border-[#4d4635]/30 mt-4 flex items-center justify-between">
              <span className="font-sans text-[11px] text-[#99907c]">By {post.author}</span>
              <button
                onClick={() => setActiveArticle(post)}
                className="inline-flex items-center gap-2 font-sans text-[11px] font-bold text-[#f2ca50] hover:text-[#ffe088] uppercase tracking-widest transition-colors cursor-pointer"
              >
                Read Full Monograph
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </article>
        ))}
      </section>

      {/* Newsletter Subscription Box (Requested in Optional & Recommended 4️⃣) */}
      <section className="bg-gradient-to-br from-[#1c1b1c] to-[#0e0e0f] border border-[#d4af37]/40 rounded-xl p-8 sm:p-12 shadow-2xl space-y-6">
        <div className="max-w-2xl space-y-2">
          <span className="font-sans text-[11px] font-bold text-[#f2ca50] tracking-widest uppercase block">
            Executive Briefing Dispatch
          </span>
          <h3 className="font-serif text-[28px] sm:text-[34px] text-[#e5e2e3]">
            Subscribe to Confidential Trade &amp; Media Gazettes
          </h3>
          <p className="font-sans text-[14px] text-[#d0c5af]">
            Receive monthly ministerial briefs, investment corridor updates, and film festival market intelligence directly to your inbox.
          </p>
        </div>

        {newsletterSent ? (
          <div className="p-4 bg-[#122416] border border-[#2e5936] text-[#8ae899] rounded-lg flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#38b04a] shrink-0" />
            <span className="font-sans text-[13px]">
              Institutional verification confirmed. Welcome to the Executive Dispatch registry.
            </span>
          </div>
        ) : (
          <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3 max-w-xl">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
              placeholder="Enter institutional or official email"
              className="flex-1 bg-[#131314] border border-[#4d4635] px-4 py-3 text-[13px] text-[#e5e2e3] focus:border-[#f2ca50] focus:outline-none rounded"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-[#d4af37] to-[#f2ca50] text-[#1a1402] font-sans text-[11px] font-bold tracking-widest uppercase hover:from-[#ffe088] transition-all rounded whitespace-nowrap cursor-pointer shadow-md"
            >
              Subscribe Now
            </button>
          </form>
        )}
      </section>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#141312] border border-[#d4af37]/70 max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-xl p-6 sm:p-10 relative shadow-[0_0_50px_rgba(212,175,55,0.2)] space-y-6">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-5 right-5 text-[#d0c5af] hover:text-[#f2ca50] cursor-pointer p-1"
              aria-label="Close article"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-3">
              <span className="px-3 py-1 bg-[#f2ca50]/15 text-[#f2ca50] font-sans text-[10px] font-bold uppercase tracking-widest rounded border border-[#f2ca50]/30 inline-block">
                {activeArticle.category}
              </span>
              <h2 className="font-serif text-[28px] sm:text-[36px] text-[#e5e2e3] leading-snug">
                {activeArticle.title}
              </h2>
              <div className="flex items-center gap-4 text-[12px] text-[#99907c] font-mono border-b border-[#4d4635]/40 pb-4">
                <span>By {activeArticle.author}</span>
                <span>•</span>
                <span>{activeArticle.date}</span>
                <span>•</span>
                <span>{activeArticle.readTime}</span>
              </div>
            </div>

            <div className="aspect-[16/9] overflow-hidden rounded-lg bg-[#14120f]">
              <SkeletonImage
                src={activeArticle.image}
                alt={activeArticle.title}
                priority={true}
                containerClassName="w-full h-full"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="font-sans text-[15px] sm:text-[16px] text-[#d0c5af] leading-relaxed space-y-4 whitespace-pre-line">
              {activeArticle.content}
            </div>

            <div className="pt-6 border-t border-[#4d4635]/40 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#f2ca50]" />
                <span className="text-[12px] text-[#ffdea5]">
                  {activeArticle.tags.map((t) => `#${t}`).join(' ')}
                </span>
              </div>

              <button
                onClick={() => {
                  setActiveArticle(null);
                  onOpenCollaborate();
                }}
                className="px-6 py-2.5 bg-[#f2ca50] text-[#1a1402] font-sans text-[11px] font-bold uppercase tracking-widest hover:bg-[#ffe088] rounded cursor-pointer transition-colors"
              >
                Inquire on this Subject
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default BlogScreen;

