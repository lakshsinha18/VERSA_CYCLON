import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { TimelineStep, InfrastructureAsset, HumanInTheLoopDecision } from './types';
import { MOCK_TIMELINE_DATA } from './data/mockTimelineData';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { TimelineController } from './components/common/TimelineController';
import { LandingPage } from './components/landing/LandingPage';

// Import all 10 Views
import { OverviewView } from './components/views/OverviewView';
import { LiveCycloneView } from './components/views/LiveCycloneView';
import { RegimeIntelligenceView } from './components/views/RegimeIntelligenceView';
import { ForecastCorrectionView } from './components/views/ForecastCorrectionView';
import { HazardIntelligenceView } from './components/views/HazardIntelligenceView';
import { InfrastructureView } from './components/views/InfrastructureView';
import { DigitalTwinView } from './components/views/DigitalTwinView';
import { WhatIfSimulationView } from './components/views/WhatIfSimulationView';
import { ResponseCenterView } from './components/views/ResponseCenterView';
import { HistoricalAnalysisView } from './components/views/HistoricalAnalysisView';
import { AIInsightsView } from './components/views/AIInsightsView';

// Import Modal Drawer
import { InfrastructureDetailDrawer } from './components/modals/InfrastructureDetailDrawer';

export function App() {
  const [activeView, setActiveView] = useState<string>('landing');
  const [currentStep, setCurrentStep] = useState<TimelineStep>('T-24H');
  const [selectedAsset, setSelectedAsset] = useState<InfrastructureAsset | null>(null);

  // Dynamic decisions state per step
  const [dynamicTimelineData, setDynamicTimelineData] = useState(MOCK_TIMELINE_DATA);

  const currentState = dynamicTimelineData[currentStep];

  const handleLaunchCommandCenter = () => {
    setActiveView('overview');
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#00f2fe', '#38bdf8', '#3b82f6']
    });
  };

  const handleExploreDigitalTwin = () => {
    setActiveView('digital-twin');
  };

  const handleDecisionAction = (decisionId: string, newStatus: 'ACCEPTED' | 'MODIFIED' | 'REJECTED', notes?: string) => {
    setDynamicTimelineData(prev => {
      const stepData = prev[currentStep];
      const updatedDecisions = stepData.decisions.map(d => {
        if (d.id === decisionId) {
          return {
            ...d,
            status: newStatus,
            modifiedNotes: notes || d.modifiedNotes,
            timestamp: new Date().toISOString().substring(11, 16) + ' UTC'
          };
        }
        return d;
      });

      return {
        ...prev,
        [currentStep]: {
          ...stepData,
          decisions: updatedDecisions
        }
      };
    });

    if (newStatus === 'ACCEPTED') {
      confetti({
        particleCount: 30,
        spread: 40,
        origin: { y: 0.9 },
        colors: ['#10b981', '#34d399']
      });
    }
  };

  // If user is on landing page, display LandingPage component
  if (activeView === 'landing') {
    return (
      <LandingPage
        onLaunch={handleLaunchCommandCenter}
        onExploreDigitalTwin={handleExploreDigitalTwin}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Persistent Navbar */}
      <Navbar
        currentStep={currentStep}
        activeView={activeView}
        onNavigate={(view) => setActiveView(view)}
        onLandingClick={() => setActiveView('landing')}
        alertCount={currentState.decisions.filter(d => d.status === 'PENDING').length}
      />

      {/* Main Workspace Layout with Sidebar & Content */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          activeView={activeView}
          onNavigate={(view) => setActiveView(view)}
          onLandingClick={() => setActiveView('landing')}
        />

        {/* View Viewport */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto max-w-7xl mx-auto w-full">
          {activeView === 'overview' && (
            <OverviewView
              state={currentState}
              onNavigate={(view) => setActiveView(view)}
              onSelectAsset={(asset) => setSelectedAsset(asset)}
            />
          )}

          {activeView === 'live-cyclone' && (
            <LiveCycloneView state={currentState} />
          )}

          {activeView === 'regime' && (
            <RegimeIntelligenceView state={currentState} />
          )}

          {activeView === 'forecast' && (
            <ForecastCorrectionView state={currentState} />
          )}

          {activeView === 'hazards' && (
            <HazardIntelligenceView state={currentState} />
          )}

          {activeView === 'infrastructure' && (
            <InfrastructureView
              state={currentState}
              onSelectAsset={(asset) => setSelectedAsset(asset)}
            />
          )}

          {activeView === 'digital-twin' && (
            <DigitalTwinView
              state={currentState}
              onSelectAsset={(asset) => setSelectedAsset(asset)}
            />
          )}

          {activeView === 'what-if' && (
            <WhatIfSimulationView state={currentState} />
          )}

          {activeView === 'response' && (
            <ResponseCenterView
              state={currentState}
              onDecisionAction={handleDecisionAction}
            />
          )}

          {activeView === 'historical' && (
            <HistoricalAnalysisView />
          )}

          {activeView === 'ai-insights' && (
            <AIInsightsView state={currentState} />
          )}
        </main>
      </div>

      {/* Infrastructure Asset Detail Drawer Modal */}
      <InfrastructureDetailDrawer
        asset={selectedAsset}
        onClose={() => setSelectedAsset(null)}
        onAcceptAction={(actionTitle) => {
          confetti({ particleCount: 30, spread: 50, colors: ['#00f2fe', '#10b981'] });
        }}
      />

      {/* Persistent Bottom Scrubbing Timeline Player */}
      <TimelineController
        currentStep={currentStep}
        onStepChange={(step) => setCurrentStep(step)}
      />
    </div>
  );
}

export default App;
