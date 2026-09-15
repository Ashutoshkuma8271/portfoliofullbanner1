import React, { useState } from 'react';
import { TabId } from '../types';
import { ArrowRight, ShieldCheck, CheckCircle2, TrendingUp, Download, Mail, MessageCircle, Building2, ExternalLink, Lock } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: TabId) => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
  onOpenInvestorLead?: () => void;
  onOpenMediaKit?: () => void;
  onOpenCollaborate?: () => void;
  onOpenAdminCms?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTab,
  onOpenInvestorLead,
  onOpenMediaKit,
  onOpenCollaborate,
  onOpenAdminCms,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | 'accreditations' | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 4000);
  };

  const navItems: { label: string; tab: TabId; isNew?: boolean }[] = [
    { label: 'Executive Monograph', tab: 'home' },
    { label: 'Diplomatic Credentials', tab: 'about-zeenat' },
    { label: 'GCC–India Bilateral Trade', tab: 'trade-investment' },
    { label: 'Cinema & Press Communiqués', tab: 'media-press' },
    { label: 'Women Leadership Council', tab: 'women-leadership' },
    { label: 'Insights & Gazettes', tab: 'blog', isNew: true },
    { label: 'Diplomatic Chancery Desk', tab: 'contact' },
  ];

  return (
    <footer className="relative w-full bg-[#080706] pt-12 sm:pt-16 pb-28 sm:pb-12 text-[#c8beaa] overflow-x-hidden snap-section">
      {/* Seamless Ambient Light Divider */}
      <div className="absolute top-0 inset-x-0 gold-gradient-divider-subtle pointer-events-none" />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Main Grid: Responsive 1 col on mobile, balanced 2 cols on tablet, 12 cols on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 mb-12 sm:mb-14">
          
          {/* Column 1: Sovereign Identity & Diplomatic Jurisdictions */}
          <div className="sm:col-span-1 lg:col-span-4 space-y-4">
            <div className="space-y-2.5">
              <img
                src="/zeenat_kureshi_logo_dark.png"
                alt="Zeenat Kureshi Official Logo"
                loading="lazy"
                decoding="async"
                className="h-9 sm:h-10 md:h-11 w-auto object-contain transition-opacity duration-200"
              />
              <p className="font-['Montserrat'] text-[9px] xs:text-[9.5px] sm:text-[10px] uppercase font-bold tracking-[0.2em] text-[#f2ca50]">
                Sovereign Chancery &amp; Cultural Statecraft
              </p>
            </div>

            <p className="font-['Montserrat'] text-[12px] sm:text-[12.5px] lg:text-[13px] font-light text-[#b8ad96] max-w-sm leading-relaxed">
              Spearheading high-concept cinematic IP, architecting multi-billion dollar bilateral trade corridors between India and the GCC, and championing socioeconomic equity.
            </p>

            {/* Jurisdictions & Key Credentials */}
            <div className="pt-2 space-y-2">
              <div className="flex items-center gap-2 text-[11px] sm:text-[11.5px] text-[#e5ded0] font-['Montserrat']">
                <Building2 className="w-3.5 h-3.5 text-[#f2ca50] shrink-0" />
                <span className="truncate">Dubai DIFC • New Delhi • London Mayfair</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#14120e] border border-[#342b1a] rounded text-[#f4efe6] font-['Montserrat'] text-[9px] sm:text-[9.5px] font-semibold tracking-wider uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f2ca50]"></span>
                  Trade Commissioner
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#14120e] border border-[#342b1a] rounded text-[#f4efe6] font-['Montserrat'] text-[9px] sm:text-[9.5px] font-semibold tracking-wider uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e9c176]"></span>
                  Film Producer
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Folio */}
          <div className="sm:col-span-1 lg:col-span-3 space-y-3">
            <h3 className="font-['Montserrat'] text-[10px] sm:text-[10.5px] font-bold text-[#f4efe6] uppercase tracking-[0.2em]">
              Navigation Folio
            </h3>
            <ul className="space-y-1 font-['Montserrat'] text-[12px] sm:text-[12.5px] lg:text-[13px]">
              {navItems.map((item) => (
                <li key={item.tab}>
                  <button
                    onClick={() => {
                      onSelectTab(item.tab);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-[#f2ca50] transition-colors cursor-pointer text-left py-1 inline-flex items-center gap-2 w-full min-h-[38px] sm:min-h-0"
                  >
                    <span>{item.label}</span>
                    {item.isNew && (
                      <span className="text-[8.5px] px-1.5 py-0.2 bg-[#f2ca50]/15 text-[#f2ca50] rounded font-semibold">
                        New
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Strategic Executive Suite (Production Institutional Actions) */}
          <div className="sm:col-span-1 lg:col-span-2 space-y-3">
            <h3 className="font-['Montserrat'] text-[10px] sm:text-[10.5px] font-bold text-[#f4efe6] uppercase tracking-[0.2em]">
              Executive Suite
            </h3>
            <ul className="space-y-1.5 font-['Montserrat'] text-[12px] sm:text-[12.5px] lg:text-[13px]">
              {onOpenInvestorLead && (
                <li>
                  <button
                    onClick={onOpenInvestorLead}
                    className="hover:text-[#f2ca50] transition-colors cursor-pointer text-left flex items-center gap-2 py-1 min-h-[38px] sm:min-h-0 w-full"
                  >
                    <TrendingUp className="w-3.5 h-3.5 text-[#e9c176] shrink-0" />
                    <span>Investor Qualification</span>
                  </button>
                </li>
              )}
              {onOpenMediaKit && (
                <li>
                  <button
                    onClick={onOpenMediaKit}
                    className="hover:text-[#f2ca50] transition-colors cursor-pointer text-left flex items-center gap-2 py-1 min-h-[38px] sm:min-h-0 w-full"
                  >
                    <Download className="w-3.5 h-3.5 text-[#f2ca50] shrink-0" />
                    <span>Download Media Kit</span>
                  </button>
                </li>
              )}
              {onOpenCollaborate && (
                <li>
                  <button
                    onClick={onOpenCollaborate}
                    className="hover:text-[#f2ca50] transition-colors cursor-pointer text-left flex items-center gap-2 py-1 min-h-[38px] sm:min-h-0 w-full"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                    <span>Protocol Collaboration</span>
                  </button>
                </li>
              )}
              <li>
                <button
                  onClick={() => {
                    onSelectTab('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#f2ca50] transition-colors cursor-pointer text-left flex items-center gap-2 py-1 min-h-[38px] sm:min-h-0 text-[#f2ca50] w-full"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  <span>Diplomatic Chancery Desk</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Official Gazettes & Direct Channels */}
          <div className="sm:col-span-1 lg:col-span-3 space-y-3.5">
            <h3 className="font-['Montserrat'] text-[10px] sm:text-[10.5px] font-bold text-[#f4efe6] uppercase tracking-[0.2em]">
              Executive Gazettes &amp; Inquiries
            </h3>
            <p className="font-['Montserrat'] text-[12px] sm:text-[12.5px] text-[#b8ad96] font-light leading-relaxed">
              Receive ministerial briefings, trade summiteer announcements, and confidential communiqués.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#171511] border border-[#f2ca50]/60 text-[#f2ca50] flex items-center gap-2 text-[12px] rounded-lg shadow-inner">
                <CheckCircle2 className="w-4 h-4 text-[#f2ca50] shrink-0" />
                <span>Executive Gazette dispatched.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center bg-[#14120e] border border-[#342b1a] rounded-lg p-1 focus-within:border-[#f2ca50] transition-all shadow-inner w-full max-w-full">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="min-w-0 flex-1 bg-transparent px-3 py-2 font-['Montserrat'] text-[12px] text-[#f4efe6] placeholder:text-[#786e5c] focus:outline-none"
                  placeholder="Enter institutional email"
                  type="email"
                  required
                />
                <button
                  className="h-9 px-3.5 bg-gradient-to-r from-[#d4af37] to-[#f2ca50] hover:brightness-110 text-[#141002] rounded-md font-['Montserrat'] text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all shadow-xs flex items-center justify-center shrink-0"
                  type="submit"
                  aria-label="Subscribe to Gazette"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            {/* Official Transmission & Secretariat Channels */}
            <div className="pt-2 space-y-2">
              <span className="text-[10px] uppercase tracking-wider text-[#99907c] font-semibold block">
                Direct Protocol Access:
              </span>
              <div className="flex flex-col xs:flex-row flex-wrap items-stretch xs:items-center gap-2 text-[#c8beaa]">
                <a
                  href="https://wa.me/?text=Hello%20Office%20of%20Zeenat%20Kureshi,%20I%20am%20transmitting%20an%20inquiry%20via%20ZeenatKureshi.com."
                  target="_blank"
                  rel="noreferrer"
                  title="WhatsApp Concierge Hotline"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#14120e] border border-[#342b1a] hover:border-[#38b04a] text-[#8ae899] text-[11px] font-medium transition-all shadow-xs min-h-[38px] shrink-0"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#38b04a] shrink-0" />
                  <span>WhatsApp Line</span>
                </a>

                <a
                  href="mailto:chancery@zeenatkureshi.com"
                  title="Official Chancery Secretariat Email"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#14120e] border border-[#342b1a] hover:border-[#f2ca50] text-[#f4efe6] hover:text-[#f2ca50] text-[11px] font-medium transition-all shadow-xs truncate max-w-full min-h-[38px]"
                >
                  <Mail className="w-3.5 h-3.5 text-[#f2ca50] shrink-0" />
                  <span className="truncate">chancery@zeenatkureshi.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Perfectly Responsive Alignment across all screen widths */}
        <div className="pt-6 sm:pt-8 border-t border-[#241f14] flex flex-col md:flex-row items-center justify-between gap-4 font-['Montserrat'] text-[11px] sm:text-[11.5px] text-[#9e9482]">
          <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-2 sm:gap-3">
            <span className="flex items-center gap-1.5 text-[#d4af37] font-semibold text-[10.5px] uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-[#f2ca50] shrink-0" />
              256-Bit TLS Diplomatic Protocol
            </span>
            <span className="hidden sm:inline text-[#3e3422]">•</span>
            <span className="text-[11px] text-[#8a806e]">Office of Zeenat Kureshi © 2026. All Rights Reserved.</span>
          </div>

          {/* Legal Protocol Links with no awkward wrapping on narrow screens */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-4 gap-y-2 font-['Montserrat'] text-[10px] xs:text-[10.5px] font-semibold tracking-[0.14em] uppercase">
            <button
              onClick={() => setActiveModal('privacy')}
              className="text-[#a89e8b] hover:text-[#f2ca50] transition-colors cursor-pointer py-1 min-h-[36px] flex items-center"
            >
              Protocol &amp; Privacy
            </button>
            <span className="text-[#3e3422] hidden xs:inline">•</span>
            <button
              onClick={() => setActiveModal('terms')}
              className="text-[#a89e8b] hover:text-[#f2ca50] transition-colors cursor-pointer py-1 min-h-[36px] flex items-center"
            >
              Terms of Mandate
            </button>
            <span className="text-[#3e3422] hidden xs:inline">•</span>
            <button
              onClick={() => setActiveModal('accreditations')}
              className="text-[#a89e8b] hover:text-[#f2ca50] transition-colors cursor-pointer py-1 min-h-[36px] flex items-center"
            >
              Accreditations
            </button>
            {onOpenAdminCms && (
              <>
                <span className="text-[#3e3422] hidden xs:inline">•</span>
                <button
                  onClick={onOpenAdminCms}
                  className="text-[#d4af37] hover:text-[#f2ca50] transition-colors cursor-pointer py-1 min-h-[36px] flex items-center gap-1 font-semibold"
                  title="Open Executive CMS & Administration Console"
                >
                  <Lock className="w-3 h-3 text-[#f2ca50]" />
                  <span>Admin Console</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Legal / Protocol Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#14120e] border border-[#3e3422] max-w-lg w-full p-6 sm:p-8 space-y-4 relative shadow-2xl rounded-xl">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-[#a89e8b] hover:text-[#f2ca50] text-sm uppercase tracking-widest cursor-pointer"
            >
              Close [×]
            </button>
            <h3 className="font-['Cinzel'] text-[20px] sm:text-[22px] text-[#f2ca50]">
              {activeModal === 'privacy' && 'Diplomatic Protocol & Privacy Standard'}
              {activeModal === 'terms' && 'Terms of Bilateral Mandate'}
              {activeModal === 'accreditations' && 'Diplomatic Accreditations & Registry'}
            </h3>
            <div className="font-['Montserrat'] text-[13px] text-[#c8beaa] space-y-3 leading-relaxed font-light">
              {activeModal === 'privacy' && (
                <p>
                  All transmissions handled by the Executive Protocol Desk adhere to international diplomatic confidentiality standards, 256-bit TLS hardware-level encryption, and non-disclosure covenants. Ministerial data is never brokered to non-sovereign parties.
                </p>
              )}
              {activeModal === 'terms' && (
                <p>
                  Consultations, trade mandates, and co-production commitments are subject to formal covenants ratified under GCC-India trade framework pacts and relevant sovereign film commission co-production guidelines.
                </p>
              )}
              {activeModal === 'accreditations' && (
                <p>
                  Apostille authenticated by the Office of the Trade Commissioner, registered with regional diplomatic and commercial registries in Dubai (DIFC / Dubai Economy &amp; Tourism), New Delhi, and London Mayfair.
                </p>
              )}
            </div>
            <div className="pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="w-full py-3 bg-gradient-to-r from-[#d4af37] to-[#f2ca50] text-[#141002] font-['Montserrat'] text-[10.5px] font-bold uppercase tracking-widest rounded-lg hover:brightness-110 transition-all cursor-pointer shadow-md"
              >
                Acknowledge &amp; Return
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
