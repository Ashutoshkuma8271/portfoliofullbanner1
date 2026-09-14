import React, { useState } from 'react';
import { FILM_PROJECTS, PRESS_ITEMS } from '../data/folioData';
import { SkeletonImage } from '../components/SkeletonImage';
import { Film, Newspaper, Download, ExternalLink, Award, Play, Video, Calendar, MapPin, X, Sparkles } from 'lucide-react';

interface MediaPressScreenProps {
  onOpenMediaKit?: () => void;
}

export const MediaPressScreen: React.FC<MediaPressScreenProps> = ({ onOpenMediaKit }) => {
  const [activeSubTab, setActiveSubTab] = useState<'filmography' | 'press' | 'interviews' | 'speaking'>('filmography');
  const [selectedFilm, setSelectedFilm] = useState(FILM_PROJECTS[0]);
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);

  // Embedded YouTube / Broadcast Interviews (Specified in requirements)
  const BASE_VIDEO_INTERVIEWS = [
    {
      id: 'v-1',
      title: 'CNBC-TV18 Global Diplomatic Dialogue: The GCC–India CEPA Miracle',
      source: 'CNBC-TV18 Special Feature',
      duration: '18:45',
      youtubeId: 'dQw4w9WgXcQ', // Safe embed placeholder id
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCk-A1BW_YoML--rfFvFNcltAOGQyp4-5HIEiw1V0gGpj4lzVQk089KZ075XapcA_FVvk5z4LmlldNc1Und3CujG-TCMCaOKmoUAxaHzvER8oDTS6H03s5Y0uBZBjScNO5MnVZbb2Tsj_kOccrKEeib49AgjqZ7yuJrau0owHotNOZJEfCPEDNxSXkkwGVhgijPE8w-_jg3jvZEKt8-oJ7o5DADOZLeZgWPM888IEv9ZKHAIrbX8zdG',
      description: 'Zeenat Kureshi unpacks how $450M+ in cross-border FDI is moving through sovereign corridors and free trade zones.',
    },
    {
      id: 'v-2',
      title: 'Variety Cannes Panel: Financing Co-Productions Across South Asia & Gulf',
      source: 'Variety International Studio',
      duration: '24:10',
      youtubeId: 'dQw4w9WgXcQ',
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6IHnCaef41g32aYh105zuRmheL7FwAT-AndGJukXlIE3t4L0szoFQEx8N8S3oPLqPmulPo5Oo776ceRauA2mrWttmN0hpVMmyTa0pTwujXGtjzvMUBiUugC_-F00w5D3skN_AK9FxGE5wHuyFUOuCnS9w6PXK7qD9McLtiTa4qfAhLXGi3BBaDbauoUWTQ5ZowUhwCKD9zWtPptwld2KaXrFj9Uge6Tg0vxx9dGPBUC0JjEbTLaxZ',
      description: 'Keynote discussion on structuring multi-territory film finance, international tax incentives, and theatrical syndication.',
    },
    {
      id: 'v-3',
      title: 'Forbes Middle East Executive Spotlight: Empowering 120,000 Women',
      source: 'Forbes Leadership Series',
      duration: '14:20',
      youtubeId: 'dQw4w9WgXcQ',
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6IHnCaef41g32aYh105zuRmheL7FwAT-AndGJukXlIE3t4L0szoFQEx8N8S3oPLqPmulPo5Oo776ceRauA2mrWttmN0hpVMmyTa0pTwujXGtjzvMUBiUugC_-F00w5D3skN_AK9FxGE5wHuyFUOuCnS9w6PXK7qD9McLtiTa4qfAhLXGi3BBaDbauoUWTQ5ZowUhwCKD9zWtPptwld2KaXrFj9Uge6Tg0vxx9dGPBUC0JjEbTLaxZ',
      description: 'Zeenat Kureshi reveals the grassroots architecture behind the All India Jamiatul Quresh Women Cell nationwide impact.',
    },
  ];

  const [allVideos, setAllVideos] = useState(() => {
    const saved = localStorage.getItem('zk_admin_videos');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((item: any) => ({
            id: item.id,
            title: item.title,
            source: item.network || item.source || 'Executive Broadcast',
            duration: item.duration || '15:00',
            youtubeId: item.youtubeId,
            thumbnail: item.thumbnail || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCk-A1BW_YoML--rfFvFNcltAOGQyp4-5HIEiw1V0gGpj4lzVQk089KZ075XapcA_FVvk5z4LmlldNc1Und3CujG-TCMCaOKmoUAxaHzvER8oDTS6H03s5Y0uBZBjScNO5MnVZbb2Tsj_kOccrKEeib49AgjqZ7yuJrau0owHotNOZJEfCPEDNxSXkkwGVhgijPE8w-_jg3jvZEKt8-oJ7o5DADOZLeZgWPM888IEv9ZKHAIrbX8zdG',
            description: item.description || 'Exclusive executive dialogue on international bilateral frameworks.',
          }));
        }
      } catch {}
    }
    return BASE_VIDEO_INTERVIEWS;
  });

  // Speaking Engagements (Specified in requirements)
  const SPEAKING_ENGAGEMENTS = [
    {
      id: 's-1',
      event: 'World Government Summit — Dubai',
      title: 'Plenary Address: Sovereign Trade Conduits & Digital Currency Corridors',
      date: 'February 2026',
      venue: 'Madinat Jumeirah, Dubai',
      audience: '1,400+ Sovereign Ministers & Ambassadors',
    },
    {
      id: 's-2',
      event: 'FICCI Annual Bilateral Convention — New Delhi',
      title: 'Keynote: Indo-Gulf CEPA Phase II — Unleashing Creative & Industrial Capital',
      date: 'October 2025',
      venue: 'FICCI Federation House, New Delhi',
      audience: 'Industry Titans & Policy Architects',
    },
    {
      id: 's-3',
      event: 'Cannes Producers Network Summit — France',
      title: 'Masterclass: Bridging Bollywood, Arab Cinema & European Funds',
      date: 'May 2025',
      venue: 'Palais des Festivals, Cannes',
      audience: 'Accredited Transnational Film Producers',
    },
    {
      id: 's-4',
      event: 'All India Leadership Conclave — Mumbai',
      title: 'Presidential Address: Institutional Micro-Grants as Civic Sovereignty',
      date: 'August 2024',
      venue: 'Taj Mahal Palace, Mumbai',
      audience: '3,000+ Women Entrepreneurs & Civic Delegates',
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#11100e] text-[#e5e2e3] overflow-x-hidden animate-page-enter">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-16 space-y-10 sm:space-y-16">
      {/* Screen Header & Luxury Subnav Controls */}
      <section className="space-y-6 sm:space-y-8 border-b border-[#2e2617] pb-6 sm:pb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-5">
          <div className="max-w-2xl space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1f1a14] border border-[#d4af37]/40 text-[#f2ca50] text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.22em] rounded-full shadow-sm">
              <Sparkles className="w-3 h-3 text-[#f2ca50]" />
              <span>Cinematic Art &amp; Global Media</span>
            </div>
            <h1 className="font-['Cinzel'] text-[26px] sm:text-[36px] lg:text-[46px] font-normal leading-tight text-[#f4efe6]">
              Cinematic Art &amp; <span className="italic font-serif text-[#f2ca50]">Accredited Press</span>
            </h1>
            <p className="font-['Montserrat'] text-[12.5px] sm:text-[14px] text-[#c8beaa] font-light leading-relaxed">
              Curating high-concept cinematic IP that marries commercial viability with profound socio-cultural narratives across global festival circuits, premier broadcasts, and top financial journals.
            </p>
          </div>

          {/* Download Media Kit Primary CTA */}
          {onOpenMediaKit && (
            <button
              onClick={onOpenMediaKit}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-[#1e1b15] to-[#141310] border border-[#d4af37]/70 hover:border-[#f2ca50] text-[#f2ca50] font-['Montserrat'] text-[10px] sm:text-[11px] font-bold tracking-wider uppercase transition-all rounded-lg shadow-md hover:shadow-[#f2ca50]/15 hover:scale-[1.02] cursor-pointer shrink-0"
            >
              <Download className="w-3.5 h-3.5 text-[#f2ca50]" />
              <span>Download Media Kit</span>
            </button>
          )}
        </div>

        {/* Seamless Horizontal Tab Bar (Never breaks or wraps awkwardly) */}
        <div className="w-full overflow-x-auto no-scrollbar pb-1">
          <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 bg-[#171512] border border-[#3e3422] rounded-xl min-w-max">
            {[
              { id: 'filmography', label: 'Filmography', icon: Film },
              { id: 'press', label: 'Press Coverage', icon: Newspaper },
              { id: 'interviews', label: 'Broadcast Interviews', icon: Video },
              { id: 'speaking', label: 'Speaking Engagements', icon: Calendar },
            ].map((tab) => {
              const isActive = activeSubTab === tab.id;
              const IconComp = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id as any)}
                  className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg font-['Montserrat'] text-[10.5px] sm:text-[11.5px] font-bold uppercase tracking-[0.14em] transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-[#d4af37] to-[#f2ca50] text-[#131314] shadow-md shadow-[#f2ca50]/20 font-bold'
                      : 'text-[#c8beaa] hover:text-[#f4efe6] hover:bg-[#221e17]/60'
                  }`}
                >
                  <IconComp className={`w-3.5 h-3.5 ${isActive ? 'text-[#131314]' : 'text-[#f2ca50]'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 1. FILMOGRAPHY TAB */}
      {activeSubTab === 'filmography' && (
        <section className="space-y-12 animate-in fade-in duration-300">
          {/* Featured Cinema Hero Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 bg-[#181613] border border-[#3e3422] overflow-hidden rounded-2xl shadow-2xl">
            <div className="lg:col-span-7 relative min-h-[320px] sm:min-h-[400px] lg:min-h-[460px] bg-[#0c0b0a]">
              <SkeletonImage
                src={selectedFilm.image}
                alt={selectedFilm.title}
                priority={true}
                containerClassName="w-full h-full"
                className="w-full h-full object-cover filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181613] via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-[#0b0a08]/90 backdrop-blur-md border border-[#f2ca50]/50 text-[#f2ca50] font-sans text-[10px] font-bold uppercase tracking-widest rounded shadow-md flex items-center gap-2 z-10">
                <span className="w-2 h-2 rounded-full bg-[#f2ca50] animate-pulse"></span>
                <span>{selectedFilm.status} • {selectedFilm.year}</span>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="font-sans text-[10px] sm:text-[11px] font-bold text-[#ffdea5] uppercase tracking-widest block">
                  Featured Cinematic Venture
                </span>
                <h2 className="font-serif text-[28px] sm:text-[36px] text-[#f4efe6] leading-tight font-normal">
                  {selectedFilm.title}
                </h2>
                <div className="flex flex-wrap items-center gap-2 text-[11.5px] font-['Montserrat'] text-[#f2ca50]">
                  <span className="bg-[#242017] px-2.5 py-1 rounded border border-[#4d4029]">{selectedFilm.role}</span>
                  <span className="bg-[#242017] px-2.5 py-1 rounded border border-[#4d4029]">{selectedFilm.genre}</span>
                </div>
                <p className="font-sans text-[13.5px] sm:text-[14.5px] text-[#d0c5af] leading-relaxed pt-2">
                  {selectedFilm.synopsis}
                </p>
                <div className="pt-3 border-t border-[#3e3422]">
                  <span className="font-sans text-[10px] font-semibold text-[#ffdea5] uppercase tracking-wider block mb-1">
                    Festival &amp; Market Trajectory
                  </span>
                  <p className="font-sans text-[12.5px] text-[#f4efe6] leading-snug">
                    {selectedFilm.accolades}
                  </p>
                </div>
              </div>

              <div className="text-[11px] text-[#9e9689] font-mono border-t border-[#3e3422] pt-4">
                Territories: <span className="text-[#d0c5af]">{selectedFilm.territories}</span>
              </div>
            </div>
          </div>

          {/* Film Projects Grid */}
          <div className="space-y-4">
            <h3 className="font-serif text-[22px] text-[#f4efe6]">Complete Selected Filmography</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {FILM_PROJECTS.map((film) => (
                <button
                  key={film.id}
                  onClick={() => setSelectedFilm(film)}
                  className={`text-left group relative bg-[#181613] border overflow-hidden rounded-xl cursor-pointer transition-all duration-300 card-3d-hover ${
                    selectedFilm.id === film.id
                      ? 'border-[#f2ca50] ring-1.5 ring-[#f2ca50] shadow-lg shadow-[#f2ca50]/15'
                      : 'border-[#3e3422] hover:border-[#f2ca50]/60'
                  }`}
                >
                  <div className="aspect-[16/10] overflow-hidden relative bg-[#0c0b0a]">
                    <SkeletonImage
                      src={film.image}
                      alt={film.title}
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-[#0b0a08]/85 text-[#f2ca50] text-[9px] font-bold uppercase tracking-wider rounded border border-[#f2ca50]/30 z-10">
                      {film.year}
                    </div>
                  </div>
                  <div className="p-4 space-y-1">
                    <h4 className="font-serif text-[17px] text-[#f4efe6] group-hover:text-[#f2ca50] transition-colors leading-snug">
                      {film.title}
                    </h4>
                    <span className="text-[11px] text-[#ffdea5] block font-['Montserrat']">{film.genre}</span>
                    <span className="text-[10px] text-[#9e9689] block font-mono pt-1">{film.role}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 2. PRESS & COVERAGE TAB */}
      {activeSubTab === 'press' && (
        <section className="space-y-8 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {PRESS_ITEMS.map((press) => (
              <div
                key={press.id}
                className="bg-[#181613] border border-[#3e3422] hover:border-[#f2ca50]/60 transition-all rounded-xl overflow-hidden space-y-4 flex flex-col justify-between shadow-xl group card-3d-hover"
              >
                {press.image && (
                  <div className="h-44 w-full overflow-hidden relative bg-[#0c0b0a]">
                    <SkeletonImage
                      src={press.image}
                      alt={press.headline}
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#0b0a08]/85 backdrop-blur-md rounded border border-[#f2ca50]/40 text-[#f2ca50] text-[9.5px] font-bold uppercase tracking-wider z-10">
                      {press.publication}
                    </div>
                  </div>
                )}

                <div className="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-center text-[10.5px]">
                      <span className="font-sans font-bold text-[#f2ca50] uppercase tracking-wider">
                        {press.category}
                      </span>
                      <span className="text-[#99907c] font-mono">{press.date}</span>
                    </div>
                    <h3 className="font-serif text-[19px] sm:text-[20px] text-[#f4efe6] font-normal leading-snug group-hover:text-[#f2ca50] transition-colors">
                      “{press.headline}”
                    </h3>
                    <p className="font-sans text-[13px] text-[#d0c5af] leading-relaxed italic">
                      {press.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#3e3422] flex justify-between items-center text-[11px]">
                    <span className="text-[#ffdea5] font-mono">{press.readTime}</span>
                    <span className="text-[#f2ca50] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-bold text-[10.5px] uppercase tracking-wider">
                      Read Coverage <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. YOUTUBE / BROADCAST INTERVIEWS */}
      {activeSubTab === 'interviews' && (
        <section className="space-y-8 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {allVideos.map((video: any) => (
              <div
                key={video.id}
                className="bg-[#181613] border border-[#3e3422] rounded-xl overflow-hidden space-y-4 flex flex-col justify-between shadow-xl group card-3d-hover"
              >
                <div>
                  <div
                    className="relative aspect-video group cursor-pointer bg-[#0c0b0a] overflow-hidden"
                    onClick={() => setActiveVideoModal(video.title)}
                  >
                    <SkeletonImage
                      src={video.thumbnail}
                      alt={video.title}
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#d4af37] to-[#f2ca50] text-[#1a1402] flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                        <Play className="w-6 h-6 fill-current ml-0.5 text-[#131314]" />
                      </div>
                    </div>
                    <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 bg-black/85 text-white font-mono text-[10px] rounded border border-white/20">
                      {video.duration}
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <span className="text-[10px] font-bold text-[#f2ca50] uppercase tracking-widest block">
                      {video.source}
                    </span>
                    <h3 className="font-serif text-[18px] text-[#f4efe6] leading-snug group-hover:text-[#f2ca50] transition-colors">
                      {video.title}
                    </h3>
                    <p className="font-sans text-[13px] text-[#d0c5af] leading-relaxed pt-1">
                      {video.description}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2">
                  <button
                    onClick={() => setActiveVideoModal(video.title)}
                    className="w-full py-2.5 bg-[#12100e] border border-[#3e3422] hover:border-[#f2ca50] text-[#e5e2e3] hover:text-[#f2ca50] text-[10.5px] font-bold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Video className="w-3.5 h-3.5 text-[#f2ca50]" />
                    Watch Broadcast Stream
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Video Modal Preview */}
          {activeVideoModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
              <div className="relative max-w-3xl w-full bg-[#141312] border border-[#d4af37] rounded-xl overflow-hidden p-6 space-y-4 shadow-2xl">
                <div className="flex justify-between items-center pb-2 border-b border-[#3a3222]">
                  <h3 className="font-serif text-[18px] text-[#f4efe6] pr-8">{activeVideoModal}</h3>
                  <button
                    onClick={() => setActiveVideoModal(null)}
                    className="p-1 text-[#d0c5af] hover:text-[#f2ca50] cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="aspect-video bg-black rounded-lg flex items-center justify-center relative border border-[#3a3222]">
                  <div className="text-center space-y-3 p-6">
                    <div className="w-16 h-16 rounded-full bg-[#f2ca50]/20 border border-[#f2ca50] flex items-center justify-center mx-auto text-[#f2ca50]">
                      <Play className="w-8 h-8 fill-current ml-1 text-[#f2ca50]" />
                    </div>
                    <span className="font-serif text-[18px] text-[#e5e2e3] block">Official Studio Broadcast Stream</span>
                    <p className="font-sans text-[13px] text-[#d0c5af] max-w-md">
                      Accredited broadcast stream from the Chancery digital archives. HD syndication enabled.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* 4. SPEAKING ENGAGEMENTS TAB */}
      {activeSubTab === 'speaking' && (
        <section className="space-y-8 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
            {SPEAKING_ENGAGEMENTS.map((item, idx) => {
              const venueImages = [
                'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80',
                'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80',
                'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80',
                'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1000&q=80',
              ];
              const image = venueImages[idx % venueImages.length];

              return (
                <div
                  key={item.id}
                  className="bg-[#181613] border border-[#3e3422] rounded-xl overflow-hidden flex flex-col justify-between shadow-xl group card-3d-hover"
                >
                  <div className="h-44 w-full overflow-hidden relative bg-[#0c0b0a]">
                    <img
                      src={image}
                      alt={item.event}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#0b0a08]/85 backdrop-blur-md rounded border border-[#f2ca50]/40 text-[#f2ca50] text-[9.5px] font-bold font-mono">
                      {item.date}
                    </div>
                  </div>

                  <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <span className="text-[11px] text-[#ffdea5] font-semibold uppercase tracking-wider block">
                        {item.event}
                      </span>
                      <h3 className="font-serif text-[19px] sm:text-[20px] text-[#f4efe6] leading-snug group-hover:text-[#f2ca50] transition-colors">
                        {item.title}
                      </h3>
                    </div>

                    <div className="pt-3 border-t border-[#3e3422] flex items-center justify-between text-[11.5px] text-[#d0c5af]">
                      <div className="flex items-center gap-1.5 text-[#b8ad96]">
                        <MapPin className="w-3.5 h-3.5 text-[#f2ca50]" />
                        <span>{item.venue}</span>
                      </div>
                      <span className="font-mono text-[#f2ca50] text-[10.5px]">{item.audience}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Downloadable Official Media Kit */}
      <section className="p-6 sm:p-10 bg-gradient-to-br from-[#1c1913] to-[#12100d] border border-[#d4af37]/60 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-1.5 max-w-xl text-center md:text-left">
          <span className="font-sans text-[10.5px] font-bold text-[#f2ca50] tracking-widest uppercase block">
            Accredited Press Desk
          </span>
          <h3 className="font-serif text-[22px] sm:text-[26px] text-[#f4efe6]">
            Download Official Media Kit &amp; Press Biography
          </h3>
          <p className="font-sans text-[13px] text-[#d0c5af] leading-relaxed">
            Includes high-resolution official portraits, approved bios, bilateral trade corridor briefers, and Cannes festival materials.
          </p>
        </div>

        <button
          onClick={() => {
            if (onOpenMediaKit) onOpenMediaKit();
          }}
          className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-[#d4af37] via-[#f2ca50] to-[#e6bc48] text-[#131314] font-sans text-[10.5px] sm:text-[11px] font-bold tracking-widest uppercase hover:brightness-110 transition-all cursor-pointer rounded-lg whitespace-nowrap shadow-xl shadow-[#f2ca50]/20 shrink-0"
        >
          <Download className="w-4 h-4 text-[#131314]" />
          <span>Download Media Kit (PDF &amp; Assets)</span>
        </button>
      </section>
      </div>
    </div>
  );
};

export default MediaPressScreen;

