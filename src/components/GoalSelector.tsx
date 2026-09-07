"use client";
import {
  Dumbbell,
  Flame,
  Zap,
  PersonStanding,
  Heart,
  ChartNoAxesColumnIncreasing,
} from "lucide-react";
import { goals } from "@/lib/config";
import { useBooking } from "./BookingProvider";
const icons = [
  Dumbbell,
  Flame,
  Zap,
  PersonStanding,
  Heart,
  ChartNoAxesColumnIncreasing,
];
export function GoalSelector() {
  const { goal, setGoal, openBooking } = useBooking();
  return (
    <section id="ziele" className="goals-section section-pad">
      <div className="section-heading reveal">
        <div>
          <p className="eyebrow">03 / Was ist dein Ziel?</p>
          <h2>
            DEIN NÄCHSTES <span className="dim">LEVEL.</span>
          </h2>
        </div>
        <p className="micro side-note">
          Ziele setzen.
          <br />
          Dranbleiben.
          <br />
          Resultate sehen.
        </p>
      </div>
      <div className="goals-grid" aria-label="Trainingsziel">
        {goals.map((item, i) => {
          const Icon = icons[i];
          return (
            <button
              className={`goal-panel ${i === goal ? "active" : ""}`}
              aria-pressed={i === goal}
              key={item.id}
              onClick={() => setGoal(i)}
            >
              <span className="goal-number">0{i + 1}</span>
              <Icon size={30} strokeWidth={1} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
      <div className="goal-detail" aria-live="polite">
        <h3 key={goals[goal].title}>{goals[goal].title}</h3>
        <p key={goals[goal].id}>{goals[goal].copy}</p>
        <button className="button primary" onClick={() => openBooking()}>
          Training starten <span>↗</span>
        </button>
      </div>
    </section>
  );
}
