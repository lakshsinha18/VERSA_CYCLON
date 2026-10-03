import type {
  TimelineStep,
  CyclonePoint,
  EnsembleModelForecast,
  WeatherRegimeProbability,
  AIExpert,
  ForecastMetricCorrection,
  DataSourceTrust,
  InfrastructureAsset,
  AIInsightItem,
  HumanInTheLoopDecision,
  StateAtTimeline
} from '../types';

export { StateAtTimeline };

export const TIMELINE_STEPS: TimelineStep[] = [
  'T-48H',
  'T-36H',
  'T-24H',
  'T-12H',
  'T-6H',
  'LANDFALL',
  'T+6H',
  'T+12H'
];

export const MOCK_TIMELINE_DATA: Record<TimelineStep, StateAtTimeline> = {
  'T-48H': {
    step: 'T-48H',
    cyclone: {
      id: 'vayu-x-t48',
      step: 'T-48H',
      timestamp: '2026-10-01 14:00 UTC',
      lat: 15.2,
      lng: 88.5,
      maxWindKmH: 85,
      centralPressureHpa: 994,
      movementDir: 'NW',
      movementSpeedKmH: 14,
      category: 'Deep Depression',
      landfallEtaHours: 48,
      radiusKm: { wind64kt: 30, wind50kt: 70, wind34kt: 160 },
      forecastCone: [
        { lat: 15.2, lng: 88.5, radiusKm: 40 },
        { lat: 16.5, lng: 86.8, radiusKm: 75 },
        { lat: 18.2, lng: 84.8, radiusKm: 120 },
        { lat: 19.5, lng: 84.0, radiusKm: 160 }
      ]
    },
    regimes: [
      { id: '1', name: 'Formation & Tropical Genesis', probability: 82, description: 'Early vortex organization and convective clustering', isActive: true },
      { id: '2', name: 'Rapid Intensification', probability: 45, description: 'Favorable sea surface temperatures >30°C and low wind shear', isActive: false },
      { id: '3', name: 'Peak Intensity Ocean Trajectory', probability: 18, description: 'Deep sea strength amplification', isActive: false },
      { id: '4', name: 'Coastal Approach & Pre-Landfall', probability: 10, description: 'Braking effect and coastal interaction', isActive: false },
      { id: '5', name: 'Extreme Precipitation Regime', probability: 28, description: 'Moisture plume transport over coastal belt', isActive: false },
      { id: '6', name: 'Landfall Transition', probability: 5, description: 'Eye friction and storm surge peak', isActive: false },
      { id: '7', name: 'Post-Landfall Decay', probability: 2, description: 'Overland friction decay', isActive: false }
    ],
    experts: [
      { id: 'exp-1', name: 'Vortex Track Expert (ML-GNN)', role: 'Deep Ocean Trajectory', status: 'ACTIVE', weight: 0.45, accuracyScore: 94, description: 'Prioritized for track genesis' },
      { id: 'exp-2', name: 'Rainfall Convection Expert (CNN-LSTM)', role: 'Precipitation Dynamics', status: 'ACTIVE', weight: 0.25, accuracyScore: 89, description: 'Monitoring convective bands' },
      { id: 'exp-3', name: 'Hydrological Flood Expert (Physics-AI)', role: 'River & Basin Inundation', status: 'STANDBY', weight: 0.10, accuracyScore: 86, description: 'Low coastal threat at T-48' },
      { id: 'exp-4', name: 'Storm Surge Expert (SLOSH + AI)', role: 'Coastal Ocean Surge', status: 'STANDBY', weight: 0.05, accuracyScore: 91, description: 'Awaiting T-24 proximity' },
      { id: 'exp-5', name: 'Infrastructure Vulnerability Expert', role: 'Asset Stress Assessment', status: 'MONITORING', weight: 0.10, accuracyScore: 88, description: 'Baseline risk profiling' },
      { id: 'exp-6', name: 'Impact Fusion Expert', role: 'Decision Synthesis', status: 'ACTIVE', weight: 0.05, accuracyScore: 92, description: 'Ensemble weighting' }
    ],
    corrections: [
      { metric: 'RAIN', label: 'Accumulated Rainfall', raw: 65, corrected: 82, unit: 'mm', correctionPercent: 26.1, confidence: 78, systematicBiasReason: 'Raw GFS underestimates ocean moisture convergence' },
      { metric: 'WIND', label: 'Maximum Sustained Wind', raw: 78, corrected: 85, unit: 'km/h', correctionPercent: 8.9, confidence: 84, systematicBiasReason: 'Corrected for SST convective anomaly' },
      { metric: 'FLOOD_DEPTH', label: 'Max Est. Flood Depth', raw: 0.2, corrected: 0.35, unit: 'm', correctionPercent: 75.0, confidence: 70, systematicBiasReason: 'Bias correction in river mouth runoff' },
      { metric: 'SURGE_HEIGHT', label: 'Coastal Storm Surge', raw: 0.4, corrected: 0.6, unit: 'm', correctionPercent: 50.0, confidence: 75, systematicBiasReason: 'Bathymetry correction in shallow shelf' }
    ],
    ensemble: [
      { modelId: 'IMD_GFS', name: 'IMD GFS High-Res', provider: 'India Met Dept', color: '#38bdf8', trackErrorKm: 55, predictedWindKmH: 80, predictedRainfallMm: 70, predictedSurgeM: 0.5, confidence: 82, path: [{ lat: 15.2, lng: 88.5 }, { lat: 18.0, lng: 84.5 }] },
      { modelId: 'ECMWF_HRES', name: 'ECMWF HRES Euro', provider: 'ECMWF', color: '#a855f7', trackErrorKm: 42, predictedWindKmH: 88, predictedRainfallMm: 85, predictedSurgeM: 0.7, confidence: 89, path: [{ lat: 15.2, lng: 88.5 }, { lat: 18.4, lng: 84.2 }] },
      { modelId: 'NOAA_GFS', name: 'NOAA GFS Global', provider: 'NOAA USA', color: '#f59e0b', trackErrorKm: 60, predictedWindKmH: 82, predictedRainfallMm: 75, predictedSurgeM: 0.6, confidence: 80, path: [{ lat: 15.2, lng: 88.5 }, { lat: 18.8, lng: 83.9 }] },
      { modelId: 'NCUM_REG', name: 'NCUM Regional AI', provider: 'NCMRWF India', color: '#10b981', trackErrorKm: 48, predictedWindKmH: 86, predictedRainfallMm: 80, predictedSurgeM: 0.6, confidence: 85, path: [{ lat: 15.2, lng: 88.5 }, { lat: 18.3, lng: 84.4 }] },
      { modelId: 'VERSA_ENSEMBLE', name: 'VERSA AI Weighted Consensus', provider: 'VERSA-CYCLONE', color: '#00f2fe', trackErrorKm: 28, predictedWindKmH: 85, predictedRainfallMm: 82, predictedSurgeM: 0.65, confidence: 91, path: [{ lat: 15.2, lng: 88.5 }, { lat: 18.5, lng: 84.3 }] }
    ],
    trustSources: [
      { id: 'src-1', name: 'INSAT-3D Satellite Hydro-Estimator', type: 'Satellite', reliabilityScore: 94, status: 'OPTIMAL', lastUpdated: '10 min ago', freshness: 'Realtime (10m latency)', outliersCount: 0 },
      { id: 'src-2', name: 'Coastal Radar Network (Gopalpur & Vizag)', type: 'Radar', reliabilityScore: 91, status: 'OPTIMAL', lastUpdated: '5 min ago', freshness: 'Realtime (5m latency)', outliersCount: 1 },
      { id: 'src-3', name: 'Ground Weather Stations (IMD Circle)', type: 'Ground Station', reliabilityScore: 96, status: 'OPTIMAL', lastUpdated: '15 min ago', freshness: 'Hourly telemetry', outliersCount: 0 },
      { id: 'src-4', name: 'NIOT Ocean Buoy #BD11', type: 'Ocean Buoy', reliabilityScore: 88, status: 'CONFLICT_DETECTED', lastUpdated: '30 min ago', freshness: '30m telemetry', outliersCount: 3, conflictDetails: { satelliteValue: '29.8°C SST', groundValue: '28.1°C SST', aiWeightedValue: '29.3°C SST', resolutionExplanation: 'Buoy thermistor calibration offset detected; weighted towards satellite microwave sensor.' } },
      { id: 'src-5', name: 'State GIS Infrastructure Database', type: 'GIS Infrastructure', reliabilityScore: 78, status: 'DEGRADED', lastUpdated: '3 days ago', freshness: 'Static GIS registry', outliersCount: 12 }
    ],
    infrastructure: generateInfrastructureForStep('T-48H'),
    uncertainty: {
      trackKm: 65,
      rainfallMm: 35,
      windKmH: 18,
      floodDepthM: 0.4,
      overallConfidence: 74,
      governorLevel: 'MEDIUM CONFIDENCE',
      explanation: 'Atmosphere steering ridge steering forces are evolving; high track variance 48h out.'
    },
    hazards: {
      wind: { level: 'Moderate', prob: 45, confidence: 82, value: '85 km/h' },
      rainfall: { level: 'Moderate', prob: 52, confidence: 78, value: '82 mm/24h' },
      flood: { level: 'Moderate', prob: 30, confidence: 72, value: '0.35 m max' },
      surge: { level: 'Moderate', prob: 25, confidence: 75, value: '0.6 m surge' },
      landslide: { level: 'Low', prob: 18, confidence: 68, value: 'Low Risk' }
    },
    responseStats: {
      populationAtRisk: 125000,
      criticalRiskPopulation: 14000,
      sheltersActive: 12,
      shelterCapacity: 96500,
      evacuationCompletionPct: 15,
      connectivityPct: 98,
      isolatedVillagesCount: 0,
      cutoffHospitalsCount: 0
    },
    insights: [
      { id: 'ins-1', timestamp: '14:15 UTC', category: 'REGIME', title: 'Tropical Genesis Phase Active', description: 'VORTEX system is organizing over warm Bay of Bengal waters.', importance: 'INFO', confidence: 91, whyExplanation: 'Low vertical wind shear (<10 kts) combined with SST of 29.8°C supports organization.' },
      { id: 'ins-2', timestamp: '14:20 UTC', category: 'TRUST', title: 'Ocean Buoy Calibration Discrepancy Solved', description: 'AI weighted estimate resolved 1.7°C SST anomaly between NIOT Buoy and INSAT-3D.', importance: 'WARNING', confidence: 88, whyExplanation: 'Buoy drift sensor degraded; satellite IR fusion provides calibrated ground truth.' }
    ],
    decisions: [
      { id: 'dec-1', timestamp: '14:30 UTC', recommendationId: 'rec-1', recommendationTitle: 'Issue Cyclone Watch for Coastal Odisha & North AP', targetAssetOrZone: 'Coastal District Zone A & B', priority: 'PRIORITY 1', status: 'ACCEPTED', officialUser: 'Disaster Relief Commissioner (Odisha)' }
    ]
  },

  'T-36H': {
    step: 'T-36H',
    cyclone: {
      id: 'vayu-x-t36',
      step: 'T-36H',
      timestamp: '2026-10-02 02:00 UTC',
      lat: 16.4,
      lng: 87.2,
      maxWindKmH: 110,
      centralPressureHpa: 982,
      movementDir: 'NW',
      movementSpeedKmH: 16,
      category: 'Severe Cyclonic Storm',
      landfallEtaHours: 36,
      radiusKm: { wind64kt: 50, wind50kt: 110, wind34kt: 220 },
      forecastCone: [
        { lat: 16.4, lng: 87.2, radiusKm: 35 },
        { lat: 17.6, lng: 85.8, radiusKm: 60 },
        { lat: 18.7, lng: 84.5, radiusKm: 95 },
        { lat: 19.4, lng: 83.8, radiusKm: 130 }
      ]
    },
    regimes: [
      { id: '1', name: 'Formation & Tropical Genesis', probability: 15, description: 'Early vortex organization', isActive: false },
      { id: '2', name: 'Rapid Intensification', probability: 88, description: 'Rapid pressure drop and central dense overcast formation', isActive: true },
      { id: '3', name: 'Peak Intensity Ocean Trajectory', probability: 54, description: 'Maximum eyewall wind buildup', isActive: false },
      { id: '4', name: 'Coastal Approach & Pre-Landfall', probability: 38, description: 'Approaching outer shelf band', isActive: false },
      { id: '5', name: 'Extreme Precipitation Regime', probability: 62, description: 'Heavy moisture delivery bands', isActive: false },
      { id: '6', name: 'Landfall Transition', probability: 12, description: 'Eye friction', isActive: false },
      { id: '7', name: 'Post-Landfall Decay', probability: 4, description: 'Overland decay', isActive: false }
    ],
    experts: [
      { id: 'exp-1', name: 'Vortex Track Expert (ML-GNN)', role: 'Deep Ocean Trajectory', status: 'ACTIVE', weight: 0.35, accuracyScore: 94, description: 'Refining track convergence' },
      { id: 'exp-2', name: 'Rainfall Convection Expert (CNN-LSTM)', role: 'Precipitation Dynamics', status: 'ACTIVE', weight: 0.30, accuracyScore: 91, description: 'Intense feeder bands forming' },
      { id: 'exp-3', name: 'Hydrological Flood Expert (Physics-AI)', role: 'River & Basin Inundation', status: 'ACTIVE', weight: 0.15, accuracyScore: 88, description: 'Basin runoff modeling starting' },
      { id: 'exp-4', name: 'Storm Surge Expert (SLOSH + AI)', role: 'Coastal Ocean Surge', status: 'MONITORING', weight: 0.10, accuracyScore: 92, description: 'Shallow waters modeling' },
      { id: 'exp-5', name: 'Infrastructure Vulnerability Expert', role: 'Asset Stress Assessment', status: 'ACTIVE', weight: 0.10, accuracyScore: 89, description: 'Substation & Bridge risk calculation' },
      { id: 'exp-6', name: 'Impact Fusion Expert', role: 'Decision Synthesis', status: 'ACTIVE', weight: 0.05, accuracyScore: 93, description: 'Ensemble synthesis' }
    ],
    corrections: [
      { metric: 'RAIN', label: 'Accumulated Rainfall', raw: 105, corrected: 138, unit: 'mm', correctionPercent: 31.4, confidence: 85, systematicBiasReason: 'Convective cell feedback in feeder bands' },
      { metric: 'WIND', label: 'Maximum Sustained Wind', raw: 102, corrected: 110, unit: 'km/h', correctionPercent: 7.8, confidence: 88, systematicBiasReason: 'Eyewall contraction wind peak bias corrected' },
      { metric: 'FLOOD_DEPTH', label: 'Max Est. Flood Depth', raw: 0.5, corrected: 0.85, unit: 'm', correctionPercent: 70.0, confidence: 80, systematicBiasReason: 'Catchment saturation coefficient updated' },
      { metric: 'SURGE_HEIGHT', label: 'Coastal Storm Surge', raw: 0.8, corrected: 1.1, unit: 'm', correctionPercent: 37.5, confidence: 82, systematicBiasReason: 'Tidal phase overlap correction' }
    ],
    ensemble: [
      { modelId: 'IMD_GFS', name: 'IMD GFS High-Res', provider: 'India Met Dept', color: '#38bdf8', trackErrorKm: 42, predictedWindKmH: 105, predictedRainfallMm: 125, predictedSurgeM: 0.9, confidence: 86, path: [{ lat: 16.4, lng: 87.2 }, { lat: 18.5, lng: 84.4 }] },
      { modelId: 'ECMWF_HRES', name: 'ECMWF HRES Euro', provider: 'ECMWF', color: '#a855f7', trackErrorKm: 30, predictedWindKmH: 112, predictedRainfallMm: 142, predictedSurgeM: 1.2, confidence: 92, path: [{ lat: 16.4, lng: 87.2 }, { lat: 18.6, lng: 84.3 }] },
      { modelId: 'NOAA_GFS', name: 'NOAA GFS Global', provider: 'NOAA USA', color: '#f59e0b', trackErrorKm: 48, predictedWindKmH: 106, predictedRainfallMm: 120, predictedSurgeM: 1.0, confidence: 83, path: [{ lat: 16.4, lng: 87.2 }, { lat: 18.9, lng: 84.0 }] },
      { modelId: 'NCUM_REG', name: 'NCUM Regional AI', provider: 'NCMRWF India', color: '#10b981', trackErrorKm: 35, predictedWindKmH: 108, predictedRainfallMm: 135, predictedSurgeM: 1.1, confidence: 88, path: [{ lat: 16.4, lng: 87.2 }, { lat: 18.6, lng: 84.3 }] },
      { modelId: 'VERSA_ENSEMBLE', name: 'VERSA AI Weighted Consensus', provider: 'VERSA-CYCLONE', color: '#00f2fe', trackErrorKm: 21, predictedWindKmH: 110, predictedRainfallMm: 138, predictedSurgeM: 1.1, confidence: 93, path: [{ lat: 16.4, lng: 87.2 }, { lat: 18.65, lng: 84.25 }] }
    ],
    trustSources: [
      { id: 'src-1', name: 'INSAT-3D Satellite Hydro-Estimator', type: 'Satellite', reliabilityScore: 95, status: 'OPTIMAL', lastUpdated: '5 min ago', freshness: 'Realtime', outliersCount: 0 },
      { id: 'src-2', name: 'Coastal Radar Network (Gopalpur & Vizag)', type: 'Radar', reliabilityScore: 94, status: 'OPTIMAL', lastUpdated: '2 min ago', freshness: 'Realtime', outliersCount: 0 },
      { id: 'src-3', name: 'Ground Weather Stations (IMD Circle)', type: 'Ground Station', reliabilityScore: 97, status: 'OPTIMAL', lastUpdated: '10 min ago', freshness: 'Telemetry OK', outliersCount: 0 },
      { id: 'src-4', name: 'NIOT Ocean Buoy #BD11', type: 'Ocean Buoy', reliabilityScore: 90, status: 'OPTIMAL', lastUpdated: '15 min ago', freshness: 'Calibrated', outliersCount: 0 },
      { id: 'src-5', name: 'State GIS Infrastructure Database', type: 'GIS Infrastructure', reliabilityScore: 82, status: 'OPTIMAL', lastUpdated: '1 day ago', freshness: 'Verified static', outliersCount: 4 }
    ],
    infrastructure: generateInfrastructureForStep('T-36H'),
    uncertainty: {
      trackKm: 45,
      rainfallMm: 28,
      windKmH: 14,
      floodDepthM: 0.3,
      overallConfidence: 81,
      governorLevel: 'HIGH CONFIDENCE',
      explanation: 'Ensemble tracks show tight alignment towards Gopalpur-Puri corridor.'
    },
    hazards: {
      wind: { level: 'High', prob: 72, confidence: 88, value: '110 km/h' },
      rainfall: { level: 'High', prob: 78, confidence: 85, value: '138 mm/24h' },
      flood: { level: 'Moderate', prob: 58, confidence: 80, value: '0.85 m' },
      surge: { level: 'Moderate', prob: 48, confidence: 82, value: '1.1 m' },
      landslide: { level: 'Moderate', prob: 32, confidence: 72, value: 'Moderate Risk' }
    },
    responseStats: {
      populationAtRisk: 210000,
      criticalRiskPopulation: 38000,
      sheltersActive: 28,
      shelterCapacity: 96500,
      evacuationCompletionPct: 35,
      connectivityPct: 95,
      isolatedVillagesCount: 2,
      cutoffHospitalsCount: 0
    },
    insights: [
      { id: 'ins-3', timestamp: '02:10 UTC', category: 'REGIME', title: 'Rapid Intensification Regime Confirmed', description: 'Central pressure dropped by 12 hPa in 12h, indicating rapid storm organization.', importance: 'WARNING', confidence: 94, whyExplanation: 'Eye-wall formation and deep convection detected in microwave imagery.' },
      { id: 'ins-4', timestamp: '02:25 UTC', category: 'INFRASTRUCTURE', title: 'Substation-17 Alert Level Raised', description: 'Projected flood depth reaches 0.85m at coastal sub-station catchment.', importance: 'WARNING', confidence: 86, whyExplanation: 'Elevation of Substation-17 is 3.2m above sea level with 0.85m surge + runoff accumulation.' }
    ],
    decisions: [
      { id: 'dec-2', timestamp: '02:40 UTC', recommendationId: 'rec-2', recommendationTitle: 'Pre-position Mobile Flood Pumps & Standby Power at Hospital #4', targetAssetOrZone: 'District Civil Hospital #4', priority: 'PRIORITY 2', status: 'ACCEPTED', officialUser: 'Chief Medical Officer' }
    ]
  },

  'T-24H': {
    step: 'T-24H',
    cyclone: {
      id: 'vayu-x-t24',
      step: 'T-24H',
      timestamp: '2026-10-02 14:00 UTC',
      lat: 17.5,
      lng: 85.6,
      maxWindKmH: 135,
      centralPressureHpa: 974,
      movementDir: 'NW',
      movementSpeedKmH: 18,
      category: 'Very Severe Cyclonic Storm',
      landfallEtaHours: 24,
      radiusKm: { wind64kt: 75, wind50kt: 140, wind34kt: 260 },
      forecastCone: [
        { lat: 17.5, lng: 85.6, radiusKm: 25 },
        { lat: 18.3, lng: 84.8, radiusKm: 45 },
        { lat: 19.0, lng: 84.1, radiusKm: 70 },
        { lat: 19.6, lng: 83.6, radiusKm: 95 }
      ]
    },
    regimes: [
      { id: '1', name: 'Formation & Tropical Genesis', probability: 2, description: 'Early vortex organization', isActive: false },
      { id: '2', name: 'Rapid Intensification', probability: 42, description: 'Rapid pressure drop slowing down near peak', isActive: false },
      { id: '3', name: 'Peak Intensity Ocean Trajectory', probability: 91, description: 'Maximum eyewall core symmetry over open water', isActive: true },
      { id: '4', name: 'Coastal Approach & Pre-Landfall', probability: 78, description: 'Outer rain bands reaching coastline', isActive: true },
      { id: '5', name: 'Extreme Precipitation Regime', probability: 84, description: 'Moisture convergence and high precipitation rates', isActive: true },
      { id: '6', name: 'Landfall Transition', probability: 28, description: 'Initial land interaction', isActive: false },
      { id: '7', name: 'Post-Landfall Decay', probability: 5, description: 'Overland decay', isActive: false }
    ],
    experts: [
      { id: 'exp-1', name: 'Vortex Track Expert (ML-GNN)', role: 'Deep Ocean Trajectory', status: 'ACTIVE', weight: 0.20, accuracyScore: 96, description: 'Track verified' },
      { id: 'exp-2', name: 'Rainfall Convection Expert (CNN-LSTM)', role: 'Precipitation Dynamics', status: 'ACTIVE', weight: 0.35, accuracyScore: 93, description: 'Extremely heavy rainfall routing' },
      { id: 'exp-3', name: 'Hydrological Flood Expert (Physics-AI)', role: 'River & Basin Inundation', status: 'ACTIVE', weight: 0.20, accuracyScore: 90, description: 'High river basin runoff activated' },
      { id: 'exp-4', name: 'Storm Surge Expert (SLOSH + AI)', role: 'Coastal Ocean Surge', status: 'ACTIVE', weight: 0.15, accuracyScore: 94, description: 'Wave + tidal surge modeling' },
      { id: 'exp-5', name: 'Infrastructure Vulnerability Expert', role: 'Asset Stress Assessment', status: 'ACTIVE', weight: 0.08, accuracyScore: 91, description: 'Asset failure risk scoring' },
      { id: 'exp-6', name: 'Impact Fusion Expert', role: 'Decision Synthesis', status: 'ACTIVE', weight: 0.02, accuracyScore: 94, description: 'Fusion core' }
    ],
    corrections: [
      { metric: 'RAIN', label: 'Accumulated Rainfall', raw: 128, corrected: 174, unit: 'mm', correctionPercent: 35.9, confidence: 91, systematicBiasReason: 'Correction estimates systematic model bias using historical observations and current regime conditions' },
      { metric: 'WIND', label: 'Maximum Sustained Wind', raw: 136, corrected: 145, unit: 'km/h', correctionPercent: 6.6, confidence: 88, systematicBiasReason: 'Adjusted for boundary layer momentum transfer' },
      { metric: 'FLOOD_DEPTH', label: 'Max Est. Flood Depth', raw: 0.9, corrected: 1.4, unit: 'm', correctionPercent: 55.5, confidence: 84, systematicBiasReason: 'Urban drainage clogging & river overflow multi-hazard coupling' },
      { metric: 'SURGE_HEIGHT', label: 'Coastal Storm Surge', raw: 1.2, corrected: 1.6, unit: 'm', correctionPercent: 33.3, confidence: 89, systematicBiasReason: 'Wave setup and bathymetry friction correction' }
    ],
    ensemble: [
      { modelId: 'IMD_GFS', name: 'IMD GFS High-Res', provider: 'India Met Dept', color: '#38bdf8', trackErrorKm: 31, predictedWindKmH: 138, predictedRainfallMm: 160, predictedSurgeM: 1.4, confidence: 90, path: [{ lat: 17.5, lng: 85.6 }, { lat: 18.6, lng: 84.3 }] },
      { modelId: 'ECMWF_HRES', name: 'ECMWF HRES Euro', provider: 'ECMWF', color: '#a855f7', trackErrorKm: 22, predictedWindKmH: 146, predictedRainfallMm: 180, predictedSurgeM: 1.7, confidence: 95, path: [{ lat: 17.5, lng: 85.6 }, { lat: 18.7, lng: 84.2 }] },
      { modelId: 'NOAA_GFS', name: 'NOAA GFS Global', provider: 'NOAA USA', color: '#f59e0b', trackErrorKm: 38, predictedWindKmH: 134, predictedRainfallMm: 155, predictedSurgeM: 1.5, confidence: 87, path: [{ lat: 17.5, lng: 85.6 }, { lat: 18.9, lng: 84.0 }] },
      { modelId: 'NCUM_REG', name: 'NCUM Regional AI', provider: 'NCMRWF India', color: '#10b981', trackErrorKm: 25, predictedWindKmH: 142, predictedRainfallMm: 170, predictedSurgeM: 1.6, confidence: 92, path: [{ lat: 17.5, lng: 85.6 }, { lat: 18.7, lng: 84.2 }] },
      { modelId: 'VERSA_ENSEMBLE', name: 'VERSA AI Weighted Consensus', provider: 'VERSA-CYCLONE', color: '#00f2fe', trackErrorKm: 15, predictedWindKmH: 145, predictedRainfallMm: 174, predictedSurgeM: 1.6, confidence: 96, path: [{ lat: 17.5, lng: 85.6 }, { lat: 18.7, lng: 84.2 }] }
    ],
    trustSources: [
      { id: 'src-1', name: 'INSAT-3D Satellite Hydro-Estimator', type: 'Satellite', reliabilityScore: 94, status: 'OPTIMAL', lastUpdated: '2 min ago', freshness: 'Realtime', outliersCount: 0 },
      { id: 'src-2', name: 'Coastal Radar Network (Gopalpur & Vizag)', type: 'Radar', reliabilityScore: 97, status: 'OPTIMAL', lastUpdated: '1 min ago', freshness: 'Realtime 3D Doppler sweep', outliersCount: 0 },
      { id: 'src-3', name: 'Ground Weather Stations (IMD Circle)', type: 'Ground Station', reliabilityScore: 97, status: 'OPTIMAL', lastUpdated: '5 min ago', freshness: 'Optimal', outliersCount: 0 },
      { id: 'src-4', name: 'NIOT Ocean Buoy #BD11', type: 'Ocean Buoy', reliabilityScore: 88, status: 'CONFLICT_DETECTED', lastUpdated: '10 min ago', freshness: 'Telemetry OK', outliersCount: 2, conflictDetails: { satelliteValue: '180 mm satellite precipitation rate', groundValue: '142 mm ground station bucket', aiWeightedValue: '164 mm AI-weighted consensus estimate', resolutionExplanation: 'Rainfall disagreement detected between satellite and ground station observations. AI weighting compensates wind-driven rain undercatch in ground gauge.' } },
      { id: 'src-5', name: 'State GIS Infrastructure Database', type: 'GIS Infrastructure', reliabilityScore: 71, status: 'OPTIMAL', lastUpdated: '6 hours ago', freshness: 'Audited', outliersCount: 8 }
    ],
    infrastructure: generateInfrastructureForStep('T-24H'),
    uncertainty: {
      trackKm: 35,
      rainfallMm: 42,
      windKmH: 12,
      floodDepthM: 0.35,
      overallConfidence: 87,
      governorLevel: 'HIGH CONFIDENCE',
      explanation: 'Radar & Doppler wind profile matches VERSA forecast correction tightly.'
    },
    hazards: {
      wind: { level: 'Extreme', prob: 87, confidence: 92, value: '145 km/h' },
      rainfall: { level: 'Extreme', prob: 92, confidence: 91, value: '174 mm/24h' },
      flood: { level: 'High', prob: 84, confidence: 86, value: '1.4 m max depth' },
      surge: { level: 'Extreme', prob: 89, confidence: 90, value: '1.6 m storm surge' },
      landslide: { level: 'Moderate', prob: 47, confidence: 75, value: 'Moderate Slope Threat' }
    },
    responseStats: {
      populationAtRisk: 345000,
      criticalRiskPopulation: 82400,
      sheltersActive: 48,
      shelterCapacity: 96500,
      evacuationCompletionPct: 63,
      connectivityPct: 88,
      isolatedVillagesCount: 5,
      cutoffHospitalsCount: 1
    },
    insights: [
      { id: 'ins-5', timestamp: '14:05 UTC', category: 'HAZARD', title: 'Rainfall Discrepancy Resolved by AI', description: 'Satellite precipitation rate (180mm) vs Ground gauge (142mm) fused to AI consensus of 164mm.', importance: 'INFO', confidence: 94, whyExplanation: 'High wind gauge undercatch corrected using Doppler radar spatial reflectivity.' },
      { id: 'ins-6', timestamp: '14:20 UTC', category: 'INFRASTRUCTURE', title: 'Substation #17 Enters Extreme Risk Zone', description: 'Predicted failure probability increased to 76% due to combined wind exposure (145km/h) and 1.4m flood depth.', importance: 'CRITICAL', confidence: 88, whyExplanation: 'Primary risk drivers: Wind Exposure (32%), Flood Exposure (27%), Elevation (18%), Age (13%), Historical Damage (10%).' },
      { id: 'ins-7', timestamp: '14:35 UTC', category: 'UNCERTAINTY', title: 'Track Uncertainty Decreasing', description: 'Track confidence reaches 91% for landfall near Gopalpur (lat 18.7° N, 84.2° E).', importance: 'INFO', confidence: 91, whyExplanation: 'All 5 ensemble models cluster within a 25km landfall corridor.' }
    ],
    decisions: [
      { id: 'dec-3', timestamp: '14:40 UTC', recommendationId: 'rec-3', recommendationTitle: 'Prepare Evacuation for Coastal Zone A (Pop: 21,700)', targetAssetOrZone: 'Coastal Zone A Low-Lying Coast', priority: 'PRIORITY 1', status: 'ACCEPTED', officialUser: 'District Collector' },
      { id: 'dec-4', timestamp: '14:50 UTC', recommendationId: 'rec-4', recommendationTitle: 'Pre-position Emergency Repair Team and Backup Transformer at Substation #17', targetAssetOrZone: 'Substation #17', priority: 'PRIORITY 2', status: 'PENDING', officialUser: 'State Electricity Board' },
      { id: 'dec-5', timestamp: '15:00 UTC', recommendationId: 'rec-5', recommendationTitle: 'Close Route NH-16 Coastal Section if flood depth exceeds 0.5m', targetAssetOrZone: 'NH-16 Coastal Highway', priority: 'PRIORITY 3', status: 'ACCEPTED', officialUser: 'Traffic Police Ops' }
    ]
  },

  'T-12H': {
    step: 'T-12H',
    cyclone: {
      id: 'vayu-x-t12',
      step: 'T-12H',
      timestamp: '2026-10-03 02:00 UTC',
      lat: 18.2,
      lng: 84.7,
      maxWindKmH: 155,
      centralPressureHpa: 962,
      movementDir: 'NW',
      movementSpeedKmH: 20,
      category: 'Extremely Severe Cyclonic Storm',
      landfallEtaHours: 12,
      radiusKm: { wind64kt: 90, wind50kt: 160, wind34kt: 290 },
      forecastCone: [
        { lat: 18.2, lng: 84.7, radiusKm: 18 },
        { lat: 18.7, lng: 84.2, radiusKm: 30 },
        { lat: 19.3, lng: 83.7, radiusKm: 50 }
      ]
    },
    regimes: [
      { id: '1', name: 'Formation & Tropical Genesis', probability: 0, description: 'Genesis complete', isActive: false },
      { id: '2', name: 'Rapid Intensification', probability: 20, description: 'Peak reached', isActive: false },
      { id: '3', name: 'Peak Intensity Ocean Trajectory', probability: 85, description: 'Max force eyewall', isActive: false },
      { id: '4', name: 'Coastal Approach & Pre-Landfall', probability: 96, description: 'Eyewall outer rim crossing shelf', isActive: true },
      { id: '5', name: 'Extreme Precipitation Regime', probability: 94, description: 'Torrential downpours over coastal districts', isActive: true },
      { id: '6', name: 'Landfall Transition', probability: 68, description: 'Imminent coast intersection', isActive: true },
      { id: '7', name: 'Post-Landfall Decay', probability: 8, description: 'Not started', isActive: false }
    ],
    experts: [
      { id: 'exp-1', name: 'Vortex Track Expert (ML-GNN)', role: 'Deep Ocean Trajectory', status: 'ACTIVE', weight: 0.15, accuracyScore: 97, description: 'Landfall target locked' },
      { id: 'exp-2', name: 'Rainfall Convection Expert (CNN-LSTM)', role: 'Precipitation Dynamics', status: 'ACTIVE', weight: 0.30, accuracyScore: 94, description: 'Extreme rainfall tracking' },
      { id: 'exp-3', name: 'Hydrological Flood Expert (Physics-AI)', role: 'River & Basin Inundation', status: 'ACTIVE', weight: 0.25, accuracyScore: 92, description: 'Inundation maps updating real-time' },
      { id: 'exp-4', name: 'Storm Surge Expert (SLOSH + AI)', role: 'Coastal Ocean Surge', status: 'ACTIVE', weight: 0.20, accuracyScore: 95, description: 'Surge inundation wave peak active' },
      { id: 'exp-5', name: 'Infrastructure Vulnerability Expert', role: 'Asset Stress Assessment', status: 'ACTIVE', weight: 0.08, accuracyScore: 93, description: 'Failure alerts triggering' },
      { id: 'exp-6', name: 'Impact Fusion Expert', role: 'Decision Synthesis', status: 'ACTIVE', weight: 0.02, accuracyScore: 96, description: 'Final response synthesis' }
    ],
    corrections: [
      { metric: 'RAIN', label: 'Accumulated Rainfall', raw: 160, corrected: 210, unit: 'mm', correctionPercent: 31.2, confidence: 94, systematicBiasReason: 'Coastal orographic enhancement coupled with eyewall rainband' },
      { metric: 'WIND', label: 'Maximum Sustained Wind', raw: 148, corrected: 155, unit: 'km/h', correctionPercent: 4.7, confidence: 92, systematicBiasReason: 'Doppler velocity correction at 500m height' },
      { metric: 'FLOOD_DEPTH', label: 'Max Est. Flood Depth', raw: 1.2, corrected: 1.85, unit: 'm', correctionPercent: 54.1, confidence: 89, systematicBiasReason: 'Estuary backwater effect under high tide surge' },
      { metric: 'SURGE_HEIGHT', label: 'Coastal Storm Surge', raw: 1.7, corrected: 2.2, unit: 'm', correctionPercent: 29.4, confidence: 93, systematicBiasReason: 'Funnel effect in Ganjam coastal gulf' }
    ],
    ensemble: [
      { modelId: 'IMD_GFS', name: 'IMD GFS High-Res', provider: 'India Met Dept', color: '#38bdf8', trackErrorKm: 18, predictedWindKmH: 152, predictedRainfallMm: 195, predictedSurgeM: 2.0, confidence: 93, path: [{ lat: 18.2, lng: 84.7 }, { lat: 18.7, lng: 84.2 }] },
      { modelId: 'ECMWF_HRES', name: 'ECMWF HRES Euro', provider: 'ECMWF', color: '#a855f7', trackErrorKm: 12, predictedWindKmH: 158, predictedRainfallMm: 220, predictedSurgeM: 2.3, confidence: 97, path: [{ lat: 18.2, lng: 84.7 }, { lat: 18.72, lng: 84.18 }] },
      { modelId: 'NOAA_GFS', name: 'NOAA GFS Global', provider: 'NOAA USA', color: '#f59e0b', trackErrorKm: 24, predictedWindKmH: 148, predictedRainfallMm: 190, predictedSurgeM: 2.1, confidence: 90, path: [{ lat: 18.2, lng: 84.7 }, { lat: 18.8, lng: 84.1 }] },
      { modelId: 'NCUM_REG', name: 'NCUM Regional AI', provider: 'NCMRWF India', color: '#10b981', trackErrorKm: 16, predictedWindKmH: 154, predictedRainfallMm: 205, predictedSurgeM: 2.2, confidence: 94, path: [{ lat: 18.2, lng: 84.7 }, { lat: 18.7, lng: 84.2 }] },
      { modelId: 'VERSA_ENSEMBLE', name: 'VERSA AI Weighted Consensus', provider: 'VERSA-CYCLONE', color: '#00f2fe', trackErrorKm: 8, predictedWindKmH: 155, predictedRainfallMm: 210, predictedSurgeM: 2.2, confidence: 98, path: [{ lat: 18.2, lng: 84.7 }, { lat: 18.71, lng: 84.20 }] }
    ],
    trustSources: [
      { id: 'src-1', name: 'INSAT-3D Satellite Hydro-Estimator', type: 'Satellite', reliabilityScore: 96, status: 'OPTIMAL', lastUpdated: '1 min ago', freshness: 'Realtime', outliersCount: 0 },
      { id: 'src-2', name: 'Coastal Radar Network (Gopalpur & Vizag)', type: 'Radar', reliabilityScore: 98, status: 'OPTIMAL', lastUpdated: '30 sec ago', freshness: 'Continuous Doppler scan', outliersCount: 0 },
      { id: 'src-3', name: 'Ground Weather Stations (IMD Circle)', type: 'Ground Station', reliabilityScore: 95, status: 'OPTIMAL', lastUpdated: '2 min ago', freshness: 'Optimal', outliersCount: 1 },
      { id: 'src-4', name: 'NIOT Ocean Buoy #BD11', type: 'Ocean Buoy', reliabilityScore: 92, status: 'OPTIMAL', lastUpdated: '5 min ago', freshness: 'Optimal', outliersCount: 0 },
      { id: 'src-5', name: 'State GIS Infrastructure Database', type: 'GIS Infrastructure', reliabilityScore: 84, status: 'OPTIMAL', lastUpdated: '2 hours ago', freshness: 'Optimal', outliersCount: 2 }
    ],
    infrastructure: generateInfrastructureForStep('T-12H'),
    uncertainty: {
      trackKm: 18,
      rainfallMm: 22,
      windKmH: 8,
      floodDepthM: 0.2,
      overallConfidence: 93,
      governorLevel: 'HIGH CONFIDENCE',
      explanation: 'High certainty on landfall location and peak wind impact corridor.'
    },
    hazards: {
      wind: { level: 'Extreme', prob: 96, confidence: 95, value: '155 km/h' },
      rainfall: { level: 'Extreme', prob: 98, confidence: 94, value: '210 mm/24h' },
      flood: { level: 'Extreme', prob: 91, confidence: 91, value: '1.85 m max' },
      surge: { level: 'Extreme', prob: 95, confidence: 94, value: '2.2 m surge' },
      landslide: { level: 'High', prob: 64, confidence: 80, value: 'High Risk on Eastern Ghats Slopes' }
    },
    responseStats: {
      populationAtRisk: 420000,
      criticalRiskPopulation: 112000,
      sheltersActive: 62,
      shelterCapacity: 96500,
      evacuationCompletionPct: 88,
      connectivityPct: 76,
      isolatedVillagesCount: 12,
      cutoffHospitalsCount: 2
    },
    insights: [
      { id: 'ins-8', timestamp: '02:05 UTC', category: 'REGIME', title: 'Pre-Landfall Coastal Approach Peak', description: 'Outer eyewall structure making landfall contact near Gopalpur.', importance: 'CRITICAL', confidence: 98, whyExplanation: 'Doppler radial velocity exceeds 150 km/h at 300m radar level.' },
      { id: 'ins-9', timestamp: '02:15 UTC', category: 'INFRASTRUCTURE', title: 'Ganjam Coastal Bridge #3 Risk Threshold Exceeded', description: 'Bridge structural vibration & wave action failure probability reaches 84%.', importance: 'CRITICAL', confidence: 92, whyExplanation: 'Peak storm surge wave force combined with 155 km/h crosswinds.' }
    ],
    decisions: [
      { id: 'dec-6', timestamp: '02:30 UTC', recommendationId: 'rec-6', recommendationTitle: 'Complete Evacuation of Zone A & B (88% Done, 12k Remaining)', targetAssetOrZone: 'Coastal Zones A & B', priority: 'PRIORITY 1', status: 'ACCEPTED', officialUser: 'Disaster Relief Commissioner' },
      { id: 'dec-7', timestamp: '02:45 UTC', recommendationId: 'rec-7', recommendationTitle: 'Deploy NDRF Water Rescue Teams near Flood Zone B', targetAssetOrZone: 'Flood Zone B Catchment', priority: 'PRIORITY 4', status: 'ACCEPTED', officialUser: 'NDRF Battalion Commander' }
    ]
  },

  'T-6H': {
    step: 'T-6H',
    cyclone: {
      id: 'vayu-x-t6',
      step: 'T-6H',
      timestamp: '2026-10-03 08:00 UTC',
      lat: 18.5,
      lng: 84.4,
      maxWindKmH: 160,
      centralPressureHpa: 958,
      movementDir: 'NW',
      movementSpeedKmH: 22,
      category: 'Extremely Severe Cyclonic Storm',
      landfallEtaHours: 6,
      radiusKm: { wind64kt: 100, wind50kt: 180, wind34kt: 320 },
      forecastCone: [
        { lat: 18.5, lng: 84.4, radiusKm: 12 },
        { lat: 18.7, lng: 84.2, radiusKm: 20 },
        { lat: 19.1, lng: 83.8, radiusKm: 35 }
      ]
    },
    regimes: [
      { id: '1', name: 'Formation & Tropical Genesis', probability: 0, description: 'Inactive', isActive: false },
      { id: '2', name: 'Rapid Intensification', probability: 5, description: 'Inactive', isActive: false },
      { id: '3', name: 'Peak Intensity Ocean Trajectory', probability: 40, description: 'Slight friction decay beginning', isActive: false },
      { id: '4', name: 'Coastal Approach & Pre-Landfall', probability: 98, description: 'Immediate coastal impact zone', isActive: true },
      { id: '5', name: 'Extreme Precipitation Regime', probability: 98, description: 'Torrential eyewall rainfall active', isActive: true },
      { id: '6', name: 'Landfall Transition', probability: 92, description: 'Eyewall crossing coastline', isActive: true },
      { id: '7', name: 'Post-Landfall Decay', probability: 15, description: 'Onset imminent', isActive: false }
    ],
    experts: [
      { id: 'exp-1', name: 'Vortex Track Expert (ML-GNN)', role: 'Deep Ocean Trajectory', status: 'ACTIVE', weight: 0.10, accuracyScore: 98, description: 'Eye track locked' },
      { id: 'exp-2', name: 'Rainfall Convection Expert (CNN-LSTM)', role: 'Precipitation Dynamics', status: 'ACTIVE', weight: 0.35, accuracyScore: 95, description: 'Severe convective eyewall' },
      { id: 'exp-3', name: 'Hydrological Flood Expert (Physics-AI)', role: 'River & Basin Inundation', status: 'ACTIVE', weight: 0.25, accuracyScore: 94, description: 'Flash flood alert active' },
      { id: 'exp-4', name: 'Storm Surge Expert (SLOSH + AI)', role: 'Coastal Ocean Surge', status: 'ACTIVE', weight: 0.20, accuracyScore: 96, description: 'Max surge peak in progress' },
      { id: 'exp-5', name: 'Infrastructure Vulnerability Expert', role: 'Asset Stress Assessment', status: 'ACTIVE', weight: 0.08, accuracyScore: 95, description: 'Critical grid damage alerts' },
      { id: 'exp-6', name: 'Impact Fusion Expert', role: 'Decision Synthesis', status: 'ACTIVE', weight: 0.02, accuracyScore: 97, description: 'Realtime emergency routing' }
    ],
    corrections: [
      { metric: 'RAIN', label: 'Accumulated Rainfall', raw: 185, corrected: 245, unit: 'mm', correctionPercent: 32.4, confidence: 96, systematicBiasReason: 'Doppler eyewall reflectivity integration' },
      { metric: 'WIND', label: 'Maximum Sustained Wind', raw: 152, corrected: 160, unit: 'km/h', correctionPercent: 5.2, confidence: 94, systematicBiasReason: 'Eyewall downburst wind correction' },
      { metric: 'FLOOD_DEPTH', label: 'Max Est. Flood Depth', raw: 1.5, corrected: 2.2, unit: 'm', correctionPercent: 46.7, confidence: 91, systematicBiasReason: 'Simultaneous surge + 245mm rainfall inundation' },
      { metric: 'SURGE_HEIGHT', label: 'Coastal Storm Surge', raw: 2.0, corrected: 2.6, unit: 'm', correctionPercent: 30.0, confidence: 95, systematicBiasReason: 'High-tide sync setup' }
    ],
    ensemble: [
      { modelId: 'IMD_GFS', name: 'IMD GFS High-Res', provider: 'India Met Dept', color: '#38bdf8', trackErrorKm: 12, predictedWindKmH: 158, predictedRainfallMm: 230, predictedSurgeM: 2.4, confidence: 95, path: [{ lat: 18.5, lng: 84.4 }, { lat: 18.7, lng: 84.2 }] },
      { modelId: 'ECMWF_HRES', name: 'ECMWF HRES Euro', provider: 'ECMWF', color: '#a855f7', trackErrorKm: 8, predictedWindKmH: 162, predictedRainfallMm: 250, predictedSurgeM: 2.7, confidence: 98, path: [{ lat: 18.5, lng: 84.4 }, { lat: 18.71, lng: 84.21 }] },
      { modelId: 'NOAA_GFS', name: 'NOAA GFS Global', provider: 'NOAA USA', color: '#f59e0b', trackErrorKm: 15, predictedWindKmH: 154, predictedRainfallMm: 225, predictedSurgeM: 2.4, confidence: 92, path: [{ lat: 18.5, lng: 84.4 }, { lat: 18.73, lng: 84.18 }] },
      { modelId: 'NCUM_REG', name: 'NCUM Regional AI', provider: 'NCMRWF India', color: '#10b981', trackErrorKm: 10, predictedWindKmH: 160, predictedRainfallMm: 240, predictedSurgeM: 2.5, confidence: 96, path: [{ lat: 18.5, lng: 84.4 }, { lat: 18.7, lng: 84.2 }] },
      { modelId: 'VERSA_ENSEMBLE', name: 'VERSA AI Weighted Consensus', provider: 'VERSA-CYCLONE', color: '#00f2fe', trackErrorKm: 5, predictedWindKmH: 160, predictedRainfallMm: 245, predictedSurgeM: 2.6, confidence: 99, path: [{ lat: 18.5, lng: 84.4 }, { lat: 18.71, lng: 84.20 }] }
    ],
    trustSources: [
      { id: 'src-1', name: 'INSAT-3D Satellite Hydro-Estimator', type: 'Satellite', reliabilityScore: 97, status: 'OPTIMAL', lastUpdated: '1 min ago', freshness: 'Realtime', outliersCount: 0 },
      { id: 'src-2', name: 'Coastal Radar Network (Gopalpur & Vizag)', type: 'Radar', reliabilityScore: 99, status: 'OPTIMAL', lastUpdated: '10 sec ago', freshness: 'Continuous 3D Doppler', outliersCount: 0 },
      { id: 'src-3', name: 'Ground Weather Stations (IMD Circle)', type: 'Ground Station', reliabilityScore: 91, status: 'DEGRADED', lastUpdated: '10 min ago', freshness: '2 coastal stations offline', outliersCount: 3 },
      { id: 'src-4', name: 'NIOT Ocean Buoy #BD11', type: 'Ocean Buoy', reliabilityScore: 90, status: 'OPTIMAL', lastUpdated: '5 min ago', freshness: 'Optimal', outliersCount: 0 },
      { id: 'src-5', name: 'State GIS Infrastructure Database', type: 'GIS Infrastructure', reliabilityScore: 86, status: 'OPTIMAL', lastUpdated: '1 hour ago', freshness: 'Live sensors connected', outliersCount: 1 }
    ],
    infrastructure: generateInfrastructureForStep('T-6H'),
    uncertainty: {
      trackKm: 10,
      rainfallMm: 15,
      windKmH: 5,
      floodDepthM: 0.15,
      overallConfidence: 96,
      governorLevel: 'HIGH CONFIDENCE',
      explanation: 'Eyewall contact established with radar network; ultra-high confidence.'
    },
    hazards: {
      wind: { level: 'Extreme', prob: 99, confidence: 98, value: '160 km/h' },
      rainfall: { level: 'Extreme', prob: 99, confidence: 97, value: '245 mm/24h' },
      flood: { level: 'Extreme', prob: 96, confidence: 95, value: '2.2 m max depth' },
      surge: { level: 'Extreme', prob: 98, confidence: 97, value: '2.6 m storm surge' },
      landslide: { level: 'High', prob: 78, confidence: 85, value: 'Severe Slope Instability Alert' }
    },
    responseStats: {
      populationAtRisk: 480000,
      criticalRiskPopulation: 145000,
      sheltersActive: 74,
      shelterCapacity: 96500,
      evacuationCompletionPct: 94,
      connectivityPct: 65,
      isolatedVillagesCount: 22,
      cutoffHospitalsCount: 3
    },
    insights: [
      { id: 'ins-10', timestamp: '08:05 UTC', category: 'HAZARD', title: 'Storm Surge Peak Arriving with High Tide', description: '2.6m surge wave entering Chilika / Gopalpur coastal mouth.', importance: 'CRITICAL', confidence: 99, whyExplanation: 'Combined astronomical high tide of +0.8m with 1.8m wind surge setup.' },
      { id: 'ins-11', timestamp: '08:20 UTC', category: 'INFRASTRUCTURE', title: 'Substation #17 Structural Tripped', description: 'Substation #17 grid power safety tripped due to 2.2m water inundation.', importance: 'CRITICAL', confidence: 97, whyExplanation: 'Backup diesel generators active at Hospital #4.' }
    ],
    decisions: [
      { id: 'dec-8', timestamp: '08:30 UTC', recommendationId: 'rec-8', recommendationTitle: 'Pre-position generators near Hospital #4 and verify fuel reserve', targetAssetOrZone: 'Hospital #4 District Hub', priority: 'PRIORITY 5', status: 'ACCEPTED', officialUser: 'Emergency Health Taskforce' }
    ]
  },

  'LANDFALL': {
    step: 'LANDFALL',
    cyclone: {
      id: 'vayu-x-landfall',
      step: 'LANDFALL',
      timestamp: '2026-10-03 14:00 UTC',
      lat: 18.7,
      lng: 84.2,
      maxWindKmH: 145,
      centralPressureHpa: 968,
      movementDir: 'NW',
      movementSpeedKmH: 18,
      category: 'Severe Cyclonic Storm',
      landfallEtaHours: 0,
      radiusKm: { wind64kt: 80, wind50kt: 150, wind34kt: 280 },
      forecastCone: [
        { lat: 18.7, lng: 84.2, radiusKm: 8 },
        { lat: 19.1, lng: 83.8, radiusKm: 15 },
        { lat: 19.5, lng: 83.3, radiusKm: 25 }
      ]
    },
    regimes: [
      { id: '1', name: 'Formation & Tropical Genesis', probability: 0, description: 'Complete', isActive: false },
      { id: '2', name: 'Rapid Intensification', probability: 0, description: 'Complete', isActive: false },
      { id: '3', name: 'Peak Intensity Ocean Trajectory', probability: 10, description: 'Land friction active', isActive: false },
      { id: '4', name: 'Coastal Approach & Pre-Landfall', probability: 40, description: 'Crossing coast', isActive: false },
      { id: '5', name: 'Extreme Precipitation Regime', probability: 99, description: 'Peak overland deluge', isActive: true },
      { id: '6', name: 'Landfall Transition', probability: 99, description: 'Eye crossing Gopalpur coastline right now', isActive: true },
      { id: '7', name: 'Post-Landfall Decay', probability: 45, description: 'Overland friction onset', isActive: false }
    ],
    experts: [
      { id: 'exp-1', name: 'Vortex Track Expert (ML-GNN)', role: 'Deep Ocean Trajectory', status: 'STANDBY', weight: 0.05, accuracyScore: 98, description: 'Landfall logged at 18.7° N' },
      { id: 'exp-2', name: 'Rainfall Convection Expert (CNN-LSTM)', role: 'Precipitation Dynamics', status: 'ACTIVE', weight: 0.35, accuracyScore: 96, description: 'Overland rainband tracking' },
      { id: 'exp-3', name: 'Hydrological Flood Expert (Physics-AI)', role: 'River & Basin Inundation', status: 'ACTIVE', weight: 0.35, accuracyScore: 95, description: 'Peak inundation modeling' },
      { id: 'exp-4', name: 'Storm Surge Expert (SLOSH + AI)', role: 'Coastal Ocean Surge', status: 'ACTIVE', weight: 0.10, accuracyScore: 96, description: 'Surge receding slowly' },
      { id: 'exp-5', name: 'Infrastructure Vulnerability Expert', role: 'Asset Stress Assessment', status: 'ACTIVE', weight: 0.12, accuracyScore: 96, description: 'Realtime damage verification' },
      { id: 'exp-6', name: 'Impact Fusion Expert', role: 'Decision Synthesis', status: 'ACTIVE', weight: 0.03, accuracyScore: 98, description: 'Rescue & recovery routing' }
    ],
    corrections: [
      { metric: 'RAIN', label: 'Accumulated Rainfall', raw: 210, corrected: 268, unit: 'mm', correctionPercent: 27.6, confidence: 97, systematicBiasReason: 'Overland rain dump bias corrected' },
      { metric: 'WIND', label: 'Maximum Sustained Wind', raw: 140, corrected: 145, unit: 'km/h', correctionPercent: 3.6, confidence: 95, systematicBiasReason: 'Coastline surface roughness adjustment' },
      { metric: 'FLOOD_DEPTH', label: 'Max Est. Flood Depth', raw: 1.8, corrected: 2.45, unit: 'm', correctionPercent: 36.1, confidence: 94, systematicBiasReason: 'Maximum deluge peak in low basin' },
      { metric: 'SURGE_HEIGHT', label: 'Coastal Storm Surge', raw: 2.2, corrected: 2.5, unit: 'm', correctionPercent: 13.6, confidence: 96, systematicBiasReason: 'Observed peak tide mark' }
    ],
    ensemble: [
      { modelId: 'IMD_GFS', name: 'IMD GFS High-Res', provider: 'India Met Dept', color: '#38bdf8', trackErrorKm: 8, predictedWindKmH: 142, predictedRainfallMm: 250, predictedSurgeM: 2.4, confidence: 96, path: [{ lat: 18.7, lng: 84.2 }, { lat: 19.1, lng: 83.8 }] },
      { modelId: 'ECMWF_HRES', name: 'ECMWF HRES Euro', provider: 'ECMWF', color: '#a855f7', trackErrorKm: 4, predictedWindKmH: 148, predictedRainfallMm: 275, predictedSurgeM: 2.6, confidence: 99, path: [{ lat: 18.7, lng: 84.2 }, { lat: 19.12, lng: 83.78 }] },
      { modelId: 'NOAA_GFS', name: 'NOAA GFS Global', provider: 'NOAA USA', color: '#f59e0b', trackErrorKm: 12, predictedWindKmH: 138, predictedRainfallMm: 240, predictedSurgeM: 2.3, confidence: 93, path: [{ lat: 18.7, lng: 84.2 }, { lat: 19.15, lng: 83.75 }] },
      { modelId: 'NCUM_REG', name: 'NCUM Regional AI', provider: 'NCMRWF India', color: '#10b981', trackErrorKm: 6, predictedWindKmH: 144, predictedRainfallMm: 260, predictedSurgeM: 2.5, confidence: 97, path: [{ lat: 18.7, lng: 84.2 }, { lat: 19.1, lng: 83.8 }] },
      { modelId: 'VERSA_ENSEMBLE', name: 'VERSA AI Weighted Consensus', provider: 'VERSA-CYCLONE', color: '#00f2fe', trackErrorKm: 2, predictedWindKmH: 145, predictedRainfallMm: 268, predictedSurgeM: 2.55, confidence: 99, path: [{ lat: 18.7, lng: 84.2 }, { lat: 19.11, lng: 83.79 }] }
    ],
    trustSources: [
      { id: 'src-1', name: 'INSAT-3D Satellite Hydro-Estimator', type: 'Satellite', reliabilityScore: 98, status: 'OPTIMAL', lastUpdated: '1 min ago', freshness: 'Realtime', outliersCount: 0 },
      { id: 'src-2', name: 'Coastal Radar Network (Gopalpur & Vizag)', type: 'Radar', reliabilityScore: 99, status: 'OPTIMAL', lastUpdated: '10 sec ago', freshness: 'Direct eyewall scan', outliersCount: 0 },
      { id: 'src-3', name: 'Ground Weather Stations (IMD Circle)', type: 'Ground Station', reliabilityScore: 84, status: 'DEGRADED', lastUpdated: '15 min ago', freshness: '4 coastal stations damaged', outliersCount: 5 },
      { id: 'src-4', name: 'NIOT Ocean Buoy #BD11', type: 'Ocean Buoy', reliabilityScore: 89, status: 'OPTIMAL', lastUpdated: '10 min ago', freshness: 'Optimal', outliersCount: 0 },
      { id: 'src-5', name: 'State GIS Infrastructure Database', type: 'GIS Infrastructure', reliabilityScore: 92, status: 'OPTIMAL', lastUpdated: '15 min ago', freshness: 'Realtime outage telemetry', outliersCount: 0 }
    ],
    infrastructure: generateInfrastructureForStep('LANDFALL'),
    uncertainty: {
      trackKm: 5,
      rainfallMm: 10,
      windKmH: 4,
      floodDepthM: 0.1,
      overallConfidence: 98,
      governorLevel: 'HIGH CONFIDENCE',
      explanation: 'Landfall occurring at target point; track error reduced to 2km.'
    },
    hazards: {
      wind: { level: 'Extreme', prob: 99, confidence: 99, value: '145 km/h at Landfall' },
      rainfall: { level: 'Extreme', prob: 99, confidence: 98, value: '268 mm/24h peak' },
      flood: { level: 'Extreme', prob: 98, confidence: 96, value: '2.45 m maximum depth' },
      surge: { level: 'Extreme', prob: 99, confidence: 98, value: '2.55 m crest' },
      landslide: { level: 'High', prob: 82, confidence: 88, value: 'High Slope Collapse Risk' }
    },
    responseStats: {
      populationAtRisk: 520000,
      criticalRiskPopulation: 168000,
      sheltersActive: 78,
      shelterCapacity: 96500,
      evacuationCompletionPct: 96,
      connectivityPct: 61,
      isolatedVillagesCount: 34,
      cutoffHospitalsCount: 4
    },
    insights: [
      { id: 'ins-12', timestamp: '14:00 UTC', category: 'REGIME', title: 'LANDFALL OCCURRING AT GOPALPUR', description: 'Eye of Cyclone VAYU-X crossed coastline at 18.7° N, 84.2° E with 145 km/h winds.', importance: 'CRITICAL', confidence: 99, whyExplanation: 'Radar velocity & barometric pressure min of 968 hPa confirmed by IMD Gopalpur.' },
      { id: 'ins-13', timestamp: '14:15 UTC', category: 'INFRASTRUCTURE', title: 'Road Network NH-16 Flooded & Cut Off', description: '3 major highway sections submerged under 1.8m floodwaters; alternate evacuation route active.', importance: 'CRITICAL', confidence: 96, whyExplanation: 'Network connectivity dropped to 61%; 34 interior villages isolated.' }
    ],
    decisions: [
      { id: 'dec-9', timestamp: '14:20 UTC', recommendationId: 'rec-9', recommendationTitle: 'Activate Emergency Alternate Route B-12 for Hospital Supply Convoy', targetAssetOrZone: 'Hospital #4 Route B-12', priority: 'PRIORITY 1', status: 'ACCEPTED', officialUser: 'Emergency Logistics Control' }
    ]
  },

  'T+6H': {
    step: 'T+6H',
    cyclone: {
      id: 'vayu-x-tp6',
      step: 'T+6H',
      timestamp: '2026-10-03 20:00 UTC',
      lat: 19.3,
      lng: 83.6,
      maxWindKmH: 95,
      centralPressureHpa: 984,
      movementDir: 'NW',
      movementSpeedKmH: 16,
      category: 'Severe Cyclonic Storm',
      landfallEtaHours: 0,
      radiusKm: { wind64kt: 20, wind50kt: 90, wind34kt: 220 },
      forecastCone: [
        { lat: 19.3, lng: 83.6, radiusKm: 15 },
        { lat: 19.8, lng: 83.0, radiusKm: 30 }
      ]
    },
    regimes: [
      { id: '1', name: 'Formation & Tropical Genesis', probability: 0, description: 'Inactive', isActive: false },
      { id: '2', name: 'Rapid Intensification', probability: 0, description: 'Inactive', isActive: false },
      { id: '3', name: 'Peak Intensity Ocean Trajectory', probability: 0, description: 'Inactive', isActive: false },
      { id: '4', name: 'Coastal Approach & Pre-Landfall', probability: 5, description: 'Overland', isActive: false },
      { id: '5', name: 'Extreme Precipitation Regime', probability: 85, description: 'Heavy inland rainfall dumping', isActive: true },
      { id: '6', name: 'Landfall Transition', probability: 20, description: 'Completed', isActive: false },
      { id: '7', name: 'Post-Landfall Decay', probability: 95, description: 'Rapid inland filling & friction weakening', isActive: true }
    ],
    experts: [
      { id: 'exp-1', name: 'Vortex Track Expert (ML-GNN)', role: 'Deep Ocean Trajectory', status: 'STANDBY', weight: 0.05, accuracyScore: 98, description: 'Inland track decay' },
      { id: 'exp-2', name: 'Rainfall Convection Expert (CNN-LSTM)', role: 'Precipitation Dynamics', status: 'ACTIVE', weight: 0.30, accuracyScore: 95, description: 'Inland deluge tracking' },
      { id: 'exp-3', name: 'Hydrological Flood Expert (Physics-AI)', role: 'River & Basin Inundation', status: 'ACTIVE', weight: 0.45, accuracyScore: 96, description: 'Basin flood peak routing' },
      { id: 'exp-4', name: 'Storm Surge Expert (SLOSH + AI)', role: 'Coastal Ocean Surge', status: 'STANDBY', weight: 0.05, accuracyScore: 96, description: 'Surge subsiding' },
      { id: 'exp-5', name: 'Infrastructure Vulnerability Expert', role: 'Asset Stress Assessment', status: 'ACTIVE', weight: 0.10, accuracyScore: 96, description: 'Restoration priority assessment' },
      { id: 'exp-6', name: 'Impact Fusion Expert', role: 'Decision Synthesis', status: 'ACTIVE', weight: 0.05, accuracyScore: 97, description: 'Relief deployment dispatch' }
    ],
    corrections: [
      { metric: 'RAIN', label: 'Accumulated Rainfall', raw: 220, corrected: 285, unit: 'mm', correctionPercent: 29.5, confidence: 96, systematicBiasReason: 'Inland elevation runoff coupling' },
      { metric: 'WIND', label: 'Maximum Sustained Wind', raw: 90, corrected: 95, unit: 'km/h', correctionPercent: 5.5, confidence: 95, systematicBiasReason: 'Surface friction gust correction' },
      { metric: 'FLOOD_DEPTH', label: 'Max Est. Flood Depth', raw: 2.1, corrected: 2.8, unit: 'm', correctionPercent: 33.3, confidence: 93, systematicBiasReason: 'Peak river crest in inland basin' },
      { metric: 'SURGE_HEIGHT', label: 'Coastal Storm Surge', raw: 1.1, corrected: 1.3, unit: 'm', correctionPercent: 18.2, confidence: 95, systematicBiasReason: 'Receding surge wave' }
    ],
    ensemble: [
      { modelId: 'IMD_GFS', name: 'IMD GFS High-Res', provider: 'India Met Dept', color: '#38bdf8', trackErrorKm: 10, predictedWindKmH: 92, predictedRainfallMm: 270, predictedSurgeM: 1.2, confidence: 95, path: [{ lat: 19.3, lng: 83.6 }, { lat: 19.8, lng: 83.0 }] },
      { modelId: 'ECMWF_HRES', name: 'ECMWF HRES Euro', provider: 'ECMWF', color: '#a855f7', trackErrorKm: 5, predictedWindKmH: 98, predictedRainfallMm: 295, predictedSurgeM: 1.4, confidence: 98, path: [{ lat: 19.3, lng: 83.6 }, { lat: 19.82, lng: 82.98 }] },
      { modelId: 'NOAA_GFS', name: 'NOAA GFS Global', provider: 'NOAA USA', color: '#f59e0b', trackErrorKm: 14, predictedWindKmH: 88, predictedRainfallMm: 260, predictedSurgeM: 1.1, confidence: 92, path: [{ lat: 19.3, lng: 83.6 }, { lat: 19.85, lng: 82.95 }] },
      { modelId: 'NCUM_REG', name: 'NCUM Regional AI', provider: 'NCMRWF India', color: '#10b981', trackErrorKm: 8, predictedWindKmH: 94, predictedRainfallMm: 280, predictedSurgeM: 1.3, confidence: 96, path: [{ lat: 19.3, lng: 83.6 }, { lat: 19.8, lng: 83.0 }] },
      { modelId: 'VERSA_ENSEMBLE', name: 'VERSA AI Weighted Consensus', provider: 'VERSA-CYCLONE', color: '#00f2fe', trackErrorKm: 3, predictedWindKmH: 95, predictedRainfallMm: 285, predictedSurgeM: 1.3, confidence: 99, path: [{ lat: 19.3, lng: 83.6 }, { lat: 19.81, lng: 82.99 }] }
    ],
    trustSources: [
      { id: 'src-1', name: 'INSAT-3D Satellite Hydro-Estimator', type: 'Satellite', reliabilityScore: 98, status: 'OPTIMAL', lastUpdated: '1 min ago', freshness: 'Realtime', outliersCount: 0 },
      { id: 'src-2', name: 'Coastal Radar Network (Gopalpur & Vizag)', type: 'Radar', reliabilityScore: 97, status: 'OPTIMAL', lastUpdated: '1 min ago', freshness: 'Inland Doppler tracking', outliersCount: 0 },
      { id: 'src-3', name: 'Ground Weather Stations (IMD Circle)', type: 'Ground Station', reliabilityScore: 82, status: 'DEGRADED', lastUpdated: '10 min ago', freshness: 'Restoration teams active', outliersCount: 6 },
      { id: 'src-4', name: 'NIOT Ocean Buoy #BD11', type: 'Ocean Buoy', reliabilityScore: 95, status: 'OPTIMAL', lastUpdated: '15 min ago', freshness: 'Optimal', outliersCount: 0 },
      { id: 'src-5', name: 'State GIS Infrastructure Database', type: 'GIS Infrastructure', reliabilityScore: 95, status: 'OPTIMAL', lastUpdated: '10 min ago', freshness: 'Live utility updates', outliersCount: 0 }
    ],
    infrastructure: generateInfrastructureForStep('T+6H'),
    uncertainty: {
      trackKm: 8,
      rainfallMm: 12,
      windKmH: 6,
      floodDepthM: 0.15,
      overallConfidence: 96,
      governorLevel: 'HIGH CONFIDENCE',
      explanation: 'Inland flooding is now the primary active hazard.'
    },
    hazards: {
      wind: { level: 'High', prob: 75, confidence: 94, value: '95 km/h gusts' },
      rainfall: { level: 'Extreme', prob: 98, confidence: 97, value: '285 mm accumulated' },
      flood: { level: 'Extreme', prob: 99, confidence: 96, value: '2.8 m peak river crest' },
      surge: { level: 'Moderate', prob: 30, confidence: 92, value: '1.3 m receding' },
      landslide: { level: 'Extreme', prob: 91, confidence: 90, value: 'Multiple Landslides Reported in Hills' }
    },
    responseStats: {
      populationAtRisk: 520000,
      criticalRiskPopulation: 140000,
      sheltersActive: 78,
      shelterCapacity: 96500,
      evacuationCompletionPct: 98,
      connectivityPct: 68,
      isolatedVillagesCount: 28,
      cutoffHospitalsCount: 2
    },
    insights: [
      { id: 'ins-14', timestamp: '20:05 UTC', category: 'HAZARD', title: 'River Basin Cresting at 2.8m Flood Depth', description: 'Rushikulya river catchment receiving peak runoff from inland mountain slopes.', importance: 'CRITICAL', confidence: 97, whyExplanation: 'Accumulated precipitation reached 285mm in upper catchment area.' },
      { id: 'ins-15', timestamp: '20:25 UTC', category: 'INFRASTRUCTURE', title: 'Substation-17 Mobile Restoration Initiated', description: 'Floodwaters receding at coastal substation site; repair teams en route.', importance: 'INFO', confidence: 95, whyExplanation: 'Water level dropped by 0.6m in coastal sector.' }
    ],
    decisions: [
      { id: 'dec-10', timestamp: '20:30 UTC', recommendationId: 'rec-10', recommendationTitle: 'Deploy Emergency Restoration Teams to Substation #17', targetAssetOrZone: 'Substation #17 Site', priority: 'PRIORITY 2', status: 'ACCEPTED', officialUser: 'State Power Transmission Corp' }
    ]
  },

  'T+12H': {
    step: 'T+12H',
    cyclone: {
      id: 'vayu-x-tp12',
      step: 'T+12H',
      timestamp: '2026-10-04 02:00 UTC',
      lat: 20.1,
      lng: 82.8,
      maxWindKmH: 60,
      centralPressureHpa: 996,
      movementDir: 'NW',
      movementSpeedKmH: 14,
      category: 'Deep Depression',
      landfallEtaHours: 0,
      radiusKm: { wind64kt: 0, wind50kt: 30, wind34kt: 140 },
      forecastCone: [
        { lat: 20.1, lng: 82.8, radiusKm: 10 },
        { lat: 20.6, lng: 82.3, radiusKm: 20 }
      ]
    },
    regimes: [
      { id: '1', name: 'Formation & Tropical Genesis', probability: 0, description: 'Inactive', isActive: false },
      { id: '2', name: 'Rapid Intensification', probability: 0, description: 'Inactive', isActive: false },
      { id: '3', name: 'Peak Intensity Ocean Trajectory', probability: 0, description: 'Inactive', isActive: false },
      { id: '4', name: 'Coastal Approach & Pre-Landfall', probability: 0, description: 'Inactive', isActive: false },
      { id: '5', name: 'Extreme Precipitation Regime', probability: 40, description: 'Lightening rain bands', isActive: false },
      { id: '6', name: 'Landfall Transition', probability: 0, description: 'Completed', isActive: false },
      { id: '7', name: 'Post-Landfall Decay', probability: 99, description: 'Dissipating over land surface', isActive: true }
    ],
    experts: [
      { id: 'exp-1', name: 'Vortex Track Expert (ML-GNN)', role: 'Deep Ocean Trajectory', status: 'STANDBY', weight: 0.02, accuracyScore: 98, description: 'System dissipated' },
      { id: 'exp-2', name: 'Rainfall Convection Expert (CNN-LSTM)', role: 'Precipitation Dynamics', status: 'ACTIVE', weight: 0.20, accuracyScore: 96, description: 'Residual rain tracking' },
      { id: 'exp-3', name: 'Hydrological Flood Expert (Physics-AI)', role: 'River & Basin Inundation', status: 'ACTIVE', weight: 0.50, accuracyScore: 97, description: 'Flood drainage monitoring' },
      { id: 'exp-4', name: 'Storm Surge Expert (SLOSH + AI)', role: 'Coastal Ocean Surge', status: 'STANDBY', weight: 0.02, accuracyScore: 96, description: 'Surge cleared' },
      { id: 'exp-5', name: 'Infrastructure Vulnerability Expert', role: 'Asset Stress Assessment', status: 'ACTIVE', weight: 0.20, accuracyScore: 97, description: 'Post-event damage audit' },
      { id: 'exp-6', name: 'Impact Fusion Expert', role: 'Decision Synthesis', status: 'ACTIVE', weight: 0.06, accuracyScore: 98, description: 'Historical calibration feedback' }
    ],
    corrections: [
      { metric: 'RAIN', label: 'Accumulated Rainfall', raw: 240, corrected: 302, unit: 'mm', correctionPercent: 25.8, confidence: 98, systematicBiasReason: 'Final ground truth rain gauge fusion' },
      { metric: 'WIND', label: 'Maximum Sustained Wind', raw: 55, corrected: 60, unit: 'km/h', correctionPercent: 9.1, confidence: 97, systematicBiasReason: 'Depression stage friction' },
      { metric: 'FLOOD_DEPTH', label: 'Max Est. Flood Depth', raw: 1.8, corrected: 2.3, unit: 'm', correctionPercent: 27.8, confidence: 96, systematicBiasReason: 'Drainage outflow progression' },
      { metric: 'SURGE_HEIGHT', label: 'Coastal Storm Surge', raw: 0.4, corrected: 0.5, unit: 'm', correctionPercent: 25.0, confidence: 98, systematicBiasReason: 'Normal sea level restored' }
    ],
    ensemble: [
      { modelId: 'IMD_GFS', name: 'IMD GFS High-Res', provider: 'India Met Dept', color: '#38bdf8', trackErrorKm: 8, predictedWindKmH: 58, predictedRainfallMm: 290, predictedSurgeM: 0.5, confidence: 97, path: [{ lat: 20.1, lng: 82.8 }] },
      { modelId: 'ECMWF_HRES', name: 'ECMWF HRES Euro', provider: 'ECMWF', color: '#a855f7', trackErrorKm: 3, predictedWindKmH: 62, predictedRainfallMm: 310, predictedSurgeM: 0.5, confidence: 99, path: [{ lat: 20.1, lng: 82.8 }] },
      { modelId: 'NOAA_GFS', name: 'NOAA GFS Global', provider: 'NOAA USA', color: '#f59e0b', trackErrorKm: 11, predictedWindKmH: 55, predictedRainfallMm: 280, predictedSurgeM: 0.4, confidence: 94, path: [{ lat: 20.1, lng: 82.8 }] },
      { modelId: 'NCUM_REG', name: 'NCUM Regional AI', provider: 'NCMRWF India', color: '#10b981', trackErrorKm: 5, predictedWindKmH: 60, predictedRainfallMm: 300, predictedSurgeM: 0.5, confidence: 98, path: [{ lat: 20.1, lng: 82.8 }] },
      { modelId: 'VERSA_ENSEMBLE', name: 'VERSA AI Weighted Consensus', provider: 'VERSA-CYCLONE', color: '#00f2fe', trackErrorKm: 2, predictedWindKmH: 60, predictedRainfallMm: 302, predictedSurgeM: 0.5, confidence: 99, path: [{ lat: 20.1, lng: 82.8 }] }
    ],
    trustSources: [
      { id: 'src-1', name: 'INSAT-3D Satellite Hydro-Estimator', type: 'Satellite', reliabilityScore: 98, status: 'OPTIMAL', lastUpdated: '2 min ago', freshness: 'Realtime', outliersCount: 0 },
      { id: 'src-2', name: 'Coastal Radar Network (Gopalpur & Vizag)', type: 'Radar', reliabilityScore: 98, status: 'OPTIMAL', lastUpdated: '2 min ago', freshness: 'Optimal', outliersCount: 0 },
      { id: 'src-3', name: 'Ground Weather Stations (IMD Circle)', type: 'Ground Station', reliabilityScore: 92, status: 'OPTIMAL', lastUpdated: '5 min ago', freshness: 'Restored telemetry', outliersCount: 1 },
      { id: 'src-4', name: 'NIOT Ocean Buoy #BD11', type: 'Ocean Buoy', reliabilityScore: 96, status: 'OPTIMAL', lastUpdated: '10 min ago', freshness: 'Optimal', outliersCount: 0 },
      { id: 'src-5', name: 'State GIS Infrastructure Database', type: 'GIS Infrastructure', reliabilityScore: 97, status: 'OPTIMAL', lastUpdated: '5 min ago', freshness: 'Post-event damage survey live', outliersCount: 0 }
    ],
    infrastructure: generateInfrastructureForStep('T+12H'),
    uncertainty: {
      trackKm: 5,
      rainfallMm: 8,
      windKmH: 4,
      floodDepthM: 0.1,
      overallConfidence: 98,
      governorLevel: 'HIGH CONFIDENCE',
      explanation: 'Post-event calibration stage active; model accuracy evaluation completed.'
    },
    hazards: {
      wind: { level: 'Moderate', prob: 30, confidence: 96, value: '60 km/h dissipation' },
      rainfall: { level: 'High', prob: 60, confidence: 97, value: '302 mm event total' },
      flood: { level: 'High', prob: 70, confidence: 96, value: '2.3 m drainage phase' },
      surge: { level: 'Moderate', prob: 10, confidence: 98, value: '0.5 m normal' },
      landslide: { level: 'Moderate', prob: 45, confidence: 90, value: 'Slope Stabilization' }
    },
    responseStats: {
      populationAtRisk: 520000,
      criticalRiskPopulation: 45000,
      sheltersActive: 78,
      shelterCapacity: 96500,
      evacuationCompletionPct: 99,
      connectivityPct: 84,
      isolatedVillagesCount: 8,
      cutoffHospitalsCount: 0
    },
    insights: [
      { id: 'ins-16', timestamp: '02:00 UTC', category: 'REGIME', title: 'Post-Landfall Decay Completed', description: 'Cyclone VAYU-X weakened into a well-marked Low Pressure system.', importance: 'INFO', confidence: 99, whyExplanation: 'Surface pressure rose to 996 hPa; wind speeds below 60 km/h.' },
      { id: 'ins-17', timestamp: '02:15 UTC', category: 'TRUST', title: 'VERSA Forecast Calibration Executed', description: 'VERSA AI bias correction reduced track error by 48% and rainfall error by 31.2% compared to raw single models.', importance: 'INFO', confidence: 99, whyExplanation: 'Historical calibration weight updated into model registry.' }
    ],
    decisions: [
      { id: 'dec-11', timestamp: '02:30 UTC', recommendationId: 'rec-11', recommendationTitle: 'Initiate Return of Evacuees to Zone B Inundation-Free Shelters', targetAssetOrZone: 'Coastal Zone B Shelters', priority: 'PRIORITY 4', status: 'ACCEPTED', officialUser: 'District Collector' }
    ]
  }
};

function generateInfrastructureForStep(step: TimelineStep): InfrastructureAsset[] {
  const isPeak = step === 'T-6H' || step === 'LANDFALL';
  const isHigh = step === 'T-12H' || step === 'T+6H';
  const isMed = step === 'T-24H';
  
  const mult = isPeak ? 1.0 : (isHigh ? 0.85 : (isMed ? 0.65 : 0.35));

  return [
    {
      id: 'sub-17',
      name: 'Substation #17 (Ganjam Hub)',
      type: 'Substation',
      lat: 18.72,
      lng: 84.22,
      hazardExposure: 'Wind + Flood',
      failureProbability: Math.min(98, Math.round(76 * mult + 10)),
      confidence: 88,
      criticality: 'Critical',
      expectedImpact: 'Very High',
      elevationMeters: 3.2,
      floodExposureMeters: Number((1.4 * mult).toFixed(2)),
      windExposureKmH: Math.round(145 * mult + 40),
      ageYears: 18,
      historicalIncidents: 2,
      status: isPeak ? 'Immediate Action' : (isHigh ? 'Immediate Action' : 'Monitor'),
      populationAffected: 50000,
      riskDrivers: { windExposure: 32, floodExposure: 27, elevation: 18, infrastructureAge: 13, historicalDamage: 10 },
      fingerprint: { constructionType: 'Known', elevation: 'Known', structuralCondition: 'Estimated', maintenanceStatus: 'Unknown', knownCount: 2, estimatedCount: 1, unknownCount: 1 },
      recommendedAction: 'Pre-position emergency repair team and backup transformer.'
    },
    {
      id: 'hosp-4',
      name: 'District Civil Hospital #4',
      type: 'Hospital',
      lat: 18.75,
      lng: 84.25,
      hazardExposure: 'Wind + Surge',
      failureProbability: Math.min(92, Math.round(48 * mult + 5)),
      confidence: 94,
      criticality: 'Critical',
      expectedImpact: 'High',
      elevationMeters: 5.5,
      floodExposureMeters: Number((0.8 * mult).toFixed(2)),
      windExposureKmH: Math.round(140 * mult + 35),
      ageYears: 12,
      historicalIncidents: 0,
      status: 'Pre-positioned',
      populationAffected: 120000,
      riskDrivers: { windExposure: 40, floodExposure: 15, elevation: 20, infrastructureAge: 15, historicalDamage: 10 },
      fingerprint: { constructionType: 'Known', elevation: 'Known', structuralCondition: 'Known', maintenanceStatus: 'Estimated', knownCount: 3, estimatedCount: 1, unknownCount: 0 },
      recommendedAction: 'Verify backup generators & emergency medical stock reserve.'
    },
    {
      id: 'brg-3',
      name: 'Rushikulya Estuary Bridge #3',
      type: 'Bridge',
      lat: 18.68,
      lng: 84.18,
      hazardExposure: 'Surge + Flood',
      failureProbability: Math.min(95, Math.round(78 * mult + 8)),
      confidence: 91,
      criticality: 'High',
      expectedImpact: 'High',
      elevationMeters: 4.1,
      floodExposureMeters: Number((1.9 * mult).toFixed(2)),
      windExposureKmH: Math.round(135 * mult + 30),
      ageYears: 24,
      historicalIncidents: 3,
      status: isPeak ? 'Immediate Action' : 'Monitor',
      populationAffected: 8000,
      riskDrivers: { windExposure: 15, floodExposure: 45, elevation: 20, infrastructureAge: 12, historicalDamage: 8 },
      fingerprint: { constructionType: 'Known', elevation: 'Known', structuralCondition: 'Estimated', maintenanceStatus: 'Known', knownCount: 3, estimatedCount: 1, unknownCount: 0 },
      recommendedAction: 'Restrict heavy vehicular traffic and deploy structural strain sensors.'
    },
    {
      id: 'road-nh16',
      name: 'National Highway NH-16 (Coastal Stretch)',
      type: 'Road',
      lat: 18.70,
      lng: 84.20,
      hazardExposure: 'Flood Inundation',
      failureProbability: Math.min(99, Math.round(88 * mult + 5)),
      confidence: 95,
      criticality: 'Critical',
      expectedImpact: 'Very High',
      elevationMeters: 2.1,
      floodExposureMeters: Number((2.1 * mult).toFixed(2)),
      windExposureKmH: Math.round(120 * mult + 30),
      ageYears: 8,
      historicalIncidents: 4,
      status: isPeak ? 'Immediate Action' : 'Pre-positioned',
      populationAffected: 180000,
      riskDrivers: { windExposure: 10, floodExposure: 55, elevation: 25, infrastructureAge: 5, historicalDamage: 5 },
      fingerprint: { constructionType: 'Known', elevation: 'Known', structuralCondition: 'Known', maintenanceStatus: 'Known', knownCount: 4, estimatedCount: 0, unknownCount: 0 },
      recommendedAction: 'Prepare traffic diversion via Bypass State Highway SH-32.'
    },
    {
      id: 'sch-12',
      name: 'Gopalpur High School Shelter #12',
      type: 'School',
      lat: 18.74,
      lng: 84.28,
      hazardExposure: 'Wind Shearing',
      failureProbability: Math.min(70, Math.round(35 * mult)),
      confidence: 89,
      criticality: 'Moderate',
      expectedImpact: 'Moderate',
      elevationMeters: 8.4,
      floodExposureMeters: 0.1,
      windExposureKmH: Math.round(145 * mult + 35),
      ageYears: 15,
      historicalIncidents: 1,
      status: 'Safe',
      populationAffected: 1500,
      riskDrivers: { windExposure: 50, floodExposure: 5, elevation: 25, infrastructureAge: 10, historicalDamage: 10 },
      fingerprint: { constructionType: 'Known', elevation: 'Known', structuralCondition: 'Known', maintenanceStatus: 'Known', knownCount: 4, estimatedCount: 0, unknownCount: 0 },
      recommendedAction: 'Primary cyclone shelter active with emergency medical kits.'
    },
    {
      id: 'tel-4',
      name: 'Bhatapada Mobile Tower Cluster #4',
      type: 'Telecom',
      lat: 18.78,
      lng: 84.30,
      hazardExposure: 'Wind Extreme',
      failureProbability: Math.min(94, Math.round(82 * mult)),
      confidence: 86,
      criticality: 'High',
      expectedImpact: 'High',
      elevationMeters: 12.0,
      floodExposureMeters: 0.2,
      windExposureKmH: Math.round(155 * mult + 20),
      ageYears: 10,
      historicalIncidents: 2,
      status: isPeak ? 'Immediate Action' : 'Monitor',
      populationAffected: 42000,
      riskDrivers: { windExposure: 65, floodExposure: 5, elevation: 10, infrastructureAge: 10, historicalDamage: 10 },
      fingerprint: { constructionType: 'Known', elevation: 'Known', structuralCondition: 'Estimated', maintenanceStatus: 'Unknown', knownCount: 2, estimatedCount: 1, unknownCount: 1 },
      recommendedAction: 'Activate satellite emergency roaming backup towers.'
    },
    {
      id: 'wat-1',
      name: 'Chilika Water Treatment Plant #1',
      type: 'Water',
      lat: 18.65,
      lng: 84.15,
      hazardExposure: 'Surge Salinization',
      failureProbability: Math.min(88, Math.round(64 * mult)),
      confidence: 90,
      criticality: 'Critical',
      expectedImpact: 'High',
      elevationMeters: 2.8,
      floodExposureMeters: Number((1.5 * mult).toFixed(2)),
      windExposureKmH: Math.round(110 * mult + 25),
      ageYears: 16,
      historicalIncidents: 1,
      status: 'Pre-positioned',
      populationAffected: 85000,
      riskDrivers: { windExposure: 15, floodExposure: 40, elevation: 25, infrastructureAge: 10, historicalDamage: 10 },
      fingerprint: { constructionType: 'Known', elevation: 'Known', structuralCondition: 'Known', maintenanceStatus: 'Estimated', knownCount: 3, estimatedCount: 1, unknownCount: 0 },
      recommendedAction: 'Seal saline surge barrier gates and secure clean water reservoir.'
    },
    {
      id: 'bldg-sec',
      name: 'District Disaster Management Secretariat',
      type: 'Building',
      lat: 18.73,
      lng: 84.24,
      hazardExposure: 'Wind + Rain',
      failureProbability: Math.min(40, Math.round(18 * mult)),
      confidence: 98,
      criticality: 'Critical',
      expectedImpact: 'Low',
      elevationMeters: 14.5,
      floodExposureMeters: 0,
      windExposureKmH: Math.round(145 * mult + 35),
      ageYears: 5,
      historicalIncidents: 0,
      status: 'Safe',
      populationAffected: 500,
      riskDrivers: { windExposure: 45, floodExposure: 0, elevation: 35, infrastructureAge: 10, historicalDamage: 10 },
      fingerprint: { constructionType: 'Known', elevation: 'Known', structuralCondition: 'Known', maintenanceStatus: 'Known', knownCount: 4, estimatedCount: 0, unknownCount: 0 },
      recommendedAction: 'Primary emergency operations center active with satellite links.'
    }
  ];
}
