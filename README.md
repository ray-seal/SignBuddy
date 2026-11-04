# SignBuddy

SignBuddy is a small, local-first **assistive British Sign Language (BSL)
communication aid** built with Next.js.

It is designed to help someone who does not know BSL communicate a simple
message with someone who uses it. Enter an English word or phrase and the app
looks for a reviewed sign entry or an explicitly approved phrase sequence.
The dictionary also lets people look up individual signs they have seen used.

SignBuddy also includes a separate picture-symbol search powered by the
ARASAAC pictogram API. This provides visual communication support for
everyday needs, objects and feelings. Picture symbols are not BSL signs and
must not be presented as BSL translations.

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

## ARASAAC picture symbols

The `/symbols` page searches the ARASAAC English pictogram catalogue through a
small Next.js API route. Search results are cached for one hour and limited to
12 results. The API route filters entries marked as violent content.

ARASAAC pictograms are the property of the Government of Aragón and were
created by Sergio Palao for ARASAAC. They are distributed under the Creative
Commons Attribution-NonCommercial-ShareAlike 4.0 International licence
(CC BY-NC-SA 4.0). Keep the visible attribution in the app and check the
licence terms before any commercial use or redistribution.

- ARASAAC: https://arasaac.org/
- API documentation: https://beta.arasaac.org/developers/api
- Licence: https://creativecommons.org/licenses/by-nc-sa/4.0/

## Current scope

- Local-first Next.js app; no account, backend or external AI service.
- English phrase lookup against a curated, reviewed phrase list.
- Individual sign dictionary with search and topic categories.
- ARASAAC picture-symbol search for visual communication support.
- Clear messaging when a phrase is not supported.
- Content review status visible to users.

## Run locally

Install dependencies with `npm install`, then run `npm run dev` and open
http://localhost:3000. Use `npm run build` to create a production build.
