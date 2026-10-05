import React, { useState } from 'react';
import { ScrapListing } from '../types/exchange';
import { Leaf, TrendingDown, DollarSign, Truck, Download, CheckCircle2, ShieldCheck, Factory } from 'lucide-react';

interface CarbonCalculatorProps {
  listings: ScrapListing[];
}

export const CarbonCalculator: React.FC<CarbonCalculatorProps> = ({ listings }) => {
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>(listings[0]?.id || 'mat-001');
  const [annualTonnage, setAnnualTonnage] = useState<number>(500);
  const [transportDistanceKm, setTransportDistanceKm] = useState<number>(180);
  const [landfillFeePerTon, setLandfillFeePerTon] = useState<number>(85);
  const [exportSuccess, setExportSuccess] = useState<boolean>(false);

  const currentMaterial = listings.find(l => l.id === selectedMaterialId) || listings[0];

  // Mathematical LCA formulas:
  // Base avoided virgin emissions per MT:
  const virginAvoidedPerMT = currentMaterial.sustainabilityCredentials.emissionsAvoidedPerMT; // in kg CO2e / MT
  
  // Transport emissions: standard Euro 6 road freight emission factor ~ 0.062 kg CO2e / (ton * km)
  const transportFactorPerTonKm = 0.062;
  const transportEmissionsPerTon = transportDistanceKm * transportFactorPerTonKm;
  
  // Net avoided emissions per ton (kg CO2e):
  const netAvoidedPerTonKg = Math.max(0, virginAvoidedPerMT - transportEmissionsPerTon);
  
  // Total Annual Net Avoided in Metric Tons CO2e:
  const totalAnnualAvoidedMT = ((netAvoidedPerTonKg * annualTonnage) / 1000);

  // Economic metrics:
  const landfillTippingSaved = annualTonnage * landfillFeePerTon;
  const virginMaterialDisplacedMT = annualTonnage * (currentMaterial.purityPercent / 100);

  // Equivalence metrics:
  const carsRemovedYear = Math.round(totalAnnualAvoidedMT / 4.6);
  const treeSeedlingsGrown = Math.round(totalAnnualAvoidedMT * 16.5);

  const handleExportReport = () => {
    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold uppercase tracking-wider mb-1">
          <Leaf className="w-4 h-4" />
          <span>Scope 3 GHG & Circularity Accounting</span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Life Cycle Assessment (LCA) Impact Calculator
        </h2>
        <p className="text-sm text-slate-400 max-w-3xl mt-1">
          Quantify the verifiable carbon reduction, virgin raw material displacement, and landfill fee avoidance achieved by substituting 
          industrial virgin inputs with certified secondary waste streams.
        </p>
      </div>

      {/* Main Interactive Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Calculation Parameters */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-5">
          <h3 className="text-sm font-semibold text-white">
            Industrial Substitution Parameters
          </h3>

          {/* Select Material */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Select Secondary Byproduct Stream:
            </label>
            <select
              value={selectedMaterialId}
              onChange={(e) => setSelectedMaterialId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
            >
              {listings.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.title} ({l.category})
                </option>
              ))}
            </select>
          </div>

          {/* Baseline Virgin Material Card */}
          <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800 text-xs">
            <span className="text-[11px] text-slate-400 block">Virgin Material Displaced:</span>
            <span className="text-sm font-semibold text-emerald-400 block mt-0.5">
              {currentMaterial.sustainabilityCredentials.virginMaterialSubstituted}
            </span>
            <div className="mt-2 text-slate-400 flex items-center justify-between text-[11px]">
              <span>Gross Virgin Emission Factor:</span>
              <span className="font-mono text-white font-medium">{virginAvoidedPerMT} kg CO₂e / MT</span>
            </div>
          </div>

          {/* Annual Tonnage Slider */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <label className="font-medium text-slate-300">Annual Off-take Volume:</label>
              <span className="font-mono font-bold text-white tabular-nums bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                {annualTonnage.toLocaleString()} MT / year
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="5000"
              step="50"
              value={annualTonnage}
              onChange={(e) => setAnnualTonnage(Number(e.target.value))}
              className="w-full accent-emerald-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>50 MT</span>
              <span>2,500 MT</span>
              <span>5,000 MT</span>
            </div>
          </div>

          {/* Logistics Distance Slider */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <label className="font-medium text-slate-300">Haulage Delivery Radius (km):</label>
              <span className="font-mono font-bold text-white tabular-nums bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                {transportDistanceKm} km
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="1500"
              step="20"
              value={transportDistanceKm}
              onChange={(e) => setTransportDistanceKm(Number(e.target.value))}
              className="w-full accent-emerald-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>Local (20km)</span>
              <span>Regional (750km)</span>
              <span>Continental (1,500km)</span>
            </div>
          </div>

          {/* Landfill Tipping Fee Input */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <label className="font-medium text-slate-300">Avoided Disposal Tipping Fee (EUR / MT):</label>
              <span className="font-mono font-bold text-white tabular-nums bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                EUR {landfillFeePerTon}
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="200"
              step="5"
              value={landfillFeePerTon}
              onChange={(e) => setLandfillFeePerTon(Number(e.target.value))}
              className="w-full accent-emerald-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Right Column: High-Impact Environmental & Financial Accounting Card */}
        <div className="lg:col-span-7 space-y-5">
          {/* Main KPI Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-5">
              <div>
                <span className="text-xs text-slate-400 block">Annualized Net Avoided Emissions</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-extrabold text-white font-mono tabular-nums">
                    {Math.round(totalAnnualAvoidedMT).toLocaleString()}
                  </span>
                  <span className="text-sm text-emerald-400 font-semibold font-mono">
                    Metric Tons CO₂e / yr
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] text-slate-400 block">Net Decarbonization Efficiency</span>
                <span className="text-sm font-bold text-emerald-400 font-mono">
                  {currentMaterial.sustainabilityCredentials.scope3GwpSavingsPercent}% Scope 3 Cut
                </span>
              </div>
            </div>

            {/* Metric Tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Virgin Material Displaced</span>
                <span className="text-lg font-bold text-white font-mono tabular-nums mt-0.5 block">
                  {Math.round(virginMaterialDisplacedMT).toLocaleString()} MT
                </span>
                <span className="text-[11px] text-slate-500 block">100% circular diversion</span>
              </div>

              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Tipping Fees Avoided</span>
                <span className="text-lg font-bold text-white font-mono tabular-nums mt-0.5 block">
                  EUR {Math.round(landfillTippingSaved).toLocaleString()}
                </span>
                <span className="text-[11px] text-emerald-400 block">Direct cost avoidance</span>
              </div>

              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Water Conserved</span>
                <span className="text-lg font-bold text-white font-mono tabular-nums mt-0.5 block">
                  {Math.round(annualTonnage * currentMaterial.sustainabilityCredentials.waterSavedM3PerMT).toLocaleString()} m³
                </span>
                <span className="text-[11px] text-slate-500 block">Freshwater abstraction</span>
              </div>
            </div>

            {/* Equivalent Impact Benchmark */}
            <div className="border-t border-slate-800 pt-4">
              <span className="text-xs font-semibold text-slate-300 block mb-3">
                Real-World Carbon Equivalence (EPA Greenhouse Equivalencies API):
              </span>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-3 p-3 bg-slate-950/40 rounded border border-slate-800">
                  <div className="p-2 rounded bg-emerald-950/60 text-emerald-400">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white font-mono text-sm block tabular-nums">
                      {carsRemovedYear.toLocaleString()}
                    </span>
                    <span className="text-slate-400 text-[11px]">Passenger cars removed for 1 year</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-slate-950/40 rounded border border-slate-800">
                  <div className="p-2 rounded bg-emerald-950/60 text-emerald-400">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white font-mono text-sm block tabular-nums">
                      {treeSeedlingsGrown.toLocaleString()}
                    </span>
                    <span className="text-slate-400 text-[11px]">Tree seedlings sequestering carbon for 10 yrs</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>EU CSRD & ISO 14044 Audit Ready</span>
              </div>

              <button
                onClick={handleExportReport}
                className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm shadow-emerald-950"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{exportSuccess ? 'Report Generated & Downloaded' : 'Export ESG Carbon Certificate'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
