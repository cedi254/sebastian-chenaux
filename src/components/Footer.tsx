"use client";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { useBooking } from "./BookingProvider";
import { siteConfig } from "@/lib/config";
import Image from "next/image";
export function FinalCTA() {
  const { openBooking } = useBooking();
  return (
    <section id="anfrage" className="final-cta section-pad">
      <p className="eyebrow">07 / Dein nächster Schritt</p>
      <h2>
        BEREIT FÜR DEIN
        <br />
        NÄCHSTES <span>LEVEL?</span>
      </h2>
      <p>Du musst nicht perfekt starten. Nur anfangen.</p>
      <button className="button primary" onClick={() => openBooking()}>
        Probetraining starten <ArrowUpRight size={17} />
      </button>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="footer section-pad">
      <a className="footer-brand" href="#top">
        <Image
          unoptimized
          src="/images/monogram.webp"
          alt="SC"
          width={39}
          height={49}
        />
        <span>
          SEBASTIAN CHENAUX<small>PERSONAL TRAINER</small>
        </span>
      </a>
      <div className="footer-credits">
        <span className="footer-credit">
          © {new Date().getFullYear()} Sebastian Chenaux
        </span>
        <a
          href="https://www.youpscaling.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="agency-badge"
          title="Website built by Youpscaling"
        >
          <span>Created with precision by</span>
          <strong className="youp-brand">
            <span className="youp-gradient">Youpscaling</span>
            <ArrowUpRight className="youp-arrow" size={11} />
          </strong>
        </a>
      </div>
      <div className="footer-links">
        {siteConfig.contact.instagram && (
          <a
            href={siteConfig.contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram <ArrowUpRight size={14} />
          </a>
        )}
        <a href="#top">Nach oben <ArrowUp size={14} /></a>
      </div>
    </footer>
  );
}
