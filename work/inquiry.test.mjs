import { test } from "node:test";
import assert from "node:assert/strict";
import {
  validateContact,
  buildInquiryText,
  whatsappUrl,
} from "../src/lib/inquiry.ts";
test("accepts valid email and Swiss phone, rejects blank and invalid contacts", () => {
  assert.equal(validateContact("person@example.com"), true);
  assert.equal(validateContact("+41 79 123 45 67"), true);
  for (const bad of ["", "abc", "a@b", "123", "++41791234567"])
    assert.equal(validateContact(bad), false);
});
test("enquiry preserves goal, frequency, package and special characters", () => {
  const text = buildInquiryText({
    name: "Léa",
    contact: "lea@example.com",
    goal: "Athletik",
    frequency: "2× pro Woche",
    message: "Kraft & Kontrolle",
    packageName: "BUILD",
  });
  for (const value of [
    "Léa",
    "Athletik",
    "2× pro Woche",
    "BUILD",
    "Kraft & Kontrolle",
  ])
    assert.ok(text.includes(value));
});
test("WhatsApp remains hidden without a valid international number", () => {
  assert.equal(whatsappUrl("", "test"), null);
  assert.equal(whatsappUrl("placeholder", "test"), null);
  assert.equal(
    whatsappUrl("+41 79 123 45 67", "Kraft & Fitness"),
    "https://wa.me/41791234567?text=Kraft%20%26%20Fitness",
  );
});
