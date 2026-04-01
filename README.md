# Meetupz

A meetup management app built with React, React Router, Tailwind CSS, and Vite.

## Stack

- React 18
- React Router 6
- Tailwind CSS 3
- Vite 5

## Scripts

- `npm run dev`: Start the Vite development server.
- `npm run build`: Build production assets into `dist/`.
- `npm run preview`: Preview the production build locally.
- `npm test`: Print a placeholder message (no test framework configured).

## App Routes

- `/`: Meetups home/list screen
- `/meetups/add`: Create a meetup
- `/meetups/:id`: Meetup details
- `/meetups/edit/:id`: Edit a meetup
- `/about`: About page

## Notes

- Legacy Create React App service worker code has been removed.
- Route entry animations were removed to avoid flickering when navigating back to the home screen.

## Development

1. Install dependencies:
   - `npm install`
2. Start local development:
   - `npm run dev`
3. Open the local URL shown by Vite (usually `http://localhost:5173`).
