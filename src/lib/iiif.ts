import type { ComparisonValue, InputValue } from '@/types';

/** IIIF v3 label is an object like {"ja": ["校異源氏物語"]} — extract first string */
function resolveLabel(label: unknown): string {
  if (!label) return '';
  if (typeof label === 'string') return label;
  if (typeof label === 'object') {
    for (const values of Object.values(label as Record<string, string[]>)) {
      if (Array.isArray(values) && values.length > 0) return values[0];
    }
  }
  return String(label);
}

export async function fetchManifest(
  input: InputValue,
): Promise<ComparisonValue> {
  const response = await fetch(input.manifest);
  const data = await response.json();

  const label = input.label || resolveLabel(data.label);
  const attribution = data.requiredStatement?.value?.none?.[0] || '';

  const canvasLabels: Record<string, unknown>[] = [];
  const canvasIds: string[] = [];
  const images: string[] = [];
  const texts: string[][] = [];

  for (const canvas of data.items) {
    canvasLabels.push(canvas.label);
    canvasIds.push(canvas.id);
    images.push(
      canvas.items[0].items[0].body.service[0].id + '/info.json',
    );

    const textList: string[] = [];
    if (canvas.annotations?.[0]?.items) {
      for (const a of canvas.annotations[0].items) {
        textList.push(a.body.value);
      }
    }
    texts.push(textList);
  }

  let page = 0;
  let canvasId = input.canvas;
  if (!canvasId) {
    canvasId = data.items[0].id;
  } else {
    const idx = canvasIds.indexOf(canvasId);
    page = idx < 0 ? 0 : idx;
  }

  return {
    page,
    images,
    canvases: canvasLabels,
    texts,
    label,
    manifest: input.manifest,
    canvas: canvasId,
    attribution,
  };
}
