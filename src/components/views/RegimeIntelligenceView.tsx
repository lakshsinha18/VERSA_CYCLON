import React from 'react';
import { StateAtTimeline } from '../../types';
import { BrainCircuit, Cpu, Zap, ShieldCheck, CheckCircle, Activity, Sparkles, Layers } from 'lucide-react';

interface RegimeIntelligenceViewProps {
  state: StateAtTimeline;
}

export const RegimeIntelligenceView: React.FC<RegimeIntelligenceViewProps> = ({ state }) => {
  const { regimes, experts, cyclone } = state;
  const activeRegime = regimes.find(r => r.isActive) || regimes[0];

  return (
    <div className="space-y-6 pb-20">
      {/* Title */}
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono">
            LAYER 3 & 4 ARCHITECTURE
          </span>
          <span className="text-slate-400 text-xs font-mono">Step: {cyclone.step}</span>
        </div>
        <h1 className="text-2xl font-black text-slate-100 tracking-tight mt-1 flex items-center space-x-2">
          <BrainCircuit className="w-6 h-6 text-cyan-400" />
          <span>REGIME INTELLIGENCE & DYNAMIC AI EXPERT ROUTER</span>
        </h1>
        <p className="text-xs text-slate-400">
          Mixture-of-Experts (MoE) architecture: Contextual neural routers continuously classify the active meteorological regime and re-weight specialized AI models.
        </p>
      </div>

      {/* Active Regime Highlights Box */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 relative overflow-hidden space-y-4">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest block mb-1">Current Classified Regime</span>
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-black text-cyan-300">{activeRegime.name}</span>
              <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 text-xs font-bold flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Confidence: {activeRegime.probability}%</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">{activeRegime.description}</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-right min-w-[200px]">
            <span className="text-[10px] text-slate-500 uppercase font-mono block">Router Dispatch Status</span>
            <span className="text-xs font-bold text-emerald-400 flex items-center justify-end space-x-1 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block mr-1"></span>
              OPTIMAL MOE ROUTING
            </span>
            <p className="text-[10px] text-slate-400 mt-1">6 Neural Experts Dynamically Weighted</p>
          </div>
        </div>

        {/* Dynamic Explanation */}
        <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-800/60 text-xs text-cyan-200 flex items-center space-x-3">
          <Cpu className="w-5 h-5 text-cyan-400 shrink-0" />
          <span>
            <strong>AI MoE Reasoning:</strong> Rainfall and Hydrological Flood Experts have been prioritized with higher execution weights because extreme precipitation regime probability expanded to {activeRegime.probability}%.
          </span>
        </div>
      </div>

      {/* Weather Regimes Probabilities Grid */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <h2 className="text-sm font-extrabold text-slate-100 uppercase tracking-wider flex items-center space-x-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          <span>Cyclone Phase & Weather Regime Classification Spectrum</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {regimes.map((regime) => {
            return (
              <div
                key={regime.id}
                className={`p-4 rounded-xl border transition-all ${
                  regime.isActive
                    ? 'bg-slate-900/90 border-cyan-500/60 shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-950/60 border-slate-800/80'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs font-bold ${regime.isActive ? 'text-cyan-300' : 'text-slate-300'}`}>
                      {regime.name}
                    </span>
                    {regime.isActive && (
                      <span className="px-1.5 py-0.5 rounded bg-cyan-500/30 text-cyan-200 text-[9px] font-bold uppercase">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <span className="font-mono font-bold text-xs text-cyan-400">{regime.probability}%</span>
                </div>

                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden mb-2">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      regime.isActive ? 'bg-gradient-to-r from-cyan-400 to-blue-500' : 'bg-slate-700'
                    }`}
                    style={{ width: `${regime.probability}%` }}
                  />
                </div>

                <p className="text-[11px] text-slate-400">{regime.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dynamic AI Expert Router Section */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-sm font-extrabold text-slate-100 uppercase tracking-wider flex items-center space-x-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Active AI Mixture-of-Experts (MoE) Architecture</span>
            </h2>
            <p className="text-xs text-slate-400">
              Specialized neural networks activated and weighted dynamically based on live hazard regime.
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400">MoE Gating Network</span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {experts.map((exp) => {
            const isActive = exp.status === 'ACTIVE';
            return (
              <div
                key={exp.id}
                className={`p-4 rounded-xl border transition-all ${
                  isActive ? 'bg-slate-900/90 border-slate-700' : 'bg-slate-950/40 border-slate-900 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-100">{exp.name}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                    isActive ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {exp.status}
                  </span>
                </div>

                <p className="text-[11px] text-slate-400 mb-3">{exp.role}</p>

                <div className="space-y-2 text-xs border-t border-slate-800/80 pt-2">
                  <div className="flex justify-between text-slate-300">
                    <span>Gating Weight:</span>
                    <span className="font-mono font-bold text-cyan-400">{(exp.weight * 100).toFixed(0)}%</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Historical Accuracy:</span>
                    <span className="font-mono font-bold text-emerald-400">{exp.accuracyScore}%</span>
                  </div>
                </div>

                <div className="mt-3 p-2 rounded bg-slate-950 text-[10px] text-slate-400 border border-slate-800">
                  {exp.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
