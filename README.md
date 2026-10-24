# NUEF - interactive frontend portfolio demo

NUEF is an archived music-label / creative-agency landing-page concept. This version is a **static frontend demonstration** of the original HTML, SCSS, JavaScript, artwork and GSAP ScrollTrigger effects. It is not an active music-label, contact or application service.

## Running the site

The archive includes the compiled CSS, so no dependencies are needed for a preview:

```powershell
npm run dev
```

Open http://localhost:5173. The `dev` command runs the included Node.js static server (Node 20+ recommended).

```powershell
npm run check
```

To edit SCSS and recompile CSS, install the Sass developer dependency first:

```powershell
npm install
npm run build:css
# or: npm run watch:css
```

`assets/scss/main.scss` produces `assets/css/style.css`; `assets/scss/layout/_demo.scss` produces `assets/css/demo.css`. The compiled CSS is committed for dependency-free previews. The GSAP scripts and web fonts load from public CDNs and require an internet connection; without GSAP, a static fallback is provided.

## Latest fixes

### Header composition

The original header text and singer are positioned using nested responsive transforms. The previous optimization left too much empty space above the first title on some desktop viewports. The initial offsets in `assets/scss/layout/_header.scss` were reduced: header title starts higher, "MAKING/BRANDS" begins closer to its intended position, "FAMOUS" starts nearer its reveal point, and the singer begins higher. The header's original ScrollTrigger choreography remains intact.

### Slower GSAP pacing and restored smooth wheel scrolling

The original NUEF used the [SmoothScroll 1.4.10](https://cdnjs.cloudflare.com/ajax/libs/smoothscroll/1.4.10/SmoothScroll.min.js) browser script to ease mouse-wheel/trackpad input. An earlier demo optimization removed it, so only anchor-link jumps were smooth. This version restores the **same original library and configuration** on desktop/pointer-fine devices. It automatically uses native scrolling on touch-oriented devices, for reduced-motion users, or if the CDN does not load. The GSAP ScrollTrigger animations are still synchronized to actual page scroll positions.

In addition, the pinned GSAP sections are approximately 24% longer than the previous version at a 900px desktop viewport, giving the animations a more deliberate pace without rebuilding any timelines:

| Section | Desktop >= 600px | Mobile < 600px |
|---|---:|---:|
| Header | 1.45 viewport heights | 1.15 viewport heights |
| Disc | 1.70 | 1.50 |
| Phone | 1.90 | 1.65 |
| Studio | 2.70 | 2.30 |

At 900px desktop height this is about **6,975px** total pinned scroll (previous version: 5,625px). Each section also has a minimum scroll length of 480px. Tune only the ratios in `_scrollDistance()` in `assets/js/script.js` if you'd prefer yet slower or shorter sequences. GSAP `ease: "none"` and `scrub: 0.8` remain in place.

The `SmoothScroll` script is loaded from the same public CDN used by the original project; it therefore requires internet access. Smooth wheel behavior is not available offline, but the site still scrolls normally. Avoid installing a second smooth-scroll library or enabling another scroll hijacker at the same time.

### PHP and forms: fully removed

The old PHP mailer, disabled contact/application form, file upload UI, form event handlers, form SCSS/CSS, and the now-unused form icons are absent. No email, identity, personal data, or attachments are collected or submitted. Buttons navigate to the final animated NUEF concept section instead. The final CTA returns to the beginning.

Since the concept's contacts section is **inside a pinned GSAP scene**, `#contact` navigation calculates the end of the studio ScrollTrigger. This avoids jumping to the untransformed position of content that is not yet visible. It falls back to normal scrolling when GSAP is unavailable.

## Deployment and security

Deploy `index.html`, `assets/`, and optionally `tools/` and docs to any static site host. No server API or environment variables are needed. No PHP runtime is required.

**Important:** An *earlier* original archive contained an embedded SMTP credential in `data.php`. Revoke/rotate it if it has not already been revoked and inspect all Git refs/history before making the old repository public. Removing a file from the current working tree does **not** purge old commits. If overlaying this package over an older project, delete the obsolete `data.php`, `assets/includes/`, `assets/scss/layout/_registrationForm.scss`, `assets/css/stylePrev.css`, and any old package lock tied to `node-sass`. Start with a clean folder if possible, since extracting an archive doesn't delete removed files.

## Verification

- Passed: JavaScript syntax validation (`node --check`), `npm run check`, source/asset references, static navigation IDs, no form or PHP submission code, CSS parsing, and modified asset presence.
- Not completed: fresh `npm install` / Sass recompilation (npm registry DNS unavailable), real GSAP browser playback, visual checks across desktop/tablet/mobile. An attempted headless Chromium local screenshot timed out in this environment.

Before deployment, manually check the header at 1440x900, the entire scroll sequence, `#contact` navigation, and mobile widths 320, 375, 430, and 768px. See `RELEASE-CHECKLIST.md`.
