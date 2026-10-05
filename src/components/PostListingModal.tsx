import React, { useState } from 'react';
import { ScrapListing, IndustryCategory, MaterialForm, LogisticsTerms, HazmatClassification, PriceType } from '../types/exchange';
import { X, Plus, Trash2, CheckCircle2, ShieldCheck, Leaf, UploadCloud, Info } from 'lucide-react';

interface PostListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddListing: (listing: ScrapListing) => void;
}

export const PostListingModal: React.FC<PostListingModalProps> = ({
  isOpen,
  onClose,
  onAddListing,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<IndustryCategory>('Mineral & Construction');
  const [subCategory, setSubCategory] = useState('');
  const [wasteCode, setWasteCode] = useState('EWC 10 02 02');
  const [generatorName, setGeneratorName] = useState('Arcelor By-Products Hub');
  const [facilityLocation, setFacilityLocation] = useState('Dunkirk Industrial Harbor');
  const [country, setCountry] = useState('France');
  const [monthlyVolumeMT, setMonthlyVolumeMT] = useState<number>(500);
  const [minLotSizeMT, setMinLotSizeMT] = useState<number>(25);
  const [form, setForm] = useState<MaterialForm>('Granular Aggregate');
  const [purityPercent, setPurityPercent] = useState<number>(98.5);
  const [moistureContentPercent, setMoistureContentPercent] = useState<number>(1.2);
  const [pricePerMT, setPricePerMT] = useState<number>(35);
  const [currency, setCurrency] = useState('EUR');
  const [priceType, setPriceType] = useState<PriceType>('Fixed Price');
  const [logisticsTerms, setLogisticsTerms] = useState<LogisticsTerms>('Ex-Works (EXW)');
  const [hazmatClassification, setHazmatClassification] = useState<HazmatClassification>('Non-Hazardous Industrial Byproduct');
  const [sampleAvailable, setSampleAvailable] = useState(true);
  const [sampleSizeKg, setSampleSizeKg] = useState(15);
  const [targetIndustries, setTargetIndustries] = useState('Green Concrete, Roadway Base Course, Geopolymer Binders');
  const [accreditedLab, setAccreditedLab] = useState<'SGS Industrial Services' | 'Bureau Veritas' | 'TÜV SÜD' | 'Eurofins'>('SGS Industrial Services');
  const [technicalDescription, setTechnicalDescription] = useState('');
  const [emissionsAvoidedPerMT, setEmissionsAvoidedPerMT] = useState<number>(540);
  const [virginSubstituted, setVirginSubstituted] = useState('Virgin Portland Clinker');
  const [submitted, setSubmitted] = useState(false);

  // Chemical assay lines
  const [assays, setAssays] = useState<{ component: string; valuePercent: number; unit: string }[]>([
    { component: 'Primary Active Constituent', valuePercent: 78.4, unit: '%' },
    { component: 'Secondary Oxides / Matrix', valuePercent: 18.2, unit: '%' }
  ]);

  if (!isOpen) return null;

  const handleAddAssay = () => {
    setAssays([...assays, { component: '', valuePercent: 5.0, unit: '%' }]);
  };

  const handleRemoveAssay = (index: number) => {
    setAssays(assays.filter((_, i) => i !== index));
  };

  const handleUpdateAssay = (index: number, field: string, value: any) => {
    const updated = [...assays];
    (updated[index] as any)[field] = value;
    setAssays(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `mat-${Date.now().toString().slice(-4)}`;
    const randomHash = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

    // Select suitable fallback image according to category
    let image = '/src/assets/images/hero_industrial_symbiosis_1791194219706.jpg';
    if (category === 'Metallurgy') image = '/src/assets/images/material_metal_alloy_1791194232588.jpg';
    else if (category === 'Polymers & Composites') image = '/src/assets/images/material_polymer_pellets_1791194242960.jpg';
    else if (category === 'Mineral & Construction') image = '/src/assets/images/material_mineral_aggregate_1791194253255.jpg';

    const newListing: ScrapListing = {
      id,
      title: title || 'Refined Industrial Secondary Stream',
      category,
      subCategory: subCategory || `${category} Secondary Feedstock`,
      wasteCode: wasteCode || 'EWC 19 12 12',
      generator: {
        name: generatorName,
        facilityLocation,
        country,
        lat: 51.0,
        lng: 2.3,
        verifiedGenerator: true,
        certifications: ['ISO 14001', 'ISO 9001'],
        establishedYear: 2005,
        contactPerson: 'Quality & Byproducts Directorate',
        contactEmail: 'materials@facility.com'
      },
      monthlyVolumeMT: Number(monthlyVolumeMT),
      minLotSizeMT: Number(minLotSizeMT),
      form,
      purityPercent: Number(purityPercent),
      moistureContentPercent: Number(moistureContentPercent),
      targetDownstreamIndustries: targetIndustries.split(',').map(s => s.trim()).filter(Boolean),
      chemicalAssay: assays.filter(a => a.component.trim() !== ''),
      contaminantThresholds: [
        { parameter: 'Total Trace Contaminants', detectedPpm: 120, maxAllowedPpm: 500, status: 'Pass' },
        { parameter: 'Heavy Metal Screen (Cd/Pb/Hg)', detectedPpm: 1.8, maxAllowedPpm: 20, status: 'Pass' }
      ],
      pricePerMT: Number(pricePerMT),
      currency,
      priceType,
      sampleBatchAvailable: sampleAvailable,
      sampleBatchSizeKg: Number(sampleSizeKg),
      samplePrice: 0,
      labVerification: {
        verified: true,
        accreditedLab,
        testReportNumber: `${accreditedLab.substring(0, 3).toUpperCase()}-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        issueDate: '2026-10-01',
        expiryDate: '2027-10-01',
        sha256VerificationHash: randomHash,
        testedParametersCount: 22,
        badge: 'Gold Tier (Full Assayed)',
        chainOfCustodyVerified: true
      },
      sustainabilityCredentials: {
        emissionsAvoidedPerMT: Number(emissionsAvoidedPerMT),
        virginMaterialSubstituted: virginSubstituted || 'Virgin Primary Raw Feedstock',
        waterSavedM3PerMT: 8.5,
        circularityScore: 94,
        landfillDiversionRatePercent: 100,
        iso14021Compliant: true,
        euCsrdEligible: true,
        scope3GwpSavingsPercent: 81
      },
      logisticsTerms,
      hazmatClassification,
      image,
      fallbackIconType: 'mineral',
      status: 'Available',
      publishedDate: '2026-10-05',
      technicalDescription: technicalDescription || 'Consistent industrial by-product stream segregated at source with automated magnetic separation and sieve classification.',
      handlingPrecautions: 'Store under dry cover. Standard PPE required for bulk loading.'
    };

    onAddListing(newListing);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-xl border border-slate-800 bg-slate-900 shadow-2xl p-6 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              List Industrial Secondary Stream / Byproduct
            </h3>
            <p className="text-xs text-slate-400">
              Transform your facility's waste stream into verified raw material for secondary industry buyers
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Tabs */}
        <div className="grid grid-cols-3 gap-2 mb-6 text-xs">
          <button
            type="button"
            onClick={() => setStep(1)}
            className={`py-2 px-3 rounded-lg border text-left transition-colors ${
              step === 1
                ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300 font-semibold'
                : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            1. Stream Identification
          </button>
          <button
            type="button"
            onClick={() => setStep(2)}
            className={`py-2 px-3 rounded-lg border text-left transition-colors ${
              step === 2
                ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300 font-semibold'
                : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            2. Specs & Chemical Assay
          </button>
          <button
            type="button"
            onClick={() => setStep(3)}
            className={`py-2 px-3 rounded-lg border text-left transition-colors ${
              step === 3
                ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300 font-semibold'
                : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            3. Lab Verification & Scope 3
          </button>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-600 mx-auto flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-base font-bold text-white">Waste Stream Successfully Listed</h4>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Your material is now active on the CirculaRaw exchange with automated symbiosis matchmaking and verified lab audit credentials.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="overflow-y-auto space-y-4 flex-1 pr-1">
            {/* STEP 1: Identification */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Material Stream Designation / Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Fine Blast Furnace Slag Granulate (0-5mm)"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Industrial Sector *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as IndustryCategory)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                    >
                      <option value="Mineral & Construction">Mineral & Construction</option>
                      <option value="Metallurgy">Metallurgy & Foundries</option>
                      <option value="Chemical & Solvents">Chemical & Industrial Solvents</option>
                      <option value="Polymers & Composites">Polymers & Technical Composites</option>
                      <option value="Bio-Agri Residuals">Bio-Refinery & Agri Residuals</option>
                      <option value="Electronic Scrap">Electronic Scrap & Precious Slimes</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Material Physical Form *
                    </label>
                    <select
                      value={form}
                      onChange={(e) => setForm(e.target.value as MaterialForm)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                    >
                      <option value="Granular Aggregate">Granular Aggregate</option>
                      <option value="Pellets / Granules">Pellets / Granules</option>
                      <option value="Liquid Bulk">Liquid Bulk</option>
                      <option value="Shredded / Turnings">Shredded / Turnings</option>
                      <option value="Slurry / Filter Cake">Slurry / Filter Cake</option>
                      <option value="Baled Fibers">Baled Fibers</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Waste Catalog Code (EWC / Basel Code)
                    </label>
                    <input
                      type="text"
                      value={wasteCode}
                      onChange={(e) => setWasteCode(e.target.value)}
                      placeholder="e.g. EWC 10 02 02"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Hazmat / Basel Classification
                    </label>
                    <select
                      value={hazmatClassification}
                      onChange={(e) => setHazmatClassification(e.target.value as HazmatClassification)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                    >
                      <option value="Non-Hazardous Industrial Byproduct">Non-Hazardous Industrial Byproduct</option>
                      <option value="Regulated Basel Convention">Regulated Basel Convention</option>
                      <option value="Class 3 Flammable">Class 3 Flammable</option>
                      <option value="Non-Regulated Inert">Non-Regulated Inert</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Generating Facility
                    </label>
                    <input
                      type="text"
                      value={generatorName}
                      onChange={(e) => setGeneratorName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Facility City / Port
                    </label>
                    <input
                      type="text"
                      value={facilityLocation}
                      onChange={(e) => setFacilityLocation(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors"
                  >
                    Proceed to Specs & Chemical Assay →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Specs & Assay */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Monthly Vol (MT) *
                    </label>
                    <input
                      type="number"
                      required
                      value={monthlyVolumeMT}
                      onChange={(e) => setMonthlyVolumeMT(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Min Lot (MT) *
                    </label>
                    <input
                      type="number"
                      required
                      value={minLotSizeMT}
                      onChange={(e) => setMinLotSizeMT(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Purity % *
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={purityPercent}
                      onChange={(e) => setPurityPercent(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Moisture %
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={moistureContentPercent}
                      onChange={(e) => setMoistureContentPercent(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Price per Metric Ton *
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={pricePerMT}
                      onChange={(e) => setPricePerMT(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Pricing Mechanism
                    </label>
                    <select
                      value={priceType}
                      onChange={(e) => setPriceType(e.target.value as PriceType)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                    >
                      <option value="Fixed Price">Fixed Price</option>
                      <option value="Tender / Sealed Bid">Tender / Sealed Bid</option>
                      <option value="Index-Linked">Index-Linked</option>
                      <option value="Off-take Contract">Off-take Contract</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      IncoTerms Delivery
                    </label>
                    <select
                      value={logisticsTerms}
                      onChange={(e) => setLogisticsTerms(e.target.value as LogisticsTerms)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                    >
                      <option value="Ex-Works (EXW)">Ex-Works (EXW)</option>
                      <option value="Free on Board (FOB)">Free on Board (FOB)</option>
                      <option value="Delivered at Place (DAP)">Delivered at Place (DAP)</option>
                    </select>
                  </div>
                </div>

                {/* Chemical Assay dynamic lines */}
                <div className="border border-slate-800 rounded-lg p-3 bg-slate-950/40">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-300">
                      Assayed Chemical Breakdown (% wt)
                    </span>
                    <button
                      type="button"
                      onClick={handleAddAssay}
                      className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-medium"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Parameter
                    </button>
                  </div>

                  <div className="space-y-2">
                    {assays.map((assay, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={assay.component}
                          onChange={(e) => handleUpdateAssay(idx, 'component', e.target.value)}
                          placeholder="e.g. SiO2 or Total Titanium"
                          className="flex-1 bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white"
                        />
                        <input
                          type="number"
                          step="0.1"
                          value={assay.valuePercent}
                          onChange={(e) => handleUpdateAssay(idx, 'valuePercent', Number(e.target.value))}
                          placeholder="%"
                          className="w-20 bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-xs text-white font-mono"
                        />
                        <span className="text-xs text-slate-400">%</span>
                        {assays.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveAssay(idx)}
                            className="p-1 text-slate-500 hover:text-red-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Target Downstream Industrial Applications
                  </label>
                  <input
                    type="text"
                    value={targetIndustries}
                    onChange={(e) => setTargetIndustries(e.target.value)}
                    placeholder="e.g. Geopolymer Concrete, Ceramic Tiles, Asphalt Additives"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="flex justify-between pt-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors"
                  >
                    Proceed to Lab Accreditation →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Lab Verification & Scope 3 */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Accredited Testing Laboratory Partner *
                    </label>
                    <select
                      value={accreditedLab}
                      onChange={(e) => setAccreditedLab(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                    >
                      <option value="SGS Industrial Services">SGS Industrial Services (ISO/IEC 17025)</option>
                      <option value="Bureau Veritas">Bureau Veritas Materials Lab</option>
                      <option value="TÜV SÜD">TÜV SÜD Byproduct Inspection</option>
                      <option value="Eurofins">Eurofins Environmental & Materials</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Scope 3 GHG Avoidance (kg CO₂e / MT)
                    </label>
                    <input
                      type="number"
                      value={emissionsAvoidedPerMT}
                      onChange={(e) => setEmissionsAvoidedPerMT(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Virgin Feedstock Being Displaced
                  </label>
                  <input
                    type="text"
                    value={virginSubstituted}
                    onChange={(e) => setVirginSubstituted(e.target.value)}
                    placeholder="e.g. Virgin Portland Clinker or Primary Sponge Titanium"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Technical Specifications & Sieve/Melt Notes
                  </label>
                  <textarea
                    rows={3}
                    value={technicalDescription}
                    onChange={(e) => setTechnicalDescription(e.target.value)}
                    placeholder="Provide granulometry details, processing segregation methods, moisture control..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none placeholder:text-slate-600"
                  />
                </div>

                <div className="flex items-center gap-4 bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sampleAvailable}
                      onChange={(e) => setSampleAvailable(e.target.checked)}
                      className="rounded border-slate-700 text-emerald-500 focus:ring-emerald-400"
                    />
                    <span>Make physical sample batch available for buyer lab testing</span>
                  </label>
                  {sampleAvailable && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-300">
                      <span>Batch size:</span>
                      <input
                        type="number"
                        min="1"
                        max="50"
                        value={sampleSizeKg}
                        onChange={(e) => setSampleSizeKg(Number(e.target.value))}
                        className="w-16 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white font-mono"
                      />
                      <span>kg</span>
                    </div>
                  )}
                </div>

                <div className="p-3 bg-emerald-950/30 border border-emerald-900/50 rounded text-xs text-emerald-300 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    Upon listing, a cryptographic SHA-256 certificate will be generated and signed by {accreditedLab} to ensure regulatory compliance under EU CSRD and Basel Convention guidelines.
                  </span>
                </div>

                <div className="flex justify-between pt-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm shadow-emerald-950"
                  >
                    Publish Verified Stream to Exchange
                  </button>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};
