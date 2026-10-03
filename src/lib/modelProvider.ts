import { TimelineStep, StateAtTimeline } from '../types';
import { MOCK_TIMELINE_DATA } from '../data/mockTimelineData';

export interface ModelApiResponse<T> {
  status: 'success' | 'error';
  data: T;
  meta: {
    source: 'demo' | 'local_ai' | 'production_api';
    timestamp: string;
    reliability: number;
    modelHealth?: 'HEALTHY' | 'DEGRADED' | 'UNAVAILABLE';
  };
}

export interface ScenarioInput {
  rainfallMultiplier?: number;
  rainfallIncreasePct?: number;
  windSpeed?: number;
  trackShiftKm?: number;
  surgeIncrease?: number;
  surgeIncreaseMeters?: number;
  landfallTimeShiftHours?: number;
}

export interface ScenarioOutput {
  floodedAreaSqKm: number;
  infrastructureAtRiskCount: number;
  populationExposedCount: number;
  roadConnectivityPct: number;
  isolatedVillagesCount: number;
  shelterDemandCount: number;
  riskChangePercent: number;
}

export interface ModelHealthStatus {
  overall: 'HEALTHY' | 'DEGRADED' | 'CRITICAL';
  models: {
    regime: 'HEALTHY' | 'DEGRADED' | 'OFFLINE';
    rainfall: 'HEALTHY' | 'DEGRADED' | 'OFFLINE';
    flood: 'HEALTHY' | 'DEGRADED' | 'OFFLINE';
    infrastructure: 'HEALTHY' | 'DEGRADED' | 'OFFLINE';
    surge: 'HEALTHY' | 'DEGRADED' | 'OFFLINE';
  };
  lastCalibrated: string;
}

export interface IModelProvider {
  getCycloneData(step?: TimelineStep): Promise<ModelApiResponse<StateAtTimeline['cyclone']>>;
  getRegimePrediction(step?: TimelineStep): Promise<ModelApiResponse<StateAtTimeline['regimes']>>;
  getForecastCorrection(step?: TimelineStep): Promise<ModelApiResponse<StateAtTimeline['corrections']>>;
  getHazardPrediction(step?: TimelineStep): Promise<ModelApiResponse<StateAtTimeline['hazards']>>;
  getInfrastructureImpact(step?: TimelineStep): Promise<ModelApiResponse<StateAtTimeline['infrastructure']>>;
  getUncertainty(step?: TimelineStep): Promise<ModelApiResponse<StateAtTimeline['uncertainty']>>;
  getScenarioPrediction(input: ScenarioInput): Promise<ModelApiResponse<ScenarioOutput>>;
  getAIInsights(step?: TimelineStep): Promise<ModelApiResponse<StateAtTimeline['insights']>>;
  getModelHealth(): Promise<ModelApiResponse<ModelHealthStatus>>;
  getDataQuality(step?: TimelineStep): Promise<ModelApiResponse<StateAtTimeline['trustSources']>>;
}

/**
 * 1. DemoModelProvider — Deterministic, realistic simulation engine
 * Used when running in Vercel Demo Mode (NEXT_PUBLIC_DEMO_MODE=true) or as fallback.
 */
export class DemoModelProvider implements IModelProvider {
  private getState(step?: TimelineStep): StateAtTimeline {
    const validStep = step || 'T-24H';
    return MOCK_TIMELINE_DATA[validStep] || MOCK_TIMELINE_DATA['T-24H'];
  }

  async getCycloneData(step?: TimelineStep): Promise<ModelApiResponse<StateAtTimeline['cyclone']>> {
    const state = this.getState(step);
    return {
      status: 'success',
      data: state.cyclone,
      meta: { source: 'demo', timestamp: new Date().toISOString(), reliability: 0.95, modelHealth: 'HEALTHY' }
    };
  }

  async getRegimePrediction(step?: TimelineStep): Promise<ModelApiResponse<StateAtTimeline['regimes']>> {
    const state = this.getState(step);
    return {
      status: 'success',
      data: state.regimes,
      meta: { source: 'demo', timestamp: new Date().toISOString(), reliability: 0.94, modelHealth: 'HEALTHY' }
    };
  }

  async getForecastCorrection(step?: TimelineStep): Promise<ModelApiResponse<StateAtTimeline['corrections']>> {
    const state = this.getState(step);
    return {
      status: 'success',
      data: state.corrections,
      meta: { source: 'demo', timestamp: new Date().toISOString(), reliability: 0.91, modelHealth: 'HEALTHY' }
    };
  }

  async getHazardPrediction(step?: TimelineStep): Promise<ModelApiResponse<StateAtTimeline['hazards']>> {
    const state = this.getState(step);
    return {
      status: 'success',
      data: state.hazards,
      meta: { source: 'demo', timestamp: new Date().toISOString(), reliability: 0.92, modelHealth: 'HEALTHY' }
    };
  }

  async getInfrastructureImpact(step?: TimelineStep): Promise<ModelApiResponse<StateAtTimeline['infrastructure']>> {
    const state = this.getState(step);
    return {
      status: 'success',
      data: state.infrastructure,
      meta: { source: 'demo', timestamp: new Date().toISOString(), reliability: 0.88, modelHealth: 'HEALTHY' }
    };
  }

  async getUncertainty(step?: TimelineStep): Promise<ModelApiResponse<StateAtTimeline['uncertainty']>> {
    const state = this.getState(step);
    return {
      status: 'success',
      data: state.uncertainty,
      meta: { source: 'demo', timestamp: new Date().toISOString(), reliability: 0.89, modelHealth: 'HEALTHY' }
    };
  }

  async getScenarioPrediction(input: ScenarioInput): Promise<ModelApiResponse<ScenarioOutput>> {
    const rainPct = input.rainfallIncreasePct ?? ((input.rainfallMultiplier ?? 1) - 1) * 100;
    const surge = input.surgeIncrease ?? input.surgeIncreaseMeters ?? 0;
    const wind = input.windSpeed ?? 145;

    const floodedAreaSqKm = Math.round(120 + (rainPct * 1.5) + (surge * 40));
    const populationExposedCount = Math.round(345000 * (1 + (rainPct / 100) + (surge * 0.15)));
    const roadConnectivityPct = Math.max(30, Math.round(88 - (rainPct * 0.4) - (surge * 8)));
    const isolatedVillagesCount = Math.round(5 + (rainPct * 0.3) + (surge * 5));
    const shelterDemandCount = Math.round(82400 * (1 + (rainPct / 100)));
    const infrastructureAtRiskCount = Math.round(18 + (wind > 150 ? 6 : 0) + Math.round(surge * 3));
    const riskChangePercent = Number((((populationExposedCount - 345000) / 345000) * 100).toFixed(1));

    return {
      status: 'success',
      data: {
        floodedAreaSqKm,
        infrastructureAtRiskCount,
        populationExposedCount,
        roadConnectivityPct,
        isolatedVillagesCount,
        shelterDemandCount,
        riskChangePercent
      },
      meta: { source: 'demo', timestamp: new Date().toISOString(), reliability: 0.96, modelHealth: 'HEALTHY' }
    };
  }

  async getAIInsights(step?: TimelineStep): Promise<ModelApiResponse<StateAtTimeline['insights']>> {
    const state = this.getState(step);
    return {
      status: 'success',
      data: state.insights,
      meta: { source: 'demo', timestamp: new Date().toISOString(), reliability: 0.93, modelHealth: 'HEALTHY' }
    };
  }

  async getModelHealth(): Promise<ModelApiResponse<ModelHealthStatus>> {
    return {
      status: 'success',
      data: {
        overall: 'HEALTHY',
        models: {
          regime: 'HEALTHY',
          rainfall: 'HEALTHY',
          flood: 'HEALTHY',
          infrastructure: 'HEALTHY',
          surge: 'HEALTHY'
        },
        lastCalibrated: '2026-10-03 12:00 UTC'
      },
      meta: { source: 'demo', timestamp: new Date().toISOString(), reliability: 0.99, modelHealth: 'HEALTHY' }
    };
  }

  async getDataQuality(step?: TimelineStep): Promise<ModelApiResponse<StateAtTimeline['trustSources']>> {
    const state = this.getState(step);
    return {
      status: 'success',
      data: state.trustSources,
      meta: { source: 'demo', timestamp: new Date().toISOString(), reliability: 0.91, modelHealth: 'HEALTHY' }
    };
  }
}

/**
 * 2. ProductionModelProvider — Calls external Python / FastAPI inference service if configured
 * Falls back to DemoModelProvider if service is unreachable or unconfigured.
 */
export class ProductionModelProvider implements IModelProvider {
  private demoFallback = new DemoModelProvider();
  private baseUrl = process.env.MODEL_SERVICE_URL || process.env.AI_API_URL;

  private async fetchWithFallback<T>(endpoint: string, fallbackMethod: () => Promise<ModelApiResponse<T>>): Promise<ModelApiResponse<T>> {
    if (!this.baseUrl) {
      return fallbackMethod();
    }
    try {
      const res = await fetch(`${this.baseUrl}${endpoint}`, { next: { revalidate: 30 } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      return json as ModelApiResponse<T>;
    } catch (err) {
      console.warn(`[ProductionModelProvider] External AI endpoint ${endpoint} failed. Falling back to Demo Provider:`, err);
      const fallbackRes = await fallbackMethod();
      return {
        ...fallbackRes,
        meta: {
          ...fallbackRes.meta,
          source: 'demo',
          modelHealth: 'DEGRADED'
        }
      };
    }
  }

  async getCycloneData(step?: TimelineStep) {
    return this.fetchWithFallback(`/cyclone?step=${step || 'T-24H'}`, () => this.demoFallback.getCycloneData(step));
  }

  async getRegimePrediction(step?: TimelineStep) {
    return this.fetchWithFallback(`/regime?step=${step || 'T-24H'}`, () => this.demoFallback.getRegimePrediction(step));
  }

  async getForecastCorrection(step?: TimelineStep) {
    return this.fetchWithFallback(`/forecast?step=${step || 'T-24H'}`, () => this.demoFallback.getForecastCorrection(step));
  }

  async getHazardPrediction(step?: TimelineStep) {
    return this.fetchWithFallback(`/hazards?step=${step || 'T-24H'}`, () => this.demoFallback.getHazardPrediction(step));
  }

  async getInfrastructureImpact(step?: TimelineStep) {
    return this.fetchWithFallback(`/infrastructure?step=${step || 'T-24H'}`, () => this.demoFallback.getInfrastructureImpact(step));
  }

  async getUncertainty(step?: TimelineStep) {
    return this.fetchWithFallback(`/uncertainty?step=${step || 'T-24H'}`, () => this.demoFallback.getUncertainty(step));
  }

  async getScenarioPrediction(input: ScenarioInput) {
    return this.demoFallback.getScenarioPrediction(input);
  }

  async getAIInsights(step?: TimelineStep) {
    return this.fetchWithFallback(`/insights?step=${step || 'T-24H'}`, () => this.demoFallback.getAIInsights(step));
  }

  async getModelHealth() {
    return this.fetchWithFallback('/health', () => this.demoFallback.getModelHealth());
  }

  async getDataQuality(step?: TimelineStep) {
    return this.fetchWithFallback(`/data-quality?step=${step || 'T-24H'}`, () => this.demoFallback.getDataQuality(step));
  }
}

/**
 * Factory helper returning appropriate ModelProvider instance
 */
export function getModelProvider(): IModelProvider {
  let isDemo = true;
  try {
    if (typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_DEMO_MODE === 'false') {
      isDemo = false;
    }
    if (typeof import.meta !== 'undefined' && (import.meta as any)?.env?.VITE_DEMO_MODE === 'false') {
      isDemo = false;
    }
  } catch {
    isDemo = true;
  }

  const hasExternalUrl = (typeof process !== 'undefined' && (process.env?.MODEL_SERVICE_URL || process.env?.AI_API_URL));
  if (!isDemo && hasExternalUrl) {
    return new ProductionModelProvider();
  }
  return new DemoModelProvider();
}
