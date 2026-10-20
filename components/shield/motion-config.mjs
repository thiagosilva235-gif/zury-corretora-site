export const shieldMotion = Object.freeze({
  entrance: { duration: 3.2, ease: "power3.out", cssEase: "cubic-bezier(.23,1,.32,1)", posterFade: .7, y: -.22, yaw: -.3, pitch: .09 },
  pose: { yaw: -.10, pitch: .025 },
  float: { amplitude: .012, period: 9 },
  tilt: { yaw: .10, pitch: .065, touchFactor: .4, damping: 5.5 },
  scroll: { y: .16, yaw: .09, pitch: -.045, scrub: .7 },
  light: { amplitude: .018, period: 22 },
});
