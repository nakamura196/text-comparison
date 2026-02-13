'use client';

import { useOpenSeadragon } from '@/hooks/use-openseadragon';
import { useComparisonStore } from '@/store/comparison-store';

export function OsdViewer({
  index,
  fillHeight = false,
}: {
  index: number;
  fillHeight?: boolean;
}) {
  const value = useComparisonStore((s) => s.values[index]);
  const containerRef = useOpenSeadragon(
    value.images,
    value.page,
    value.manifest,
  );

  if (value.images.length === 0) {
    return (
      <div
        className={`flex items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-400 ${
          fillHeight ? 'h-full' : 'aspect-video'
        }`}
      >
        No image
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden rounded-lg bg-black ${
        fillHeight ? 'h-full' : ''
      }`}
    >
      <div
        ref={containerRef}
        className={`w-full ${fillHeight ? 'h-full' : 'aspect-video'}`}
      />
    </div>
  );
}
