"use client";
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
        Probetraining starten <span>↗</span>
      </button>
      <div className="final-rail">
        <span>DEIN TRAINING.</span>
        <i />
        <span>DEIN FORTSCHRITT.</span>
      </div>
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
          <strong>Youpscaling ↗</strong>
        </a>
      </div>
      <div className="footer-links">
        {siteConfig.contact.instagram && (
          <a
            href={siteConfig.contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram ↗
          </a>
        )}
        <a href="#top">Nach oben ↑</a>
      </div>
    </footer>
  );
}
