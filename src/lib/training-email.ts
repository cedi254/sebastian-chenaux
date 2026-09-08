import { buildInquiryText, type Inquiry } from "./inquiry.ts";

export type TrainingEmail = {
  subject: string;
  text: string;
  replyTo?: string;
};

function emailAddress(value: string): string | undefined {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())
    ? value.trim()
    : undefined;
}

export function buildTrainingEmail(data: Inquiry): TrainingEmail {
  return {
    subject: `Trainingsanfrage — ${data.goal}`,
    text: buildInquiryText(data),
    ...(emailAddress(data.contact)
      ? { replyTo: emailAddress(data.contact) }
      : {}),
  };
}
