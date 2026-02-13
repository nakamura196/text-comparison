'use client';

import { useDiff } from '@/hooks/use-diff';

interface DiffRendererProps {
  text1: string;
  text2: string;
  label1?: string;
  label2?: string;
}

export function DiffRenderer({
  text1,
  text2,
  label1,
  label2,
}: DiffRendererProps) {
  const changes = useDiff(text1, text2);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div className="space-y-2">
        <div className="rounded-t-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
          {label1 || 'Left'}
        </div>
        <div className="rounded-b-lg border border-gray-200 p-4 text-sm leading-relaxed whitespace-pre-wrap">
          {text1}
        </div>
      </div>

      <div className="space-y-2">
        <div className="rounded-t-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white">
          Result
        </div>
        <div className="rounded-b-lg border border-gray-200 p-4 text-sm leading-relaxed whitespace-pre-wrap">
          {changes.map((change, i) => {
            if (change.removed) {
              return (
                <del key={i} className="diff-del">
                  {change.value}
                </del>
              );
            }
            if (change.added) {
              return (
                <ins key={i} className="diff-ins">
                  {change.value}
                </ins>
              );
            }
            return <span key={i}>{change.value}</span>;
          })}
        </div>
      </div>

      <div className="space-y-2">
        <div className="rounded-t-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
          {label2 || 'Right'}
        </div>
        <div className="rounded-b-lg border border-gray-200 p-4 text-sm leading-relaxed whitespace-pre-wrap">
          {text2}
        </div>
      </div>
    </div>
  );
}
