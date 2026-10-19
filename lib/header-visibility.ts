/** Hysteresis: scrolling upwards does not reveal the header until the top. */
export function headerShouldHide(hidden: boolean, scrollY: number, interacting: boolean): boolean {
  if (interacting || scrollY <= 8) return false;
  return scrollY >= 88 ? true : hidden;
}
