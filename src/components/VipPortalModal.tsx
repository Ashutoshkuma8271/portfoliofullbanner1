import React, { useState } from 'react';
import { Lock, KeyRound, Download, FileText, CheckCircle2, ShieldAlert, X } from 'lucide-react';

interface VipPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VipPortalModal: React.FC<VipPortalModalProps> = ({ isOpen, onClose }) => {
  const [passcode, setPasscode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = passcode.trim().toUpperCase();
    // Accept valid codes or demo code
    if (clean === 'SOVEREIGN2026' || clean === 'VIP' || clean === 'ZEENAT' || clean === 'DIPLOMAT' || clean === '') {
      setIsUnlocked(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Invalid diplomatic access credential. Use SOVEREIGN2026 or leave blank for demo preview.');
    }
  };

  const handleQuickUnlock = () => {
    setIsUnlocked(true);
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#131314] border border-[#d4af37]/60 max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-xl p-6 sm:p-10 relative shadow-[0_0_50px_rgba(212,175,55,0.15)]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#d0c5af] hover:text-[#f2ca50] cursor-pointer"
          aria-label="Close VIP Portal"
        >
          <X className="w-6 h-6" />
        </button>

        {!isUnlocked ? (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#1c1b1c] border border-[#f2ca50]/30 text-[#f2ca50] font-sans text-[11px] font-semibold uppercase tracking-widest">
                <Lock className="w-3.5 h-3.5" />
                Sovereign Investor &amp; Diplomatic Enclave
              </div>
              <h3 className="font-serif text-[28px] sm:text-[32px] text-[#e5e2e3] leading-tight">
                VIP Chancery Access Portal
              </h3>
              <p className="font-sans text-[14px] text-[#d0c5af] leading-relaxed">
                Access to private syndication briefs, confidential bilateral treaties, and direct sovereign line coordinates is restricted to credentialed delegates.
              </p>
            </div>

            <form onSubmit={handleUnlock} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="font-sans text-[11px] font-semibold text-[#ffdea5] uppercase tracking-widest block">
                  Enter Diplomatic Token / Access Code
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-3.5 w-4 h-4 text-[#99907c]" />
                  <input
                    type="password"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Enter code (or click instant access below)"
                    className="w-full bg-[#1c1b1c] border border-[#4d4635] pl-10 pr-4 py-3 text-[14px] text-[#e5e2e3] placeholder:text-[#99907c] focus:border-[#f2ca50] focus:outline-none"
                  />
                </div>
                {errorMsg && (
                  <p className="text-[12px] text-[#ffb4ab] flex items-center gap-1 mt-1">
                    <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                    {errorMsg}
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3.5 bg-[#f2ca50] text-[#3c2f00] font-sans text-[11px] font-bold uppercase tracking-widest hover:bg-[#ffe088] transition-colors cursor-pointer"
                >
                  Verify Credentials
                </button>
                <button
                  type="button"
                  onClick={handleQuickUnlock}
                  className="py-3.5 px-6 border border-[#4d4635] hover:border-[#f2ca50] text-[#e5e2e3] font-sans text-[11px] font-semibold uppercase tracking-widest transition-colors cursor-pointer"
                >
                  One-Click Envoy Bypass
                </button>
              </div>

              <p className="text-[12px] text-[#99907c] text-center pt-2 italic">
                Demo access code: <span className="text-[#f2ca50] font-mono">SOVEREIGN2026</span>
              </p>
            </form>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2 border-b border-[#4d4635]/40 pb-4">
              <div className="inline-flex items-center gap-2 text-[#f2ca50] text-[12px] font-semibold uppercase tracking-widest">
                <CheckCircle2 className="w-4 h-4 text-[#f2ca50]" />
                Accredited Envoy Session Active
              </div>
              <h3 className="font-serif text-[26px] text-[#e5e2e3]">
                Confidential Briefing Dossiers
              </h3>
              <p className="font-sans text-[13px] text-[#d0c5af]">
                The following restricted files are certified under sovereign bilateral protocol covenants.
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-[#1c1b1c] border border-[#4d4635] flex items-start justify-between gap-4 hover:border-[#f2ca50] transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#f2ca50]" />
                    <span className="font-serif text-[16px] text-[#e5e2e3]">GCC–India Sovereign FDI Strategy Deck (2026–2030)</span>
                  </div>
                  <p className="font-sans text-[12px] text-[#d0c5af]">
                    38-page confidential economic blueprint outlining green hydrogen, sovereign logistics, and cross-border tech concessions.
                  </p>
                </div>
                <button
                  onClick={() => alert('Downloading official confidential brief: GCC-India_Sovereign_FDI_2026.pdf')}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#f2ca50] text-[#3c2f00] font-sans text-[10px] font-bold uppercase tracking-wider hover:bg-[#ffe088] transition-colors cursor-pointer shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  PDF Brief
                </button>
              </div>

              <div className="p-4 bg-[#1c1b1c] border border-[#4d4635] flex items-start justify-between gap-4 hover:border-[#f2ca50] transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#f2ca50]" />
                    <span className="font-serif text-[16px] text-[#e5e2e3]">Tripartite Film Co-Production Private Slate</span>
                  </div>
                  <p className="font-sans text-[12px] text-[#d0c5af]">
                    Executive financing structures, 35% state rebate schedules, and talent packaging overview for Q3/Q4 feature films.
                  </p>
                </div>
                <button
                  onClick={() => alert('Downloading official private slate dossier: Kureshi_Slate_Confidential.pdf')}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#f2ca50] text-[#3c2f00] font-sans text-[10px] font-bold uppercase tracking-wider hover:bg-[#ffe088] transition-colors cursor-pointer shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  PDF Brief
                </button>
              </div>

              <div className="p-4 bg-[#1c1b1c] border border-[#4d4635] flex items-start justify-between gap-4 hover:border-[#f2ca50] transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#f2ca50]" />
                    <span className="font-serif text-[16px] text-[#e5e2e3]">Private Chancery Protocol Direct Line</span>
                  </div>
                  <p className="font-sans text-[12px] text-[#d0c5af]">
                    Direct diplomatic liaison contacts in Dubai DIFC, New Delhi Diplomatic Enclave, and London Mayfair.
                  </p>
                </div>
                <span className="px-3 py-1.5 bg-[#4d4635]/30 text-[#ffdea5] text-[11px] font-mono tracking-wider self-center">
                  +971 4 (DIFC) • +91 11 (DEL)
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-[11px] text-[#99907c] uppercase tracking-wider">
                Session Authenticated via 256-Bit Hardware Token
              </span>
              <button
                onClick={() => setIsUnlocked(false)}
                className="text-[12px] text-[#f2ca50] hover:underline uppercase tracking-wider cursor-pointer"
              >
                Lock Session
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
