'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import * as Slider from '@radix-ui/react-slider';
import * as Checkbox from '@radix-ui/react-checkbox';
import { useComparisonStore } from '@/store/comparison-store';
import { useLevenshtein } from '@/hooks/use-levenshtein';
import { LabelDisplay } from './label-display';
import { Pagination } from './pagination';
import { NetworkGraph } from './network-graph';

export function BlockLev({ embed = false }: { embed?: boolean }) {
  const t = useTranslations();
  const values = useComparisonStore((s) => s.values);
  const [threshold, setThreshold] = useState(50);
  const [showSingleChar, setShowSingleChar] = useState(true);
  const [highlightedNodes, setHighlightedNodes] = useState<string[]>([]);

  const textsLeft = values[0].texts[values[0].page];
  const textsRight = values[1].texts[values[1].page];

  const { nodes: rawNodes, edges, edgeMap } = useLevenshtein(
    textsLeft,
    textsRight,
    values[0].label,
    values[1].label,
    threshold,
    showSingleChar,
  );

  const nodes = rawNodes.map((node) => ({
    ...node,
    color: highlightedNodes.includes(node.id)
      ? { background: 'rgba(255, 245, 157, 0.5)' }
      : node.color,
  }));

  const handleHighlight = useCallback((ids: string[]) => {
    setHighlightedNodes(ids);
  }, []);

  if (embed) {
    return (
      <div className="flex h-full flex-col">
        {/* Fixed header: labels + pagination + controls */}
        <div className="shrink-0 space-y-1 px-1 py-1">
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
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium text-gray-700">
                {t('threshold')}
              </label>
              <Slider.Root
                className="relative flex h-4 w-32 touch-none items-center select-none"
                value={[threshold]}
                onValueChange={([v]) => setThreshold(v)}
                max={100}
                step={1}
              >
                <Slider.Track className="relative h-1 grow rounded-full bg-gray-200">
                  <Slider.Range className="absolute h-full rounded-full bg-indigo-500" />
                </Slider.Track>
                <Slider.Thumb className="block h-4 w-4 rounded-full border-2 border-indigo-500 bg-white shadow-md focus:outline-none" />
              </Slider.Root>
              <span className="text-xs font-medium text-indigo-600">
                {threshold}%
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Checkbox.Root
                className="flex h-4 w-4 items-center justify-center rounded border-2 border-gray-300 bg-white data-[state=checked]:border-indigo-500 data-[state=checked]:bg-indigo-500"
                checked={showSingleChar}
                onCheckedChange={(checked) =>
                  setShowSingleChar(checked === true)
                }
                id="show-single-char-embed"
              >
                <Checkbox.Indicator>
                  <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </Checkbox.Indicator>
              </Checkbox.Root>
              <label htmlFor="show-single-char-embed" className="cursor-pointer text-xs text-gray-700">
                {t('show_char')}
              </label>
            </div>
          </div>
        </div>
        {/* Network graph fills remaining height */}
        <div className="min-h-0 flex-1">
          <NetworkGraph
            nodes={nodes}
            edges={edges}
            edgeMap={edgeMap}
            onHighlight={handleHighlight}
            fillHeight
          />
        </div>
      </div>
    );
  }

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

      <NetworkGraph
        nodes={nodes}
        edges={edges}
        edgeMap={edgeMap}
        onHighlight={handleHighlight}
      />

      <div className="mx-auto max-w-2xl space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <label className="w-20 shrink-0 text-sm font-medium text-gray-700">
              {t('threshold')}
            </label>
            <Slider.Root
              className="relative flex h-5 flex-1 touch-none items-center select-none"
              value={[threshold]}
              onValueChange={([v]) => setThreshold(v)}
              max={100}
              step={1}
            >
              <Slider.Track className="relative h-1.5 grow rounded-full bg-gray-200">
                <Slider.Range className="absolute h-full rounded-full bg-indigo-500" />
              </Slider.Track>
              <Slider.Thumb className="block h-5 w-5 rounded-full border-2 border-indigo-500 bg-white shadow-md transition hover:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300" />
            </Slider.Root>
            <span className="w-12 text-right text-sm font-medium text-indigo-600">
              {threshold}%
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox.Root
              className="flex h-5 w-5 items-center justify-center rounded border-2 border-gray-300 bg-white transition data-[state=checked]:border-indigo-500 data-[state=checked]:bg-indigo-500"
              checked={showSingleChar}
              onCheckedChange={(checked) =>
                setShowSingleChar(checked === true)
              }
              id="show-single-char"
            >
              <Checkbox.Indicator>
                <svg
                  className="h-3 w-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </Checkbox.Indicator>
            </Checkbox.Root>
            <label
              htmlFor="show-single-char"
              className="cursor-pointer text-sm text-gray-700"
            >
              {t('show_char')}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
