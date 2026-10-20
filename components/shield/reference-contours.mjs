/** Pixel-space contours traced from IMG_3369.PNG (1254 × 1254).
 * No generic shield primitive and no font-generated Z. Y points down in the reference.
 * The photograph cannot specify the hidden back or absolute physical depth.
 * @typedef {[string, ...number[]]} Command
 */
/** @type {Record<string, Command[]>} */
export const contours = {
  outline: [["M",628,49],["L",1053,251],["C",1061,472,1032,676,939,857],["C",863,1001,738,1120,617,1203],["C",477,1086,358,963,287,823],["C",220,686,199,476,202,252],["Z"]],
  inner: [["M",624,80],["L",1015,264],["C",1023,478,992,678,907,840],["C",831,980,719,1090,618,1166],["C",487,1054,377,938,309,804],["C",248,675,230,474,239,264],["Z"]],
  crown: [["M",624,82],["L",1013,264],["L",952,325],["C",737,304,492,310,277,331],["L",241,264],["Z"]],
  upperCut: [["M",400,363],["L",824,363],["L",462,726],["L",323,800],["L",729,398],["L",454,398],["C",423,398,392,431,374,460],["Z"]],
  lowerCut: [["M",838,394],["L",922,360],["L",507,790],["L",795,790],["C",831,790,867,752,896,722],["L",867,825],["L",408,826],["L",375,882],["Z"]],
};
export const referencePoint = (x, y) => [(x - 628) / 320, (626 - y) / 320];
export const contourPath = commands => commands.map(([op,...p]) => `${op}${p.join(" ")}`).join(" ");
