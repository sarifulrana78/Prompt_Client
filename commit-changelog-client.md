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
- Added note: login page shows toast on auth errors and handles unexpected failures.
- Added note: API_BASE normalization now covers search, dashboard, prompt, and saved routes.
- Added note: fetchOptions.credentials set to include for cookie-based auth across cross-site requests.
- Added note: client uses NEXT_PUBLIC_API_URL for backend proxy configuration.
- Added note: next.config.ts rewrites /api/* to backend API base for local development.
- Added note: route pages were updated for consistent client-side API usage.
- Added note: social login flow references Google provider in auth client documentation.
- Added note: add prompt page uses /api endpoint for prompt creation.
- Added note: admin users page fetches user list from backend via /api/users.
