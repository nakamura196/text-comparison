'use client';

import { useComparisonStore } from '@/store/comparison-store';
import { LabelDisplay } from './label-display';
import { Pagination } from './pagination';
import { OsdViewer } from './osd-viewer';

export function BlockImage({ embed = false }: { embed?: boolean }) {
  const values = useComparisonStore((s) => s.values);

  if (embed) {
    return (
      <div className="flex h-full flex-col">
        {/* Labels + Pagination row */}
        <div className="grid shrink-0 grid-cols-2 gap-4 px-1 py-1">
          {values.map((_, index) => (
            <div
              key={index}
              className="flex flex-wrap items-center justify-center gap-2"
            >
              <LabelDisplay index={index} />
              <Pagination index={index} />
            </div>
          ))}
        </div>
        {/* OSD viewers fill remaining height */}
        <div className="grid min-h-0 flex-1 grid-cols-2 gap-1">
          {values.map((_, index) => (
            <OsdViewer key={index} index={index} fillHeight />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {values.map((_, index) => (
        <div key={index} className="space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <LabelDisplay index={index} />
            <Pagination index={index} />
          </div>
          <OsdViewer index={index} />
        </div>
      ))}
    </div>
  );
}
