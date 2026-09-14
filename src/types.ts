export type TabId =
  | 'home'
  | 'about-zeenat'
  | 'trade-investment'
  | 'media-press'
  | 'women-leadership'
  | 'blog'
  | 'contact';

export type HomepageMockupId = 'sovereign-classic' | 'cinematic-noir' | 'minimal-atelier';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'Trade & FDI' | 'Cinema & Media' | 'Women Leadership' | 'Investment Advisory';
  date: string;
  readTime: string;
  author: string;
  image: string;
  tags: string[];
  views: number;
}

export interface Pillar {
  id: string;
  pillarNumber: string;
  category: string;
  vertical: string;
  iconName: string;
  title: string;
  description: string;
  bullets: string[];
  linkText: string;
  targetTab: TabId;
  accentColor: string;
  image?: string;
  fallbackImage?: string;
}

export interface FilmProject {
  id: string;
  title: string;
  year: string;
  genre: string;
  role: string;
  synopsis: string;
  accolades: string;
  image: string;
  status: 'Released' | 'In Production' | 'Distribution';
  territories: string;
}

export interface TradeInitiative {
  id: string;
  title: string;
  corridor: string;
  allocation: string;
  mandate: string;
  status: string;
  highlights: string[];
  image?: string;
  badge?: string;
}

export interface LeadershipInitiative {
  id: string;
  title: string;
  reach: string;
  impactMetric: string;
  description: string;
  pillars: string[];
  image?: string;
  badge?: string;
}

export interface PressItem {
  id: string;
  publication: string;
  headline: string;
  date: string;
  category: string;
  excerpt: string;
  readTime: string;
  image?: string;
  link?: string;
}

export interface DispatchSubmission {
  id: string;
  fullName: string;
  email: string;
  mandate: string;
  jurisdiction: string;
  message: string;
  timestamp: string;
  protocolId: string;
}
