import React from 'react';
import { Plus, Building2, ShieldCheck, ArrowRightLeft } from 'lucide-react';

interface NavbarProps {
  activeTab: 'marketplace' | 'symbiosis' | 'quality' | 'carbon' | 'deals';
  setActiveTab: (tab: 'marketplace' | 'symbiosis' | 'quality' | 'carbon' | 'deals') => void;
  onOpenPostModal: () => void;
  userRole: 'generator' | 'consumer';
  setUserRole: (role: 'generator' | 'consumer') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenPostModal,
  userRole,
  setUserRole,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setActiveTab('marketplace')}
          className="text-left text-xl font-bold tracking-tight text-white hover:text-emerald-400 transition-colors focus:outline-none"
        >
          CirculaRaw
        </button>

        {/* Zone 2: 4-5 clean text navigation links with active state indicator */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <button
            onClick={() => setActiveTab('marketplace')}
            className={`transition-colors pb-0.5 border-b-2 ${
              activeTab === 'marketplace'
                ? 'text-white border-emerald-400 font-semibold'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            Secondary Raw Materials
          </button>
          <button
            onClick={() => setActiveTab('symbiosis')}
            className={`transition-colors pb-0.5 border-b-2 ${
              activeTab === 'symbiosis'
                ? 'text-white border-emerald-400 font-semibold'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            Symbiosis Matchmaker
          </button>
          <button
            onClick={() => setActiveTab('quality')}
            className={`transition-colors pb-0.5 border-b-2 ${
              activeTab === 'quality'
                ? 'text-white border-emerald-400 font-semibold'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            Lab Quality & Credentials
          </button>
          <button
            onClick={() => setActiveTab('carbon')}
            className={`transition-colors pb-0.5 border-b-2 ${
              activeTab === 'carbon'
                ? 'text-white border-emerald-400 font-semibold'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            Scope 3 Calculator
          </button>
          <button
            onClick={() => setActiveTab('deals')}
            className={`transition-colors pb-0.5 border-b-2 ${
              activeTab === 'deals'
                ? 'text-white border-emerald-400 font-semibold'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            Deals & Sample Lab
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {/* Role switcher toggle */}
          <div className="hidden lg:flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs text-slate-300">
            <button
              onClick={() => setUserRole('consumer')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                userRole === 'consumer'
                  ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Consumer Mode
            </button>
            <button
              onClick={() => setUserRole('generator')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                userRole === 'generator'
                  ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Generator Mode
            </button>
          </div>

          <button
            onClick={onOpenPostModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap shadow-sm shadow-emerald-950"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            List Waste Stream
          </button>
        </div>
      </div>

      {/* Mobile nav bar row */}
      <div className="md:hidden flex items-center justify-between border-t border-slate-800/80 px-4 py-2 bg-slate-950 text-xs overflow-x-auto gap-4">
        <button
          onClick={() => setActiveTab('marketplace')}
          className={`whitespace-nowrap py-1 ${activeTab === 'marketplace' ? 'text-emerald-400 font-medium' : 'text-slate-400'}`}
        >
          Marketplace
        </button>
        <button
          onClick={() => setActiveTab('symbiosis')}
          className={`whitespace-nowrap py-1 ${activeTab === 'symbiosis' ? 'text-emerald-400 font-medium' : 'text-slate-400'}`}
        >
          Symbiosis
        </button>
        <button
          onClick={() => setActiveTab('quality')}
          className={`whitespace-nowrap py-1 ${activeTab === 'quality' ? 'text-emerald-400 font-medium' : 'text-slate-400'}`}
        >
          Lab Audits
        </button>
        <button
          onClick={() => setActiveTab('carbon')}
          className={`whitespace-nowrap py-1 ${activeTab === 'carbon' ? 'text-emerald-400 font-medium' : 'text-slate-400'}`}
        >
          Scope 3
        </button>
        <button
          onClick={() => setActiveTab('deals')}
          className={`whitespace-nowrap py-1 ${activeTab === 'deals' ? 'text-emerald-400 font-medium' : 'text-slate-400'}`}
        >
          Deals
        </button>
      </div>
    </header>
  );
};
