import { useEffect, useState } from "react";

const DEFAULT_DELAY = 500;

export default <T>(value: T, delay: number = DEFAULT_DELAY) => {
  const [throttledValue, setThrottleValue] = useState(value);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    if (!isWaiting) {
      const handler: NodeJS.Timeout = setTimeout(() => {
        setIsWaiting(false);
        clearTimeout(handler);
      }, delay);

      setThrottleValue(value);
      setIsWaiting(true);
    }
  }, [value]);

  return throttledValue;
};
