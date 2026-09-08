import { test } from "node:test";
import assert from "node:assert/strict";
import { buildTrainingEmail } from "../src/lib/training-email.ts";

test("builds a training enquiry email with a reply address", () => {
  const email = buildTrainingEmail({
    name: "Léa",
    contact: "lea@example.com",
    goal: "Athletik",
    frequency: "2× pro Woche",
    message: "Kraft & Kontrolle",
    packageName: "BUILD",
  });

  assert.equal(email.replyTo, "lea@example.com");
  assert.equal(email.subject, "Trainingsanfrage — Athletik");
  assert.match(email.text, /Léa/);
  assert.match(email.text, /Kraft & Kontrolle/);
});

test("does not expose a phone number as an email reply address", () => {
  const email = buildTrainingEmail({
    name: "Noah",
    contact: "+41 79 123 45 67",
    goal: "Fitness",
    frequency: "1× pro Woche",
    message: "",
    packageName: "Probetraining",
  });

  assert.equal(email.replyTo, undefined);
});
