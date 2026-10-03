import React, { useState } from 'react';
import { StateAtTimeline, InfrastructureAsset, AssetType } from '../../types';
import { Building2, Zap, Search, Filter, Layers, ShieldCheck, AlertTriangle, ArrowUpRight } from 'lucide-react';

interface InfrastructureViewProps {
  state: StateAtTimeline;
  onSelectAsset: (asset: InfrastructureAsset) => void;
}

export const InfrastructureView: React.FC<InfrastructureViewProps> = ({
  state,
  onSelectAsset
}) => {
  const { infrastructure, cyclone } = state;
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredAssets = infrastructure.filter((asset) => {
    const matchesType = selectedType === 'ALL' || asset.type === selectedType;
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          asset.hazardExposure.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-20">
      {/* Title */}
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono">
            LAYER 5 VULNERABILITY
          </span>
          <span className="text-slate-400 text-xs font-mono">Step: {cyclone.step}</span>
        </div>
        <h1 className="text-2xl font-black text-slate-100 tracking-tight mt-1 flex items-center space-x-2">
          <Building2 className="w-6 h-6 text-rose-400" />
          <span>INFRASTRUCTURE VULNERABILITY & EXPECTED IMPACT</span>
        </h1>
        <p className="text-xs text-slate-400">
          Statewide critical infrastructure vulnerability profiling, failure probability scoring, elevation risk, and asset fingerprints.
        </p>
      </div>

      {/* Infrastructure Summary Statistics Cards (Prompt Section 17) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {[
          { label: 'Roads at Risk', count: 137, color: 'text-amber-400' },
          { label: 'Bridges at Risk', count: 21, color: 'text-purple-400' },
          { label: 'Power Substations at Risk', count: 14, color: 'text-rose-400' },
          { label: 'Hospitals at Risk', count: 6, color: 'text-cyan-400' },
          { label: 'Schools / Shelters at Risk', count: 32, color: 'text-emerald-400' },
        ].map((stat, idx) => (
          <div key={idx} className="glass-panel p-4 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">{stat.label}</span>
            <div className={`text-2xl font-black ${stat.color}`}>{stat.count}</div>
            <span className="text-[10px] text-slate-500 font-mono">Monitored in GIS</span>
          </div>
        ))}
      </div>

      {/* Search & Filter Bar */}
      <div className="glass-panel p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Pill Filters */}
        <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto py-1">
          {['ALL', 'Substation', 'Hospital', 'Bridge', 'Road', 'School', 'Telecom', 'Water', 'Building'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                selectedType === type
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search asset or hazard..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition"
          />
        </div>
      </div>

      {/* Infrastructure Inventory Table */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-sm font-extrabold text-slate-100 uppercase tracking-wider flex items-center space-x-2">
            <Building2 className="w-4 h-4 text-cyan-400" />
            <span>Asset Risk Inventory ({filteredAssets.length} Assets Listed)</span>
          </h2>
          <span className="text-xs font-mono text-slate-400">Click any row to open Asset Fingerprint</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase font-mono">
                <th className="py-3 px-3">Asset</th>
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-3">Hazard Exposure</th>
                <th className="py-3 px-3 text-center">Failure Prob (%)</th>
                <th className="py-3 px-3">Criticality</th>
                <th className="py-3 px-3">Expected Impact</th>
                <th className="py-3 px-3 text-center">Elevation (m)</th>
                <th className="py-3 px-3 text-center">Conf (%)</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredAssets.map((asset) => {
                const isCrit = asset.failureProbability > 70;
                return (
                  <tr
                    key={asset.id}
                    className="hover:bg-slate-900/80 transition cursor-pointer"
                    onClick={() => onSelectAsset(asset)}
                  >
                    <td className="py-3.5 px-3">
                      <span className="font-bold text-slate-100 block">{asset.name}</span>
                      <span className="text-[10px] text-slate-500 font-mono">Pop: {asset.populationAffected.toLocaleString()}</span>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-cyan-400 border border-slate-800">
                        {asset.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-slate-300">{asset.hazardExposure}</td>
                    <td className="py-3.5 px-3 text-center">
                      <span className={`font-mono font-bold px-2 py-0.5 rounded text-xs ${
                        isCrit ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      }`}>
                        {asset.failureProbability}%
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-semibold text-slate-200">{asset.criticality}</td>
                    <td className="py-3.5 px-3 font-extrabold text-rose-400">{asset.expectedImpact}</td>
                    <td className="py-3.5 px-3 text-center font-mono text-slate-300">{asset.elevationMeters}m</td>
                    <td className="py-3.5 px-3 text-center font-mono text-emerald-400">{asset.confidence}%</td>
                    <td className="py-3.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800">
                        {asset.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectAsset(asset);
                        }}
                        className="p-1.5 rounded bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-700 transition"
                      >
                        <ArrowUpRight className="w-4 h-4" />
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
