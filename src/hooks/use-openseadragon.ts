import { useEffect, useRef } from 'react';

export function useOpenSeadragon(
  tileSources: string[],
  page: number,
  manifest: string,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current || tileSources.length === 0) return;

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const OSD = require('openseadragon');

    const viewer = OSD({
      element: containerRef.current,
      prefixUrl: (process.env.NEXT_PUBLIC_BASE_PATH || '') + '/images/',
      tileSources,
      sequenceMode: true,
      initialPage: page,
      crossOriginPolicy: 'Anonymous',
    });

    viewerRef.current = viewer;

    return () => {
      viewer.destroy();
      viewerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manifest]);

  useEffect(() => {
    const viewer = viewerRef.current as any;
    if (viewer && tileSources.length > 0) {
      viewer.goToPage(page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return containerRef;
}
