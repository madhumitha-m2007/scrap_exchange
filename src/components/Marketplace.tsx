import React, { useState, useMemo } from 'react';
import { ScrapListing, IndustryCategory, MaterialForm } from '../types/exchange';
import { MaterialCard } from './MaterialCard';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  ShieldCheck, 
  Leaf, 
  Factory, 
  ArrowUpDown, 
  SlidersHorizontal,
  RefreshCw,
  Layers
} from 'lucide-react';

interface MarketplaceProps {
  listings: ScrapListing[];
  onSelectListing: (listing: ScrapListing) => void;
  onRequestSample: (listing: ScrapListing) => void;
  comparedListings: ScrapListing[];
  onToggleCompare: (listing: ScrapListing) => void;
  onOpenPostModal: () => void;
}

export const Marketplace: React.FC<MarketplaceProps> = ({
  listings,
  onSelectListing,
  onRequestSample,
  comparedListings,
  onToggleCompare,
  onOpenPostModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedForm, setSelectedForm] = useState<string>('All');
  const [minPurity, setMinPurity] = useState<number>(90);
  const [sortBy, setSortBy] = useState<'volume' | 'priceAsc' | 'priceDesc' | 'purity' | 'carbon'>('volume');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [verifiedLabOnly, setVerifiedLabOnly] = useState<boolean>(false);

  const categories: { label: string; value: string }[] = [
    { label: 'All Secondary Streams', value: 'All' },
    { label: 'Mineral & Construction', value: 'Mineral & Construction' },
    { label: 'Metallurgy & Alloys', value: 'Metallurgy' },
    { label: 'Chemicals & Solvents', value: 'Chemical & Solvents' },
    { label: 'Polymers & Composites', value: 'Polymers & Composites' },
    { label: 'Bio-Agri Residuals', value: 'Bio-Agri Residuals' },
  ];

  // Aggregated platform stats
  const totalVolumeMT = useMemo(() => {
    return listings.reduce((acc, l) => acc + l.monthlyVolumeMT, 0);
  }, [listings]);

  const totalCarbonAvoidedMT = useMemo(() => {
    return listings.reduce((acc, l) => acc + (l.monthlyVolumeMT * l.sustainabilityCredentials.emissionsAvoidedPerMT) / 1000, 0);
  }, [listings]);

  // Filter & Sort logic
  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      // Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      // Form filter
      if (selectedForm !== 'All' && item.form !== selectedForm) {
        return false;
      }
      // Purity filter
      if (item.purityPercent < minPurity) {
        return false;
      }
      // Lab verified filter
      if (verifiedLabOnly && !item.labVerification.verified) {
        return false;
      }
      // Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesCode = item.wasteCode.toLowerCase().includes(q);
        const matchesGenerator = item.generator.name.toLowerCase().includes(q);
        const matchesCountry = item.generator.country.toLowerCase().includes(q);
        const matchesApplication = item.targetDownstreamIndustries.some((ind) =>
          ind.toLowerCase().includes(q)
        );
        if (!matchesTitle && !matchesCode && !matchesGenerator && !matchesCountry && !matchesApplication) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'volume') return b.monthlyVolumeMT - a.monthlyVolumeMT;
      if (sortBy === 'priceAsc') return a.pricePerMT - b.pricePerMT;
      if (sortBy === 'priceDesc') return b.pricePerMT - a.pricePerMT;
      if (sortBy === 'purity') return b.purityPercent - a.purityPercent;
      if (sortBy === 'carbon') {
        return b.sustainabilityCredentials.emissionsAvoidedPerMT - a.sustainabilityCredentials.emissionsAvoidedPerMT;
      }
      return 0;
    });
  }, [listings, selectedCategory, selectedForm, minPurity, verifiedLabOnly, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedForm('All');
    setMinPurity(90);
    setVerifiedLabOnly(false);
  };

  return (
    <div className="space-y-8">
      {/* Hero Banner Section */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
        <div className="absolute inset-0">
          <img
            src="/src/assets/images/hero_industrial_symbiosis_1791194219706.jpg"
            alt="CirculaRaw Industrial Symbiosis Facility"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/40" />
        </div>

        <div className="relative px-6 py-10 sm:px-10 sm:py-12 max-w-4xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            <Factory className="w-4 h-4" />
            <span>Industrial Symbiosis & Circular Feedstock Exchange</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight text-balance">
            Where One Industry’s Waste Becomes Another’s Primary Raw Material
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Trade certified secondary mineral aggregates, high-grade metallurgical turnings, distilled chemical solvents, 
            and post-industrial polymers with SGS/TÜV accredited assays and digital Scope 3 passports.
          </p>

          {/* High-Integrity Platform Statistics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80">
            <div>
              <span className="text-[11px] text-slate-400 block">Monthly Active Volume</span>
              <span className="text-lg sm:text-xl font-bold text-white font-mono tabular-nums">
                {totalVolumeMT.toLocaleString()} MT
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">Scope 3 GHG Avoided</span>
              <span className="text-lg sm:text-xl font-bold text-emerald-400 font-mono tabular-nums">
                {Math.round(totalCarbonAvoidedMT).toLocaleString()} tCO₂e/mo
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">Accredited Testing Labs</span>
              <span className="text-lg sm:text-xl font-bold text-white font-mono tabular-nums">
                ISO 17025 Certified
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">Audit Pass Rate</span>
              <span className="text-lg sm:text-xl font-bold text-emerald-400 font-mono tabular-nums">
                99.4% Verified
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Control Bar */}
      <div className="space-y-4">
        {/* Interactive Segmented Category Filter (Functional buttons with active styling) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3.5 py-2 rounded-lg font-medium whitespace-nowrap transition-colors border ${
                selectedCategory === cat.value
                  ? 'bg-emerald-400 text-slate-950 border-emerald-400 font-semibold shadow-sm'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Detailed Controls Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center bg-slate-900 border border-slate-800 p-3 rounded-xl">
          {/* Live Search */}
          <div className="md:col-span-4 relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by material, EWC code, generator, or downstream use..."
              className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none placeholder:text-slate-500"
            />
          </div>

          {/* Form Filter */}
          <div className="md:col-span-2">
            <select
              value={selectedForm}
              onChange={(e) => setSelectedForm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-2 text-xs text-slate-300 focus:border-emerald-500 focus:outline-none"
            >
              <option value="All">All Forms</option>
              <option value="Granular Aggregate">Granular Aggregate</option>
              <option value="Pellets / Granules">Pellets / Granules</option>
              <option value="Liquid Bulk">Liquid Bulk</option>
              <option value="Shredded / Turnings">Shredded / Turnings</option>
              <option value="Baled Fibers">Baled Fibers</option>
            </select>
          </div>

          {/* Purity Slider */}
          <div className="md:col-span-3 flex items-center gap-2 px-2 text-xs">
            <span className="text-slate-400 shrink-0 text-[11px]">Min Purity:</span>
            <input
              type="range"
              min="85"
              max="99"
              value={minPurity}
              onChange={(e) => setMinPurity(Number(e.target.value))}
              className="w-full accent-emerald-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
            <span className="font-mono text-white text-[11px] w-9 tabular-nums">{minPurity}%</span>
          </div>

          {/* Sort By Dropdown */}
          <div className="md:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-2 text-xs text-slate-300 focus:border-emerald-500 focus:outline-none"
            >
              <option value="volume">Highest Monthly Volume</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
              <option value="purity">Highest Purity %</option>
              <option value="carbon">Highest Scope 3 Avoidance</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="md:col-span-1 flex items-center justify-end gap-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg border transition-colors ${
                viewMode === 'grid'
                  ? 'bg-slate-800 text-white border-slate-700'
                  : 'text-slate-400 hover:text-white border-transparent'
              }`}
              title="Grid Cards View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg border transition-colors ${
                viewMode === 'table'
                  ? 'bg-slate-800 text-white border-slate-700'
                  : 'text-slate-400 hover:text-white border-transparent'
              }`}
              title="Dense Spec Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Results Counter and Filter Reset */}
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <div className="flex items-center gap-2">
            <span>
              Showing <span className="text-white font-mono font-semibold">{filteredListings.length}</span> verified secondary material stream{filteredListings.length === 1 ? '' : 's'}
            </span>
            <span aria-hidden="true">·</span>
            <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={verifiedLabOnly}
                onChange={(e) => setVerifiedLabOnly(e.target.checked)}
                className="rounded border-slate-700 text-emerald-500 focus:ring-emerald-400"
              />
              <span className="text-slate-300">Third-Party Lab Tested Only</span>
            </label>
          </div>

          {(searchQuery || selectedCategory !== 'All' || selectedForm !== 'All' || minPurity > 90 || verifiedLabOnly) && (
            <button
              onClick={handleResetFilters}
              className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Material Display Area */}
      {filteredListings.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
            <Filter className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">No Secondary Streams Match Current Criteria</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Try adjusting your purity threshold or search query, or publish a new byproduct stream directly to the exchange.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={handleResetFilters}
              className="px-3.5 py-2 text-xs bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
            >
              Reset Filters
            </button>
            <button
              onClick={onOpenPostModal}
              className="px-3.5 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors"
            >
              List Waste Stream
            </button>
          </div>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((mat) => (
            <MaterialCard
              key={mat.id}
              material={mat}
              onSelect={onSelectListing}
              onRequestSample={onRequestSample}
              isCompared={comparedListings.some((c) => c.id === mat.id)}
              onToggleCompare={onToggleCompare}
            />
          ))}
        </div>
      ) : (
        /* HIGH-DENSITY INDUSTRIAL SPEC TABLE VIEW */
        <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 font-medium">
              <tr>
                <th className="py-3 px-4">Material / Waste Code</th>
                <th className="py-3 px-3">Sector & Form</th>
                <th className="py-3 px-3">Generator Facility</th>
                <th className="py-3 px-3 text-right">Purity %</th>
                <th className="py-3 px-3 text-right">Monthly Volume</th>
                <th className="py-3 px-3 text-right">Scope 3 Cut</th>
                <th className="py-3 px-3 text-right">Price / MT</th>
                <th className="py-3 px-4 text-center">Testing Lab</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono tabular-nums">
              {filteredListings.map((mat) => (
                <tr
                  key={mat.id}
                  onClick={() => onSelectListing(mat)}
                  className="hover:bg-slate-800/40 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-4 font-sans">
                    <span className="font-semibold text-white block hover:text-emerald-400">
                      {mat.title}
                    </span>
                    <span className="font-mono text-emerald-400 text-[11px] block">{mat.wasteCode}</span>
                  </td>
                  <td className="py-3 px-3 font-sans text-slate-300">
                    <div>{mat.category}</div>
                    <span className="text-slate-500 text-[11px]">{mat.form}</span>
                  </td>
                  <td className="py-3 px-3 font-sans text-slate-300">
                    <div>{mat.generator.name}</div>
                    <span className="text-slate-500 text-[11px]">{mat.generator.country}</span>
                  </td>
                  <td className="py-3 px-3 text-right text-white font-semibold">
                    {mat.purityPercent}%
                  </td>
                  <td className="py-3 px-3 text-right text-white">
                    {mat.monthlyVolumeMT.toLocaleString()} MT
                  </td>
                  <td className="py-3 px-3 text-right text-emerald-400 font-medium">
                    -{mat.sustainabilityCredentials.emissionsAvoidedPerMT} kg
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-white">
                    {mat.currency} {mat.pricePerMT.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-center font-sans">
                    <span className="inline-flex items-center gap-1 text-slate-300 text-[11px] bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>{mat.labVerification.accreditedLab.split(' ')[0]}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-sans" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => onSelectListing(mat)}
                      className="px-2.5 py-1 text-xs text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded font-medium transition-colors"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
