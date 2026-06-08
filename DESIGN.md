# TalkTrack Mobile App Design Brief

Use this document as the design prompt/spec for creating the TalkTrack mobile app UI in Google Stitch.

## Product Summary

TalkTrack is a personal AI agent that tracks the user's life through natural conversation.

The user should be able to talk to the AI like this:

- "Start tracking my anxiety."
- "Stop tracking my sleep."
- "Track my productivity."
- "How much time did I sleep on average this week?"
- "Did my productivity improve over the last 7 days?"
- "Show me a chart of my mood this month."
- "What patterns did you notice this week?"

The app turns normal conversation into structured personal data, charts, summaries, trends, tracker controls, and insights. It should remove the need for manual journaling, spreadsheets, rigid habit trackers, mood trackers, and separate analytics tools.

## Core Positioning

Design TalkTrack as:

- A personal AI agent for tracking your life.
- A conversational interface that becomes structured memory over time.
- A calm, intelligent personal analytics product.
- A tool for asking questions about your own history.
- A flexible tracking system where users control what is tracked through natural language.

Do not design it like:

- A generic chatbot.
- A childish habit tracker.
- A neon gamified fitness app.
- A spreadsheet dashboard.
- A therapy app with clinical or medical claims.
- A cluttered productivity app.

## Visual Direction

The current TalkTrack brand direction is light, airy, calm, premium, editorial, and modern.

Use:

- White and near-white app surfaces.
- Soft sky-inspired backgrounds.
- Dark, readable text.
- Subtle gray and blue-gray borders.
- Calm shadows.
- Rounded but refined corners.
- Dark iPhone hardware frame if showing the device shell.
- Light app screen inside the phone.
- Dark dynamic island / top hardware detail.

Accent palette:

- Primary blue: `#2498C7`
- Darker hover/accent blue: `#147BA6`
- Soft blue background: `#E7F6FB`
- Light blue border: `#B7E3F2`
- Main text: near-black such as `#071014` or `#101820`
- Muted text: `#101820` at 45-65 percent opacity
- App surface: `#F7FBFC`, white, or near-white
- Soft neutral borders: blue-gray / pale gray

Avoid:

- Green accents.
- Neon colors.
- Harsh black app screens.
- Heavy glowing effects.
- Loud gradients that fade into white for primary actions.
- Overly dark cards.
- Nested boxes inside boxes.

Primary buttons should use a strong blue-to-blue treatment, not a blue-to-white fade:

- `#2498C7` to `#147BA6`
- White button text.

## Typography

Use a clean modern sans-serif for the app UI, ideally Montserrat or a similar geometric sans-serif.

Text should feel calm and readable:

- Screen titles: medium or semibold, not overly bold.
- Body text: regular or medium.
- Metric labels: small uppercase or compact labels.
- Chat text: readable, conversational, not tiny.
- Avoid excessive bold text inside the app shell.

Large editorial serif typography belongs mostly to the landing page, not the app UI. The mobile app itself should feel like a polished product interface.

## App Navigation

The app has 4 bottom tabs:

1. Main
2. Logs
3. Tracking
4. Account

Bottom navigation requirements:

- Fixed at bottom.
- Rounded pill or soft floating tab bar.
- Light surface with subtle border.
- Active tab uses the blue accent.
- Inactive tabs use muted gray.
- Use simple, clear icons.
- Keep labels visible.
- Do not make the tab bar too tall.

## Overall App Structure

Design the app as a real native mobile product with these main screens:

- Main chat screen
- Logs screen
- Tracking screen
- Account screen

The app should feel complete, not like a single marketing mockup.

## Screen 1: Main Chat

Purpose:

Show that TalkTrack is a personal AI agent users can talk to naturally, and that it returns structured UI, not just text.

Required content:

User:

> Start tracking my anxiety.

AI:

> Got it. I will start tracking your anxiety level and look for patterns.

Structured block:

- Tracker active
- Anxiety Levels
- Small status indicator

Follow-up check-in:

AI:

> For today's check-in, where is your anxiety level right now?

Structured block:

- Interactive-looking anxiety slider
- Current value, for example `4 / 10`
- Labels such as Low and High

User:

> Did my productivity improve this week?

AI:

> Yes, your productivity score is up 12 percent vs last week.

Structured block:

- Compact 7-bar weekly productivity chart
- Bars at different heights
- Subtle dashed average/reference line
- Small stat badge: `+12%`

User:

> Show me my mood trend this month.

AI:

> Here is your mood trend for this month. It dipped mid-month, then recovered over the last week.

Structured block:

- Compact line chart
- 7-10 points
- Clear blue line
- Soft blue area fill

Design requirements:

- Chat history should feel scrollable.
- First visible screen should immediately show at least one structured chart/card.
- AI messages and user messages should be visually distinct.
- Avoid deep nesting like message bubble inside card inside card.
- If a chart belongs to an AI answer, put the text and chart in one unified AI response container.
- Use blue accents sparingly for data and active states.
- Use soft gray message bubbles on a light background.
- Input area at bottom: "Type or speak..."
- Include mic icon or plus icon if useful.
- Keep the content compact enough for a phone.

## Screen 2: Logs

Purpose:

Show that conversations become structured daily history.

Required content:

Screen title:

- Life Log

Subtitle:

- Review your daily patterns.

Calendar:

- Month view for June.
- For demo purposes, show June starting on Wednesday.
- Show a clean consecutive 7-day streak: 8, 9, 10, 11, 12, 13, 14.
- Highlight selected day.
- Label it as a 7-day streak.

Daily summary card:

- "Strong recovery day. Sleep and focus improved while anxiety stayed lower than last week."

Metric rows:

- Sleep: 8h
- Energy: 4/5
- Mood: 4/5
- Workout: Yes
- Focus: 7/10

Design requirements:

- Calendar should look like a real calendar grid.
- Weekday labels should be visible.
- Streak should feel consecutive and intentional.
- Summary card can have a soft blue tint.
- Metric rows should be clean and compact.
- Avoid crowded dashboard density.

## Screen 3: Tracking

Purpose:

Show that users control what TalkTrack follows, and that there is light gamification for consistency.

Required content:

Screen title:

- Tracking

Subtitle:

- Manage what TalkTrack follows.

Progress / badge area:

- Circular progress ring.
- Badge centered inside ring.
- Use a premium badge style, preferably platinum if available.
- Level text, for example `Level 12`.
- EXP text, for example `210 / 300 EXP`.

Do not include:

- "Progress & Achievements" heading inside the badge area.
- Extra inner circle behind the badge.
- Heavy card around the badge if it makes the section feel boxed in.
- "7-Day Streak" text inside the badge section.

Tracker list:

- Sleep
- Energy
- Mood
- Workout
- Focus
- Anxiety
- Productivity

Each tracker row should include:

- Simple icon.
- Tracker name.
- Toggle switch.
- Some toggles on, some off.

Design requirements:

- Badge/progress area should feel open and premium.
- Circular progress ring should be clearly visible.
- Active toggles use `#2498C7`.
- Inactive toggles use soft gray.
- Toggle knob should be properly aligned and not overly white/harsh.
- Avoid neon or childish gamification.

## Screen 4: Account

Purpose:

Make the app feel complete and trustworthy.

Required content:

Profile:

- Name: Alex Rivera
- Email: alex.rivera@example.com
- Simple user/profile icon.

Do not include:

- "Pro Member" label.
- Heavy filled avatar circle.
- Fake stock profile photo.

Settings list:

- Notification preferences
- Data & Privacy
- Connected apps
- Export data
- Help Center
- Contact us
- Delete account
- Log out

Design requirements:

- Clean and minimal.
- Simple list rows with chevrons.
- Use subtle dividers or card-like rows.
- Destructive actions can use a restrained red, but do not overemphasize.
- Keep the screen calm and trustworthy.

## Key Components

Design reusable component styles for:

- Chat bubble
- AI response container
- Structured insight block
- Line chart
- Bar chart
- Slider
- Tracker active confirmation
- Calendar cell
- Metric row
- Toggle switch
- Bottom tab item
- Settings row
- Progress ring
- Badge/progress block
- Input composer

All components should belong to the same light design system.

## Chart Style

Charts should feel compact, real, and readable.

Use:

- Blue line or bar fill: `#2498C7`
- Darker emphasis: `#147BA6`
- Soft fill: rgba or tint based on `#E7F6FB`
- Grid/reference lines in subtle gray-blue
- Rounded bar tops, not full pills
- More than 3 data points wherever possible

Avoid:

- Empty-looking charts.
- One-bar charts.
- Huge chart containers inside tiny phone UI.
- Chart cards nested inside message cards.

## Motion And Interaction

The design should imply that:

- Chat can scroll.
- Sliders can be dragged.
- Toggles can switch on/off.
- Tabs can change screens.
- Charts are generated as AI responses.

Motion should be subtle:

- Small scroll hint if needed.
- Soft chart reveal.
- Toggle transition.
- Button hover/tap states.
- No flashy effects.

Respect reduced motion in implementation.

## Information Hierarchy

The app should communicate this within 3 seconds:

1. You can talk to TalkTrack naturally.
2. It tracks what you ask it to track.
3. It turns conversations into charts and structured data.
4. You can review history over time.
5. You control what is being tracked.

## Design Constraints

Keep the UI:

- Light
- Calm
- Premium
- Native-feeling
- Trustworthy
- Data-capable
- Conversational
- Easy to scan

Avoid:

- Looking like a generic AI chat clone.
- Looking like a finance dashboard.
- Looking like a children's habit app.
- Too much blue.
- Too many boxes.
- Dense, tiny unreadable UI.
- Excessive shadows or glow.

## Suggested Stitch Prompt

Create a polished mobile app design for TalkTrack, a personal AI agent that tracks the user's life through conversation. The app should have a light, premium, airy interface with white and near-white surfaces, dark readable text, soft blue accents, subtle borders, and calm shadows. Use a modern sans-serif UI style similar to Montserrat.

Design four mobile screens with bottom tabs: Main, Logs, Tracking, and Account.

The Main screen is a conversational AI interface. It should show user messages such as "Start tracking my anxiety," "Did my productivity improve this week?", and "Show me my mood trend this month." AI responses should include structured UI blocks like a tracker active confirmation, an anxiety slider, a 7-bar productivity chart with an average reference line, and a mood trend line chart. Text and charts should appear as one unified AI response, not as nested boxes.

The Logs screen should show a Life Log with a real calendar grid, June starting on Wednesday for demo purposes, a clear 7-day streak on days 8 through 14, a selected day, a daily summary, and metric rows for sleep, energy, mood, workout, and focus.

The Tracking screen should show a premium circular progress ring with a badge, Level 12, 210 / 300 EXP, and an active trackers list with toggles for Sleep, Energy, Mood, Workout, Focus, Anxiety, and Productivity. Use blue for active states and soft gray for inactive states. The badge section should feel open and premium, not boxed in.

The Account screen should show a simple profile for Alex Rivera, alex.rivera@example.com, a minimal user icon, and settings rows for notification preferences, data privacy, connected apps, export data, help center, contact us, delete account, and log out. Do not include a Pro Member label.

Use the accent palette `#2498C7`, `#147BA6`, `#E7F6FB`, and `#B7E3F2`. Avoid green, neon effects, dark app screens, heavy shadows, and childish gamification. The result should feel like a real iOS app for calm personal tracking, AI memory, and personal analytics.

## Output Expectations

Stitch should produce:

- A complete mobile app UI direction.
- All four main tab screens.
- A cohesive component system.
- Light app screen with dark iPhone shell if device mockups are shown.
- Clear examples of conversation becoming structured personal data.
- Premium, calm, startup-quality visual design.
