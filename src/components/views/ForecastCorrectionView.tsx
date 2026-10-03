import React from 'react';
import { StateAtTimeline } from '../../types';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { TrendingUp, ShieldCheck, Activity, Layers, AlertCircle, ArrowUpRight, Cpu } from 'lucide-react';

interface ForecastCorrectionViewProps {
  state: StateAtTimeline;
}

export const ForecastCorrectionView: React.FC<ForecastCorrectionViewProps> = ({ state }) => {
  const { corrections, ensemble, uncertainty, cyclone } = state;

  // Comparison dataset for Recharts
  const chartData = corrections.map((c) => ({
    name: c.label,
    Raw: c.raw,
    VERSA_Corrected: c.corrected,
    unit: c.unit
  }));

  const ensembleData = ensemble.map((m) => ({
    model: m.name,
    TrackError: m.trackErrorKm,
    Wind: m.predictedWindKmH,
    Rainfall: m.predictedRainfallMm,
    Confidence: m.confidence
  }));

  return (
    <div className="space-y-6 pb-20">
      {/* Title */}
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono">
            LAYER 4 ENGINE
          </span>
          <span className="text-slate-400 text-xs font-mono">Step: {cyclone.step}</span>
        </div>
        <h1 className="text-2xl font-black text-slate-100 tracking-tight mt-1 flex items-center space-x-2">
          <TrendingUp className="w-6 h-6 text-cyan-400" />
          <span>VERSA FORECAST CORRECTION & ENSEMBLE CONSENSUS</span>
        </h1>
        <p className="text-xs text-slate-400">
          Raw numerical weather forecasts are systematically corrected using neural bias estimation, radar feedback, and multi-model ensemble weighting.
        </p>
      </div>

      {/* 4 Major Metric Correction Cards (Prompt Section 11) */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {corrections.map((c, i) => (
          <div key={i} className="glass-panel p-4 rounded-xl border border-slate-800 space-y-3 relative overflow-hidden">
            <div className="flex justify-between items-center text-xs text-slate-400 border-b border-slate-800/80 pb-2">
              <span className="font-bold text-slate-200">{c.label}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 font-mono">
                {c.metric}
              </span>
            </div>

            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Raw NWP</span>
                <span className="text-lg font-bold text-slate-400 line-through">{c.raw} <span className="text-xs font-normal">{c.unit}</span></span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-cyan-400 block font-bold uppercase">VERSA AI Corrected</span>
                <span className="text-2xl font-black text-cyan-300">{c.corrected} <span className="text-xs font-normal">{c.unit}</span></span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-900">
              <span className="text-emerald-400 font-bold font-mono">Correction: +{c.correctionPercent}%</span>
              <span className="text-slate-400 text-[10px]">Conf: {c.confidence}%</span>
            </div>

            <p className="text-[10px] text-slate-400 bg-slate-950 p-2 rounded border border-slate-900 leading-tight">
              {c.systematicBiasReason}
            </p>
          </div>
        ))}
      </div>

      {/* Recharts Comparison Chart */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-extrabold text-slate-100 uppercase tracking-wider flex items-center space-x-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span>RAW NWP Forecast vs VERSA AI-Corrected Baseline</span>
          </h2>
          <span className="text-xs font-mono text-cyan-400">Systematic Bias Elimination</span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }} />
              <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }} />
              <Bar dataKey="Raw" fill="#475569" radius={[4, 4, 0, 0]} />
              <Bar dataKey="VERSA_Corrected" fill="#00f2fe" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <p className="text-xs text-slate-400 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
          “Correction estimates systematic model bias using historical observations and current weather regime conditions.”
        </p>
      </div>

      {/* Ensemble Forecasting Models Comparison (Prompt Section 12) */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-sm font-extrabold text-slate-100 uppercase tracking-wider flex items-center space-x-2">
              <Layers className="w-4 h-4 text-purple-400" />
              <span>Multi-Model Ensemble Consensus & Track Divergence</span>
            </h2>
            <p className="text-xs text-slate-400">
              Why VERSA does not rely on a single forecast model: Multi-model consensus reduces track error variance.
            </p>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Ensemble Consensus</span>
            <span className="text-xs font-bold text-cyan-400 font-mono">Track Uncertainty: ±{uncertainty.trackKm}km</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase font-mono">
                <th className="py-2.5 px-3">Model</th>
                <th className="py-2.5 px-3">Provider</th>
                <th className="py-2.5 px-3 text-center">Track Error (Km)</th>
                <th className="py-2.5 px-3 text-center">Predicted Wind</th>
                <th className="py-2.5 px-3 text-center">Predicted Rain</th>
                <th className="py-2.5 px-3 text-center">Storm Surge</th>
                <th className="py-2.5 px-3 text-right">Confidence Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {ensemble.map((m) => (
                <tr key={m.modelId} className={`hover:bg-slate-900/60 transition ${
                  m.modelId === 'VERSA_ENSEMBLE' ? 'bg-cyan-950/40 font-bold border-l-2 border-cyan-400' : ''
                }`}>
                  <td className="py-3 px-3 flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: m.color }} />
                    <span className="text-slate-100">{m.name}</span>
                  </td>
                  <td className="py-3 px-3 text-slate-400">{m.provider}</td>
                  <td className="py-3 px-3 text-center font-mono text-cyan-400 font-bold">{m.trackErrorKm} km</td>
                  <td className="py-3 px-3 text-center font-mono text-slate-200">{m.predictedWindKmH} km/h</td>
                  <td className="py-3 px-3 text-center font-mono text-slate-200">{m.predictedRainfallMm} mm</td>
                  <td className="py-3 px-3 text-center font-mono text-slate-200">{m.predictedSurgeM} m</td>
                  <td className="py-3 px-3 text-right font-mono text-emerald-400 font-bold">{m.confidence}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confidence Governor & Self-Aware Uncertainty Engine (Prompt Section 13 & 14) */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Forecast Uncertainty Bands */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
          <h2 className="text-xs font-extrabold text-slate-100 uppercase tracking-wider flex items-center space-x-2 border-b border-slate-800 pb-2">
            <Activity className="w-4 h-4 text-purple-400" />
            <span>Self-Aware Forecast Uncertainty Quantification</span>
          </h2>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between p-2 rounded bg-slate-900 border border-slate-800">
              <span className="text-slate-300">Track Uncertainty Band:</span>
              <span className="font-mono font-bold text-cyan-400">±{uncertainty.trackKm} km</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-slate-900 border border-slate-800">
              <span className="text-slate-300">Rainfall Volume Uncertainty:</span>
              <span className="font-mono font-bold text-blue-400">±{uncertainty.rainfallMm} mm</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-slate-900 border border-slate-800">
              <span className="text-slate-300">Peak Wind Speed Uncertainty:</span>
              <span className="font-mono font-bold text-amber-400">±{uncertainty.windKmH} km/h</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-slate-900 border border-slate-800">
              <span className="text-slate-300">Flood Inundation Depth Uncertainty:</span>
              <span className="font-mono font-bold text-rose-400">±{uncertainty.floodDepthM} m</span>
            </div>
          </div>
        </div>

        {/* Confidence Governor Component */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
          <h2 className="text-xs font-extrabold text-slate-100 uppercase tracking-wider flex items-center space-x-2 border-b border-slate-800 pb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Confidence Governor System</span>
          </h2>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-mono">Current System Threshold</span>
              <span className="text-lg font-black text-emerald-400">{uncertainty.governorLevel} ({uncertainty.overallConfidence}%)</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold">
              ✓
            </div>
          </div>

          <div className="space-y-1 text-[11px] text-slate-400">
            <p><strong>HIGH CONFIDENCE (&gt;80%):</strong> Actionable automated decision-support predictions enabled.</p>
            <p><strong>MEDIUM CONFIDENCE (60-80%):</strong> Verification required from regional radar telemetry.</p>
            <p><strong>LOW CONFIDENCE (&lt;60%):</strong> Human-in-the-loop manual verification strictly mandatory.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
