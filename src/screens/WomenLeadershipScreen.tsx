import React, { useState } from 'react';
import { LEADERSHIP_INITIATIVES } from '../data/folioData';
import { SkeletonImage } from '../components/SkeletonImage';
import { Users, Award, ShieldCheck, HeartHandshake, CheckCircle2, Calendar, MapPin, Send, MessageCircle } from 'lucide-react';

interface WomenLeadershipScreenProps {
  onOpenCollaborate: () => void;
}

export const WomenLeadershipScreen: React.FC<WomenLeadershipScreenProps> = ({ onOpenCollaborate }) => {
  // Member / Volunteer inquiry form state (Specified in requirements)
  const [memberForm, setMemberForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    cityState: '',
    interest: 'General Member — All India Jamiatul Quresh Women Cell',
    experience: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [membershipId, setMembershipId] = useState('');

  const handleMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `AIJQ-WC-${Math.floor(10000 + Math.random() * 90000)}`;
    setMembershipId(id);
    setFormSubmitted(true);
  };

  const UPCOMING_EVENTS = [
    {
      id: 'e-1',
      title: 'National Women Leadership & Micro-Enterprise Summit',
      date: 'November 14–16, 2026',
      location: 'Vigyan Bhawan, New Delhi',
      organizer: 'All India Jamiatul Quresh Women Cell',
      status: 'Delegate Registrations Open',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80',
      badge: 'National Assembly',
      description: 'Assembling over 2,500 state delegates, female entrepreneurs, and micro-grant beneficiaries for sovereign leadership awards.',
    },
    {
      id: 'e-2',
      title: 'GCC–South Asia Women in Executive Governance Conclave',
      date: 'January 22, 2027',
      location: 'Dubai World Trade Centre, UAE',
      organizer: 'Diplomatic Chancery & Women Cell Secretariat',
      status: 'By Protocol Invitation',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80',
      badge: 'Executive Conclave',
      description: 'Connecting top corporate board members, sovereign wealth executives, and emerging women founders across India and the Gulf.',
    },
    {
      id: 'e-3',
      title: 'Grassroots Literacy & Financial Autonomy Workshop Tour',
      date: 'Monthly Series (Q1–Q2 2027)',
      location: 'Uttar Pradesh, Maharashtra, Rajasthan & Telangana',
      organizer: 'Civic Outreach Directorate',
      status: 'Community Registration Active',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80',
      badge: 'Grassroots Tour',
      description: 'Targeted banking literacy, UPI micro-credit facilitation, and artisanal cooperative legal structuring.',
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#11100e] text-[#e5e2e3] overflow-x-hidden animate-page-enter">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-16 space-y-14 sm:space-y-20">
      {/* Monograph Header with All India Jamiatul Quresh Women Cell Explicit Distinction */}
      <section className="max-w-4xl space-y-3">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1f1a14] border border-[#d4af37]/40 text-[#f2ca50] text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.22em] rounded-full shadow-sm">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Statutory Civic Mandate</span>
          </div>
          <h1 className="font-['Cinzel'] text-[26px] sm:text-[36px] lg:text-[44px] font-normal leading-tight text-[#f4efe6]">
            All India Jamiatul Quresh <span className="italic font-serif text-[#f2ca50]">Women Cell</span>
          </h1>
          <span className="font-['Montserrat'] text-[11px] sm:text-[12px] font-semibold tracking-wider text-[#e9c176] uppercase block">
            Office of the National President — Zeenat Kureshi
          </span>
        </div>
        <p className="font-['Montserrat'] text-[12.5px] sm:text-[14px] text-[#c8beaa] font-light leading-relaxed">
          Spearheading a transformative socioeconomic movement across India and the diaspora. Mobilizing grassroots financial independence, legal empowerment, vocational certifications, and executive boardroom inclusion for over 120,000 women.
        </p>
      </section>

      {/* Impact Numbers */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 p-4 sm:p-7 bg-[#161410] border border-[#3e3422] rounded-2xl shadow-xl">
        <div className="space-y-1 border-r border-[#2e2617] pr-2 sm:pr-4">
          <span className="font-['Cinzel'] text-[24px] sm:text-[30px] lg:text-[34px] text-[#f2ca50] block font-semibold leading-none">120K+</span>
          <span className="font-['Montserrat'] text-[8.5px] sm:text-[10px] font-semibold text-[#b5aa96] uppercase tracking-[0.14em] sm:tracking-[0.18em]">Women Mobilized</span>
        </div>
        <div className="space-y-1 md:border-r border-[#2e2617] pr-2 sm:pr-4">
          <span className="font-['Cinzel'] text-[24px] sm:text-[30px] lg:text-[34px] text-[#e9c176] block font-semibold leading-none">4,200</span>
          <span className="font-['Montserrat'] text-[8.5px] sm:text-[10px] font-semibold text-[#b5aa96] uppercase tracking-[0.14em] sm:tracking-[0.18em]">Seed-Funded</span>
        </div>
        <div className="space-y-1 border-r border-[#2e2617] pr-2 sm:pr-4 pt-2 md:pt-0">
          <span className="font-['Cinzel'] text-[24px] sm:text-[30px] lg:text-[34px] text-[#f2ca50] block font-semibold leading-none">260+</span>
          <span className="font-['Montserrat'] text-[8.5px] sm:text-[10px] font-semibold text-[#b5aa96] uppercase tracking-[0.14em] sm:tracking-[0.18em]">Corporate Charters</span>
        </div>
        <div className="space-y-1 pt-2 md:pt-0">
          <span className="font-['Cinzel'] text-[24px] sm:text-[30px] lg:text-[34px] text-[#e9c176] block font-semibold leading-none">18+</span>
          <span className="font-['Montserrat'] text-[8.5px] sm:text-[10px] font-semibold text-[#b5aa96] uppercase tracking-[0.14em] sm:tracking-[0.18em]">Sovereign Conclaves</span>
        </div>
      </section>

      {/* Mission & Core Initiatives (Specified in requirements) */}
      <section className="space-y-6 sm:space-y-8">
        <div className="space-y-2 border-b border-[#2e2617] pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1f1a14] border border-[#d4af37]/40 text-[#f2ca50] text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.22em] rounded-full shadow-sm">
            <span>Constitutional Mission</span>
          </div>
          <h2 className="font-['Cinzel'] text-[24px] sm:text-[32px] lg:text-[38px] font-normal text-[#f4efe6] leading-tight tracking-tight">
            Mission &amp; Strategic Frameworks
          </h2>
          <p className="font-['Montserrat'] text-[12.5px] sm:text-[13.5px] text-[#c8beaa] font-light leading-relaxed">
            Statutory civic mandates for grassroots capital, legal protection, and boardroom parity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#1c1b1c] border border-[#4d4635] rounded-xl space-y-4 flex flex-col justify-between hover:border-[#f2ca50]/60 transition-all">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-[#0e0e0f] border border-[#f2ca50]/40 flex items-center justify-center">
                <Users className="w-6 h-6 text-[#f2ca50]" />
              </div>
              <h3 className="font-serif text-[20px] text-[#e5e2e3]">Financial Sovereignty &amp; Micro-Grants</h3>
              <p className="font-sans text-[13px] text-[#d0c5af] leading-relaxed">
                Direct disbursement of zero-collateral micro-grants enabling home-based ventures, artisanal cooperatives, and retail shops.
              </p>
            </div>
            <div className="pt-3 border-t border-[#4d4635]/40 text-[10px] font-mono text-[#f2ca50] uppercase tracking-wider">
              4,200 Micro-Grants Seeded
            </div>
          </div>

          <div className="p-6 bg-[#1c1b1c] border border-[#4d4635] rounded-xl space-y-4 flex flex-col justify-between hover:border-[#f2ca50]/60 transition-all">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-[#0e0e0f] border border-[#e9c176]/40 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-[#e9c176]" />
              </div>
              <h3 className="font-serif text-[20px] text-[#e5e2e3]">Legal Aid &amp; Family Rights Desks</h3>
              <p className="font-sans text-[13px] text-[#d0c5af] leading-relaxed">
                Pro bono legal counsel, statutory rights protection, and institutional counseling desks in 14 tier-1 and tier-2 states.
              </p>
            </div>
            <div className="pt-3 border-t border-[#4d4635]/40 text-[10px] font-mono text-[#e9c176] uppercase tracking-wider">
              14 State Legal Desks Active
            </div>
          </div>

          <div className="p-6 bg-[#1c1b1c] border border-[#4d4635] rounded-xl space-y-4 flex flex-col justify-between hover:border-[#f2ca50]/60 transition-all">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-[#0e0e0f] border border-[#ffdea5]/40 flex items-center justify-center">
                <Award className="w-6 h-6 text-[#ffdea5]" />
              </div>
              <h3 className="font-serif text-[20px] text-[#e5e2e3]">Boardroom Parity &amp; Executive Mentorship</h3>
              <p className="font-sans text-[13px] text-[#d0c5af] leading-relaxed">
                Training high-potential women professionals for independent board directorships, corporate committee appointments, and civic governance.
              </p>
            </div>
            <div className="pt-3 border-t border-[#4d4635]/40 text-[10px] font-mono text-[#ffdea5] uppercase tracking-wider">
              260+ Enterprise Charters
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events (Specified in requirements) */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-[#4d4635]/40 pb-4">
          <div>
            <span className="font-sans text-[11px] font-semibold text-[#f2ca50] tracking-widest uppercase block">
              Civic Calendar
            </span>
            <h2 className="font-serif text-[28px] sm:text-[34px] text-[#e5e2e3]">
              Upcoming Events &amp; Conclaves
            </h2>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById('volunteer-form');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-2.5 bg-gradient-to-r from-[#d4af37] to-[#f2ca50] text-[#1a1402] font-sans text-[11px] font-bold tracking-widest uppercase hover:from-[#ffe088] transition-all cursor-pointer rounded shadow-md"
          >
            Join as Member / Volunteer
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {UPCOMING_EVENTS.map((event) => (
            <div key={event.id} className="bg-[#1c1b1c] border border-[#4d4635] rounded-xl overflow-hidden space-y-4 flex flex-col justify-between hover:border-[#f2ca50] transition-all duration-300 shadow-xl group">
              {event.image && (
                <div className="relative h-44 w-full bg-[#14120f] overflow-hidden">
                  <SkeletonImage
                    src={event.image}
                    alt={event.title}
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover object-[center_25%] sm:object-center filter brightness-[0.85] contrast-105 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b1c] via-transparent to-transparent pointer-events-none z-10"></div>
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded bg-[#0a0907]/80 backdrop-blur-md border border-[#f2ca50]/40 text-[#f2ca50] font-sans text-[9px] font-bold tracking-widest uppercase z-10">
                    {event.badge}
                  </div>
                </div>
              )}

              <div className="p-6 pt-0 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-[9.5px] font-mono text-[#f2ca50] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#0e0e0f] rounded border border-[#f2ca50]/30">
                      {event.status}
                    </span>
                  </div>
                  <h3 className="font-serif text-[18px] sm:text-[19px] text-[#e5e2e3] font-normal leading-snug pt-1 group-hover:text-[#f2ca50] transition-colors">
                    {event.title}
                  </h3>
                  <div className="space-y-1 text-[11.5px] text-[#d0c5af] pt-1 font-mono">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#f2ca50] shrink-0" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#e9c176] shrink-0" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <p className="font-sans text-[13px] text-[#d0c5af] pt-1 leading-relaxed line-clamp-3">
                    {event.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#4d4635]/40 flex justify-between items-center text-[10.5px]">
                  <span className="text-[#99907c] truncate max-w-[170px]">{event.organizer}</span>
                  <span className="text-[#f2ca50] font-semibold uppercase tracking-wider shrink-0">Accredited</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Volunteer / Member Inquiry Form (Specified in requirements) */}
      <section id="volunteer-form" className="bg-[#1c1b1c] border border-[#d4af37]/40 rounded-xl p-8 lg:p-14 space-y-8 shadow-2xl">
        <div className="max-w-2xl space-y-2">
          <span className="font-sans text-[11px] font-bold text-[#f2ca50] tracking-widest uppercase block">
            National Enrollment Desk
          </span>
          <h2 className="font-serif text-[32px] sm:text-[38px] text-[#e5e2e3]">
            Member &amp; Volunteer Registration
          </h2>
          <p className="font-sans text-[14px] text-[#d0c5af]">
            Apply to become a verified member, state volunteer coordinator, or institutional patron of the All India Jamiatul Quresh Women Cell.
          </p>
        </div>

        {formSubmitted ? (
          <div className="bg-[#0e0e0f] border border-[#d4af37] p-8 rounded-lg text-center space-y-4 max-w-2xl mx-auto">
            <div className="w-14 h-14 rounded-full bg-[#f2ca50]/15 text-[#f2ca50] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-[24px] text-[#e5e2e3]">
              Enrollment Registered Successfully
            </h3>
            <p className="font-sans text-[14px] text-[#d0c5af] leading-relaxed">
              Welcome to the Women Cell sisterhood. Your registration credentials have been recorded at the National Secretariat.
            </p>
            <div className="p-4 bg-[#1c1b1c] border border-[#4d4635] inline-block rounded font-mono text-[13px] text-[#f2ca50]">
              Membership ID: {membershipId}
            </div>
            <div className="pt-2">
              <a
                href={`https://wa.me/?text=Hello%20Office%20of%20Zeenat%20Kureshi,%20I%20have%20registered%20as%20a%20member%20with%20ID%20${membershipId}.`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#122416] border border-[#23582d] text-[#8ae899] font-sans text-[11px] font-bold tracking-widest uppercase hover:bg-[#1a3821] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#38b04a]" />
                Join WhatsApp Member Broadcast
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleMemberSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="font-sans text-[11px] font-semibold text-[#d0c5af] uppercase tracking-wider block">
                Full Name *
              </label>
              <input
                value={memberForm.fullName}
                onChange={(e) => setMemberForm({ ...memberForm, fullName: e.target.value })}
                required
                placeholder="e.g. Fatima Zehra / Dr. Ananya Sharma"
                className="w-full bg-[#0e0e0f] border border-[#4d4635] px-4 py-3 text-[13px] text-[#e5e2e3] focus:border-[#f2ca50] focus:outline-none rounded"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-sans text-[11px] font-semibold text-[#d0c5af] uppercase tracking-wider block">
                Email Address *
              </label>
              <input
                type="email"
                value={memberForm.email}
                onChange={(e) => setMemberForm({ ...memberForm, email: e.target.value })}
                required
                placeholder="name@domain.com"
                className="w-full bg-[#0e0e0f] border border-[#4d4635] px-4 py-3 text-[13px] text-[#e5e2e3] focus:border-[#f2ca50] focus:outline-none rounded"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-sans text-[11px] font-semibold text-[#d0c5af] uppercase tracking-wider block">
                WhatsApp Phone Number *
              </label>
              <input
                value={memberForm.phone}
                onChange={(e) => setMemberForm({ ...memberForm, phone: e.target.value })}
                required
                placeholder="+91 98000 00000 / +971 50 000 0000"
                className="w-full bg-[#0e0e0f] border border-[#4d4635] px-4 py-3 text-[13px] text-[#e5e2e3] focus:border-[#f2ca50] focus:outline-none rounded"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-sans text-[11px] font-semibold text-[#d0c5af] uppercase tracking-wider block">
                City &amp; State / Country *
              </label>
              <input
                value={memberForm.cityState}
                onChange={(e) => setMemberForm({ ...memberForm, cityState: e.target.value })}
                required
                placeholder="e.g. Mumbai, Maharashtra / New Delhi / Dubai"
                className="w-full bg-[#0e0e0f] border border-[#4d4635] px-4 py-3 text-[13px] text-[#e5e2e3] focus:border-[#f2ca50] focus:outline-none rounded"
              />
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="font-sans text-[11px] font-semibold text-[#d0c5af] uppercase tracking-wider block">
                Membership Category / Role Desired *
              </label>
              <select
                value={memberForm.interest}
                onChange={(e) => setMemberForm({ ...memberForm, interest: e.target.value })}
                className="w-full bg-[#0e0e0f] border border-[#4d4635] px-4 py-3 text-[13px] text-[#e5e2e3] focus:border-[#f2ca50] focus:outline-none rounded"
              >
                <option value="General Member — All India Jamiatul Quresh Women Cell">General Member — All India Jamiatul Quresh Women Cell</option>
                <option value="State / District Volunteer Coordinator">State / District Volunteer Coordinator</option>
                <option value="Legal & Medical Advisory Panel">Legal &amp; Medical Advisory Panel</option>
                <option value="Micro-Enterprise Grant Applicant">Micro-Enterprise Grant Applicant</option>
                <option value="Executive Boardroom Governance Fellow">Executive Boardroom Governance Fellow</option>
              </select>
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="font-sans text-[11px] font-semibold text-[#d0c5af] uppercase tracking-wider block">
                Brief Background &amp; Motivation
              </label>
              <textarea
                value={memberForm.experience}
                onChange={(e) => setMemberForm({ ...memberForm, experience: e.target.value })}
                rows={3}
                placeholder="Tell us about your profession, community involvement, or how you would like to contribute..."
                className="w-full bg-[#0e0e0f] border border-[#4d4635] px-4 py-3 text-[13px] text-[#e5e2e3] focus:border-[#f2ca50] focus:outline-none rounded"
              />
            </div>

            <div className="md:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#4d4635]/40">
              <span className="text-[11px] text-[#99907c] uppercase tracking-wider">
                Official Certification Issued Upon Approval
              </span>
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#d4af37] via-[#f2ca50] to-[#e6bc48] text-[#1a1402] font-sans text-[11px] font-bold tracking-widest uppercase hover:from-[#ffe088] transition-all cursor-pointer rounded shadow-lg"
              >
                Submit Membership Application
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </section>
      </div>
    </div>
  );
};

export default WomenLeadershipScreen;

