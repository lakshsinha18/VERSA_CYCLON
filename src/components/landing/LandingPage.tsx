import React from 'react';
import {
  Radio,
  ArrowRight,
  ShieldCheck,
  BrainCircuit,
  TrendingUp,
  Sliders,
  Box,
  Building2,
  Activity,
  Layers,
  Sparkles,
  Zap,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

interface LandingPageProps {
  onLaunch: () => void;
  onExploreDigitalTwin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onLaunch,
  onExploreDigitalTwin
}) => {
  const innovationCards = [
    {
      title: 'REGIME-AWARE AI',
      icon: BrainCircuit,
      color: 'text-cyan-400',
      border: 'hover:border-cyan-500/50',
      description: 'Dynamically routes execution between specialized AI experts based on current weather regime detection (Genesis, Rapid Intensification, Coastal Approach, Extreme Deluge).'
    },
    {
      title: 'FORECAST CORRECTION',
      icon: TrendingUp,
      color: 'text-blue-400',
      border: 'hover:border-blue-500/50',
      description: 'Corrects systematic numerical weather model bias using historical satellite feedback, Doppler radar velocity, and neural ocean friction calibration.'
    },
    {
      title: 'UNCERTAINTY ENGINE',
      icon: Activity,
      color: 'text-purple-400',
      border: 'hover:border-purple-500/50',
      description: 'Calculates self-aware confidence boundaries for track error (±35km), rainfall (±42mm), and surge depth, backed by a Confidence Governor.'
    },
    {
      title: 'MULTI-HAZARD INTELLIGENCE',
      icon: Layers,
      color: 'text-amber-400',
      border: 'hover:border-amber-500/50',
      description: 'Simultaneously evaluates coupled wind gust shear, extreme precipitation, river basin flooding, coastal storm surge, and slope landslide risks.'
    },
    {
      title: 'INFRASTRUCTURE AI',
      icon: Building2,
      color: 'text-rose-400',
      border: 'hover:border-rose-500/50',
      description: 'Quantifies failure probabilities for power substations, hospitals, bridges, highways, and schools using Hazard × Exposure × Vulnerability × Criticality.'
    },
    {
      title: 'DIGITAL TWIN & WHAT-IF',
      icon: Box,
      color: 'text-emerald-400',
      border: 'hover:border-emerald-500/50',
      description: 'Provides real-time GIS visualization and scenario simulation: test +30km track shifts, early landfalls, or +20% deluge before emergency dispatch.'
    }
  ];

  const flowSteps = [
    { label: 'CYCLONE TRACK', desc: 'Telemetered Path' },
    { label: 'REGIME', desc: 'Weather Phase' },
    { label: 'FORECAST', desc: 'VERSA Correction' },
    { label: 'HAZARD', desc: 'Multi-Hazard Risk' },
    { label: 'INFRASTRUCTURE', desc: 'Vulnerability Matrix' },
    { label: 'IMPACT', desc: 'Expected Impact' },
    { label: 'ACTION', desc: 'Human-in-the-Loop' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden relative">
      {/* Glow backgrounds */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-cyan-500/10 via-blue-600/5 to-transparent blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Radio className="w-5 h-5 text-slate-950 animate-pulse" />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-wider bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              VERSA-CYCLONE AI
            </span>
            <span className="block text-[10px] text-slate-400 font-mono uppercase tracking-widest">
              Disaster Intelligence Platform
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
            Smart India Hackathon Finalist
          </span>
          <button
            onClick={onLaunch}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition flex items-center space-x-1.5"
          >
            <span>Command Center</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-12 pb-16 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
          <span>Regime-Aware Cyclone & Infrastructure Vulnerability Intelligence</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-slate-100 tracking-tight leading-tight">
          Predict the Cyclone.{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
            Understand the Impact.
          </span>{' '}
          Protect the Infrastructure.
        </h1>

        <p className="max-w-3xl mx-auto text-sm md:text-base text-slate-400 font-normal leading-relaxed">
          VERSA-CYCLONE AI combines regime-aware forecasting, forecast correction, uncertainty intelligence, and infrastructure vulnerability modeling to transform cyclone prediction into actionable disaster intelligence.
        </p>

        {/* CTA Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onLaunch}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-sm shadow-xl shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
          >
            <Radio className="w-4 h-4" />
            <span>Launch Command Center</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onExploreDigitalTwin}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-sm transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
          >
            <Box className="w-4 h-4 text-cyan-400" />
            <span>Explore Digital Twin</span>
          </button>
        </div>

        {/* Tagline Badge */}
        <p className="text-xs text-slate-500 font-mono tracking-widest pt-2 uppercase">
          “From Cyclone Track to Infrastructure Impact”
        </p>
      </section>

      {/* Visual Cyclone-to-Impact Flow */}
      <section className="max-w-6xl mx-auto px-6 py-10 relative z-10">
        <div className="glass-panel p-6 rounded-2xl border border-slate-800/80">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center mb-6">
            End-to-End Decision Support Pipeline
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {flowSteps.map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-center text-center group">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-cyan-500/60 group-hover:bg-cyan-950/40 flex items-center justify-center text-cyan-400 font-extrabold text-xs mb-2 transition-all shadow-md">
                  {idx + 1}
                </div>
                <span className="text-xs font-bold text-slate-200">{step.label}</span>
                <span className="text-[10px] text-slate-500">{step.desc}</span>

                {idx < flowSteps.length - 1 && (
                  <ChevronRight className="hidden lg:block absolute top-3 -right-3 w-4 h-4 text-slate-700" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 Major Innovation Cards */}
      <section className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        <div className="text-center mb-10 space-y-2">
          <span className="text-xs font-bold text-cyan-400 font-mono uppercase tracking-widest">
            Core Technical Innovations
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100">
            Why VERSA-CYCLONE AI Outperforms Standard Weather Dashboards
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {innovationCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className={`glass-panel p-6 rounded-2xl border border-slate-800/80 transition-all duration-300 ${card.border} group`}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 group-hover:scale-110 transition-transform">
                    <Icon className={`w-6 h-6 ${card.color}`} />
                  </div>
                  <h3 className="text-sm font-extrabold tracking-wider text-slate-100">
                    {card.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-8 text-center text-xs text-slate-600 relative z-10">
        <p>VERSA-CYCLONE AI • Smart India Hackathon Final Presentation Architecture</p>
        <p className="text-[10px] text-slate-700 pt-1">Designed for National Disaster Management Authority (NDMA) & State EOCs</p>
      </footer>
    </div>
  );
};
