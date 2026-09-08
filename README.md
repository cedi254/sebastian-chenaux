# Sebastian Chenaux — Personal Training

Cinematic German personal training website. Built with Next.js App Router, TypeScript, Tailwind, GSAP ScrollTrigger, Three.js, React Three Fiber and Drei.

## Local development

```sh
npm install
npm run dev
```

Production build: `npm run build` creates a Vercel-compatible Next.js deployment. Images are pre-optimised WebP with a responsive custom Next image loader; fonts are local. The GLB and 3D code load near the training section. Rendering happens on demand, not in a permanent animation loop.

## Edit content

`src/lib/config.ts` contains packages, prices, goals, training modes, MCS locations and contact settings. Training enquiries are sent through `/api/training-inquiry` with Resend. Configure `RESEND_API_KEY`, `RESEND_FROM` and `TRAINING_INBOX` from `.env.example`; production values belong in Vercel Environment Variables, never in the repository. A valid international WhatsApp number enables the optional WhatsApp handoff.

The two MCS addresses were checked against https://www.mcs-training.ch/ on 7 September 2026. They are MCS locations; Sebastian's exact meeting point is arranged personally. MCS is not presented as his business.

## Quality checks

```sh
npm run lint
npx tsc --noEmit
node --experimental-strip-types --test work/inquiry.test.mjs
node work/browser-tests.mjs
```

Browser tests require Playwright browsers (`npx playwright install chromium webkit`) and a running local server. They use installed Chrome and Playwright WebKit. Set TEST_URL to test another local origin. WebKit coverage is not a claim of testing the Safari application or a physical iPhone.

Tested: responsive layouts at 1440, 820, 390 and 320px; six goals; three training modes; selection persistence; form validation; preview status; focus containment and Escape; anchor navigation; location links; actual canvas changes on scroll and reversal; WebGL fallback; reduced motion. `?no-webgl=1` is a deterministic fallback check.

The optional feature-detected WebMCP tool opens and stages an enquiry only. Native tool invocation requires a browser that exposes the proposed API; unsupported browsers keep all normal UI functionality.

## Assets

Four real user-supplied photographs and the supplied SC monogram are used. The reference mockup is not embedded. The procedural dumbbell is a 611KB GLB with bevelled rubber heads and knurled metal geometry; a small procedural rubber texture and weight markings are added at render time. Static fallback was captured from the actual scene. `work/` contains the asset generation and QA scripts; it is not part of the static export.
