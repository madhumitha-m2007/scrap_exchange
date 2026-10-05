import React from 'react';
import { ScrapListing } from '../types/exchange';
import { X, Layers, ArrowRight, ShieldCheck, Leaf, Trash2 } from 'lucide-react';

interface MaterialComparisonDrawerProps {
  comparedMaterials: ScrapListing[];
  onRemove: (id: string) => void;
  onClear: () => void;
  onSelect: (material: ScrapListing) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const MaterialComparisonDrawer: React.FC<MaterialComparisonDrawerProps> = ({
  comparedMaterials,
  onRemove,
  onClear,
  onSelect,
  isOpen,
  onClose,
}) => {
  if (!isOpen || comparedMaterials.length === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 bg-slate-950/95 border-t border-slate-800 shadow-2xl backdrop-blur-md max-h-[70vh] flex flex-col">
      {/* Drawer Top Bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-bold text-white tracking-tight">
            Secondary Stream Comparison Matrix ({comparedMaterials.length} materials)
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onClear}
            className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
          >
            Clear All
          </button>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Comparison Grid Table */}
      <div className="overflow-x-auto p-4 sm:p-6 flex-1">
        <div className="grid grid-flow-col auto-cols-[minmax(280px,1fr)] gap-4 text-xs">
          {comparedMaterials.map((mat) => (
            <div
              key={mat.id}
              className="bg-slate-900 border border-slate-800 rounded-lg p-4 space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[11px] font-mono text-emerald-400 block">{mat.wasteCode}</span>
                    <h4 className="text-sm font-bold text-white leading-snug">{mat.title}</h4>
                  </div>
                  <button
                    onClick={() => onRemove(mat.id)}
                    className="text-slate-500 hover:text-red-400 p-1"
                    title="Remove from comparison"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-[11px] text-slate-400 mb-3">
                  {mat.generator.name} ({mat.generator.country})
                </div>

                {/* Comparison Parameter Rows */}
                <div className="space-y-2 border-t border-slate-800/80 pt-3">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Purity Rating</span>
                    <span className="font-mono text-white font-semibold tabular-nums">{mat.purityPercent}%</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">Moisture Content</span>
                    <span className="font-mono text-white tabular-nums">{mat.moistureContentPercent}%</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">Monthly Volume</span>
                    <span className="font-mono text-white font-semibold tabular-nums">{mat.monthlyVolumeMT} MT/mo</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">Scope 3 GHG Avoided</span>
                    <span className="font-mono text-emerald-400 font-semibold tabular-nums">
                      -{mat.sustainabilityCredentials.emissionsAvoidedPerMT} kg/t
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">Circularity Index</span>
                    <span className="font-mono text-emerald-300 tabular-nums">
                      {mat.sustainabilityCredentials.circularityScore}/100
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">Testing Authority</span>
                    <span className="text-slate-200 font-medium">{mat.labVerification.accreditedLab}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">Price / MT</span>
                    <span className="font-mono font-bold text-white tabular-nums">
                      {mat.currency} {mat.pricePerMT.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">Logistics IncoTerm</span>
                    <span className="text-slate-300">{mat.logisticsTerms}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onSelect(mat)}
                className="w-full mt-3 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded transition-colors flex items-center justify-center gap-1"
              >
                <span>Full Technical Spec</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
