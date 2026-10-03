import React, { useState } from 'react';
import { StateAtTimeline } from '../../types';
import { Sliders, RefreshCcw, ArrowRight, AlertTriangle, ShieldCheck, Activity, CheckCircle2, Navigation } from 'lucide-react';

interface WhatIfSimulationViewProps {
  state: StateAtTimeline;
}

export const WhatIfSimulationView: React.FC<WhatIfSimulationViewProps> = ({ state }) => {
  const { responseStats, cyclone } = state;

  const presets = [
    { id: 'p1', title: '1. Cyclone shifts 30 km north', trackShift: 30, rainPct: 0, wind: 145, landfallShift: 0, surge: 0 },
    { id: 'p2', title: '2. Rainfall increases by 20%', trackShift: 0, rainPct: 20, wind: 145, landfallShift: 0, surge: 0 },
    { id: 'p3', title: '3. Wind increases to 160 km/h', trackShift: 0, rainPct: 0, wind: 160, landfallShift: 0, surge: 0 },
    { id: 'p4', title: '4. Landfall occurs 6 hours earlier', trackShift: 0, rainPct: 0, wind: 145, landfallShift: -6, surge: 0 },
    { id: 'p5', title: '5. Storm surge increases by 0.5 m', trackShift: 0, rainPct: 0, wind: 145, landfallShift: 0, surge: 0.5 },
  ];

  const [activePreset, setActivePreset] = useState<string>('p1');
  const [trackShift, setTrackShift] = useState<number>(30);
  const [rainIncreasePct, setRainIncreasePct] = useState<number>(0);
  const [windSpeed, setWindSpeed] = useState<number>(145);
  const [landfallShift, setLandfallShift] = useState<number>(0);
  const [surgeIncrease, setSurgeIncrease] = useState<number>(0);

  const applyPreset = (preset: typeof presets[0]) => {
    setActivePreset(preset.id);
    setTrackShift(preset.trackShift);
    setRainIncreasePct(preset.rainPct);
    setWindSpeed(preset.wind);
    setLandfallShift(preset.landfallShift);
    setSurgeIncrease(preset.surge);
  };

  // Simulated before vs after calculation
  const simPopExposed = Math.round(responseStats.populationAtRisk * (1 + (rainIncreasePct / 100) + (surgeIncrease * 0.15)));
  const simConnectivity = Math.max(30, Math.round(responseStats.connectivityPct - (rainIncreasePct * 0.5) - (surgeIncrease * 8)));
  const simIsolatedVillages = Math.round(responseStats.isolatedVillagesCount + (rainIncreasePct * 0.4) + (surgeIncrease * 6));
  const simShelterDemand = Math.round(responseStats.criticalRiskPopulation * (1 + (rainIncreasePct / 100)));

  return (
    <div className="space-y-6 pb-20">
      {/* Title */}
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono">
            LAYER 6 SCENARIO ENGINE
          </span>
          <span className="text-slate-400 text-xs font-mono">Step: {cyclone.step}</span>
        </div>
        <h1 className="text-2xl font-black text-slate-100 tracking-tight mt-1 flex items-center space-x-2">
          <Sliders className="w-6 h-6 text-purple-400" />
          <span>WHAT-IF SCENARIO SIMULATOR & CONNECTIVITY IMPACT</span>
        </h1>
        <p className="text-xs text-slate-400">
          Simulate alternative track shifts, surge increases, and landfall time shifts before issuing emergency directives.
        </p>
      </div>

      {/* Preset Scenarios Selector (Prompt Section 22) */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
        <h2 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider">
          Select Preset What-If Scenarios
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {presets.map((p) => {
            const isActive = activePreset === p.id;
            return (
              <button
                key={p.id}
                onClick={() => applyPreset(p)}
                className={`p-3 rounded-xl text-xs font-bold text-left transition ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/20 border border-purple-400'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {p.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* BEFORE vs AFTER Metrics Comparison Table */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <h2 className="text-sm font-extrabold text-slate-100 uppercase tracking-wider flex items-center space-x-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          <span>Scenario Comparison: CURRENT BASELINE vs SIMULATED IMPACT</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase font-mono">
                <th className="py-2.5 px-3">Metric Impact Variable</th>
                <th className="py-2.5 px-3 text-center">Baseline Forecast</th>
                <th className="py-2.5 px-3 text-center">Simulated What-If</th>
                <th className="py-2.5 px-3 text-right">Variance Delta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              <tr className="hover:bg-slate-900/60">
                <td className="py-3 px-3 font-bold text-slate-200">Population Exposed to Risk</td>
                <td className="py-3 px-3 text-center font-mono text-slate-400">{responseStats.populationAtRisk.toLocaleString()}</td>
                <td className="py-3 px-3 text-center font-mono font-bold text-rose-400">{simPopExposed.toLocaleString()}</td>
                <td className="py-3 px-3 text-right font-mono text-rose-400 font-bold">
                  +{(simPopExposed - responseStats.populationAtRisk).toLocaleString()} (+{(((simPopExposed - responseStats.populationAtRisk) / responseStats.populationAtRisk) * 100).toFixed(1)}%)
                </td>
              </tr>

              <tr className="hover:bg-slate-900/60">
                <td className="py-3 px-3 font-bold text-slate-200">Road Network Connectivity</td>
                <td className="py-3 px-3 text-center font-mono text-emerald-400 font-bold">{responseStats.connectivityPct}%</td>
                <td className="py-3 px-3 text-center font-mono font-bold text-amber-400">{simConnectivity}%</td>
                <td className="py-3 px-3 text-right font-mono text-amber-400 font-bold">
                  {(simConnectivity - responseStats.connectivityPct)}%
                </td>
              </tr>

              <tr className="hover:bg-slate-900/60">
                <td className="py-3 px-3 font-bold text-slate-200">Isolated Interior Villages</td>
                <td className="py-3 px-3 text-center font-mono text-slate-400">{responseStats.isolatedVillagesCount} villages</td>
                <td className="py-3 px-3 text-center font-mono font-bold text-rose-400">{simIsolatedVillages} villages</td>
                <td className="py-3 px-3 text-right font-mono text-rose-400 font-bold">
                  +{simIsolatedVillages - responseStats.isolatedVillagesCount} cut off
                </td>
              </tr>

              <tr className="hover:bg-slate-900/60">
                <td className="py-3 px-3 font-bold text-slate-200">Emergency Shelter Demand</td>
                <td className="py-3 px-3 text-center font-mono text-slate-400">{responseStats.criticalRiskPopulation.toLocaleString()} people</td>
                <td className="py-3 px-3 text-center font-mono font-bold text-cyan-300">{simShelterDemand.toLocaleString()} people</td>
                <td className="py-3 px-3 text-right font-mono text-cyan-400 font-bold">
                  +{(simShelterDemand - responseStats.criticalRiskPopulation).toLocaleString()} beds required
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Network Connectivity & Route Isolation Panel (Prompt Section 23) */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Navigation className="w-5 h-5 text-cyan-400" />
            <h2 className="text-sm font-extrabold text-slate-100 uppercase tracking-wider">
              Network Connectivity & Alternate Emergency Evacuation Routes
            </h2>
          </div>
          <span className="text-xs font-mono text-cyan-400">Current Connectivity: {responseStats.connectivityPct}%</span>
        </div>

        <div className="grid md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-slate-400 font-bold block">Primary Cut-Off Bridges</span>
            <p className="text-rose-400 font-bold">Rushikulya Estuary Bridge #3 (Inundated)</p>
            <p className="text-slate-400 text-[10px]">Failure probability: 78% | Submerged under 1.9m floodwaters</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-slate-400 font-bold block">Isolated High-Risk Hubs</span>
            <p className="text-amber-400 font-bold">District Hospital #4 & 5 Interior Panchayats</p>
            <p className="text-slate-400 text-[10px]">Road access blocked along NH-16 coastal segment</p>
          </div>

          <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800 space-y-2">
            <span className="text-cyan-400 font-bold block">Recommended Alternate Diversion</span>
            <p className="text-slate-200 font-bold">State Highway SH-32 Bypass Corridor</p>
            <p className="text-cyan-300 text-[10px]">Verified clear of flood inundation; speed limit 50 km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
};
