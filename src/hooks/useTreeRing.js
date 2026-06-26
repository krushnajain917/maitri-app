import { useCallback, useEffect, useRef, useState } from 'react';
import { ringYears as defaultRingYears } from '../data/ringYears';

export function useTreeRing(years = defaultRingYears) {
  const stepCount = years.length;
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const playStepAudio = useCallback(
    (stepIdx) => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audio = new Audio(years[stepIdx].audio);
      audioRef.current = audio;
      audio.addEventListener('ended', () => setIsPlaying(false));
      audio.play();
      setIsPlaying(true);
    },
    [years]
  );

  const selectStep = useCallback(
    (next) => {
      const clamped = Math.max(0, Math.min(stepCount - 1, next));
      if (clamped === step) return;
      if (isPlaying) {
        playStepAudio(clamped);
      }
      setStep(clamped);
    },
    [step, isPlaying, playStepAudio, stepCount]
  );

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      stopAudio();
      return;
    }
    playStepAudio(step);
  }, [isPlaying, step, stopAudio, playStepAudio]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return {
    step,
    stepCount,
    selectStep,
    isPlaying,
    togglePlay,
    current: years[step],
  };
}
