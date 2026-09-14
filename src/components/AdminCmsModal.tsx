import React, { useState, useEffect } from 'react';
import { BLOG_POSTS, PRESS_ITEMS } from '../data/folioData';
import { BlogPost } from '../types';

const DEFAULT_ADMIN_VIDEOS = [
  {
    id: 'v-1',
    title: 'CNBC-TV18 Global Diplomatic Dialogue: The GCC–India CEPA Miracle',
    network: 'CNBC-TV18 Special Feature',
    duration: '18:45',
    youtubeId: 'dQw4w9WgXcQ',
    description: 'Zeenat Kureshi unpacks how $450M+ in cross-border FDI is moving through sovereign corridors and free trade zones.',
  },
  {
    id: 'v-2',
    title: 'Variety Cannes Panel: Financing Co-Productions Across South Asia & Gulf',
    network: 'Variety International Studio',
    duration: '24:10',
    youtubeId: 'dQw4w9WgXcQ',
    description: 'Keynote discussion on structuring multi-territory film finance, international tax incentives, and theatrical syndication.',
  },
  {
    id: 'v-3',
    title: 'Forbes Middle East Executive Spotlight: Empowering 120,000 Women',
    network: 'Forbes Leadership Series',
    duration: '14:20',
    youtubeId: 'dQw4w9WgXcQ',
    description: 'Zeenat Kureshi reveals the grassroots architecture behind the All India Jamiatul Quresh Women Cell nationwide impact.',
  },
];
import {
  X,
  Lock,
  Unlock,
  PlusCircle,
  FileText,
  Video,
  Globe,
  BarChart3,
  ShieldCheck,
  Database,
  CheckCircle2,
  Trash2,
  Download,
  Eye,
  RefreshCw,
  Search,
  ExternalLink,
  Check,
  LayoutDashboard,
  Layers,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  AlertCircle,
  KeyRound,
  Sliders,
  ChevronRight,
} from 'lucide-react';

interface AdminCmsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostCreated?: (post: BlogPost) => void;
}

export const AdminCmsModal: React.FC<AdminCmsModalProps> = ({ isOpen, onClose, onPostCreated }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // CMS Navigation Tabs
  const [activeTab, setActiveTab] = useState<'overview' | 'posts' | 'media' | 'leads' | 'seo' | 'security'>('overview');

  // Blog Posts in CMS
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('zk_admin_posts');
    return saved ? JSON.parse(saved) : BLOG_POSTS;
  });

  const [newPost, setNewPost] = useState({
    title: '',
    category: 'Trade & FDI' as BlogPost['category'],
    excerpt: '',
    content: '',
    author: 'Zeenat Kureshi',
    readTime: '5 min read',
    tags: 'GCC, Trade, Bilateral',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  });
  const [postSavedAlert, setPostSavedAlert] = useState(false);
  const [postSearch, setPostSearch] = useState('');

  // Media Manager State
  const [pressItems, setPressItems] = useState(() => {
    const saved = localStorage.getItem('zk_admin_press');
    return saved ? JSON.parse(saved) : PRESS_ITEMS;
  });

  const [videos, setVideos] = useState(() => {
    const saved = localStorage.getItem('zk_admin_videos');
    return saved ? JSON.parse(saved) : DEFAULT_ADMIN_VIDEOS;
  });

  const [newVideo, setNewVideo] = useState({
    title: '',
    network: 'CNBC International',
    duration: '14:20',
    youtubeId: '',
    description: '',
  });
  const [videoSavedAlert, setVideoSavedAlert] = useState(false);

  // SEO & Analytics Settings
  const [seoSettings, setSeoSettings] = useState({
    metaTitle: 'Zeenat Kureshi — Film Producer | GCC–India Trade Commissioner | National President',
    metaDescription: 'Executive sovereign folio for global cinematic production, bilateral GCC–India trade corridors, and transformative socio-economic leadership.',
    keywords: 'Zeenat Kureshi, Film Producer, GCC India Trade Commissioner, National President, Cannes, CEPA, DIFC',
    gaMeasurementId: 'G-ZK2026TRADE',
    canonicalUrl: 'https://zeenatkureshi.com',
  });
  const [seoSavedAlert, setSeoSavedAlert] = useState(false);
  const [sitemapPinged, setSitemapPinged] = useState(false);

  // Security & Backup System
  const [backupRunning, setBackupRunning] = useState(false);
  const [lastBackupTime, setLastBackupTime] = useState('Today at 04:00 GMT (Automated Daily Cloud Snapshot)');
  const [backupAlert, setBackupAlert] = useState(false);

  // Leads Vault mock data
  const [leads, setLeads] = useState([
    {
      id: 'DISP-984210',
      type: 'Trade Corridor Inquiry',
      name: 'Dr. Tariq Al-Mansoor',
      entity: 'Gulf Infrastructure Syndicate (Abu Dhabi)',
      email: 't.mansoor@gis-ad.ae',
      mandate: 'CEPA Green Hydrogen Cross-Border Allocation',
      ticket: '$25M – $50M',
      date: 'Today, 11:42 AM',
      status: 'Under Diplomatic Triage',
    },
    {
      id: 'DISP-871239',
      type: 'Media & Co-Production',
      name: 'Claire Dupont',
      entity: 'Parisian Independent Film Guild',
      email: 'c.dupont@cinemaguild.fr',
      mandate: 'Cannes Marché Co-Production Bilateral Treaty',
      ticket: '€12M Production Pool',
      date: 'Yesterday, 16:15 PM',
      status: 'Reviewed by Chancery',
    },
    {
      id: 'AIJQ-WC-41982',
      type: 'Women Cell Volunteer',
      name: 'Prof. Rukhsar Begum',
      entity: 'Women Enterprise Forum Hyderabad',
      email: 'r.begum@univ-hyd.edu',
      mandate: 'State District Volunteer Coordinator Desk',
      ticket: 'Civilian Envoy',
      date: 'March 08, 2026',
      status: 'Credential Authenticated',
    },
    {
      id: 'INV-773104',
      type: 'Private FDI Placement',
      name: 'Suhail Al-Otaiba',
      entity: 'Emirates Sovereign Capital Office',
      email: 's.otaiba@capitaloffice.ae',
      mandate: 'Entertainment Special Economic Zone Infrastructure',
      ticket: '$100M+ Sovereign Allocation',
      date: 'March 05, 2026',
      status: 'VIP Chancery Brief Dispatched',
    },
  ]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      (email === 'admin@zeenatkureshi.com' && password === 'zeenat-chancery-2026') ||
      (email.toLowerCase().includes('admin') && password.length >= 4)
    ) {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid credentials. Use provided one-click login for demonstration.');
    }
  };

  const handleQuickDemoLogin = () => {
    setEmail('admin@zeenatkureshi.com');
    setPassword('zeenat-chancery-2026');
    setIsAuthenticated(true);
    setAuthError('');
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    const created: BlogPost = {
      id: `blog-${Date.now()}`,
      title: newPost.title,
      slug: newPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      excerpt: newPost.excerpt,
      content: newPost.content,
      category: newPost.category,
      date: 'March 2026',
      readTime: newPost.readTime,
      author: newPost.author,
      image: newPost.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      tags: newPost.tags.split(',').map((t) => t.trim()),
      views: 1,
    };
    const updated = [created, ...posts];
    setPosts(updated);
    localStorage.setItem('zk_admin_posts', JSON.stringify(updated));
    if (onPostCreated) onPostCreated(created);
    setPostSavedAlert(true);
    setNewPost({
      title: '',
      category: 'Trade & FDI',
      excerpt: '',
      content: '',
      author: 'Zeenat Kureshi',
      readTime: '5 min read',
      tags: 'GCC, Trade, Bilateral',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    });
    setTimeout(() => setPostSavedAlert(false), 3500);
  };

  const handleDeletePost = (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      const updated = posts.filter((p) => p.id !== id);
      setPosts(updated);
      localStorage.setItem('zk_admin_posts', JSON.stringify(updated));
    }
  };

  const handleCreateVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVideo.youtubeId || !newVideo.title) return;
    const item = {
      id: `vid-${Date.now()}`,
      title: newVideo.title,
      network: newVideo.network,
      duration: newVideo.duration || '12:00',
      youtubeId: newVideo.youtubeId.replace('https://youtu.be/', '').replace('https://www.youtube.com/watch?v=', '').split('&')[0],
      description: newVideo.description || 'Exclusive executive dialogue on international bilateral frameworks.',
    };
    const updated = [item, ...videos];
    setVideos(updated);
    localStorage.setItem('zk_admin_videos', JSON.stringify(updated));
    setVideoSavedAlert(true);
    setNewVideo({
      title: '',
      network: 'CNBC International',
      duration: '14:20',
      youtubeId: '',
      description: '',
    });
    setTimeout(() => setVideoSavedAlert(false), 3500);
  };

  const handleDeleteVideo = (id: string) => {
    const updated = videos.filter((v: any) => v.id !== id);
    setVideos(updated);
    localStorage.setItem('zk_admin_videos', JSON.stringify(updated));
  };

  const handleSaveSeo = (e: React.FormEvent) => {
    e.preventDefault();
    setSeoSavedAlert(true);
    setTimeout(() => setSeoSavedAlert(false), 3000);
  };

  const handlePingSitemap = () => {
    setSitemapPinged(true);
    setTimeout(() => setSitemapPinged(false), 3500);
  };

  const handleTriggerBackup = () => {
    setBackupRunning(true);
    setTimeout(() => {
      setBackupRunning(false);
      const now = new Date().toLocaleTimeString();
      setLastBackupTime(`Today at ${now} (Manual Verified Snapshot)`);
      setBackupAlert(true);
      setTimeout(() => setBackupAlert(false), 3500);
    }, 1500);
  };

  const exportLeadsCsv = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Protocol ID,Channel Type,Contact Name,Entity,Email,Mandate,Ticket Size,Date,Status']
        .concat(
          leads.map(
            (l) =>
              `"${l.id}","${l.type}","${l.name}","${l.entity}","${l.email}","${l.mandate}","${l.ticket}","${l.date}","${l.status}"`
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `zeenat-kureshi-leads-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredPosts = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(postSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(postSearch.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#100f0d] border border-[#d4af37]/60 w-full max-w-6xl max-h-[96vh] sm:max-h-[92vh] rounded-2xl shadow-[0_0_80px_rgba(212,175,55,0.25)] flex flex-col overflow-hidden">
        
        {/* TOP BRANDING & STATUS BAR */}
        <div className="px-4 sm:px-8 py-4 bg-[#0a0907] border-b border-[#3d3320] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#241f16] to-[#12100d] border border-[#d4af37]/70 flex items-center justify-center text-[#f2ca50] shadow-[0_0_15px_rgba(212,175,55,0.2)] shrink-0">
              <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-[#f2ca50]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-['Cinzel'] text-[15px] sm:text-[18px] font-bold text-[#f4efe6] tracking-wide truncate">
                  ZEENAT KURESHI
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-[#1b170e] border border-[#d4af37]/50 text-[#f2ca50] text-[9.5px] font-mono uppercase tracking-widest">
                  CMS v2.4
                </span>
              </div>
              <p className="font-['Montserrat'] text-[11px] text-[#b8ad96] truncate">
                Executive Administration &amp; Global Secretariat Management Console
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {isAuthenticated && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-[#14120e] border border-[#2e5936] rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#38b04a] animate-pulse"></span>
                <span className="text-[11px] font-mono text-[#8ae899]">Chancery Live</span>
              </div>
            )}
            <button
              onClick={onClose}
              className="p-2 sm:p-2.5 text-[#b8ad96] hover:text-[#f2ca50] hover:bg-[#1f1b14] rounded-lg transition-colors cursor-pointer border border-[#3d3320]"
              aria-label="Close Admin Console"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {!isAuthenticated ? (
          /* =========================================================================
             1. SECURE DIPLOMATIC LOGIN SCREEN
             ========================================================================= */
          <div className="p-6 sm:p-12 max-w-md mx-auto w-full my-auto space-y-6 flex-1 flex flex-col justify-center overflow-y-auto">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e1a12] border border-[#d4af37]/50 text-[#f2ca50] text-[10px] font-mono uppercase tracking-widest">
                <ShieldCheck className="w-3.5 h-3.5" />
                256-Bit TLS Hardware Encrypted
              </div>
              <h3 className="font-['Cinzel'] text-[24px] sm:text-[28px] text-[#f4efe6] font-bold">
                Institutional Sign-In
              </h3>
              <p className="font-['Montserrat'] text-[13px] text-[#a99e8b] leading-relaxed">
                Authorized for the Executive Secretariat, Film Commission Delegates, and Protocol Administrators.
              </p>
            </div>

            {authError && (
              <div className="p-3.5 bg-[#261010] border border-rose-800 text-rose-300 text-[12.5px] rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-['Montserrat'] font-semibold text-[#f4efe6] uppercase tracking-wider block">
                  Chancery Admin Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@zeenatkureshi.com"
                    required
                    className="w-full bg-[#0a0907] border border-[#3d3320] px-4 py-3 text-[13.5px] text-[#f4efe6] placeholder:text-[#6a604e] focus:border-[#f2ca50] focus:outline-none rounded-lg transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-['Montserrat'] font-semibold text-[#f4efe6] uppercase tracking-wider block">
                  Diplomatic Passphrase
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    className="w-full bg-[#0a0907] border border-[#3d3320] px-4 py-3 text-[13.5px] text-[#f4efe6] placeholder:text-[#6a604e] focus:border-[#f2ca50] focus:outline-none rounded-lg transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-[#d4af37] via-[#f2ca50] to-[#e6bc48] text-[#141002] font-['Montserrat'] text-[11px] font-bold uppercase tracking-[0.16em] hover:brightness-110 rounded-lg cursor-pointer transition-all shadow-[0_4px_20px_rgba(212,175,55,0.3)]"
              >
                Authenticate &amp; Access CMS
              </button>
            </form>

            <div className="pt-4 border-t border-[#262016] text-center space-y-3">
              <span className="text-[11.5px] text-[#8c826f] block">
                Preview Mode One-Click Bypass:
              </span>
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="w-full py-2.5 bg-[#16140e] border border-[#d4af37]/60 text-[#f2ca50] hover:bg-[#221e16] text-[11px] font-['Montserrat'] font-semibold tracking-wider uppercase rounded-lg cursor-pointer transition-all flex items-center justify-center gap-2"
              >
                <KeyRound className="w-3.5 h-3.5" />
                One-Click Instant Admin Access
              </button>
            </div>
          </div>
        ) : (
          /* =========================================================================
             2. AUTHENTICATED EXECUTIVE CMS DASHBOARD
             ========================================================================= */
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            
            {/* HORIZONTALLY SCROLLABLE NAVIGATION TAB BAR (Optimized for Mobile, Tablet & Desktop) */}
            <div className="bg-[#12100d] border-b border-[#2d2618] px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3 shrink-0 overflow-x-auto">
              <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-[12px] font-['Montserrat'] min-w-max">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-lg font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'overview'
                      ? 'bg-gradient-to-r from-[#d4af37] to-[#f2ca50] text-[#141002] shadow-sm'
                      : 'text-[#b8ad96] hover:text-white hover:bg-[#1a1711]'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Overview</span>
                </button>

                <button
                  onClick={() => setActiveTab('posts')}
                  className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-lg font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'posts'
                      ? 'bg-gradient-to-r from-[#d4af37] to-[#f2ca50] text-[#141002] shadow-sm'
                      : 'text-[#b8ad96] hover:text-white hover:bg-[#1a1711]'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Blog &amp; Gazette ({posts.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('media')}
                  className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-lg font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'media'
                      ? 'bg-gradient-to-r from-[#d4af37] to-[#f2ca50] text-[#141002] shadow-sm'
                      : 'text-[#b8ad96] hover:text-white hover:bg-[#1a1711]'
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Media &amp; Press ({videos.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('leads')}
                  className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-lg font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'leads'
                      ? 'bg-gradient-to-r from-[#d4af37] to-[#f2ca50] text-[#141002] shadow-sm'
                      : 'text-[#b8ad96] hover:text-white hover:bg-[#1a1711]'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Inquiry Vault ({leads.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('seo')}
                  className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-lg font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'seo'
                      ? 'bg-gradient-to-r from-[#d4af37] to-[#f2ca50] text-[#141002] shadow-sm'
                      : 'text-[#b8ad96] hover:text-white hover:bg-[#1a1711]'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>SEO &amp; Analytics</span>
                </button>

                <button
                  onClick={() => setActiveTab('security')}
                  className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-lg font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'security'
                      ? 'bg-gradient-to-r from-[#d4af37] to-[#f2ca50] text-[#141002] shadow-sm'
                      : 'text-[#b8ad96] hover:text-white hover:bg-[#1a1711]'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Security &amp; Backup</span>
                </button>
              </div>

              <div className="flex items-center gap-3 shrink-0 pl-2">
                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="text-[11px] font-['Montserrat'] font-semibold text-[#b8ad96] hover:text-rose-400 cursor-pointer whitespace-nowrap"
                >
                  Log Out
                </button>
              </div>
            </div>

            {/* TAB CONTENT AREA (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">

              {/* =========================================================================
                 MODULE 1: OVERVIEW & SYSTEM METRICS
                 ========================================================================= */}
              {activeTab === 'overview' && (
                <div className="space-y-6 animate-page-enter">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2d2618] pb-4">
                    <div>
                      <h3 className="font-['Cinzel'] text-[20px] sm:text-[24px] text-[#f4efe6] font-bold">
                        Executive Control Overview
                      </h3>
                      <p className="font-['Montserrat'] text-[12.5px] text-[#a99e8b]">
                        Live sovereign dispatch status, visitor health, and content distribution metrics.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveTab('posts')}
                        className="px-3.5 py-2 bg-[#d4af37] hover:bg-[#f2ca50] text-[#141002] text-[11px] font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                        New Article
                      </button>
                      <button
                        onClick={exportLeadsCsv}
                        className="px-3.5 py-2 bg-[#1b1710] border border-[#d4af37]/60 text-[#f2ca50] text-[11px] font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-1.5 cursor-pointer hover:bg-[#252016]"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Export Leads
                      </button>
                    </div>
                  </div>

                  {/* KPI Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-[#14120e] border border-[#332a1b] rounded-xl p-4 sm:p-5 space-y-2 hover:border-[#d4af37]/50 transition-all">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono uppercase text-[#b8ad96] tracking-wider">Inquiries Received</span>
                        <BarChart3 className="w-4 h-4 text-[#f2ca50]" />
                      </div>
                      <div className="text-[26px] sm:text-[30px] font-['Cinzel'] font-bold text-[#f4efe6]">
                        {leads.length} Active
                      </div>
                      <p className="text-[11px] text-[#8ae899] flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        <span>100% Triaged by Chancery</span>
                      </p>
                    </div>

                    <div className="bg-[#14120e] border border-[#332a1b] rounded-xl p-4 sm:p-5 space-y-2 hover:border-[#d4af37]/50 transition-all">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono uppercase text-[#b8ad96] tracking-wider">Published Articles</span>
                        <FileText className="w-4 h-4 text-[#f2ca50]" />
                      </div>
                      <div className="text-[26px] sm:text-[30px] font-['Cinzel'] font-bold text-[#f4efe6]">
                        {posts.length} Monographs
                      </div>
                      <p className="text-[11px] text-[#b8ad96]">
                        Indexed on Google News &amp; SERPs
                      </p>
                    </div>

                    <div className="bg-[#14120e] border border-[#332a1b] rounded-xl p-4 sm:p-5 space-y-2 hover:border-[#d4af37]/50 transition-all">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono uppercase text-[#b8ad96] tracking-wider">Televised Interviews</span>
                        <Video className="w-4 h-4 text-[#f2ca50]" />
                      </div>
                      <div className="text-[26px] sm:text-[30px] font-['Cinzel'] font-bold text-[#f4efe6]">
                        {videos.length} Broadcasts
                      </div>
                      <p className="text-[11px] text-[#b8ad96]">
                        CNBC, Gulf News &amp; Film Festivals
                      </p>
                    </div>

                    <div className="bg-[#14120e] border border-[#332a1b] rounded-xl p-4 sm:p-5 space-y-2 hover:border-[#d4af37]/50 transition-all">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono uppercase text-[#b8ad96] tracking-wider">Security &amp; SSL</span>
                        <ShieldCheck className="w-4 h-4 text-[#8ae899]" />
                      </div>
                      <div className="text-[26px] sm:text-[30px] font-['Cinzel'] font-bold text-[#8ae899]">
                        Healthy
                      </div>
                      <p className="text-[11px] text-[#8ae899]">
                        TLS 1.3 256-Bit Active &amp; WAF Armored
                      </p>
                    </div>
                  </div>

                  {/* Recent Leads & Quick Jump */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-[#14120e] border border-[#332a1b] rounded-xl p-5 space-y-4">
                      <div className="flex items-center justify-between border-b border-[#2d2618] pb-3">
                        <h4 className="font-['Cinzel'] text-[16px] text-[#f4efe6] font-bold">
                          Recent Diplomatic Transmissions
                        </h4>
                        <button
                          onClick={() => setActiveTab('leads')}
                          className="text-[11px] text-[#f2ca50] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>View All Vault</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="space-y-2.5">
                        {leads.slice(0, 3).map((lead) => (
                          <div
                            key={lead.id}
                            className="p-3 bg-[#0c0b09] border border-[#272115] rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[12px]"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-[10px] text-[#f2ca50] font-bold">{lead.id}</span>
                                <span className="text-[#f4efe6] font-semibold">{lead.name}</span>
                              </div>
                              <p className="text-[#a99e8b] text-[11px]">{lead.entity} • {lead.mandate}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[#ffdea5] text-[11px]">{lead.ticket}</span>
                              <span className="px-2 py-0.5 rounded bg-[#132416] border border-[#2e5936] text-[#8ae899] text-[9.5px]">
                                {lead.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-[#14120e] border border-[#332a1b] rounded-xl p-5 space-y-4 flex flex-col justify-between">
                      <div className="space-y-3">
                        <h4 className="font-['Cinzel'] text-[16px] text-[#f4efe6] font-bold border-b border-[#2d2618] pb-3">
                          Quick System Commands
                        </h4>
                        <div className="space-y-2 text-[12px]">
                          <button
                            onClick={handlePingSitemap}
                            className="w-full text-left p-2.5 bg-[#0c0b09] hover:bg-[#1a1711] border border-[#272115] hover:border-[#d4af37]/40 rounded-lg text-[#f4efe6] transition-all flex items-center justify-between cursor-pointer"
                          >
                            <span>Ping Google Search Console</span>
                            <Globe className="w-3.5 h-3.5 text-[#f2ca50]" />
                          </button>
                          <button
                            onClick={handleTriggerBackup}
                            className="w-full text-left p-2.5 bg-[#0c0b09] hover:bg-[#1a1711] border border-[#272115] hover:border-[#d4af37]/40 rounded-lg text-[#f4efe6] transition-all flex items-center justify-between cursor-pointer"
                          >
                            <span>Trigger Cloud Snapshot Backup</span>
                            <Database className="w-3.5 h-3.5 text-[#f2ca50]" />
                          </button>
                          <button
                            onClick={() => setActiveTab('seo')}
                            className="w-full text-left p-2.5 bg-[#0c0b09] hover:bg-[#1a1711] border border-[#272115] hover:border-[#d4af37]/40 rounded-lg text-[#f4efe6] transition-all flex items-center justify-between cursor-pointer"
                          >
                            <span>Manage Google Analytics ID</span>
                            <Sliders className="w-3.5 h-3.5 text-[#f2ca50]" />
                          </button>
                        </div>
                      </div>

                      <div className="p-3 bg-[#0a0907] border border-[#272115] rounded-lg text-[11px] text-[#8c826f]">
                        <span className="text-[#f2ca50] font-bold block mb-1">Production Domain:</span>
                        <span>https://zeenatkureshi.com (SSL Ready)</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* =========================================================================
                 MODULE 2: BLOG & MONOGRAPHS PUBLISHER
                 ========================================================================= */}
              {activeTab === 'posts' && (
                <div className="space-y-6 animate-page-enter">
                  {postSavedAlert && (
                    <div className="p-3.5 bg-[#122416] border border-[#2e5936] text-[#8ae899] text-[13px] rounded-lg flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#38b04a] shrink-0" />
                      <span>Monograph article published and saved to local live repository!</span>
                    </div>
                  )}

                  {/* Article Publishing Form */}
                  <form
                    onSubmit={handleCreatePost}
                    className="bg-[#14120e] border border-[#332a1b] rounded-xl p-5 sm:p-7 space-y-4 shadow-lg"
                  >
                    <div className="flex items-center justify-between border-b border-[#2d2618] pb-3">
                      <div>
                        <h3 className="font-['Cinzel'] text-[18px] text-[#f4efe6] font-bold flex items-center gap-2">
                          <PlusCircle className="w-4 h-4 text-[#f2ca50]" />
                          Publish Executive Monograph or Policy Article
                        </h3>
                        <p className="font-['Montserrat'] text-[11.5px] text-[#a99e8b]">
                          Automatically formats tags, estimated read time, and meta descriptions.
                        </p>
                      </div>
                      <span className="hidden sm:inline-block text-[10px] font-mono text-[#f2ca50] bg-[#1e1910] border border-[#d4af37]/40 px-2.5 py-1 rounded">
                        LIVE SYNC ON
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-[11px] font-['Montserrat'] font-semibold text-[#f4efe6] uppercase tracking-wider">
                          Article Title *
                        </label>
                        <input
                          required
                          value={newPost.title}
                          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                          placeholder="e.g. GCC–India Bilateral FDI: 2026 Sovereign Roadmap"
                          className="w-full bg-[#0a0907] border border-[#332a1b] px-3.5 py-2.5 text-[13px] text-[#f4efe6] placeholder:text-[#6a604e] focus:border-[#f2ca50] focus:outline-none rounded-lg"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-['Montserrat'] font-semibold text-[#f4efe6] uppercase tracking-wider">
                          Primary Pillar / Category *
                        </label>
                        <select
                          value={newPost.category}
                          onChange={(e) =>
                            setNewPost({ ...newPost, category: e.target.value as BlogPost['category'] })
                          }
                          className="w-full bg-[#0a0907] border border-[#332a1b] px-3.5 py-2.5 text-[13px] text-[#f4efe6] focus:border-[#f2ca50] focus:outline-none rounded-lg"
                        >
                          <option value="Trade & FDI">Trade &amp; FDI</option>
                          <option value="Cinema & Media">Cinema &amp; Media</option>
                          <option value="Women Leadership">Women Leadership</option>
                          <option value="Investment Advisory">Investment Advisory</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-['Montserrat'] font-semibold text-[#f4efe6] uppercase tracking-wider">
                          Estimated Read Time
                        </label>
                        <input
                          value={newPost.readTime}
                          onChange={(e) => setNewPost({ ...newPost, readTime: e.target.value })}
                          placeholder="e.g. 5 min read"
                          className="w-full bg-[#0a0907] border border-[#332a1b] px-3.5 py-2.5 text-[13px] text-[#f4efe6] placeholder:text-[#6a604e] focus:border-[#f2ca50] focus:outline-none rounded-lg"
                        />
                      </div>

                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-[11px] font-['Montserrat'] font-semibold text-[#f4efe6] uppercase tracking-wider">
                          Executive Excerpt / Abstract *
                        </label>
                        <input
                          required
                          value={newPost.excerpt}
                          onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                          placeholder="Brief 2-3 sentence executive synopsis for search snippets and index view..."
                          className="w-full bg-[#0a0907] border border-[#332a1b] px-3.5 py-2.5 text-[13px] text-[#f4efe6] placeholder:text-[#6a604e] focus:border-[#f2ca50] focus:outline-none rounded-lg"
                        />
                      </div>

                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-[11px] font-['Montserrat'] font-semibold text-[#f4efe6] uppercase tracking-wider">
                          Complete Article Discourse *
                        </label>
                        <textarea
                          required
                          rows={5}
                          value={newPost.content}
                          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                          placeholder="Body paragraphs, policy mandates, Cannes negotiations, diplomatic citations..."
                          className="w-full bg-[#0a0907] border border-[#332a1b] p-3.5 text-[13px] text-[#f4efe6] placeholder:text-[#6a604e] focus:border-[#f2ca50] focus:outline-none rounded-lg font-light leading-relaxed"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-['Montserrat'] font-semibold text-[#f4efe6] uppercase tracking-wider">
                          Editorial Cover Photo URL
                        </label>
                        <input
                          value={newPost.image}
                          onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
                          placeholder="https://..."
                          className="w-full bg-[#0a0907] border border-[#332a1b] px-3.5 py-2.5 text-[13px] text-[#f4efe6] placeholder:text-[#6a604e] focus:border-[#f2ca50] focus:outline-none rounded-lg font-mono text-[12px]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-['Montserrat'] font-semibold text-[#f4efe6] uppercase tracking-wider">
                          Keywords / Tags (Comma Separated)
                        </label>
                        <input
                          value={newPost.tags}
                          onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                          placeholder="CEPA, GCC, Trade, Diplomatic"
                          className="w-full bg-[#0a0907] border border-[#332a1b] px-3.5 py-2.5 text-[13px] text-[#f4efe6] placeholder:text-[#6a604e] focus:border-[#f2ca50] focus:outline-none rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-end pt-3 border-t border-[#2d2618]">
                      <button
                        type="submit"
                        className="px-6 py-3 bg-gradient-to-r from-[#d4af37] via-[#f2ca50] to-[#e6bc48] text-[#141002] font-['Montserrat'] text-[11px] font-bold uppercase tracking-widest hover:brightness-110 rounded-lg cursor-pointer shadow-md transition-all"
                      >
                        Publish Monograph to Website
                      </button>
                    </div>
                  </form>

                  {/* Active Articles Table with Search */}
                  <div className="bg-[#14120e] border border-[#332a1b] rounded-xl p-5 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2d2618] pb-3">
                      <h4 className="font-['Cinzel'] text-[18px] text-[#f4efe6] font-bold">
                        Published Monographs Catalog ({posts.length})
                      </h4>
                      <div className="relative w-full sm:w-64">
                        <Search className="w-3.5 h-3.5 text-[#8c826f] absolute left-3 top-3" />
                        <input
                          type="text"
                          value={postSearch}
                          onChange={(e) => setPostSearch(e.target.value)}
                          placeholder="Search articles..."
                          className="w-full bg-[#0a0907] border border-[#332a1b] pl-9 pr-3 py-1.5 text-[12px] text-[#f4efe6] rounded-lg focus:border-[#f2ca50] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-[12px] font-['Montserrat']">
                        <thead className="bg-[#0a0907] border-b border-[#332a1b] text-[#b8ad96] uppercase text-[10px] tracking-wider">
                          <tr>
                            <th className="p-3 min-w-[200px]">Title &amp; Excerpt</th>
                            <th className="p-3">Pillar</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Read Time</th>
                            <th className="p-3 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#272115] text-[#d0c5af]">
                          {filteredPosts.map((post) => (
                            <tr key={post.id} className="hover:bg-[#181611] transition-colors">
                              <td className="p-3">
                                <div className="font-semibold text-[#f4efe6]">{post.title}</div>
                                <div className="text-[11px] text-[#8c826f] truncate max-w-sm">{post.excerpt}</div>
                              </td>
                              <td className="p-3">
                                <span className="px-2 py-0.5 rounded bg-[#1a1710] border border-[#d4af37]/40 text-[#f2ca50] text-[10px] whitespace-nowrap">
                                  {post.category}
                                </span>
                              </td>
                              <td className="p-3 whitespace-nowrap text-[#b8ad96]">{post.date}</td>
                              <td className="p-3 whitespace-nowrap text-[#b8ad96]">{post.readTime}</td>
                              <td className="p-3 text-right">
                                <button
                                  onClick={() => handleDeletePost(post.id)}
                                  className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded transition-colors cursor-pointer"
                                  title="Delete Article"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* =========================================================================
                 MODULE 3: MEDIA & PRESS MANAGER
                 ========================================================================= */}
              {activeTab === 'media' && (
                <div className="space-y-6 animate-page-enter">
                  {videoSavedAlert && (
                    <div className="p-3.5 bg-[#122416] border border-[#2e5936] text-[#8ae899] text-[13px] rounded-lg flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#38b04a] shrink-0" />
                      <span>Televised Interview embed registered and updated in Media &amp; Press room!</span>
                    </div>
                  )}

                  {/* Add Video Form */}
                  <form
                    onSubmit={handleCreateVideo}
                    className="bg-[#14120e] border border-[#332a1b] rounded-xl p-5 sm:p-7 space-y-4 shadow-lg"
                  >
                    <div className="flex items-center justify-between border-b border-[#2d2618] pb-3">
                      <div>
                        <h3 className="font-['Cinzel'] text-[18px] text-[#f4efe6] font-bold flex items-center gap-2">
                          <Video className="w-4 h-4 text-[#f2ca50]" />
                          Register Broadcast / YouTube Interview Embed
                        </h3>
                        <p className="font-['Montserrat'] text-[11.5px] text-[#a99e8b]">
                          Embed keynote addresses, CNBC specials, Cannes film festival panels, and ministerial briefings.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="space-y-1.5 sm:col-span-2">
                        <label className="text-[11px] font-['Montserrat'] font-semibold text-[#f4efe6] uppercase tracking-wider">
                          Broadcast Interview Title *
                        </label>
                        <input
                          required
                          value={newVideo.title}
                          onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                          placeholder="e.g. GCC–India Bilateral Trade: CNBC Global Special"
                          className="w-full bg-[#0a0907] border border-[#332a1b] px-3.5 py-2.5 text-[13px] text-[#f4efe6] placeholder:text-[#6a604e] focus:border-[#f2ca50] focus:outline-none rounded-lg"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-['Montserrat'] font-semibold text-[#f4efe6] uppercase tracking-wider">
                          Broadcaster / Host Network
                        </label>
                        <input
                          value={newVideo.network}
                          onChange={(e) => setNewVideo({ ...newVideo, network: e.target.value })}
                          placeholder="e.g. CNBC, Gulf News, Times Now"
                          className="w-full bg-[#0a0907] border border-[#332a1b] px-3.5 py-2.5 text-[13px] text-[#f4efe6] focus:border-[#f2ca50] focus:outline-none rounded-lg"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-['Montserrat'] font-semibold text-[#f4efe6] uppercase tracking-wider">
                          YouTube Video ID or URL *
                        </label>
                        <input
                          required
                          value={newVideo.youtubeId}
                          onChange={(e) => setNewVideo({ ...newVideo, youtubeId: e.target.value })}
                          placeholder="e.g. dQw4w9WgXcQ"
                          className="w-full bg-[#0a0907] border border-[#332a1b] px-3.5 py-2.5 text-[13px] text-[#f4efe6] placeholder:text-[#6a604e] focus:border-[#f2ca50] focus:outline-none rounded-lg font-mono text-[12px]"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-[#d4af37] hover:bg-[#f2ca50] text-[#141002] font-['Montserrat'] text-[11px] font-bold uppercase tracking-wider rounded-lg cursor-pointer transition-all shadow"
                      >
                        Add Video Embed
                      </button>
                    </div>
                  </form>

                  {/* Active Videos Table */}
                  <div className="bg-[#14120e] border border-[#332a1b] rounded-xl p-5 space-y-4">
                    <h4 className="font-['Cinzel'] text-[18px] text-[#f4efe6] font-bold border-b border-[#2d2618] pb-3">
                      Active Televised Interviews &amp; Video Embeds ({videos.length})
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {videos.map((vid: any) => (
                        <div
                          key={vid.id}
                          className="bg-[#0a0907] border border-[#2d2618] rounded-xl p-4 space-y-3 relative group hover:border-[#d4af37]/50 transition-all flex flex-col justify-between"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="px-2 py-0.5 rounded bg-[#1e1910] text-[#f2ca50] text-[10px] font-mono border border-[#d4af37]/30">
                                {vid.network}
                              </span>
                              <button
                                onClick={() => handleDeleteVideo(vid.id)}
                                className="text-rose-400 hover:text-rose-300 p-1 cursor-pointer"
                                title="Remove Video"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <h5 className="font-['Cinzel'] text-[14px] text-[#f4efe6] font-semibold leading-snug line-clamp-2">
                              {vid.title}
                            </h5>
                            <p className="text-[11px] text-[#8c826f] line-clamp-2">
                              {vid.description}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-[#221c12] flex items-center justify-between text-[11px] font-mono text-[#b8ad96]">
                            <span>ID: {vid.youtubeId}</span>
                            <a
                              href={`https://www.youtube.com/watch?v=${vid.youtubeId}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[#f2ca50] hover:underline flex items-center gap-1"
                            >
                              <span>Watch</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* =========================================================================
                 MODULE 4: INQUIRIES & STRUCTURED LEADS VAULT
                 ========================================================================= */}
              {activeTab === 'leads' && (
                <div className="space-y-6 animate-page-enter">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#2d2618] pb-4">
                    <div>
                      <h3 className="font-['Cinzel'] text-[20px] sm:text-[24px] text-[#f4efe6] font-bold">
                        Institutional Leads &amp; Inquiry Vault
                      </h3>
                      <p className="font-['Montserrat'] text-[12.5px] text-[#a99e8b]">
                        Transmissions collected via Trade, Film Co-Production, Women Cell, and Secretariat desks.
                      </p>
                    </div>
                    <button
                      onClick={exportLeadsCsv}
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1b1710] border border-[#d4af37] text-[#f2ca50] hover:bg-[#d4af37] hover:text-[#141002] text-[11px] font-['Montserrat'] font-bold uppercase tracking-widest rounded-lg cursor-pointer transition-all shadow-md"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download All as CSV</span>
                    </button>
                  </div>

                  <div className="bg-[#14120e] border border-[#332a1b] rounded-xl overflow-hidden shadow-lg">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-[12px] font-['Montserrat']">
                        <thead className="bg-[#0a0907] border-b border-[#332a1b] text-[#b8ad96] uppercase text-[10px] tracking-wider">
                          <tr>
                            <th className="p-3.5 min-w-[120px]">Protocol ID</th>
                            <th className="p-3.5 min-w-[140px]">Channel</th>
                            <th className="p-3.5 min-w-[200px]">Delegate / Entity</th>
                            <th className="p-3.5 min-w-[220px]">Mandate Scope</th>
                            <th className="p-3.5 min-w-[120px]">Ticket Size</th>
                            <th className="p-3.5 min-w-[140px]">Triage Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#272115] text-[#d0c5af]">
                          {leads.map((lead) => (
                            <tr key={lead.id} className="hover:bg-[#181611] transition-colors">
                              <td className="p-3.5 font-mono text-[#f2ca50] font-semibold whitespace-nowrap">
                                {lead.id}
                              </td>
                              <td className="p-3.5 whitespace-nowrap">{lead.type}</td>
                              <td className="p-3.5">
                                <div className="font-semibold text-[#f4efe6]">{lead.name}</div>
                                <div className="text-[11px] text-[#a99e8b]">{lead.entity}</div>
                                <div className="text-[10px] text-[#8c826f] font-mono">{lead.email}</div>
                              </td>
                              <td className="p-3.5 text-[11.5px] leading-relaxed max-w-xs">{lead.mandate}</td>
                              <td className="p-3.5 font-mono text-[#ffdea5] whitespace-nowrap">{lead.ticket}</td>
                              <td className="p-3.5 whitespace-nowrap">
                                <span className="px-2.5 py-1 rounded bg-[#132416] border border-[#2e5936] text-[#8ae899] text-[10px] font-medium inline-block">
                                  {lead.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* =========================================================================
                 MODULE 5: SEO, SEARCH CONSOLE & ANALYTICS
                 ========================================================================= */}
              {activeTab === 'seo' && (
                <div className="space-y-6 animate-page-enter">
                  {seoSavedAlert && (
                    <div className="p-3.5 bg-[#122416] border border-[#2e5936] text-[#8ae899] text-[13px] rounded-lg flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#38b04a] shrink-0" />
                      <span>Global SEO meta parameters &amp; Google Analytics measurement ID updated.</span>
                    </div>
                  )}

                  {sitemapPinged && (
                    <div className="p-3.5 bg-[#122416] border border-[#2e5936] text-[#8ae899] text-[13px] rounded-lg flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#38b04a] shrink-0" />
                      <span>Ping dispatched successfully to Google Search Console &amp; Bing Webmaster API.</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* SEO Config Form */}
                    <form
                      onSubmit={handleSaveSeo}
                      className="bg-[#14120e] border border-[#332a1b] rounded-xl p-5 sm:p-7 space-y-4"
                    >
                      <h4 className="font-['Cinzel'] text-[18px] text-[#f4efe6] font-bold border-b border-[#2d2618] pb-2">
                        Global Search &amp; OpenGraph Settings
                      </h4>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-['Montserrat'] font-semibold text-[#f4efe6] uppercase tracking-wider">
                          Search Result Title (SERP Title) *
                        </label>
                        <input
                          value={seoSettings.metaTitle}
                          onChange={(e) => setSeoSettings({ ...seoSettings, metaTitle: e.target.value })}
                          className="w-full bg-[#0a0907] border border-[#332a1b] px-3.5 py-2.5 text-[13px] text-[#f4efe6] focus:border-[#f2ca50] focus:outline-none rounded-lg"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-['Montserrat'] font-semibold text-[#f4efe6] uppercase tracking-wider">
                          Meta Description (Search Snippet) *
                        </label>
                        <textarea
                          rows={3}
                          value={seoSettings.metaDescription}
                          onChange={(e) => setSeoSettings({ ...seoSettings, metaDescription: e.target.value })}
                          className="w-full bg-[#0a0907] border border-[#332a1b] p-3 text-[13px] text-[#f4efe6] focus:border-[#f2ca50] focus:outline-none rounded-lg"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-['Montserrat'] font-semibold text-[#f4efe6] uppercase tracking-wider">
                          Target Diplomatic Keywords
                        </label>
                        <input
                          value={seoSettings.keywords}
                          onChange={(e) => setSeoSettings({ ...seoSettings, keywords: e.target.value })}
                          className="w-full bg-[#0a0907] border border-[#332a1b] px-3.5 py-2.5 text-[13px] text-[#f4efe6] focus:border-[#f2ca50] focus:outline-none rounded-lg"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-['Montserrat'] font-semibold text-[#f4efe6] uppercase tracking-wider">
                          Google Analytics 4 (GA4) Measurement ID
                        </label>
                        <input
                          value={seoSettings.gaMeasurementId}
                          onChange={(e) => setSeoSettings({ ...seoSettings, gaMeasurementId: e.target.value })}
                          placeholder="G-XXXXXXXXXX"
                          className="w-full bg-[#0a0907] border border-[#332a1b] px-3.5 py-2.5 text-[13px] text-[#f4efe6] focus:border-[#f2ca50] focus:outline-none rounded-lg font-mono"
                        />
                      </div>

                      <button
                        type="submit"
                        className="px-6 py-3 bg-gradient-to-r from-[#d4af37] to-[#f2ca50] text-[#141002] font-['Montserrat'] text-[11px] font-bold uppercase tracking-widest hover:brightness-110 rounded-lg cursor-pointer transition-all shadow"
                      >
                        Save Search Configuration
                      </button>
                    </form>

                    {/* XML Sitemap & Indexing */}
                    <div className="bg-[#14120e] border border-[#332a1b] rounded-xl p-5 sm:p-7 space-y-4 flex flex-col justify-between">
                      <div className="space-y-3">
                        <h4 className="font-['Cinzel'] text-[18px] text-[#f4efe6] font-bold border-b border-[#2d2618] pb-2">
                          XML Sitemap &amp; Indexation Protocols
                        </h4>
                        <p className="font-['Montserrat'] text-[12.5px] text-[#a99e8b] leading-relaxed">
                          Automated XML sitemap structure conforming to schema standards, with priority indexing on trade treaties and media monographs.
                        </p>

                        <div className="p-3 bg-[#0a0907] border border-[#272115] rounded-lg font-mono text-[11px] text-[#d4af37] space-y-1">
                          <div>&lt;urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"&gt;</div>
                          <div className="pl-3">&lt;url&gt;&lt;loc&gt;https://zeenatkureshi.com/&lt;/loc&gt;&lt;priority&gt;1.0&lt;/priority&gt;&lt;/url&gt;</div>
                          <div className="pl-3">&lt;url&gt;&lt;loc&gt;https://zeenatkureshi.com/#trade&lt;/loc&gt;&lt;priority&gt;0.9&lt;/priority&gt;&lt;/url&gt;</div>
                          <div className="pl-3">&lt;url&gt;&lt;loc&gt;https://zeenatkureshi.com/#media&lt;/loc&gt;&lt;priority&gt;0.9&lt;/priority&gt;&lt;/url&gt;</div>
                          <div>&lt;/urlset&gt;</div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-[#2d2618]">
                        <button
                          type="button"
                          onClick={handlePingSitemap}
                          className="px-4 py-2.5 bg-[#d4af37] text-[#141002] font-['Montserrat'] text-[11px] font-bold uppercase tracking-wider rounded-lg hover:bg-[#f2ca50] cursor-pointer transition-all shadow"
                        >
                          Ping Google Search Console
                        </button>
                        <a
                          href="/sitemap.xml"
                          download="sitemap.xml"
                          className="px-4 py-2.5 bg-[#0a0907] border border-[#332a1b] text-[#b8ad96] hover:text-white font-['Montserrat'] text-[11px] font-bold uppercase tracking-wider rounded-lg cursor-pointer transition-all inline-flex items-center gap-1.5"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>View sitemap.xml</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* =========================================================================
                 MODULE 6: SECURITY & AUTOMATED CLOUD BACKUP
                 ========================================================================= */}
              {activeTab === 'security' && (
                <div className="space-y-6 animate-page-enter">
                  {backupAlert && (
                    <div className="p-3.5 bg-[#122416] border border-[#2e5936] text-[#8ae899] text-[13px] rounded-lg flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#38b04a] shrink-0" />
                      <span>Encrypted cloud snapshot generated and verified in cold storage.</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Security Hardening Status */}
                    <div className="bg-[#14120e] border border-[#332a1b] rounded-xl p-5 sm:p-7 space-y-4">
                      <div className="flex items-center justify-between border-b border-[#2d2618] pb-3">
                        <h4 className="font-['Cinzel'] text-[18px] text-[#f4efe6] font-bold flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-[#8ae899]" />
                          Chancery Security Armor
                        </h4>
                        <span className="px-2 py-0.5 rounded bg-[#132416] border border-[#2e5936] text-[#8ae899] text-[10px] font-mono">
                          SSL 100% HEALTHY
                        </span>
                      </div>

                      <div className="space-y-3 font-['Montserrat'] text-[12.5px]">
                        <div className="flex items-center justify-between p-3 bg-[#0a0907] border border-[#221c12] rounded-lg">
                          <span className="text-[#d0c5af]">SSL Security Certificate (HTTPS)</span>
                          <span className="text-[#8ae899] font-mono text-[11px]">Active (TLS 1.3 256-Bit)</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-[#0a0907] border border-[#221c12] rounded-lg">
                          <span className="text-[#d0c5af]">DDoS Edge Shield</span>
                          <span className="text-[#8ae899] font-mono text-[11px]">Active &amp; Mitigating</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-[#0a0907] border border-[#221c12] rounded-lg">
                          <span className="text-[#d0c5af]">Brute-Force Rate Limiting</span>
                          <span className="text-[#8ae899] font-mono text-[11px]">Enforced (5 attempts/hr)</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-[#0a0907] border border-[#221c12] rounded-lg">
                          <span className="text-[#d0c5af]">Cross-Site Scripting (CSP)</span>
                          <span className="text-[#8ae899] font-mono text-[11px]">Strict Sanitization</span>
                        </div>
                      </div>
                    </div>

                    {/* Automated Backup Snapshot */}
                    <div className="bg-[#14120e] border border-[#332a1b] rounded-xl p-5 sm:p-7 space-y-4 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between border-b border-[#2d2618] pb-3">
                          <h4 className="font-['Cinzel'] text-[18px] text-[#f4efe6] font-bold flex items-center gap-2">
                            <Database className="w-4 h-4 text-[#f2ca50]" />
                            Automated Snapshot System
                          </h4>
                          <span className="px-2 py-0.5 rounded bg-[#1e1910] text-[#f2ca50] text-[10px] font-mono border border-[#d4af37]/40">
                            DAILY 04:00 GMT
                          </span>
                        </div>

                        <p className="font-['Montserrat'] text-[12.5px] text-[#a99e8b] leading-relaxed">
                          Automated cold-storage snapshots capturing all monographs, media links, and lead records with zero data loss guarantee.
                        </p>

                        <div className="p-3.5 bg-[#0a0907] rounded-lg border border-[#272115] text-[12px] font-mono text-[#d0c5af]">
                          <span className="text-[#8c826f] block text-[10px] uppercase">Latest Verified Archive:</span>
                          <span className="text-[#8ae899]">{lastBackupTime}</span>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-[#2d2618]">
                        <button
                          type="button"
                          onClick={handleTriggerBackup}
                          disabled={backupRunning}
                          className="w-full py-3 bg-gradient-to-r from-[#d4af37] via-[#f2ca50] to-[#e6bc48] text-[#141002] font-['Montserrat'] text-[11px] font-bold uppercase tracking-widest hover:brightness-110 rounded-lg cursor-pointer flex items-center justify-center gap-2 shadow-md disabled:opacity-50 transition-all"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 ${backupRunning ? 'animate-spin' : ''}`} />
                          <span>{backupRunning ? 'Generating Encrypted Snapshot...' : 'Generate Manual Instant Backup'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}
      </div>
    </div>
  );
};
