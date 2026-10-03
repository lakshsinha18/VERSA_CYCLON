import React from 'react';
import { StateAtTimeline } from '../../types';
import { AlertTriangle, Wind, CloudRain, Waves, ShieldAlert, Mountain, Sparkles, Layers, Activity } from 'lucide-react';

interface HazardIntelligenceViewProps {
  state: StateAtTimeline;
}

export const HazardIntelligenceView: React.FC<HazardIntelligenceViewProps> = ({ state }) => {
  const { hazards, cyclone } = state;

  const hazardCards = [
    { key: 'wind', title: 'WIND SHEARING HAZARD', icon: Wind, color: 'text-amber-400', border: 'border-amber-500/40', data: hazards.wind },
    { key: 'rainfall', title: 'EXTREME RAINFALL DELUGE', icon: CloudRain, color: 'text-blue-400', border: 'border-blue-500/40', data: hazards.rainfall },
    { key: 'flood', title: 'BASIN INUNDATION FLOOD', icon: ShieldAlert, color: 'text-purple-400', border: 'border-purple-500/40', data: hazards.flood },
    { key: 'surge', title: 'COASTAL STORM SURGE', icon: Waves, color: 'text-rose-400', border: 'border-rose-500/40', data: hazards.surge },
    { key: 'landslide', title: 'HILL SLOPE LANDSLIDE', icon: Mountain, color: 'text-amber-600', border: 'border-amber-700/40', data: hazards.landslide },
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Title */}
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono">
            LAYER 5 HAZARD CORE
          </span>
          <span className="text-slate-400 text-xs font-mono">Step: {cyclone.step}</span>
        </div>
        <h1 className="text-2xl font-black text-slate-100 tracking-tight mt-1 flex items-center space-x-2">
          <AlertTriangle className="w-6 h-6 text-amber-400" />
          <span>MULTI-HAZARD INTELLIGENCE & RISK FRAMEWORK</span>
        </h1>
        <p className="text-xs text-slate-400">
          Coupled multi-hazard evaluation separating physical hazard intensity, geographic exposure, physical vulnerability, and asset criticality.
        </p>
      </div>

      {/* Conceptual Risk Formula Component (Prompt Section 16) */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <h2 className="text-xs font-extrabold text-cyan-400 uppercase tracking-widest text-center">
          VERSA Platform Risk Quantification Framework
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center">
          <div className="flex-1 p-3 rounded-xl bg-slate-900 border border-slate-800 w-full">
            <span className="text-xs font-bold text-amber-400 block">HAZARD</span>
            <span className="text-[10px] text-slate-400">What will environment do?</span>
          </div>

          <span className="text-slate-500 font-bold text-sm">×</span>

          <div className="flex-1 p-3 rounded-xl bg-slate-900 border border-slate-800 w-full">
            <span className="text-xs font-bold text-blue-400 block">EXPOSURE</span>
            <span className="text-[10px] text-slate-400">What is located there?</span>
          </div>

          <span className="text-slate-500 font-bold text-sm">×</span>

          <div className="flex-1 p-3 rounded-xl bg-slate-900 border border-slate-800 w-full">
            <span className="text-xs font-bold text-purple-400 block">VULNERABILITY</span>
            <span className="text-[10px] text-slate-400">How susceptible is it?</span>
          </div>

          <span className="text-slate-500 font-bold text-sm">×</span>

          <div className="flex-1 p-3 rounded-xl bg-slate-900 border border-slate-800 w-full">
            <span className="text-xs font-bold text-rose-400 block">CRITICALITY</span>
            <span className="text-[10px] text-slate-400">How important is it?</span>
          </div>

          <span className="text-slate-500 font-bold text-sm">=</span>

          <div className="flex-1 p-3 rounded-xl bg-cyan-950 border border-cyan-700/80 w-full shadow-lg shadow-cyan-500/10">
            <span className="text-xs font-black text-cyan-300 block">EXPECTED IMPACT</span>
            <span className="text-[10px] text-cyan-400 font-bold">Actionable Consequence</span>
          </div>
        </div>
      </div>

      {/* Multi-Hazard Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hazardCards.map((item) => {
          const Icon = item.icon;
          const { level, prob, confidence, value } = item.data;
          const isExtreme = level === 'Extreme';

          return (
            <div key={item.key} className={`glass-panel p-5 rounded-2xl border ${item.border} space-y-4`}>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2.5">
                  <Icon className={`w-5 h-5 ${item.color}`} />
                  <h3 className="text-xs font-extrabold text-slate-100 tracking-wider">{item.title}</h3>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  isExtreme ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                }`}>
                  {level} Risk
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-slate-400">Occurrence Probability</span>
                  <span className="font-mono font-black text-xl text-slate-100">{prob}%</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                  <div className={`h-full ${isExtreme ? 'bg-rose-500' : 'bg-amber-500'} rounded-full`} style={{ width: `${prob}%` }} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-900">
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Forecast Value</span>
                  <span className="font-bold text-cyan-300">{value}</span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Model Confidence</span>
                  <span className="font-bold text-emerald-400">{confidence}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
