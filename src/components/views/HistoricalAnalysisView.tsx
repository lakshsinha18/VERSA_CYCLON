import React from 'react';
import { HISTORICAL_CYCLONES, CALIBRATION_STEPS } from '../../data/mockHistoricalData';
import { History, TrendingUp, CheckCircle, RefreshCw, Cpu, Activity } from 'lucide-react';

export const HistoricalAnalysisView: React.FC = () => {
  return (
    <div className="space-y-6 pb-20">
      {/* Title */}
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono">
            POST-EVENT EVALUATION
          </span>
          <span className="text-slate-400 text-xs font-mono">Model Calibration Matrix</span>
        </div>
        <h1 className="text-2xl font-black text-slate-100 tracking-tight mt-1 flex items-center space-x-2">
          <History className="w-6 h-6 text-cyan-400" />
          <span>HISTORICAL PERFORMANCE & MODEL FEEDBACK LOOP</span>
        </h1>
        <p className="text-xs text-slate-400">
          Post-event prediction verification against actual observations, error analysis, and autonomous AI model recalibration.
        </p>
      </div>

      {/* Predicted vs Actual Highlight Table (Prompt Section 28) */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <h2 className="text-sm font-extrabold text-slate-100 uppercase tracking-wider flex items-center space-x-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          <span>Cyclone VAYU-X Verification: PREDICTED vs ACTUAL GROUND TRUTH</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase font-mono">
                <th className="py-2.5 px-3">Variable</th>
                <th className="py-2.5 px-3 text-center">Raw NWP Model</th>
                <th className="py-2.5 px-3 text-center">VERSA AI Corrected</th>
                <th className="py-2.5 px-3 text-center font-bold text-emerald-400">Actual Observed Ground Truth</th>
                <th className="py-2.5 px-3 text-right">VERSA Error Reduction</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              <tr className="hover:bg-slate-900/60">
                <td className="py-3 px-3 font-bold text-slate-200">Max Sustained Wind</td>
                <td className="py-3 px-3 text-center font-mono text-slate-400">136 km/h</td>
                <td className="py-3 px-3 text-center font-mono text-cyan-300 font-bold">145 km/h</td>
                <td className="py-3 px-3 text-center font-mono text-emerald-400 font-extrabold">151 km/h</td>
                <td className="py-3 px-3 text-right font-mono text-emerald-400 font-bold">64.2% Error Reduction</td>
              </tr>

              <tr className="hover:bg-slate-900/60">
                <td className="py-3 px-3 font-bold text-slate-200">Accumulated Rainfall</td>
                <td className="py-3 px-3 text-center font-mono text-slate-400">128 mm</td>
                <td className="py-3 px-3 text-center font-mono text-cyan-300 font-bold">174 mm</td>
                <td className="py-3 px-3 text-center font-mono text-emerald-400 font-extrabold">181 mm</td>
                <td className="py-3 px-3 text-right font-mono text-emerald-400 font-bold">88.5% Accuracy Match</td>
              </tr>

              <tr className="hover:bg-slate-900/60">
                <td className="py-3 px-3 font-bold text-slate-200">Max Flood Depth</td>
                <td className="py-3 px-3 text-center font-mono text-slate-400">0.9 m</td>
                <td className="py-3 px-3 text-center font-mono text-cyan-300 font-bold">1.4 m</td>
                <td className="py-3 px-3 text-center font-mono text-emerald-400 font-extrabold">1.6 m</td>
                <td className="py-3 px-3 text-right font-mono text-emerald-400 font-bold">71.4% Error Reduction</td>
              </tr>

              <tr className="hover:bg-slate-900/60">
                <td className="py-3 px-3 font-bold text-slate-200">Track Error Distance</td>
                <td className="py-3 px-3 text-center font-mono text-slate-400">42 km</td>
                <td className="py-3 px-3 text-center font-mono text-cyan-300 font-bold">15 km</td>
                <td className="py-3 px-3 text-center font-mono text-emerald-400 font-extrabold">12 km</td>
                <td className="py-3 px-3 text-right font-mono text-emerald-400 font-bold">68.0% Error Reduction</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Model Calibration Feedback Loop (Prompt Section 28) */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <h2 className="text-xs font-extrabold text-cyan-400 uppercase tracking-widest text-center">
          Autonomous Model Calibration Loop
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
          {CALIBRATION_STEPS.map((s, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-1">
              <span className="text-[10px] font-mono text-cyan-400 font-bold block">{s.step}</span>
              <p className="text-[11px] text-slate-300 leading-tight">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Historical Cyclones Performance Database */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <h2 className="text-sm font-extrabold text-slate-100 uppercase tracking-wider flex items-center space-x-2">
          <History className="w-4 h-4 text-purple-400" />
          <span>Historical Cyclone Performance Benchmark (2013 - 2026)</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase font-mono">
                <th className="py-2.5 px-3">Cyclone Event</th>
                <th className="py-2.5 px-3">Landfall Sector</th>
                <th className="py-2.5 px-3 text-center">Raw GFS Track Error</th>
                <th className="py-2.5 px-3 text-center">VERSA AI Track Error</th>
                <th className="py-2.5 px-3 text-center">Actual Rainfall</th>
                <th className="py-2.5 px-3 text-right">VERSA Error Reduction</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {HISTORICAL_CYCLONES.map((c) => (
                <tr key={c.id} className="hover:bg-slate-900/60">
                  <td className="py-3 px-3 font-bold text-slate-100">{c.cycloneName} ({c.year})</td>
                  <td className="py-3 px-3 text-slate-400">{c.landfallLocation}</td>
                  <td className="py-3 px-3 text-center font-mono text-slate-400">{c.rawGfsTrackErrorKm} km</td>
                  <td className="py-3 px-3 text-center font-mono text-cyan-400 font-bold">{c.versaAiTrackErrorKm} km</td>
                  <td className="py-3 px-3 text-center font-mono text-slate-200">{c.actualRainfallMm} mm</td>
                  <td className="py-3 px-3 text-right font-mono text-emerald-400 font-bold">{c.errorReductionPct}% Reduction</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
