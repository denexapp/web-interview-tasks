import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// react router changes the search params in the URL
// with a delay, so if we use it directly in the input
// the caret will jump to the end of the input

// this hook is a workaround for that
// https://github.com/remix-run/react-router/issues/11624

const useSearchParamForInput = (key: string) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get(key);
  const [tempValue, setTempValue] = useState(value);

  if (value !== tempValue) {
    setTempValue(value);
  }

  const setValue = useCallback(
    (newValue: string | null) => {
      setTempValue(newValue);
      setSearchParams(
        (searchParams) => {
          if (newValue === null) {
            searchParams.delete(key);
          } else {
            searchParams.set(key, newValue);
          }
          return searchParams;
        },
        { replace: true, preventScrollReset: true }
      );
    },
    [key, setSearchParams]
  );

  return [value, setValue] as const;
};

export default useSearchParamForInput;
