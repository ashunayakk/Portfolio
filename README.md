# Portfolio

Personal portfolio site for Ashutosh Nayak — AI & ML Engineer, Business Analyst & Frappe Developer.

Live at: https://ashutoshnayakk.vercel.app

## Stack

- Single-page static site (`index.html`) with a light/dark theme picker (Azure, Clay, Olive, Dark) and an animated background
- `api/chat.js` — Vercel serverless function powering an AI chatbot that answers visitor questions about Ashutosh's resume, using Google's Gemini API (free tier)
- Vercel Web Analytics (`/_vercel/insights/script.js`)
- WhatsApp click-to-chat button and a mailto/phone contact block

## Environment variables

Set these in the Vercel project (Settings → Environment Variables), then redeploy:

| Variable | Purpose |
| --- | --- |
| `GEMINI_API_KEY` | Powers the resume chatbot at `/api/chat`. Get a free key at [aistudio.google.com/api-keys](https://aistudio.google.com/api-keys) — no billing required for the free tier. |

## Local development

This is a static site with one serverless function — there's no build step. Open `index.html` directly for the static content, or use `vercel dev` to run the `/api/chat` function locally.

## Assets

- `assets/docs/` — downloadable CV, certificates, and reference documents linked from the site
