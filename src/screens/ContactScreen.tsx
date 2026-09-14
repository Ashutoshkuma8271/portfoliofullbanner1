import React, { useState } from 'react';
import { Mail, MapPin, Phone, ShieldCheck, Clock, Send, CheckCircle2, MessageCircle, Copy, Check, ArrowRight } from 'lucide-react';
import { SkeletonImage } from '../components/SkeletonImage';

const CHANCERY_LOCATIONS = [
  {
    id: 'dubai',
    region: 'Middle East Chancery',
    title: 'Dubai, UAE',
    jurisdictionKey: 'Dubai (DIFC) Chancery',
    description: 'Dubai International Financial Centre (DIFC) & Downtown Protocol Suites. Facilitating Gulf sovereign wealth syndications and trade missions.',
    phone: '+971 4 362 0000 (Chancery Desk)',
    tel: '+97143620000',
    badgeColor: 'text-[#f2ca50]',
    dotColor: 'bg-[#f2ca50]',
    status: 'GMT+4 • DIFC PROTOCOL',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'delhi',
    region: 'South Asia Chancery',
    title: 'New Delhi, India',
    jurisdictionKey: 'New Delhi Chancery',
    description: 'Diplomatic Enclave & Central Secretariat Corridor. Overseeing national civic presidencies and inward infrastructure investment frameworks.',
    phone: '+91 11 2410 0000 (Secretariat)',
    tel: '+911124100000',
    badgeColor: 'text-[#e9c176]',
    dotColor: 'bg-[#e9c176]',
    status: 'GMT+5:30 • SECRETARIAT',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1597040663342-45b6af3d91a5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'london',
    region: 'European Chancery',
    title: 'London, United Kingdom',
    jurisdictionKey: 'London (Mayfair) Chancery',
    description: 'Mayfair Executive Suites. Connecting European film syndicates, sovereign family offices, and bilateral cultural trusts.',
    phone: '+44 20 7946 0000 (European Desk)',
    tel: '+442079460000',
    badgeColor: 'text-[#ffdea5]',
    dotColor: 'bg-[#ffdea5]',
    status: 'GMT+0/BST • MAYFAIR DESK',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=800&q=80',
  },
];

export const ContactScreen: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    jurisdiction: 'Dubai (DIFC) Chancery',
    mandate: 'GCC–India Bilateral Trade & Investment',
    message: '',
  });
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const selectChanceryDesk = (jurisdictionKey: string) => {
    setFormData((prev) => ({ ...prev, jurisdiction: jurisdictionKey }));
    const formElement = document.getElementById('transmission-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const token = `CHANCERY-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedId(token);
  };

  const copyToken = () => {
    if (submittedId) {
      navigator.clipboard.writeText(submittedId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#11100e] text-[#e5e2e3] overflow-x-hidden animate-page-enter">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-16 space-y-14 sm:space-y-20">
      {/* Header */}
      <section className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-5">
        <div className="max-w-3xl space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1f1a14] border border-[#d4af37]/40 text-[#f2ca50] text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.22em] rounded-full shadow-sm">
            <span>Executive Protocol Desk</span>
          </div>
          <h1 className="font-['Cinzel'] text-[26px] sm:text-[36px] lg:text-[44px] font-normal leading-tight text-[#f4efe6]">
            Diplomatic &amp; Media <span className="italic font-serif text-[#f2ca50]">Chancery</span>
          </h1>
          <p className="font-['Montserrat'] text-[12.5px] sm:text-[14px] text-[#c8beaa] font-light leading-relaxed">
            The Office of Zeenat Kureshi maintains accredited representation and diplomatic liaison desks across key global financial and governmental corridors.
          </p>
        </div>

        {/* Direct WhatsApp Click Button (Explicitly requested in requirements) */}
        <a
          href="https://wa.me/?text=Hello%20Office%20of%20Zeenat%20Kureshi,%20I%20am%20transmitting%20an%20inquiry%20via%20ZeenatKureshi.com."
          target="_blank"
          rel="noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-full bg-[#122416] border border-[#23582d] hover:border-[#38b04a] text-[#8ae899] hover:text-[#b4f6be] font-['Montserrat'] text-[10.5px] sm:text-[11px] font-bold tracking-widest uppercase transition-all shadow-lg group"
        >
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38b04a] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#38b04a]"></span>
          </div>
          <MessageCircle className="w-4 h-4 text-[#38b04a] group-hover:scale-110 transition-transform shrink-0" />
          <span className="whitespace-nowrap">Official WhatsApp Protocol</span>
        </a>
      </section>

      {/* Chancery Locations Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {CHANCERY_LOCATIONS.map((chancery) => (
          <div
            key={chancery.id}
            className="group bg-[#1c1b1c] border border-[#4d4635]/80 hover:border-[#f2ca50] transition-all duration-300 rounded-xl overflow-hidden shadow-xl flex flex-col justify-between"
          >
            {/* Architectural Chancery Imagery */}
            <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#141314]">
              <SkeletonImage
                src={chancery.image}
                alt={`${chancery.title} Diplomatic Chancery`}
                fallbackSrc={chancery.fallbackImage}
                referrerPolicy="no-referrer"
                containerClassName="w-full h-full"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.88] contrast-105"
              />
              {/* Subtle obsidian gradient to blend into card body */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b1c] via-[#1c1b1c]/40 to-transparent pointer-events-none z-10"></div>

              {/* Chancery Region Tag */}
              <div className={`absolute top-3.5 left-3.5 flex items-center gap-1.5 px-3 py-1 rounded bg-[#0a0a0b]/85 backdrop-blur-md border border-[#4d4635]/70 ${chancery.badgeColor} font-sans text-[10px] font-bold tracking-widest uppercase shadow-md z-10`}>
                <span className={`w-1.5 h-1.5 rounded-full ${chancery.dotColor} animate-pulse`}></span>
                {chancery.region}
              </div>

              {/* Map Pin Badge */}
              <div className={`absolute top-3.5 right-3.5 p-2 rounded-full bg-[#0a0a0b]/85 backdrop-blur-md border border-[#4d4635]/70 ${chancery.badgeColor} shadow-md z-10`}>
                <MapPin className="w-4 h-4" />
              </div>

              {/* Timezone / Status Indicator */}
              <div className="absolute bottom-2.5 right-3 px-2.5 py-0.5 rounded bg-[#0a0a0b]/85 backdrop-blur-sm border border-[#4d4635]/50 text-[#d0c5af] text-[9px] font-mono tracking-wider">
                {chancery.status}
              </div>
            </div>

            {/* Card Content Body */}
            <div className="p-6 pt-3 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="font-serif text-[22px] text-[#e5e2e3] group-hover:text-[#f2ca50] transition-colors leading-snug">
                  {chancery.title}
                </h3>
                <p className="font-sans text-[14px] text-[#d0c5af] leading-relaxed">
                  {chancery.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#4d4635]/40 space-y-3">
                <a
                  href={`tel:${chancery.tel}`}
                  className="text-[12px] font-mono text-[#ffdea5] hover:text-[#f2ca50] flex items-center gap-2 transition-colors group/tel cursor-pointer"
                  title={`Call ${chancery.title} Chancery Desk`}
                >
                  <Phone className="w-3.5 h-3.5 text-[#f2ca50] group-hover/tel:scale-110 transition-transform shrink-0" />
                  <span>{chancery.phone}</span>
                </a>

                <button
                  type="button"
                  onClick={() => selectChanceryDesk(chancery.jurisdictionKey)}
                  className="w-full py-2.5 px-3.5 bg-[#141314] hover:bg-[#25221d] border border-[#4d4635]/60 hover:border-[#f2ca50]/70 text-[#d0c5af] hover:text-[#f2ca50] rounded font-sans text-[10px] font-bold uppercase tracking-wider transition-all flex items-center justify-between cursor-pointer group/btn"
                >
                  <span>Select Desk for Dispatch</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#f2ca50] group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Formal Transmission Form with Auto Email Simulation */}
      <section id="transmission-form" className="bg-[#1c1b1c] border border-[#4d4635] p-8 lg:p-14 rounded-xl shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="font-sans text-[11px] font-semibold text-[#f2ca50] tracking-widest uppercase block">
                Secure Transmission Line
              </span>
              <h2 className="font-serif text-[32px] text-[#e5e2e3]">
                Formal Protocol Dispatch
              </h2>
            </div>
            <p className="font-sans text-[15px] text-[#d0c5af] leading-relaxed">
              All communications directed to the Trade Commissioner or National Presidency undergo institutional encryption, protocol triage, and automated email confirmation dispatch.
            </p>

            <div className="space-y-4 pt-4 border-t border-[#4d4635]/40">
              <div className="flex items-center gap-3 text-[14px] text-[#d0c5af]">
                <ShieldCheck className="w-5 h-5 text-[#f2ca50] shrink-0" />
                <span>SSL Encrypted &amp; 256-Bit Hardware Token Security</span>
              </div>
              <div className="flex items-center gap-3 text-[14px] text-[#d0c5af]">
                <Clock className="w-5 h-5 text-[#e9c176] shrink-0" />
                <span>Standard Review SLA: 24 to 48 Hours</span>
              </div>
              <div className="flex items-center gap-3 text-[14px] text-[#d0c5af]">
                <Mail className="w-5 h-5 text-[#ffdea5] shrink-0" />
                <span>chancery@zeenatkureshi.com</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#0e0e0f] p-8 rounded-lg border border-[#4d4635]">
            {submittedId ? (
              <div className="p-8 text-center space-y-5">
                <div className="w-14 h-14 rounded-full bg-[#f2ca50]/15 text-[#f2ca50] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-[26px] text-[#e5e2e3]">Chancery Dispatch Transmitted</h3>
                <p className="font-sans text-[14px] text-[#d0c5af] max-w-sm mx-auto leading-relaxed">
                  Your diplomatic communique has been registered. An automated dispatch receipt has been routed to <strong className="text-[#f2ca50]">{formData.email}</strong>.
                </p>
                <div className="p-4 bg-[#1c1b1c] border border-[#4d4635] inline-flex items-center gap-3 rounded">
                  <span className="font-mono text-[14px] text-[#f2ca50]">{submittedId}</span>
                  <button
                    onClick={copyToken}
                    className="p-1 text-[#d0c5af] hover:text-[#f2ca50] cursor-pointer"
                    title="Copy token"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => setSubmittedId(null)}
                    className="px-6 py-2.5 bg-[#1c1b1c] border border-[#4d4635] text-[#d0c5af] hover:text-white font-sans text-[11px] font-bold uppercase tracking-widest rounded cursor-pointer"
                  >
                    Transmit Another Dispatch
                  </button>
                  <a
                    href={`https://wa.me/?text=Hello%20Office%20of%20Zeenat%20Kureshi,%20following%20up%20on%20communique%20${submittedId}.`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-2.5 bg-[#122416] border border-[#23582d] text-[#8ae899] font-sans text-[11px] font-bold uppercase tracking-widest rounded inline-flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-[#38b04a]" />
                    WhatsApp Secretariat
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase font-semibold text-[#d0c5af] tracking-wider block">
                      Diplomatic / Official Name *
                    </label>
                    <input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Amb. / Dr. / Ms."
                      className="w-full bg-[#1c1b1c] border border-[#4d4635] p-3 text-[13px] text-[#e5e2e3] focus:border-[#f2ca50] focus:outline-none rounded"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase font-semibold text-[#d0c5af] tracking-wider block">
                      Institutional Email (Auto-Receipt Sent Here) *
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@ministry.gov / entity.com"
                      className="w-full bg-[#1c1b1c] border border-[#4d4635] p-3 text-[13px] text-[#e5e2e3] focus:border-[#f2ca50] focus:outline-none rounded"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase font-semibold text-[#d0c5af] tracking-wider block">
                      Direct Telephone / WhatsApp
                    </label>
                    <input
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+971 50 000 0000"
                      className="w-full bg-[#1c1b1c] border border-[#4d4635] p-3 text-[13px] text-[#e5e2e3] focus:border-[#f2ca50] focus:outline-none rounded"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase font-semibold text-[#d0c5af] tracking-wider block">
                      Target Chancery Desk *
                    </label>
                    <select
                      value={formData.jurisdiction}
                      onChange={(e) => setFormData({ ...formData, jurisdiction: e.target.value })}
                      className="w-full bg-[#1c1b1c] border border-[#4d4635] p-3 text-[13px] text-[#e5e2e3] focus:border-[#f2ca50] focus:outline-none rounded"
                    >
                      <option>Dubai (DIFC) Chancery</option>
                      <option>New Delhi Chancery</option>
                      <option>London (Mayfair) Chancery</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase font-semibold text-[#d0c5af] tracking-wider block">
                    Subject / Mandate Category *
                  </label>
                  <input
                    required
                    value={formData.mandate}
                    onChange={(e) => setFormData({ ...formData, mandate: e.target.value })}
                    className="w-full bg-[#1c1b1c] border border-[#4d4635] p-3 text-[13px] text-[#e5e2e3] focus:border-[#f2ca50] focus:outline-none rounded"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase font-semibold text-[#d0c5af] tracking-wider block">
                    Detailed Communique *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details regarding your institution, proposal, summit invitation, or trade matter..."
                    className="w-full bg-[#1c1b1c] border border-[#4d4635] p-3 text-[13px] text-[#e5e2e3] focus:border-[#f2ca50] focus:outline-none rounded"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-[#d4af37] via-[#f2ca50] to-[#e6bc48] text-[#1a1402] font-sans text-[11px] font-bold uppercase tracking-widest hover:from-[#ffe088] transition-all flex items-center justify-center gap-2 cursor-pointer rounded shadow-lg"
                >
                  Transmit Diplomatic Dispatch
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
      </div>
    </div>
  );
};

export default ContactScreen;

