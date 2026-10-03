import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle, Polygon, LayerGroup } from 'react-leaflet';
import L from 'leaflet';
import { CyclonePoint, InfrastructureAsset } from '../../types';
import {
  Wind,
  Layers,
  Building2,
  Zap,
  Activity,
  AlertOctagon,
  Eye,
  CheckSquare,
  Square
} from 'lucide-react';

interface InteractiveCycloneMapProps {
  cyclone: CyclonePoint;
  infrastructure: InfrastructureAsset[];
  onSelectAsset?: (asset: InfrastructureAsset) => void;
  height?: string;
  showSimulatedSurge?: boolean;
}

// Custom Leaflet Icons using SVG strings
const createCustomIcon = (type: string, color: string, isPulsing: boolean = false) => {
  let svgIcon = '';

  switch (type) {
    case 'cyclone':
      svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="animate-spin"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`;
      break;
    case 'Substation':
      svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`;
      break;
    case 'Hospital':
      svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6v12M6 12h12"/></svg>`;
      break;
    case 'Bridge':
      svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10M2 19h20M9 19V12M15 19V12"/></svg>`;
      break;
    default:
      svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" stroke="${color}"><circle cx="12" cy="12" r="8"/></svg>`;
      break;
  }

  const html = `
    <div class="relative flex items-center justify-center w-8 h-8 rounded-full bg-slate-950/90 border border-slate-700 shadow-lg ${isPulsing ? 'pulse-ring-red' : ''}">
      <div class="w-5 h-5 text-center flex items-center justify-center">
        ${svgIcon}
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-leaflet-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

export const InteractiveCycloneMap: React.FC<InteractiveCycloneMapProps> = ({
  cyclone,
  infrastructure,
  onSelectAsset,
  height = 'h-[550px]',
  showSimulatedSurge = false
}) => {
  // Layer Visibility Controls
  const [layers, setLayers] = useState({
    cycloneTrack: true,
    forecastCone: true,
    windRadius: true,
    floodInundation: true,
    stormSurge: true,
    infrastructure: true,
    evacuationZones: true
  });

  const toggleLayer = (layerKey: keyof typeof layers) => {
    setLayers((prev) => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  // Coastal Flood & Surge Polygon coordinates (Gopalpur / Ganjam coast)
  const floodZoneCoords: [number, number][] = [
    [18.60, 84.15],
    [18.68, 84.18],
    [18.75, 84.25],
    [18.78, 84.35],
    [18.70, 84.32],
    [18.62, 84.22]
  ];

  const stormSurgeCoords: [number, number][] = [
    [18.65, 84.20],
    [18.72, 84.25],
    [18.76, 84.32],
    [18.74, 84.36],
    [18.66, 84.28]
  ];

  // Landfall coordinates
  const landfallPoint: [number, number] = [18.71, 84.20];

  return (
    <div className={`relative w-full ${height} rounded-xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950`}>
      {/* Map Control Bar Overlay */}
      <div className="absolute top-3 left-3 z-[1000] glass-panel rounded-xl p-2.5 max-w-xs shadow-2xl border border-slate-800 text-xs">
        <div className="flex items-center justify-between font-bold text-slate-200 border-b border-slate-800/80 pb-2 mb-2">
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>GIS Map Layers</span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">MAPLIBRE / LEAFLET</span>
        </div>

        <div className="space-y-1.5 max-h-48 overflow-y-auto">
          {[
            { key: 'cycloneTrack', label: 'Cyclone Track & Cone', color: 'text-cyan-400' },
            { key: 'windRadius', label: 'Wind Radius Bands', color: 'text-amber-400' },
            { key: 'floodInundation', label: 'Flood Inundation Overlay', color: 'text-blue-400' },
            { key: 'stormSurge', label: 'Storm Surge Danger Zone', color: 'text-rose-400' },
            { key: 'infrastructure', label: 'Infrastructure Assets', color: 'text-emerald-400' },
            { key: 'evacuationZones', label: 'Evacuation Shelter Zones', color: 'text-purple-400' },
          ].map((item) => {
            const isChecked = layers[item.key as keyof typeof layers];
            return (
              <button
                key={item.key}
                onClick={() => toggleLayer(item.key as keyof typeof layers)}
                className={`w-full flex items-center justify-between px-2 py-1 rounded text-left transition ${
                  isChecked ? 'bg-slate-900/90 text-slate-200' : 'text-slate-500 hover:text-slate-400'
                }`}
              >
                <div className="flex items-center space-x-2">
                  {isChecked ? (
                    <CheckSquare className={`w-3.5 h-3.5 ${item.color}`} />
                  ) : (
                    <Square className="w-3.5 h-3.5 text-slate-600" />
                  )}
                  <span className="text-[11px] font-medium">{item.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Map Legend (Bottom Right) */}
      <div className="absolute bottom-3 right-3 z-[1000] glass-panel rounded-xl p-2.5 text-[11px] border border-slate-800 text-slate-300 space-y-1 shadow-2xl">
        <div className="font-bold text-slate-200 flex items-center space-x-1.5 pb-1 border-b border-slate-800">
          <Activity className="w-3.5 h-3.5 text-cyan-400" />
          <span>Legend</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block animate-pulse"></span>
          <span>Cyclone Eye ({cyclone.maxWindKmH} km/h)</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-0.5 bg-cyan-400 inline-block"></span>
          <span>VERSA Track Path</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded bg-rose-500/40 border border-rose-500 inline-block"></span>
          <span>High Risk Asset (&gt;70% Fail)</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded bg-amber-500/40 border border-amber-500 inline-block"></span>
          <span>Moderate Risk (30-70% Fail)</span>
        </div>
      </div>

      {/* Actual Map Container */}
      <MapContainer
        center={[cyclone.lat, cyclone.lng]}
        zoom={8}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Forecast Cone */}
        {layers.forecastCone && cyclone.forecastCone.map((cone, i) => (
          <Circle
            key={`cone-${i}`}
            center={[cone.lat, cone.lng]}
            radius={cone.radiusKm * 1000}
            pathOptions={{ color: '#00f2fe', fillColor: '#38bdf8', fillOpacity: 0.1, weight: 1, dashArray: '4,4' }}
          />
        ))}

        {/* Wind Radius Overlay */}
        {layers.windRadius && (
          <LayerGroup>
            {/* 64kt Extreme Wind Radius */}
            <Circle
              center={[cyclone.lat, cyclone.lng]}
              radius={cyclone.radiusKm.wind64kt * 1000}
              pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.25, weight: 1.5 }}
            />
            {/* 50kt Storm Wind Radius */}
            <Circle
              center={[cyclone.lat, cyclone.lng]}
              radius={cyclone.radiusKm.wind50kt * 1000}
              pathOptions={{ color: '#f59e0b', fillColor: '#f59e0b', fillOpacity: 0.15, weight: 1 }}
            />
            {/* 34kt Gale Wind Radius */}
            <Circle
              center={[cyclone.lat, cyclone.lng]}
              radius={cyclone.radiusKm.wind34kt * 1000}
              pathOptions={{ color: '#38bdf8', fillColor: '#38bdf8', fillOpacity: 0.08, weight: 1 }}
            />
          </LayerGroup>
        )}

        {/* Flood Inundation Polygon */}
        {layers.floodInundation && (
          <Polygon
            positions={floodZoneCoords}
            pathOptions={{ color: '#3b82f6', fillColor: '#1d4ed8', fillOpacity: 0.4, weight: 1.5 }}
          >
            <Popup>
              <div className="p-1 text-xs">
                <strong className="text-blue-400 block">High Flood Inundation Zone</strong>
                <p className="text-slate-300">Predicted depth: 1.4m - 2.45m</p>
                <p className="text-slate-400 text-[10px]">Basin catchment: Rushikulya river estuary</p>
              </div>
            </Popup>
          </Polygon>
        )}

        {/* Storm Surge Zone Polygon */}
        {(layers.stormSurge || showSimulatedSurge) && (
          <Polygon
            positions={stormSurgeCoords}
            pathOptions={{ color: '#e11d48', fillColor: '#be123c', fillOpacity: 0.45, weight: 2 }}
          >
            <Popup>
              <div className="p-1 text-xs">
                <strong className="text-rose-400 block">Coastal Storm Surge Danger Belt</strong>
                <p className="text-slate-300">Peak Surge: 1.6m - 2.6m wave crest</p>
              </div>
            </Popup>
          </Polygon>
        )}

        {/* Forecast Track Polyline */}
        {layers.cycloneTrack && (
          <Polyline
            positions={cyclone.forecastCone.map((c) => [c.lat, c.lng])}
            pathOptions={{ color: '#00f2fe', weight: 3, dashArray: '6,6' }}
          />
        )}

        {/* Cyclone Eye Marker */}
        <Marker
          position={[cyclone.lat, cyclone.lng]}
          icon={createCustomIcon('cyclone', '#ef4444', true)}
        >
          <Popup>
            <div className="p-2 space-y-1 text-xs">
              <div className="font-extrabold text-cyan-400 flex items-center space-x-1">
                <Wind className="w-4 h-4" />
                <span>CYCLONE VAYU-X</span>
              </div>
              <p className="text-slate-200"><strong>Category:</strong> {cyclone.category}</p>
              <p className="text-slate-200"><strong>Max Sustained Wind:</strong> {cyclone.maxWindKmH} km/h</p>
              <p className="text-slate-200"><strong>Central Pressure:</strong> {cyclone.centralPressureHpa} hPa</p>
              <p className="text-slate-300"><strong>Landfall ETA:</strong> {cyclone.landfallEtaHours} hours</p>
            </div>
          </Popup>
        </Marker>

        {/* Landfall Marker */}
        <Marker
          position={landfallPoint}
          icon={createCustomIcon('landfall', '#f43f5e')}
        >
          <Popup>
            <div className="p-1 text-xs">
              <strong className="text-rose-400 block">Predicted Landfall Site</strong>
              <p className="text-slate-200">Gopalpur Coast (18.71° N, 84.20° E)</p>
            </div>
          </Popup>
        </Marker>

        {/* Infrastructure Assets Markers */}
        {layers.infrastructure && infrastructure.map((asset) => {
          const isCriticalRisk = asset.failureProbability > 70;
          const isModerateRisk = asset.failureProbability >= 30 && asset.failureProbability <= 70;
          const color = isCriticalRisk ? '#ef4444' : isModerateRisk ? '#f59e0b' : '#10b981';

          return (
            <Marker
              key={asset.id}
              position={[asset.lat, asset.lng]}
              icon={createCustomIcon(asset.type, color)}
              eventHandlers={{
                click: () => {
                  if (onSelectAsset) onSelectAsset(asset);
                }
              }}
            >
              <Popup>
                <div className="p-2 text-xs space-y-1 max-w-xs">
                  <div className="font-bold text-slate-100 border-b border-slate-800 pb-1 flex justify-between items-center">
                    <span>{asset.name}</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-cyan-300">{asset.type}</span>
                  </div>
                  <p className="text-slate-300"><strong>Failure Probability:</strong> <span className={isCriticalRisk ? 'text-rose-400 font-bold' : 'text-amber-400 font-bold'}>{asset.failureProbability}%</span></p>
                  <p className="text-slate-300"><strong>Criticality:</strong> {asset.criticality}</p>
                  <p className="text-slate-400 text-[10px]"><strong>Action:</strong> {asset.recommendedAction}</p>
                  {onSelectAsset && (
                    <button
                      onClick={() => onSelectAsset(asset)}
                      className="w-full mt-2 py-1 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded text-[11px] transition"
                    >
                      View Asset Fingerprint & Risk Drivers →
                    </button>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};
