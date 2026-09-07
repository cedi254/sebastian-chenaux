"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
const links = [
  ["Sebastian", "#sebastian"],
  ["Training", "#training"],
  ["Angebot", "#angebot"],
  ["Location", "#location"],
];
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 40);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header
      className={`navbar ${scrolled ? "scrolled" : ""} ${open ? "menu-open" : ""}`}
    >
      <a
        className="brand"
        href="#top"
        aria-label="Sebastian Chenaux — Startseite"
        onClick={() => setOpen(false)}
      >
        <Image
          unoptimized
          src="/images/monogram.webp"
          width={44}
          height={54}
          alt="SC"
        />
      </a>
      <nav
        aria-label="Hauptnavigation"
        id="main-navigation"
        className={open ? "open" : ""}
      >
        {links.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
      <a
        href="#anfrage"
        className="button primary nav-cta"
        onClick={() => setOpen(false)}
      >
        Probetraining <ArrowUpRight size={16} />
      </a>
      <button
        className="menu-toggle"
        aria-label={open ? "Menü schliessen" : "Menü öffnen"}
        aria-expanded={open}
        aria-controls="main-navigation"
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
      </button>
    </header>
  );
}
