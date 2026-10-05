import { ScrapListing, SymbiosisPair, SampleRequest, ContractOffer } from '../types/exchange';

export const INITIAL_LISTINGS: ScrapListing[] = [
  {
    id: 'mat-001',
    title: 'Electric Arc Furnace (EAF) Slag Aggregate (0-22mm)',
    category: 'Mineral & Construction',
    subCategory: 'Metallurgical Slag Aggregates',
    wasteCode: 'EWC 10 02 02',
    generator: {
      name: 'RheinSteel Metallurgy Works',
      facilityLocation: 'Duisburg Industrial Port',
      country: 'Germany',
      lat: 51.4344,
      lng: 6.7623,
      verifiedGenerator: true,
      certifications: ['ISO 14001', 'ResponsibleSteel', 'EN 13242 CE'],
      establishedYear: 1978,
      contactPerson: 'Dr. Henrik Vance',
      contactEmail: 'h.vance@rheinsteel-byproducts.de'
    },
    monthlyVolumeMT: 1450,
    minLotSizeMT: 50,
    form: 'Granular Aggregate',
    purityPercent: 99.1,
    moistureContentPercent: 1.4,
    targetDownstreamIndustries: [
      'Geopolymer Concrete Manufacturing',
      'High-Load Asphalt Binder Course',
      'Harbor Wave-breaker Armor Blocks',
      'Mineral Wool Insulation'
    ],
    chemicalAssay: [
      { component: 'Calcium Oxide (CaO)', valuePercent: 38.6, unit: '%' },
      { component: 'Iron Oxide (Fe2O3/FeO)', valuePercent: 29.2, unit: '%' },
      { component: 'Silicon Dioxide (SiO2)', valuePercent: 16.4, unit: '%' },
      { component: 'Aluminium Oxide (Al2O3)', valuePercent: 7.8, unit: '%' },
      { component: 'Magnesium Oxide (MgO)', valuePercent: 6.1, unit: '%' }
    ],
    contaminantThresholds: [
      { parameter: 'Free Lime (f-CaO)', detectedPpm: 3200, maxAllowedPpm: 5000, status: 'Pass' },
      { parameter: 'Leachable Chromium (Cr VI)', detectedPpm: 0.12, maxAllowedPpm: 0.5, status: 'Pass' },
      { parameter: 'Total Heavy Metals (Cd/Pb/Hg)', detectedPpm: 4.8, maxAllowedPpm: 25.0, status: 'Pass' }
    ],
    pricePerMT: 28.5,
    currency: 'EUR',
    priceType: 'Fixed Price',
    sampleBatchAvailable: true,
    sampleBatchSizeKg: 25,
    samplePrice: 0,
    labVerification: {
      verified: true,
      accreditedLab: 'SGS Industrial Services',
      testReportNumber: 'SGS-EU-2026-98124',
      issueDate: '2026-08-14',
      expiryDate: '2027-08-14',
      sha256VerificationHash: '8f7a93c4e1b0293d84f1a5b6c7d8e9f0123456789abcdef0123456789abcdef0',
      testedParametersCount: 24,
      badge: 'Gold Tier (Full Assayed)',
      chainOfCustodyVerified: true
    },
    sustainabilityCredentials: {
      emissionsAvoidedPerMT: 620, // kg CO2e / MT
      virginMaterialSubstituted: 'Virgin Basalt Aggregate & Portland Clinker',
      waterSavedM3PerMT: 1.8,
      circularityScore: 94,
      landfillDiversionRatePercent: 100,
      iso14021Compliant: true,
      euCsrdEligible: true,
      scope3GwpSavingsPercent: 78
    },
    logisticsTerms: 'Ex-Works (EXW)',
    hazmatClassification: 'Non-Hazardous Industrial Byproduct',
    image: '/src/assets/images/material_mineral_aggregate_1791194253255.jpg',
    fallbackIconType: 'mineral',
    status: 'Available',
    publishedDate: '2026-09-12',
    technicalDescription: 'Aged and weathered electric arc furnace slag screened to 0-22mm specification. Free-lime expansion stabilized below 1.0% volume increase in steam autoclave tests. Exceptional skid resistance and high compressive load resistance for heavy-duty applications.',
    handlingPrecautions: 'Standard aggregate handling PPE. Wet mist suppression during high-velocity conveyor transfer to prevent particulate suspension.'
  },
  {
    id: 'mat-002',
    title: 'Aerospace Grade Titanium Ti-6Al-4V Turnings & Machine Offcuts',
    category: 'Metallurgy',
    subCategory: 'Secondary Titanium Alloys',
    wasteCode: 'EWC 12 01 03',
    generator: {
      name: 'AeroStructures Precision Dynamics',
      facilityLocation: 'Toulouse Aerospace Hub',
      country: 'France',
      lat: 43.6047,
      lng: 1.4442,
      verifiedGenerator: true,
      certifications: ['AS9100D', 'ISO 9001', 'EN 9104-001'],
      establishedYear: 1994,
      contactPerson: 'Laurent Mercier',
      contactEmail: 'l.mercier@aerostructures.fr'
    },
    monthlyVolumeMT: 48,
    minLotSizeMT: 5,
    form: 'Shredded / Turnings',
    purityPercent: 99.6,
    moistureContentPercent: 0.2,
    targetDownstreamIndustries: [
      'Secondary Vacuum Arc Remelting (VAR)',
      'Additive Manufacturing Plasma Atomization Feedstock',
      'Chemical Heat Exchanger Tubing',
      'Marine Subsea Valve Forgings'
    ],
    chemicalAssay: [
      { component: 'Titanium (Ti)', valuePercent: 89.8, unit: '%' },
      { component: 'Aluminium (Al)', valuePercent: 6.25, unit: '%' },
      { component: 'Vanadium (V)', valuePercent: 4.1, unit: '%' },
      { component: 'Iron (Fe)', valuePercent: 0.18, unit: '%' },
      { component: 'Oxygen (O2 interstitial)', valuePercent: 0.14, unit: '%' }
    ],
    contaminantThresholds: [
      { parameter: 'Cutting Fluid Residual Oil', detectedPpm: 24, maxAllowedPpm: 50, status: 'Pass' },
      { parameter: 'Tungsten Tool Inclusions (W)', detectedPpm: 2.1, maxAllowedPpm: 10, status: 'Pass' },
      { parameter: 'Moisture', detectedPpm: 120, maxAllowedPpm: 500, status: 'Pass' }
    ],
    pricePerMT: 12400,
    currency: 'EUR',
    priceType: 'Index-Linked',
    sampleBatchAvailable: true,
    sampleBatchSizeKg: 10,
    samplePrice: 150,
    labVerification: {
      verified: true,
      accreditedLab: 'Bureau Veritas',
      testReportNumber: 'BV-MET-2026-4421',
      issueDate: '2026-09-01',
      expiryDate: '2027-09-01',
      sha256VerificationHash: '3a4b5c6d7e8f90123456789abcdef0123456789abcdef0123456789abcdef012',
      testedParametersCount: 32,
      badge: 'Gold Tier (Full Assayed)',
      chainOfCustodyVerified: true
    },
    sustainabilityCredentials: {
      emissionsAvoidedPerMT: 28400, // kg CO2e / MT Ti extraction has huge footprint
      virginMaterialSubstituted: 'Kroll Process Sponge Titanium',
      waterSavedM3PerMT: 42.0,
      circularityScore: 98,
      landfillDiversionRatePercent: 100,
      iso14021Compliant: true,
      euCsrdEligible: true,
      scope3GwpSavingsPercent: 91
    },
    logisticsTerms: 'Free on Board (FOB)',
    hazmatClassification: 'Non-Hazardous Industrial Byproduct',
    image: '/src/assets/images/material_metal_alloy_1791194232588.jpg',
    fallbackIconType: 'metal',
    status: 'Available',
    publishedDate: '2026-09-18',
    technicalDescription: 'Centrifuged and solvent-degreased Ti-6Al-4V Grade 5 machining chips and solids from 5-axis wing spar milling. Magnetic separation processed to remove iron tramp elements. Density: 4.43 g/cm³. Certified single-alloy segregation lot.',
    handlingPrecautions: 'Store in dry indoor inert drums. Prevent direct exposure to open sparks. Drum desiccants included.'
  },
  {
    id: 'mat-003',
    title: 'Post-Industrial Polypropylene Copolymer Resin Flakes (MFI 14-16)',
    category: 'Polymers & Composites',
    subCategory: 'Automotive Grade PP Pellets/Flakes',
    wasteCode: 'EWC 07 02 13',
    generator: {
      name: 'Magnaform Component Systems',
      facilityLocation: 'Ghent Industrial Zone',
      country: 'Belgium',
      lat: 51.0543,
      lng: 3.7174,
      verifiedGenerator: true,
      certifications: ['ISCC PLUS', 'ISO 14001', 'IATF 16949'],
      establishedYear: 2002,
      contactPerson: 'Camille De Smet',
      contactEmail: 'c.desmet@magnaform.be'
    },
    monthlyVolumeMT: 320,
    minLotSizeMT: 18,
    form: 'Pellets / Granules',
    purityPercent: 99.4,
    moistureContentPercent: 0.08,
    targetDownstreamIndustries: [
      'Heavy-duty Logistics Pallet & Crate Molding',
      'Under-the-hood Automotive Battery Casings',
      'Industrial Storage Tote Boxes',
      'Corrugated Drainage Pipe Extrusion'
    ],
    chemicalAssay: [
      { component: 'Polypropylene Base Polymer', valuePercent: 92.4, unit: '%' },
      { component: 'Ethylene-Propylene Rubber Impact Modifier', valuePercent: 7.2, unit: '%' },
      { component: 'Phenolic Heat Stabilizers', valuePercent: 0.35, unit: '%' },
      { component: 'Carbon Black Pigment', valuePercent: 0.05, unit: '%' }
    ],
    contaminantThresholds: [
      { parameter: 'Foreign Polyethylene (PE) Trace', detectedPpm: 1200, maxAllowedPpm: 4000, status: 'Pass' },
      { parameter: 'Moisture Content', detectedPpm: 60, maxAllowedPpm: 200, status: 'Pass' },
      { parameter: 'Ash Content @ 600°C', detectedPpm: 800, maxAllowedPpm: 1500, status: 'Pass' }
    ],
    pricePerMT: 890,
    currency: 'EUR',
    priceType: 'Fixed Price',
    sampleBatchAvailable: true,
    sampleBatchSizeKg: 15,
    samplePrice: 0,
    labVerification: {
      verified: true,
      accreditedLab: 'TÜV SÜD',
      testReportNumber: 'TUV-SUD-POLY-26-891',
      issueDate: '2026-08-28',
      expiryDate: '2027-08-28',
      sha256VerificationHash: '5e6f7a8b9c0d1e2f3a4b5c6d7e8f90123456789abcdef0123456789abcdef012',
      testedParametersCount: 18,
      badge: 'Gold Tier (Full Assayed)',
      chainOfCustodyVerified: true
    },
    sustainabilityCredentials: {
      emissionsAvoidedPerMT: 1840,
      virginMaterialSubstituted: 'Virgin Fossil Naphtha-derived Polypropylene',
      waterSavedM3PerMT: 14.5,
      circularityScore: 92,
      landfillDiversionRatePercent: 100,
      iso14021Compliant: true,
      euCsrdEligible: true,
      scope3GwpSavingsPercent: 74
    },
    logisticsTerms: 'Delivered at Place (DAP)',
    hazmatClassification: 'Non-Hazardous Industrial Byproduct',
    image: '/src/assets/images/material_polymer_pellets_1791194242960.jpg',
    fallbackIconType: 'polymer',
    status: 'Available',
    publishedDate: '2026-09-22',
    technicalDescription: 'Clean internal regrind from unpainted automotive bumper fascia molding runners and edge trimmings. Pelletized through 40-mesh melt filtration. Melt Flow Index (MFI): 15.2 g/10min (230°C/2.16kg). Charpy notched impact strength: 8.5 kJ/m².',
    handlingPrecautions: 'Store in standard dry 1-ton Octabins or silos with nitrogen blanketing if held longer than 6 months.'
  },
  {
    id: 'mat-004',
    title: 'High-Purity Reclaimed Isopropanol (IPA 99.2%)',
    category: 'Chemical & Solvents',
    subCategory: 'Distilled Industrial Solvents',
    wasteCode: 'EWC 14 06 03*',
    generator: {
      name: 'SilicoSem Fab Clean Systems',
      facilityLocation: 'Dresden Silicon Saxony',
      country: 'Germany',
      lat: 51.0504,
      lng: 13.7373,
      verifiedGenerator: true,
      certifications: ['ISO 14001', 'EMAS', 'REACH Registered'],
      establishedYear: 2011,
      contactPerson: 'Klaus Weidemann',
      contactEmail: 'k.weidemann@silicosem.de'
    },
    monthlyVolumeMT: 210,
    minLotSizeMT: 20,
    form: 'Liquid Bulk',
    purityPercent: 99.2,
    moistureContentPercent: 0.6,
    targetDownstreamIndustries: [
      'Industrial Primer & Automotive Topcoat Formulation',
      'Heavy Equipment Surface Degreasing Agents',
      'Printing Ink Formulations & Flexographic Solvents',
      'Wind Turbine Blade Epoxy Thinners'
    ],
    chemicalAssay: [
      { component: 'Isopropanol (IPA)', valuePercent: 99.2, unit: '%' },
      { component: 'Water (H2O)', valuePercent: 0.6, unit: '%' },
      { component: 'Ethanol / Methanol Traces', valuePercent: 0.15, unit: '%' },
      { component: 'Heavy Hydrocarbons', valuePercent: 0.05, unit: '%' }
    ],
    contaminantThresholds: [
      { parameter: 'Total Dissolved Solids (TDS)', detectedPpm: 12, maxAllowedPpm: 50, status: 'Pass' },
      { parameter: 'Halogenated Solvents (Cl/Br)', detectedPpm: 0.4, maxAllowedPpm: 2.0, status: 'Pass' },
      { parameter: 'Acidity (as Acetic Acid)', detectedPpm: 15, maxAllowedPpm: 30, status: 'Pass' }
    ],
    pricePerMT: 740,
    currency: 'EUR',
    priceType: 'Tender / Sealed Bid',
    sampleBatchAvailable: true,
    sampleBatchSizeKg: 5,
    samplePrice: 0,
    labVerification: {
      verified: true,
      accreditedLab: 'Eurofins',
      testReportNumber: 'EUF-SOLV-2026-1184',
      issueDate: '2026-09-10',
      expiryDate: '2027-03-10',
      sha256VerificationHash: '9c0d1e2f3a4b5c6d7e8f90123456789abcdef0123456789abcdef0123456789ab',
      testedParametersCount: 22,
      badge: 'Gold Tier (Full Assayed)',
      chainOfCustodyVerified: true
    },
    sustainabilityCredentials: {
      emissionsAvoidedPerMT: 2150,
      virginMaterialSubstituted: 'Virgin Propylene-Derived Isopropanol',
      waterSavedM3PerMT: 8.2,
      circularityScore: 96,
      landfillDiversionRatePercent: 100,
      iso14021Compliant: true,
      euCsrdEligible: true,
      scope3GwpSavingsPercent: 82
    },
    logisticsTerms: 'Ex-Works (EXW)',
    hazmatClassification: 'Class 3 Flammable',
    image: '/src/assets/images/hero_industrial_symbiosis_1791194219706.jpg',
    fallbackIconType: 'chemical',
    status: 'Available',
    publishedDate: '2026-09-25',
    technicalDescription: 'Distilled by-product solvent stream from wafer rinsing processes, processed through twin fractional distillation columns with molecular sieve de-watering. Clear water-white liquid, boiling range 81.8 - 82.8°C.',
    handlingPrecautions: 'ADR Class 3 UN 1219 PG II. Dedicated stainless steel road tanker loading bay with vapor return line.'
  },
  {
    id: 'mat-005',
    title: 'Low-Carbon Kraft Lignin Biopolymer Powder (Sulfonated)',
    category: 'Bio-Agri Residuals',
    subCategory: 'Bio-refinery By-products',
    wasteCode: 'EWC 03 03 99',
    generator: {
      name: 'NordicBio Pulp & Board Group',
      facilityLocation: 'Karlstad Bio-Cluster',
      country: 'Sweden',
      lat: 59.4022,
      lng: 13.5115,
      verifiedGenerator: true,
      certifications: ['FSC Chain of Custody', 'PEFC', 'ISO 50001', 'ISO 14001'],
      establishedYear: 1964,
      contactPerson: 'Astrid Lindqvist',
      contactEmail: 'a.lindqvist@nordicbio.se'
    },
    monthlyVolumeMT: 450,
    minLotSizeMT: 25,
    form: 'Pellets / Granules',
    purityPercent: 97.8,
    moistureContentPercent: 3.2,
    targetDownstreamIndustries: [
      'Formaldehyde-Free Wood Adhesive & Plywood Binders',
      'Concrete Superplasticizers & Dispersants',
      'Carbon Fiber Precursor Synthesis',
      'Bio-Bitumen Road Surfacing'
    ],
    chemicalAssay: [
      { component: 'Total Lignin Content', valuePercent: 95.2, unit: '%' },
      { component: 'Ash (Inorganic Salts)', valuePercent: 2.1, unit: '%' },
      { component: 'Sulfur Content', valuePercent: 1.8, unit: '%' },
      { component: 'Carbohydrates (Residual Hemicellulose)', valuePercent: 0.8, unit: '%' }
    ],
    contaminantThresholds: [
      { parameter: 'Residual Sodium (Na)', detectedPpm: 4500, maxAllowedPpm: 8000, status: 'Pass' },
      { parameter: 'Chlorides (Cl-)', detectedPpm: 280, maxAllowedPpm: 600, status: 'Pass' },
      { parameter: 'Volatile Organic Matter', detectedPpm: 310, maxAllowedPpm: 1000, status: 'Pass' }
    ],
    pricePerMT: 620,
    currency: 'EUR',
    priceType: 'Off-take Contract',
    sampleBatchAvailable: true,
    sampleBatchSizeKg: 10,
    samplePrice: 0,
    labVerification: {
      verified: true,
      accreditedLab: 'Bureau Veritas',
      testReportNumber: 'BV-BIO-2026-7731',
      issueDate: '2026-08-20',
      expiryDate: '2027-08-20',
      sha256VerificationHash: '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f90123456789abcdef0123456789a',
      testedParametersCount: 20,
      badge: 'Gold Tier (Full Assayed)',
      chainOfCustodyVerified: true
    },
    sustainabilityCredentials: {
      emissionsAvoidedPerMT: 1680,
      virginMaterialSubstituted: 'Fossil Phenol & Polycondensate Resins',
      waterSavedM3PerMT: 22.0,
      circularityScore: 97,
      landfillDiversionRatePercent: 100,
      iso14021Compliant: true,
      euCsrdEligible: true,
      scope3GwpSavingsPercent: 88
    },
    logisticsTerms: 'Free on Board (FOB)',
    hazmatClassification: 'Non-Hazardous Industrial Byproduct',
    image: '/src/assets/images/material_polymer_pellets_1791194242960.jpg',
    fallbackIconType: 'bio',
    status: 'Available',
    publishedDate: '2026-09-14',
    technicalDescription: 'LignoBoost precipitated and washed Kraft lignin powder from certified Scandinavian softwood black liquor. Dark brown free-flowing micro-granules with high aromaticity and reactivity for chemical substitution in thermoset resin matrices.',
    handlingPrecautions: 'Organic dust explosion prevention. Ensure dust extraction systems comply with ATEX Zone 22.'
  },
  {
    id: 'mat-006',
    title: 'Class F Pulverized Fuel Fly Ash (Finely Micronized)',
    category: 'Mineral & Construction',
    subCategory: 'Pozzolanic Mineral Feedstock',
    wasteCode: 'EWC 10 01 02',
    generator: {
      name: 'VattenSilesia Energy Cluster',
      facilityLocation: 'Katowice Power Complex',
      country: 'Poland',
      lat: 50.2649,
      lng: 19.0238,
      verifiedGenerator: true,
      certifications: ['EN 450-1 CE Marked', 'ISO 9001', 'ISO 14001'],
      establishedYear: 1989,
      contactPerson: 'Stanisław Kowal',
      contactEmail: 's.kowal@vattensilesia.pl'
    },
    monthlyVolumeMT: 2800,
    minLotSizeMT: 60,
    form: 'Granular Aggregate',
    purityPercent: 98.9,
    moistureContentPercent: 0.15,
    targetDownstreamIndustries: [
      'Low-Carbon Ready-Mix Concrete',
      'Structural Grout & Mine Backfill Stabilization',
      'Alkali-Activated Geopolymer Pavers',
      'Ceramic Lightweight Aggregate Sintering'
    ],
    chemicalAssay: [
      { component: 'Silicon Dioxide (SiO2)', valuePercent: 51.4, unit: '%' },
      { component: 'Aluminium Oxide (Al2O3)', valuePercent: 26.2, unit: '%' },
      { component: 'Iron Oxide (Fe2O3)', valuePercent: 8.6, unit: '%' },
      { component: 'Calcium Oxide (CaO reactive)', valuePercent: 4.8, unit: '%' },
      { component: 'Loss on Ignition (LOI carbon)', valuePercent: 2.3, unit: '%' }
    ],
    contaminantThresholds: [
      { parameter: 'Loss on Ignition (Unburnt Carbon)', detectedPpm: 23000, maxAllowedPpm: 50000, status: 'Pass' },
      { parameter: 'Sulfate content (SO3)', detectedPpm: 8500, maxAllowedPpm: 30000, status: 'Pass' },
      { parameter: 'Chloride Content (Cl-)', detectedPpm: 120, maxAllowedPpm: 1000, status: 'Pass' }
    ],
    pricePerMT: 19.0,
    currency: 'EUR',
    priceType: 'Fixed Price',
    sampleBatchAvailable: true,
    sampleBatchSizeKg: 20,
    samplePrice: 0,
    labVerification: {
      verified: true,
      accreditedLab: 'SGS Industrial Services',
      testReportNumber: 'SGS-PL-2026-5502',
      issueDate: '2026-08-11',
      expiryDate: '2027-08-11',
      sha256VerificationHash: '6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f90123456789abcdef0',
      testedParametersCount: 19,
      badge: 'Gold Tier (Full Assayed)',
      chainOfCustodyVerified: true
    },
    sustainabilityCredentials: {
      emissionsAvoidedPerMT: 840,
      virginMaterialSubstituted: 'Ordinary Portland Cement (CEM I Clinker)',
      waterSavedM3PerMT: 3.5,
      circularityScore: 95,
      landfillDiversionRatePercent: 100,
      iso14021Compliant: true,
      euCsrdEligible: true,
      scope3GwpSavingsPercent: 86
    },
    logisticsTerms: 'Ex-Works (EXW)',
    hazmatClassification: 'Non-Hazardous Industrial Byproduct',
    image: '/src/assets/images/material_mineral_aggregate_1791194253255.jpg',
    fallbackIconType: 'mineral',
    status: 'Available',
    publishedDate: '2026-09-08',
    technicalDescription: 'Siliceous Class F fly ash collected by electrostatic precipitators, processed through air classifier to guarantee fineness Category N (retained on 45µm sieve < 12%). Excellent pozzolanic activity index (>85% at 28 days).',
    handlingPrecautions: 'Standard bulk pneumatic tanker discharge. Closed silo storage required.'
  },
  {
    id: 'mat-007',
    title: 'Spent Foundry Silica Sand (Thermal Reclamation Grade)',
    category: 'Mineral & Construction',
    subCategory: 'Recycled Foundry Sand (RFS)',
    wasteCode: 'EWC 10 09 08',
    generator: {
      name: 'Stuttgart Motor Foundry & Castings',
      facilityLocation: 'Stuttgart-Untertürkheim',
      country: 'Germany',
      lat: 48.7758,
      lng: 9.1829,
      verifiedGenerator: true,
      certifications: ['ISO 14001', 'ISO 50001', 'VDA 6.2'],
      establishedYear: 1972,
      contactPerson: 'Markus Eder',
      contactEmail: 'm.eder@stuttgart-foundry.com'
    },
    monthlyVolumeMT: 620,
    minLotSizeMT: 30,
    form: 'Granular Aggregate',
    purityPercent: 98.2,
    moistureContentPercent: 0.4,
    targetDownstreamIndustries: [
      'Hot Mix Asphalt Fine Aggregate',
      'Structural Flowable Fill & Soil Cement',
      'Portland Cement Raw Meal Silica Source',
      'Clay Brick & Ceramic Tile Extrusion'
    ],
    chemicalAssay: [
      { component: 'Silicon Dioxide (SiO2)', valuePercent: 94.8, unit: '%' },
      { component: 'Aluminium Oxide (Al2O3)', valuePercent: 2.1, unit: '%' },
      { component: 'Iron Oxide (Fe2O3)', valuePercent: 0.9, unit: '%' },
      { component: 'Residual Bentonite Clay', valuePercent: 1.6, unit: '%' }
    ],
    contaminantThresholds: [
      { parameter: 'Total Organic Carbon (TOC)', detectedPpm: 2100, maxAllowedPpm: 5000, status: 'Pass' },
      { parameter: 'Phenols (Leachable)', detectedPpm: 0.08, maxAllowedPpm: 0.5, status: 'Pass' },
      { parameter: 'Free Metallic Tramp Iron', detectedPpm: 45, maxAllowedPpm: 200, status: 'Pass' }
    ],
    pricePerMT: 14.0,
    currency: 'EUR',
    priceType: 'Fixed Price',
    sampleBatchAvailable: true,
    sampleBatchSizeKg: 20,
    samplePrice: 0,
    labVerification: {
      verified: true,
      accreditedLab: 'TÜV SÜD',
      testReportNumber: 'TUV-SUD-SAND-26-3011',
      issueDate: '2026-08-05',
      expiryDate: '2027-08-05',
      sha256VerificationHash: '7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f90123456789abcdef012',
      testedParametersCount: 16,
      badge: 'Silver Tier (Standard COA)',
      chainOfCustodyVerified: true
    },
    sustainabilityCredentials: {
      emissionsAvoidedPerMT: 45,
      virginMaterialSubstituted: 'Virgin Quarried Silica Sand',
      waterSavedM3PerMT: 1.2,
      circularityScore: 91,
      landfillDiversionRatePercent: 100,
      iso14021Compliant: true,
      euCsrdEligible: true,
      scope3GwpSavingsPercent: 68
    },
    logisticsTerms: 'Ex-Works (EXW)',
    hazmatClassification: 'Non-Hazardous Industrial Byproduct',
    image: '/src/assets/images/material_mineral_aggregate_1791194253255.jpg',
    fallbackIconType: 'mineral',
    status: 'Available',
    publishedDate: '2026-09-17',
    technicalDescription: 'Thermally treated and cyclonically scrubbed green-sand from gray iron engine block casting lines. Granulometry: AFS Fineness number 52-56. High thermal stability with uniform grain size distribution (sub-angular grains).',
    handlingPrecautions: 'Standard silica sand dust control. Enclosed conveyance recommended.'
  },
  {
    id: 'mat-008',
    title: 'Recycled Continuous Carbon Fiber Uncured Offcuts & Spool Remnants',
    category: 'Polymers & Composites',
    subCategory: 'Structural Carbon Fiber Intermediate',
    wasteCode: 'EWC 07 02 99',
    generator: {
      name: 'SkyTech Composite Structures',
      facilityLocation: 'Derby Advanced Manufacturing Park',
      country: 'United Kingdom',
      lat: 52.9225,
      lng: -1.4746,
      verifiedGenerator: true,
      certifications: ['AS9100 Rev D', 'ISO 14001'],
      establishedYear: 2008,
      contactPerson: 'David Alistair',
      contactEmail: 'd.alistair@skytech-aero.co.uk'
    },
    monthlyVolumeMT: 14,
    minLotSizeMT: 1,
    form: 'Baled Fibers',
    purityPercent: 99.8,
    moistureContentPercent: 0.1,
    targetDownstreamIndustries: [
      'Injection Moldable Chopped Carbon/PA66 Pellets',
      'Non-Woven Carbon Veils & Conductive Mats',
      'High-Performance Sporting Goods (Bicycles, Rackets)',
      'Automotive Lightweight Battery Tray Compression Molding'
    ],
    chemicalAssay: [
      { component: 'Polyacrylonitrile (PAN) Based Carbon Fiber', valuePercent: 96.5, unit: '%' },
      { component: 'Epoxy Reactive Sizing Agent', valuePercent: 2.8, unit: '%' },
      { component: 'Residual Moisture / Trace Sizing', valuePercent: 0.7, unit: '%' }
    ],
    contaminantThresholds: [
      { parameter: 'Foreign Polymeric Fibers (Glass/Aramid)', detectedPpm: 0, maxAllowedPpm: 50, status: 'Pass' },
      { parameter: 'Metal Particle Contamination', detectedPpm: 0, maxAllowedPpm: 10, status: 'Pass' },
      { parameter: 'Volatile Organics', detectedPpm: 180, maxAllowedPpm: 500, status: 'Pass' }
    ],
    pricePerMT: 6800,
    currency: 'USD',
    priceType: 'Fixed Price',
    sampleBatchAvailable: true,
    sampleBatchSizeKg: 2,
    samplePrice: 80,
    labVerification: {
      verified: true,
      accreditedLab: 'Bureau Veritas',
      testReportNumber: 'BV-COMP-2026-0912',
      issueDate: '2026-09-04',
      expiryDate: '2027-09-04',
      sha256VerificationHash: '2f3a4b5c6d7e8f90123456789abcdef0123456789abcdef0123456789abcdef0',
      testedParametersCount: 14,
      badge: 'Gold Tier (Full Assayed)',
      chainOfCustodyVerified: true
    },
    sustainabilityCredentials: {
      emissionsAvoidedPerMT: 22000,
      virginMaterialSubstituted: 'Virgin PAN Precursor Carbon Fiber',
      waterSavedM3PerMT: 65.0,
      circularityScore: 99,
      landfillDiversionRatePercent: 100,
      iso14021Compliant: true,
      euCsrdEligible: true,
      scope3GwpSavingsPercent: 93
    },
    logisticsTerms: 'Ex-Works (EXW)',
    hazmatClassification: 'Non-Hazardous Industrial Byproduct',
    image: '/src/assets/images/material_metal_alloy_1791194232588.jpg',
    fallbackIconType: 'polymer',
    status: 'Available',
    publishedDate: '2026-09-20',
    technicalDescription: 'Clean dry carbon fiber fabric selvages and spool ends from aerospace automated fiber placement (AFP) cells. Tensile modulus: 230-240 GPa. Single-source traceability with zero matrix curing. Baled in moisture-barrier bags.',
    handlingPrecautions: 'Wear nitrile gloves and dust mask. Conductive carbon dust requires spark-proof vacuum equipment.'
  }
];

export const SYMBIOSIS_PAIRS: SymbiosisPair[] = [
  {
    id: 'sym-01',
    sourceIndustry: 'Steelmaking & Metallurgical Smelting',
    byproductName: 'Electric Arc Furnace Slag',
    targetIndustry: 'Green Cement & Concrete',
    application: 'Full clinker replacement in alkali-activated geopolymer concrete and asphalt binders',
    ghgReductionPercent: 78,
    costSavingsPercent: 45,
    readinessLevel: 'TRL 9 (Commercial Standard)',
    activeListingsCount: 14
  },
  {
    id: 'sym-02',
    sourceIndustry: 'Semiconductor & Microelectronics Fab',
    byproductName: 'High-Purity Recovered Solvents (IPA/Acetone)',
    targetIndustry: 'Automotive Coatings & Industrial Degreasing',
    application: 'Solvent carrier formulation for topcoats and marine anti-fouling primers',
    ghgReductionPercent: 82,
    costSavingsPercent: 38,
    readinessLevel: 'TRL 9 (Commercial Standard)',
    activeListingsCount: 6
  },
  {
    id: 'sym-03',
    sourceIndustry: 'Automotive & Aerospace Machining',
    byproductName: 'Titanium & Nickel Superalloy Swarf/Turnings',
    targetIndustry: 'Additive Manufacturing & Secondary Melting',
    application: 'Plasma gas atomization into spherical powder for 3D metal printing',
    ghgReductionPercent: 91,
    costSavingsPercent: 52,
    readinessLevel: 'TRL 8 (Industrial Qualification)',
    activeListingsCount: 8
  },
  {
    id: 'sym-04',
    sourceIndustry: 'Kraft Pulp & Paper Mills',
    byproductName: 'Precipitated Kraft Lignin',
    targetIndustry: 'Wood Engineered Panels & Bio-Adhesives',
    application: 'Phenol formaldehyde replacement in structural plywood and OSB resins',
    ghgReductionPercent: 88,
    costSavingsPercent: 32,
    readinessLevel: 'TRL 9 (Commercial Standard)',
    activeListingsCount: 5
  },
  {
    id: 'sym-05',
    sourceIndustry: 'Iron & Aluminum Foundries',
    byproductName: 'Spent Silica Sand (Thermal Reclaimed)',
    targetIndustry: 'Roadway Infrastructure & Asphalt Paving',
    application: 'Fine aggregate substitution in hot mix asphalt base and flowable backfill',
    ghgReductionPercent: 68,
    costSavingsPercent: 60,
    readinessLevel: 'TRL 9 (Commercial Standard)',
    activeListingsCount: 11
  },
  {
    id: 'sym-06',
    sourceIndustry: 'Aerospace Composite Fabrication',
    byproductName: 'Uncured Dry Carbon Fiber Offcuts',
    targetIndustry: 'Injection Molded Thermoplastics',
    application: 'Milled short-fiber reinforcement in PA66 and PEEK for automotive lightweighting',
    ghgReductionPercent: 93,
    costSavingsPercent: 55,
    readinessLevel: 'TRL 9 (Commercial Standard)',
    activeListingsCount: 4
  }
];

export const INITIAL_SAMPLE_REQUESTS: SampleRequest[] = [
  {
    id: 'smp-101',
    listingId: 'mat-001',
    materialTitle: 'Electric Arc Furnace (EAF) Slag Aggregate (0-22mm)',
    requesterCompany: 'EcoBuild Infrastructure Corp',
    destinationFacility: 'Rotterdam Pre-cast Concrete Plant',
    sampleQuantityKg: 25,
    intendedApplication: 'Pilot geopolymer pavement casting trial for port crane terminal',
    status: 'Lab Testing In-Progress',
    trackingNumber: 'DHL-EX-992182741',
    courier: 'DHL Freight Industrial',
    requestedAt: '2026-09-28',
    notes: 'Sample received at Eurofins bench; alkali activation kinetics under test.'
  },
  {
    id: 'smp-102',
    listingId: 'mat-002',
    materialTitle: 'Aerospace Grade Titanium Ti-6Al-4V Turnings',
    requesterCompany: 'HyperAlloy Additive Powders GmbH',
    destinationFacility: 'Erlangen Plasma Atomization Facility',
    sampleQuantityKg: 10,
    intendedApplication: 'Electrode Induction Melting Inert Gas Atomization test run',
    status: 'Sample Dispatched',
    trackingNumber: 'FEDEX-CARGO-44109',
    courier: 'FedEx Priority Freight',
    requestedAt: '2026-10-01',
    notes: 'In-transit from Toulouse hub with dry argon drum seal.'
  },
  {
    id: 'smp-103',
    listingId: 'mat-004',
    materialTitle: 'High-Purity Reclaimed Isopropanol (IPA 99.2%)',
    requesterCompany: 'AkzoIndustrial Formulations',
    destinationFacility: 'Wuppertal Primer Synthesis Center',
    sampleQuantityKg: 5,
    intendedApplication: 'Compatibility assay in 2K polyurethane heavy duty primer',
    status: 'Specs Accepted',
    trackingNumber: 'SCHENKER-HAZ-2910',
    courier: 'DB Schenker HazMat',
    requestedAt: '2026-09-19',
    notes: 'Purity confirmed at 99.3%. Ready for 40 MT monthly off-take negotiation.'
  }
];

export const INITIAL_CONTRACT_OFFERS: ContractOffer[] = [
  {
    id: 'off-501',
    listingId: 'mat-004',
    materialTitle: 'High-Purity Reclaimed Isopropanol (IPA 99.2%)',
    buyerCompany: 'AkzoIndustrial Formulations',
    sellerCompany: 'SilicoSem Fab Clean Systems',
    offeredPricePerMT: 715,
    requestedVolumeMT: 60,
    deliveryTerms: 'Ex-Works (EXW)',
    status: 'Submitted',
    createdAt: '2026-10-02',
    notes: 'Firm 12-month supply agreement with bi-monthly SGS purity certificates.'
  },
  {
    id: 'off-502',
    listingId: 'mat-003',
    materialTitle: 'Post-Industrial Polypropylene Copolymer Resin Flakes',
    buyerCompany: 'EuroPallet Logistics Systems',
    sellerCompany: 'Magnaform Component Systems',
    offeredPricePerMT: 870,
    requestedVolumeMT: 120,
    deliveryTerms: 'Delivered at Place (DAP)',
    status: 'Accepted',
    createdAt: '2026-09-29',
    notes: 'Contract validated with escrow milestone guarantee on lot MFI consistency.'
  }
];
