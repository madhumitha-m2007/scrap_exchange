import React from 'react';
import { ScrapListing } from '../types/exchange';
import { ShieldCheck, CheckCircle2, FlaskConical, MapPin, Scale, Leaf, ArrowRight, Layers } from 'lucide-react';

interface MaterialCardProps {
  material: ScrapListing;
  onSelect: (material: ScrapListing) => void;
  onRequestSample: (material: ScrapListing) => void;
  isCompared: boolean;
  onToggleCompare: (material: ScrapListing) => void;
}

export const MaterialCard: React.FC<MaterialCardProps> = ({
  material,
  onSelect,
  onRequestSample,
  isCompared,
  onToggleCompare,
}) => {
  return (
    <div className="group relative flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/70 hover:bg-slate-900 hover:border-slate-700 transition-all duration-200 overflow-hidden">
      {/* Top Media & Generator Anchor */}
      <div>
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
          <img
            src={material.image}
            alt={material.title}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              // Graceful CSS fallback container if image fails
              const target = e.currentTarget;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.classList.add('flex', 'items-center', 'justify-center', 'bg-slate-800');
                const span = document.createElement('span');
                span.className = 'text-xs text-slate-400 font-mono';
                span.innerText = `${material.category} · Verified Batch`;
                parent.appendChild(span);
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          
          {/* Subtle Lab Inspection Verification Bar */}
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-1.5 font-medium text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{material.labVerification.accreditedLab} Certified</span>
            </div>
            <span className="font-mono text-slate-400 text-[11px]">{material.wasteCode}</span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5">
          {/* Clean Unboxed Metadata Line (No Pill Enclosures) */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
            <span>{material.category}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>{material.form}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-300">{material.generator.country}</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelect(material)}
            className="text-base font-semibold text-white leading-snug tracking-tight hover:text-emerald-400 cursor-pointer transition-colors"
          >
            {material.title}
          </h3>

          {/* Generator Facility */}
          <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
            <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
            <span className="truncate">{material.generator.name} ({material.generator.facilityLocation})</span>
          </div>

          {/* Key Industrial Metrics Grid */}
          <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-800/80 pt-3">
            <div>
              <span className="text-[11px] text-slate-500 block">Purity & Moisture</span>
              <div className="text-xs font-medium text-slate-200 font-mono tabular-nums">
                {material.purityPercent}% <span className="text-slate-400 font-sans text-[11px]">purity</span> / {material.moistureContentPercent}% <span className="text-slate-400 font-sans text-[11px]">H₂O</span>
              </div>
            </div>

            <div>
              <span className="text-[11px] text-slate-500 block">Monthly Stream</span>
              <div className="text-xs font-medium text-slate-200 font-mono tabular-nums">
                {material.monthlyVolumeMT.toLocaleString()} <span className="text-slate-400 font-sans text-[11px]">MT / mo</span>
              </div>
            </div>

            <div>
              <span className="text-[11px] text-slate-500 block">Scope 3 Avoided</span>
              <div className="text-xs font-medium text-emerald-400 font-mono tabular-nums flex items-center gap-1">
                <Leaf className="w-3 h-3 shrink-0" />
                <span>-{material.sustainabilityCredentials.emissionsAvoidedPerMT} kg CO₂e/t</span>
              </div>
            </div>

            <div>
              <span className="text-[11px] text-slate-500 block">Indicative Price</span>
              <div className="text-xs font-semibold text-white font-mono tabular-nums">
                {material.currency} {material.pricePerMT.toLocaleString()} <span className="text-slate-400 font-sans text-[11px] font-normal">/ MT</span>
              </div>
            </div>
          </div>

          {/* Target Downstream Uses */}
          <div className="mt-3.5">
            <span className="text-[11px] text-slate-500 block mb-1">Target Secondary Applications:</span>
            <p className="text-xs text-slate-300 line-clamp-1">
              {material.targetDownstreamIndustries.join(', ')}
            </p>
          </div>
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="border-t border-slate-800 px-4 py-3 bg-slate-950/40 flex items-center justify-between gap-2">
        <button
          onClick={() => onToggleCompare(material)}
          className={`text-xs px-2.5 py-1.5 rounded transition-colors flex items-center gap-1 ${
            isCompared
              ? 'text-emerald-300 bg-emerald-950/60 border border-emerald-800/80'
              : 'text-slate-400 hover:text-slate-200 border border-transparent'
          }`}
          title="Compare technical specifications with other listings"
        >
          <Layers className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{isCompared ? 'Comparing' : 'Compare'}</span>
        </button>

        <div className="flex items-center gap-2">
          {material.sampleBatchAvailable && (
            <button
              onClick={() => onRequestSample(material)}
              className="text-xs px-2.5 py-1.5 text-slate-300 hover:text-white border border-slate-700 hover:border-slate-600 rounded transition-colors flex items-center gap-1"
            >
              <FlaskConical className="w-3 h-3 text-emerald-400" />
              <span>Sample</span>
            </button>
          )}

          <button
            onClick={() => onSelect(material)}
            className="text-xs font-medium px-3 py-1.5 text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded transition-colors flex items-center gap-1"
          >
            <span>Details</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
