export function levenshteinDistance(str1: string, str2: string): number {
  if (str1.length === 0 && str2.length === 0) return 0;
  if (str1.length === 0) return 1;
  if (str2.length === 0) return 1;

  const d: number[][] = [];
  for (let r = 0; r <= str1.length; r++) {
    d[r] = [r];
  }
  for (let c = 0; c <= str2.length; c++) {
    d[0][c] = c;
  }
  for (let r = 1; r <= str1.length; r++) {
    for (let c = 1; c <= str2.length; c++) {
      const cost = str1.charCodeAt(r - 1) === str2.charCodeAt(c - 1) ? 0 : 1;
      d[r][c] = Math.min(
        d[r - 1][c] + 1,
        d[r][c - 1] + 1,
        d[r - 1][c - 1] + cost,
      );
    }
  }
  return d[str1.length][str2.length] / Math.max(str1.length, str2.length);
}
