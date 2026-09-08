import Link from "next/link";

export const metadata = {
  title: "Impressum | Sebastian Chenaux",
  description: "Impressum von Sebastian Chenaux Personal Training.",
};

export default function ImpressumPage() {
  return (
    <main className="legal-page">
      <div className="legal-page-inner">
        <Link className="legal-back" href="/">← Zur Website</Link>
        <p className="eyebrow">Rechtliches</p>
        <h1>Impressum</h1>
        <section>
          <h2>Anbieter</h2>
          <p>
            Sebastian Chenaux<br />
            Stüssistrasse 96<br />
            8057 Zürich<br />
            Schweiz
          </p>
          <p>
            E-Mail: sebastianchenaux@icloud.com<br />
            Telefon: 078 340 24 44
          </p>
        </section>
        <section>
          <h2>Verantwortlich für den Inhalt</h2>
          <p>Sebastian Chenaux, gleiche Adresse wie oben.</p>
        </section>
        <section>
          <h2>Hinweis</h2>
          <p>
            Die Inhalte dieser Website dienen der Information über Personal
            Training. Verbindliche Trainingsvereinbarungen werden individuell
            besprochen.
          </p>
        </section>
      </div>
    </main>
  );
}
