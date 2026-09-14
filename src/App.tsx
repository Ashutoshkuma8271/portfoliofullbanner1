/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { TabId } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingDirectDesk } from './components/FloatingDirectDesk';
import { ScrollProgressIndicator } from './components/ScrollProgressIndicator';
import { VipPortalModal } from './components/VipPortalModal';
import { CollaborateModal, CollaborateMode } from './components/CollaborateModal';
import { InvestorLeadModal } from './components/InvestorLeadModal';
import { MediaKitModal } from './components/MediaKitModal';
import { AdminCmsModal } from './components/AdminCmsModal';
import { GlobalLoadingOverlay } from './components/GlobalLoadingOverlay';
import { PageTransitionIndicator } from './components/PageTransitionIndicator';
import { ScreenLoadingFallback } from './components/ScreenLoadingFallback';

// Code-split route screens using React.lazy for optimized initial load performance
const HomeScreen = lazy(() => import('./screens/HomeScreen'));
const AboutScreen = lazy(() => import('./screens/AboutScreen'));
const TradeScreen = lazy(() => import('./screens/TradeScreen'));
const MediaPressScreen = lazy(() => import('./screens/MediaPressScreen'));
const WomenLeadershipScreen = lazy(() => import('./screens/WomenLeadershipScreen'));
const BlogScreen = lazy(() => import('./screens/BlogScreen'));
const ContactScreen = lazy(() => import('./screens/ContactScreen'));

const VALID_TABS: TabId[] = [
  'home',
  'about-zeenat',
  'trade-investment',
  'media-press',
  'women-leadership',
  'blog',
  'contact',
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [isCollaborateOpen, setIsCollaborateOpen] = useState(false);
  const [collaborateMode, setCollaborateMode] = useState<CollaborateMode>('collaborate');
  const [isVipPortalOpen, setIsVipPortalOpen] = useState(false);
  const [isInvestorLeadOpen, setIsInvestorLeadOpen] = useState(false);
  const [isMediaKitOpen, setIsMediaKitOpen] = useState(false);
  const [isAdminCmsOpen, setIsAdminCmsOpen] = useState(false);

  // Ref tracking current tab to prevent redundant state updates on hashchange
  const activeTabRef = useRef<TabId>(activeTab);
  activeTabRef.current = activeTab;

  // Synchronize browser history / URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.replace('#', '');
      if (rawHash === 'admin' || rawHash === 'cms') {
        setIsAdminCmsOpen(true);
        return;
      }
      const hash = rawHash as TabId;
      if (VALID_TABS.includes(hash) && hash !== activeTabRef.current) {
        setActiveTab(hash);
      }
    };

    // Check initial hash on mount
    const rawInitialHash = window.location.hash.replace('#', '');
    if (rawInitialHash === 'admin' || rawInitialHash === 'cms') {
      setIsAdminCmsOpen(true);
    } else {
      const initialHash = rawInitialHash as TabId;
      if (VALID_TABS.includes(initialHash) && initialHash !== activeTabRef.current) {
        setActiveTab(initialHash);
      }
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectTab = (tab: TabId) => {
    if (tab === activeTabRef.current) return;
    setActiveTab(tab);
    if (window.location.hash.replace('#', '') !== tab) {
      window.location.hash = tab;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCollaborate = (mode: CollaborateMode = 'collaborate') => {
    setCollaborateMode(mode);
    setIsCollaborateOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#131314] text-[#e5e2e3] flex flex-col font-sans selection:bg-[#d4af37] selection:text-[#131314] overflow-x-hidden">
      {/* Global Luxury Loading Spinner & Transition Overlay */}
      <GlobalLoadingOverlay />

      {/* Luxury Golden Laser Page Transition Indicator */}
      <PageTransitionIndicator activeTab={activeTab} />

      {/* Fixed Sticky Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenCollaborate={(mode) => handleOpenCollaborate(mode || 'collaborate')}
        onOpenVipPortal={() => setIsVipPortalOpen(true)}
      />

      {/* Main View Container - Smooth Page Transitions with Zero Gap */}
      <main
        key={activeTab}
        className="w-full pt-14 sm:pt-[64px] flex-1 flex flex-col relative animate-page-enter"
      >
        <Suspense fallback={<ScreenLoadingFallback />}>
          {activeTab === 'home' && (
            <HomeScreen
              onSelectTab={handleSelectTab}
              onOpenCollaborate={handleOpenCollaborate}
              onOpenVipPortal={() => setIsVipPortalOpen(true)}
            />
          )}
          {activeTab === 'about-zeenat' && (
            <AboutScreen onOpenCollaborate={() => handleOpenCollaborate('collaborate')} />
          )}
          {activeTab === 'trade-investment' && (
            <TradeScreen
              onOpenCollaborate={() => handleOpenCollaborate('investment')}
              onOpenInvestorLead={() => setIsInvestorLeadOpen(true)}
            />
          )}
          {activeTab === 'media-press' && (
            <MediaPressScreen
              onOpenMediaKit={() => setIsMediaKitOpen(true)}
            />
          )}
          {activeTab === 'women-leadership' && (
            <WomenLeadershipScreen onOpenCollaborate={() => handleOpenCollaborate('collaborate')} />
          )}
          {activeTab === 'blog' && (
            <BlogScreen
              onOpenCollaborate={() => handleOpenCollaborate('collaborate')}
            />
          )}
          {activeTab === 'contact' && (
            <ContactScreen />
          )}
        </Suspense>
      </main>

      {/* Floating Direct Desk / WhatsApp Hotline */}
      <FloatingDirectDesk />

      {/* Luxury Scroll Progress & Slide Indicator */}
      <ScrollProgressIndicator />

      {/* Footer */}
      <Footer
        onSelectTab={handleSelectTab}
        onOpenInvestorLead={() => setIsInvestorLeadOpen(true)}
        onOpenMediaKit={() => setIsMediaKitOpen(true)}
        onOpenCollaborate={() => handleOpenCollaborate('collaborate')}
        onOpenAdminCms={() => setIsAdminCmsOpen(true)}
      />

      {/* High-Level Institutional Modals */}
      <VipPortalModal
        isOpen={isVipPortalOpen}
        onClose={() => setIsVipPortalOpen(false)}
      />

      <CollaborateModal
        isOpen={isCollaborateOpen}
        initialMode={collaborateMode}
        onClose={() => setIsCollaborateOpen(false)}
      />

      <InvestorLeadModal
        isOpen={isInvestorLeadOpen}
        onClose={() => setIsInvestorLeadOpen(false)}
      />

      <MediaKitModal
        isOpen={isMediaKitOpen}
        onClose={() => setIsMediaKitOpen(false)}
      />

      {/* Sovereign Executive Admin CMS & Governance Console */}
      <AdminCmsModal
        isOpen={isAdminCmsOpen}
        onClose={() => {
          setIsAdminCmsOpen(false);
          if (window.location.hash === '#admin' || window.location.hash === '#cms') {
            window.location.hash = activeTab;
          }
        }}
      />
    </div>
  );
}
