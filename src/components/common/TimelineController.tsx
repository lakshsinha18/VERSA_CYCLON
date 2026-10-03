import React, { useEffect, useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Clock, FastForward } from 'lucide-react';
import { TimelineStep } from '../../types';
import { TIMELINE_STEPS } from '../../data/mockTimelineData';

interface TimelineControllerProps {
  currentStep: TimelineStep;
  onStepChange: (step: TimelineStep) => void;
}

export const TimelineController: React.FC<TimelineControllerProps> = ({
  currentStep,
  onStepChange
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(3000); // 3 seconds per step

  const currentIndex = TIMELINE_STEPS.indexOf(currentStep);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isPlaying) {
      timer = setInterval(() => {
        const nextIdx = (currentIndex + 1) % TIMELINE_STEPS.length;
        onStepChange(TIMELINE_STEPS[nextIdx]);
      }, playbackSpeed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, currentIndex, playbackSpeed, onStepChange]);

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + TIMELINE_STEPS.length) % TIMELINE_STEPS.length;
    onStepChange(TIMELINE_STEPS[prevIdx]);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % TIMELINE_STEPS.length;
    onStepChange(TIMELINE_STEPS[nextIdx]);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 border-t border-slate-800 backdrop-blur-xl px-4 py-2.5 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Playback Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onStepChange('T-48H')}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition"
            title="Reset to T-48H"
          >
            <SkipBack className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`p-2 rounded-xl transition font-semibold flex items-center space-x-1.5 shadow-lg ${
              isPlaying
                ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30'
                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/30'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            <span className="text-xs">{isPlaying ? 'Pause Simulation' : 'Play Timeline'}</span>
          </button>

          <button
            onClick={handleNext}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition"
            title="Next Step"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <button
            onClick={() => setPlaybackSpeed(playbackSpeed === 3000 ? 1500 : 3000)}
            className={`p-1.5 rounded-lg text-xs font-mono transition flex items-center space-x-1 ${
              playbackSpeed === 1500 ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' : 'bg-slate-900 text-slate-400'
            }`}
            title="Toggle playback speed"
          >
            <FastForward className="w-3.5 h-3.5" />
            <span>{playbackSpeed === 1500 ? '2x' : '1x'}</span>
          </button>
        </div>

        {/* Timeline step nodes */}
        <div className="flex-1 w-full flex items-center justify-between space-x-1 overflow-x-auto py-1">
          {TIMELINE_STEPS.map((step, idx) => {
            const isActive = currentStep === step;
            const isPast = idx < currentIndex;
            const isLandfall = step === 'LANDFALL';

            return (
              <button
                key={step}
                onClick={() => {
                  setIsPlaying(false);
                  onStepChange(step);
                }}
                className={`flex-1 min-w-[70px] py-1.5 px-2 rounded-lg text-center text-xs transition-all relative flex flex-col items-center group ${
                  isActive
                    ? 'bg-gradient-to-b from-cyan-500/30 to-blue-600/30 border border-cyan-400 text-cyan-200 font-bold shadow-md shadow-cyan-500/20'
                    : isPast
                    ? 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-800'
                    : 'bg-slate-950/60 hover:bg-slate-900 text-slate-500 border border-slate-900'
                }`}
              >
                {/* Active indicator dot */}
                <div className={`w-2 h-2 rounded-full mb-1 transition-all ${
                  isActive
                    ? 'bg-cyan-400 ring-4 ring-cyan-400/30 scale-125'
                    : isLandfall
                    ? 'bg-rose-500 animate-pulse'
                    : isPast
                    ? 'bg-blue-500/60'
                    : 'bg-slate-700'
                }`} />

                <span className={`text-[11px] font-mono whitespace-nowrap ${
                  isLandfall ? 'text-rose-400 font-extrabold' : ''
                }`}>
                  {step}
                </span>

                {isLandfall && (
                  <span className="absolute -top-2 px-1 rounded bg-rose-500 text-white text-[8px] font-extrabold uppercase tracking-widest shadow">
                    Impact
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Timeline Metadata readout */}
        <div className="hidden lg:flex items-center space-x-2 text-xs text-slate-400 pl-3 border-l border-slate-800 min-w-[200px]">
          <Clock className="w-4 h-4 text-cyan-400" />
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">Scrub Timeline</div>
            <div className="font-medium text-slate-200">
              {currentStep === 'LANDFALL' ? 'IMPACT AT GOPALPUR' : `${currentStep} Forecast Window`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
