'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { AppBar } from '@/components/app-bar';
import { DiffRenderer } from '@/components/diff-renderer';

export default function DiffPage() {
  const t = useTranslations();

  const [text1, setText1] = useState(
    'あいうえお\nかきくけこ\nさしすせそ\nたちぬてと',
  );
  const [text2, setText2] = useState(
    'あいうえお\nなにぬねの\nたちろあい',
  );

  return (
    <div className="min-h-screen">
      <AppBar />

      <div className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">
          {t('compare_texts')}
        </h1>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              {t('left')}
            </label>
            <textarea
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              rows={8}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              {t('right')}
            </label>
            <textarea
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              rows={8}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
            />
          </div>
        </div>

        <DiffRenderer
          text1={text1}
          text2={text2}
          label1={t('left')}
          label2={t('right')}
        />
      </div>
    </div>
  );
}
