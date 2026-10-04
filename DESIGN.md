---
name: Korea, ahead.
description: Bold headlines and readable, dated evidence for the Neenah Korea talk.
colors:
  ink: "#152632"
  paper: "#f7f5ef"
  red: "#b8312d"
  muted: "#52606a"
  rule: "#d4d7d3"
typography:
  display:
    fontFamily: "Bricolage Grotesque, sans-serif"
    fontSize: "clamp(3.2rem, 6.2vw, 6rem)"
    fontWeight: 700
    lineHeight: 0.99
    letterSpacing: "-.035em"
  page-title:
    fontFamily: "Bricolage Grotesque, sans-serif"
    fontSize: "clamp(2.8rem, 5.6vw, 4rem)"
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: "-.035em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  reading-body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Manrope, sans-serif"
    fontSize: ".88rem"
    fontWeight: 700
  disclosure:
    fontFamily: "Manrope, sans-serif"
    fontSize: "1.08rem"
    fontWeight: 700
spacing:
  gap-small: "20px"
  gap-standard: "24px"
  gap-wide: "32px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    padding: "9px 18px"
  button-primary-hover:
    backgroundColor: "{colors.red}"
    textColor: "{colors.paper}"
  disclosure:
    textColor: "{colors.ink}"
    typography: "{typography.disclosure}"
    padding: "20px 32px 20px 0"
  navigation:
    textColor: "{colors.ink}"
    padding: "12px 0"
  text-link:
    textColor: "{colors.ink}"
  fact-row:
    textColor: "{colors.ink}"
    padding: "20px 0"
---

# Design System: Korea, ahead.

## Overview

**Creative North Star: "Bold headline, readable evidence"**

The implemented system pairs large, tightly spaced headlines with a light paper surface, dark ink, one red accent, and documentary photographs. Compact navigation and ruled content rows support reading. The user’s exact headline, “When you follow Korea, you're ahead of the world”, is a durable identity commitment.

**Key Characteristics:**

- Bold, sentence-case headlines.
- Flat surfaces and fine dividers.
- Documentary images with visible captions.
- Native disclosures for deeper preparation.
- Dated sources next to the claims they support.

Recorded from the completed October 4, 2026 implementation. Visual sources are `css/site.css` (shared tokens and controls), `css/home.css` (home), and `css/pages.css` (five supporting pages). Current HTML sources are `index.html`, `size.html`, `memorial.html`, `southkorea.html`, `pyongyang.html`, and `bio.html`. The final reviewer returned **Ship**, with no material findings across these six pages and twelve desktop/mobile screenshots. Captures and measured styles are local review evidence in `.impeccable/review/`; publication is tracked separately.

## Colors

The frontmatter preserves the CSS palette. Red provides selective emphasis against warm paper and dark blue-black ink.

### Primary

- **Red:** the word “Korea” in the home headline, hover states, selection backgrounds, disclosure signs, and focus outlines.

### Neutral

- **Ink:** body text, headlines, brand, and primary action background.
- **Paper:** page background and primary action text, including its hover state.
- **Muted:** source lines, captions, event metadata, and secondary navigation context.
- **Rule:** section, row, header, footer, and disclosure dividers.

## Typography

Self-hosted Bricolage Grotesque supplies bold display type. Self-hosted Manrope supplies regular and bold reading type. Fonts and their licenses remain in `fonts/`; both families fall back to sans-serif.

The home headline uses explicit block spans. At widths up to 1100px its size becomes 6.4vw; up to 760px it uses `clamp(2.7rem, 8.3vw, 3.9rem)`, line height 1.05, and tracking -.03em. Its first phrase stays on one line. Up to 360px its size becomes 8.2vw. Large screens at 1480px and above cap it at 6rem.

Supporting titles balance lines within 18ch; at widths up to 700px they use `clamp(2.5rem, 10vw, 3.6rem)`. Supporting section headings use `clamp(1.7rem, 3.2vw, 2.5rem)` with line height 1.14. Body text remains distinct from smaller source and caption text. Supporting leads are limited to 65ch, ordinary section paragraphs to 74ch, and disclosure text to 76ch.

## Layout

The shared content width is `min(1248px, calc(100% - 80px))`. At widths up to 760px the side gutters become 20px. The header is a compact horizontal brand/navigation row; its minimum height changes from 85px to 72px at that breakpoint.

The home opening is a text/photo grid (1.65fr / 1fr, 54px gap), followed by a dated evidence strip and three ruled argument rows. Seoul and Pyongyang receive equal photo space, stacked beside the headline with an 18px gap. Their city and country captions remain visible and link to their supporting pages. The opening narrows its gap to 32px at 1100px and stacks at 760px. The mobile photographs appear side by side with a 14px gap and 16:10 crops. Argument rows use equal columns with a 70px gap, reduce the gap to 40px at 1100px, and stack at 760px.

Supporting pages use readable text sections, image pairs, facts, and disclosures. At 700px, feature splits, paired stories, biography columns, photo pairs, and three-image comparisons stack. The two-column construction gallery remains two columns, with a smaller gap. Tables retain their columns in a horizontal overflow wrapper. Geography comparison images keep their full aspect ratio; ordinary gallery photographs use 4:3 crops. The biography uses a 3:4 portrait, limited to 280px wide on mobile.

The expanded Pyongyang page uses visible Russia, 20×10 and consumer-life sections, with direct section links. These links jump immediately on this longer reading page. Four ruled fact rows explain Russia's benefits. Three regional-development milestones appear in columns and stack at 700px. A lazy-loaded Reuters video uses a responsive 16:9 frame, capped at 880px, with a direct viewing link. Original student videos remain external links with creator, upload date and language labels.

The 20×10 section adds a square chart of ten annual 20-location cohorts, a province comparison with two labeled bar segments, and three documentary photographs. Completed, construction and future-target cohorts use filled, red outline and dashed outline squares with explicit text labels. Cohorts wrap into two rows at 1000px. The province chart changes from two reading columns to one at that width; photographs stack at 700px and preserve their natural proportions and full KCTV montages. Native HTML labels expose chart data without a chart library or JavaScript. Photo links open the original images.

Print rules hide navigation, use 11pt body text and 32pt page titles, and request visible disclosure content. Print behavior is CSS-defined; the recorded review covered screen layouts.

## Elevation & Depth

There are no shadows or raised surfaces. Fine one-pixel rules, spacing, photographs, and typographic hierarchy distinguish sections. No decorative gradients are part of the current system.

## Shapes

Controls and image frames have square corners. The primary action is a compact rectangular link. Maps are contained rather than cropped. Photographs use deliberate crops where the layout requires them; original image files remain available.

## Components

- **Primary action:** dark ink with paper text; hover changes the background to red and preserves paper text. Its minimum height is 46px. The action scrolls to the argument section.
- **Navigation and text links:** native anchors, visible hover treatment, and inline SVG arrows where present. The active navigation link uses `aria-current` and an underline.
- **Evidence disclosures:** native `details` / `summary`, fine rules, and red plus/minus signs. Deeper preparation opens without JavaScript. Open summaries reduce bottom padding; body content remains in the reading measure unless it contains a wide image group.
- **Fact rows and tables:** bold display values with explanatory text and source links. Tables use tabular numerals, left alignment, and horizontal dividers.
- **Documentary image groups:** `picture` selects optimized WebP display copies with original-format fallbacks. Captions, useful alt text, and lazy loading of deeper images remain part of each group.
- **Keyboard access:** skip links become visible on focus. Anchors, buttons, and summaries use a three-pixel red focus outline with five-pixel offset.

Motion is limited to smooth anchor scrolling and a 3px horizontal arrow movement over .2s with `cubic-bezier(.2,.8,.2,1)`. These behaviors apply only when the visitor has not requested reduced motion. The current six pages require no JavaScript for reading or navigation; `js/main.js` belongs to retained earlier preparation.

## Do's and Don'ts

### Do:

- Preserve the exact headline and its red “Korea” emphasis.
- Keep both Seoul and Pyongyang in the home opening, with visible city and country labels.
- Reuse the shared styles and native HTML controls across current pages.
- Keep source dates, qualifications, and image captions visible beside the relevant evidence.
- Preserve existing page addresses, original images, and the dated preparation in `archive/2026-10-04/`.
- Check actual computed type, focus, hover, and mobile wrapping when extending the system.

### Don't:

- Replace documentary images with invented evidence.
- Present construction photographs as proof of household welfare or undated rankings as current facts.
- Delete deeper preparation to shorten the current pages.
- Add carousels, hidden headlines, decorative shadows, or JavaScript-dependent reading controls.
- Publish private Desktop research files with the public website.
