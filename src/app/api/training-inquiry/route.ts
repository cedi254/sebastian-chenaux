import { Resend } from "resend";
import { buildTrainingEmail } from "@/lib/training-email";
import { validateContact, type Inquiry } from "@/lib/inquiry";

function isText(value: unknown): value is string {
  return typeof value === "string";
}

export async function POST(request: Request) {
  let body: Partial<Inquiry>;
  try {
    body = (await request.json()) as Partial<Inquiry>;
  } catch {
    return Response.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const inquiry: Inquiry = {
    name: isText(body.name) ? body.name : "",
    contact: isText(body.contact) ? body.contact : "",
    goal: isText(body.goal) ? body.goal : "",
    frequency: isText(body.frequency) ? body.frequency : "",
    message: isText(body.message) ? body.message : "",
    packageName: isText(body.packageName) ? body.packageName : "Probetraining",
  };

  if (
    !inquiry.name.trim() ||
    !inquiry.goal.trim() ||
    !inquiry.frequency.trim() ||
    !validateContact(inquiry.contact)
  ) {
    return Response.json(
      { error: "Bitte prüfe deine Angaben und versuche es erneut." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.TRAINING_INBOX;
  const sender = process.env.RESEND_FROM;
  if (!apiKey || !recipient || !sender) {
    return Response.json(
      { error: "Der Versand ist noch nicht vollständig eingerichtet." },
      { status: 503 },
    );
  }

  const email = buildTrainingEmail(inquiry);
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: sender,
    to: recipient,
    subject: email.subject,
    text: email.text,
    ...(email.replyTo ? { replyTo: email.replyTo } : {}),
  });

  if (error) {
    console.error("Training enquiry email failed", error);
    return Response.json(
      { error: "Die Anfrage konnte gerade nicht gesendet werden." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
