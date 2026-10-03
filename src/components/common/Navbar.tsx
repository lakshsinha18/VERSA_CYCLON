import React from 'react';
import { Radio, Bell, Shield, Activity, Sparkles, Layers } from 'lucide-react';
import { TimelineStep } from '../../types';

interface NavbarProps {
  currentStep: TimelineStep;
  activeView: string;
  onNavigate: (view: string) => void;
  onLandingClick: () => void;
  alertCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentStep,
  onNavigate,
  onLandingClick,
  alertCount
}) => {
  return (
    <header className="h-16 bg-slate-950/90 border-b border-slate-800/80 px-4 md:px-6 flex items-center justify-between sticky top-0 z-40 backdrop-blur-xl">
      {/* Brand / Logo */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onLandingClick}
          className="flex items-center space-x-3 group text-left focus:outline-none"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
            <Radio className="w-5 h-5 text-white animate-pulse" />
            <div className="absolute inset-0 rounded-xl border border-white/20"></div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-lg tracking-wider bg-gradient-to-r from-cyan-400 via-sky-200 to-blue-400 bg-clip-text text-transparent">
                VERSA-CYCLONE
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                AI
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide">
              Regime-Aware Cyclone & Infrastructure Intelligence
            </p>
          </div>
        </button>

        {/* Live System Indicator */}
        <div className="hidden lg:flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-emerald-400">LIVE COMMAND CENTER</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400 text-[11px]">TIMELINE: <strong className="text-cyan-400">{currentStep}</strong></span>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center space-x-3">
        {/* Simulated Data Badge */}
        <div className="hidden md:flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-medium">
          <Activity className="w-3.5 h-3.5" />
          <span>SIMULATED DATA</span>
        </div>

        {/* Quick View Buttons */}
        <button
          onClick={() => onNavigate('digital-twin')}
          className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-medium transition-all"
        >
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>Digital Twin</span>
        </button>

        {/* AI Insights Link */}
        <button
          onClick={() => onNavigate('ai-insights')}
          className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-800/60 text-xs font-medium transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>AI Insights</span>
        </button>

        {/* Alerts Bell */}
        <button
          onClick={() => onNavigate('response')}
          className="relative p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all focus:outline-none"
          title="Active Alerts"
        >
          <Bell className="w-4 h-4 text-slate-300" />
          {alertCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
              {alertCount}
            </span>
          )}
        </button>

        {/* User Badge */}
        <div className="flex items-center space-x-2 pl-2 border-l border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
            EOC
          </div>
          <div className="hidden xl:block text-left">
            <p className="text-xs font-semibold text-slate-200">NDMA / State EOC</p>
            <p className="text-[10px] text-slate-400">Chief Officer</p>
          </div>
        </div>
      </div>
    </header>
  );
};
