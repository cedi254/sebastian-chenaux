import Link from "next/link";

export const metadata = {
  title: "Datenschutz | Sebastian Chenaux",
  description: "Datenschutzerklärung von Sebastian Chenaux Personal Training.",
};

export default function DatenschutzPage() {
  return (
    <main className="legal-page">
      <div className="legal-page-inner">
        <Link className="legal-back" href="/">← Zur Website</Link>
        <p className="eyebrow">Rechtliches</p>
        <h1>Datenschutz</h1>
        <p className="legal-updated">Stand: 8. September 2026</p>
        <section>
          <h2>Verantwortlicher</h2>
          <p>
            Verantwortlich für die Bearbeitung von Personendaten ist Sebastian
            Chenaux, Stüssistrasse 96, 8057 Zürich, Schweiz. Fragen zum
            Datenschutz bitte an sebastianchenaux@icloud.com richten.
          </p>
        </section>
        <section>
          <h2>Kontaktformular</h2>
          <p>
            Wenn du eine Anfrage sendest, bearbeiten wir deinen Namen, deine
            Kontaktangabe, dein Trainingsziel, deine gewünschte Häufigkeit und
            deine Nachricht, um die Anfrage zu beantworten und ein Training zu
            organisieren. Die Angaben werden nur so lange aufbewahrt, wie es
            für diesen Zweck und allfällige gesetzliche Pflichten erforderlich
            ist.
          </p>
        </section>
        <section>
          <h2>E-Mail-Versand</h2>
          <p>
            Für den direkten Versand von Formularanfragen wird – sobald
            aktiviert – Resend als Auftragsbearbeiter eingesetzt. Dabei werden
            die Formulardaten zur Zustellung an den angegebenen Empfänger
            verarbeitet. Die konkrete Datenübermittlung wird vor der Aktivierung
            des Versands geprüft und in dieser Erklärung ergänzt.
          </p>
        </section>
        <section>
          <h2>Website und Cookies</h2>
          <p>
            Diese Website verwendet derzeit keine nicht notwendigen Analyse- oder
            Werbe-Cookies. Technisch notwendige Daten können beim Hosting zur
            sicheren Bereitstellung der Website verarbeitet werden.
          </p>
        </section>
        <section>
          <h2>Deine Rechte</h2>
          <p>
            Du kannst im Rahmen des Schweizer Datenschutzgesetzes Auskunft,
            Berichtigung oder Löschung deiner Personendaten verlangen. Wende
            dich dafür an sebastianchenaux@icloud.com.
          </p>
        </section>
      </div>
    </main>
  );
}
