import { useEffect, useState } from 'react';

type UseDebouncedValueResult<T> = [debouncedValue: T, debouncing: boolean];

const useDebouncedValue = <T>(
  value: T,
  delayMs: number
): UseDebouncedValueResult<T> => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delayMs]);

  const debouncing = value !== debouncedValue;

  return [debouncedValue, debouncing];
};

export default useDebouncedValue;
