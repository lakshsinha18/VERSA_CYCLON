export type CategoryType = 'Severe Cyclonic Storm' | 'Very Severe Cyclonic Storm' | 'Extremely Severe Cyclonic Storm' | 'Super Cyclonic Storm' | 'Deep Depression';

export type TimelineStep = 'T-48H' | 'T-36H' | 'T-24H' | 'T-12H' | 'T-6H' | 'LANDFALL' | 'T+6H' | 'T+12H';

export interface CyclonePoint {
  id: string;
  step: TimelineStep;
  timestamp: string;
  lat: number;
  lng: number;
  maxWindKmH: number;
  centralPressureHpa: number;
  movementDir: string;
  movementSpeedKmH: number;
  category: CategoryType;
  landfallEtaHours: number;
  radiusKm: {
    wind64kt: number;
    wind50kt: number;
    wind34kt: number;
  };
  forecastCone: { lat: number; lng: number; radiusKm: number }[];
}

export interface EnsembleModelForecast {
  modelId: string;
  name: string;
  provider: string;
  color: string;
  trackErrorKm: number;
  predictedWindKmH: number;
  predictedRainfallMm: number;
  predictedSurgeM: number;
  confidence: number;
  path: { lat: number; lng: number }[];
}

export interface WeatherRegimeProbability {
  id: string;
  name: string;
  probability: number;
  description: string;
  isActive: boolean;
}

export interface AIExpert {
  id: string;
  name: string;
  role: string;
  status: 'ACTIVE' | 'STANDBY' | 'MONITORING';
  weight: number; // 0 to 1
  accuracyScore: number; // %
  description: string;
}

export interface ForecastMetricCorrection {
  metric: 'RAIN' | 'WIND' | 'FLOOD_DEPTH' | 'SURGE_HEIGHT';
  label: string;
  raw: number;
  corrected: number;
  unit: string;
  correctionPercent: number;
  confidence: number;
  systematicBiasReason: string;
}

export interface DataSourceTrust {
  id: string;
  name: string;
  type: 'Satellite' | 'Ground Station' | 'Radar' | 'Ocean Buoy' | 'GIS Infrastructure' | 'Historical';
  reliabilityScore: number; // %
  status: 'OPTIMAL' | 'DEGRADED' | 'CONFLICT_DETECTED' | 'MISSING_DATA';
  lastUpdated: string;
  freshness: string;
  outliersCount: number;
  conflictDetails?: {
    satelliteValue: string;
    groundValue: string;
    aiWeightedValue: string;
    resolutionExplanation: string;
  };
}

export type AssetType = 'Substation' | 'Hospital' | 'Bridge' | 'Road' | 'School' | 'Telecom' | 'Water' | 'Building';
export type CriticalityLevel = 'Critical' | 'High' | 'Moderate' | 'Low';
export type ActionStatus = 'Immediate Action' | 'Monitor' | 'Pre-positioned' | 'Safe';

export interface InfrastructureAsset {
  id: string;
  name: string;
  type: AssetType;
  lat: number;
  lng: number;
  hazardExposure: string;
  failureProbability: number;
  confidence: number;
  criticality: CriticalityLevel;
  expectedImpact: 'Very High' | 'High' | 'Moderate' | 'Low';
  elevationMeters: number;
  floodExposureMeters: number;
  windExposureKmH: number;
  ageYears: number;
  historicalIncidents: number;
  status: ActionStatus;
  populationAffected: number;
  riskDrivers: {
    windExposure: number;
    floodExposure: number;
    elevation: number;
    infrastructureAge: number;
    historicalDamage: number;
  };
  fingerprint: {
    constructionType: 'Known' | 'Estimated' | 'Unknown';
    elevation: 'Known' | 'Estimated' | 'Unknown';
    structuralCondition: 'Known' | 'Estimated' | 'Unknown';
    maintenanceStatus: 'Known' | 'Estimated' | 'Unknown';
    knownCount: number;
    estimatedCount: number;
    unknownCount: number;
  };
  recommendedAction: string;
}

export interface SimulationScenario {
  id: string;
  title: string;
  description: string;
  trackShiftKm: number;
  rainfallIncreasePct: number;
  windSpeedKmH: number;
  landfallTimeShiftHours: number;
  surgeIncreaseMeters: number;
}

export interface HumanInTheLoopDecision {
  id: string;
  timestamp: string;
  recommendationId: string;
  recommendationTitle: string;
  targetAssetOrZone: string;
  priority: 'PRIORITY 1' | 'PRIORITY 2' | 'PRIORITY 3' | 'PRIORITY 4' | 'PRIORITY 5';
  status: 'PENDING' | 'ACCEPTED' | 'MODIFIED' | 'REJECTED';
  modifiedNotes?: string;
  officialUser: string;
}

export interface AIInsightItem {
  id: string;
  timestamp: string;
  category: 'REGIME' | 'HAZARD' | 'INFRASTRUCTURE' | 'UNCERTAINTY' | 'TRUST';
  title: string;
  description: string;
  importance: 'CRITICAL' | 'WARNING' | 'INFO';
  confidence: number;
  whyExplanation: string;
}

export interface StateAtTimeline {
  step: TimelineStep;
  cyclone: CyclonePoint;
  regimes: WeatherRegimeProbability[];
  experts: AIExpert[];
  corrections: ForecastMetricCorrection[];
  ensemble: EnsembleModelForecast[];
  trustSources: DataSourceTrust[];
  infrastructure: InfrastructureAsset[];
  uncertainty: {
    trackKm: number;
    rainfallMm: number;
    windKmH: number;
    floodDepthM: number;
    overallConfidence: number;
    governorLevel: 'HIGH CONFIDENCE' | 'MEDIUM CONFIDENCE' | 'LOW CONFIDENCE';
    explanation: string;
  };
  hazards: {
    wind: { level: 'Moderate' | 'High' | 'Extreme'; prob: number; confidence: number; value: string };
    rainfall: { level: 'Moderate' | 'High' | 'Extreme'; prob: number; confidence: number; value: string };
    flood: { level: 'Moderate' | 'High' | 'Extreme'; prob: number; confidence: number; value: string };
    surge: { level: 'Moderate' | 'High' | 'Extreme'; prob: number; confidence: number; value: string };
    landslide: { level: 'Low' | 'Moderate' | 'High' | 'Extreme'; prob: number; confidence: number; value: string };
  };
  responseStats: {
    populationAtRisk: number;
    criticalRiskPopulation: number;
    sheltersActive: number;
    shelterCapacity: number;
    evacuationCompletionPct: number;
    connectivityPct: number;
    isolatedVillagesCount: number;
    cutoffHospitalsCount: number;
  };
  insights: AIInsightItem[];
  decisions: HumanInTheLoopDecision[];
}
