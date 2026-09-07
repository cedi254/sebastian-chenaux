"use client";
import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/config";
export function Location() {
  const [studio, setStudio] = useState(0),
    [map, setMap] = useState(false);
  const current = siteConfig.location.studios[studio];
  return (
    <section className="location section-pad" id="location">
      <div className="location-copy reveal">
        <p className="eyebrow">06 / Zürich, Schweiz</p>
        <h2>
          HIER
          <br />
          <span className="dim">TRAINIEREN WIR.</span>
        </h2>
        <div className="location-name">
          <MapPin size={20} />
          <h3>{siteConfig.location.name.toUpperCase()}</h3>
        </div>
        <p className="body-copy">{siteConfig.location.note}</p>
        {siteConfig.location.studios.length > 1 && (
          <div className="studio-switch" aria-label="Standorte">
            {siteConfig.location.studios.map((s, i) => (
              <button
                key={s.name}
                aria-pressed={i === studio}
                onClick={() => {
                  setStudio(i);
                  setMap(false);
                }}
                className={studio === i ? "active" : ""}
              >
                {s.name}
              </button>
            ))}
          </div>
        )}
        <address>
          {current.street}
          <br />
          {current.city}
        </address>
        <div className="location-links">
          <a
            className="text-link"
            href={current.map}
            target="_blank"
            rel="noopener noreferrer"
          >
            Route öffnen <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
      <div className="location-visual image-frame">
        {map ? (
          <iframe
            title={`Karte MCS ${current.name}`}
            src={`https://maps.google.com/maps?q=${encodeURIComponent(current.street + " " + current.city)}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <Image
            src="/images/curls.webp"
            alt="Sebastian beim Hanteltraining im Studio"
            fill
            sizes="(max-width: 700px) 100vw, 50vw"
          />
        )}
        <div className="location-caption">
          <span className="micro">DEIN ORT FÜR FORTSCHRITT.</span>
          <button onClick={() => setMap(!map)}>
            {map ? "Foto anzeigen" : "Karte laden"} <span>↗</span>
          </button>
        </div>
        {!map && (
          <span className="map-notice">
            Karte von Google Maps auf Wunsch laden
          </span>
        )}
      </div>
    </section>
  );
}
