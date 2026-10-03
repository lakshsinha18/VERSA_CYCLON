import React, { useState } from 'react';
import { StateAtTimeline, InfrastructureAsset } from '../../types';
import { InteractiveCycloneMap } from '../map/InteractiveCycloneMap';
import { Box, Sliders, Layers, Eye, RefreshCw, AlertOctagon, Building2, Wind, CloudRain, Waves } from 'lucide-react';

interface DigitalTwinViewProps {
  state: StateAtTimeline;
  onSelectAsset: (asset: InfrastructureAsset) => void;
}

export const DigitalTwinView: React.FC<DigitalTwinViewProps> = ({ state, onSelectAsset }) => {
  const { cyclone, infrastructure } = state;

  // Dynamic sliders state
  const [simWind, setSimWind] = useState<number>(cyclone.maxWindKmH);
  const [simRain, setSimRain] = useState<number>(174);
  const [simSurge, setSimSurge] = useState<number>(1.6);
  const [simTimeOffset, setSimTimeOffset] = useState<number>(0);

  // Recalculated metrics based on sliders
  const floodedAreaSqKm = Math.round(120 + (simRain * 0.8) + (simSurge * 40));
  const inundatedBuildings = Math.round(1450 + (simRain * 6.5) + (simSurge * 320));
  const powerOutageGridPct = Math.min(100, Math.round((simWind / 180) * 100));

  const handleReset = () => {
    setSimWind(cyclone.maxWindKmH);
    setSimRain(174);
    setSimSurge(1.6);
    setSimTimeOffset(0);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono">
              LAYER 6 DIGITAL TWIN
            </span>
            <span className="text-slate-400 text-xs font-mono">Coastal District Grid</span>
          </div>
          <h1 className="text-2xl font-black text-slate-100 tracking-tight mt-1 flex items-center space-x-2">
            <Box className="w-6 h-6 text-cyan-400" />
            <span>COASTAL DISTRICT DIGITAL TWIN</span>
          </h1>
          <p className="text-xs text-slate-400">
            Real-time GIS spatial simulation of buildings, transport corridors, power grids, and population inundation.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-bold transition flex items-center space-x-1"
        >
          <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
          <span>Reset Simulation</span>
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Map Display */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider flex items-center space-x-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Ganjam District 3D/GIS Digital Twin Surface</span>
            </h2>
            <span className="text-xs text-cyan-400 font-mono">Live Physics Coupling Active</span>
          </div>

          <InteractiveCycloneMap
            cyclone={{ ...cyclone, maxWindKmH: simWind }}
            infrastructure={infrastructure.map(a => ({
              ...a,
              failureProbability: Math.min(99, Math.round(a.failureProbability * (simWind / cyclone.maxWindKmH)))
            }))}
            onSelectAsset={onSelectAsset}
            height="h-[520px]"
            showSimulatedSurge={simSurge > 2.0}
          />
        </div>

        {/* Dynamic Controls Side Panel (Prompt Section 21) */}
        <div className="space-y-4">
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-xs font-extrabold text-slate-100 uppercase tracking-wider border-b border-slate-800 pb-2 flex items-center justify-between">
              <span>Digital Twin Parametric Controls</span>
              <Sliders className="w-4 h-4 text-cyan-400" />
            </h3>

            {/* Slider 1: Wind Speed */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 flex items-center space-x-1">
                  <Wind className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Max Sustained Wind</span>
                </span>
                <span className="font-mono font-bold text-cyan-400">{simWind} km/h</span>
              </div>
              <input
                type="range"
                min={80}
                max={220}
                step={5}
                value={simWind}
                onChange={(e) => setSimWind(Number(e.target.value))}
                className="w-full accent-cyan-400 bg-slate-900 h-1.5 rounded cursor-pointer"
              />
            </div>

            {/* Slider 2: Rainfall */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 flex items-center space-x-1">
                  <CloudRain className="w-3.5 h-3.5 text-blue-400" />
                  <span>24h Rainfall Accumulation</span>
                </span>
                <span className="font-mono font-bold text-blue-400">{simRain} mm</span>
              </div>
              <input
                type="range"
                min={50}
                max={400}
                step={10}
                value={simRain}
                onChange={(e) => setSimRain(Number(e.target.value))}
                className="w-full accent-blue-400 bg-slate-900 h-1.5 rounded cursor-pointer"
              />
            </div>

            {/* Slider 3: Storm Surge */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 flex items-center space-x-1">
                  <Waves className="w-3.5 h-3.5 text-rose-400" />
                  <span>Coastal Storm Surge Crest</span>
                </span>
                <span className="font-mono font-bold text-rose-400">{simSurge} m</span>
              </div>
              <input
                type="range"
                min={0.5}
                max={4.5}
                step={0.1}
                value={simSurge}
                onChange={(e) => setSimSurge(Number(e.target.value))}
                className="w-full accent-rose-400 bg-slate-900 h-1.5 rounded cursor-pointer"
              />
            </div>

            {/* Slider 4: Time Offset */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Landfall Time Shift:</span>
                <span className="font-mono font-bold text-purple-400">{simTimeOffset > 0 ? `+${simTimeOffset}h` : `${simTimeOffset}h`}</span>
              </div>
              <input
                type="range"
                min={-12}
                max={12}
                step={1}
                value={simTimeOffset}
                onChange={(e) => setSimTimeOffset(Number(e.target.value))}
                className="w-full accent-purple-400 bg-slate-900 h-1.5 rounded cursor-pointer"
              />
            </div>
          </div>

          {/* Real-time Dynamic Twin Impact Output */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-xs font-extrabold text-slate-100 uppercase tracking-wider border-b border-slate-800 pb-2">
              Dynamic Twin Simulation Metrics
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-300">Inundated Land Surface:</span>
                <span className="font-mono font-bold text-blue-400">{floodedAreaSqKm} sq km</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-300">Buildings Inundated:</span>
                <span className="font-mono font-bold text-rose-400">{inundatedBuildings.toLocaleString()} structures</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-300">Power Grid Failure Pct:</span>
                <span className="font-mono font-bold text-amber-400">{powerOutageGridPct}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
