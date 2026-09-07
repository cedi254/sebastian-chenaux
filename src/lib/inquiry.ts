export type Inquiry = {
  name: string;
  contact: string;
  goal: string;
  frequency: string;
  message: string;
  packageName: string;
};
export function validateContact(value: string): boolean {
  const v = value.trim();
  return (
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ||
    (/^\+?[\d\s().-]+$/.test(v) &&
      v.replace(/\D/g, "").length >= 9 &&
      v.replace(/\D/g, "").length <= 15)
  );
}
export function buildInquiryText(data: Inquiry): string {
  return `Hallo Sebastian\n\nIch interessiere mich für ein Training mit dir.\n\nName: ${data.name.trim()}\nKontakt: ${data.contact.trim()}\nZiel: ${data.goal}\nHäufigkeit: ${data.frequency}\nAngebot: ${data.packageName || "Probetraining"}\n\n${data.message.trim()}`;
}
export function whatsappUrl(number: string, message: string): string | null {
  const n = number.trim().replace(/[\s()-]/g, "");
  return /^\+?[1-9]\d{8,14}$/.test(n)
    ? `https://wa.me/${n.replace("+", "")}?text=${encodeURIComponent(message)}`
    : null;
}
