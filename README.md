# PromptBase | AI Prompt Sharing & Marketplace Platform

PromptBase is a modern AI prompt marketplace where users can discover, share, bookmark, and manage prompts for tools like ChatGPT, Midjourney, Claude, and Gemini.

## Project Purpose

The platform enables users to publish AI prompts, browse trending prompts, save favorites, submit reviews, and upgrade to Premium for exclusive private content. It includes user roles, dashboards, prompt moderation, and payment integration.

## Live URL

- Frontend: [Add your deployed frontend URL here]
- Backend: [Add your deployed backend URL here]

## Key Features

- User registration, login, and Google social authentication
- Role-based dashboard for User, Creator, and Admin
- Home page with search, featured prompts, trending tags, and animated sections
- Public prompt listing with search, filter, sort, and pagination support
- Prompt detail page with review system, bookmark, copy, and premium content lock
- Private/premium prompt access control with Stripe payment flow
- Add prompt page with category, AI tool, difficulty, and visibility settings
- Bookmark management and review submission
- Admin pages for users, prompts, payments, and reported content
- Stripe checkout session creation and server-side verification
- Environment configuration for API and database keys
- Framer Motion animations and modern responsive layout
- 404 and error pages for better route handling

## Tech Stack

- Frontend: Next.js 16.3, React 19, Tailwind CSS, Framer Motion, React Toastify
- Backend: Express.js, MongoDB, Mongoose, Stripe, better-auth
- Authentication: better-auth with email/password and Google login
- Database: MongoDB Atlas (configured via `MONGODB_URI`)

## Environment Variables

### Client

- `NEXT_PUBLIC_API_URL` — backend API base URL for client requests

### Server

- `MONGODB_URI` — MongoDB connection string
- `CLIENT_URL` — frontend origin for trusted auth and CORS
- `GOOGLE_CLIENT_ID` — Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` — Google OAuth client secret
- `STRIPE_SECRET_KEY` — Stripe secret key

## NPM Packages Used

- `react`, `react-dom`, `next`
- `better-auth`
- `framer-motion`
- `react-toastify`
- `lucide-react`
- `axios`
- `express`, `mongoose`, `mongodb`, `cors`, `dotenv`, `stripe`

## Deployment Notes

- Ensure the backend is running without CORS or 404 errors.
- Use `NEXT_PUBLIC_API_URL` in the frontend environment for production API routing.
- Confirm that `/payment/success` is available and that private routes do not break on refresh.
- Keep MongoDB, Google OAuth, and Stripe credentials in environment variables only.

## How to Run Locally

### Server

```bash
cd server
npm install
npm run dev
```

### Client

```bash
cd client
npm install
npm run dev
```

## Final Notes

This project is designed to be recruiter-friendly with a clean dashboard layout, responsive pages, and polished prompt marketplace interactions. Replace the live URL placeholders with your deployed Vercel/Render links before submission.
