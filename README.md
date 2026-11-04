# SignBuddy

SignBuddy is a small, local-first **assistive British Sign Language (BSL)
communication aid** built with Next.js.

It is designed to help someone who does not know BSL communicate a simple
message with someone who uses it. Enter an English word or phrase and the app
looks for a reviewed sign entry or an explicitly approved phrase sequence.
The dictionary also lets people look up individual signs they have seen used.

## What SignBuddy is not

SignBuddy is not a BSL course or teaching aid. It does not claim to teach
fluency, replace a BSL user's preferred communication method, or translate
English sentences by stringing unrelated individual signs together.

BSL has its own grammar and regional variation. Phrase sequences must be
reviewed by competent BSL users before they are made available as supported
communication content.

## Content status

The starter dictionary entries are placeholders. They are not verified BSL
content and contain no signing instructions or depictions. The approved phrase
library is intentionally empty until reviewed sequences and suitable visual
assets are available.

The app must clearly distinguish reviewed content from draft or placeholder
content. If no reviewed phrase match exists, it should say so rather than
guess.

## Current scope

- Local-first Next.js app; no account, backend or external AI service.
- English phrase lookup against a curated, reviewed phrase list.
- Individual sign dictionary with search and topic categories.
- Clear messaging when a phrase is not supported.
- Content review status visible to users.

## Run locally

Install dependencies with `npm install`, then run `npm run dev` and open
http://localhost:3000. Use `npm run build` to create a production build.
