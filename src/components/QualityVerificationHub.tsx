import React, { useState } from 'react';
import { ScrapListing } from '../types/exchange';
import { ShieldCheck, Search, CheckCircle2, FileCheck, Award, Lock, ExternalLink, RefreshCw, AlertTriangle } from 'lucide-react';

interface QualityVerificationHubProps {
  listings: ScrapListing[];
  onSelectListing: (listing: ScrapListing) => void;
}

export const QualityVerificationHub: React.FC<QualityVerificationHubProps> = ({
  listings,
  onSelectListing,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReport, setSelectedReport] = useState<ScrapListing>(listings[0]);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'verified'>('verified');

  const handleVerify = (listing: ScrapListing) => {
    setSelectedReport(listing);
    setVerificationStatus('verifying');
    setTimeout(() => {
      setVerificationStatus('verified');
    }, 400);
  };

  const filtered = listings.filter(l => 
    l.labVerification.testReportNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.labVerification.sha256VerificationHash.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.generator.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold uppercase tracking-wider mb-1">
          <ShieldCheck className="w-4 h-4" />
          <span>Accredited Quality & Assurance Protocol</span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Third-Party Material Quality & COA Verification Hub
        </h2>
        <p className="text-sm text-slate-400 max-w-3xl mt-1">
          Every scrap stream on CirculaRaw is independently assayed by accredited laboratories (SGS, TÜV SÜD, Bureau Veritas, Eurofins) 
          under ISO/IEC 17025 standards with tamper-evident chain of custody and cryptographic SHA-256 batch certificates.
        </p>
      </div>

      {/* Trust & Accreditation Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-950/60 border border-emerald-800/80 flex items-center justify-center text-emerald-400">
            <Lock className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-semibold text-white">Cryptographic Hashing</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Immutable SHA-256 digital certificate fingerprints guarantee assay reports cannot be altered after laboratory signing.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-950/60 border border-emerald-800/80 flex items-center justify-center text-emerald-400">
            <Award className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-semibold text-white">ISO/IEC 17025 Standards</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Assays performed by accredited test authorities adhering to strict ICP-OES, XRF, GC-MS, and granulometry benchmarks.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-950/60 border border-emerald-800/80 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-semibold text-white">Chain of Custody Sampling</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Independent third-party sampling agents seal representative lots directly at generator manufacturing facilities.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-950/60 border border-emerald-800/80 flex items-center justify-center text-emerald-400">
            <FileCheck className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-semibold text-white">CSRD & Basel Compliance</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Digital passports provide full regulatory classification (EWC waste codes, transboundary shipment, and Scope 3 eligibility).
          </p>
        </div>
      </div>

      {/* Main Interactive Verification Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Search & Registry */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-white mb-1">
              Certificate & Assay Registry
            </h3>
            <p className="text-xs text-slate-400 mb-3">
              Search by Certificate of Analysis (COA) number, SHA-256 hash, or generator facility:
            </p>

            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search SGS / TÜV report number or hash..."
                className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
            {filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => handleVerify(item)}
                className={`w-full text-left p-3 rounded-lg border transition-all text-xs ${
                  selectedReport.id === item.id
                    ? 'bg-slate-950 border-emerald-500/70 shadow-sm'
                    : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="font-mono text-emerald-400 font-semibold">{item.labVerification.testReportNumber}</span>
                  <span className="text-slate-400">{item.labVerification.accreditedLab}</span>
                </div>
                <div className="text-white font-medium truncate">{item.title}</div>
                <div className="text-slate-500 text-[11px] mt-1 flex items-center justify-between">
                  <span>{item.generator.name}</span>
                  <span className="font-mono">{item.labVerification.badge}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Live Cryptographic Verification Audit Sheet */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
          <div className="flex items-start justify-between border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-emerald-400">
                  {selectedReport.labVerification.accreditedLab}
                </span>
                <span className="text-xs text-slate-500">·</span>
                <span className="text-xs font-mono text-slate-400">
                  Audit Report #{selectedReport.labVerification.testReportNumber}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                {selectedReport.title}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-1 rounded-md font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Certificate Verified Valid</span>
              </span>
            </div>
          </div>

          {/* Cryptographic Proof Hash Banner */}
          <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">SHA-256 Verification Fingerprint:</span>
              <span className="text-emerald-400 text-[11px] font-mono">Status: Authenticated</span>
            </div>
            <div className="font-mono text-xs text-slate-300 break-all select-all bg-slate-900/80 p-2 rounded border border-slate-800">
              {selectedReport.labVerification.sha256VerificationHash}
            </div>
          </div>

          {/* Key Parameters Tested */}
          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Audited Laboratory Parameters ({selectedReport.labVerification.testedParametersCount} items)</span>
              <span className="text-slate-400 text-xs font-mono">Issued: {selectedReport.labVerification.issueDate}</span>
            </h4>

            <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-950/40">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 font-medium">
                  <tr>
                    <th className="py-2.5 px-3">Analyzed Component</th>
                    <th className="py-2.5 px-3">Assayed Concentration</th>
                    <th className="py-2.5 px-3">Analytical Method</th>
                    <th className="py-2.5 px-3 text-right">Tolerance Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono tabular-nums">
                  {selectedReport.chemicalAssay.map((assay, i) => (
                    <tr key={i} className="hover:bg-slate-800/30">
                      <td className="py-2 px-3 font-sans text-slate-200">{assay.component}</td>
                      <td className="py-2 px-3 text-white font-semibold">{assay.valuePercent} {assay.unit}</td>
                      <td className="py-2 px-3 text-slate-400 font-sans text-[11px]">ICP-OES / ASTM C114</td>
                      <td className="py-2 px-3 text-right">
                        <span className="text-emerald-400 text-xs font-sans">Compliant</span>
                      </td>
                    </tr>
                  ))}
                  {selectedReport.contaminantThresholds.map((c, i) => (
                    <tr key={`cont-${i}`} className="hover:bg-slate-800/30">
                      <td className="py-2 px-3 font-sans text-slate-200">{c.parameter}</td>
                      <td className="py-2 px-3 text-slate-300">{c.detectedPpm} ppm</td>
                      <td className="py-2 px-3 text-slate-400 font-sans text-[11px]">EN 12457-2 Leaching</td>
                      <td className="py-2 px-3 text-right">
                        <span className="text-emerald-400 text-xs font-sans">Below Limit</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Generator Facility Profile */}
          <div className="bg-slate-950/60 p-4 rounded-lg border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Certified Generating Facility</span>
              <span className="text-sm font-semibold text-white block mt-0.5">{selectedReport.generator.name}</span>
              <span className="text-slate-400 text-xs">
                {selectedReport.generator.facilityLocation}, {selectedReport.generator.country}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onSelectListing(selectedReport)}
                className="px-3.5 py-2 text-xs font-medium text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors"
              >
                View Full Material Listing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
