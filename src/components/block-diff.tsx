'use client';

import { useTranslations } from 'next-intl';
import { useComparisonStore } from '@/store/comparison-store';
import { useDiff } from '@/hooks/use-diff';
import { LabelDisplay } from './label-display';
import { Pagination } from './pagination';

export function BlockDiff() {
  const t = useTranslations();
  const values = useComparisonStore((s) => s.values);

  const text1 = values[0].texts[values[0].page]?.join('\n') || '';
  const text2 = values[1].texts[values[1].page]?.join('\n') || '';
  const changes = useDiff(text1, text2);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <LabelDisplay index={0} />
          <Pagination index={0} />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <LabelDisplay index={1} />
          <Pagination index={1} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-4 text-sm leading-relaxed whitespace-pre-wrap shadow-sm">
          {text1}
        </div>

        <div className="space-y-2">
          <div className="text-center text-sm font-medium text-gray-500">
            {t('result')}
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-4 text-sm leading-relaxed whitespace-pre-wrap shadow-sm">
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

        <div className="rounded-xl border border-gray-200 bg-white p-4 text-sm leading-relaxed whitespace-pre-wrap shadow-sm">
          {text2}
        </div>
      </div>
    </div>
  );
}
