import React, { useState, useEffect } from 'react';
import { X, Send, ShieldCheck, CheckCircle2, Handshake, Newspaper, TrendingUp } from 'lucide-react';

export type CollaborateMode = 'collaborate' | 'media' | 'investment';

interface CollaborateModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: CollaborateMode;
}

export const CollaborateModal: React.FC<CollaborateModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'collaborate',
}) => {
  const [activeMode, setActiveMode] = useState<CollaborateMode>(initialMode);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mandate: 'Bilateral Trade & Inward FDI',
    organization: '',
    jurisdiction: 'Dubai (UAE)',
    brief: '',
  });
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setActiveMode(initialMode);
      if (initialMode === 'media') {
        setFormData((prev) => ({
          ...prev,
          mandate: 'Accredited Media & Press Interview',
        }));
      } else if (initialMode === 'investment') {
        setFormData((prev) => ({
          ...prev,
          mandate: 'Sovereign FDI & Bilateral Investment Allocation',
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          mandate: 'GCC–India Bilateral Trade & Inward FDI',
        }));
      }
    }
  }, [isOpen, initialMode]);

  const handleModeSwitch = (mode: CollaborateMode) => {
    setActiveMode(mode);
    if (mode === 'media') {
      setFormData((prev) => ({
        ...prev,
        mandate: 'Accredited Media & Press Interview',
      }));
    } else if (mode === 'investment') {
      setFormData((prev) => ({
        ...prev,
        mandate: 'Sovereign FDI & Bilateral Investment Allocation',
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        mandate: 'GCC–India Bilateral Trade & Inward FDI',
      }));
    }
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tracking = `ZK-PROTOCOL-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedId(tracking);
  };

  const handleReset = () => {
    setSubmittedId(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#131314] border border-[#d4af37]/70 max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-xl p-6 sm:p-10 relative shadow-[0_0_60px_rgba(212,175,55,0.15)]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#d0c5af] hover:text-[#f2ca50] cursor-pointer"
          aria-label="Close Modal"
        >
          <X className="w-6 h-6" />
        </button>

        {submittedId ? (
          <div className="space-y-6 text-center py-6">
            <div className="w-16 h-16 rounded-full bg-[#f2ca50]/10 border border-[#f2ca50] mx-auto flex items-center justify-center text-[#f2ca50]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <span className="font-sans text-[11px] font-bold text-[#f2ca50] tracking-[0.2em] uppercase block">
                Diplomatic Transmission Acknowledged
              </span>
              <h3 className="font-serif text-[28px] text-[#e5e2e3]">
                {activeMode === 'media'
                  ? 'Media Inquiry Dispatched'
                  : activeMode === 'investment'
                  ? 'Investment Briefing Registered'
                  : 'Collaboration Mandate Registered'}
              </h3>
              <p className="font-sans text-[14px] text-[#d0c5af] max-w-md mx-auto leading-relaxed">
                Your communique has been prioritized and routed to the Diplomatic Chancery and Executive Secretariat.
              </p>
            </div>

            <div className="p-4 bg-[#1c1b1c] border border-[#4d4635] max-w-sm mx-auto text-center space-y-1">
              <span className="text-[11px] text-[#99907c] uppercase tracking-wider block">Official Tracking Token</span>
              <span className="font-mono text-[16px] text-[#f2ca50] font-bold tracking-widest">{submittedId}</span>
            </div>

            <button
              onClick={handleReset}
              className="px-8 py-3 bg-[#f2ca50] text-[#3c2f00] font-sans text-[11px] font-bold uppercase tracking-widest hover:bg-[#ffe088] transition-colors cursor-pointer"
            >
              Conclude Transmission
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Mode Switcher Tabs */}
            <div className="grid grid-cols-3 gap-2 p-1 bg-[#1c1b1c] border border-[#4d4635]/40 rounded-sm">
              <button
                type="button"
                onClick={() => handleModeSwitch('collaborate')}
                className={`py-2 px-2 text-center font-sans text-[11px] font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeMode === 'collaborate'
                    ? 'bg-[#f2ca50] text-[#3c2f00]'
                    : 'text-[#d0c5af] hover:text-white'
                }`}
              >
                <Handshake className="w-3.5 h-3.5 hidden sm:inline" />
                Collaborate
              </button>
              <button
                type="button"
                onClick={() => handleModeSwitch('media')}
                className={`py-2 px-2 text-center font-sans text-[11px] font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeMode === 'media'
                    ? 'bg-[#f2ca50] text-[#3c2f00]'
                    : 'text-[#d0c5af] hover:text-white'
                }`}
              >
                <Newspaper className="w-3.5 h-3.5 hidden sm:inline" />
                Media Inquiry
              </button>
              <button
                type="button"
                onClick={() => handleModeSwitch('investment')}
                className={`py-2 px-2 text-center font-sans text-[11px] font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeMode === 'investment'
                    ? 'bg-[#f2ca50] text-[#3c2f00]'
                    : 'text-[#d0c5af] hover:text-white'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5 hidden sm:inline" />
                Investment
              </button>
            </div>

            <div className="space-y-2">
              <span className="font-sans text-[11px] font-semibold text-[#f2ca50] tracking-[0.25em] uppercase block">
                {activeMode === 'media'
                  ? 'Accredited Press & Film Festival Coverage'
                  : activeMode === 'investment'
                  ? 'Sovereign Wealth & Strategic FDI Conduits'
                  : 'Institutional Partnerships & High-Table Engagements'}
              </span>
              <h3 className="font-serif text-[28px] text-[#e5e2e3]">
                {activeMode === 'media'
                  ? 'Submit Media Inquiry'
                  : activeMode === 'investment'
                  ? 'Initiate Investment Discussion'
                  : 'Initiate Sovereign Collaboration'}
              </h3>
              <p className="font-sans text-[14px] text-[#d0c5af] leading-relaxed">
                {activeMode === 'media'
                  ? 'Direct media desk for press interviews, broadcast appearances, festival press junkets, and keynote requests.'
                  : activeMode === 'investment'
                  ? 'Confidential protocol for institutional investors, family offices, and sovereign funds exploring GCC–India allocations.'
                  : 'Direct engagement for state ministries, global production studios, institutional investors, and multilateral forums.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-sans text-[11px] font-semibold text-[#d0c5af] uppercase tracking-wider block">
                    Full Name &amp; Honorific
                  </label>
                  <input
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Amb. / Dr. / Minister / Editor"
                    className="w-full bg-[#1c1b1c] border border-[#4d4635] px-3.5 py-2.5 text-[13px] text-[#e5e2e3] focus:border-[#f2ca50] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-sans text-[11px] font-semibold text-[#d0c5af] uppercase tracking-wider block">
                    Institutional Email
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="official@entity-or-media.com"
                    className="w-full bg-[#1c1b1c] border border-[#4d4635] px-3.5 py-2.5 text-[13px] text-[#e5e2e3] focus:border-[#f2ca50] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-sans text-[11px] font-semibold text-[#d0c5af] uppercase tracking-wider block">
                    Mandate Category
                  </label>
                  <select
                    value={formData.mandate}
                    onChange={(e) => setFormData({ ...formData, mandate: e.target.value })}
                    className="w-full bg-[#1c1b1c] border border-[#4d4635] px-3.5 py-2.5 text-[13px] text-[#e5e2e3] focus:border-[#f2ca50] focus:outline-none"
                  >
                    {activeMode === 'media' ? (
                      <>
                        <option>Accredited Media &amp; Press Interview</option>
                        <option>Film Festival &amp; Premiere Coverage</option>
                        <option>Broadcast / Television Appearance</option>
                        <option>Diplomatic &amp; Keynote Speaker Inquiry</option>
                        <option>Editorial Feature &amp; Monograph</option>
                      </>
                    ) : activeMode === 'investment' ? (
                      <>
                        <option>Sovereign FDI &amp; Bilateral Investment Allocation</option>
                        <option>GCC–India Free Zone Industrial Expansion</option>
                        <option>Family Office Cross-Border Syndication</option>
                        <option>Film Co-Production &amp; Entertainment Fund</option>
                        <option>Strategic Infrastructure &amp; Logistics Corridor</option>
                      </>
                    ) : (
                      <>
                        <option>GCC–India Bilateral Trade &amp; Inward FDI</option>
                        <option>Cinematic Co-Production &amp; Film Financing</option>
                        <option>High-Level Diplomatic Keynote</option>
                        <option>Women Leadership Sovereign Advisory</option>
                        <option>Cross-Border Free Zone Expansion</option>
                      </>
                    )}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-sans text-[11px] font-semibold text-[#d0c5af] uppercase tracking-wider block">
                    Institutional Base / Jurisdiction
                  </label>
                  <input
                    value={formData.jurisdiction}
                    onChange={(e) => setFormData({ ...formData, jurisdiction: e.target.value })}
                    placeholder="Dubai / New Delhi / Riyadh / London / New York"
                    className="w-full bg-[#1c1b1c] border border-[#4d4635] px-3.5 py-2.5 text-[13px] text-[#e5e2e3] focus:border-[#f2ca50] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-sans text-[11px] font-semibold text-[#d0c5af] uppercase tracking-wider block">
                  Executive Brief / Objective
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.brief}
                  onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                  placeholder={
                    activeMode === 'media'
                      ? 'Specify your publication, requested interview format, deadlines, and editorial scope...'
                      : activeMode === 'investment'
                      ? 'Outline proposed capital allocation, target corridors, timeline, and entity background...'
                      : 'Summarize the nature of your sovereign mandate, summit scope, or co-production treaty...'
                  }
                  className="w-full bg-[#1c1b1c] border border-[#4d4635] px-3.5 py-2.5 text-[13px] text-[#e5e2e3] focus:border-[#f2ca50] focus:outline-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3">
                <span className="flex items-center gap-1.5 text-[12px] text-[#d0c5af]">
                  <ShieldCheck className="w-4 h-4 text-[#f2ca50]" />
                  Apostille Protected Protocol
                </span>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#f2ca50] text-[#3c2f00] font-sans text-[11px] font-bold tracking-widest uppercase hover:bg-[#ffe088] transition-colors cursor-pointer"
                >
                  {activeMode === 'media'
                    ? 'Transmit Media Request'
                    : activeMode === 'investment'
                    ? 'Submit Investment Brief'
                    : 'Submit Mandate'}
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
