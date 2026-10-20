export function navigationDuration(distance: number): number {
  return Math.min(1.1, .55 + Math.abs(distance) / 4000);
}
export function anchorScrollPosition(layoutTop: number, maxScroll: number): number {
  return Math.max(0, Math.min(layoutTop - 96, maxScroll));
}
