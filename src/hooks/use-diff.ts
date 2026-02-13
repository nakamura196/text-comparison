import { useMemo } from 'react';
import { diffChars, type Change } from 'diff';

export function useDiff(text1: string, text2: string): Change[] {
  return useMemo(() => {
    const result = diffChars(text1, text2);
    for (let i = 0; i < result.length; i++) {
      if (result[i].added && result[i + 1]?.removed) {
        const swap = result[i];
        result[i] = result[i + 1];
        result[i + 1] = swap;
      }
    }
    return result;
  }, [text1, text2]);
}
