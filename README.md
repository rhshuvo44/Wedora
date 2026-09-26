# Wedora — Digital Wedding Invitation

An elegant, vintage-lace wedding invitation website: a damask-patterned cover
with an oval frame and an **Open** button, followed by a scrollable card with a
sticky header, per-event family invites, a live countdown, a gallery with
lightbox, venue map, contact links, an RSVP form, a floating music control and a
fixed four-icon bottom navigation.

Built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS v4**,
**Framer Motion** and **Lucide React**. Mobile-first, no horizontal scroll, and
fully static.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (next/core-web-vitals + next/typescript) |
| `npm run typecheck` | `tsc --noEmit` |

---

## Customising: everything lives in one file

**`data/wedding.ts` is the only file you need to edit.** No names, dates, venues
or parent names are hardcoded in any component — including all UI copy, which
lives under `copy`.

```ts
export const weddingData = {
  groom:      { name: "Rajib", fullName: "Rajib Hossain", title: "Son of" },
  bride:      { name: "Tasnia", fullName: "Tasnia Akter", title: "Daughter of" },
  joiner:     "&",

  wedding: {
    dateShort: "Friday • 10.24.25",       // sticky header
    date:     "October 24, 2025",         // hero + save-the-date
    time:     "7:00 PM onwards",
    countdownDate: "2025-10-24T19:00:00", // ISO, local time
    countdownCompleteMessage: "…",
  },

  events: [ /* engagement, holud, wedding, reception … */ ],
  venue:  { name, address, mapUrl, directionsLabel },
  story:  { eyebrow, title, description, highlights[] },
  gallery:{ images: string[], caption },
  contact:{ phone, phoneHref, lines[] },
  rsvp:   { title, description, attendingOptions, maxGuests, … },
  music:  { enabled, src, label },
  nav:    { contact, music, location, rsvp },
  copy:   { /* every visible string */ },
};
```

### Adding or removing an event

Append or delete an entry in `weddingData.events`. Each one automatically gets
its own `EventSection` with the full **Bismillah + gratitude line + divider +
parents** block, its own details card and its own map link. No component edits.

### Countdown

`wedding.countdownDate` is an ISO string read in the viewer's local timezone.
Because the sample date is in the past, the countdown currently shows the
"the day has arrived" message — that is the intended zero state. Set a future
date while previewing to watch it tick.

### Music

`wedding.music.src` points at `public/music/wedding-placeholder.wav`, a generated
eight-second placeholder loop so the Song control works out of the box. Drop in
your own track and update the path (an `.mp3` is fine). Playback only ever
starts from the **Open** tap, never on page load.

### Photos

`public/images/gallery/image-1..6.jpg` and `public/images/couple/og-image.jpg`
are generated placeholders. Swap in real photos at the same paths, or point
`gallery.images` anywhere in `public/`.

### Regenerating the placeholder assets

```bash
node scripts/generate-audio-placeholder.mjs   # public/music/wedding-placeholder.wav
npm i -D sharp && node scripts/generate-placeholders.mjs   # gallery + OG image
```

---

## Project structure

```
app/
  layout.tsx            fonts, metadata, Open Graph, noscript fallback
  page.tsx              section order
  globals.css           design tokens + lace/dot utility classes
  robots.ts  sitemap.ts
components/wedding/
  InvitationProvider.tsx  opened state + audio (gesture-gated)
  InvitationShell.tsx     cover overlay vs. revealed card
  InvitationCover.tsx     damask ground, oval frame, Open button, anchor bar
  StickyHeader.tsx        names + short date on scroll
  HeroSection.tsx  CoupleSection.tsx  WeddingDate.tsx  Countdown.tsx
  StorySection.tsx  EventsSection.tsx  EventSection.tsx
  FamilyInviteBlock.tsx   Bismillah + parents, reused by every event
  CoupleCard.tsx  GallerySection.tsx  VenueSection.tsx
  ContactSection.tsx  RSVPSection.tsx  ClosingSection.tsx
  MusicButton.tsx  BottomNavBar.tsx
  Reveal.tsx  ScrollCue.tsx  SectionDivider.tsx
data/wedding.ts        ← all content
lib/cn.ts  lib/format.ts
public/
  patterns/lace-pattern.svg     tileable damask ground
  patterns/lace-divider.svg     horizontal lace trim (used as a mask)
  patterns/sparkle-dots.svg     ambient dot layer
  decorations/favicon.svg
  images/  music/  (placeholders)
scripts/               regenerate the placeholder assets
```

## Design system

| Token | Value | Use |
| --- | --- | --- |
| `--color-cream` / `cream-light` | `#efe6e2` / `#f7f1ee` | page ground, cards |
| `--color-blush` | `#e8dcd8` | soft bands, tinted panels |
| `--color-rose` / `rose-deep` | `#b79a96` / `#a1837f` | line art, secondary text |
| `--color-mauve` / `mauve-deep` | `#8a6d68` / `#7a5f5a` | solid bars, headings |
| `--color-ink` / `ink-soft` | `#2e2523` / `#5b4b47` | body text |

Fonts: **Great Vibes** (names), **Cormorant Garamond** (serif body),
**Inter** (UI/sans), **Amiri** (Arabic, RTL + isolated). All via `next/font`.

Utilities in `globals.css`:

- `.lace-divider` — full-bleed lace trim band. The SVG is white artwork applied
  as a **CSS mask**, so `--lace-ink` recolours it per tone
  (`--ink`, `--rose` modifiers).
- `.lace-frame` — double border (solid + dotted) used for content cards.
- `.dotted-rule` — fine dotted rule.
- `.sparkle-layer` — very light ambient dot layer for plain sections.
- `.script-name`, `.arabic`, `.tracking-luxe`, `.tracking-soft`.

All artwork under `public/patterns/` is original SVG drawn for this project —
nothing is traced or copied. The pattern tiles seamlessly at 240 × 240 (damask,
half-drop layout) and 132 × 26 (lace trim).

---

## Behaviour notes

- **Cover** — full-height, `dvh`, scrolls locked, damask ground with a radial
  wash so text never sits on the busy pattern. Double oval border (solid +
  dotted). Tap **Open** → the card scales up, the anchor bar drops away, and
  audio starts inside that same gesture.
- **Revealed card** — stays in the DOM as `inert` + transparent before opening,
  so it is crawlable and the page height never jumps.
- **No JavaScript** — a `<noscript>` rule hides the cover and the card renders
  plainly, so the invitation is still readable.
- **Sticky header** appears after 140 px, condensed names + `Friday • 10.24.25`.
- **Bottom nav** — Contact / Song / Location / RSVP. The first, third and
  fourth smooth-scroll to their sections (with a highlight on the section
  currently in view via `IntersectionObserver`); Song toggles playback. 44 px
  minimum touch targets, `env(safe-area-inset-bottom)` padding.
- **Countdown** — ticks every second, `tabular-nums` digits, swaps to a
  wedding-day message at zero, never negative. Renders `--` before hydration to
  avoid a server/client mismatch.
- **Gallery** — lazy `next/image` grid, 700 ms hover zoom on pointer devices,
  lightbox with backdrop click, arrow-key navigation, Escape to close, body
  scroll lock and focus moved to the close button.
- **RSVP** — name (validated), attendance, guest stepper (capped by
  `rsvp.maxGuests`, only shown when attending) and an optional note. The
  `submitRsvp` function in `RSVPSection.tsx` is the single integration point:
  swap its body for a `fetch("/api/rsvp", …)` when a backend exists.
- **Reduced motion** — `prefers-reduced-motion` is honoured in the cover
  transition, reveals, scroll cue, music bars and gallery.

## SEO & performance

Configurable `<title>`/description/Open Graph/Twitter cards, generated favicon,
`robots.txt` and `sitemap.xml`, semantic landmarks (`main`, `section`, `nav`,
`header`), `aria-hidden` on all decorative layers, `alt` text on every image,
visible focus rings, 44 px touch targets, `next/image` with `sizes` and lazy
loading, and a fully static prerender (161 kB first load).

## Verified

`tsc --noEmit` and ESLint are clean, `next build` prerenders statically, and a
headless pass at **320 / 375 / 390 / 414 / 768 / 1024 / 1440 px** plus a
reduced-motion run confirmed: no console errors, no failed requests, no
horizontal overflow, no clipped text, cover/lightbox/RSVP/countdown/nav
interactions working, no broken images, and no audio request before the Open
gesture.
