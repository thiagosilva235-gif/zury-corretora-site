"use client";

import Image from "next/image";
import { useEffect, useId, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createImageShieldOrbit, imageShieldMotion as config, imageShieldProfile, imageShieldInteraction, resetImageShieldTilt } from "./image-motion.mjs";
import "./image-shield.css";
import { createSiteEntrance, entranceMotion } from "@/lib/site-motion.mjs";

gsap.registerPlugin(ScrollTrigger);

/** Original raster artwork with a separate, silhouette-masked cursor reflection; no image edits. */
export function ImageShield({ animated = true, entranceDelay = entranceMotion.delay, scrollMotion = false }: { animated?: boolean; entranceDelay?: number; scrollMotion?: boolean }) {
  const stage = useRef<HTMLDivElement>(null);
  const scroll = useRef<HTMLDivElement>(null);
  const entry = useRef<HTMLDivElement>(null);
  const floating = useRef<HTMLDivElement>(null);
  const tilt = useRef<HTMLDivElement>(null);
  const light = useRef<HTMLDivElement>(null);
  const lightPointer = useRef<HTMLDivElement>(null);
  const reflection = useRef<SVGRectElement>(null);
  const reflectionId = useId();

  useEffect(() => {
    const root = stage.current;
    if (!root) return;
    root.dataset.motion = "static";
    if (!animated) { root.dataset.motion = "static"; return; }
    const media = gsap.matchMedia();
    media.add({ motion: "(prefers-reduced-motion: no-preference)", reduce: "(prefers-reduced-motion: reduce)", compact: "(max-width: 767px)" }, (context) => {
      if (!context.conditions?.motion) { root.dataset.motion = "static"; return; }
      const profile = imageShieldProfile({ compact: !!context.conditions.compact });
      const entrance = createSiteEntrance(gsap, entry.current, { paused: true, delay: entranceDelay });
      const drift = createImageShieldOrbit(gsap, floating.current, light.current, profile);
      const hero = root.closest(".hero");
      if (scrollMotion && hero) {
        gsap.fromTo(scroll.current, { y: 0, rotationY: 0 }, {
          y: -profile.scrollY, rotationY: profile.scrollYaw, ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: config.scroll.scrub, invalidateOnRefresh: true },
        });
      }
      const rotateX = gsap.quickTo(tilt.current, "rotationX", { duration: config.tilt.duration, ease: config.tilt.ease });
      const rotateY = gsap.quickTo(tilt.current, "rotationY", { duration: config.tilt.duration, ease: config.tilt.ease });
      const lightX = gsap.quickTo(lightPointer.current, "x", { duration: config.tilt.duration, ease: config.tilt.ease });
      const lightY = gsap.quickTo(lightPointer.current, "y", { duration: config.tilt.duration, ease: config.tilt.ease });
      const positionX = gsap.quickTo(tilt.current, "x", { duration: config.tilt.duration, ease: config.tilt.ease });
      const positionY = gsap.quickTo(tilt.current, "y", { duration: config.tilt.duration, ease: config.tilt.ease });
      const reflectionX = gsap.quickTo(reflection.current, "x", { duration: config.tilt.duration, ease: config.tilt.ease, force3D: false });
      const reflectionY = gsap.quickTo(reflection.current, "y", { duration: config.tilt.duration, ease: config.tilt.ease, force3D: false });
      const reflectionOpacity = gsap.quickTo(reflection.current, "opacity", { duration: .18, ease: config.tilt.ease });
      const mouse = matchMedia("(hover: hover) and (pointer: fine)");
      const pointerSurface = hero ?? root;
      let visible = false;
      const reset = (immediate = false) => {
        resetImageShieldTilt(rotateX, rotateY, immediate);
        resetImageShieldTilt(lightX, lightY, immediate);
        resetImageShieldTilt(positionX, positionY, immediate);
        resetImageShieldTilt(reflectionX, reflectionY, immediate);
        reflectionOpacity(0);
        if (immediate) reflectionOpacity.tween.progress(1).pause();
      };
      const leave = () => reset();
      const sync = () => {
        const active = visible && !document.hidden;
        root.dataset.motion = active ? "active" : "paused";
        entrance.paused(!active); drift.paused(!active);
        if (!active) reset(true);
      };
      const observer = new IntersectionObserver(([item]) => { visible = item.isIntersecting && item.intersectionRatio > .04; sync(); }, { threshold: [0, .04] });
      observer.observe(root);
      const move = (event: PointerEvent) => {
        if (!mouse.matches || !visible || document.hidden) return;
        const rect = root.getBoundingClientRect();
        const pose = imageShieldInteraction(event.clientX - rect.left, event.clientY - rect.top, rect.width, rect.height, { pointerType: event.pointerType });
        rotateX(pose.rotationX); rotateY(pose.rotationY);
        positionX(pose.x); positionY(pose.y);
        reflectionX(pose.reflectionX); reflectionY(pose.reflectionY); reflectionOpacity(pose.reflectionOpacity);
        lightX(pose.rotationY / config.tilt.yaw * config.light.pointerX);
        lightY(-pose.rotationX / config.tilt.pitch * config.light.pointerY);
      };
      pointerSurface.addEventListener("pointermove", move as EventListener, { passive: true });
      pointerSurface.addEventListener("pointerleave", leave);
      window.addEventListener("blur", leave);
      window.addEventListener("scroll", leave, { passive: true });
      document.addEventListener("visibilitychange", sync);
      return () => {
        observer.disconnect();
        pointerSurface.removeEventListener("pointermove", move as EventListener);
        pointerSurface.removeEventListener("pointerleave", leave);
        window.removeEventListener("blur", leave);
        window.removeEventListener("scroll", leave);
        document.removeEventListener("visibilitychange", sync);
        root.dataset.motion = "paused";
      };
    }, root);
    return () => media.revert();
  }, [animated, entranceDelay, scrollMotion]);

  return <div ref={stage} className="image-shield" data-motion="paused" data-renderer="original-image">
    <div className="image-shield-light" aria-hidden="true"><div ref={light} className="image-shield-light-drift"><div ref={lightPointer} className="image-shield-light-pointer" /></div></div>
    <div ref={scroll} className="image-shield-scroll"><div ref={entry} className="image-shield-entry"><div ref={floating} className="image-shield-float"><div ref={tilt} className="image-shield-tilt">
      <div className="image-shield-art">
        <Image src="/shield/references/geometry.png" alt="Escudo original da ZURY, monograma Z em metal grafite escovado com bordas prateadas" width={1254} height={1254} sizes="(max-width: 767px) 90vw, 620px" priority draggable={false} />
        <svg className="image-shield-reflection" viewBox="0 0 600 600" aria-hidden="true" focusable="false">
          <defs>
            <mask id={`${reflectionId}-mask`} maskUnits="userSpaceOnUse" x="0" y="0" width="600" height="600" style={{ maskType: "alpha" }}><image href="/shield/references/geometry.png" width="600" height="600" /></mask>
            <linearGradient id={`${reflectionId}-light`} x1="0" y1="0" x2="1" y2=".4" gradientUnits="objectBoundingBox">
              <stop offset=".36" stopColor="#f0f3f5" stopOpacity="0" /><stop offset=".5" stopColor="#f0f3f5" stopOpacity=".32" /><stop offset=".64" stopColor="#f0f3f5" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g mask={`url(#${reflectionId}-mask)`}><rect ref={reflection} className="image-shield-reflection-sweep" x="-150" y="-150" width="900" height="900" fill={`url(#${reflectionId}-light)`} /></g>
        </svg>
      </div>
    </div></div></div></div>
  </div>;
}
