import Image from "next/image";
import { ArrowUpRight, ArrowDown } from "lucide-react";
export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-image">
        <Image
          src="/images/hero.webp"
          alt="Sebastian Chenaux beim Klimmzug im Fitnessstudio"
          fill
          priority
          sizes="100vw"
        />
      </div>
      <div className="hero-shade" />
      <div className="hero-content">
        <p className="eyebrow">Personal Trainer · Zürich</p>
        <h1 id="hero-title">
          SEBASTIAN
          <br />
          <span>CHENAUX</span>
        </h1>
        <p className="hero-tagline">
          DEIN TRAINING.
          <br />
          DEIN FORTSCHRITT.
        </p>
        <div className="hero-actions">
          <a className="button primary" href="#anfrage">
            Probetraining starten <ArrowUpRight size={18} />
          </a>
          <a className="button outline" href="#training">
            Training entdecken <ArrowDown size={18} />
          </a>
        </div>
      </div>
      <div className="hero-bottom">
        <div className="hero-categories">
          <a href="#training">Kraft</a>
          <a href="#training">Ausdauer</a>
          <a href="#training">Functional</a>
          <a href="#ziele">Athletik</a>
        </div>
      </div>
    </section>
  );
}
