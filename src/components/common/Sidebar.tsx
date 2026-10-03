import React from 'react';
import {
  LayoutDashboard,
  Wind,
  BrainCircuit,
  TrendingUp,
  AlertTriangle,
  Building2,
  Box,
  Sliders,
  Siren,
  History,
  Sparkles,
  ChevronRight,
  Home
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
  onLandingClick: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onNavigate,
  onLandingClick
}) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, badge: 'Live' },
    { id: 'live-cyclone', label: 'Live Cyclone', icon: Wind, badge: 'Track' },
    { id: 'regime', label: 'Regime Intelligence', icon: BrainCircuit, badge: 'AI' },
    { id: 'forecast', label: 'Forecast Correction', icon: TrendingUp, badge: 'VERSA' },
    { id: 'hazards', label: 'Hazard Intelligence', icon: AlertTriangle, badge: 'Multi' },
    { id: 'infrastructure', label: 'Infrastructure', icon: Building2, badge: 'Vulnerability' },
    { id: 'digital-twin', label: 'Digital Twin', icon: Box, badge: 'GIS' },
    { id: 'what-if', label: 'What-If Simulation', icon: Sliders, badge: 'Simulator' },
    { id: 'response', label: 'Response Center', icon: Siren, badge: 'EOC' },
    { id: 'historical', label: 'Historical Analysis', icon: History, badge: 'Eval' },
    { id: 'ai-insights', label: 'AI Insights', icon: Sparkles, badge: 'Explainable' },
  ];

  return (
    <aside className="w-64 bg-slate-950/80 border-r border-slate-800/80 flex flex-col justify-between h-[calc(100vh-4rem)] sticky top-16 z-30 select-none overflow-y-auto">
      <div className="py-4 px-3 space-y-1">
        {/* Landing Page Return Button */}
        <button
          onClick={onLandingClick}
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900/80 transition-all group mb-3 border border-dashed border-slate-800"
        >
          <div className="flex items-center space-x-3">
            <Home className="w-4 h-4 text-slate-400 group-hover:text-cyan-400" />
            <span className="text-xs font-semibold">Landing Page</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>

        <div className="px-3 pb-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          Intelligence Command Layers
        </div>

        {/* Navigation Items */}
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/20 via-blue-600/20 to-transparent text-cyan-300 border-l-2 border-cyan-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 transition-colors ${
                  isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'
                }`} />
                <span>{item.label}</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                isActive
                  ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400/40'
                  : 'bg-slate-900 text-slate-500 group-hover:text-slate-400'
              }`}>
                {item.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* System info footer */}
      <div className="p-4 border-t border-slate-900 bg-slate-950/60 text-slate-500 text-[11px] space-y-1">
        <div className="flex justify-between items-center">
          <span>VERSA Engine:</span>
          <span className="font-mono text-cyan-400">v4.2-Pro</span>
        </div>
        <div className="flex justify-between items-center">
          <span>AI MoE Router:</span>
          <span className="font-mono text-emerald-400">ACTIVE</span>
        </div>
        <p className="text-[10px] text-slate-600 pt-2 border-t border-slate-900">
          Smart India Hackathon 2026 Edition
        </p>
      </div>
    </aside>
  );
};
