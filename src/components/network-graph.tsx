'use client';

import { useEffect, useRef } from 'react';
import type { NetworkNode, NetworkEdge } from '@/hooks/use-levenshtein';

interface NetworkGraphProps {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
  edgeMap: Record<number, { from: string; to: string }>;
  onHighlight?: (nodeIds: string[]) => void;
  fillHeight?: boolean;
}

type DS = { clear(): void; add(data: never[]): void };

export function NetworkGraph({
  nodes,
  edges,
  edgeMap,
  onHighlight,
  fillHeight = false,
}: NetworkGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<unknown>(null);
  const nodesDSRef = useRef<DS | null>(null);
  const edgesDSRef = useRef<DS | null>(null);
  const prevNodesKeyRef = useRef('');

  // Keep click handler in a ref so the network always calls the latest version
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClickRef = useRef((_params: any) => {});
  handleClickRef.current = (params: { edges: number[] }) => {
    if (!params.edges.length || !onHighlight) {
      onHighlight?.([]);
      return;
    }
    const edgeId = params.edges[0];
    const connected = edgeMap[edgeId];
    if (connected) {
      onHighlight([connected.from, connected.to]);
    }
  };

  // Create or update the network
  useEffect(() => {
    if (!containerRef.current || nodes.length === 0) return;

    let cancelled = false;

    const run = async () => {
      const { DataSet } = await import('vis-data');
      if (cancelled || !containerRef.current) return;

      const nodesKey = nodes.map((n) => n.id).join(',');
      const nodesChanged = nodesKey !== prevNodesKeyRef.current;
      prevNodesKeyRef.current = nodesKey;

      // Network already exists — update DataSets without recreating
      if (networkRef.current && nodesDSRef.current && edgesDSRef.current) {
        const net = networkRef.current as { fit(o: unknown): void; once(e: string, cb: () => void): void };
        nodesDSRef.current.clear();
        nodesDSRef.current.add(nodes as never[]);
        edgesDSRef.current.clear();
        edgesDSRef.current.add(edges as never[]);

        // Re-fit only when the node structure changed (page / filter toggle)
        if (nodesChanged) {
          net.once('afterDrawing', () => {
            net.fit({ animation: false });
          });
        }
        return;
      }

      // First render — create network
      const { Network } = await import('vis-network');
      if (cancelled || !containerRef.current) return;

      const nodesDS = new DataSet(nodes as never[]);
      const edgesDS = new DataSet(edges as never[]);
      nodesDSRef.current = nodesDS as unknown as DS;
      edgesDSRef.current = edgesDS as unknown as DS;

      const network = new Network(
        containerRef.current,
        { nodes: nodesDS, edges: edgesDS },
        {
          edges: {
            scaling: {
              min: 0,
              max: 100,
              customScalingFunction(
                _min: number,
                _max: number,
                _total: number,
                value: number,
              ) {
                return value / 1000;
              },
            },
          },
        },
      );

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      network.on('click', (params: any) => handleClickRef.current(params));

      network.once('afterDrawing', () => {
        network.fit({ animation: false });
      });

      networkRef.current = network;
    };

    run();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes, edges]);

  // Destroy on unmount only
  useEffect(() => {
    return () => {
      if (networkRef.current) {
        (networkRef.current as { destroy(): void }).destroy();
        networkRef.current = null;
      }
      nodesDSRef.current = null;
      edgesDSRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`rounded-xl border border-gray-200 bg-gray-50 ${
        fillHeight ? 'h-full' : ''
      }`}
      style={fillHeight ? undefined : { height: '60vh' }}
    />
  );
}
