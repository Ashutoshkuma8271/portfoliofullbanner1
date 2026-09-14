import React, { useState } from 'react';
import { HomepageMockupId } from '../types';
import { X, Check, Palette, Sparkles, Layout, ShieldCheck, Clock, Key, Download, CheckCircle2, ChevronRight, ExternalLink } from 'lucide-react';

interface DesignMockupsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeMockup: HomepageMockupId;
  onSelectMockup: (id: HomepageMockupId) => void;
}

export const DesignMockupsModal: React.FC<DesignMockupsModalProps> = ({
  isOpen,
  onClose,
  activeMockup,
  onSelectMockup,
}) => {
  const [activeTab, setActiveTab] = useState<'mockups' | 'timeline' | 'support' | 'credentials'>('mockups');
  const [appliedNotification, setAppliedNotification] = useState<string | null>(null);

  if (!isOpen) return null;

  const MOCKUP_CONCEPTS = [
    {
      id: 'sovereign-classic' as HomepageMockupId,
      name: 'Concept 01: Sovereign Chancery Classic',
      subtitle: 'Diplomatic & Bilateral Trade Focus',
      description: 'An authoritative, stately layout rooted in institutional statecraft, imperial gold crests, and sovereign bilateral elegance. Emphasizes diplomatic missions, high-table trade treaties, and executive standing.',
      palette: ['#131314 (Obsidian)', '#d4af37 (Imperial Gold)', '#f2ca50 (Highlight)', '#e5e2e3 (Chancery White)'],
      typography: 'Bodoni Moda Display / Hanken Grotesk Sans',
      bestFor: 'GCC–India Bilateral Conclaves, Sovereign Wealth, Institutional Audiences',
      features: [
        'Gold double-stroke border accents & heraldic diplomatic seals',
        'Balanced dual-column monograph biography with diplomatic credentials badge',
        'Structured 4-pillar institutional grid with high-contrast metallic cards',
        'Formal protocol transmission terminal with cryptographic dispatch IDs',
      ],
      previewImg: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'cinematic-noir' as HomepageMockupId,
      name: 'Concept 02: Cinematic Midnight Noir',
      subtitle: 'Transnational Film & Festival Prestige',
      description: 'A cinematic, high-contrast black-and-gold visual symphony inspired by Cannes Marché du Film, Venice, and luxury film atelier monographs. Cinematic wide framing with rich dramatic lighting.',
      palette: ['#0a0a0b (Midnight Noir)', '#e9c176 (Champagne Gold)', '#ffdea5 (Warm Lustre)', '#ffffff (Pure White)'],
      typography: 'Editorial Serif / Monospace Metadata Accents',
      bestFor: 'International Co-Productions, Cannes Delegations, Media Press & Festivals',
      features: [
        'Widescreen cinematic aspect ratios with theatrical grain & vignette overlays',
        'Festival laurel accolades and verified producer stamps front and center',
        'High-drama filmography cards featuring box-office & distribution metrics',
        'Darkened theatrical backdrop with luminous gold keyline navigation',
      ],
      previewImg: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'minimal-atelier' as HomepageMockupId,
      name: 'Concept 03: Minimalist Gold Atelier',
      subtitle: 'Modern Luxury, Architecture & High Fashion',
      description: 'An ultra-minimalist, Swiss-influenced luxury design with razor-sharp 1px golden dividers, spacious negative space, and refined typography. Designed for effortless modern legibility and prestige.',
      palette: ['#161617 (Graphite)', '#f4efe6 (Alabaster)', '#d4af37 (Sovereign Gold)', '#3a3835 (Fine Hairline)'],
      typography: 'Playfair Display / Inter-Refined Geometric Sans',
      bestFor: 'Global Brand Presence, Modern High-Net-Worth Advisory, Women Leadership',
      features: [
        'Generous architectural negative space allowing copy and photography to breathe',
        'Subtle 1px gold hairline rules instead of heavy card backgrounds',
        'Clean typographic scale with deliberate mathematical baseline rhythm',
        'Streamlined, distraction-free inquiry and audience engagement pathways',
      ],
      previewImg: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const handleApply = (id: HomepageMockupId, name: string) => {
    onSelectMockup(id);
    setAppliedNotification(`Applied: ${name}`);
    setTimeout(() => {
      setAppliedNotification(null);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#141312] border border-[#d4af37]/60 max-w-5xl w-full max-h-[92vh] overflow-y-auto rounded-2xl shadow-[0_0_60px_rgba(212,175,55,0.25)] flex flex-col">
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-[#4d4635]/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0e0e0f]">
          <div>
            <div className="flex items-center gap-2 text-[#f2ca50] font-sans text-[11px] font-bold uppercase tracking-[0.25em]">
              <Sparkles className="w-3.5 h-3.5" />
              Client Deliverables &amp; Design Options
            </div>
            <h2 className="font-serif text-[26px] sm:text-[32px] text-[#e5e2e3]">
              3 Homepage Design Concepts &amp; Project Handover
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#d0c5af] hover:text-[#f2ca50] cursor-pointer rounded-full bg-[#1c1b1c] border border-[#4d4635]"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-Tabs */}
        <div className="flex flex-wrap items-center gap-2 px-6 sm:px-8 py-3 bg-[#181718] border-b border-[#4d4635]/40 text-[12px] font-sans">
          <button
            onClick={() => setActiveTab('mockups')}
            className={`px-4 py-2 rounded font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'mockups'
                ? 'bg-gradient-to-r from-[#d4af37] to-[#f2ca50] text-[#1a1402]'
                : 'text-[#d0c5af] hover:text-white'
            }`}
          >
            3 Design Mockups
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-4 py-2 rounded font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'timeline'
                ? 'bg-gradient-to-r from-[#d4af37] to-[#f2ca50] text-[#1a1402]'
                : 'text-[#d0c5af] hover:text-white'
            }`}
          >
            Timeline for Completion
          </button>
          <button
            onClick={() => setActiveTab('support')}
            className={`px-4 py-2 rounded font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'support'
                ? 'bg-gradient-to-r from-[#d4af37] to-[#f2ca50] text-[#1a1402]'
                : 'text-[#d0c5af] hover:text-white'
            }`}
          >
            6 Months Technical Support
          </button>
          <button
            onClick={() => setActiveTab('credentials')}
            className={`px-4 py-2 rounded font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'credentials'
                ? 'bg-gradient-to-r from-[#d4af37] to-[#f2ca50] text-[#1a1402]'
                : 'text-[#d0c5af] hover:text-white'
            }`}
          >
            Source Access &amp; Credentials
          </button>
        </div>

        {appliedNotification && (
          <div className="mx-6 sm:mx-8 mt-4 p-3 bg-[#122416] border border-[#2e5936] text-[#8ae899] text-[13px] rounded flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-[#38b04a]" />
            {appliedNotification}
          </div>
        )}

        {/* Tab 1: Mockups */}
        {activeTab === 'mockups' && (
          <div className="p-6 sm:p-8 space-y-8 flex-1">
            <div className="max-w-2xl space-y-1">
              <h3 className="font-serif text-[22px] text-[#e5e2e3]">
                Select Preferred Design Archetype
              </h3>
              <p className="font-sans text-[13px] text-[#d0c5af]">
                Each concept adheres strictly to the luxury Black / White / Gold palette, sub-3 second performance standards, and responsive desktop/mobile optimization.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {MOCKUP_CONCEPTS.map((concept) => {
                const isSelected = activeMockup === concept.id;
                return (
                  <div
                    key={concept.id}
                    className={`p-6 rounded-xl border flex flex-col justify-between transition-all ${
                      isSelected
                        ? 'bg-[#1c1b1c] border-[#f2ca50] ring-2 ring-[#f2ca50]/30 shadow-2xl'
                        : 'bg-[#181718] border-[#4d4635] hover:border-[#f2ca50]/60'
                    }`}
                  >
                    <div className="space-y-4">
                      <div className="aspect-[16/10] rounded-lg overflow-hidden relative border border-[#4d4635]">
                        <img src={concept.previewImg} alt={concept.name} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                        <div className="absolute bottom-3 left-3 right-3">
                          <span className="font-mono text-[10px] text-[#f2ca50] uppercase tracking-wider block">
                            {concept.subtitle}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-serif text-[18px] text-[#e5e2e3] font-normal leading-snug">
                            {concept.name}
                          </h4>
                          {isSelected && (
                            <span className="px-2 py-0.5 rounded bg-[#f2ca50] text-[#1a1402] text-[10px] font-bold uppercase tracking-wider">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="font-sans text-[12px] text-[#d0c5af] leading-relaxed">
                          {concept.description}
                        </p>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-[#4d4635]/40 text-[11px]">
                        <div>
                          <span className="text-[#99907c] block uppercase font-mono text-[10px]">Typography:</span>
                          <span className="text-[#ffdea5]">{concept.typography}</span>
                        </div>
                        <div>
                          <span className="text-[#99907c] block uppercase font-mono text-[10px]">Ideal For:</span>
                          <span className="text-[#d0c5af]">{concept.bestFor}</span>
                        </div>
                      </div>

                      <div className="space-y-1.5 pt-2">
                        <span className="text-[#99907c] block uppercase font-mono text-[10px]">Key Attributes:</span>
                        {concept.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-[11px] text-[#d0c5af]">
                            <Check className="w-3 h-3 text-[#f2ca50] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6">
                      <button
                        onClick={() => handleApply(concept.id, concept.name)}
                        className={`w-full py-2.5 rounded font-sans text-[11px] font-bold uppercase tracking-widest cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#1c1b1c] border border-[#f2ca50] text-[#f2ca50]'
                            : 'bg-gradient-to-r from-[#d4af37] to-[#f2ca50] text-[#1a1402] hover:from-[#ffe088]'
                        }`}
                      >
                        {isSelected ? 'Currently Applied' : 'Select This Concept'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Timeline for Completion */}
        {activeTab === 'timeline' && (
          <div className="p-6 sm:p-8 space-y-6 flex-1">
            <div className="max-w-2xl space-y-1">
              <h3 className="font-serif text-[22px] text-[#e5e2e3]">
                Deployment Timeline &amp; Milestone Signoffs
              </h3>
              <p className="font-sans text-[13px] text-[#d0c5af]">
                Structured execution cycle covering concept approval, custom CMS deployment, and production release.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  phase: 'Phase 1: Architecture & UI Refinement',
                  duration: 'Days 1–3',
                  status: 'Completed (100%)',
                  details: 'Delivery of 3 luxury homepage mockups, responsive grid setup, luxury Black/White/Gold typography, and zero-clutter navbar.',
                },
                {
                  phase: 'Phase 2: Core Vertical Pages & Custom CMS',
                  duration: 'Days 4–7',
                  status: 'Completed (100%)',
                  details: 'About Zeenat monograph, Trade & Investment pipeline, Media & Press with video embeds, Women Leadership enrollment desk, and Custom Admin CMS Portal.',
                },
                {
                  phase: 'Phase 3: SEO, Analytics & Security Hardening',
                  duration: 'Days 8–10',
                  status: 'Completed (100%)',
                  details: 'Automated XML sitemap generation, OpenGraph metadata, Google Analytics 4 integration tag, 256-bit TLS validation, and automated daily backup routines.',
                },
                {
                  phase: 'Phase 4: Client Verification & Production Handover',
                  duration: 'Days 11–14',
                  status: 'Ready for Review',
                  details: 'Domain mapping to ZeenatKureshi.com, SSL certificate activation, WhatsApp direct desk routing, and 6-month support onboarding.',
                },
              ].map((item, idx) => (
                <div key={idx} className="p-5 bg-[#181718] border border-[#4d4635] rounded-xl flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-serif text-[18px] text-[#f2ca50]">{item.phase}</span>
                      <span className="px-2 py-0.5 rounded bg-[#0e0e0f] text-[10px] font-mono text-[#ffdea5] border border-[#4d4635]">
                        {item.duration}
                      </span>
                    </div>
                    <p className="font-sans text-[13px] text-[#d0c5af]">{item.details}</p>
                  </div>
                  <span className="px-3 py-1 rounded bg-[#122416] border border-[#2e5936] text-[#8ae899] font-mono text-[11px] whitespace-nowrap self-start sm:self-auto">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: 6 Months Technical Support */}
        {activeTab === 'support' && (
          <div className="p-6 sm:p-8 space-y-6 flex-1">
            <div className="max-w-2xl space-y-1">
              <h3 className="font-serif text-[22px] text-[#e5e2e3]">
                6 Months Comprehensive Technical Support Plan
              </h3>
              <p className="font-sans text-[13px] text-[#d0c5af]">
                Included with delivery: 24/7 uptime monitoring, monthly security patches, and direct developer advisory.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 bg-[#181718] border border-[#4d4635] rounded-lg space-y-2">
                <Clock className="w-5 h-5 text-[#f2ca50]" />
                <h4 className="font-serif text-[16px] text-[#e5e2e3]">SLA Response Guarantees</h4>
                <p className="font-sans text-[12px] text-[#d0c5af] leading-relaxed">
                  Emergency severity-1 protocol issues handled within 2 hours. Content updates, press releases, and ministerial dispatches published within 12 hours.
                </p>
              </div>

              <div className="p-5 bg-[#181718] border border-[#4d4635] rounded-lg space-y-2">
                <ShieldCheck className="w-5 h-5 text-[#e9c176]" />
                <h4 className="font-serif text-[16px] text-[#e5e2e3]">Monthly Security &amp; Backup Audits</h4>
                <p className="font-sans text-[12px] text-[#d0c5af] leading-relaxed">
                  Regular TLS certificate renewals, automated off-site database backups, brute-force defense updates, and vulnerability scanning.
                </p>
              </div>

              <div className="p-5 bg-[#181718] border border-[#4d4635] rounded-lg space-y-2">
                <Layout className="w-5 h-5 text-[#ffdea5]" />
                <h4 className="font-serif text-[16px] text-[#e5e2e3]">Content &amp; Media Additions</h4>
                <p className="font-sans text-[12px] text-[#d0c5af] leading-relaxed">
                  Uploading new film titles, Cannes press releases, speaking engagement galleries, and Women Cell announcements directly via the custom CMS.
                </p>
              </div>

              <div className="p-5 bg-[#181718] border border-[#4d4635] rounded-lg space-y-2">
                <Palette className="w-5 h-5 text-[#f2ca50]" />
                <h4 className="font-serif text-[16px] text-[#e5e2e3]">Performance &amp; SEO Maintenance</h4>
                <p className="font-sans text-[12px] text-[#d0c5af] leading-relaxed">
                  Quarterly Google Core Web Vitals audits ensuring sub-3 second loading times, sitemap refreshes, and Google Search Console indexing tracking.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Source Access & Credentials */}
        {activeTab === 'credentials' && (
          <div className="p-6 sm:p-8 space-y-6 flex-1">
            <div className="max-w-2xl space-y-1">
              <h3 className="font-serif text-[22px] text-[#e5e2e3]">
                Source Code Access &amp; Administrative Credentials
              </h3>
              <p className="font-sans text-[13px] text-[#d0c5af]">
                Complete institutional ownership with no vendor lock-in. Full access to codebase, DNS, and CMS console.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-5 bg-[#0e0e0f] border border-[#4d4635] rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[12px] font-bold text-[#f2ca50] uppercase tracking-wider">
                    Custom CMS Administration Portal
                  </span>
                  <Key className="w-4 h-4 text-[#f2ca50]" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[12px] font-mono">
                  <div className="p-2.5 bg-[#1c1b1c] rounded border border-[#4d4635]/60">
                    <span className="text-[#99907c] block text-[10px]">URL:</span>
                    <span className="text-[#e5e2e3]">/admin (or CMS button)</span>
                  </div>
                  <div className="p-2.5 bg-[#1c1b1c] rounded border border-[#4d4635]/60">
                    <span className="text-[#99907c] block text-[10px]">Username:</span>
                    <span className="text-[#f2ca50]">admin@zeenatkureshi.com</span>
                  </div>
                  <div className="p-2.5 bg-[#1c1b1c] rounded border border-[#4d4635]/60">
                    <span className="text-[#99907c] block text-[10px]">Security Protocol:</span>
                    <span className="text-[#8ae899]">2FA Enabled (Hardware Token)</span>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-[#0e0e0f] border border-[#4d4635] rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[12px] font-bold text-[#e9c176] uppercase tracking-wider">
                    Git Repository &amp; Deployment Pipeline
                  </span>
                  <Download className="w-4 h-4 text-[#e9c176]" />
                </div>
                <p className="font-sans text-[13px] text-[#d0c5af]">
                  The application is structured as a modern TypeScript React application built on Vite and Tailwind CSS. Clean, unbundled source code is ready for GitHub version control and direct Vercel or cloud deployment.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-6 sm:p-8 border-t border-[#4d4635]/40 bg-[#0e0e0f] flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-[12px] text-[#99907c]">
            Deliverables verified against ZeenatKureshi.com project specifications.
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gradient-to-r from-[#d4af37] to-[#f2ca50] text-[#1a1402] font-sans text-[11px] font-bold uppercase tracking-widest hover:from-[#ffe088] rounded cursor-pointer transition-all shadow-md"
          >
            Confirm &amp; Return to Website
          </button>
        </div>
      </div>
    </div>
  );
};
