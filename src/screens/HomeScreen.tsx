import React, { useState, useEffect, useRef } from 'react';
import { TabId } from '../types';
import { PILLARS } from '../data/folioData';
import { CollaborateMode } from '../components/CollaborateModal';
import { getHeroImageAttributes, preloadPriorityImage } from '../utils/imageLoader';
import { SkeletonImage } from '../components/SkeletonImage';
import {
  ArrowRight,
  Lock,
  Send,
  CheckCircle2,
  ShieldCheck,
  Handshake,
  Newspaper,
  TrendingUp,
  ExternalLink,
  Award,
  Globe,
  Sparkles,
  Compass,
  Film,
  Users,
  Coins,
  ChevronLeft,
  ChevronRight,
  Building2,
  MessageCircle,
} from 'lucide-react';
import {
  TradeVisualEffect,
  MediaVisualEffect,
  LeadershipVisualEffect,
  InvestmentVisualEffect,
} from '../components/VerticalVisuals';

interface HomeScreenProps {
  onSelectTab: (tab: TabId) => void;
  onOpenCollaborate: (mode?: CollaborateMode) => void;
  onOpenVipPortal: () => void;
}

const SLIDE_DURATION = 6000; // 6 seconds per slide

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectTab,
  onOpenCollaborate,
  onOpenVipPortal,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [slideProgressKey, setSlideProgressKey] = useState(0);

  const heroSlides = [
    {
      id: 'sovereign',
      category: 'Sovereign Chancery',
      badge: 'GCC · India · Global',
      kicker: 'Sovereign Diplomacy | Bilateral Statecraft | Global Conclaves',
      titlePrefix: 'Zeenat',
      titleHighlight: 'Kureshi',
      positioningLine: 'Zeenat Kureshi — Sovereign Chancery & Bilateral Statecraft',
      description:
        'Spearheading high-concept cinematic IP, architecting multi-billion dollar cross-border trade corridors between India and the GCC, and championing socioeconomic equity as National President on the world stage.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC6IHnCaef41g32aYh105zuRmheL7FwAT-AndGJukXlIE3t4L0szoFQEx8N8S3oPLqPmulPo5Oo776ceRauA2mrWttmN0hpVMmyTa0pTwujXGtjzvMUBiUugC_-F00w5D3skN_AK9FxGE5wHuyFUOuCnS9w6PXK7qD9McLtiTa4qfAhLXGi3BBaDbauoUWTQ5ZowUhwCKD9zWtPptwld2KaXrFj9Uge6Tg0vxx9dGPBUC0JjEbTLaxZ',
      accentColor: '#f2ca50',
      tabTarget: 'about-zeenat' as TabId,
      tabLabel: 'Executive Chancery',
      mobileLabel: 'Chancery',
      slideNumber: '01',
      tagline: 'Sovereign Diplomacy & Strategy',
    },
    {
      id: 'media',
      category: 'Cinematic Arts',
      badge: 'Transnational Cinema · Cannes & Global Festivals',
      kicker: 'International Co-Productions | Festival Trajectories | Global OTT',
      titlePrefix: 'Cinematic',
      titleHighlight: 'Narratives',
      positioningLine: 'Zeenat Kureshi — Film Producer & Global Media Financier',
      description:
        'Developing landmark cinematic intellectual property marrying commercial viability with profound socio-cultural narratives across international co-production treaties and global distribution syndicates.',
      image:
        'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=2000&q=85',
      accentColor: '#e9c176',
      tabTarget: 'media-press' as TabId,
      tabLabel: 'Film & Media',
      mobileLabel: 'Cinema',
      slideNumber: '02',
      tagline: 'Global Screens & Co-Productions',
    },
    {
      id: 'trade',
      category: 'Bilateral Commerce',
      badge: 'CEPA Frameworks · Sovereign Corridors · FDI Allocation',
      kicker: 'Ministerial Delegations | Cross-Border Corridors | Inward FDI',
      titlePrefix: 'Bilateral',
      titleHighlight: 'Trade & FDI',
      positioningLine: 'Zeenat Kureshi — GCC–India Bilateral Trade Commissioner',
      description:
        'Navigating sovereign commerce across the UAE, Saudi Arabia, Qatar, and India under CEPA frameworks. Architecting high-level market entries, ministerial trade delegations, and institutional private capital conduits.',
      image:
        'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2000&q=85',
      accentColor: '#f2ca50',
      tabTarget: 'trade-investment' as TabId,
      tabLabel: 'Trade Corridors',
      mobileLabel: 'Trade',
      slideNumber: '03',
      tagline: 'Cross-Border Capital & Corridors',
    },
    {
      id: 'leadership',
      category: 'Civic Mandate',
      badge: 'National Women Cell · 120,000+ Mobilized',
      kicker: 'National President | Policy Advocacy | Boardroom Parity',
      titlePrefix: 'Women',
      titleHighlight: 'Leadership',
      positioningLine: 'Zeenat Kureshi — National President, Women Leadership Council',
      description:
        'Serving as National President to mobilize grassroots enterprise, seed grants, and boardroom parity. Championing public policy advocacy and sovereign mentorship conclaves elevating 120,000+ women leaders worldwide.',
      image:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=2000&q=85',
      accentColor: '#ffdea5',
      tabTarget: 'women-leadership' as TabId,
      tabLabel: 'Women Leadership',
      mobileLabel: 'Leadership',
      slideNumber: '04',
      tagline: 'Civic Equity & Parity Conclaves',
    },
  ];

  // Preload all hero banner images with priority hints for instant, seamless transitions
  useEffect(() => {
    // 1. Priority load the primary active slide immediately with high fetchPriority
    if (heroSlides[0]) {
      preloadPriorityImage(heroSlides[0].image, {
        fetchPriority: 'high',
        widths: [640, 960, 1280, 1920, 2560],
        sizes: '100vw',
      });
    }

    // 2. Background preload remaining slides for instant crossfades
    heroSlides.slice(1).forEach((slide) => {
      preloadPriorityImage(slide.image, {
        fetchPriority: 'auto',
        widths: [640, 960, 1280, 1920, 2560],
        sizes: '100vw',
      });
    });
  }, []);

  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Automatic slide advancement timer with pause support
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      setSlideProgressKey((prev) => prev + 1);
    }, SLIDE_DURATION);

    return () => clearInterval(interval);
  }, [heroSlides.length, isPaused, slideProgressKey]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setSlideProgressKey((prev) => prev + 1);
  };

  const handleNextSlide = () => {
    if (currentSlide < heroSlides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
      setSlideProgressKey((prev) => prev + 1);
    } else {
      // Loop back to start if triggered
      setCurrentSlide(0);
      setSlideProgressKey((prev) => prev + 1);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
      setSlideProgressKey((prev) => prev + 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 45) {
      // Swiped left -> next slide
      handleNextSlide();
    } else if (diff < -45) {
      // Swiped right -> prev slide
      handlePrevSlide();
    }
    setTouchStartX(null);
  };

  const activeSlideData = heroSlides[currentSlide];
  const isFirstSlide = currentSlide === 0;
  const isLastSlide = currentSlide === heroSlides.length - 1;

  return (
    <div className="flex flex-col w-full text-[#e5e2e3] overflow-x-hidden animate-page-enter">
      {/* SECTION 1: IMMERSIVE 4-SLIDE CINEMATIC HERO BANNER (RESPONSIVE ON ALL SCREENS) */}
      <section
        className="relative w-full min-h-[calc(100svh-56px)] sm:min-h-[calc(100svh-64px)] pt-4 sm:pt-8 pb-10 sm:pb-16 flex flex-col justify-end overflow-hidden bg-[#070707] select-none"
        aria-label="Cinematic Hero Banner"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Background Slides with Smooth Crossfade and 3D Ken-Burns Depth */}
        {heroSlides.map((slide, index) => {
          const isActive = index === currentSlide;
          const isPriority = index === 0;
          const heroImgAttrs = getHeroImageAttributes(slide.image, {
            priority: isPriority,
            widths: [640, 960, 1280, 1920, 2560],
            sizes: '100vw',
            quality: 85,
          });

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-0' : 'opacity-0 -z-10 pointer-events-none'
              }`}
            >
              {/* YouTube / Instagram / Facebook Style Animated Shimmer Skeleton Base */}
              <div
                className="absolute inset-0 skeleton-shimmer-wave opacity-90"
                aria-hidden="true"
              />

              <img
                {...heroImgAttrs}
                alt={slide.kicker}
                className={`w-full h-full object-cover relative z-0 ${
                  slide.id === 'sovereign'
                    ? 'object-[center_15%] sm:object-center'
                    : slide.id === 'leadership'
                    ? 'object-[center_20%] sm:object-center'
                    : 'object-center'
                } hero-cinematic-image transition-transform duration-[7000ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
              />
              {/* Dynamic luxury gradient overlays - keeping photography luminous and sharp */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/55 to-black/20 sm:from-black/95 sm:via-black/60 sm:to-black/15 z-1"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-black/35 to-transparent z-1"></div>
              {/* Ambient Gold Radial Glow behind the hero typography */}
              <div className="absolute -left-16 sm:-left-20 top-1/4 w-[280px] sm:w-[600px] h-[280px] sm:h-[600px] bg-[#f2ca50]/12 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none animate-gold-pulse z-1"></div>
              <div className="absolute inset-0 hero-grain pointer-events-none z-1"></div>
            </div>
          );
        })}

        {/* Top-Right Header Status (Tablet & Desktop only to prevent mobile overlap) */}
        <div className="hidden sm:flex absolute top-20 sm:top-24 right-4 sm:right-7 lg:right-12 z-20 items-center gap-2 sm:gap-3 text-[8px] sm:text-[9px] font-['Montserrat'] tracking-[0.2em] sm:tracking-[0.25em] uppercase text-white/70">
          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-2.5 sm:px-3.5 py-1 sm:py-1.5 border border-[#f2ca50]/20 rounded-full shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#f2ca50] animate-pulse"></span>
            <span className="font-semibold text-white/90">Sovereign Folio</span>
          </div>
        </div>

        {/* Left Floating Chevron (Visible when not on the very first slide, prominent when on the last slide) */}
        <button
          onClick={handlePrevSlide}
          disabled={isFirstSlide}
          className={`hidden md:flex absolute left-3 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-3.5 bg-black/60 backdrop-blur-md border border-[#f2ca50]/40 text-[#f2ca50] transition-all duration-300 rounded-full shadow-2xl group ${
            isFirstSlide
              ? 'opacity-0 pointer-events-none scale-75'
              : 'opacity-100 scale-100 hover:scale-110 hover:border-[#f2ca50] hover:bg-black/85 cursor-pointer shadow-[0_0_20px_rgba(242,202,80,0.25)]'
          }`}
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        {/* Right Floating Chevron (Visible when not on the last slide) */}
        <button
          onClick={handleNextSlide}
          disabled={isLastSlide}
          className={`hidden md:flex absolute right-3 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-3.5 bg-black/60 backdrop-blur-md border border-[#f2ca50]/40 text-[#f2ca50] transition-all duration-300 rounded-full shadow-2xl group ${
            isLastSlide
              ? 'opacity-0 pointer-events-none scale-75'
              : 'opacity-100 scale-100 hover:scale-110 hover:border-[#f2ca50] hover:bg-black/85 cursor-pointer shadow-[0_0_20px_rgba(242,202,80,0.25)]'
          }`}
          aria-label="Next Slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Main Content Area with Clean, Spacious Luxury Mobile & Desktop Hierarchy */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pb-4 sm:pb-8 lg:pb-12 pt-4 sm:pt-12">
          <div className="max-w-4xl min-h-[290px] xs:min-h-[310px] sm:min-h-[340px] md:min-h-[370px] lg:min-h-[400px] flex flex-col justify-end">
            <div key={currentSlide} className="space-y-3 sm:space-y-4 animate-hero-slide-fade">
              {/* Slide Category Badge & Kicker */}
              <div className="flex items-center gap-2 sm:gap-3 h-5 sm:h-6 overflow-hidden">
                <span
                  className="w-4 sm:w-8 h-px shrink-0 transition-colors duration-500"
                  style={{ backgroundColor: activeSlideData.accentColor }}
                ></span>
                <span
                  className="font-['Montserrat'] text-[8px] sm:text-[10px] md:text-[10.5px] font-bold tracking-[0.2em] sm:tracking-[0.28em] uppercase truncate"
                  style={{ color: activeSlideData.accentColor }}
                >
                  {activeSlideData.badge}
                </span>
              </div>

              {/* Dynamic Positioning Pill */}
              <div className="inline-flex items-center bg-black/60 backdrop-blur-md border border-[#f2ca50]/30 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-md max-w-full">
                <p className="font-['Montserrat'] text-[8px] sm:text-[9.5px] md:text-[10.5px] text-[#f2ca50] font-semibold tracking-[0.1em] sm:tracking-[0.16em] uppercase leading-relaxed truncate">
                  {activeSlideData.positioningLine}
                </p>
              </div>

              {/* Slide Title with Fluid Luxury Horizontal Typography */}
              <div className="min-h-[48px] xs:min-h-[58px] sm:min-h-[76px] md:min-h-[92px] lg:min-h-[110px] flex items-center">
                <h1 className="font-['Bodoni Moda'] text-[28px] xs:text-[34px] sm:text-[46px] md:text-[56px] lg:text-[68px] xl:text-[76px] leading-[1.08] tracking-[-0.02em] font-normal text-white drop-shadow-2xl flex flex-wrap items-baseline gap-x-2 sm:gap-x-3.5">
                  <span>{activeSlideData.titlePrefix}</span>
                  <span className="italic gold-gradient-text">
                    {activeSlideData.titleHighlight}
                  </span>
                </h1>
              </div>

              {/* Concise Luxury Introduction */}
              <div
                className="max-w-2xl border-l-2 pl-3 sm:pl-4 transition-colors duration-500 bg-black/40 backdrop-blur-xs py-1 rounded-r min-h-[54px] sm:min-h-[64px] md:min-h-[72px] flex items-center"
                style={{ borderColor: activeSlideData.accentColor }}
              >
                <p className="font-['Montserrat'] text-[11px] sm:text-[13px] md:text-[14px] text-white/90 font-light leading-relaxed line-clamp-3 sm:line-clamp-3">
                  {activeSlideData.description}
                </p>
              </div>

              {/* Responsive Call to Action Buttons - Perfectly Balanced & Symmetrical */}
              {/* Mobile View: 50/50 Dual Pill Grid with Identical Height & Sleek Alignment */}
              <div className="grid grid-cols-2 gap-2.5 sm:hidden pt-2 w-full max-w-lg h-11">
                <button
                  onClick={() => {
                    onSelectTab(activeSlideData.tabTarget);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="h-11 w-full inline-flex items-center justify-center gap-1.5 px-3 bg-gradient-to-r from-[#d4af37] via-[#f2ca50] to-[#e6bc48] text-[#141002] font-['Montserrat'] text-[9.5px] xs:text-[10px] font-bold tracking-[0.12em] uppercase rounded-lg shadow-[0_4px_16px_rgba(242,202,80,0.3)] active:scale-95 transition-all cursor-pointer border border-[#f2ca50]"
                >
                  <span className="truncate">Explore {activeSlideData.mobileLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0 text-[#141002]" />
                </button>

                <button
                  onClick={() => onOpenCollaborate('media')}
                  className="h-11 w-full inline-flex items-center justify-center gap-1.5 px-3 border border-[#d4af37]/70 hover:border-[#f2ca50] bg-[#14120f]/90 hover:bg-[#1c1914] text-[#f2ca50] font-['Montserrat'] text-[9.5px] xs:text-[10px] font-bold tracking-[0.12em] uppercase rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.5)] active:scale-95 transition-all cursor-pointer backdrop-blur-md"
                >
                  <Newspaper className="w-3.5 h-3.5 text-[#f2ca50] shrink-0" />
                  <span className="truncate">Protocol Inquiry</span>
                </button>
              </div>

              {/* Tablet & Desktop View: 3 Refined Luxury CTAs */}
              <div className="hidden sm:flex items-center gap-3 pt-2 h-12">
                <button
                  onClick={() => {
                    onSelectTab(activeSlideData.tabTarget);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 h-12 bg-[#f2ca50] text-[#080808] font-['Montserrat'] text-[10.5px] font-bold tracking-[0.16em] uppercase transition-all duration-300 hover:bg-[#ffe088] hover:scale-102 cursor-pointer shadow-xl shadow-[#f2ca50]/20 rounded-lg"
                >
                  <span>Explore {activeSlideData.tabLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onOpenCollaborate('media')}
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 h-12 border border-white/30 bg-black/40 backdrop-blur-md text-white font-['Montserrat'] text-[10.5px] font-semibold tracking-[0.16em] uppercase hover:border-[#f2ca50] hover:text-[#f2ca50] hover:bg-black/60 transition-all cursor-pointer shadow-lg rounded-lg"
                >
                  <Newspaper className="w-3.5 h-3.5" />
                  <span>Media Inquiry</span>
                </button>

                <button
                  onClick={() => onOpenCollaborate('investment')}
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 h-12 border border-[#f2ca50]/70 bg-[#f2ca50]/10 backdrop-blur-md text-[#f2ca50] font-['Montserrat'] text-[10.5px] font-semibold tracking-[0.16em] uppercase hover:bg-[#f2ca50] hover:text-[#080808] transition-all cursor-pointer shadow-lg rounded-lg"
                >
                  <Coins className="w-3.5 h-3.5" />
                  <span>Investment Discussion</span>
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Slide Switcher */}
          {/* Mobile View: 4 Clean, Luxury Navigation Tabs */}
          <div className="grid grid-cols-4 gap-1.5 xs:gap-2 sm:hidden mt-4 pt-1 w-full pb-2">
            {heroSlides.map((slide, index) => {
              const isSelected = index === currentSlide;
              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(index)}
                  className={`h-11 px-1 rounded-lg flex items-center justify-center text-center border transition-all duration-300 relative overflow-hidden cursor-pointer active:scale-95 ${
                    isSelected
                      ? 'bg-gradient-to-b from-[#241e12] to-[#110f0c] border-[#f2ca50] shadow-[0_0_16px_rgba(242,202,80,0.35)]'
                      : 'bg-[#0e0d0b]/85 border-white/10 hover:border-[#f2ca50]/40'
                  }`}
                >
                  {isSelected && (
                    <div
                      key={`mob-progress-${slideProgressKey}`}
                      className="absolute top-0 left-0 h-[2.5px] bg-[#f2ca50] shadow-[0_0_8px_#f2ca50] animate-slide-timer"
                    />
                  )}
                  <span
                    className={`font-['Montserrat'] text-[9px] xs:text-[9.5px] font-bold uppercase tracking-wider whitespace-nowrap ${
                      isSelected ? 'text-[#f2ca50]' : 'text-white/70'
                    }`}
                  >
                    {slide.mobileLabel}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Tablet & Desktop View: 4 Detailed Interactive Cards */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-8 lg:mt-12 max-w-5xl">
            {heroSlides.map((slide, index) => {
              const isSelected = index === currentSlide;
              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(index)}
                  className={`group text-left p-3.5 sm:p-4 rounded-lg backdrop-blur-md transition-all duration-300 cursor-pointer border relative overflow-hidden card-3d-hover ${
                    isSelected
                      ? 'bg-black/85 border-[#f2ca50] shadow-xl shadow-[#f2ca50]/15'
                      : 'bg-black/45 border-white/10 hover:border-[#f2ca50]/40 hover:bg-black/65'
                  }`}
                >
                  {isSelected && (
                    <div
                      key={`desk-progress-${slideProgressKey}`}
                      className="absolute top-0 left-0 h-[2.5px] bg-[#f2ca50] shadow-[0_0_8px_#f2ca50] animate-slide-timer z-10"
                    />
                  )}

                  <div className="flex items-center justify-between mb-1">
                    <span
                      className="text-[8px] sm:text-[8.5px] font-['Montserrat'] tracking-[0.16em] sm:tracking-[0.2em] font-semibold uppercase truncate"
                      style={{ color: isSelected ? slide.accentColor : '#b5aa96' }}
                    >
                      {slide.category}
                    </span>
                    <span
                      className={`text-[7px] sm:text-[7.5px] uppercase tracking-wider font-['Montserrat'] px-1.5 py-0.5 rounded border transition-opacity ${
                        isSelected
                          ? 'border-[#f2ca50]/50 text-[#f2ca50] bg-[#f2ca50]/10 opacity-100'
                          : 'border-transparent text-white/30 opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      {isSelected ? 'Active' : 'Select'}
                    </span>
                  </div>

                  <h3
                    className={`font-['Bodoni Moda'] text-[14px] sm:text-[16px] transition-colors leading-snug truncate ${
                      isSelected ? 'text-white font-medium' : 'text-white/75 group-hover:text-white'
                    }`}
                  >
                    {slide.tabLabel}
                  </h3>
                  <p className="font-['Montserrat'] text-[8px] sm:text-[9px] text-white/55 uppercase tracking-[0.08em] mt-1 line-clamp-1">
                    {slide.tagline}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* DEDICATED SOVEREIGN TRUST METRICS BAR (FULLY RESPONSIVE) */}
      <section className="w-full bg-[#0c0b0a] border-y border-[#2e271a] py-6 sm:py-8">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-10">
            <div className="space-y-1 text-center md:text-left border-r border-[#2e271a] pr-2 sm:pr-4">
              <span className="font-['Cinzel'] text-[22px] sm:text-[28px] lg:text-[34px] text-[#f2ca50] block font-semibold leading-none">
                $450M+
              </span>
              <span className="font-['Montserrat'] text-[8px] sm:text-[9.5px] font-medium text-[#b8ad96] uppercase tracking-[0.14em] sm:tracking-[0.18em]">
                Bilateral Facilitation
              </span>
            </div>
            <div className="space-y-1 text-center md:text-left md:border-r border-[#2e271a] pr-2 sm:pr-4">
              <span className="font-['Cinzel'] text-[22px] sm:text-[28px] lg:text-[34px] text-[#e9c176] block font-semibold leading-none">
                14+
              </span>
              <span className="font-['Montserrat'] text-[8px] sm:text-[9.5px] font-medium text-[#b8ad96] uppercase tracking-[0.14em] sm:tracking-[0.18em]">
                Global Screen Projects
              </span>
            </div>
            <div className="space-y-1 text-center md:text-left border-r border-[#2e271a] pr-2 sm:pr-4 pt-2 md:pt-0">
              <span className="font-['Cinzel'] text-[22px] sm:text-[28px] lg:text-[34px] text-[#f2ca50] block font-semibold leading-none">
                120K+
              </span>
              <span className="font-['Montserrat'] text-[8px] sm:text-[9.5px] font-medium text-[#b8ad96] uppercase tracking-[0.14em] sm:tracking-[0.18em]">
                Women Empowered
              </span>
            </div>
            <div className="space-y-1 text-center md:text-left pt-2 md:pt-0">
              <span className="font-['Cinzel'] text-[22px] sm:text-[28px] lg:text-[34px] text-[#e9c176] block font-semibold leading-none">
                18+
              </span>
              <span className="font-['Montserrat'] text-[8px] sm:text-[9.5px] font-medium text-[#b8ad96] uppercase tracking-[0.14em] sm:tracking-[0.18em]">
                Diplomatic Delegations
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: FEATURED MEDIA LOGOS (RESPONSIVE GRID) */}
      <section className="w-full bg-gradient-to-b from-[#11100d] via-[#161411] to-[#0e0d0b] py-12 sm:py-16 border-y border-[#d4af37]/35 relative shadow-inner">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4 mb-8 sm:mb-10">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f2ca50]/10 border border-[#f2ca50]/40 text-[#f2ca50] font-['Montserrat'] text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.22em]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f2ca50] shadow-[0_0_6px_#f2ca50]"></span>
                Accredited Press &amp; Global Media Presence
              </div>
              <h2 className="font-['Cinzel'] text-[18px] sm:text-[22px] md:text-[24px] text-[#f4efe6] font-semibold tracking-[0.08em]">
                Featured Across Premier International Publications
              </h2>
              <p className="font-['Montserrat'] text-[12px] sm:text-[13px] text-[#c5ba9d] max-w-2xl leading-relaxed">
                Recognized coverage across premier international financial publications, film trade magazines, and diplomatic registries
              </p>
            </div>
            <div className="h-px bg-[#d4af37]/30 flex-1 hidden md:block ml-8"></div>
          </div>

          {/* Featured Media Logos Grid - High Contrast, Clear & Distinguished */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-3 sm:gap-3.5 items-stretch">
            {/* Bloomberg */}
            <div className="group flex flex-col items-center justify-center p-3.5 rounded-xl bg-[#1b1915]/95 border border-[#3e3422] hover:border-[#f2ca50] transition-all duration-300 cursor-pointer text-center shadow-sm hover:shadow-[0_4px_20px_rgba(242,202,80,0.2)] hover:-translate-y-0.5">
              <span className="font-sans text-[18px] sm:text-[19px] tracking-tight uppercase font-bold text-[#f5f0e6] group-hover:text-[#f2ca50] transition-colors">
                Bloomberg
              </span>
              <span className="text-[9.5px] uppercase tracking-wider font-semibold text-[#bdae93] group-hover:text-[#f2ca50] transition-colors mt-1">
                Trade Analysis
              </span>
            </div>

            {/* Forbes */}
            <div className="group flex flex-col items-center justify-center p-3.5 rounded-xl bg-[#1b1915]/95 border border-[#3e3422] hover:border-[#f2ca50] transition-all duration-300 cursor-pointer text-center shadow-sm hover:shadow-[0_4px_20px_rgba(242,202,80,0.2)] hover:-translate-y-0.5">
              <span className="font-serif text-[20px] sm:text-[21px] tracking-tight uppercase font-semibold text-[#f5f0e6] group-hover:text-[#f2ca50] transition-colors">
                Forbes
              </span>
              <span className="text-[9.5px] uppercase tracking-wider font-semibold text-[#bdae93] group-hover:text-[#f2ca50] transition-colors mt-1">
                Leadership
              </span>
            </div>

            {/* Variety */}
            <div className="group flex flex-col items-center justify-center p-3.5 rounded-xl bg-[#1b1915]/95 border border-[#3e3422] hover:border-[#f2ca50] transition-all duration-300 cursor-pointer text-center shadow-sm hover:shadow-[0_4px_20px_rgba(242,202,80,0.2)] hover:-translate-y-0.5">
              <span className="font-mono text-[16px] sm:text-[17px] tracking-widest text-[#f5f0e6] group-hover:text-[#f2ca50] transition-colors font-bold">
                VARIETY
              </span>
              <span className="text-[9.5px] uppercase tracking-wider font-semibold text-[#bdae93] group-hover:text-[#f2ca50] transition-colors mt-1">
                Film Co-Pro
              </span>
            </div>

            {/* CNBC-TV18 */}
            <div className="group flex flex-col items-center justify-center p-3.5 rounded-xl bg-[#1b1915]/95 border border-[#3e3422] hover:border-[#f2ca50] transition-all duration-300 cursor-pointer text-center shadow-sm hover:shadow-[0_4px_20px_rgba(242,202,80,0.2)] hover:-translate-y-0.5">
              <span className="font-sans text-[15px] sm:text-[16px] tracking-normal font-bold text-[#f5f0e6] group-hover:text-[#f2ca50] transition-colors">
                CNBC-TV18
              </span>
              <span className="text-[9.5px] uppercase tracking-wider font-semibold text-[#bdae93] group-hover:text-[#f2ca50] transition-colors mt-1">
                Market View
              </span>
            </div>

            {/* Financial Times */}
            <div className="group flex flex-col items-center justify-center p-3.5 rounded-xl bg-[#1b1915]/95 border border-[#3e3422] hover:border-[#f2ca50] transition-all duration-300 cursor-pointer text-center shadow-sm hover:shadow-[0_4px_20px_rgba(242,202,80,0.2)] hover:-translate-y-0.5">
              <span className="font-serif text-[20px] sm:text-[21px] tracking-wider text-[#f2ca50] group-hover:text-[#ffe088] transition-colors font-bold">
                FT
              </span>
              <span className="text-[9.5px] uppercase tracking-wider font-semibold text-[#bdae93] group-hover:text-[#f2ca50] transition-colors mt-1">
                CEPA Pact
              </span>
            </div>

            {/* Khaleej Times */}
            <div className="group flex flex-col items-center justify-center p-3.5 rounded-xl bg-[#1b1915]/95 border border-[#3e3422] hover:border-[#f2ca50] transition-all duration-300 cursor-pointer text-center shadow-sm hover:shadow-[0_4px_20px_rgba(242,202,80,0.2)] hover:-translate-y-0.5">
              <span className="font-serif text-[16px] sm:text-[17px] tracking-tight italic font-semibold text-[#f5f0e6] group-hover:text-[#f2ca50] transition-colors">
                Khaleej Times
              </span>
              <span className="text-[9.5px] uppercase tracking-wider font-semibold text-[#bdae93] group-hover:text-[#f2ca50] transition-colors mt-1">
                Gulf Focus
              </span>
            </div>

            {/* Reuters */}
            <div className="group flex flex-col items-center justify-center p-3.5 rounded-xl bg-[#1b1915]/95 border border-[#3e3422] hover:border-[#f2ca50] transition-all duration-300 cursor-pointer text-center shadow-sm hover:shadow-[0_4px_20px_rgba(242,202,80,0.2)] hover:-translate-y-0.5">
              <span className="font-sans text-[16px] sm:text-[17px] tracking-widest uppercase font-bold text-[#f5f0e6] group-hover:text-[#f2ca50] transition-colors">
                Reuters
              </span>
              <span className="text-[9.5px] uppercase tracking-wider font-semibold text-[#bdae93] group-hover:text-[#f2ca50] transition-colors mt-1">
                Diplomatic Desk
              </span>
            </div>

            {/* Gulf News */}
            <div className="group flex flex-col items-center justify-center p-3.5 rounded-xl bg-[#1b1915]/95 border border-[#3e3422] hover:border-[#f2ca50] transition-all duration-300 cursor-pointer text-center shadow-sm hover:shadow-[0_4px_20px_rgba(242,202,80,0.2)] hover:-translate-y-0.5">
              <span className="font-serif text-[16px] sm:text-[17px] tracking-normal font-semibold text-[#f5f0e6] group-hover:text-[#f2ca50] transition-colors">
                Gulf News
              </span>
              <span className="text-[9.5px] uppercase tracking-wider font-semibold text-[#bdae93] group-hover:text-[#f2ca50] transition-colors mt-1">
                FDI Bilateral
              </span>
            </div>

            {/* FICCI */}
            <div className="group flex flex-col items-center justify-center p-3.5 rounded-xl bg-[#1b1915]/95 border border-[#3e3422] hover:border-[#f2ca50] transition-all duration-300 cursor-pointer text-center shadow-sm hover:shadow-[0_4px_20px_rgba(242,202,80,0.2)] hover:-translate-y-0.5">
              <span className="font-sans text-[16px] sm:text-[17px] tracking-widest font-black text-[#f5f0e6] group-hover:text-[#f2ca50] transition-colors">
                FICCI
              </span>
              <span className="text-[9.5px] uppercase tracking-wider font-semibold text-[#bdae93] group-hover:text-[#f2ca50] transition-colors mt-1">
                Industrial Pacts
              </span>
            </div>

            {/* Arab-India Chamber */}
            <div className="group flex flex-col items-center justify-center p-3.5 rounded-xl bg-[#1b1915]/95 border border-[#3e3422] hover:border-[#f2ca50] transition-all duration-300 cursor-pointer text-center shadow-sm hover:shadow-[0_4px_20px_rgba(242,202,80,0.2)] hover:-translate-y-0.5">
              <span className="font-sans text-[13px] sm:text-[14px] font-bold tracking-tight text-[#f5f0e6] group-hover:text-[#f2ca50] leading-none transition-colors">
                Arab-India<br />
                <span className="text-[9.5px] tracking-widest uppercase text-[#f2ca50]">Chamber</span>
              </span>
              <span className="text-[9.5px] uppercase tracking-wider font-semibold text-[#bdae93] group-hover:text-[#f2ca50] transition-colors mt-1">
                Bilateral Envoy
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: KEY VERTICALS (TRADE | MEDIA | WOMEN LEADERSHIP | INVESTMENT ADVISORY) */}
      <section className="w-full bg-[#110f0c] py-20 lg:py-28 relative overflow-hidden" id="verticals">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#f2ca50]/5 rounded-full blur-[180px] pointer-events-none"></div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Section Header with Refined Responsive Luxury Typography */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-5 mb-10 lg:mb-14 pb-6 border-b border-[#2e271a]">
            <div className="space-y-2.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1c1913] border border-[#d4af37]/40 text-[#f2ca50] text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.22em] rounded-full shadow-sm">
                <Sparkles className="w-3 h-3 text-[#f2ca50]" />
                <span>Strategic Portfolios &amp; Mandates</span>
              </div>
              <h2 className="font-['Cinzel'] text-[26px] sm:text-[36px] lg:text-[42px] font-normal text-[#f4efe6] leading-tight tracking-tight">
                Key Verticals
              </h2>
              <p className="font-['Montserrat'] text-[12.5px] sm:text-[14px] text-[#b8ad96] font-light leading-relaxed max-w-xl">
                Sovereign execution across four foundational pillars uniting economic diplomacy, global storytelling, and civic governance.
              </p>
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <div className="px-3.5 py-1.5 rounded-lg bg-[#171512] border border-[#3e3422] text-[#d4af37] font-['Montserrat'] text-[10px] font-semibold tracking-widest uppercase">
                4 Core Diplomatic Pillars
              </div>
            </div>
          </div>

          {/* 4 Key Verticals Grid - Responsive across Mobile, Tablet, and Laptop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 lg:gap-8">
            {PILLARS.map((pillar) => {
              // Select custom visual effect for each vertical
              let highlightPill = 'Bilateral Corridor • $450M+ FDI Flow';
              let IconComponent = Compass;

              if (pillar.id === 'media') {
                highlightPill = 'Transnational Screens • Cannes & Venice';
                IconComponent = Film;
              } else if (pillar.id === 'women-leadership') {
                highlightPill = 'Civic Parity • 120,000+ Mobilized';
                IconComponent = Users;
              } else if (pillar.id === 'investment-advisory') {
                highlightPill = 'Sovereign Wealth • Capital Allocation';
                IconComponent = Coins;
              }

              return (
                <div
                  key={pillar.id}
                  className="group relative bg-[#14120f] hover:bg-[#181511] transition-all duration-500 flex flex-col justify-between rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.45)] hover:shadow-[0_14px_36px_rgba(212,175,55,0.09)] overflow-hidden border border-[#2e2617] hover:border-[#d4af37]/60"
                >
                  {/* Optimized Image Container with Unified Proportions */}
                  <div className="relative h-44 sm:h-48 md:h-52 w-full overflow-hidden bg-[#0c0b0a] border-b border-[#2e2617]/70">
                    <SkeletonImage
                      src={pillar.image}
                      alt={`${pillar.title} showcase`}
                      fallbackSrc={pillar.fallbackImage}
                      referrerPolicy="no-referrer"
                      containerClassName="w-full h-full"
                      skeletonClassName="bg-[#12100d]"
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out filter brightness-[0.88] group-hover:brightness-100 contrast-105"
                    />

                    {/* Smooth Gradient Blend into Card Body */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14120f] via-[#14120f]/30 to-transparent pointer-events-none"></div>

                    {/* Minimalist Top Elements: Domain Badge & Pillar Number */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0b0a08]/85 backdrop-blur-md border border-[#d4af37]/40 text-[#f2ca50] shadow-sm">
                        <IconComponent className="w-3.5 h-3.5 text-[#f2ca50]" />
                        <span className="font-['Montserrat'] text-[9.5px] sm:text-[10px] font-bold tracking-[0.18em] uppercase">
                          {pillar.vertical}
                        </span>
                      </div>
                      <span className="font-mono text-[9px] font-semibold text-[#d4af37] tracking-widest uppercase px-2.5 py-0.5 bg-[#0b0a08]/85 backdrop-blur-md rounded border border-[#d4af37]/30 shadow-xs">
                        {pillar.pillarNumber}
                      </span>
                    </div>

                    {/* Minimalist Bottom Highlight on Image */}
                    <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none z-10">
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#0b0a08]/85 backdrop-blur-xs border border-[#d4af37]/25 text-[9.5px] font-['Montserrat'] text-[#e9c176] font-medium tracking-wider shadow-xs">
                        <Sparkles className="w-2.5 h-2.5 text-[#f2ca50] shrink-0" />
                        <span>{highlightPill}</span>
                      </div>
                      <span className="text-[8.5px] font-mono tracking-widest text-[#a89e8b] uppercase hidden sm:inline-block bg-[#0b0a08]/70 px-2 py-0.5 rounded border border-[#2e2617]">
                        {pillar.category}
                      </span>
                    </div>
                  </div>

                  {/* Card Body with Sleek Minimalist Padding and Spacing */}
                  <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2.5">
                      {/* Pillar Title */}
                      <h3 className="font-['Cinzel'] text-[19px] sm:text-[21px] text-[#f4efe6] font-normal leading-snug group-hover:text-[#f2ca50] transition-colors">
                        {pillar.title}
                      </h3>

                      {/* Clean Streamlined Description */}
                      <p className="font-['Montserrat'] text-[12.5px] sm:text-[13px] text-[#c8beaa] font-light leading-relaxed">
                        {pillar.description}
                      </p>

                      {/* Key Strategic Bullets with Subtle Gold Bullets */}
                      <ul className="space-y-1.5 pt-1 text-[#b8ad96] font-['Montserrat'] text-[11.5px] sm:text-[12px]">
                        {pillar.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] mt-1.5 shrink-0 opacity-80"></span>
                            <span className="leading-snug">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Card Actions Footer with Consistent Heights */}
                    <div className="pt-4 flex items-center justify-between gap-3 border-t border-[#2e2617]/80 mt-3">
                      <button
                        onClick={() => {
                          onSelectTab(pillar.targetTab);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="inline-flex items-center gap-1.5 font-['Montserrat'] text-[10px] sm:text-[10.5px] font-bold group-hover:translate-x-1 transition-transform tracking-[0.16em] uppercase cursor-pointer py-1.5 text-[#f2ca50] hover:text-[#ffe088]"
                      >
                        <span>{pillar.linkText}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => {
                          if (pillar.id === 'trade') onOpenCollaborate('investment');
                          else if (pillar.id === 'media') onOpenCollaborate('media');
                          else if (pillar.id === 'women-leadership') onOpenCollaborate('collaborate');
                          else onOpenCollaborate('investment');
                        }}
                        className="px-3.5 py-1.5 bg-[#171512] hover:bg-[#221d15] border border-[#3e3422] hover:border-[#f2ca50] text-[#c8beaa] hover:text-[#f2ca50] font-['Montserrat'] text-[9.5px] sm:text-[10px] font-semibold tracking-[0.14em] uppercase transition-all duration-200 rounded min-h-[36px] flex items-center justify-center cursor-pointer shadow-xs active:scale-[0.98]"
                      >
                        Direct Inquiry
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: LEADERSHIP SPOTLIGHT & EMBOSSED STATEMENT */}
      <section className="w-full bg-[#0e0e0f] py-24 relative overflow-hidden border-y border-[#4d4635]/30">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Sovereign Statement Text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-1.5">
                <span className="font-sans text-[10px] font-semibold text-[#f2ca50] tracking-[0.25em] uppercase">
                  Executive Manifesto
                </span>
                <div className="w-12 h-0.5 bg-[#f2ca50]/50"></div>
              </div>

              <blockquote className="font-serif text-[20px] sm:text-[24px] lg:text-[27px] text-[#e5e2e3] leading-snug italic font-normal">
                “True leadership is not merely occupying space at the global table, but building corridors where sovereign commerce, cultural art, and humanitarian dignity converge.”
              </blockquote>

              <div className="space-y-2 pt-3 border-t border-[#4d4635]/30">
                <h4 className="font-serif text-[18px] sm:text-[20px] text-[#e5e2e3] font-medium uppercase tracking-wider">
                  Zeenat Kureshi
                </h4>
                <p className="font-sans text-[13.5px] text-[#e9c176]">
                  Trade Commissioner <span className="text-[#f2ca50]/60 px-1">|</span> Award-Winning Film Producer <span className="text-[#f2ca50]/60 px-1">|</span> National President
                </p>
                <p className="font-sans text-[12.5px] text-[#d0c5af] max-w-lg leading-relaxed pt-0.5">
                  Recognized across the Middle East, India, and European diplomatic corridors for uniting multilateral commercial agendas with cinematic storytelling that resonates across borders.
                </p>
              </div>

              {/* Signatory Credential Bar */}
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#f2ca50] text-3xl">verified</span>
                  <div className="flex flex-col">
                    <span className="font-sans text-[11px] font-semibold text-[#e5e2e3] uppercase tracking-wider">
                      Apostille Credential
                    </span>
                    <span className="font-sans text-[13px] text-[#d0c5af]">
                      Office of the Trade Commissioner
                    </span>
                  </div>
                </div>

                <div className="h-8 w-px bg-[#353436] hidden sm:block"></div>

                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#e9c176] text-3xl">gavel</span>
                  <div className="flex flex-col">
                    <span className="font-sans text-[11px] font-semibold text-[#e5e2e3] uppercase tracking-wider">
                      Civic Governance
                    </span>
                    <span className="font-sans text-[13px] text-[#d0c5af]">
                      National Council President
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Executive Portrait with Editorial Elevation */}
            <div className="lg:col-span-5 relative mt-8 lg:mt-0">
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-2xl bg-[#2a2a2b] border border-[#4d4635]/60 group">
                <SkeletonImage
                  alt="Zeenat Kureshi Executive Portrait"
                  containerClassName="w-full h-full"
                  showMonogramPlaceholder
                  className="w-full h-full object-cover object-center filter grayscale contrast-110 group-hover:grayscale-0 transition-all duration-700 ease-out scale-100 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6IHnCaef41g32aYh105zuRmheL7FwAT-AndGJukXlIE3t4L0szoFQEx8N8S3oPLqPmulPo5Oo776ceRauA2mrWttmN0hpVMmyTa0pTwujXGtjzvMUBiUugC_-F00w5D3skN_AK9FxGE5wHuyFUOuCnS9w6PXK7qD9McLtiTa4qfAhLXGi3BBaDbauoUWTQ5ZowUhwCKD9zWtPptwld2KaXrFj9Uge6Tg0vxx9dGPBUC0JjEbTLaxZ"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131314] via-transparent to-transparent opacity-80 pointer-events-none"></div>

                {/* Seal Badge floating over photo */}
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#0e0e0f]/90 backdrop-blur-md rounded-lg shadow-xl flex items-center justify-between border border-[#4d4635]/50">
                  <div>
                    <span className="font-sans text-[11px] font-bold text-[#f2ca50] tracking-widest uppercase block">
                      State Delegation Envoy
                    </span>
                    <span className="font-sans text-[13px] text-[#e5e2e3]">
                      GCC – India Corridor Leadership
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-[#f2ca50] text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    workspace_premium
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: DIRECT DIPLOMATIC CHANCERY PROTOCOL ACCESS */}
      <section className="w-full bg-[#0c0b09] py-16 sm:py-24 relative overflow-hidden" id="connect">
        {/* Ambient Gold Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#f2ca50]/5 rounded-full blur-[160px] pointer-events-none"></div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="bg-gradient-to-b from-[#181511]/95 to-[#100e0b]/95 rounded-2xl p-6 sm:p-10 lg:p-14 shadow-2xl border border-[#3e3422] relative overflow-hidden">
            {/* Ambient Gold Corner Flare */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#f2ca50]/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-3xl mx-auto text-center space-y-4 mb-10 sm:mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1f1a14] border border-[#d4af37]/40 text-[#f2ca50] text-[9.5px] sm:text-[10px] font-bold uppercase tracking-[0.22em] rounded-full shadow-sm">
                <Sparkles className="w-3 h-3 text-[#f2ca50]" />
                <span>Sovereign Chancery Access</span>
              </div>
              <h2 className="font-['Cinzel'] text-[24px] sm:text-[34px] lg:text-[38px] font-normal text-[#f4efe6] leading-tight tracking-tight">
                Direct Diplomatic &amp; <span className="italic font-serif text-[#f2ca50]">Protocol Desks</span>
              </h2>
              <p className="font-['Montserrat'] text-[13px] sm:text-[14px] text-[#c8beaa] font-light leading-relaxed max-w-2xl mx-auto">
                Accredited sovereign envoys, ministry delegations, institutional investors, and global co-production syndicates may access official bilateral statecraft through our three permanent chanceries.
              </p>
            </div>

            {/* 3 Permanent Chancery Hubs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mb-10">
              {/* Dubai Chancery */}
              <div className="p-6 rounded-xl bg-[#12100d] border border-[#2e2617] hover:border-[#f2ca50]/50 transition-all group space-y-3 shadow-md">
                <div className="w-10 h-10 rounded-lg bg-[#1c1913] flex items-center justify-center text-[#f2ca50] border border-[#3e3422] group-hover:scale-105 transition-transform">
                  <Building2 className="w-4 h-4 text-[#f2ca50]" />
                </div>
                <div>
                  <span className="font-['Montserrat'] text-[9.5px] uppercase tracking-widest text-[#f2ca50] font-bold block">
                    Gulf &amp; MENA Chancery
                  </span>
                  <h3 className="font-['Bodoni_Moda'] text-[18px] text-[#f4efe6] font-medium">
                    Dubai DIFC &amp; Economy
                  </h3>
                </div>
                <p className="font-['Montserrat'] text-[12px] text-[#a89e8b] font-light leading-relaxed">
                  Gate Precinct 4, Dubai International Financial Centre (DIFC), United Arab Emirates. Specializing in Bilateral FDI, CEPA Frameworks, and Transnational Cinema Finance.
                </p>
                <div className="pt-2 border-t border-[#262015] flex items-center justify-between text-[11px] font-['Montserrat'] text-[#d4af37]">
                  <span>Office of the Trade Commissioner</span>
                  <span className="w-2 h-2 rounded-full bg-[#38b04a]"></span>
                </div>
              </div>

              {/* New Delhi Chancery */}
              <div className="p-6 rounded-xl bg-[#12100d] border border-[#2e2617] hover:border-[#f2ca50]/50 transition-all group space-y-3 shadow-md">
                <div className="w-10 h-10 rounded-lg bg-[#1c1913] flex items-center justify-center text-[#e9c176] border border-[#3e3422] group-hover:scale-105 transition-transform">
                  <Building2 className="w-4 h-4 text-[#e9c176]" />
                </div>
                <div>
                  <span className="font-['Montserrat'] text-[9.5px] uppercase tracking-widest text-[#e9c176] font-bold block">
                    National &amp; Bilateral Seat
                  </span>
                  <h3 className="font-['Bodoni_Moda'] text-[18px] text-[#f4efe6] font-medium">
                    New Delhi Chanakyapuri
                  </h3>
                </div>
                <p className="font-['Montserrat'] text-[12px] text-[#a89e8b] font-light leading-relaxed">
                  Chanakyapuri Diplomatic Enclave &amp; FICCI Corridor, New Delhi 110021, India. Facilitating inter-ministerial summits, national council mandates, and state delegations.
                </p>
                <div className="pt-2 border-t border-[#262015] flex items-center justify-between text-[11px] font-['Montserrat'] text-[#e9c176]">
                  <span>National Council Secretariat</span>
                  <span className="w-2 h-2 rounded-full bg-[#38b04a]"></span>
                </div>
              </div>

              {/* London Chancery */}
              <div className="p-6 rounded-xl bg-[#12100d] border border-[#2e2617] hover:border-[#f2ca50]/50 transition-all group space-y-3 shadow-md">
                <div className="w-10 h-10 rounded-lg bg-[#1c1913] flex items-center justify-center text-[#f2ca50] border border-[#3e3422] group-hover:scale-105 transition-transform">
                  <Building2 className="w-4 h-4 text-[#f2ca50]" />
                </div>
                <div>
                  <span className="font-['Montserrat'] text-[9.5px] uppercase tracking-widest text-[#f2ca50] font-bold block">
                    European &amp; Screen Affairs
                  </span>
                  <h3 className="font-['Bodoni_Moda'] text-[18px] text-[#f4efe6] font-medium">
                    London Mayfair &amp; Westminster
                  </h3>
                </div>
                <p className="font-['Montserrat'] text-[12px] text-[#a89e8b] font-light leading-relaxed">
                  Mayfair Executive Chancery &amp; BFI Liaison, London W1J, United Kingdom. Overseeing British-Indian co-productions, international festival rosters, and sovereign European pacts.
                </p>
                <div className="pt-2 border-t border-[#262015] flex items-center justify-between text-[11px] font-['Montserrat'] text-[#d4af37]">
                  <span>Global Production Syndicate</span>
                  <span className="w-2 h-2 rounded-full bg-[#38b04a]"></span>
                </div>
              </div>
            </div>

            {/* Central Action Console */}
            <div className="p-5 sm:p-7 rounded-xl bg-[#0e0d0b] border border-[#342b1a] flex flex-col md:flex-row items-center justify-between gap-5">
              <div className="space-y-1 text-center md:text-left">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#f2ca50] uppercase tracking-wider font-['Montserrat']">
                    <ShieldCheck className="w-4 h-4 text-[#f2ca50]" />
                    256-Bit Hardware Protocol
                  </span>
                  <span className="text-[#4d4635] hidden sm:inline">•</span>
                  <span className="text-[11px] text-[#a89e8b] font-['Montserrat']">
                    Guaranteed Ministerial SLA within 24–48 Hours
                  </span>
                </div>
                <p className="text-[12px] text-[#786e5c] font-['Montserrat']">
                  Strict diplomatic confidentiality and bilateral non-disclosure covenants enforced across all transmissions.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 w-full md:w-auto shrink-0">
                <button
                  onClick={() => onOpenCollaborate('collaborate')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 bg-gradient-to-r from-[#d4af37] via-[#f2ca50] to-[#e6bc48] hover:from-[#ffe088] text-[#141002] font-['Montserrat'] text-[10.5px] font-bold tracking-[0.16em] uppercase rounded-lg shadow-md hover:scale-101 active:scale-98 transition-all cursor-pointer min-h-[44px]"
                >
                  <span>Initiate Protocol Mandate</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => {
                    onSelectTab('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 bg-[#161410] border border-[#d4af37]/60 hover:border-[#f2ca50] text-[#f2ca50] font-['Montserrat'] text-[10.5px] font-semibold tracking-[0.16em] uppercase rounded-lg hover:bg-[#1f1a12] transition-all cursor-pointer min-h-[44px]"
                >
                  <Lock className="w-3.5 h-3.5 text-[#f2ca50]" />
                  <span>Full Diplomatic Chancery Desk</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeScreen;

