import React, { useState } from 'react';
import { ScrapListing, SampleRequest } from '../types/exchange';
import { X, FlaskConical, ShieldCheck, CheckCircle2, Truck, AlertCircle } from 'lucide-react';

interface SampleRequestModalProps {
  material: ScrapListing | null;
  onClose: () => void;
  onSubmitSampleRequest: (request: Partial<SampleRequest>) => void;
}

export const SampleRequestModal: React.FC<SampleRequestModalProps> = ({
  material,
  onClose,
  onSubmitSampleRequest,
}) => {
  const [companyName, setCompanyName] = useState('EcoMaterials R&D Technologies');
  const [destination, setDestination] = useState('Central Quality Testing Lab, Building B');
  const [sampleQuantityKg, setSampleQuantityKg] = useState(material ? material.sampleBatchSizeKg : 10);
  const [intendedApp, setIntendedApp] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!material) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitSampleRequest({
      listingId: material.id,
      materialTitle: material.title,
      requesterCompany: companyName,
      destinationFacility: destination,
      sampleQuantityKg: Number(sampleQuantityKg),
      intendedApplication: intendedApp || 'Pilot compatibility test in secondary manufacturing recipe',
      status: 'Pending Approval',
      courier: 'DHL Freight Industrial Chemical Courier',
      trackingNumber: `REQ-${Math.floor(100000 + Math.random() * 900000)}`
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-xl border border-slate-800 bg-slate-900 shadow-2xl p-6 overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-800/80 text-emerald-400">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Request Certified Sample Batch
              </h3>
              <p className="text-xs text-slate-400">
                Direct from {material.generator.name}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-700 mx-auto flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-semibold text-white">Sample Request Dispatched</h4>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              Chain-of-custody sampling manifest transmitted to {material.generator.name}. Track the laboratory status in your Deals & Samples dashboard.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-3 bg-slate-950/60 rounded border border-slate-800 text-xs">
              <span className="text-slate-400 block text-[11px]">Selected Feedstock:</span>
              <span className="text-white font-medium block truncate">{material.title}</span>
              <div className="mt-1 flex items-center gap-2 text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{material.labVerification.accreditedLab} sealed batch guarantee</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Receiving Organization / Enterprise
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Sample Batch Weight (kg)
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={sampleQuantityKg}
                  onChange={(e) => setSampleQuantityKg(Number(e.target.value))}
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Sample Cost
                </label>
                <div className="w-full bg-slate-950/60 border border-slate-800 rounded-lg px-3 py-2 text-xs text-emerald-400 font-mono font-medium">
                  {material.samplePrice === 0 ? 'Complimentary (0 EUR)' : `${material.currency} ${material.samplePrice}`}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Destination Testing Facility Address
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
                placeholder="e.g. Lab Building 4, ChemTech Park, Antwerp"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Intended Industrial Trial Application
              </label>
              <textarea
                rows={2}
                value={intendedApp}
                onChange={(e) => setIntendedApp(e.target.value)}
                placeholder="Describe your manufacturing trial or qualification assay..."
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="p-3 bg-slate-950/40 rounded border border-slate-800 flex items-start gap-2 text-[11px] text-slate-400">
              <Truck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                Samples are dispatched with QR-coded Certificate of Analysis, tamper-evident seals, and courier hazardous compliance paperwork.
              </span>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors"
              >
                Confirm Sample Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
