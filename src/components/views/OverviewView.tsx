import React from 'react';
import { StateAtTimeline, InfrastructureAsset } from '../../types';
import { InteractiveCycloneMap } from '../map/InteractiveCycloneMap';
import {
  Wind,
  Gauge,
  Compass,
  Clock,
  ShieldCheck,
  BrainCircuit,
  TrendingUp,
  AlertTriangle,
  Building2,
  CheckCircle2,
  ChevronRight,
  Activity,
  Layers,
  Sparkles,
  Zap,
  ArrowUpRight
} from 'lucide-react';

interface OverviewViewProps {
  state: StateAtTimeline;
  onNavigate: (view: string) => void;
  onSelectAsset: (asset: InfrastructureAsset) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  state,
  onNavigate,
  onSelectAsset
}) => {
  const { cyclone, regimes, experts, corrections, trustSources, infrastructure, uncertainty, responseStats } = state;
  const activeRegime = regimes.find(r => r.isActive) || regimes[0];

  const criticalAssets = infrastructure.filter(a => a.failureProbability > 70);

  return (
    <div className="space-y-6 pb-20">
      {/* 1. Primary Live Cyclone Telemetry Status Header (Section 6) */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-800/80 pb-4 mb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/40 text-[10px] font-extrabold uppercase tracking-widest flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping inline-block mr-1"></span>
                {cyclone.category}
              </span>
              <span className="text-slate-400 text-xs font-mono">• ETA Landfall: <strong className="text-cyan-400 font-bold">{cyclone.landfallEtaHours}h</strong></span>
            </div>
            <h1 className="text-2xl font-black text-slate-100 tracking-tight mt-1 flex items-center space-x-2">
              <span>CYCLONE VAYU-X</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono">
                {cyclone.step}
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              Target Landfall Sector: Gopalpur Coast (18.7° N, 84.2° E) | Regime: <strong className="text-cyan-300">{activeRegime.name}</strong>
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onNavigate('live-cyclone')}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold transition flex items-center space-x-1.5"
            >
              <Wind className="w-3.5 h-3.5 text-cyan-400" />
              <span>Full Telemetry</span>
            </button>
            <button
              onClick={() => onNavigate('response')}
              className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition flex items-center space-x-1.5"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Action Directives</span>
            </button>
          </div>
        </div>

        {/* Live Metrics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-[10px] uppercase font-semibold mb-1">
              <span>Max Wind</span>
              <Wind className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-lg font-black text-slate-100">{cyclone.maxWindKmH} <span className="text-xs font-normal text-slate-400">km/h</span></div>
            <div className="text-[10px] text-amber-400 font-mono">Gale radius: {cyclone.radiusKm.wind34kt}km</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-[10px] uppercase font-semibold mb-1">
              <span>Central Pressure</span>
              <Gauge className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div className="text-lg font-black text-slate-100">{cyclone.centralPressureHpa} <span className="text-xs font-normal text-slate-400">hPa</span></div>
            <div className="text-[10px] text-slate-400 font-mono">Pressure Drop: -12hPa</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-[10px] uppercase font-semibold mb-1">
              <span>Position</span>
              <Compass className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div className="text-sm font-bold text-slate-100">{cyclone.lat}° N, {cyclone.lng}° E</div>
            <div className="text-[10px] text-cyan-400 font-mono">Heading: {cyclone.movementDir} @ {cyclone.movementSpeedKmH}km/h</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-[10px] uppercase font-semibold mb-1">
              <span>VERSA Confidence</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-lg font-black text-emerald-400">{uncertainty.overallConfidence}%</div>
            <div className="text-[10px] text-slate-400 font-mono">{uncertainty.governorLevel}</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-[10px] uppercase font-semibold mb-1">
              <span>Population Exposure</span>
              <Activity className="w-3.5 h-3.5 text-rose-400" />
            </div>
            <div className="text-lg font-black text-rose-400">{(responseStats.criticalRiskPopulation / 1000).toFixed(1)}k</div>
            <div className="text-[10px] text-slate-400 font-mono">Total Risk: {(responseStats.populationAtRisk / 1000).toFixed(0)}k</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-[10px] uppercase font-semibold mb-1">
              <span>Evacuation Done</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-lg font-black text-emerald-400">{responseStats.evacuationCompletionPct}%</div>
            <div className="text-[10px] text-slate-400 font-mono">{responseStats.sheltersActive} Shelters Active</div>
          </div>
        </div>
      </div>

      {/* 2. Main Interactive Map & Side Intelligence Panels */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Largest Visual Component: Interactive GIS Map */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold text-slate-200 uppercase tracking-wider flex items-center space-x-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Real-Time GIS Cyclone & Infrastructure Command Map</span>
            </h2>
            <span className="text-xs text-slate-400 font-mono">Click asset marker for failure fingerprint</span>
          </div>

          <InteractiveCycloneMap
            cyclone={cyclone}
            infrastructure={infrastructure}
            onSelectAsset={onSelectAsset}
            height="h-[520px]"
          />
        </div>

        {/* Right Intelligence Column */}
        <div className="space-y-4">
          {/* Regime Intelligence Card */}
          <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center space-x-2">
                <BrainCircuit className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Active Weather Regime</h3>
              </div>
              <button
                onClick={() => onNavigate('regime')}
                className="text-[10px] text-cyan-400 hover:underline font-mono"
              >
                View MoE →
              </button>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-extrabold text-cyan-300">{activeRegime.name}</span>
                <span className="font-mono font-bold text-cyan-400">{activeRegime.probability}%</span>
              </div>
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden mb-2">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" style={{ width: `${activeRegime.probability}%` }} />
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                {activeRegime.description}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-900">
              <span className="text-[10px] text-slate-500 uppercase font-mono block mb-1">Top Active AI Expert</span>
              <div className="flex items-center justify-between text-xs bg-slate-900/90 p-2 rounded border border-slate-800">
                <span className="font-bold text-slate-200">{experts[1].name}</span>
                <span className="text-emerald-400 font-mono text-[10px]">Weight: {(experts[1].weight * 100).toFixed(0)}%</span>
              </div>
            </div>
          </div>

          {/* VERSA Forecast Correction Quick View */}
          <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">VERSA Forecast Correction</h3>
              </div>
              <button
                onClick={() => onNavigate('forecast')}
                className="text-[10px] text-cyan-400 hover:underline font-mono"
              >
                Details →
              </button>
            </div>

            <div className="space-y-2 text-xs">
              {corrections.slice(0, 3).map((c, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded bg-slate-900/80 border border-slate-800">
                  <div>
                    <span className="text-slate-400 block text-[10px]">{c.label}</span>
                    <span className="text-slate-200 font-medium">RAW: {c.raw} {c.unit}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-cyan-300 block">VERSA: {c.corrected} {c.unit}</span>
                    <span className="text-[10px] text-emerald-400 font-mono">+{c.correctionPercent}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Data Trust Engine Summary */}
          <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Data Trust Engine</h3>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono">Avg Reliability: 91%</span>
            </div>

            <div className="space-y-1.5 text-xs">
              {trustSources.slice(0, 3).map((src) => (
                <div key={src.id} className="flex items-center justify-between text-slate-300">
                  <span className="text-[11px] truncate max-w-[170px]">{src.name}</span>
                  <span className={`font-mono text-[11px] font-bold ${
                    src.reliabilityScore > 90 ? 'text-emerald-400' : 'text-amber-400'
                  }`}>
                    {src.reliabilityScore}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Critical Infrastructure Vulnerability Table Highlights (Section 17) */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-base font-extrabold text-slate-100 flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-rose-400" />
              <span>Critical Infrastructure Expected Impact Priority Matrix</span>
            </h2>
            <p className="text-xs text-slate-400">
              Calculated via: Hazard × Exposure × Vulnerability × Criticality = Expected Impact
            </p>
          </div>
          <button
            onClick={() => onNavigate('infrastructure')}
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-700 text-xs font-bold transition flex items-center space-x-1"
          >
            <span>View All Infrastructure Assets</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase font-mono">
                <th className="py-2.5 px-3">Asset Name</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">Hazard Exposure</th>
                <th className="py-2.5 px-3 text-center">Failure Prob (%)</th>
                <th className="py-2.5 px-3">Criticality</th>
                <th className="py-2.5 px-3">Expected Impact</th>
                <th className="py-2.5 px-3">Status Directive</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {infrastructure.slice(0, 5).map((asset) => {
                const isCrit = asset.failureProbability > 70;
                return (
                  <tr
                    key={asset.id}
                    className="hover:bg-slate-900/60 transition cursor-pointer"
                    onClick={() => onSelectAsset(asset)}
                  >
                    <td className="py-3 px-3 font-bold text-slate-200">{asset.name}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-cyan-400 border border-slate-800">
                        {asset.type}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-300">{asset.hazardExposure}</td>
                    <td className="py-3 px-3 text-center">
                      <span className={`font-mono font-bold px-2 py-0.5 rounded text-xs ${
                        isCrit ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      }`}>
                        {asset.failureProbability}%
                      </span>
                    </td>
                    <td className="py-3 px-3 font-semibold text-slate-200">{asset.criticality}</td>
                    <td className="py-3 px-3">
                      <span className={`font-extrabold ${asset.expectedImpact === 'Very High' ? 'text-rose-400' : 'text-amber-400'}`}>
                        {asset.expectedImpact}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800">
                        {asset.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectAsset(asset);
                        }}
                        className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-700 text-[11px] transition"
                      >
                        Inspect →
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
