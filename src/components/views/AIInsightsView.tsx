import React from 'react';
import { StateAtTimeline } from '../../types';
import { Sparkles, HelpCircle, Activity, ShieldAlert, CheckCircle2, MessageSquare, AlertOctagon, Layers } from 'lucide-react';

interface AIInsightsViewProps {
  state: StateAtTimeline;
}

export const AIInsightsView: React.FC<AIInsightsViewProps> = ({ state }) => {
  const { insights, trustSources, cyclone, infrastructure } = state;
  const conflictSource = trustSources.find(s => s.status === 'CONFLICT_DETECTED');

  return (
    <div className="space-y-6 pb-20">
      {/* Title */}
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono">
            EXPLAINABLE AI CORE
          </span>
          <span className="text-slate-400 text-xs font-mono">Step: {cyclone.step}</span>
        </div>
        <h1 className="text-2xl font-black text-slate-100 tracking-tight mt-1 flex items-center space-x-2">
          <Sparkles className="w-6 h-6 text-cyan-400" />
          <span>VERSA AI INSIGHTS & EXPLAINABLE AI (XAI)</span>
        </h1>
        <p className="text-xs text-slate-400">
          Transparent, interpretable reasoning for model predictions, sensor anomaly resolution, and automated risk explainers.
        </p>
      </div>

      {/* Sensor Conflict Solver (Prompt Section 8) */}
      {conflictSource && conflictSource.conflictDetails && (
        <div className="glass-panel p-5 rounded-2xl border border-amber-500/40 bg-amber-950/20 space-y-3">
          <div className="flex items-center justify-between border-b border-amber-500/30 pb-2">
            <div className="flex items-center space-x-2">
              <AlertOctagon className="w-5 h-5 text-amber-400" />
              <h2 className="text-xs font-extrabold text-amber-300 uppercase tracking-wider">
                DATA TRUST ENGINE: Sensor Discrepancy Resolved by AI
              </h2>
            </div>
            <span className="text-[10px] font-mono text-amber-400 font-bold">Reliability Score: {conflictSource.reliabilityScore}%</span>
          </div>

          <p className="text-xs text-slate-200">
            Discrepancy detected between <strong>Satellite Telemetry</strong> and <strong>Ground Weather Gauges</strong>.
          </p>

          <div className="grid sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-slate-400 text-[10px] block">Satellite Observation</span>
              <span className="text-sm font-extrabold text-cyan-400">{conflictSource.conflictDetails.satelliteValue}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-slate-400 text-[10px] block">Ground Gauge Reading</span>
              <span className="text-sm font-extrabold text-amber-400">{conflictSource.conflictDetails.groundValue}</span>
            </div>
            <div className="p-3 rounded-xl bg-cyan-950 border border-cyan-800 text-center">
              <span className="text-cyan-400 text-[10px] font-bold block">VERSA AI-Weighted Estimate</span>
              <span className="text-sm font-black text-emerald-400">{conflictSource.conflictDetails.aiWeightedValue}</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-300 bg-slate-950/80 p-2.5 rounded border border-slate-900">
            <strong>AI Resolution Explanation:</strong> {conflictSource.conflictDetails.resolutionExplanation}
          </p>
        </div>
      )}

      {/* Explainable AI "WHY THIS PREDICTION?" Panel (Prompt Section 26) */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <HelpCircle className="w-5 h-5 text-cyan-400" />
            <h2 className="text-sm font-extrabold text-slate-100 uppercase tracking-wider">
              Explainable AI: “WHY THIS PREDICTION?”
            </h2>
          </div>
          <span className="text-xs font-mono text-cyan-400">SHAP / LIME Feature Attribution</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-slate-100">{infrastructure[0].name} Failure Probability</span>
            <span className="font-extrabold text-rose-400 font-mono">{infrastructure[0].failureProbability}% (Critical Risk)</span>
          </div>

          <div className="space-y-1.5 text-xs">
            {[
              { factor: 'Predicted Flood Depth (1.4m)', contrib: 27, color: 'bg-blue-500' },
              { factor: 'Max Wind Speed Exposure (145 km/h)', contrib: 32, color: 'bg-amber-500' },
              { factor: 'Low Elevation Profile (3.2m MSL)', contrib: 18, color: 'bg-purple-500' },
              { factor: 'Infrastructure Age (18 Years)', contrib: 13, color: 'bg-rose-500' },
              { factor: 'Historical Incident Damage Count', contrib: 10, color: 'bg-slate-500' }
            ].map((f, i) => (
              <div key={i} className="space-y-0.5">
                <div className="flex justify-between text-slate-300 text-[11px]">
                  <span>{f.factor}</span>
                  <span className="font-mono font-bold">{f.contrib}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                  <div className={`h-full ${f.color}`} style={{ width: `${f.contrib}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 text-xs text-slate-300 flex items-center space-x-2">
            <span className="font-bold text-cyan-400">Primary Risk Driver:</span>
            <span>“Predicted inundation depth from coastal storm surge.”</span>
          </div>
        </div>
      </div>

      {/* Conversational AI Insights Stream (Prompt Section 27) */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-cyan-400" />
            <h2 className="text-sm font-extrabold text-slate-100 uppercase tracking-wider">
              VERSA AI Conversational Intelligence Stream
            </h2>
          </div>
          <span className="text-xs font-mono text-cyan-400">Realtime NLP Feed</span>
        </div>

        <div className="space-y-3">
          {insights.map((ins) => (
            <div
              key={ins.id}
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 hover:border-cyan-500/40 transition"
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-slate-950 text-cyan-400 border border-slate-800">
                    {ins.category}
                  </span>
                  <span className="font-bold text-slate-200">{ins.title}</span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">{ins.timestamp}</span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{ins.description}</p>

              <div className="p-2 rounded bg-slate-950 text-[11px] text-slate-400 border border-slate-900">
                <strong>Why:</strong> {ins.whyExplanation}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
