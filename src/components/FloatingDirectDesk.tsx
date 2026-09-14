import React, { useState } from 'react';
import { MessageCircle, X, Send, PhoneCall, CheckCircle } from 'lucide-react';

export const FloatingDirectDesk: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [senderName, setSenderName] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setMessage('');
      setSenderName('');
      setIsOpen(false);
    }, 2500);
  };

  return (
    <>
      <aside className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 sm:gap-3 px-3.5 py-2.5 sm:px-4 sm:py-3 bg-[#111612]/95 backdrop-blur-md border border-[#2e5936] hover:border-[#38b04a] text-[#e5e2e3] rounded-full shadow-[0_4px_25px_rgba(0,0,0,0.6)] hover:shadow-[0_4px_25px_rgba(40,167,69,0.3)] transition-all duration-300 group cursor-pointer"
          aria-label="Direct Protocol Desk & WhatsApp Hotline"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38b04a] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#38b04a]"></span>
          </span>
          <MessageCircle className="w-4 h-4 text-[#38b04a] group-hover:scale-110 transition-transform" />
          <span className="font-sans text-[10.5px] sm:text-[11px] font-semibold text-[#c8e6c9] group-hover:text-white tracking-widest uppercase">
            WhatsApp Desk
          </span>
        </button>
      </aside>

      {/* Popover / Protocol Dispatch Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-[#131314] border border-[#d4af37]/60 w-full max-w-md p-6 rounded-xl shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#4d4635]/40">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38b04a] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#38b04a]"></span>
                </span>
                <div>
                  <h4 className="font-serif text-[18px] text-[#e5e2e3]">Chancery Direct Protocol</h4>
                  <span className="font-sans text-[10px] text-[#ffdea5] tracking-widest uppercase">
                    Official WhatsApp Line &bull; Dubai / New Delhi
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-[#d0c5af] hover:text-[#f2ca50] cursor-pointer"
                aria-label="Close Direct Desk"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {sent ? (
              <div className="p-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#f2ca50]/10 border border-[#f2ca50] mx-auto flex items-center justify-center text-[#f2ca50]">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h5 className="font-serif text-[18px] text-[#e5e2e3]">Dispatch Transmitted</h5>
                <p className="font-sans text-[13px] text-[#d0c5af] leading-relaxed">
                  The Diplomatic Secretariat has logged your priority communique. An executive officer will connect via secure line or WhatsApp within 120 minutes.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <p className="font-sans text-[13px] text-[#d0c5af] leading-relaxed">
                  Direct encrypted line for accredited state representatives, sovereign delegates, and senior production executives.
                </p>

                {/* Instant WhatsApp Direct Connection Button */}
                <a
                  href="https://wa.me/?text=Hello%20Office%20of%20Zeenat%20Kureshi,%20I%20am%20transmitting%20an%20inquiry%20via%20ZeenatKureshi.com."
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 rounded bg-[#122416] border border-[#23582d] hover:border-[#38b04a] text-[#8ae899] hover:text-[#b4f6be] font-sans text-[11px] font-bold tracking-widest uppercase transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#38b04a]" />
                  Launch WhatsApp Chat Directly
                </a>

                <div className="relative flex items-center justify-center">
                  <div className="border-t border-[#4d4635]/40 w-full"></div>
                  <span className="bg-[#131314] px-2 text-[10px] text-[#99907c] uppercase tracking-wider whitespace-nowrap">
                    or Send Instant Secure Note
                  </span>
                  <div className="border-t border-[#4d4635]/40 w-full"></div>
                </div>

                <div className="space-y-1">
                  <label className="font-sans text-[10px] font-semibold text-[#d0c5af] uppercase tracking-wider block">
                    Your Name / Institutional Title
                  </label>
                  <input
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    required
                    placeholder="e.g. Counsellor Al-Hassan / Dir. Mehta"
                    className="w-full bg-[#1c1b1c] border border-[#4d4635]/60 px-3 py-2 text-[13px] text-[#e5e2e3] focus:border-[#f2ca50] focus:outline-none rounded"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-sans text-[10px] font-semibold text-[#d0c5af] uppercase tracking-wider block">
                    Priority Communiqué / WhatsApp Coordinates
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={3}
                    placeholder="Provide brief objective or contact coordinates..."
                    className="w-full bg-[#1c1b1c] border border-[#4d4635]/60 px-3 py-2 text-[13px] text-[#e5e2e3] focus:border-[#f2ca50] focus:outline-none rounded"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[10.5px] text-[#99907c] font-mono">
                    256-bit Protocol Encryption
                  </span>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#d4af37] to-[#f2ca50] text-[#1a1402] font-sans text-[11px] font-bold tracking-widest uppercase hover:from-[#ffe088] transition-colors cursor-pointer rounded shadow-sm"
                  >
                    Send Dispatch
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};
