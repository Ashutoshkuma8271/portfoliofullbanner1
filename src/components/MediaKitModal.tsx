import React, { useState } from 'react';
import { X, Download, FileText, Camera, Award, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface MediaKitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MediaKitModal: React.FC<MediaKitModalProps> = ({ isOpen, onClose }) => {
  const [downloadedItem, setDownloadedItem] = useState<string | null>(null);

  if (!isOpen) return null;

  const MEDIA_ASSETS = [
    {
      id: 'bio-pack',
      title: 'Executive Monograph & Official Biography',
      type: 'PDF Document (Apostille Verified)',
      size: '2.8 MB',
      description: 'Contains the approved short and long-form biographies, diplomatic credentials, and speaking engagement guidelines.',
    },
    {
      id: 'photo-pack',
      title: 'High-Resolution Portrait Suite (300 DPI)',
      type: 'Archive (PNG / TIFF / JPEG)',
      size: '48.5 MB',
      description: 'Studio chancery portraits and international delegation photographs pre-cleared for global print and digital press.',
    },
    {
      id: 'film-dossier',
      title: 'Filmography & Co-Production Press Book',
      type: 'PDF Presentation (Screening Kit)',
      size: '8.4 MB',
      description: 'Detailed synopses, festival laurels (Cannes, Venice), box-office credentials, and co-production treaty frameworks.',
    },
    {
      id: 'trade-factsheet',
      title: 'GCC–India Trade Corridor Briefing Note',
      type: 'PDF Whitepaper',
      size: '3.1 MB',
      description: 'Summary of bilateral CEPA mandates, inward FDI allocations, and official trade commissioner delegation protocols.',
    },
  ];

  const handleDownload = (item: typeof MEDIA_ASSETS[0]) => {
    setDownloadedItem(item.title);
    setTimeout(() => {
      setDownloadedItem(null);
    }, 3500);
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
            <Sparkles className="w-3 h-3" />
            Accredited Press Assets
          </div>
          <h2 className="font-serif text-[28px] sm:text-[34px] text-[#e5e2e3]">
            Official Press &amp; <span className="italic text-[#f2ca50]">Media Kit 2026</span>
          </h2>
          <p className="font-sans text-[14px] text-[#d0c5af] leading-relaxed">
            Approved editorial imagery, official monographs, and diplomatic accreditation dossiers for journalists, festival programmers, and summit organizers.
          </p>
        </div>

        {downloadedItem && (
          <div className="p-3 bg-[#122416] border border-[#2e5936] text-[#8ae899] text-[13px] rounded flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-[#38b04a]" />
            Asset Download Initialized: <span className="font-semibold">{downloadedItem}</span>
          </div>
        )}

        <div className="space-y-4">
          {MEDIA_ASSETS.map((asset) => (
            <div
              key={asset.id}
              className="p-5 bg-[#181718] border border-[#4d4635] hover:border-[#f2ca50]/70 rounded-xl flex flex-col sm:flex-row justify-between sm:items-center gap-4 transition-all"
            >
              <div className="space-y-1 max-w-lg">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#f2ca50]" />
                  <h4 className="font-serif text-[18px] text-[#e5e2e3]">{asset.title}</h4>
                </div>
                <p className="font-sans text-[13px] text-[#d0c5af] leading-relaxed">{asset.description}</p>
                <div className="flex items-center gap-3 text-[11px] font-mono text-[#99907c] pt-1">
                  <span>{asset.type}</span>
                  <span>•</span>
                  <span>{asset.size}</span>
                </div>
              </div>

              <button
                onClick={() => handleDownload(asset)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0e0e0f] border border-[#f2ca50] text-[#f2ca50] hover:bg-[#f2ca50] hover:text-[#1a1402] text-[11px] font-sans font-bold uppercase tracking-widest rounded cursor-pointer transition-all self-start sm:self-auto shrink-0 shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                Download Package
              </button>
            </div>
          ))}
        </div>

        <div className="p-4 bg-[#1c1b1c] border border-[#4d4635] rounded-xl flex items-center justify-between text-[12px] text-[#d0c5af]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#f2ca50]" />
            <span>Editorial License: Approved for accredited press &amp; broadcast usage.</span>
          </div>
          <button
            onClick={onClose}
            className="text-[#f2ca50] font-sans font-semibold uppercase tracking-wider hover:underline cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
