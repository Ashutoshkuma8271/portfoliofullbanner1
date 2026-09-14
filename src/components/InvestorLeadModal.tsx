import React, { useState } from 'react';
import { X, Send, CheckCircle2, DollarSign, ShieldCheck, Building2, Globe, FileText, Check } from 'lucide-react';

interface InvestorLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InvestorLeadModal: React.FC<InvestorLeadModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    title: '',
    entityName: '',
    email: '',
    phone: '',
    entityType: 'Sovereign Wealth / Family Office',
    ticketSize: '$5M – $25M USD',
    targetCorridor: 'UAE – India CEPA Economic Corridor',
    timeline: 'Immediate Deployment (< 60 Days)',
    mandateNotes: '',
    ndaAcknowledged: true,
  });

  const [submittedId, setSubmittedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `INV-CORRIDOR-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedId(ref);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#141312] border border-[#d4af37]/70 max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-2xl p-6 sm:p-10 relative shadow-[0_0_60px_rgba(212,175,55,0.25)] space-y-6">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#d0c5af] hover:text-[#f2ca50] cursor-pointer p-1"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="space-y-2 border-b border-[#4d4635]/40 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1c1b1c] border border-[#f2ca50]/40 text-[#f2ca50] text-[11px] font-bold uppercase tracking-[0.25em]">
            <DollarSign className="w-3 h-3" />
            Confidential Capital Qualification Desk
          </div>
          <h2 className="font-serif text-[28px] sm:text-[34px] text-[#e5e2e3]">
            Sovereign &amp; Institutional <span className="italic text-[#f2ca50]">Investor Qualification</span>
          </h2>
          <p className="font-sans text-[14px] text-[#d0c5af] leading-relaxed">
            Directly routed to the Trade Commissioner’s Investment Advisory Desk. Structured for institutional syndicates, family offices, and accredited sovereign entities.
          </p>
        </div>

        {submittedId ? (
          <div className="py-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#f2ca50]/15 text-[#f2ca50] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="font-serif text-[26px] text-[#e5e2e3]">
              Investor Dossier Authenticated
            </h3>
            <p className="font-sans text-[14px] text-[#d0c5af] max-w-md mx-auto leading-relaxed">
              Your investment profile has been logged under diplomatic bilateral triage. An encrypted confirmation dossier has been routed to <strong className="text-[#f2ca50]">{formData.email}</strong>.
            </p>
            <div className="p-4 bg-[#1c1b1c] border border-[#4d4635] inline-block rounded font-mono text-[14px] text-[#f2ca50]">
              Allocation Ref: {submittedId}
            </div>
            <div className="pt-3">
              <button
                onClick={() => {
                  setSubmittedId(null);
                  onClose();
                }}
                className="px-8 py-3 bg-gradient-to-r from-[#d4af37] to-[#f2ca50] text-[#1a1402] font-sans text-[11px] font-bold uppercase tracking-widest hover:from-[#ffe088] rounded cursor-pointer transition-all shadow-md"
              >
                Return to Portfolio
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-sans font-semibold text-[#d0c5af] uppercase">
                  Principal / Representative Name *
                </label>
                <input
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Sheikh Sultan / Dr. Vikram Malhotra"
                  className="w-full bg-[#0e0e0f] border border-[#4d4635] px-3.5 py-2.5 text-[13px] text-[#e5e2e3] focus:border-[#f2ca50] focus:outline-none rounded"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-sans font-semibold text-[#d0c5af] uppercase">
                  Institutional Title / Designation *
                </label>
                <input
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Managing Director / Chief Investment Officer"
                  className="w-full bg-[#0e0e0f] border border-[#4d4635] px-3.5 py-2.5 text-[13px] text-[#e5e2e3] focus:border-[#f2ca50] focus:outline-none rounded"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-sans font-semibold text-[#d0c5af] uppercase">
                  Entity / Family Office Name *
                </label>
                <input
                  required
                  value={formData.entityName}
                  onChange={(e) => setFormData({ ...formData, entityName: e.target.value })}
                  placeholder="e.g. Al-Nahyan Capital / Meridian Global"
                  className="w-full bg-[#0e0e0f] border border-[#4d4635] px-3.5 py-2.5 text-[13px] text-[#e5e2e3] focus:border-[#f2ca50] focus:outline-none rounded"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-sans font-semibold text-[#d0c5af] uppercase">
                  Institutional Email *
                </label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="investments@entity.com"
                  className="w-full bg-[#0e0e0f] border border-[#4d4635] px-3.5 py-2.5 text-[13px] text-[#e5e2e3] focus:border-[#f2ca50] focus:outline-none rounded"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-sans font-semibold text-[#d0c5af] uppercase">
                  Direct Telephone / WhatsApp *
                </label>
                <input
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+971 50 000 0000 / +91 98000 00000"
                  className="w-full bg-[#0e0e0f] border border-[#4d4635] px-3.5 py-2.5 text-[13px] text-[#e5e2e3] focus:border-[#f2ca50] focus:outline-none rounded"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-sans font-semibold text-[#d0c5af] uppercase">
                  Target Allocation Ticket Size *
                </label>
                <select
                  value={formData.ticketSize}
                  onChange={(e) => setFormData({ ...formData, ticketSize: e.target.value })}
                  className="w-full bg-[#0e0e0f] border border-[#4d4635] px-3.5 py-2.5 text-[13px] text-[#e5e2e3] focus:border-[#f2ca50] focus:outline-none rounded font-mono"
                >
                  <option>$1M – $5M USD (Strategic Emerging Entry)</option>
                  <option>$5M – $25M USD (Core Bilateral Syndicate)</option>
                  <option>$25M – $100M USD (Sovereign Infrastructure / Logistics)</option>
                  <option>$100M+ USD (Anchor Sovereign / Energy Corridors)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-sans font-semibold text-[#d0c5af] uppercase">
                  Preferred Investment Corridor *
                </label>
                <select
                  value={formData.targetCorridor}
                  onChange={(e) => setFormData({ ...formData, targetCorridor: e.target.value })}
                  className="w-full bg-[#0e0e0f] border border-[#4d4635] px-3.5 py-2.5 text-[13px] text-[#e5e2e3] focus:border-[#f2ca50] focus:outline-none rounded"
                >
                  <option>UAE – India CEPA Economic Corridor</option>
                  <option>Saudi Arabia (Vision 2030) – South Asia</option>
                  <option>Transnational Cinema Co-Production &amp; Media IP</option>
                  <option>DIFC / ADGM to GIFT City Dual-Headquarters</option>
                  <option>Renewable Energy &amp; Semiconductor Logistics</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-sans font-semibold text-[#d0c5af] uppercase">
                  Deployment Timeline *
                </label>
                <select
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="w-full bg-[#0e0e0f] border border-[#4d4635] px-3.5 py-2.5 text-[13px] text-[#e5e2e3] focus:border-[#f2ca50] focus:outline-none rounded"
                >
                  <option>Immediate Deployment (&lt; 60 Days)</option>
                  <option>Q2–Q3 2026 Sovereign Allocation</option>
                  <option>Fiscal Year 2027 Pipeline</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-sans font-semibold text-[#d0c5af] uppercase">
                Specific Mandate Notes / Synergies
              </label>
              <textarea
                rows={3}
                value={formData.mandateNotes}
                onChange={(e) => setFormData({ ...formData, mandateNotes: e.target.value })}
                placeholder="Indicate key co-investors, asset class requirements, regulatory approvals sought, or preferred structuring..."
                className="w-full bg-[#0e0e0f] border border-[#4d4635] px-3.5 py-2.5 text-[13px] text-[#e5e2e3] focus:border-[#f2ca50] focus:outline-none rounded"
              />
            </div>

            <div className="p-3 bg-[#1c1b1c] border border-[#4d4635] rounded text-[12px] text-[#d0c5af] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#f2ca50] shrink-0" />
              <span>Transmitted under strict bilateral diplomatic non-disclosure standards.</span>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#d4af37] via-[#f2ca50] to-[#e6bc48] text-[#1a1402] font-sans text-[11px] font-bold uppercase tracking-widest hover:from-[#ffe088] rounded cursor-pointer transition-all shadow-lg flex items-center justify-center gap-2"
              >
                Submit Investment Dossier for Review
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
