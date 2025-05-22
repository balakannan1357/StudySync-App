import { useEffect, useRef, useState } from "react";

export const useTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const start = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
  };

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const reset = () => setSeconds(0);

  useEffect(() => {
    return () => stop();
  }, []);

  return { seconds, start, stop, reset };
};
