import Image from "next/image";
export function IntroStatement() {
  return (
    <div className="intro-strip section-pad">
      <p>
        FORTSCHRITT BEGINNT
        <br />
        MIT <span>DISZIPLIN.</span>
      </p>
      <span className="intro-note">
        Du bringst den Willen.
        <br />
        Ich bringe den Plan.
      </span>
    </div>
  );
}
export function AboutSebastian() {
  return (
    <section className="about section-pad" id="sebastian">
      <div className="about-image image-frame">
        <Image
          src="/images/plates.webp"
          alt="Sebastian bereitet die Hantelscheiben für das Krafttraining vor"
          fill
          sizes="(max-width: 700px) 100vw, 45vw"
        />
      </div>
      <div className="about-copy reveal">
        <p className="eyebrow">01 / Dein Coach</p>
        <h2>
          TRAINING IST
          <br />
          MEHR ALS
          <br />
          <span className="dim">WIEDERHOLUNGEN.</span>
        </h2>
        <p className="body-copy">
          Sport begleitet mich seit meiner Kindheit. Heute verbinde ich meine
          Erfahrung aus dem Fussball mit meiner EFZ-Ausbildung im
          Fitnessbereich. Für ein Training, das dich stärker macht — und zu dir
          passt.
        </p>
        <div className="credentials">
          <div>
            <span>01</span>
            <p>EFZ FITNESS</p>
          </div>
          <div>
            <span>02</span>
            <p>
              FUSSBALL
              <br />
              ERFAHRUNG
            </p>
          </div>
          <div>
            <span>03</span>
            <p>
              PERSÖNLICHES
              <br />
              COACHING
            </p>
          </div>
        </div>
        <a href="#training" className="text-link">
          Entdecke mein Training <span>↗</span>
        </a>
      </div>
    </section>
  );
}
export function Philosophy() {
  return (
    <section className="philosophy">
      <div className="philosophy-image image-frame">
        <Image
          src="/images/portrait.webp"
          alt="Sebastian konzentriert beim Training am Kabelzug"
          fill
          sizes="(max-width: 700px) 100vw, 55vw"
        />
      </div>
      <div className="philosophy-shade" />
      <div className="philosophy-copy reveal">
        <p className="eyebrow">04 / Mehr als</p>
        <h2>NUR TRAINING.</h2>
        <blockquote>
          «Mein Ziel ist nicht, dass du einfach trainierst.
          <br />
          Mein Ziel ist, dass du besser wirst.»
        </blockquote>
        <p className="signature">Sebastian Chenaux</p>
      </div>
    </section>
  );
}
