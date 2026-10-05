import React, { useState } from 'react';
import { ScrapListing, ContractOffer } from '../types/exchange';
import { 
  X, 
  ShieldCheck, 
  FlaskConical, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Building2, 
  MapPin, 
  Leaf, 
  Scale, 
  Droplet, 
  Send,
  ExternalLink
} from 'lucide-react';

interface MaterialDetailModalProps {
  material: ScrapListing | null;
  onClose: () => void;
  onRequestSample: (material: ScrapListing) => void;
  onSubmitOffer: (offer: Partial<ContractOffer>) => void;
}

export const MaterialDetailModal: React.FC<MaterialDetailModalProps> = ({
  material,
  onClose,
  onRequestSample,
  onSubmitOffer,
}) => {
  const [activeTab, setActiveTab] = useState<'specs' | 'lab' | 'sustainability' | 'offer'>('specs');
  const [offerVolume, setOfferVolume] = useState<number>(material ? material.minLotSizeMT : 10);
  const [offerPrice, setOfferPrice] = useState<number>(material ? material.pricePerMT : 0);
  const [offerNotes, setOfferNotes] = useState<string>('');
  const [offerSubmitted, setOfferSubmitted] = useState<boolean>(false);
  const [passportDownloaded, setPassportDownloaded] = useState<boolean>(false);

  if (!material) return null;

  const handleSendOffer = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitOffer({
      listingId: material.id,
      materialTitle: material.title,
      buyerCompany: 'Your Manufacturing Facility',
      sellerCompany: material.generator.name,
      offeredPricePerMT: Number(offerPrice),
      requestedVolumeMT: Number(offerVolume),
      deliveryTerms: material.logisticsTerms,
      notes: offerNotes || 'Formal inquiry for monthly recurring secondary feed off-take agreement.'
    });
    setOfferSubmitted(true);
    setTimeout(() => {
      setOfferSubmitted(false);
      onClose();
    }, 1800);
  };

  const handleDownloadPassport = () => {
    setPassportDownloaded(true);
    setTimeout(() => setPassportDownloaded(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="border-b border-slate-800 px-6 py-4 flex items-start justify-between bg-slate-950/60">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <span>{material.category}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="font-mono text-emerald-400">{material.wasteCode}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>{material.generator.country}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-300 font-mono tabular-nums">{material.monthlyVolumeMT} MT/month</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight leading-snug">
              {material.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center border-b border-slate-800 bg-slate-950/30 px-6 text-xs font-medium">
          <button
            onClick={() => setActiveTab('specs')}
            className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'specs'
                ? 'border-emerald-400 text-white font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Technical Specifications & Assay
          </button>
          <button
            onClick={() => setActiveTab('lab')}
            className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'lab'
                ? 'border-emerald-400 text-white font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Accredited Lab Certification & COA
          </button>
          <button
            onClick={() => setActiveTab('sustainability')}
            className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'sustainability'
                ? 'border-emerald-400 text-white font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            Scope 3 & Circularity Passport
          </button>
          <button
            onClick={() => setActiveTab('offer')}
            className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'offer'
                ? 'border-emerald-400 text-white font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Scale className="w-3.5 h-3.5 text-amber-400" />
            Off-take Offer & Tender
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-200">
          {/* TAB 1: SPECS & ASSAY */}
          {activeTab === 'specs' && (
            <div className="space-y-6">
              {/* Summary Hero Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/60 p-4 rounded-lg border border-slate-800">
                <div>
                  <span className="text-[11px] text-slate-400 block">Purity Rating</span>
                  <span className="text-base font-bold text-white font-mono tabular-nums">{material.purityPercent}%</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Moisture Content</span>
                  <span className="text-base font-bold text-white font-mono tabular-nums">{material.moistureContentPercent}%</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Min Batch Size</span>
                  <span className="text-base font-bold text-white font-mono tabular-nums">{material.minLotSizeMT} MT</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Logistics IncoTerms</span>
                  <span className="text-base font-bold text-emerald-400">{material.logisticsTerms}</span>
                </div>
              </div>

              {/* Technical Description */}
              <div>
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Technical Characterization
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/30 p-3.5 rounded border border-slate-800/80">
                  {material.technicalDescription}
                </p>
              </div>

              {/* Chemical Assay Breakdown */}
              <div>
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                  Certified Chemical Composition (ICP-OES / XRF Assay)
                </h4>
                <div className="space-y-2.5 bg-slate-950/40 p-4 rounded-lg border border-slate-800">
                  {material.chemicalAssay.map((assay, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300 font-medium">{assay.component}</span>
                        <span className="font-mono text-white tabular-nums font-semibold">
                          {assay.valuePercent} {assay.unit}
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(100, Math.max(2, assay.valuePercent))}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contaminant Threshold Limits */}
              <div>
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                  Contaminant Thresholds & Leachability Parameters
                </h4>
                <div className="border border-slate-800 rounded-lg overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800 font-medium">
                      <tr>
                        <th className="py-2.5 px-3">Parameter Tested</th>
                        <th className="py-2.5 px-3">Detected Level</th>
                        <th className="py-2.5 px-3">Max Allowed Cap</th>
                        <th className="py-2.5 px-3 text-right">Regulatory Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-mono tabular-nums">
                      {material.contaminantThresholds.map((c, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/30">
                          <td className="py-2 px-3 font-sans text-slate-300">{c.parameter}</td>
                          <td className="py-2 px-3 text-white">{c.detectedPpm} ppm</td>
                          <td className="py-2 px-3 text-slate-400">{c.maxAllowedPpm} ppm</td>
                          <td className="py-2 px-3 text-right">
                            <span className="inline-flex items-center gap-1 text-emerald-400 font-sans text-xs">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>{c.status}</span>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Downstream Cross-Industry Uses */}
              <div>
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Verified Secondary Industrial Applications
                </h4>
                <div className="flex flex-wrap gap-2">
                  {material.targetDownstreamIndustries.map((ind, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 bg-slate-800 text-slate-200 rounded border border-slate-700"
                    >
                      {ind}
                    </span>
                  ))}
                </div>
              </div>

              {/* Safety & Handling Precautions */}
              <div className="p-3 bg-amber-950/20 border border-amber-900/40 rounded text-xs text-amber-200">
                <span className="font-semibold block mb-0.5">Handling & Environmental Safety:</span>
                {material.handlingPrecautions}
              </div>
            </div>
          )}

          {/* TAB 2: LAB AUDITS & COA */}
          {activeTab === 'lab' && (
            <div className="space-y-6">
              {/* Lab Certification Card */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-5">
                <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-950/60 border border-emerald-800/80 flex items-center justify-center text-emerald-400">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{material.labVerification.accreditedLab}</span>
                        <span className="text-[11px] text-emerald-400 font-medium">· Certified Lab Partner</span>
                      </div>
                      <span className="text-xs text-slate-400">
                        Accredited ISO/IEC 17025 Industrial Testing Authority
                      </span>
                    </div>
                  </div>

                  <span className="text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-2.5 py-1 rounded font-medium">
                    {material.labVerification.badge}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Audit Report Number</span>
                    <span className="text-white font-mono tabular-nums font-semibold">{material.labVerification.testReportNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Chain of Custody Status</span>
                    <span className="text-emerald-400 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Tamper-Proof Sampling Sealed at Facility</span>
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Testing Parameters Tested</span>
                    <span className="text-white font-mono tabular-nums">{material.labVerification.testedParametersCount} Active Parameters</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Assay Validity Period</span>
                    <span className="text-white font-mono tabular-nums">
                      {material.labVerification.issueDate} to {material.labVerification.expiryDate}
                    </span>
                  </div>
                </div>

                {/* Cryptographic Verification Hash */}
                <div className="mt-4 pt-3 border-t border-slate-800">
                  <span className="text-[11px] text-slate-400 block mb-1">
                    SHA-256 Digital Certificate Checksum (Immutable Record)
                  </span>
                  <div className="bg-slate-900 px-3 py-2 rounded border border-slate-800 font-mono text-[11px] text-slate-300 break-all select-all">
                    {material.labVerification.sha256VerificationHash}
                  </div>
                </div>
              </div>

              {/* Generator Facility Accreditation */}
              <div className="border border-slate-800 rounded-lg p-4 bg-slate-950/40">
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Generator Origin & Audit Credentials
                </h4>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="text-sm font-semibold text-white">{material.generator.name}</div>
                    <div className="text-slate-400 mt-0.5 flex items-center gap-1.5">
                      <MapPin className="w-3 h-3" />
                      <span>{material.generator.facilityLocation}, {material.generator.country}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {material.generator.certifications.map((c, i) => (
                      <span key={i} className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-[11px] text-slate-200">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Verification Steps Explainer */}
              <div className="text-xs text-slate-400 space-y-1">
                <span className="font-semibold text-slate-300 block">Quality Assurance Protocol:</span>
                <p>
                  Every lot offered on CirculaRaw must undergo physical sampling by accredited third-party inspectors. 
                  Moisture, granulometry, ICP-OES elemental composition, and hazardous leachates are re-assayed monthly.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: SUSTAINABILITY & SCOPE 3 */}
          {activeTab === 'sustainability' && (
            <div className="space-y-6">
              {/* Sustainability Headline Banner */}
              <div className="bg-emerald-950/30 border border-emerald-800/50 rounded-lg p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                    <Leaf className="w-3.5 h-3.5" />
                    Verified Environmental Return on Investment
                  </span>
                  <span className="text-xs text-emerald-300 font-mono font-bold">
                    Circularity Score: {material.sustainabilityCredentials.circularityScore}/100
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-slate-950/60 p-3 rounded border border-slate-800">
                    <span className="text-[11px] text-slate-400 block">Scope 3 GHG Avoided</span>
                    <span className="text-xl font-bold text-white font-mono tabular-nums">
                      {material.sustainabilityCredentials.emissionsAvoidedPerMT}
                    </span>
                    <span className="text-xs text-emerald-400 font-medium block">kg CO₂e avoided per MT</span>
                  </div>

                  <div className="bg-slate-950/60 p-3 rounded border border-slate-800">
                    <span className="text-[11px] text-slate-400 block">Virgin Raw Material Offset</span>
                    <span className="text-sm font-semibold text-white block mt-1">
                      {material.sustainabilityCredentials.virginMaterialSubstituted}
                    </span>
                    <span className="text-xs text-slate-400 mt-1 block">1:1 industrial replacement</span>
                  </div>

                  <div className="bg-slate-950/60 p-3 rounded border border-slate-800">
                    <span className="text-[11px] text-slate-400 block">Water Resources Preserved</span>
                    <span className="text-xl font-bold text-white font-mono tabular-nums">
                      {material.sustainabilityCredentials.waterSavedM3PerMT}
                    </span>
                    <span className="text-xs text-slate-400 block">m³ freshwater per MT</span>
                  </div>
                </div>
              </div>

              {/* ESG & Compliance Matrix */}
              <div className="border border-slate-800 rounded-lg p-4 bg-slate-950/40">
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                  Regulatory Compliance & Reporting Standards
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center justify-between p-2.5 bg-slate-900 rounded border border-slate-800">
                    <span className="text-slate-300">EU CSRD Category 4 Scope 3 Eligible</span>
                    <span className="text-emerald-400 font-semibold">Eligible</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-slate-900 rounded border border-slate-800">
                    <span className="text-slate-300">ISO 14021 Recycled Content Claim</span>
                    <span className="text-emerald-400 font-semibold">Compliant</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-slate-900 rounded border border-slate-800">
                    <span className="text-slate-300">Landfill Diversion Rate</span>
                    <span className="text-white font-mono tabular-nums font-semibold">
                      {material.sustainabilityCredentials.landfillDiversionRatePercent}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-slate-900 rounded border border-slate-800">
                    <span className="text-slate-300">Life Cycle Assessment (LCA) Standard</span>
                    <span className="text-slate-200">ISO 14044 / EN 15804</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: OFF-TAKE OFFER FORM */}
          {activeTab === 'offer' && (
            <form onSubmit={handleSendOffer} className="space-y-4">
              <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-800">
                <h3 className="text-sm font-semibold text-white mb-1">
                  Submit Direct Secondary Off-take Offer
                </h3>
                <p className="text-xs text-slate-400 mb-4">
                  Offers submitted via CirculaRaw enter the structured B2B deal room with seller counter-terms and verified escrow milestone settlement.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Target Monthly Volume (MT)
                    </label>
                    <input
                      type="number"
                      min={material.minLotSizeMT}
                      max={material.monthlyVolumeMT}
                      value={offerVolume}
                      onChange={(e) => setOfferVolume(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-emerald-500 focus:outline-none"
                      required
                    />
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      Min lot: {material.minLotSizeMT} MT · Max available: {material.monthlyVolumeMT} MT
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Offered Price per MT ({material.currency})
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={offerPrice}
                      onChange={(e) => setOfferPrice(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-emerald-500 focus:outline-none"
                      required
                    />
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      Generator benchmark: {material.currency} {material.pricePerMT} / MT
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Secondary Processing Application & Terms Notes
                  </label>
                  <textarea
                    rows={3}
                    value={offerNotes}
                    onChange={(e) => setOfferNotes(e.target.value)}
                    placeholder="Specify delivery destination, quality tolerance thresholds, and target delivery cadence..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none placeholder:text-slate-600"
                  />
                </div>

                <div className="mt-4 p-3 bg-slate-900/80 rounded border border-slate-800 text-xs text-slate-400 flex justify-between items-center">
                  <span>Estimated Total Contract Value (Annualized):</span>
                  <span className="text-sm font-bold text-white font-mono tabular-nums">
                    {material.currency} {((offerVolume * offerPrice) * 12).toLocaleString()}
                  </span>
                </div>
              </div>

              {offerSubmitted ? (
                <div className="p-3 bg-emerald-950/60 border border-emerald-800 text-emerald-300 rounded text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Offer submitted to {material.generator.name}! Redirecting to Deals & Sample Lab...</span>
                </div>
              ) : (
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs text-slate-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Transmit Formal Off-take Offer
                  </button>
                </div>
              )}
            </form>
          )}
        </div>

        {/* Modal Sticky Footer Actions */}
        <div className="border-t border-slate-800 bg-slate-950/80 px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="text-white font-semibold font-mono tabular-nums">
              {material.currency} {material.pricePerMT.toLocaleString()}
            </span>
            <span>/ MT</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-emerald-400 font-medium">{material.priceType}</span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleDownloadPassport}
              className="text-xs px-3 py-2 text-slate-300 hover:text-white border border-slate-700 hover:border-slate-600 rounded-lg transition-colors flex items-center gap-1.5"
              title="Download standardized Technical Data Sheet & ESG passport"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{passportDownloaded ? 'Downloaded (TDS-PDF)' : 'Export Material Passport'}</span>
            </button>

            {material.sampleBatchAvailable && (
              <button
                onClick={() => onRequestSample(material)}
                className="text-xs px-3 py-2 text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5 font-medium"
              >
                <FlaskConical className="w-3.5 h-3.5 text-emerald-400" />
                <span>Request Sample Batch ({material.sampleBatchSizeKg} kg)</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('offer')}
              className="text-xs font-semibold px-4 py-2 text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors"
            >
              Make Off-take Offer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
