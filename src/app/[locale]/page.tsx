'use client';

import { Suspense, useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { toast } from 'sonner';
import { useComparisonStore } from '@/store/comparison-store';
import { fetchManifest } from '@/lib/iiif';
import type { InputValue } from '@/types';
import { AppBar } from '@/components/app-bar';
import { BlockImage } from '@/components/block-image';
import { BlockDiff } from '@/components/block-diff';
import { BlockLev } from '@/components/block-lev';
import { LanguageSwitcher } from '@/components/language-switcher';

const EXAMPLE: [InputValue, InputValue] = [
  {
    manifest:
      'https://genji-ai.web.app/iiif/koui/koui-01/manifest.json',
    canvas: 'https://genji-ai.web.app/iiif/koui/canvas/5',
    label: '校異源氏物語',
  },
  {
    manifest:
      'https://genji-ai.web.app/iiif/ndl_2585098/ndl_2585098-01/manifest.json',
    canvas: 'https://dl.ndl.go.jp/api/iiif/2585098/canvas/3',
    label: '近世前期横本写本（国立国会図書館所蔵）',
  },
];

function LandingPage() {
  const t = useTranslations();
  const locale = useLocale();
  const [values, setValues] = useState<[InputValue, InputValue]>([
    { manifest: '', canvas: '', label: '' },
    { manifest: '', canvas: '', label: '' },
  ]);

  function updateValue(
    index: number,
    field: keyof InputValue,
    value: string,
  ) {
    setValues((prev) => {
      const next = [...prev] as [InputValue, InputValue];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  }

  function handleSubmit() {
    if (!values[0].manifest || !values[1].manifest) return;
    const params = new URLSearchParams();
    params.set('manifest1', values[0].manifest);
    params.set('manifest2', values[1].manifest);
    if (values[0].canvas) params.set('canvas1', values[0].canvas);
    if (values[1].canvas) params.set('canvas2', values[1].canvas);
    if (values[0].label) params.set('label1', values[0].label);
    if (values[1].label) params.set('label2', values[1].label);
    window.location.href = `/${locale}?${params.toString()}`;
  }

  function handleExample() {
    setValues([...EXAMPLE] as [InputValue, InputValue]);
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <span className="text-base font-semibold text-gray-900">
            {t('site_name')}
          </span>
          <LanguageSwitcher />
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 px-4 py-20 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t('hero_title')}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-indigo-100 sm:text-lg">
            {t('hero_description')}
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="-mt-10 px-4 pb-12">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-3">
          {[
            {
              title: t('feature_image_title'),
              desc: t('feature_image_desc'),
              icon: (
                <svg className="h-7 w-7 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                </svg>
              ),
            },
            {
              title: t('feature_diff_title'),
              desc: t('feature_diff_desc'),
              icon: (
                <svg className="h-7 w-7 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              ),
            },
            {
              title: t('feature_lev_title'),
              desc: t('feature_lev_desc'),
              icon: (
                <svg className="h-7 w-7 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                </svg>
              ),
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-gray-500">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Input Form */}
      <section className="px-4 pb-16">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-center text-lg font-semibold text-gray-900">
              {t('enter_manifests')}
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              {[0, 1].map((index) => (
                <div key={index} className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-700">
                    {t(index === 0 ? 'left' : 'right')}
                  </h3>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-500">
                      {t('manifest')} *
                    </label>
                    <input
                      type="text"
                      value={values[index].manifest}
                      onChange={(e) =>
                        updateValue(index, 'manifest', e.target.value)
                      }
                      placeholder="https://example.com/manifest.json"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-500">
                      {t('canvas')}{' '}
                      <span className="text-gray-400">({t('optional')})</span>
                    </label>
                    <input
                      type="text"
                      value={values[index].canvas}
                      onChange={(e) =>
                        updateValue(index, 'canvas', e.target.value)
                      }
                      placeholder="https://..."
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-500">
                      {t('label')}{' '}
                      <span className="text-gray-400">({t('optional')})</span>
                    </label>
                    <input
                      type="text"
                      value={values[index].label}
                      onChange={(e) =>
                        updateValue(index, 'label', e.target.value)
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                onClick={handleSubmit}
                disabled={!values[0].manifest || !values[1].manifest}
                className="rounded-full bg-indigo-600 px-8 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:opacity-40"
              >
                {t('get_started')}
              </button>
              <button
                onClick={handleExample}
                className="rounded-full border border-indigo-200 bg-indigo-50 px-8 py-2.5 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-100"
              >
                {t('try_example')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How to use */}
      <section className="border-t border-gray-200 bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-lg font-semibold text-gray-900">
            {t('how_to_use')}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-600">
            {t('how_to_use_desc')}
          </p>
        </div>
      </section>
    </div>
  );
}

function ComparisonView() {
  const t = useTranslations();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const setValues = useComparisonStore((s) => s.setValues);
  const values = useComparisonStore((s) => s.values);
  const [tab, setTab] = useState(-1);
  const [loading, setLoading] = useState(true);

  const embed = searchParams.get('embed') === '1';
  const loaded = values[0].manifest !== '';

  const loadData = useCallback(async () => {
    const manifest1 = searchParams.get('manifest1');
    const manifest2 = searchParams.get('manifest2');
    if (!manifest1 || !manifest2) return;

    setLoading(true);
    try {
      const [v1, v2] = await Promise.all([
        fetchManifest({
          manifest: manifest1,
          canvas: searchParams.get('canvas1') || '',
          label: searchParams.get('label1') || '',
        }),
        fetchManifest({
          manifest: manifest2,
          canvas: searchParams.get('canvas2') || '',
          label: searchParams.get('label2') || '',
        }),
      ]);
      setValues([v1, v2]);

      const mode = searchParams.get('mode');
      setTab(mode ? Number(mode) : 1);
    } catch (e) {
      console.error('Failed to load manifests:', e);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  function handleCopy() {
    const params = new URLSearchParams();
    params.set('manifest1', values[0].manifest);
    params.set('manifest2', values[1].manifest);
    if (values[0].canvas) params.set('canvas1', values[0].canvas);
    if (values[1].canvas) params.set('canvas2', values[1].canvas);
    if (values[0].label) params.set('label1', values[0].label);
    if (values[1].label) params.set('label2', values[1].label);
    params.set('mode', String(tab));

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    const url = `${baseUrl}${basePath}/${locale}?${params.toString()}`;

    navigator.clipboard.writeText(url).catch(console.error);
    toast.success(t('copied'));
  }

  const tabs = ['image', 'text_diff', 'text_lev'] as const;

  if (loading) {
    return (
      <div className={`flex items-center justify-center ${embed ? 'h-40' : 'min-h-screen'}`}>
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
          <p className="mt-3 text-sm text-gray-500">{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (embed) {
    return (
      <div className="flex h-screen flex-col overflow-hidden">
        {/* Fixed tabs */}
        <div className="flex shrink-0 justify-center gap-1.5 border-b border-gray-200 bg-white px-2 py-1.5">
          {tabs.map((label, index) => (
            <button
              key={label}
              onClick={() => setTab(index)}
              className={`rounded-full px-3 py-1 text-sm font-medium transition ${
                tab === index
                  ? 'bg-gray-900 text-white shadow-sm'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
              disabled={tab === index}
            >
              {t(label)}
            </button>
          ))}
        </div>

        {/* Content area */}
        <div className="min-h-0 flex-1 overflow-hidden">
          {/* Image tab: fill height, no scroll */}
          <div className={`h-full ${tab === 0 ? '' : 'hidden'}`}>
            <BlockImage embed />
          </div>
          {/* Diff tab: scroll */}
          <div className={`h-full overflow-y-auto px-2 py-2 ${tab === 1 ? '' : 'hidden'}`}>
            <BlockDiff />
          </div>
          {/* Lev tab: fill height, no scroll */}
          <div className={`h-full ${tab === 2 ? '' : 'hidden'}`}>
            <BlockLev embed />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <AppBar
        onInputClick={() => { window.location.href = `/${locale}`; }}
        onCopyClick={handleCopy}
        showInput
        showCopy={loaded}
      />

      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Tabs */}
        <div className="mb-4 flex justify-center gap-2">
          {tabs.map((label, index) => (
            <button
              key={label}
              onClick={() => setTab(index)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                tab === index
                  ? 'bg-gray-900 text-white shadow-sm'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
              disabled={tab === index}
            >
              {t(label)}
            </button>
          ))}
        </div>

        {/* Content - all mounted, hidden with CSS to avoid OSD reinit */}
        <div className={tab === 0 ? '' : 'hidden'}>
          <BlockImage />
        </div>
        <div className={tab === 1 ? '' : 'hidden'}>
          <BlockDiff />
        </div>
        <div className={tab === 2 ? '' : 'hidden'}>
          <BlockLev />
        </div>
      </div>

    </div>
  );
}

function HomeContent() {
  const searchParams = useSearchParams();
  const hasManifests =
    searchParams.get('manifest1') && searchParams.get('manifest2');

  if (hasManifests) {
    return <ComparisonView />;
  }
  return <LandingPage />;
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
