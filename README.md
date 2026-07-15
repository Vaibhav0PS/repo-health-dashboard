# Repo Health Dashboard

A static GitHub REST API dashboard with one Vercel serverless function for the GitHub OAuth code exchange.

## Local setup

1. Create a GitHub OAuth app.
2. Put the OAuth app's client ID into `OAUTH_CLIENT_ID` in `index.html`.
3. Set these environment variables for the serverless function:

```bash
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
```

For Vercel, add those values in Project Settings -> Environment Variables.
For local OAuth testing, run with Vercel's dev server so `/api/github-oauth` exists:

```bash
npx vercel dev
```

## GitHub OAuth app settings

- Application name: anything, for example `Repo Health Dashboard`.
- Homepage URL: your site origin, for example `http://localhost:3000` or `https://your-app.vercel.app`.
- Authorization callback URL: the exact static page URL, for example `http://localhost:3000/` locally or `https://your-app.vercel.app/` in production.
- Scope: use `public_repo` for public repository and public organization data. Use `repo` only if you need private repo/org access.

The client secret only belongs in the serverless function environment. Do not put it in `index.html`.
The app also uses OAuth `state` plus PKCE (`S256`) during sign-in.

## Deploy

Deploy the folder to Vercel. Vercel will serve `index.html` as the static app and `api/github-oauth.js` as `/api/github-oauth`.

## Notes

Org mode scans repos in batches of four and caps branch commit checks per repo to keep request volume reasonable. Authenticated users get GitHub's normal 5,000 request/hour REST API budget; anonymous users are limited to 60/hour.
