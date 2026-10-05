import React, { useState } from 'react';
import { ScrapListing, SymbiosisPair } from '../types/exchange';
import { ArrowRightLeft, Sparkles, Building2, TrendingDown, ArrowRight, ShieldCheck, Factory, Layers } from 'lucide-react';

interface SymbiosisMatrixProps {
  symbiosisPairs: SymbiosisPair[];
  listings: ScrapListing[];
  onSelectListing: (listing: ScrapListing) => void;
}

export const SymbiosisMatrix: React.FC<SymbiosisMatrixProps> = ({
  symbiosisPairs,
  listings,
  onSelectListing,
}) => {
  const [matchMode, setMatchMode] = useState<'consumer' | 'generator'>('consumer');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('Green Cement & Concrete');
  const [selectedByproduct, setSelectedByproduct] = useState<string>('Electric Arc Furnace Slag');

  const consumerIndustries = [
    'Green Cement & Concrete',
    'Automotive Coatings & Industrial Degreasing',
    'Additive Manufacturing & Secondary Melting',
    'Wood Engineered Panels & Bio-Adhesives',
    'Roadway Infrastructure & Asphalt Paving',
    'Injection Molded Thermoplastics'
  ];

  const generatorByproducts = [
    'Electric Arc Furnace Slag',
    'High-Purity Recovered Solvents (IPA/Acetone)',
    'Titanium & Nickel Superalloy Swarf/Turnings',
    'Precipitated Kraft Lignin',
    'Spent Silica Sand (Thermal Reclaimed)',
    'Uncured Dry Carbon Fiber Offcuts'
  ];

  // Active match
  const activePair = symbiosisPairs.find(p => 
    matchMode === 'consumer' ? p.targetIndustry === selectedIndustry : p.byproductName === selectedByproduct
  ) || symbiosisPairs[0];

  // Find relevant listings for this symbiosis match
  const matchedListings = listings.filter(l => 
    l.title.toLowerCase().includes(activePair.byproductName.toLowerCase().split(' ')[0]) ||
    l.targetDownstreamIndustries.some(ind => ind.toLowerCase().includes(activePair.targetIndustry.toLowerCase().split(' ')[0]))
  );

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold uppercase tracking-wider mb-1">
          <ArrowRightLeft className="w-4 h-4" />
          <span>Industrial Symbiosis Engine</span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Cross-Sector Byproduct Matchmaking
        </h2>
        <p className="text-sm text-slate-400 max-w-3xl mt-1">
          Connect one industry’s production residue directly to another facility’s primary raw material specification. 
          Cut virgin material extraction costs by 30–60% and reduce Scope 3 embodied greenhouse gases by up to 93%.
        </p>
      </div>

      {/* Matchmaker Interactive Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Sector Input Selection */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-5">
          {/* Segmented Mode Selector */}
          <div className="flex items-center p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs font-medium">
            <button
              onClick={() => setMatchMode('consumer')}
              className={`flex-1 py-2 text-center rounded-md transition-colors ${
                matchMode === 'consumer'
                  ? 'bg-slate-800 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              I am a Raw Material Consumer
            </button>
            <button
              onClick={() => setMatchMode('generator')}
              className={`flex-1 py-2 text-center rounded-md transition-colors ${
                matchMode === 'generator'
                  ? 'bg-slate-800 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              I am an Industrial Generator
            </button>
          </div>

          {matchMode === 'consumer' ? (
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-300">
                Select Your Manufacturing Sector / Feedstock Demand:
              </label>
              <div className="space-y-2">
                {consumerIndustries.map((ind) => (
                  <button
                    key={ind}
                    onClick={() => setSelectedIndustry(ind)}
                    className={`w-full text-left p-3 rounded-lg border text-xs transition-all flex items-center justify-between ${
                      selectedIndustry === ind
                        ? 'bg-emerald-950/40 border-emerald-500/60 text-white font-medium'
                        : 'bg-slate-950/40 border-slate-800/80 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="truncate">{ind}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-300">
                Select Your Plant’s Waste / Byproduct Stream:
              </label>
              <div className="space-y-2">
                {generatorByproducts.map((bp) => (
                  <button
                    key={bp}
                    onClick={() => setSelectedByproduct(bp)}
                    className={`w-full text-left p-3 rounded-lg border text-xs transition-all flex items-center justify-between ${
                      selectedByproduct === bp
                        ? 'bg-emerald-950/40 border-emerald-500/60 text-white font-medium'
                        : 'bg-slate-950/40 border-slate-800/80 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="truncate">{bp}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Symbiosis Link Diagnostics & Live Matching */}
        <div className="lg:col-span-7 space-y-5">
          {/* Symbiosis Link Hero Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="text-xs text-slate-400">
                Industrial Link: <span className="text-emerald-400 font-semibold">{activePair.sourceIndustry}</span> → <span className="text-white font-semibold">{activePair.targetIndustry}</span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
                {activePair.readinessLevel}
              </span>
            </div>

            {/* Visual Stream Flow Representation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center bg-slate-950/60 p-4 rounded-lg border border-slate-800 mb-5">
              <div className="p-3 bg-slate-900 rounded border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Upstream Waste Stream</span>
                <span className="text-xs font-semibold text-white mt-1 block">
                  {activePair.byproductName}
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">{activePair.sourceIndustry}</span>
              </div>

              <div className="flex flex-col items-center justify-center text-center px-2">
                <ArrowRightLeft className="w-5 h-5 text-emerald-400 mb-1" />
                <span className="text-[11px] text-slate-400 font-mono">1:1 Raw Material Loop</span>
              </div>

              <div className="p-3 bg-slate-900 rounded border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Downstream Secondary Use</span>
                <span className="text-xs font-semibold text-white mt-1 block">
                  {activePair.targetIndustry}
                </span>
                <span className="text-[11px] text-emerald-400 block mt-0.5">Displaces Virgin Feedstock</span>
              </div>
            </div>

            {/* Industrial Application Note */}
            <div className="text-xs text-slate-300 mb-5">
              <span className="font-semibold text-white block mb-1">Standardized Engineering Application:</span>
              <p className="bg-slate-950/40 p-3 rounded border border-slate-800/80 leading-relaxed">
                {activePair.application}
              </p>
            </div>

            {/* Key Economic & Carbon Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-800">
              <div className="p-3 bg-slate-950/50 rounded border border-slate-800/60">
                <span className="text-[11px] text-slate-400 block">Scope 3 GHG Reduction</span>
                <span className="text-xl font-bold text-emerald-400 font-mono tabular-nums">
                  -{activePair.ghgReductionPercent}%
                </span>
                <span className="text-[11px] text-slate-500 block">vs virgin clinker/metals</span>
              </div>

              <div className="p-3 bg-slate-950/50 rounded border border-slate-800/60">
                <span className="text-[11px] text-slate-400 block">Procurement Cost Savings</span>
                <span className="text-xl font-bold text-white font-mono tabular-nums">
                  ~{activePair.costSavingsPercent}%
                </span>
                <span className="text-[11px] text-slate-500 block">per metric ton</span>
              </div>

              <div className="p-3 bg-slate-950/50 rounded border border-slate-800/60 col-span-2 sm:col-span-1">
                <span className="text-[11px] text-slate-400 block">Available Listings</span>
                <span className="text-xl font-bold text-white font-mono tabular-nums">
                  {matchedListings.length} Active Lots
                </span>
                <span className="text-[11px] text-emerald-400 block">Verified on CirculaRaw</span>
              </div>
            </div>
          </div>

          {/* Active Available Batches Matching this Symbiosis Route */}
          <div>
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center justify-between">
              <span>Ready-To-Trade Stream Lots for this Symbiosis Route</span>
              <span className="text-slate-500 font-normal">Click to inspect technical assays</span>
            </h3>

            {matchedListings.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 text-center text-xs text-slate-400">
                No active listings currently matching this exact route. 
                Generators are invited to publish byproduct lots via the "+ List Waste Stream" button.
              </div>
            ) : (
              <div className="space-y-2.5">
                {matchedListings.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onSelectListing(item)}
                    className="p-3.5 bg-slate-900 border border-slate-800 hover:border-emerald-500/60 rounded-lg cursor-pointer transition-colors flex items-center justify-between gap-3 group"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-1">
                        <span className="font-mono text-emerald-400">{item.wasteCode}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.generator.name}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-slate-300">{item.generator.facilityLocation}</span>
                      </div>
                      <h4 className="text-xs font-semibold text-white group-hover:text-emerald-400 transition-colors">
                        {item.title}
                      </h4>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono font-semibold text-white block tabular-nums">
                        {item.currency} {item.pricePerMT} / MT
                      </span>
                      <span className="text-[11px] text-emerald-400 font-mono tabular-nums block">
                        {item.monthlyVolumeMT} MT/mo
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cross-Sector Industrial Symbiosis Catalog Table */}
      <div className="mt-12 border-t border-slate-800 pt-8">
        <h3 className="text-base font-bold text-white tracking-tight mb-1">
          Accredited Industrial Symbiosis Reference Index
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          All symbiosis pairs follow ISO 14044 Life Cycle Assessment guidelines and meet circular feedstock standards.
        </p>

        <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800 font-medium">
              <tr>
                <th className="py-3 px-4">Origin Industry Waste Stream</th>
                <th className="py-3 px-4">Destination Industry & Application</th>
                <th className="py-3 px-4 text-center">GHG Reduction</th>
                <th className="py-3 px-4 text-center">Avg Cost Savings</th>
                <th className="py-3 px-4 text-right">Readiness Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {symbiosisPairs.map((pair) => (
                <tr key={pair.id} className="hover:bg-slate-800/30">
                  <td className="py-3 px-4">
                    <span className="font-semibold text-white block">{pair.byproductName}</span>
                    <span className="text-slate-400 text-[11px]">{pair.sourceIndustry}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-slate-200 block font-medium">{pair.targetIndustry}</span>
                    <span className="text-slate-400 text-[11px] line-clamp-1">{pair.application}</span>
                  </td>
                  <td className="py-3 px-4 text-center font-mono text-emerald-400 font-semibold tabular-nums">
                    -{pair.ghgReductionPercent}%
                  </td>
                  <td className="py-3 px-4 text-center font-mono text-white font-semibold tabular-nums">
                    ~{pair.costSavingsPercent}%
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-[11px] font-mono text-slate-300 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                      {pair.readinessLevel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
