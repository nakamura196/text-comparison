export interface ComparisonValue {
  page: number;
  images: string[];
  canvases: Record<string, unknown>[];
  texts: string[][];
  label: string;
  manifest: string;
  canvas: string;
  attribution?: string;
}

export interface InputValue {
  manifest: string;
  canvas: string;
  label: string;
}
