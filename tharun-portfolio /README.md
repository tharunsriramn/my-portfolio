# Tharun Sriram — Portfolio Website

Minimal, editorial-style personal portfolio. Black & white, smooth scroll animations, fully responsive.

## Pages
- `index.html` — Home (hero, featured projects, tools)
- `projects.html` — All 6 projects with detailed write-ups + UI mockups
- `about.html` — Bio, timeline, certifications
- `contact.html` — Contact channels + contact form

## Deploy to Vercel
1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → New Project → Import repo
3. Framework: **Other** (no build step needed)
4. Deploy — done

## Deploy to Netlify
1. Push to GitHub
2. Netlify → New site from Git → pick repo
3. Build command: (leave empty)
4. Publish directory: `.` (root)
5. Deploy

## Contact Form Setup
The contact form uses [Formspree](https://formspree.io) (free tier).
1. Sign up at formspree.io
2. Create a new form → get your Form ID
3. In `contact.html`, find this line:
   ```
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```
4. Replace `YOUR_FORM_ID` with your actual Formspree form ID

## Adding New Projects
In `projects.html`, copy an existing `<article class="project-detail">` block and update:
- The `id` attribute (used for deep linking)
- Project number (01, 02, etc.)
- Title, tag, stats, mockup, description, tech stack

## Fonts
- Display/headings: Instrument Serif (Google Fonts)
- Body: DM Sans (Google Fonts)

## Structure
```
tharun-portfolio/
├── index.html
├── projects.html
├── about.html
├── contact.html
├── vercel.json
├── netlify.toml
├── css/
│   └── style.css
└── js/
    └── main.js
```
