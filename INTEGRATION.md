# FoodVision access workflow

## What happens

1. An applicant submits the Request Access form on the landing page.
2. The request appears as Pending in the private Access Requests Google Sheet.
3. A business team member checks the applicant's name, work email, and company.
4. The reviewer selects the row and uses FoodVision Business Approval > Approve selected request or Deny selected request.
5. Approval is saved in the dashboard system using the applicant's exact work email.
6. For an approved request, Google Apps Script emails the applicant a direct dashboard login link.
7. The applicant chooses Continue with Google and uses the same approved email.
8. FoodVision matches the verified Google email to the approval and opens the company dashboard.
9. If the applicant signed in before approval, the account stays pending. Approval activates that existing account, and the next sign-in opens the dashboard.

The business team does not need to open PostgreSQL or edit account records manually.

## Google Sheet setup

Open the Access Requests spreadsheet, then open Extensions > Apps Script and replace Code.gs with the repository file at apps-script/Code.gs.

In Apps Script Project Settings > Script Properties, keep the existing request-form settings:

- FOODVISION_SHEET_ID: the spreadsheet ID from its URL.
- FOODVISION_SCRIPT_TOKEN: the secret shared with the Vercel landing-page project.

Add these dashboard approval settings:

- FOODVISION_BUSINESS_API_URL: https://foodvision-cambodia-internship.onrender.com/api/business/access-request
- FOODVISION_BUSINESS_TOKEN: the same value as BUSINESS_APPROVAL_TOKEN in the Render dashboard service.
- FOODVISION_DASHBOARD_LOGIN_URL: https://foodvision-cambodia-internship.onrender.com/login

Save the script and reload the spreadsheet. A menu named FoodVision Business Approval will appear. The first approval asks the reviewer to authorize access to the Sheet, external dashboard request, and email sending.

If the Apps Script is not attached to the spreadsheet, open the spreadsheet first and create it from Extensions > Apps Script. A standalone script cannot add the approval menu to the Sheet.

## Render setup

The dashboard service needs the BUSINESS_APPROVAL_TOKEN environment variable. The value must be a long random secret and must exactly match FOODVISION_BUSINESS_TOKEN in Apps Script.

The dashboard creates the access_requests table automatically when it starts after deployment. Each row stores the applicant, company, plan, business need, review status, and the linked dashboard user ID.

## Landing-page setup

The landing page sends new requests to Apps Script through its Vercel function. Keep these Vercel environment variables:

- GOOGLE_SCRIPT_URL: the Apps Script web-app URL ending in /exec.
- GOOGLE_SCRIPT_TOKEN: the same value as FOODVISION_SCRIPT_TOKEN.
- VITE_DASHBOARD_URL: https://foodvision-cambodia-internship.onrender.com

The dashboard address opens /login directly, and the landing page Login links should use that same dashboard address.

## Business review steps

1. Open the Access Requests sheet.
2. Confirm the work email belongs to the company being reviewed.
3. Select any cell in the applicant's row.
4. Choose FoodVision Business Approval from the Sheet menu.
5. Choose Approve selected request or Deny selected request.
6. Confirm the decision.

Approval emails the direct login link. Denial blocks an existing account with that email and records the denied decision for future sign-ins.
