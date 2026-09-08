"use client";
import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { ArrowUpRight, ArrowRight, ArrowLeft, Check, X } from "lucide-react";
import { goals, frequencies, siteConfig } from "@/lib/config";
import { validateContact, buildInquiryText, whatsappUrl } from "@/lib/inquiry";
const BookingContext = createContext<{
  goal: number;
  setGoal: (value: number) => void;
  openBooking: (packageName?: string) => void;
}>({
  goal: 0,
  setGoal: () => {},
  openBooking: () => {},
});
export const useBooking = () => useContext(BookingContext);
export function BookingProvider({ children }: { children: ReactNode }) {
  const [goal, setGoal] = useState(0),
    [step, setStep] = useState(0),
    [frequency, setFrequency] = useState(""),
    [packageName, setPackageName] = useState("Probetraining"),
    [name, setName] = useState(""),
    [contact, setContact] = useState(""),
    [message, setMessage] = useState(""),
    [error, setError] = useState(""),
    [complete, setComplete] = useState(false),
    [copied, setCopied] = useState(false),
    [sending, setSending] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const priorFocus = useRef<HTMLElement | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const openBooking = useCallback((pkg = "Probetraining") => {
    priorFocus.current = document.activeElement as HTMLElement;
    setPackageName(pkg);
    setStep(0);
    setComplete(false);
    setError("");
    setCopied(false);
    dialog.current?.showModal();
  }, []);
  const close = () => {
    dialog.current?.close();
    priorFocus.current?.focus();
  };
  useEffect(() => {
    if (dialog.current?.open) heading.current?.focus();
  }, [step, complete]);
  useEffect(() => {
    const click = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href="#anfrage"]');
      if (anchor) {
        e.preventDefault();
        openBooking();
      }
    };
    document.addEventListener("click", click);
    return () => document.removeEventListener("click", click);
  }, [openBooking]);
  useEffect(() => {
    const ctx = (
      document as Document & {
        modelContext?: {
          registerTool: (
            tool: unknown,
            options: { signal: AbortSignal },
          ) => void;
        };
      }
    ).modelContext;
    if (!ctx) return;
    const lifecycle = new AbortController();
    try {
      void Promise.resolve(
        ctx.registerTool(
          {
            name: "start_training_inquiry",
            description:
              "Select a training goal and open the enquiry form. Does not send an enquiry.",
            inputSchema: {
              type: "object",
              properties: {
                goal: { type: "string", enum: goals.map((g) => g.label) },
              },
              required: ["goal"],
              additionalProperties: false,
            },
            annotations: { readOnlyHint: false },
            execute: async (input: unknown) => {
              const value = (input as { goal?: string })?.goal;
              const index = goals.findIndex((g) => g.label === value);
              if (index < 0) throw new Error("Unknown training goal");
              setGoal(index);
              openBooking();
              await new Promise((r) =>
                requestAnimationFrame(() => requestAnimationFrame(r)),
              );
              return { status: "inquiry_opened", goal: value, sent: false };
            },
          },
          { signal: lifecycle.signal },
        ),
      ).catch(() => {});
    } catch {}
    return () => lifecycle.abort();
  }, [openBooking]);
  const inquiry = buildInquiryText({
    name,
    contact,
    goal: goals[goal].label,
    frequency,
    packageName,
    message,
  });
  const whatsapp = whatsappUrl(siteConfig.contact.whatsapp, inquiry);
  const preview = siteConfig.booking.preview;
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Bitte gib deinen Namen ein.");
      return;
    }
    if (!validateContact(contact)) {
      setError("Bitte gib eine gültige E-Mail-Adresse oder Telefonnummer ein.");
      return;
    }
    setError("");
    if (preview) {
      setComplete(true);
      return;
    }
    setSending(true);
    try {
      const response = await fetch("/api/training-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          contact,
          goal: goals[goal].label,
          frequency,
          message,
          packageName,
        }),
      });
      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(result?.error || "Senden fehlgeschlagen");
      }
      setComplete(true);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Die Anfrage konnte gerade nicht gesendet werden.",
      );
    } finally {
      setSending(false);
    }
  };
  return (
    <BookingContext.Provider value={{ goal, setGoal, openBooking }}>
      {children}
      <dialog
        className="booking-dialog"
        ref={dialog}
        onKeyDown={(e) => {
          if (e.key !== "Tab") return;
          const nodes = Array.from(
            e.currentTarget.querySelectorAll<HTMLElement>(
              'button:not(:disabled),a[href],input,textarea,[tabindex="0"]',
            ),
          ).filter((el) => el.getClientRects().length > 0);
          const first = nodes[0],
            last = nodes[nodes.length - 1];
          if (
            e.shiftKey &&
            (document.activeElement === first ||
              document.activeElement === heading.current)
          ) {
            e.preventDefault();
            last?.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }}
        aria-labelledby="booking-heading"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
      >
        <div className="booking-inner">
          <button
            className="dialog-close"
            aria-label="Anfrage schliessen"
            onClick={close}
          >
            <X size={24} />
          </button>
          <p className="eyebrow">Sebastian Chenaux · {packageName}</p>
          {!complete ? (
            <>
              <div
                className="step-progress"
                aria-label={`Schritt ${step + 1} von 3`}
              >
                {["Dein Ziel", "Dein Rhythmus", "Dein Kontakt"].map(
                  (label, i) => (
                    <span key={label} className={i <= step ? "current" : ""}>
                      <b>0{i + 1}</b>
                      <small>{label}</small>
                    </span>
                  ),
                )}
              </div>
              <h2 id="booking-heading" tabIndex={-1} ref={heading}>
                {
                  [
                    "WAS IST\nDEIN ZIEL?",
                    "FINDE DEINEN\nRHYTHMUS.",
                    "LASS UNS\nSTARTEN.",
                  ][step]
                }
              </h2>
              {step === 0 ? (
                <>
                  <div className="booking-options">
                    {goals.map((g, i) => (
                      <button
                        key={g.id}
                        onClick={() => setGoal(i)}
                        aria-pressed={goal === i}
                        className={goal === i ? "selected" : ""}
                      >
                        {g.label}
                        {goal === i ? (
                          <Check size={18} />
                        ) : (
                          <ArrowUpRight size={18} />
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="booking-controls">
                    <span className="muted">
                      Dein Training beginnt bei dir.
                    </span>
                    <button
                      className="button primary"
                      onClick={() => setStep(1)}
                    >
                      Weiter <ArrowRight size={17} aria-hidden="true" />
                    </button>
                  </div>
                </>
              ) : step === 1 ? (
                <>
                  <p className="muted">Wie oft möchtest du trainieren?</p>
                  <div className="booking-options">
                    {frequencies.map((f) => (
                      <button
                        key={f}
                        className={f === frequency ? "selected" : ""}
                        aria-pressed={f === frequency}
                        onClick={() => setFrequency(f)}
                      >
                        {f}
                        {f === frequency ? (
                          <Check size={18} />
                        ) : (
                          <ArrowUpRight size={18} />
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="booking-controls">
                    <button className="text-button" onClick={() => setStep(0)}>
                      <ArrowLeft size={16} /> Zurück
                    </button>
                    <button
                      className="button primary"
                      disabled={!frequency}
                      onClick={() => setStep(2)}
                    >
                      Weiter <ArrowRight size={17} aria-hidden="true" />
                    </button>
                  </div>
                </>
              ) : (
                <form onSubmit={submit} noValidate>
                  <div className="inquiry-summary">
                    {goals[goal].label}
                    <span> / </span>
                    {frequency}
                  </div>
                  <label htmlFor="client-name">
                    Dein Name
                    <input
                      id="client-name"
                      autoComplete="name"
                      value={name}
                      maxLength={100}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Vorname Nachname"
                      required
                    />
                  </label>
                  <label htmlFor="client-contact">
                    E-Mail oder Telefonnummer
                    <input
                      id="client-contact"
                      autoComplete="email"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      maxLength={180}
                      placeholder="Wie erreiche ich dich?"
                      aria-describedby={error ? "form-error" : undefined}
                      required
                    />
                  </label>
                  <label htmlFor="client-message">
                    Deine Nachricht <span className="muted">(optional)</span>
                    <textarea
                      id="client-message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      maxLength={1500}
                      placeholder="Was möchtest du mir noch mitgeben?"
                      rows={2}
                    />
                  </label>
                  {error && (
                    <p role="alert" id="form-error" className="form-error">
                      {error}
                    </p>
                  )}
                  <p className="form-note">
                    {preview
                      ? "Vorschau: Deine Angaben werden nicht gesendet oder gespeichert."
                      : "Deine Anfrage wird direkt an Sebastian weitergeleitet."}
                  </p>
                  <div className="booking-controls">
                    <button
                      type="button"
                      className="text-button"
                      onClick={() => setStep(1)}
                    >
                      <ArrowLeft size={16} /> Zurück
                    </button>
                    <button className="button primary" type="submit" disabled={sending}>
                      {preview
                        ? "Anfrage prüfen"
                        : sending
                          ? "Wird gesendet …"
                          : "Anfrage senden"}{" "}
                      <ArrowUpRight size={17} />
                    </button>
                  </div>
                </form>
              )}
            </>
          ) : (
            <div className="booking-result">
              <div className="result-icon">
                <Check size={30} />
              </div>
              <h2 id="booking-heading" ref={heading} tabIndex={-1}>
                {preview
                  ? "DEIN PLAN.\nBEREIT ZUM START."
                  : "DEINE ANFRAGE.\nIST ANGEKOMMEN."}
              </h2>
              <p>
                {preview
                  ? "Dies ist eine Vorschau. Es wurde keine Anfrage gesendet."
                  : "Deine Anfrage wurde erfolgreich weitergeleitet."}
              </p>
              <dl>
                <div>
                  <dt>Ziel</dt>
                  <dd>{goals[goal].label}</dd>
                </div>
                <div>
                  <dt>Rhythmus</dt>
                  <dd>{frequency}</dd>
                </div>
                <div>
                  <dt>Angebot</dt>
                  <dd>{packageName}</dd>
                </div>
                <div>
                  <dt>Kontakt</dt>
                  <dd>
                    {name} · {contact}
                  </dd>
                </div>
              </dl>
              <button
                className="button outline"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(inquiry);
                    setCopied(true);
                  } catch {
                    setError("Kopieren ist in diesem Browser nicht verfügbar.");
                  }
                }}
              >
                {copied ? (
                  <>
                    Kopiert <Check size={17} aria-hidden="true" />
                  </>
                ) : (
                  "Anfrage kopieren"
                )}
              </button>
              {error && <p role="alert">{error}</p>}
              {whatsapp && (
                <a
                  className="button primary"
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Über WhatsApp anfragen <ArrowUpRight size={17} />
                </a>
              )}
              <button
                className="text-button"
                onClick={() => {
                  setComplete(false);
                  setStep(2);
                }}
              >
                Angaben bearbeiten
              </button>
            </div>
          )}
        </div>
      </dialog>
    </BookingContext.Provider>
  );
}
