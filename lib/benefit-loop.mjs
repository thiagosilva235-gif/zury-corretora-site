/** Fill a full-bleed viewport at every phase without stretching the partner cards. */
export function benefitLoopLayout(width, count, gap = 14, minimum = 260, maximum = 320) {
  const cardWidth = Math.min(maximum, Math.max(minimum, (width - 3 * gap) / 4));
  const distance = count * (cardWidth + gap);
  return { cardWidth, distance, copies: Math.max(1, Math.ceil(width / distance)), duration: distance / 76 * 1000 };
}
