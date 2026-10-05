export type IndustryCategory =
  | 'Metallurgy'
  | 'Chemical & Solvents'
  | 'Polymers & Composites'
  | 'Mineral & Construction'
  | 'Bio-Agri Residuals'
  | 'Electronic Scrap';

export type MaterialForm =
  | 'Granular Aggregate'
  | 'Pellets / Granules'
  | 'Liquid Bulk'
  | 'Shredded / Turnings'
  | 'Slurry / Filter Cake'
  | 'Baled Fibers';

export type HazmatClassification =
  | 'Non-Hazardous Industrial Byproduct'
  | 'Regulated Basel Convention'
  | 'Class 3 Flammable'
  | 'Non-Regulated Inert';

export type PriceType = 'Fixed Price' | 'Tender / Sealed Bid' | 'Index-Linked' | 'Off-take Contract';

export type LogisticsTerms = 'Ex-Works (EXW)' | 'Free on Board (FOB)' | 'Delivered at Place (DAP)';

export interface ChemicalAssayItem {
  component: string;
  valuePercent: number;
  unit: string;
}

export interface ContaminantThreshold {
  parameter: string;
  detectedPpm: number;
  maxAllowedPpm: number;
  status: 'Pass' | 'Exceeds';
}

export interface LabVerification {
  verified: boolean;
  accreditedLab: 'SGS Industrial Services' | 'Bureau Veritas' | 'TÜV SÜD' | 'Eurofins';
  testReportNumber: string;
  issueDate: string;
  expiryDate: string;
  sha256VerificationHash: string;
  testedParametersCount: number;
  badge: 'Gold Tier (Full Assayed)' | 'Silver Tier (Standard COA)' | 'Under Assay';
  chainOfCustodyVerified: boolean;
}

export interface SustainabilityCredentials {
  emissionsAvoidedPerMT: number; // in kg CO2e / MT
  virginMaterialSubstituted: string;
  waterSavedM3PerMT: number;
  circularityScore: number; // 0-100
  landfillDiversionRatePercent: number;
  iso14021Compliant: boolean;
  euCsrdEligible: boolean;
  scope3GwpSavingsPercent: number;
}

export interface GeneratorProfile {
  name: string;
  facilityLocation: string;
  country: string;
  lat: number;
  lng: number;
  verifiedGenerator: boolean;
  certifications: string[];
  establishedYear: number;
  contactPerson: string;
  contactEmail: string;
}

export interface ScrapListing {
  id: string;
  title: string;
  category: IndustryCategory;
  subCategory: string;
  wasteCode: string; // e.g. EWC 10 02 01
  generator: GeneratorProfile;
  monthlyVolumeMT: number;
  minLotSizeMT: number;
  form: MaterialForm;
  purityPercent: number;
  moistureContentPercent: number;
  targetDownstreamIndustries: string[];
  chemicalAssay: ChemicalAssayItem[];
  contaminantThresholds: ContaminantThreshold[];
  pricePerMT: number;
  currency: string;
  priceType: PriceType;
  sampleBatchAvailable: boolean;
  sampleBatchSizeKg: number;
  samplePrice: number;
  labVerification: LabVerification;
  sustainabilityCredentials: SustainabilityCredentials;
  logisticsTerms: LogisticsTerms;
  hazmatClassification: HazmatClassification;
  image: string;
  fallbackIconType: 'metal' | 'chemical' | 'polymer' | 'mineral' | 'bio' | 'electronic';
  status: 'Available' | 'Sample Testing Open' | 'Under Contract Review' | 'Allocated';
  publishedDate: string;
  technicalDescription: string;
  handlingPrecautions: string;
}

export interface SampleRequest {
  id: string;
  listingId: string;
  materialTitle: string;
  requesterCompany: string;
  destinationFacility: string;
  sampleQuantityKg: number;
  intendedApplication: string;
  status: 'Pending Approval' | 'Sample Dispatched' | 'Lab Testing In-Progress' | 'Specs Accepted' | 'Contract Initiated';
  trackingNumber: string;
  requestedAt: string;
  courier: string;
  notes?: string;
}

export interface ContractOffer {
  id: string;
  listingId: string;
  materialTitle: string;
  buyerCompany: string;
  sellerCompany: string;
  offeredPricePerMT: number;
  requestedVolumeMT: number;
  deliveryTerms: LogisticsTerms;
  status: 'Submitted' | 'Counter-Offer' | 'Accepted' | 'Declined';
  createdAt: string;
  notes: string;
}

export interface SymbiosisPair {
  id: string;
  sourceIndustry: string;
  byproductName: string;
  targetIndustry: string;
  application: string;
  ghgReductionPercent: number;
  costSavingsPercent: number;
  readinessLevel: string; // e.g. TRL 9 Commercial, TRL 8 Industrial Pilot
  activeListingsCount: number;
}
