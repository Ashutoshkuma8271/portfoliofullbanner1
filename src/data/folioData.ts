import { Pillar, FilmProject, TradeInitiative, LeadershipInitiative, PressItem, BlogPost } from '../types';

export const PILLARS: Pillar[] = [
  {
    id: 'trade',
    pillarNumber: 'Bilateral Commerce',
    vertical: 'Trade',
    category: 'Sovereign Markets',
    iconName: 'account_balance',
    title: 'Trade — GCC–India Bilateral Corridors & Commerce',
    description: 'Navigating sovereign trade ecosystems across the United Arab Emirates, Saudi Arabia, Qatar, and the Republic of India under CEPA frameworks. Architecting high-level market entries, ministerial trade delegations, and cross-border commercial pacts.',
    bullets: [
      'Sovereign Free Zone & Inward FDI Conduits',
      'Ministerial & Diplomatic Bilateral Trade Missions',
      'Cross-Border Regulatory Harmonization & Tariffs',
    ],
    linkText: 'Explore Trade Portfolio',
    targetTab: 'trade-investment',
    accentColor: '#f2ca50',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1000&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'media',
    pillarNumber: 'Cinematic Arts',
    vertical: 'Media',
    category: 'Transnational Screens',
    iconName: 'movie_filter',
    title: 'Media — Cinematic Production & Global Screens',
    description: 'Developing and curating high-concept cinematic IP that marries commercial viability with profound socio-cultural narratives. Leveraging international co-production treaties, premier festival trajectories (Cannes, Venice), and multi-territory distribution syndicates.',
    bullets: [
      'International Co-Productions & State Tax Rebates',
      'Multi-Territory Theatrical & Global OTT Pipelines',
      'Transnational Talent Attachment & IP Development',
    ],
    linkText: 'Explore Filmography & Press',
    targetTab: 'media-press',
    accentColor: '#e9c176',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1000&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'women-leadership',
    pillarNumber: 'Civic Mandate',
    vertical: 'Women Leadership',
    category: 'Institutional Parity',
    iconName: 'groups',
    title: 'Women Leadership — Socioeconomic Equity & Parity',
    description: "Serving as National President to mobilize grassroots enterprise, seed grants, and boardroom parity. Championing public policy advocacy, corporate diversity charters, and sovereign mentorship conclaves elevating 120,000+ women leaders.",
    bullets: [
      'High-Impact Nationwide Skill & Enterprise Seed Grants',
      'Corporate Governance Diversity Charters & Advocacy',
      'Sovereign Women in Diplomacy Mentorship Conclaves',
    ],
    linkText: 'Explore Leadership Action',
    targetTab: 'women-leadership',
    accentColor: '#ffdea5',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'investment-advisory',
    pillarNumber: 'Sovereign Capital',
    vertical: 'Investment Advisory',
    category: 'Strategic Wealth',
    iconName: 'monetization_on',
    title: 'Investment Advisory — Sovereign Wealth & FDI Allocation',
    description: 'Advising sovereign wealth entities, institutional syndicates, and family offices on capital allocation into strategic growth verticals, sustainable infrastructure, energy corridors, and cross-border creative industries.',
    bullets: [
      'Private Sovereign Wealth Syndication & Inward FDI',
      'Family Office Cross-Jurisdiction Co-Investments',
      'Emerging Corridor Risk Mitigation & Asset Structuring',
    ],
    linkText: 'Explore Investment Advisory',
    targetTab: 'trade-investment',
    accentColor: '#ffe088',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
  },
];

export const FILM_PROJECTS: FilmProject[] = [
  {
    id: 'film-1',
    title: 'Echoes of the Levant',
    year: '2025',
    genre: 'Historical Diplomatic Drama',
    role: 'Lead Producer & Executive Financier',
    synopsis: 'An epic geopolitical drama chronicling secret bilateral negotiations during the mid-20th century trade renaissance between the Gulf and the Indian Subcontinent.',
    accolades: 'Cannes Film Festival Official Selection (Marché du Film), Red Sea IFF Gala Premiere',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
    status: 'Distribution',
    territories: 'MENA, India, UK Theatrical & Global OTT',
  },
  {
    id: 'film-2',
    title: 'The Pearl Meridian',
    year: '2024',
    genre: 'Contemporary Sovereign Thriller',
    role: 'Executive Producer',
    synopsis: 'A high-stakes thriller exploring maritime energy corridors and cyber sovereignty across the Strait of Hormuz and Mumbai financial districts.',
    accolades: 'Venice Production Bridge Spotlight, Winner Best International Co-Production (Abu Dhabi)',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80',
    status: 'Released',
    territories: '38 Countries Theatrical & Worldwide Prime Video',
  },
  {
    id: 'film-3',
    title: 'Sovereign Voices',
    year: '2026',
    genre: 'Sociopolitical Docuseries (4 Parts)',
    role: 'Creator & Executive Producer',
    synopsis: 'Examining the trailblazing female envoys, industrial ministers, and cultural matriarchs who architected modern trade alliances across 12 countries.',
    accolades: 'Commissioned in Partnership with International Bilateral Cultural Councils',
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=80',
    status: 'In Production',
    territories: 'Global Broadcast & Educational Distribution',
  },
  {
    id: 'film-4',
    title: 'Noor: Crown of the Desert',
    year: '2023',
    genre: 'Biographical Drama',
    role: 'Co-Producer',
    synopsis: 'The inspiring chronicle of a female desert surveyor who revolutionized clean water infrastructure across arid plateaus.',
    accolades: 'Winner National Film Award, Toronto International Film Festival Special Presentation',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    status: 'Released',
    territories: 'Global Theatrical & Streaming',
  },
];

export const TRADE_INITIATIVES: TradeInitiative[] = [
  {
    id: 'trade-1',
    title: 'GCC–India Bilateral FDI & Infrastructure Corridor',
    corridor: 'UAE – Saudi Arabia – India',
    allocation: '$280M+ Syndicated',
    mandate: 'Facilitating sovereign wealth and institutional family office capital flow into high-growth manufacturing zones, logistics hubs, and renewable energy grids.',
    status: 'Active Execution',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    badge: 'Sovereign Priority',
    highlights: [
      'Structured 5 multi-lateral bilateral delegations between New Delhi, Riyadh, and Abu Dhabi',
      'Harmonized cross-border compliance for non-resident sovereign investment vehicles',
      'Established fast-track customs clearance frameworks for precision technology imports',
    ],
  },
  {
    id: 'trade-2',
    title: 'Creative Economy & Media Production Treaties',
    corridor: 'Dubai Media City – Mumbai Film City – London',
    allocation: '$95M Production Pool',
    mandate: 'Uniting state film incentives, 30%+ cash rebates, and bilateral co-production pacts to establish sustainable cross-border cinema pipelines.',
    status: 'Treaty Active',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    badge: 'Cultural Statecraft',
    highlights: [
      'Pioneered the tripartite film financing protocol across UAE-India-UK',
      'Secured regulatory clearance for quad-territory intellectual property holding structures',
      'Facilitated location incentives and diplomatic clearance for 14 feature films',
    ],
  },
  {
    id: 'trade-3',
    title: 'Sovereign Free Zone Market Entry Conduit',
    corridor: 'DIFC / ADGM to GIFT City Gujarat',
    allocation: '$75M Enterprise Fund',
    mandate: 'Empowering emerging multi-national enterprises to establish dual headquarters with zero-friction capital repatriation.',
    status: 'Operational',
    image: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=1200&q=80',
    badge: 'Dual-HQ Framework',
    highlights: [
      'Direct facilitation of 42 high-growth enterprises entering GCC corridors',
      'Advisory partnership with municipal development councils and economic ministries',
      'Structured sovereign guarantees mitigating foreign exchange fluctuations',
    ],
  },
];

export const LEADERSHIP_INITIATIVES: LeadershipInitiative[] = [
  {
    id: 'lead-1',
    title: 'National Women Enterprise & Innovation Grants',
    reach: '120,000+ Women Entrepreneurs',
    impactMetric: '4,200 Seed Micro-Enterprises Funded',
    description: 'A nationwide grassroots capitalization platform offering non-dilutive seed capital, commercial mentorship, and institutional supplier linkages for female founders.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
    badge: 'Grassroots Impact',
    pillars: [
      'Financial independence & micro-lending literacy',
      'Cross-border digital export training',
      'Government procurement vendor accreditation',
    ],
  },
  {
    id: 'lead-2',
    title: 'Boardroom Parity & Corporate Governance Charter',
    reach: '260+ Enterprise Signatories',
    impactMetric: '34% Increase in Board Appointments',
    description: 'An executive pact uniting Fortune 500 conglomerates, state-owned enterprises, and family offices to commit to audited gender parity on executive boards.',
    image: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=1200&q=80',
    badge: 'Executive Governance',
    pillars: [
      'Confidential executive talent clearinghouse',
      'Sovereign director certification modules',
      'Annual transparency and accountability gazettes',
    ],
  },
  {
    id: 'lead-3',
    title: 'Sovereign Mentorship Conclaves (GCC–South Asia)',
    reach: '18 Sovereign Delegations',
    impactMetric: '1,500 Executive Mentees',
    description: 'High-level diplomatic summits convening female cabinet ministers, ambassadors, corporate chiefs, and civic advocates to craft actionable policy legislation.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    badge: 'Bilateral Diplomacy',
    pillars: [
      'Direct policy advocacy with state ministries',
      'Cross-regional fellowship exchanges',
      'Youth civic leadership pipeline creation',
    ],
  },
];

export const PRESS_ITEMS: PressItem[] = [
  {
    id: 'press-1',
    publication: 'Bloomberg Markets',
    headline: 'Zeenat Kureshi on the $500M Bilateral Corridor Reshaping GCC-India Investment',
    date: 'February 2026',
    category: 'Diplomatic Trade',
    excerpt: 'In an exclusive diplomatic interview from Dubai, Trade Commissioner Zeenat Kureshi breaks down the strategic roadmap connecting institutional capital to India’s green energy hubs.',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1000&q=80',
    link: '#',
  },
  {
    id: 'press-2',
    publication: 'Variety',
    headline: 'How Producer Zeenat Kureshi Is Bridging Bollywood and Gulf Cinema via Landmark Co-Production Treaties',
    date: 'January 2026',
    category: 'Film & Media',
    excerpt: 'Examining the seismic shift in cinematic financing as Zeenat Kureshi merges sovereign state rebates with transnational box-office viability.',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1000&q=80',
    link: '#',
  },
  {
    id: 'press-3',
    publication: 'Forbes Middle East',
    headline: 'Top 50 Sovereign Leaders: Architecting Transnational Economic Architecture',
    date: 'November 2025',
    category: 'Leadership & Honor',
    excerpt: 'Recognized for relentless advocacy across sovereign trade missions, civic empowerment, and transformative arts stewardship.',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
    link: '#',
  },
  {
    id: 'press-4',
    publication: 'Khaleej Times',
    headline: 'Women in Governance: National President Zeenat Kureshi Mobilizes 120,000 Leaders',
    date: 'September 2025',
    category: 'Civic Mandate',
    excerpt: 'A comprehensive review of the nationwide enterprise grants and policy reforms instituted under her tenure.',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80',
    link: '#',
  },
  {
    id: 'press-5',
    publication: 'Financial Times',
    headline: 'India–UAE CEPA: The Next Frontier of Cross-Border Creative Economy & FDI',
    date: 'July 2025',
    category: 'Economic Architecture',
    excerpt: 'Analysis of how bilateral tariff reductions and media corridors spearheaded by the Trade Commission are accelerating non-oil commerce.',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80',
    link: '#',
  },
  {
    id: 'press-6',
    publication: 'Gulf News',
    headline: 'Red Sea Film Festival Gala Honors Transnational Producers Uniting Middle East & Asia',
    date: 'May 2025',
    category: 'Filmography & Accolades',
    excerpt: 'Lead Producer Zeenat Kureshi presented with the Sovereign Cinematic Bridge honor for landmark co-productions.',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80',
    link: '#',
  },
];

export const TIMELINE_EVENTS = [
  {
    year: '2024 – Present',
    title: 'Trade Commissioner & Diplomatic Envoy',
    entity: 'GCC–India Bilateral Economic Chambers',
    description: 'Appointed to oversee sovereign investment dialogues, diplomatic bilateral summits, and cross-border regulatory harmonization.',
  },
  {
    year: '2022 – Present',
    title: 'National President & Civic Envoy',
    entity: 'National Council for Women Empowerment & Socioeconomic Equity',
    description: 'Leading nationwide public advocacy, enterprise grant distributions, and corporate governance diversity mandates impacting over 120,000 citizens.',
  },
  {
    year: '2019 – Present',
    title: 'Founder & Principal Producer',
    entity: 'Kureshi Sovereign Media & Productions',
    description: 'Financing and producing 14+ cinematic projects premiering at tier-1 international festivals including Cannes, Venice, and Toronto.',
  },
  {
    year: '2016 – 2019',
    title: 'Senior Strategic Advisor',
    entity: 'Middle East Cross-Border Investment Syndicate',
    description: 'Advised sovereign wealth entities and family offices on emerging-market portfolio allocation and infrastructure syndicate design.',
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Unlocking the $100B GCC–India CEPA Corridor: Sovereign Capital, Free Zones & Bilateral Corridors',
    slug: 'gcc-india-cepa-corridor-sovereign-capital',
    excerpt: 'How the Comprehensive Economic Partnership Agreement is transforming institutional capital allocation between the Gulf and South Asia, opening unprecedented opportunities in industrial corridors.',
    content: `The geopolitical convergence between the Gulf Cooperation Council (GCC) member nations and the Republic of India represents one of the most lucrative and strategically fortified economic corridors of the 21st century.

With bilateral trade targets tracking past the $100 Billion mark under the UAE-India CEPA framework, institutional investors, sovereign wealth funds, and multi-national corporations are shifting from transactional commodity trading to deep, structured capital deployment.

Key strategic imperatives underpinning this transformation include:
1. Sovereign Free Zone Harmonization: Dual-headquartering frameworks linking the Dubai International Financial Centre (DIFC) and Abu Dhabi Global Market (ADGM) with GIFT City Gujarat.
2. Inward FDI Protection Treaties: Bilateral investment treaties ensuring capital repatriation security and dispute resolution certainty.
3. Logistics & Clean Energy Infrastructure: Joint syndicates fueling green hydrogen, solar parks, and automated multimodal freight ports across Western India and the Arabian Peninsula.

As Trade Commissioner, our mandate is providing sovereign-level clearance and regulatory fast-tracking for high-impact capital syndicates.`,
    category: 'Trade & FDI',
    date: 'February 2026',
    readTime: '6 min read',
    author: 'Zeenat Kureshi',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    tags: ['CEPA', 'GCC Trade', 'Bilateral FDI', 'DIFC', 'Sovereign Wealth'],
    views: 3420,
  },
  {
    id: 'blog-2',
    title: 'Financing Transnational Cinema: How Co-Production Treaties Bridge Cannes, Bollywood & Middle Eastern Funds',
    slug: 'financing-transnational-cinema-co-productions',
    excerpt: 'An insider analysis on structuring multi-territory film finance, state cash rebates, and worldwide festival distribution for high-concept cinema.',
    content: `Global storytelling has surpassed the boundaries of singular domestic box offices. Today, the most commercially durable and critically lauded cinematic projects are engineered at the intersection of international co-production treaties.

By marrying European soft-money grants (such as the CNC in France and Eurimages), Middle Eastern production funds (such as the Red Sea Film Fund and Abu Dhabi Film Commission 30% rebates), and Indian creative talent, producers can de-risk up to 45% of principal photography costs prior to day one of filming.

In this monograph, Zeenat Kureshi details the financial mechanics of structuring quad-territory IP rights, managing multi-currency cash flow, and securing pre-sales across the European Film Market (EFM) in Berlin and Marché du Film at Cannes.`,
    category: 'Cinema & Media',
    date: 'January 2026',
    readTime: '8 min read',
    author: 'Zeenat Kureshi',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
    tags: ['Film Finance', 'Cannes', 'Co-Production Treaties', 'Cinema IP', 'Box Office'],
    views: 2840,
  },
  {
    id: 'blog-3',
    title: 'All India Jamiatul Quresh Women Cell: Mobilizing 120,000 Female Entrepreneurs through Direct Micro-Capital',
    slug: 'all-india-jamiatul-quresh-women-cell-mobilization',
    excerpt: 'The transformative methodology behind grassroots enterprise seed grants, legal aid desks, and financial autonomy across tier-1 and tier-2 states.',
    content: `True civic empowerment is rooted in economic self-reliance. As National President of the All India Jamiatul Quresh Women Cell, our constitutional mandate is turning generational barriers into institutional launchpads.

Through targeted micro-enterprise seed capital, over 4,200 women-led businesses have been established in the last three years alone—ranging from food-processing cooperatives to high-tech digital export services.

Our three-pillar blueprint includes:
• Zero-Collateral Micro-Grants: Direct capital transfers enabling micro-entrepreneurs to bypass exploitative private lending.
• Digital Banking & UPI Literacy: Onboarding women to sovereign fintech tools and digital bookkeeping.
• Pro Bono Legal & Medical Desks: Providing institutional advocacy that protects family rights and commercial contracts.`,
    category: 'Women Leadership',
    date: 'December 2025',
    readTime: '5 min read',
    author: 'Zeenat Kureshi',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
    tags: ['Women Leadership', 'Micro Grants', 'Social Impact', 'Civic Governance'],
    views: 4190,
  },
  {
    id: 'blog-4',
    title: 'Sovereign Wealth Funds & Inward FDI in 2026: Investment Opportunities in South Asia',
    slug: 'sovereign-wealth-funds-inward-fdi-south-asia',
    excerpt: 'Navigating institutional family office syndications, tax-optimized SPVs, and regulatory approvals for mega-projects in renewable energy and tech infrastructure.',
    content: `Institutional capital from Abu Dhabi (ADIA, Mubadala), Riyadh (PIF), and Doha (QIA) is seeking non-speculative, inflation-resilient assets across the Indian subcontinent.

The emerging investment horizon focuses heavily on:
1. Critical infrastructure and data center corridors
2. Semiconductor manufacturing and renewable energy grids
3. Global media IP and entertainment technology clusters

Structuring these bilateral syndicates requires deep diplomatic coordination between sovereign chanceries, tax authorities, and institutional co-investors to optimize yields and ensure long-term regulatory stability.`,
    category: 'Investment Advisory',
    date: 'November 2025',
    readTime: '7 min read',
    author: 'Zeenat Kureshi',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    tags: ['FDI', 'Sovereign Wealth', 'Family Offices', 'Investment Banking'],
    views: 3120,
  },
];

