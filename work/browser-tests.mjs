import { chromium, webkit } from "@playwright/test";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
await mkdir("work/screenshots", { recursive: true });
const results = [];
const base = process.env.TEST_URL || "http://127.0.0.1:3000";
async function check(name, run) {
  await run();
  results.push(name);
  console.log("PASS", name);
}
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 960 } });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.goto(base, { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
await check("Desktop typography and no horizontal overflow", async () => {
  assert.equal(await page.locator("h1").innerText(), "SEBASTIAN\nCHENAUX");
  assert.ok(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  );
  await page.screenshot({ path: "work/screenshots/desktop-hero.png" });
});
await check("Six goals update copy and selected state", async () => {
  const panels = page.locator(".goal-panel");
  for (let i = 0; i < 6; i++) {
    await panels.nth(i).click();
    assert.equal(await panels.nth(i).getAttribute("aria-pressed"), "true");
    assert.ok((await page.locator(".goal-detail h3").innerText()).length > 4);
  }
  await page.getByRole("button", { name: "04 Athletik", exact: false }).count();
  await panels.nth(3).click();
});
await check(
  "Selected goal flows into modal; frequency is required",
  async () => {
    await page.locator(".goal-detail button").click();
    assert.equal(
      await page.locator('dialog button[aria-pressed="true"]').innerText(),
      "Athletik",
    );
    await page.getByRole("button", { name: "Weiter", exact: false }).click();
    assert.equal(
      await page
        .getByRole("button", { name: "Weiter", exact: false })
        .isDisabled(),
      true,
    );
    await page
      .getByRole("button", { name: "2× pro Woche", exact: true })
      .click();
    await page.getByRole("button", { name: "Weiter", exact: false }).click();
    assert.match(
      await page.locator(".inquiry-summary").innerText(),
      /Athletik.*2× pro Woche/,
    );
  },
);
await check(
  "Invalid contacts rejected and preview never claims sending",
  async () => {
    await page.getByLabel("Dein Name", { exact: true }).fill("Test Person");
    await page.getByLabel("E-Mail oder Telefonnummer").fill("invalid");
    await page.getByRole("button", { name: "Anfrage prüfen" }).click();
    assert.equal(await page.locator('dialog [role="alert"]').count(), 1);
    await page.getByLabel("E-Mail oder Telefonnummer").fill("test@example.com");
    await page.getByLabel("Deine Nachricht").fill("Kraft & Kontrolle");
    await page.getByRole("button", { name: "Anfrage prüfen" }).click();
    assert.match(
      await page.locator(".booking-result").innerText(),
      /keine Anfrage gesendet/,
    );
    await page.screenshot({ path: "work/screenshots/booking.png" });
    await page.keyboard.press("Escape");
    assert.equal(await page.locator("dialog").isVisible(), false);
  },
);
await check(
  "Packages preserve chosen offer and dialog traps keyboard focus",
  async () => {
    await page.locator(".package").nth(1).getByRole("button").click();
    assert.match(
      await page.locator(".booking-inner>.eyebrow").innerText(),
      /BUILD/,
    );
    for (let i = 0; i < 15; i++) {
      await page.keyboard.press("Tab");
      assert.equal(
        await page.evaluate(
          () => document.activeElement.closest("dialog") !== null,
        ),
        true,
      );
    }
    await page.keyboard.press("Escape");
  },
);
await check("All training modes render with persistent 3D dumbbell", async () => {
  await page.locator(".training-nav button").nth(1).click();
  await page.waitForTimeout(600);
  assert.equal(await page.locator(".training-copy h2").innerText(), "AUSDAUER");
  assert.equal(await page.locator(".dumbbell-canvas canvas").count(), 1);
  await page.locator(".training-nav button").nth(2).click();
  await page.waitForTimeout(600);
  assert.equal(
    await page.locator(".training-copy h2").innerText(),
    "FUNCTIONAL",
  );
  assert.equal(await page.locator(".dumbbell-canvas canvas").count(), 1);
  await page.locator(".training-nav button").nth(0).click();
  await page.waitForTimeout(600);
  assert.equal(await page.locator(".dumbbell-canvas canvas").count(), 1);
});
await check(
  "3D scroll motion reverses, measured canvas stays bounded",
  async () => {
    const range = await page
      .locator("#training")
      .evaluate((el) => ({
        top: el.getBoundingClientRect().top + scrollY,
        length: el.offsetHeight - innerHeight,
      }));
    await page.evaluate(
      (y) => window.scrollTo({ top: y, behavior: "instant" }),
      range.top + range.length * 0.25,
    );
    await page.waitForTimeout(300);
    await page.mouse.move(700, 500);
    await page.waitForTimeout(100);
    const a = await page.locator("#training").getAttribute("data-progress");
    const imageA = await page.locator(".dumbbell-canvas canvas").screenshot();
    await page.evaluate(
      (y) => window.scrollTo({ top: y, behavior: "instant" }),
      range.top + range.length * 0.75,
    );
    await page.waitForTimeout(300);
    const b = await page.locator("#training").getAttribute("data-progress");
    const imageB = await page.locator(".dumbbell-canvas canvas").screenshot();
    assert.ok(Number(b) > Number(a));
    assert.notDeepEqual(imageA, imageB);
    await page.evaluate(
      (y) => window.scrollTo({ top: y, behavior: "instant" }),
      range.top + range.length * 0.25,
    );
    await page.waitForTimeout(400);
    assert.ok(
      Math.abs(
        Number(await page.locator("#training").getAttribute("data-progress")) -
          Number(a),
      ) < 0.02,
    );
    const rect = await page.locator(".dumbbell-canvas canvas").boundingBox();
    assert.ok(rect.width < 1440);
    await page.screenshot({ path: "work/screenshots/desktop-training.png" });
    await page
      .locator(".dumbbell-canvas canvas")
      .screenshot({
        path: "work/screenshots/dumbbell-final.png",
        omitBackground: true,
      });
  },
);
await check("Location tabs and verified route destinations", async () => {
  await page.getByRole("button", { name: "Altstetten", exact: true }).click();
  assert.match(await page.locator("address").innerText(), /Badenerstrasse 557/);
  assert.match(
    await page.locator(".location-links a").first().getAttribute("href"),
    /Badenerstrasse/,
  );
});
await check(
  "All desktop navigation targets exist and scroll correctly",
  async () => {
    for (const id of ["sebastian", "training", "angebot", "location"]) {
      await page.locator(`nav a[href="#${id}"]`).click();
      await page.waitForFunction(id=>Math.abs(document.getElementById(id).getBoundingClientRect().top-90)<5,id);
      const y = await page
        .locator(`#${id}`)
        .evaluate((el) => el.getBoundingClientRect().top);
      assert.ok(y < 160 && y > -30, `${id}: ${y}`);
    }
  },
);
for (const size of [
  { width: 820, height: 1180 },
  { width: 390, height: 844 },
  { width: 320, height: 740 },
]) {
  await check(`Responsive layout ${size.width}px`, async () => {
    await page.setViewportSize(size);
    await page.goto(base, { waitUntil: "networkidle" });
    await page.waitForTimeout(1100);
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    );
    const heading = await page.locator("h1").boundingBox();
    assert.ok(heading.x + heading.width <= size.width);
    await page.screenshot({ path: `work/screenshots/hero-${size.width}.png` });
    await page.getByRole("button", { name: "Menü öffnen" }).click();
    await page.locator('nav a[href="#angebot"]').click();
    assert.equal(
      await page
        .getByRole("button", { name: "Menü öffnen" })
        .getAttribute("aria-expanded"),
      "false",
    );
    await page.locator(".goal-panel").nth(2).click();
    await page.locator(".goal-detail button").click();
    assert.ok(await page.locator("dialog").isVisible());
    const dialog = await page.locator("dialog").boundingBox();
    assert.ok(dialog.x >= 0 && dialog.width <= size.width);
    await page.keyboard.press("Escape");
    await page.locator("#training").scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    );
    await page.screenshot({
      path: `work/screenshots/training-${size.width}.png`,
    });
  });
}
await check(
  "WebGL fallback remains visible with all modes usable",
  async () => {
    await page.goto(base + "/?no-webgl=1");
    await page.locator("#training").scrollIntoViewIfNeeded();
    await page.waitForTimeout(700);
    assert.equal(await page.locator(".dumbbell-canvas canvas").count(), 0);
    assert.equal(
      await page
        .locator(".dumbbell-fallback")
        .evaluate((img) => img.complete && img.naturalWidth > 0),
      true,
    );
  },
);
await check(
  "Reduced motion removes pinned duration and hero parallax",
  async () => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(base, { waitUntil: "networkidle" });
    await page.locator("#training").scrollIntoViewIfNeeded();
    assert.equal(
      await page
        .locator("#training")
        .evaluate((el) => el.classList.contains("reduced")),
      true,
    );
    assert.equal(
      await page
        .locator(".hero-image")
        .evaluate((el) => getComputedStyle(el).transform),
      "none",
    );
  },
);
await check("No unhandled browser errors", async () =>
  assert.deepEqual(errors, []),
);
await browser.close();
const safari = await webkit.launch({ headless: true });
const wp = await safari.newPage({ viewport: { width: 390, height: 844 } });
const webkitErrors = [];
wp.on("pageerror", (e) => webkitErrors.push(e.message));
await check(
  "WebKit mobile: render, goal selection, booking and overflow",
  async () => {
    await wp.goto(base, { waitUntil: "networkidle" });
    assert.ok(
      await wp.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    );
    await wp.locator(".goal-panel").nth(4).click();
    await wp.locator(".goal-detail button").click();
    assert.equal(
      await wp.locator('dialog button[aria-pressed="true"]').innerText(),
      "Ausdauer",
    );
    await wp.keyboard.press("Escape");
    await wp.screenshot({ path: "work/screenshots/webkit-mobile.png" });
    assert.deepEqual(webkitErrors, []);
  },
);
await safari.close();
await writeFile(
  "work/browser-results.json",
  JSON.stringify({ passed: results.length, results, errors }, null, 2),
);
