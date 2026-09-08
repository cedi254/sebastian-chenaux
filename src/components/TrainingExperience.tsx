"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { trainingModes } from "@/lib/config";
import { DUMBBELL_PRELOAD_ROOT_MARGIN } from "@/lib/dumbbell-loading";
const Scene = dynamic(() => import("./DumbbellScene"), { ssr: false });
class SceneBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { error: boolean }
> {
  state = { error: false };
  static getDerivedStateFromError() {
    return { error: true };
  }
  render() {
    return this.state.error ? this.props.fallback : this.props.children;
  }
}
export function TrainingExperience() {
  const [mode, setMode] = useState(0),
    [ready, setReady] = useState(false),
    [webgl, setWebgl] = useState(true),
    [reduced, setReduced] = useState(false),
    [active, setActive] = useState(false);
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const capabilitiesChecked = useRef(false);
  const data = trainingModes[mode];
  // Browser capability detection is an external-system initialisation after hydration.
  useEffect(() => {
    void import("./DumbbellScene");
  }, []);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!capabilitiesChecked.current) {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("webgl2");
            setWebgl(
              !!ctx &&
                !new URLSearchParams(window.location.search).has("no-webgl"),
            );
            ctx?.getExtension("WEBGL_lose_context")?.loseContext();
            capabilitiesChecked.current = true;
          }
          setReady(true);
        }
        setActive(entry.isIntersecting);
      },
      { rootMargin: DUMBBELL_PRELOAD_ROOT_MARGIN },
    );
    if (root.current) observer.observe(root.current);
    return () => {
      observer.disconnect();
      query.removeEventListener("change", update);
    };
  }, []);
  const scrollToMode = (targetIndex: number) => {
    if (!root.current) {
      setMode(targetIndex);
      return;
    }
    const rect = root.current.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    const sectionTop = rect.top + scrollTop;
    const scrollableDistance = root.current.offsetHeight - window.innerHeight;

    const count = trainingModes.length;
    const targetFraction = (targetIndex + 0.5) / count;
    const targetY = sectionTop + targetFraction * scrollableDistance;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
    setMode(targetIndex);
  };

  useEffect(() => {
    if (!root.current || !ready) return;
    let disposed = false;
    let cleanup = () => {};
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (disposed) return;
        gsap.registerPlugin(ScrollTrigger);
        const trigger = ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            progress.current = self.progress;
            root.current?.style.setProperty(
              "--scene-progress",
              String(self.progress),
            );
            root.current?.setAttribute(
              "data-progress",
              self.progress.toFixed(3),
            );
            window.dispatchEvent(new Event("training-progress"));

            const count = trainingModes.length;
            const newMode = Math.min(
              count - 1,
              Math.max(0, Math.floor(self.progress * count)),
            );
            setMode((prev) => (prev !== newMode ? newMode : prev));
          },
        });
        cleanup = () => trigger.kill();
      },
    );
    return () => {
      disposed = true;
      cleanup();
    };
  }, [ready]);
  const fallback = (
    <Image
      unoptimized
      width={890}
      height={590}
      className="dumbbell-fallback"
      src="/images/dumbbell.webp"
      alt="Schwarze Sechskanthantel mit gerändeltem Metallgriff"
    />
  );
  return (
    <section
      id="training"
      className={`training-experience ${reduced ? "reduced" : ""}`}
      ref={root}
    >
      <div className="training-sticky">
        <div className="training-topline">
          <span className="eyebrow">02 / Das Training</span>
        </div>
        <div className="training-layout">
          <div className="training-nav" aria-label="Trainingsart">
            {trainingModes.map((m, i) => (
              <button
                key={m.name}
                onClick={() => scrollToMode(i)}
                aria-pressed={mode === i}
                className={mode === i ? "active" : ""}
              >
                <span>0{i + 1}</span>
                {m.name}
              </button>
            ))}
          </div>
          <div
            className="training-visual"
            aria-label="Interaktive 3D-Hantel, die sich beim Scrollen dreht"
          >
            <div className="dumbbell-stage">
              {ready && webgl ? (
                <SceneBoundary fallback={fallback}>
                  <Scene
                    progress={progress}
                    reduced={reduced}
                    active={active}
                    onFailure={() => setWebgl(false)}
                  />
                </SceneBoundary>
              ) : (
                fallback
              )}
            </div>
          </div>
          <div className="training-copy" key={data.name}>
            <p className="eyebrow">0{mode + 1}</p>
            <h2>{data.name.toUpperCase()}</h2>
            <p className="training-tagline">{data.tagline}</p>
            <p className="body-copy">{data.copy}</p>
            <a className="text-link" href="#ziele">
              Dein Ziel entdecken <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
