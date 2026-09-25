# FoodVision landing-page integration

## Request review flow

Landing-page submissions call the Vercel function at /api/request-access. The function validates the form and sends it to Google Apps Script. Apps Script appends a Pending row to the restricted Access Requests sheet. The business team reviews the row and records Approved or Denied, reviewer, and notes.

The Sheet is the team's manual review queue. It does not create a dashboard account.

## Connect the Google Sheet

1. Create a Google spreadsheet for FoodVision access requests. Give access only to the business reviewers.
2. Open Extensions > Apps Script and paste the contents of apps-script/Code.gs.
3. In Apps Script Project Settings > Script Properties, add:
   - FOODVISION_SHEET_ID: the spreadsheet ID from its URL.
   - FOODVISION_SCRIPT_TOKEN: a long random secret.
4. Deploy the Apps Script as a Web app, executing as the deploying account and allowing access to anyone. The secret token is checked before any row is written.
5. In the Vercel project settings, add:
   - GOOGLE_SCRIPT_URL: the deployed Apps Script URL ending in /exec.
   - GOOGLE_SCRIPT_TOKEN: the same random token.
6. Redeploy the landing page. Submit a real request and confirm a Pending row appears before telling applicants the form is live.

Never put either Google integration setting into VITE_ variables or browser code.

## Connect the Login button

Set the Vercel project environment variable VITE_DASHBOARD_URL to the public dashboard origin, for example https://foodvision-cambodia-internship.onrender.com. The desktop and mobile Log in links then open that dashboard's /login page. Set the value to the real deployed origin before deploying this landing-page change. If the Render service URL differs, use the actual URL.

## Approve a dashboard account

After the business team marks a request Approved, send the applicant the dashboard login URL and ask them to sign in with Google using the same email from the Sheet. Google creates a pending account with a verified email. The BI team then checks the matching email and company in the dashboard database, sets the user's company, and activates the account. The account stays blocked until that manual step. Denied requests are never activated.

The dashboard's production email/password verification is not configured yet. Google sign-in is the usable verified sign-in method until an email sender is configured. Refer to the dashboard project's README for the account activation SQL.

## Deployment

This ZIP contains source changes only. Import or copy the project into the teammate's Git repository, set the Vercel environment variables above, and deploy a preview first. Confirm the request arrives in Sheets and that Log in opens the dashboard before promoting the landing-page deployment.
