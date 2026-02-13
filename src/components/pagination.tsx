'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useComparisonStore } from '@/store/comparison-store';

export function Pagination({ index }: { index: number }) {
  const t = useTranslations();
  const values = useComparisonStore((s) => s.values);
  const updatePage = useComparisonStore((s) => s.updatePage);
  const page = values[index].page;
  const total = values[index].images.length;

  const [inputPage, setInputPage] = useState(page + 1);

  useEffect(() => {
    setInputPage(page + 1);
  }, [page]);

  if (total <= 0) return null;

  return (
    <div className="inline-flex items-center gap-2 text-sm">
      <input
        type="text"
        value={inputPage}
        onChange={(e) => setInputPage(Number(e.target.value) || 1)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            const p = Math.max(1, Math.min(total, inputPage));
            updatePage(index, p - 1);
          }
        }}
        className="w-12 rounded border border-gray-300 px-1 py-0.5 text-center text-sm"
        style={{ width: `${String(total).length + 2}ch` }}
      />
      <span className="text-gray-500">/ {total}</span>
      <button
        disabled={page <= 0}
        onClick={() => updatePage(index, page - 1)}
        className="rounded-full bg-indigo-600 px-3 py-1 text-xs font-medium text-white transition hover:bg-indigo-700 disabled:opacity-40 disabled:hover:bg-indigo-600"
      >
        {t('prev')}
      </button>
      <button
        disabled={page >= total - 1}
        onClick={() => updatePage(index, page + 1)}
        className="rounded-full bg-indigo-600 px-3 py-1 text-xs font-medium text-white transition hover:bg-indigo-700 disabled:opacity-40 disabled:hover:bg-indigo-600"
      >
        {t('next')}
      </button>
    </div>
  );
}
