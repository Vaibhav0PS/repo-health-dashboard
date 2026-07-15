# GitHub Repository Health Dashboard

A web-based dashboard utilizing the GitHub REST API to assess repository and organization hygiene. It evaluates open issues, pull request age, branch staleness, and contributor activity to compute a health score.

## Architecture

The project consists of three core components:
- [index.html](file:///C:/Users/Asus/Desktop/github-repo-dashboard/index.html): The main dashboard supporting single-repository and organization-wide scans, featuring GitHub OAuth with PKCE.
- [repo-health-dashboard.html](file:///C:/Users/Asus/Desktop/github-repo-dashboard/repo-health-dashboard.html): A simplified, minimalist layout for scanning single repositories without authentication.
- [api/github-oauth.js](file:///C:/Users/Asus/Desktop/github-repo-dashboard/api/github-oauth.js): A serverless function deployed to Vercel that handles authorization code exchange for access tokens.

## Configuration and Setup

### 1. GitHub OAuth App Setup
To enable authentication and raise API rate limits from 60 to 5,000 requests per hour:
- Create a GitHub OAuth App.
- Set the Authorization Callback URL to match your deployment or local server (e.g., `http://localhost:3000/`).
- Configure the application client ID in `OAUTH_CLIENT_ID` in [index.html](file:///C:/Users/Asus/Desktop/github-repo-dashboard/index.html).

### 2. Environment Variables
Configure the following environment variables on your hosting environment or local developer setup:
```env
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
```

### 3. Local Development
Run the local environment using Vercel CLI to support serverless functions:
```bash
npx vercel dev
```

## Deployment
Deploy the repository directory directly to Vercel. The serverless function under the `api/` directory is automatically mapped to `/api/github-oauth`.
