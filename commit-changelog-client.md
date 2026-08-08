# Client Changelog Notes

This file tracks incremental client work for commit count requirements.

- Added note: API proxy rewrite in next.config.ts uses base URL normalization.
- Added note: auth client baseURL now trims /api and includes credentials.
- Added note: login and register Google OAuth callbackURL use frontend origin.
- Added note: client pages standardized API fetch base path to /api for proxied requests.
- Added note: pricing page route created and integrated into client app.
- Added note: dashboard page uses useSession hook for authenticated state.
- Added note: prompt detail page fetches prompt data through /api backend route.
- Added note: saved prompts and reviews use authenticated API routes.
- Added note: register page uses signUp.email and signIn.social correctly.
