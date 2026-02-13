import { useMemo } from 'react';
import { levenshteinDistance } from '@/lib/levenshtein';

export interface NetworkNode {
  id: string;
  label: string;
  x: number;
  y: number;
  fixed: boolean;
  physics: boolean;
  shape: string;
  color?: Record<string, unknown>;
}

export interface NetworkEdge {
  id: number;
  from: string;
  to: string;
  value: number;
  label: string;
  color: Record<string, unknown>;
}

export function useLevenshtein(
  textsLeft: string[] | undefined,
  textsRight: string[] | undefined,
  labelLeft: string,
  labelRight: string,
  threshold: number,
  showSingleChar: boolean,
) {
  return useMemo(() => {
    const nodes: NetworkNode[] = [];
    const edges: NetworkEdge[] = [];
    const edgeMap: Record<number, { from: string; to: string }> = {};

    if (!textsLeft?.length || !textsRight?.length) {
      return { nodes, edges, edgeMap };
    }

    const step = 25;
    const leftOffset = 0;
    const rightOffset = 500;

    nodes.push({
      id: 'l-1',
      label: labelLeft,
      x: leftOffset,
      y: step * -2,
      fixed: true,
      physics: false,
      shape: 'text',
    });
    nodes.push({
      id: 'r-1',
      label: labelRight,
      x: rightOffset,
      y: step * -2,
      fixed: true,
      physics: false,
      shape: 'text',
    });

    const scores: Record<string, number> = {};
    let row = 0;
    const transparent = {
      background: 'rgba(0,0,0,0)',
      border: 'rgba(0,0,0,0)',
      highlight: {
        background: 'rgba(0,0,0,0)',
        border: 'rgba(0,0,0,0)',
      },
    };

    for (let i = 0; i < textsLeft.length; i++) {
      const lLine = textsLeft[i];
      if (!showSingleChar && lLine.length === 1) continue;

      nodes.push({
        id: 'l' + i,
        label: lLine,
        x: leftOffset,
        y: step * i,
        fixed: true,
        physics: false,
        shape: 'box',
        color: { ...transparent },
      });

      for (let j = 0; j < textsRight.length; j++) {
        if (i > j) continue;
        const rLine = textsRight[j];

        if (i === 0 && (showSingleChar || rLine.length > 1)) {
          nodes.push({
            id: 'r' + j,
            label: rLine,
            x: rightOffset,
            y: step * row,
            fixed: true,
            physics: false,
            shape: 'box',
            color: { ...transparent },
          });
          row++;
        }

        const score = (1 - levenshteinDistance(lLine, rLine)) * 100;
        scores[i + ',' + j] = score;
      }
    }

    const sorted = Object.entries(scores).sort(
      ([, a], [, b]) => b - a,
    );

    for (const [key, score] of sorted) {
      if (score < threshold) continue;
      const [i, j] = key.split(',');

      const edge: NetworkEdge = {
        id: edges.length,
        from: 'l' + i,
        to: 'r' + j,
        value: score,
        label: Math.ceil(score) + '%',
        color: {
          color: `rgba(33,150,243,${Math.ceil(score) / 100})`,
          highlight: '#FFC107',
        },
      };
      edges.push(edge);
      edgeMap[edge.id] = { from: edge.from, to: edge.to };

      if (edges.length > 9) break;
    }

    return { nodes, edges, edgeMap };
  }, [textsLeft, textsRight, labelLeft, labelRight, threshold, showSingleChar]);
}
