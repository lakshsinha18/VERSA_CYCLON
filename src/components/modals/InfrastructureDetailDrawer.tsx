import React from 'react';
import { X, Building2, AlertTriangle, ShieldCheck, Zap, Layers, HelpCircle, Activity, ChevronRight, CheckCircle2 } from 'lucide-react';
import { InfrastructureAsset } from '../../types';

interface InfrastructureDetailDrawerProps {
  asset: InfrastructureAsset | null;
  onClose: () => void;
  onAcceptAction?: (actionTitle: string) => void;
}

export const InfrastructureDetailDrawer: React.FC<InfrastructureDetailDrawerProps> = ({
  asset,
  onClose,
  onAcceptAction
}) => {
  if (!asset) return null;

  const isCritical = asset.failureProbability > 70;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-md bg-slate-950 border-l border-slate-800 h-full overflow-y-auto p-6 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        <div>
          {/* Header */}
          <div className="flex items-start justify-between border-b border-slate-800 pb-4 mb-5">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">
                  {asset.type.toUpperCase()}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  isCritical ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                }`}>
                  {asset.criticality} Priority
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-100">{asset.name}</h2>
              <p className="text-xs text-slate-400 font-mono">ID: {asset.id} | Coords: {asset.lat.toFixed(2)}°N, {asset.lng.toFixed(2)}°E</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Key Metrics grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="glass-panel p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">Failure Probability</span>
              <div className="flex items-baseline space-x-2">
                <span className={`text-2xl font-black ${isCritical ? 'text-rose-400' : 'text-amber-400'}`}>
                  {asset.failureProbability}%
                </span>
                <span className="text-[10px] text-slate-400">Confidence: {asset.confidence}%</span>
              </div>
            </div>

            <div className="glass-panel p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">Expected Impact</span>
              <div className="text-lg font-bold text-rose-400">
                {asset.expectedImpact}
              </div>
              <span className="text-[10px] text-slate-400">Pop. Affected: {asset.populationAffected.toLocaleString()}</span>
            </div>

            <div className="glass-panel p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">Elevation</span>
              <div className="text-sm font-bold text-slate-200">
                {asset.elevationMeters} meters
              </div>
              <span className="text-[10px] text-slate-400">Flood depth: {asset.floodExposureMeters}m</span>
            </div>

            <div className="glass-panel p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">Wind Exposure</span>
              <div className="text-sm font-bold text-slate-200">
                {asset.windExposureKmH} km/h
              </div>
              <span className="text-[10px] text-slate-400">Age: {asset.ageYears} yrs</span>
            </div>
          </div>

          {/* Risk Driver Breakdown (Explainable AI) */}
          <div className="glass-panel p-4 rounded-xl border border-slate-800 mb-6 space-y-3">
            <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">AI Risk Drivers Breakdown</h3>
            </div>
            
            {[
              { label: 'Wind Exposure Impact', weight: asset.riskDrivers.windExposure, color: 'bg-amber-500' },
              { label: 'Flood & Surge Exposure', weight: asset.riskDrivers.floodExposure, color: 'bg-blue-500' },
              { label: 'Low Site Elevation Risk', weight: asset.riskDrivers.elevation, color: 'bg-purple-500' },
              { label: 'Infrastructure Structural Age', weight: asset.riskDrivers.infrastructureAge, color: 'bg-rose-500' },
              { label: 'Historical Incident Vulnerability', weight: asset.riskDrivers.historicalDamage, color: 'bg-slate-500' },
            ].map((driver, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>{driver.label}</span>
                  <span className="font-mono font-bold">{driver.weight}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                  <div className={`h-full ${driver.color} rounded-full`} style={{ width: `${driver.weight}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Infrastructure Fingerprint */}
          <div className="glass-panel p-4 rounded-xl border border-slate-800 mb-6 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center space-x-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Infrastructure Fingerprint</h3>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Data Quality Audit</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Construction Type</span>
                <span className="font-semibold text-emerald-400">{asset.fingerprint.constructionType} Data</span>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Elevation Profile</span>
                <span className="font-semibold text-emerald-400">{asset.fingerprint.elevation} Data</span>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Structural Integrity</span>
                <span className="font-semibold text-amber-400">{asset.fingerprint.structuralCondition}</span>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Maintenance Logs</span>
                <span className="font-semibold text-slate-400">{asset.fingerprint.maintenanceStatus}</span>
              </div>
            </div>

            <p className="text-[10px] text-slate-400 pt-1">
              * Note: Estimated data fields carry higher model uncertainty. Verified static data is prioritized.
            </p>
          </div>

          {/* Recommended Action */}
          <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/60 space-y-2">
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">Recommended AI Decision Support Action</span>
            <p className="text-xs font-medium text-slate-200">{asset.recommendedAction}</p>
          </div>
        </div>

        {/* Footer Action button */}
        <div className="pt-4 border-t border-slate-800 flex items-center space-x-2">
          <button
            onClick={() => {
              if (onAcceptAction) onAcceptAction(asset.recommendedAction);
              onClose();
            }}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-cyan-500/20 transition flex items-center justify-center space-x-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Accept Action Directive</span>
          </button>
        </div>
      </div>
    </div>
  );
};
