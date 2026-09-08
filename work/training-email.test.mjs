import { test } from "node:test";
import assert from "node:assert/strict";
import { buildTrainingEmail } from "../src/lib/training-email.ts";
import { buildBookingResultSummary } from "../src/lib/booking-result.ts";
import { siteConfig } from "../src/lib/config.ts";
import {
  DUMBBELL_MODEL_PATH,
  DUMBBELL_PRELOAD_ROOT_MARGIN,
} from "../src/lib/dumbbell-loading.ts";

test("uses Sebastian's dotted public email address", () => {
  assert.equal(siteConfig.contact.email, "sebastian.chenaux@icloud.com");
});

test("preloads the dumbbell before it reaches the viewport", () => {
  assert.equal(DUMBBELL_MODEL_PATH, "/models/dumbbell.glb");
  assert.equal(DUMBBELL_PRELOAD_ROOT_MARGIN, "100% 0px");
});

test("builds a compact booking result summary", () => {
  assert.equal(
    buildBookingResultSummary({
      goal: "Muskelaufbau",
      frequency: "2× pro Woche",
      packageName: "Probetraining",
    }),
    "Muskelaufbau · 2× pro Woche · Probetraining",
  );
});

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
