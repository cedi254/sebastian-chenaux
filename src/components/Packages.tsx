"use client";
import { Check, ArrowUpRight } from "lucide-react";
import { packages } from "@/lib/config";
import { useBooking } from "./BookingProvider";
export function Packages() {
  const { openBooking } = useBooking();
  return (
    <section id="angebot" className="packages-section section-pad">
      <div className="section-heading reveal">
        <div>
          <p className="eyebrow">05 / Dein Training. Dein Plan.</p>
          <h2>
            COMMIT TO
            <br />
            <span className="dim">YOURSELF.</span>
          </h2>
        </div>
        <p className="section-description">
          Ein erster Schritt oder ein klares Ziel.
          <br />
          Wir finden den Plan, der zu dir passt.
        </p>
      </div>
      <div className="packages-grid">
        {packages.map((pkg, i) => (
          <article
            className={`package ${pkg.recommended ? "recommended" : ""}`}
            key={pkg.name}
          >
            <div className="package-top">
              <span className="micro">
                0{i + 1} / {pkg.label}
              </span>
              {pkg.recommended && (
                <span className="recommend-label">Für deinen Aufbau</span>
              )}
            </div>
            <h3>{pkg.name}</h3>
            <p className="package-description">{pkg.description}</p>
            <div className="package-price">
              {pkg.price}
              <span>{pkg.unit}</span>
            </div>
            <ul>
              {pkg.features.map((f) => (
                <li key={f}>
                  <Check size={15} />
                  {f}
                </li>
              ))}
            </ul>
            <button
              className={`button ${pkg.recommended ? "primary" : "outline"}`}
              onClick={() => openBooking(pkg.name)}
            >
              Training anfragen <ArrowUpRight size={17} />
            </button>
          </article>
        ))}
      </div>
      <p className="price-note">
        Individuelle Angebote und Einheiten auf Anfrage.
      </p>
    </section>
  );
}
