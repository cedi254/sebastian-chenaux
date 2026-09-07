# Verification — 7 September 2026

- Production Next.js build: passed.
- TypeScript and ESLint: passed without errors or warnings.
- Enquiry validation tests: 3 passed.
- Production browser checks: 16 passed, no unhandled page errors.
- Viewports: 1440×960, 820×1180, 390×844, 320×740.
- Browser engines: installed Google Chrome and Playwright WebKit 26.6. Actual Safari and physical devices were not available on Windows.
- Covered goal selection, category switching and return to 3D, changing canvas output on scroll, reverse scroll progression, bounded canvas sizing, booking goal/package preservation, validation, truthful preview mode, focus trapping/Escape, mobile menu, verified location links, no horizontal overflow, reduced motion and WebGL fallback.
- Lighthouse mobile simulation on the compressed local production export: performance 94, accessibility 100, best practices 100, SEO 100. FCP 1.1s, LCP 2.9s, total blocking time 90ms, CLS 0.001. Scores are lab measurements, not a guarantee across devices or hosts.
- The feature-detected WebMCP entrypoint was not invoked in a supported native validation context; it is optional and does not affect ordinary UI use.
- Contact information and prices remain intentionally editable placeholders. No enquiries are sent or persisted in preview mode.
