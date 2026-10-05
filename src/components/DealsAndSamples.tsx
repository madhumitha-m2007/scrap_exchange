import React, { useState } from 'react';
import { SampleRequest, ContractOffer } from '../types/exchange';
import { FlaskConical, Scale, CheckCircle2, Clock, Truck, ShieldCheck, ArrowRight, Check, X } from 'lucide-react';

interface DealsAndSamplesProps {
  sampleRequests: SampleRequest[];
  contractOffers: ContractOffer[];
  onUpdateSampleStatus: (id: string, newStatus: SampleRequest['status']) => void;
  onUpdateOfferStatus: (id: string, newStatus: ContractOffer['status']) => void;
  userRole: 'generator' | 'consumer';
}

export const DealsAndSamples: React.FC<DealsAndSamplesProps> = ({
  sampleRequests,
  contractOffers,
  onUpdateSampleStatus,
  onUpdateOfferStatus,
  userRole,
}) => {
  const [subTab, setSubTab] = useState<'samples' | 'offers'>('samples');

  const getStatusColor = (status: SampleRequest['status']) => {
    switch (status) {
      case 'Specs Accepted':
      case 'Contract Initiated':
        return 'text-emerald-400 bg-emerald-950/60 border-emerald-800';
      case 'Lab Testing In-Progress':
      case 'Sample Dispatched':
        return 'text-cyan-400 bg-cyan-950/60 border-cyan-800';
      default:
        return 'text-amber-400 bg-amber-950/60 border-amber-800';
    }
  };

  const getOfferStatusColor = (status: ContractOffer['status']) => {
    switch (status) {
      case 'Accepted':
        return 'text-emerald-400 bg-emerald-950/60 border-emerald-800';
      case 'Counter-Offer':
        return 'text-amber-400 bg-amber-950/60 border-amber-800';
      case 'Declined':
        return 'text-rose-400 bg-rose-950/60 border-rose-800';
      default:
        return 'text-cyan-400 bg-cyan-950/60 border-cyan-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="border-b border-slate-800 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold uppercase tracking-wider mb-1">
            <Scale className="w-4 h-4" />
            <span>Industrial Commercialization Desk</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Deals, Off-takes & Sample Validation Desk
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mt-1">
            Manage physical pilot batches, laboratory qualification gates, and multi-year secondary feedstock contracts under protected escrow milestones.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-medium self-start sm:self-auto">
          <button
            onClick={() => setSubTab('samples')}
            className={`px-3.5 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
              subTab === 'samples'
                ? 'bg-slate-800 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5 text-emerald-400" />
            <span>Sample Trials ({sampleRequests.length})</span>
          </button>
          <button
            onClick={() => setSubTab('offers')}
            className={`px-3.5 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
              subTab === 'offers'
                ? 'bg-slate-800 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Scale className="w-3.5 h-3.5 text-amber-400" />
            <span>Off-take Contracts ({contractOffers.length})</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: SAMPLE EVALUATION PIPELINE */}
      {subTab === 'samples' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>Active Trial Batches under Laboratory Qualification</span>
            <span>Standard SLA: 5-Day Chain of Custody</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {sampleRequests.map((req) => (
              <div
                key={req.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-800 pb-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-1">
                      <span className="font-mono text-emerald-400">{req.id}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono text-slate-300">{req.trackingNumber}</span>
                      <span aria-hidden="true">·</span>
                      <span>Requested: {req.requestedAt}</span>
                    </div>
                    <h3 className="text-base font-bold text-white tracking-tight">
                      {req.materialTitle}
                    </h3>
                  </div>

                  <span className={`text-xs px-2.5 py-1 rounded-md border font-medium font-sans ${getStatusColor(req.status)}`}>
                    {req.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[11px]">Receiving Entity</span>
                    <span className="text-slate-200 font-medium block mt-0.5">{req.requesterCompany}</span>
                    <span className="text-slate-400 text-[11px]">{req.destinationFacility}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[11px]">Sample Details</span>
                    <span className="text-white font-mono tabular-nums font-semibold block mt-0.5">
                      {req.sampleQuantityKg} kg Trial Batch
                    </span>
                    <span className="text-slate-400 text-[11px]">Courier: {req.courier}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[11px]">Trial Application</span>
                    <p className="text-slate-300 mt-0.5 line-clamp-2">
                      {req.intendedApplication}
                    </p>
                  </div>
                </div>

                {req.notes && (
                  <div className="mt-4 p-2.5 bg-slate-950/60 rounded border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                    <Truck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{req.notes}</span>
                  </div>
                )}

                {/* Interactive Status Progression Actions */}
                <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Accredited Tamper-Sealed Delivery</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {req.status === 'Pending Approval' && (
                      <button
                        onClick={() => onUpdateSampleStatus(req.id, 'Sample Dispatched')}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded font-medium transition-colors"
                      >
                        Dispatch Sample Batch
                      </button>
                    )}
                    {req.status === 'Sample Dispatched' && (
                      <button
                        onClick={() => onUpdateSampleStatus(req.id, 'Lab Testing In-Progress')}
                        className="px-3 py-1.5 bg-cyan-900/60 hover:bg-cyan-800/80 text-cyan-200 border border-cyan-700 rounded font-medium transition-colors"
                      >
                        Confirm Lab Receipt
                      </button>
                    )}
                    {req.status === 'Lab Testing In-Progress' && (
                      <button
                        onClick={() => onUpdateSampleStatus(req.id, 'Specs Accepted')}
                        className="px-3 py-1.5 bg-emerald-500 text-slate-950 hover:bg-emerald-400 rounded font-semibold transition-colors"
                      >
                        Accept Specification Pass
                      </button>
                    )}
                    {req.status === 'Specs Accepted' && (
                      <button
                        onClick={() => onUpdateSampleStatus(req.id, 'Contract Initiated')}
                        className="px-3 py-1.5 bg-emerald-500 text-slate-950 hover:bg-emerald-400 rounded font-semibold transition-colors flex items-center gap-1"
                      >
                        <span>Initiate Bulk Off-take Contract</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: OFF-TAKE CONTRACT OFFERS */}
      {subTab === 'offers' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>Direct Commercial Off-take Agreements</span>
            <span>Escrow & IncoTerms Protection Active</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {contractOffers.map((offer) => (
              <div
                key={offer.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-800 pb-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-1">
                      <span className="font-mono text-emerald-400">{offer.id}</span>
                      <span aria-hidden="true">·</span>
                      <span>Created: {offer.createdAt}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-300">{offer.deliveryTerms}</span>
                    </div>
                    <h3 className="text-base font-bold text-white tracking-tight">
                      {offer.materialTitle}
                    </h3>
                  </div>

                  <span className={`text-xs px-2.5 py-1 rounded-md border font-medium font-sans ${getOfferStatusColor(offer.status)}`}>
                    {offer.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[11px]">Buyer Facility</span>
                    <span className="text-slate-200 font-medium block mt-0.5">{offer.buyerCompany}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[11px]">Seller Generator</span>
                    <span className="text-slate-200 font-medium block mt-0.5">{offer.sellerCompany}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[11px]">Offered Rate & Volume</span>
                    <div className="text-white font-mono tabular-nums font-semibold mt-0.5">
                      EUR {offer.offeredPricePerMT} / MT · {offer.requestedVolumeMT} MT/mo
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[11px]">Annual Deal Value</span>
                    <div className="text-emerald-400 font-mono tabular-nums font-bold mt-0.5">
                      EUR {((offer.offeredPricePerMT * offer.requestedVolumeMT) * 12).toLocaleString()}
                    </div>
                  </div>
                </div>

                {offer.notes && (
                  <p className="mt-3 p-2.5 bg-slate-950/60 rounded border border-slate-800 text-xs text-slate-300">
                    <span className="text-slate-500 font-semibold mr-1">Terms:</span>
                    {offer.notes}
                  </p>
                )}

                {/* Offer Action Buttons */}
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-end gap-2 text-xs">
                  {offer.status === 'Submitted' && (
                    <>
                      <button
                        onClick={() => onUpdateOfferStatus(offer.id, 'Declined')}
                        className="px-3 py-1.5 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-slate-700 rounded transition-colors"
                      >
                        Decline
                      </button>
                      <button
                        onClick={() => onUpdateOfferStatus(offer.id, 'Counter-Offer')}
                        className="px-3 py-1.5 text-amber-300 hover:text-amber-200 bg-amber-950/40 border border-amber-800/80 rounded transition-colors"
                      >
                        Counter Offer
                      </button>
                      <button
                        onClick={() => onUpdateOfferStatus(offer.id, 'Accepted')}
                        className="px-4 py-1.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 rounded font-semibold transition-colors flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Accept Contract Offer</span>
                      </button>
                    </>
                  )}
                  {offer.status === 'Accepted' && (
                    <div className="text-emerald-400 flex items-center gap-1.5 font-medium">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Contract Signed & Escrow Initialized</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
