"use client";
import { useEffect } from "react";
export function Motion() {
  useEffect(() => {
    let disposed = false,
      started = false;
    let cleanup = () => {};
    const start = () => {
      if (started) return;
      started = true;
      Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
        .then(([{ gsap }, { ScrollTrigger }]) => {
          if (disposed) return;
          gsap.registerPlugin(ScrollTrigger);
          const media = gsap.matchMedia();
          media.add("(prefers-reduced-motion: no-preference)", () => {
            gsap.to(".hero-image", {
              scale: 1.13,
              yPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            });
            gsap.to(".hero-content", {
              y: 70,
              ease: "none",
              scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            });
            gsap.utils
              .toArray<HTMLElement>(".reveal")
              .forEach((el) =>
                gsap.fromTo(
                  el,
                  { y: 28 },
                  {
                    y: 0,
                    duration: 0.85,
                    ease: "power2.out",
                    scrollTrigger: {
                      trigger: el,
                      start: "top 92%",
                      once: true,
                    },
                  },
                ),
              );
          });
          media.add(
            "(prefers-reduced-motion: no-preference) and (pointer: fine)",
            () => {
              const cleanups: (() => void)[] = [];
              document
                .querySelectorAll<HTMLElement>(".button.primary")
                .forEach((button) => {
                  const move = (event: PointerEvent) => {
                    const rect = button.getBoundingClientRect();
                    gsap.to(button, {
                      x: (event.clientX - rect.left - rect.width / 2) * 0.065,
                      y: (event.clientY - rect.top - rect.height / 2) * 0.1,
                      duration: 0.3,
                      overwrite: "auto",
                    });
                  };
                  const leave = () =>
                    gsap.to(button, {
                      x: 0,
                      y: 0,
                      duration: 0.4,
                      overwrite: "auto",
                    });
                  button.addEventListener("pointermove", move);
                  button.addEventListener("pointerleave", leave);
                  cleanups.push(() => {
                    button.removeEventListener("pointermove", move);
                    button.removeEventListener("pointerleave", leave);
                    gsap.set(button, { clearProps: "transform" });
                  });
                });
              const hero = document.querySelector<HTMLElement>(".hero");
              const move = (event: PointerEvent) =>
                gsap.to(".hero-image", {
                  x: (event.clientX / window.innerWidth - 0.5) * 10,
                  duration: 1,
                  overwrite: "auto",
                });
              hero?.addEventListener("pointermove", move);
              return () => {
                cleanups.forEach((fn) => fn());
                hero?.removeEventListener("pointermove", move);
              };
            },
          );
          cleanup = () => media.revert();
        })
        .catch(() => {
          /* Content and native scrolling remain usable without animation. */
        });
    };
    window.addEventListener("scroll", start, { once: true, passive: true });
    window.addEventListener("pointermove", start, {
      once: true,
      passive: true,
    });
    if (window.scrollY > 0) start();
    return () => {
      disposed = true;
      cleanup();
      window.removeEventListener("scroll", start);
      window.removeEventListener("pointermove", start);
    };
  }, []);
  return null;
}
