/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  INITIAL_LISTINGS, 
  SYMBIOSIS_PAIRS, 
  INITIAL_SAMPLE_REQUESTS, 
  INITIAL_CONTRACT_OFFERS 
} from './data/mockData';
import { ScrapListing, SampleRequest, ContractOffer } from './types/exchange';
import { Navbar } from './components/Navbar';
import { Marketplace } from './components/Marketplace';
import { SymbiosisMatrix } from './components/SymbiosisMatrix';
import { QualityVerificationHub } from './components/QualityVerificationHub';
import { CarbonCalculator } from './components/CarbonCalculator';
import { DealsAndSamples } from './components/DealsAndSamples';
import { MaterialDetailModal } from './components/MaterialDetailModal';
import { SampleRequestModal } from './components/SampleRequestModal';
import { PostListingModal } from './components/PostListingModal';
import { MaterialComparisonDrawer } from './components/MaterialComparisonDrawer';
import { ShieldCheck, ArrowRightLeft, Leaf, Factory, Scale } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'marketplace' | 'symbiosis' | 'quality' | 'carbon' | 'deals'>('marketplace');
  const [listings, setListings] = useState<ScrapListing[]>(INITIAL_LISTINGS);
  const [selectedListing, setSelectedListing] = useState<ScrapListing | null>(null);
  const [sampleModalListing, setSampleModalListing] = useState<ScrapListing | null>(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState<boolean>(false);
  const [comparedListings, setComparedListings] = useState<ScrapListing[]>([]);
  const [sampleRequests, setSampleRequests] = useState<SampleRequest[]>(INITIAL_SAMPLE_REQUESTS);
  const [contractOffers, setContractOffers] = useState<ContractOffer[]>(INITIAL_CONTRACT_OFFERS);
  const [userRole, setUserRole] = useState<'generator' | 'consumer'>('consumer');

  // Comparison toggle handler
  const handleToggleCompare = (material: ScrapListing) => {
    if (comparedListings.some((m) => m.id === material.id)) {
      setComparedListings(comparedListings.filter((m) => m.id !== material.id));
    } else {
      if (comparedListings.length >= 4) {
        setComparedListings([...comparedListings.slice(1), material]);
      } else {
        setComparedListings([...comparedListings, material]);
      }
    }
  };

  const handleRemoveCompare = (id: string) => {
    setComparedListings(comparedListings.filter((m) => m.id !== id));
  };

  const handleClearCompare = () => {
    setComparedListings([]);
  };

  // Add new scrap listing from generator flow
  const handleAddListing = (newListing: ScrapListing) => {
    setListings([newListing, ...listings]);
  };

  // Create sample request
  const handleCreateSampleRequest = (requestData: Partial<SampleRequest>) => {
    const newRequest: SampleRequest = {
      id: `smp-${Date.now().toString().slice(-4)}`,
      listingId: requestData.listingId || '',
      materialTitle: requestData.materialTitle || '',
      requesterCompany: requestData.requesterCompany || 'Manufacturing Client',
      destinationFacility: requestData.destinationFacility || 'Receiving Lab',
      sampleQuantityKg: requestData.sampleQuantityKg || 10,
      intendedApplication: requestData.intendedApplication || 'Pilot qualification',
      status: 'Pending Approval',
      trackingNumber: requestData.trackingNumber || `TRK-${Math.floor(100000 + Math.random() * 900000)}`,
      requestedAt: new Date().toISOString().split('T')[0],
      courier: requestData.courier || 'DHL Freight Industrial Chemical Courier',
      notes: 'New sample request initialized via CirculaRaw exchange.'
    };
    setSampleRequests([newRequest, ...sampleRequests]);
  };

  // Create contract offer
  const handleCreateOffer = (offerData: Partial<ContractOffer>) => {
    const newOffer: ContractOffer = {
      id: `off-${Date.now().toString().slice(-4)}`,
      listingId: offerData.listingId || '',
      materialTitle: offerData.materialTitle || '',
      buyerCompany: offerData.buyerCompany || 'Industrial Buyer Corp',
      sellerCompany: offerData.sellerCompany || 'Generating Facility',
      offeredPricePerMT: offerData.offeredPricePerMT || 100,
      requestedVolumeMT: offerData.requestedVolumeMT || 50,
      deliveryTerms: offerData.deliveryTerms || 'Ex-Works (EXW)',
      status: 'Submitted',
      createdAt: new Date().toISOString().split('T')[0],
      notes: offerData.notes || 'Formal off-take proposal submitted.'
    };
    setContractOffers([newOffer, ...contractOffers]);
  };

  // Update sample status
  const handleUpdateSampleStatus = (id: string, newStatus: SampleRequest['status']) => {
    setSampleRequests(
      sampleRequests.map((req) => (req.id === id ? { ...req, status: newStatus } : req))
    );
  };

  // Update offer status
  const handleUpdateOfferStatus = (id: string, newStatus: ContractOffer['status']) => {
    setContractOffers(
      contractOffers.map((off) => (off.id === id ? { ...off, status: newStatus } : off))
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* 3-Zone Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenPostModal={() => setIsPostModalOpen(true)}
        userRole={userRole}
        setUserRole={setUserRole}
      />

      {/* Main Viewport Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'marketplace' && (
          <Marketplace
            listings={listings}
            onSelectListing={(material) => setSelectedListing(material)}
            onRequestSample={(material) => setSampleModalListing(material)}
            comparedListings={comparedListings}
            onToggleCompare={handleToggleCompare}
            onOpenPostModal={() => setIsPostModalOpen(true)}
          />
        )}

        {activeTab === 'symbiosis' && (
          <SymbiosisMatrix
            symbiosisPairs={SYMBIOSIS_PAIRS}
            listings={listings}
            onSelectListing={(material) => setSelectedListing(material)}
          />
        )}

        {activeTab === 'quality' && (
          <QualityVerificationHub
            listings={listings}
            onSelectListing={(material) => setSelectedListing(material)}
          />
        )}

        {activeTab === 'carbon' && (
          <CarbonCalculator listings={listings} />
        )}

        {activeTab === 'deals' && (
          <DealsAndSamples
            sampleRequests={sampleRequests}
            contractOffers={contractOffers}
            onUpdateSampleStatus={handleUpdateSampleStatus}
            onUpdateOfferStatus={handleUpdateOfferStatus}
            userRole={userRole}
          />
        )}
      </main>

      {/* Modals & Slide-overs */}
      <MaterialDetailModal
        material={selectedListing}
        onClose={() => setSelectedListing(null)}
        onRequestSample={(material) => {
          setSelectedListing(null);
          setSampleModalListing(material);
        }}
        onSubmitOffer={(offerData) => {
          handleCreateOffer(offerData);
        }}
      />

      <SampleRequestModal
        material={sampleModalListing}
        onClose={() => setSampleModalListing(null)}
        onSubmitSampleRequest={(requestData) => {
          handleCreateSampleRequest(requestData);
        }}
      />

      <PostListingModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onAddListing={handleAddListing}
      />

      {/* Material Comparison Persistent Bottom Drawer */}
      <MaterialComparisonDrawer
        comparedMaterials={comparedListings}
        onRemove={handleRemoveCompare}
        onClear={handleClearCompare}
        onSelect={(material) => setSelectedListing(material)}
        isOpen={comparedListings.length > 0}
        onClose={() => setComparedListings([])}
      />

      {/* Quiet, Compliant Footer (No fake telemetry tickers or comments) */}
      <footer className="border-t border-slate-900 bg-slate-950 mt-16 text-xs text-slate-500 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-sm font-bold text-white tracking-tight">CirculaRaw</span>
            <p className="text-slate-400">
              The industrial secondary materials and byproduct symbiosis exchange platform.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400">
            <button
              onClick={() => setActiveTab('marketplace')}
              className="hover:text-slate-200 transition-colors"
            >
              Secondary Feeds
            </button>
            <button
              onClick={() => setActiveTab('symbiosis')}
              className="hover:text-slate-200 transition-colors"
            >
              Symbiosis Directory
            </button>
            <button
              onClick={() => setActiveTab('quality')}
              className="hover:text-slate-200 transition-colors"
            >
              ISO 17025 Standards
            </button>
            <button
              onClick={() => setActiveTab('carbon')}
              className="hover:text-slate-200 transition-colors"
            >
              EU CSRD Reporting
            </button>
          </div>

          <div className="text-slate-500 text-center md:text-right">
            <span>Basel Convention & REACH Compliant</span>
            <div className="text-[11px] text-slate-600 mt-0.5">
              © 2026 CirculaRaw Inc. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
