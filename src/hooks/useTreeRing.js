import { useCallback, useEffect, useRef, useState } from 'react';
import { ringYears } from '../data/ringYears';

const STEP_COUNT = ringYears.length;

export function useTreeRing() {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  }, []);

  const selectStep = useCallback(
    (next) => {
      const clamped = Math.max(0, Math.min(STEP_COUNT - 1, next));
      if (clamped === step) return;
      stopAudio();
      setStep(clamped);
    },
    [step, stopAudio]
  );

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      stopAudio();
      return;
    }
    const audio = new Audio(ringYears[step].audio);
    audioRef.current = audio;
    audio.addEventListener('ended', () => setIsPlaying(false));
    audio.play();
    setIsPlaying(true);
  }, [isPlaying, step, stopAudio]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return {
    step,
    stepCount: STEP_COUNT,
    selectStep,
    isPlaying,
    togglePlay,
    current: ringYears[step],
  };
}
