import React, { useState } from 'react';
import { StateAtTimeline } from '../../types';
import { InteractiveCycloneMap } from '../map/InteractiveCycloneMap';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Wind, Gauge, Compass, Eye, Satellite, Radio, ShieldCheck, Activity } from 'lucide-react';

interface LiveCycloneViewProps {
  state: StateAtTimeline;
}

export const LiveCycloneView: React.FC<LiveCycloneViewProps> = ({ state }) => {
  const { cyclone, infrastructure } = state;
  const [activeImageryTab, setActiveImageryTab] = useState<'track' | 'doppler' | 'satellite'>('track');

  // Pressure & Wind trend dataset across timeline steps
  const trendData = [
    { step: 'T-48H', wind: 85, pressure: 994 },
    { step: 'T-36H', wind: 110, pressure: 982 },
    { step: 'T-24H', wind: 135, pressure: 974 },
    { step: 'T-12H', wind: 155, pressure: 962 },
    { step: 'T-6H', wind: 160, pressure: 958 },
    { step: 'LANDFALL', wind: 145, pressure: 968 },
    { step: 'T+6H', wind: 95, pressure: 984 },
    { step: 'T+12H', wind: 60, pressure: 996 }
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* View Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono">
              TELEMETRY & RADAR
            </span>
            <span className="text-slate-400 text-xs font-mono">Step: {cyclone.step}</span>
          </div>
          <h1 className="text-2xl font-black text-slate-100 tracking-tight mt-1 flex items-center space-x-2">
            <Wind className="w-6 h-6 text-cyan-400" />
            <span>LIVE CYCLONE TRACK & TELEMETRY</span>
          </h1>
          <p className="text-xs text-slate-400">
            Real-time atmospheric vortex tracking, Doppler velocity reflectivity, and pressure intensification dynamics.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveImageryTab('track')}
            className={`px-3 py-1.5 rounded-lg transition font-medium ${
              activeImageryTab === 'track' ? 'bg-cyan-500 text-slate-950 font-extrabold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            GIS Track Layer
          </button>
          <button
            onClick={() => setActiveImageryTab('doppler')}
            className={`px-3 py-1.5 rounded-lg transition font-medium ${
              activeImageryTab === 'doppler' ? 'bg-cyan-500 text-slate-950 font-extrabold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Doppler Radar Sweep
          </button>
          <button
            onClick={() => setActiveImageryTab('satellite')}
            className={`px-3 py-1.5 rounded-lg transition font-medium ${
              activeImageryTab === 'satellite' ? 'bg-cyan-500 text-slate-950 font-extrabold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            INSAT-3D Satellite IR
          </button>
        </div>
      </div>

      {/* Primary Display Map or Radar Simulation */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {activeImageryTab === 'track' ? (
            <InteractiveCycloneMap cyclone={cyclone} infrastructure={infrastructure} height="h-[520px]" />
          ) : activeImageryTab === 'doppler' ? (
            <div className="relative h-[520px] rounded-xl overflow-hidden border border-slate-800 bg-slate-950 flex flex-col items-center justify-center p-6 text-center shadow-2xl">
              {/* Radar sweep animation overlay */}
              <div className="relative w-80 h-80 rounded-full border border-cyan-500/40 flex items-center justify-center bg-cyan-950/20">
                <div className="w-60 h-60 rounded-full border border-cyan-500/30 flex items-center justify-center">
                  <div className="w-40 h-40 rounded-full border border-cyan-500/20 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full border border-cyan-500/10 flex items-center justify-center">
                      <Radio className="w-8 h-8 text-cyan-400 animate-pulse" />
                    </div>
                  </div>
                </div>
                {/* Radar Sweep Line */}
                <div className="absolute top-0 left-0 w-full h-full rounded-full animate-radar origin-center border-t-2 border-cyan-400/80 bg-gradient-to-tr from-transparent via-cyan-500/10 to-cyan-500/30 pointer-events-none" />
              </div>
              <div className="mt-4 space-y-1">
                <h3 className="text-sm font-bold text-slate-200">Gopalpur Doppler Radar Continuous 3D Reflectivity Scan</h3>
                <p className="text-xs text-slate-400">Peak Reflectivity: 58 dBZ in Eyewall | Doppler Radial Wind Velocity: {cyclone.maxWindKmH} km/h</p>
                <p className="text-[10px] font-mono text-cyan-400">Station Lat: 19.30° N, Lng: 84.87° E | Frequency: S-Band (2.7 GHz)</p>
              </div>
            </div>
          ) : (
            <div className="relative h-[520px] rounded-xl overflow-hidden border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex flex-col items-center justify-center p-6 text-center shadow-2xl">
              <Satellite className="w-16 h-16 text-cyan-400 mb-3 animate-pulse" />
              <h3 className="text-base font-bold text-slate-100">INSAT-3D Thermal Infrared (TIR-1) Channel</h3>
              <p className="text-xs text-slate-400 max-w-md mt-1">
                Brightness temperature of eyewall cloud tops: -82°C (indicating extreme convection height & energetic storm core).
              </p>
              <div className="mt-6 flex space-x-3 text-xs font-mono">
                <span className="px-3 py-1 rounded bg-slate-900 text-cyan-300 border border-slate-800">Resolution: 4km</span>
                <span className="px-3 py-1 rounded bg-slate-900 text-emerald-400 border border-slate-800">Refresh: 15 min</span>
                <span className="px-3 py-1 rounded bg-slate-900 text-purple-400 border border-slate-800">Provider: ISRO MOSDAC</span>
              </div>
            </div>
          )}
        </div>

        {/* Telemetry Detail Stats */}
        <div className="space-y-4">
          <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider border-b border-slate-800 pb-2">
              Storm Core Parameters
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-900 text-slate-300">
                <span>Category Class:</span>
                <span className="font-bold text-rose-400">{cyclone.category}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-900 text-slate-300">
                <span>Maximum Sustained Wind:</span>
                <span className="font-bold text-slate-100 font-mono">{cyclone.maxWindKmH} km/h</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-900 text-slate-300">
                <span>Estimated Peak Gusts:</span>
                <span className="font-bold text-amber-400 font-mono">Math.round({cyclone.maxWindKmH * 1.15}) km/h</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-900 text-slate-300">
                <span>Central Minimum Pressure:</span>
                <span className="font-bold text-cyan-400 font-mono">{cyclone.centralPressureHpa} hPa</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-900 text-slate-300">
                <span>Forward Motion Vector:</span>
                <span className="font-bold text-slate-200">{cyclone.movementDir} @ {cyclone.movementSpeedKmH} km/h</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-900 text-slate-300">
                <span>Landfall Countdown:</span>
                <span className="font-extrabold text-cyan-400 font-mono">{cyclone.landfallEtaHours} hours</span>
              </div>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-2">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider border-b border-slate-800 pb-2">
              Wind Threshold Radii
            </h3>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-300">
                <span className="text-rose-400 font-medium">64 kt (118 km/h) Hurricane Radius:</span>
                <span className="font-mono font-bold">{cyclone.radiusKm.wind64kt} km</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-amber-400 font-medium">50 kt (92 km/h) Storm Radius:</span>
                <span className="font-mono font-bold">{cyclone.radiusKm.wind50kt} km</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-cyan-400 font-medium">34 kt (63 km/h) Gale Radius:</span>
                <span className="font-mono font-bold">{cyclone.radiusKm.wind34kt} km</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pressure & Wind Intensification Trend Chart */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <h2 className="text-sm font-extrabold text-slate-100 uppercase tracking-wider flex items-center space-x-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          <span>Vortex Intensification History & Forecast Curve (Wind Speed vs Pressure)</span>
        </h2>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="step" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis yAxisId="left" stroke="#38bdf8" tick={{ fill: '#38bdf8', fontSize: 11 }} domain={[40, 180]} />
              <YAxis yAxisId="right" orientation="right" stroke="#a855f7" tick={{ fill: '#a855f7', fontSize: 11 }} domain={[950, 1005]} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }} />
              <Line yAxisId="left" type="monotone" dataKey="wind" name="Wind Speed (km/h)" stroke="#38bdf8" strokeWidth={3} dot={{ r: 4 }} />
              <Line yAxisId="right" type="monotone" dataKey="pressure" name="Central Pressure (hPa)" stroke="#a855f7" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
