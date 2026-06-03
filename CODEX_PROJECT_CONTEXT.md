# TalkTrack Landing Page — Codex Project Context

## 1. Project Summary

TalkTrack is a voice-first life tracking and self-reflection app.
The core idea is simple: users speak with an AI for about 2 minutes a day. During the conversation, the AI asks follow-up questions to better understand the user’s day, emotions, actions, habits, goals, and personal patterns. After each check-in, the answers are automatically recorded in a structured daily format.
Users can look back at any specific day to see what happened, what they felt, what they worked on, what habits they followed, and what patterns appeared. Over time, TalkTrack becomes a personal AI agent that genuinely understands the user’s life history because it has access to their daily reflections and behavior patterns.
The app provides insights such as habits the user did not notice, repeated emotional patterns, lifestyle trends, progress toward goals, and areas that may need attention. Users can also view their life data through clear dashboards, charts, and visual statistics.
The experience is gamified with streaks, badges, progress systems, and rewards to help users stay consistent for a long period of time.
TalkTrack is designed for people who feel like life is passing without enough reflection or tracking. It is for people who want to improve themselves but do not want to spend a lot of time journaling, typing, or manually tracking everything. It gives users the benefits of journaling, self-reflection, habit tracking, and personal AI coaching through one simple daily speaking habit.

The landing page should communicate a premium, high-converting SaaS product: low-friction daily voice input, long-term life-pattern discovery, and meaningful personal progress surfaced by AI.

## 2. Tech Stack

- Frontend framework: React 19 with TypeScript.
- Frontend build tool: Vite.
- Backend: Node.js, Express, Mongoose, dotenv, and cors.
- Icons: `lucide-react` is installed in the frontend and should be preferred for small UI/action icons.
- Package manager: npm. The root package provides orchestration scripts; frontend and backend each have their own package files.
- Styling: Tailwind CSS 3 plus custom global CSS in `src/index.css`.
- PostCSS: Tailwind CSS and Autoprefixer.
- Font setup: self-hosted Montserrat via `@fontsource/montserrat`, imported in `src/main.tsx` for weights 500, 600, 700, 800, and 900.
- Animation: custom CSS keyframes and React/browser APIs. No external animation library is installed.
- Typewriter: custom `useTypewriter` hook in `src/hooks/useTypewriter.ts`. No external typewriter package is installed.
- Charting: custom SVG radar chart in `src/components/AnimatedRadarChart.tsx`. No external charting library is installed.
- Linting: ESLint flat config with `@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks`, and `eslint-plugin-react-refresh`.
- TypeScript config: project references via `tsconfig.json`, with app settings in `tsconfig.app.json` and Vite config settings in `tsconfig.node.json`.

## 3. File Structure

- Root `package.json`: orchestration scripts for frontend and backend.
- `frontend/package.json`: Vite frontend scripts and dependencies.
- `frontend/index.html`: Vite HTML entry, theme color, favicon link, SEO title/description.
- `frontend/src/main.tsx`: React root setup, Montserrat imports, global CSS import.
- `frontend/src/App.tsx`: route switch for `/` and `/waitlist`. The landing page renders the global background once, then `Navbar`, `Hero`, `Problems`, `SolutionSection`, `KeyFeaturesSection`, `FaqSection`, `FinalCTASection`, and `Footer`.
- `frontend/src/index.css`: Tailwind directives, global dark background, font smoothing, reusable grain overlay, reveal animations, reduced-motion handling.
- `frontend/src/components/GlobalBackground.tsx`: single full-page background layer for the landing page canvas and waitlist page.
- `frontend/src/components/Navbar.tsx`: sticky/fixed navbar with desktop links, CTA, and mobile dropdown.
- `frontend/src/components/Hero.tsx`: full-screen hero layout with headline, description, CTA, app availability note, and radar chart.
- `frontend/src/components/Problems.tsx`: `Problems You Have` section with five responsive problem cards.
- `frontend/src/components/SolutionSection.tsx`: `Solution` section with a clean product flow diagram.
- `frontend/src/components/KeyFeaturesSection.tsx`: `Key Features` section with three feature cards and a dominant center AI Advisor card.
- `frontend/public/assets/badges/iron/iron2.png`: badge asset copied from the existing `/Users/madiaraskarly/Code/rakaz/frontend/assets/badges/iron/iron2.png` source for the Gamification card progress visual.
- `frontend/src/components/FaqSection.tsx`: FAQ accordion section about writing, tracking, journaling differences, AI questions, missed days, privacy, and early access timing.
- `frontend/src/components/FinalCTASection.tsx`: centered final waitlist CTA with mint-highlighted `2 minutes`, social proof pill, and `GET EARLY ACCESS` button.
- `frontend/src/components/Footer.tsx`: minimal footer with TalkTrack brand, section links, utility links, and copyright line.
- `frontend/src/components/WaitlistPage.tsx`: `/waitlist` form screen that submits to the backend API.
- `frontend/src/components/TypewriterHeadline.tsx`: large hero headline with animated phrase.
- `frontend/src/components/AnimatedRadarChart.tsx`: custom animated SVG radar chart.
- `frontend/src/hooks/useTypewriter.ts`: reusable typewriter hook.
- `frontend/public/logo.png`: current logo/favicon asset referenced by `index.html`.
- `frontend/.env.example`: frontend API URL example with `VITE_API_URL=http://localhost:5001`.
- `frontend/tailwind.config.js`: Tailwind content paths, brand color aliases, Montserrat font family, blink animation.
- `frontend/vite.config.ts`, `frontend/postcss.config.js`, `frontend/eslint.config.js`, `frontend/tsconfig*.json`: frontend tooling config.
- `backend/src/server.js`: Express API entrypoint.
- `backend/src/config/db.js`: Mongoose connection helper.
- `backend/src/models/WaitlistEntry.js`: Mongoose waitlist model.
- `backend/src/controllers/waitlist.controller.js`: request validation, create entry, duplicate handling, count.
- `backend/src/routes/waitlist.routes.js`: `/api/waitlist` routes.
- `backend/src/middleware/errorHandler.js`: JSON 404/error handlers.
- `backend/.env.example`: backend environment template.
- `README.md`: project-specific setup, env, and API instructions.
- `frontend/dist/`: generated frontend build output. Treat as generated unless explicitly asked to inspect or modify.
- `frontend/node_modules/` and `backend/node_modules/`: installed dependencies. Do not edit.

## 4. Brand Direction

The current design direction is a dark premium SaaS landing page with a futuristic but human self-improvement/AI dashboard feeling. It uses one continuous near-black page canvas, subtle grain/noise, soft neon mint glow, bold Montserrat typography, oversized hero copy, and an animated radar chart to make the product feel analytical, personal, and alive.

Future changes should preserve the current high-contrast, premium dark visual language and avoid drifting into a generic template, overly playful style, or plain card-only layout.

## 5. Design Tokens

- Primary green: `#24ffae`, exposed as Tailwind `mint`.
- Light mint: `#afffe2`, exposed as Tailwind `mint-light`.
- White: `#ffffff`.
- Off-white/heading gradient stop: `#d4d4d4` is currently used in hero headline gradients; product direction also references `#eaea`.
- Dark background: root landing wrapper and `GlobalBackground` use `#0b0b0b`. Individual sections should not own hard background colors unless there is a deliberate framed/card surface.
- Ink token: Tailwind `ink` is `#171717`.
- Muted text: mostly Tailwind opacity utilities such as `text-white/75`, `text-white/80`, `text-white/45`.
- Borders: mostly `border-white/10`, `border-white/15`, and `rgba(255,255,255,0.24-0.3)` in SVG grid lines.
- Font: Montserrat via `font-sans`, with heavy weights for logo and hero (`font-black`, `font-extrabold`, `font-bold`).
- Spacing style: large responsive hero padding, `clamp()` font sizing, wide desktop max widths, and compact navbar spacing.
- Border radius: rounded pill navbar and buttons; hero CTA uses `rounded-[16px]`; mobile menu uses `rounded-3xl`.
- Shadows/glow: mint CTA glow with `rgba(36,255,174,...)`; floating navbar shadow uses a large dark drop shadow; radar main polygon uses a mint drop shadow.
- Background textures: `.grain-overlay` SVG fractal noise overlay is applied once inside `GlobalBackground`, not repeated inside each section.
- Page glows: `GlobalBackground` owns all large blurred mint/mint-light glows and soft radial gradients across the full landing page. Do not add section-level glow divs, radial backgrounds, or section pseudo-element glows that can be clipped at section boundaries.
- Gradients: mint-to-light-mint CTA gradient and white-to-gray headline text gradient.

## 6. Existing Components

- `Navbar` (`frontend/src/components/Navbar.tsx`): fixed header that starts as full-width top navigation and transforms after scroll into a centered floating rounded navbar. Includes logo, desktop anchor links, CTA, hamburger button, and mobile dropdown. The CTA routes to `/waitlist`.
- `GlobalBackground` (`frontend/src/components/GlobalBackground.tsx`): full-page background layer rendered once in `App` or `WaitlistPage`. It sits behind all content with `pointer-events: none`, global radial gradients, large blurred mint glows, and one noise overlay.
- `Hero` (`frontend/src/components/Hero.tsx`): full-screen hero section with transparent background over the global page canvas, plus left-side copy stack, CTA, app availability note, and right-side radar chart. The CTA routes to `/waitlist`.
- `TypewriterHeadline` (`frontend/src/components/TypewriterHeadline.tsx`): renders the large headline, `Talk for 2 min. See your ...`, with animated phrases: `life patterns`, `hidden habits`, `personal stats`, `real progress`.
- `useTypewriter` (`frontend/src/hooks/useTypewriter.ts`): custom hook that types, pauses, deletes, and cycles through words. It respects `prefers-reduced-motion` by showing the first phrase statically.
- `AnimatedRadarChart` (`frontend/src/components/AnimatedRadarChart.tsx`): custom SVG radar chart for Health, Money, Relationships, Freedom, and Faith. It has 3 animated value series: main, secondary, and tertiary.
- `Problems` (`frontend/src/components/Problems.tsx`): `Problems You Have` section rendered after the hero. It uses five concise problem cards about disappearing days, journaling friction, missed patterns, generic AI advice, and high-effort self-improvement. The section background is transparent over `GlobalBackground`; cards keep their own subtle translucent surfaces and internal hover accents.
- `SolutionSection` (`frontend/src/components/SolutionSection.tsx`): `Solution` section rendered after Problems with `id="solution"` for the navbar link. It explains the TalkTrack flow in a centered vertical sequence: Speak or write -> TalkTrack Engine -> What TalkTrack produces. It uses transparent section background, restrained glass cards, simple centered down arrows, integrated output rows with thin dividers, and subtle one-time reveal transitions.
- `KeyFeaturesSection` (`frontend/src/components/KeyFeaturesSection.tsx`): `Key Features` section rendered after Solution with `id="features"` for the navbar link. It uses exactly three main cards: Life Dashboard/Personal Stats on the left, AI Advisor as a larger center card, and Gamification on the right. On mobile, AI Advisor appears first and remains visually emphasized.
- `FaqSection` (`frontend/src/components/FaqSection.tsx`): FAQ accordion rendered after Key Features with `id="faq"`. It uses a centered header, max-width accordion rows, one-open-at-a-time local state, smooth grid-row open/close animation, plus/minus text controls, and a top navbar link.
- `FinalCTASection` (`frontend/src/components/FinalCTASection.tsx`): final bottom CTA rendered after FAQ. The CTA button routes to `/waitlist`. The section uses a centered vertical stack: label, large heading, waitlist social proof pill, and mint gradient CTA button.
- `Footer` (`frontend/src/components/Footer.tsx`): minimal footer rendered after the final CTA. It includes TalkTrack branding, one-line description, section links for Problems/Solution/Key Features/FAQ, placeholder utility links, and copyright.
- `WaitlistPage` (`frontend/src/components/WaitlistPage.tsx`): `/waitlist` screen with name, contact, honest price, optional suggestions, loading/error/success states, and POST submission to `${VITE_API_URL}/api/waitlist`.

## 7. Responsive Design Guidelines

- Large desktop: hero uses a two-column layout at `xl`, with copy on the left and the radar chart on the right inside a max-width layout up to `1700px`.
- Laptop: maintain strong hero hierarchy, readable line lengths, and enough spacing between copy and chart.
- Tablet: layout stacks vertically before `xl`; ensure the radar chart remains readable and does not crowd the CTA.
- Mobile: navbar uses hamburger dropdown; hero stacks with large but clamped typography and full-width CTA up to `500px`.
- Current responsive issue/TODO: Privacy and Terms are placeholder footer links until dedicated pages or sections exist.
- Current responsive risk: the very large headline uses `tracking-[-0.025em]`; future edits should verify that long phrases do not overflow narrow mobile screens.

## 8. Recent Implementation Notes

- Added `src/components/Problems.tsx` and rendered it in `src/App.tsx` directly after `Hero`.
- The `Problems You Have` section uses short, emotionally direct landing-page copy and five cards. It keeps TalkTrack's dark background, neon mint accent, Montserrat-heavy typography, subtle borders, grain texture, and responsive layout.
- Updated the hero paragraph in `src/components/Hero.tsx` to use TalkTrack as the product name.
- Tightened the navbar logo into a compact stacked brand mark, slightly reduced hero/nav text and CTA sizing, enlarged the radar chart container to about `760px`, and made the third radar series more visibly animated while keeping it subtle.
- Refactored the page background into `GlobalBackground`. Removed section-level grain/glow/fade backgrounds from `Hero` and `Problems`, removed section-level `overflow-hidden` that clipped glows, and made sections transparent over one continuous global canvas. Future sections should reuse this architecture and avoid section-owned background glows.
- Added one-time Problems card reveal animation using IntersectionObserver. Cards keep DOM/layout order but reveal in custom sequence `2 -> 1 -> 3 -> 4 -> 5` via delay mapping `[1, 0, 2, 3, 4]`; reduced-motion users see cards immediately.
- Added global CSS smooth scrolling with `scroll-margin-top: 110px` for section/id targets so navbar anchor navigation accounts for the fixed/floating navbar.
- Removed the separate `Our Solution` direction and the unused `How It Works` navbar link. Added `SolutionSection` as the single replacement section. The navbar now uses `Solution -> #solution` and `Key Features -> #features`.
- Refactored `SolutionSection` from a wide horizontal flow into a centered vertical top-to-bottom flow. The header is centered, the section max-width is controlled, arrows are simple white down arrows, and the Engine card remains the emphasized middle step.
- Refined `SolutionSection` to stop at the core output step only: Speak or write -> TalkTrack Engine -> What TalkTrack produces. Removed AI Advisor and gamification from this section because they belong in the future Key Features section, and replaced nested output mini-cards with integrated rows divided by thin lines.
- Added `KeyFeaturesSection` after Solution. It uses a three-card responsive layout with desktop grid columns `0.9fr 1.2fr 0.9fr`: Life Dashboard/Personal Stats on the left, a larger AI Advisor center card, and Gamification on the right. Mobile stacks the cards with AI Advisor first. The section uses only transparent/global background architecture and subtle one-time reveal animation.
- Added `FaqSection` after Key Features. It is a premium dark accordion with seven TalkTrack-specific questions, one open answer at a time, smooth open/close transitions, staggered reveal on section entry, and no navbar changes.
- Added `FinalCTASection` and `Footer` after FAQ. The final CTA highlights `2 minutes` in mint, shows the waitlist social proof pill, and uses a bold uppercase CTA button. The footer stays lightweight with brand copy, smooth-scroll section links, placeholder legal links, and no section-specific glow backgrounds.
- Split the project into `frontend/` and `backend/`. The frontend is the existing Vite app plus a `/waitlist` screen; all waitlist CTAs route to `/waitlist`. The backend is an Express/Mongoose API with `POST /api/waitlist` and `GET /api/waitlist/count`.
- Added `lucide-react` to the frontend and began using it for restrained UI affordances: CTA arrows, FAQ plus/minus controls, Solution flow arrows/output checks, Key Features card markers, Footer link affordances, and Waitlist action/status icons.
- Refined the Key Features card visuals: AI Advisor now uses a compact two-message chat preview, and Gamification now uses a centered `iron2.png` badge with an SVG circular EXP progress ring showing `210 / 300 EXP`.
