'use client';

import { useComparisonStore } from '@/store/comparison-store';

export function LabelDisplay({ index }: { index: number }) {
  const label = useComparisonStore((s) => s.values[index].label);

  if (!label) return null;
  return (
    <span className="inline-block rounded-full bg-indigo-50 px-3 py-0.5 text-sm font-semibold text-indigo-700">
      {label}
    </span>
  );
}
