const HEADERS = [
  "Submitted At",
  "Full Name",
  "Work Email",
  "Company",
  "Interested Plan",
  "Business Need",
  "Status",
  "Reviewed By",
  "Review Notes",
];

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("FoodVision Business Approval")
    .addItem("Approve selected request", "approveSelectedRequest")
    .addItem("Deny selected request", "denySelectedRequest")
    .addToUi();
}

function approveSelectedRequest() {
  handleAccessDecision_("approved");
}

function denySelectedRequest() {
  handleAccessDecision_("denied");
}

function handleAccessDecision_(decision) {
  const ui = SpreadsheetApp.getUi();
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const row = sheet.getActiveRange().getRow();

  if (sheet.getName() !== "Access Requests" || row <= 1) {
    ui.alert("Select an applicant row in the Access Requests sheet.");
    return;
  }

  const values = sheet.getRange(row, 1, 1, HEADERS.length).getValues()[0];
  const request = {
    fullName: clean(values[1], 100),
    email: clean(values[2], 150).toLowerCase(),
    company: clean(values[3], 150),
    plan: clean(values[4], 30),
    businessNeed: clean(values[5], 1000),
    submittedAt: values[0] instanceof Date ? values[0].toISOString() : null,
    notes: clean(values[8], 1000),
  };

  if (!request.email) {
    ui.alert("The selected row does not contain a work email.");
    return;
  }

  const label = decision === "approved" ? "approve" : "deny";
  const confirmation = ui.alert(
    "Confirm access decision",
    "Do you want to " + label + " " + request.email + "?",
    ui.ButtonSet.YES_NO
  );
  if (confirmation !== ui.Button.YES) {
    return;
  }

  try {
    const reviewer = PropertiesService.getScriptProperties().getProperty("FOODVISION_REVIEWER_NAME") || "Business team";
    const result = sendAccessRequest_({
      email: request.email,
      status: decision,
      full_name: request.fullName,
      company: request.company,
      plan: request.plan,
      business_need: request.businessNeed,
      submitted_at: request.submittedAt,
      reviewed_by: reviewer,
      review_notes: request.notes,
    });

    sheet.getRange(row, 7).setValue(
      decision === "approved" ? "Approved" : "Denied"
    );
    sheet.getRange(row, 8).setValue(reviewer);

    if (decision === "approved") {
      let invitationSent = true;
      try {
        sendDashboardInvitation_(request);
      } catch (emailError) {
        invitationSent = false;
        console.error(emailError);
      }

      const accountMessage = result.account_activated
        ? "The existing dashboard account was activated."
        : "The approval was saved and will activate when this email signs in.";

      ui.alert(
        invitationSent
          ? accountMessage + " The dashboard invitation was emailed."
          : accountMessage + " The invitation email could not be sent; send the dashboard login link manually."
      );
      return;
    }

    ui.alert("Access was denied and the dashboard account is blocked.");
  } catch (error) {
    console.error(error);
    ui.alert("The decision could not be saved: " + error.message);
  }
}

function sendAccessRequest_(payload) {
  const properties = PropertiesService.getScriptProperties();
  const apiUrl = properties.getProperty("FOODVISION_BUSINESS_API_URL");
  const businessToken = properties.getProperty("FOODVISION_BUSINESS_TOKEN");

  if (!apiUrl || !businessToken) {
    throw new Error(
      "FOODVISION_BUSINESS_API_URL or FOODVISION_BUSINESS_TOKEN is not configured."
    );
  }

  const response = UrlFetchApp.fetch(apiUrl, {
    method: "post",
    contentType: "application/json",
    headers: {
      "X-FoodVision-Business-Token": businessToken,
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  });

  const statusCode = response.getResponseCode();
  let body = {};
  try {
    body = JSON.parse(response.getContentText() || "{}");
  } catch (error) {
    body = {};
  }

  if (statusCode < 200 || statusCode >= 300) {
    throw new Error(body.detail || "Dashboard returned status " + statusCode + ".");
  }

  return body;
}

function sendDashboardInvitation_(request) {
  const loginUrl = PropertiesService.getScriptProperties()
    .getProperty("FOODVISION_DASHBOARD_LOGIN_URL");

  if (!loginUrl) {
    throw new Error("FOODVISION_DASHBOARD_LOGIN_URL is not configured.");
  }

  const greeting = request.fullName ? "Hello " + request.fullName + "," : "Hello,";
  const subject = "Your FoodVision dashboard access is approved";
  const plainBody = [
    greeting,
    "",
    "Your FoodVision access request for " + (request.company || "your company") + " has been approved.",
    "Open the dashboard and choose Continue with Google:",
    loginUrl,
    "",
    "Use the same Google email address that was approved: " + request.email,
    "",
    "FoodVision Business Team",
  ].join("\n");

  const htmlBody =
    "<p>" + escapeHtml_(greeting) + "</p>" +
    "<p>Your FoodVision access request for <strong>" +
    escapeHtml_(request.company || "your company") +
    "</strong> has been approved.</p>" +
    '<p><a href="' + escapeHtml_(loginUrl) +
    '">Open the FoodVision dashboard</a> and choose <strong>Continue with Google</strong>.</p>' +
    "<p>Use the same Google email address that was approved: <strong>" +
    escapeHtml_(request.email) + "</strong></p>" +
    "<p>FoodVision Business Team</p>";

  MailApp.sendEmail({
    to: request.email,
    subject: subject,
    body: plainBody,
    htmlBody: htmlBody,
  });
}

function doPost(event) {
  try {
    const payload = JSON.parse(event && event.postData ? event.postData.contents || "{}" : "{}");
    const expectedToken = PropertiesService.getScriptProperties().getProperty("FOODVISION_SCRIPT_TOKEN");

    if (!expectedToken || payload.token !== expectedToken) {
      return jsonResponse({ success: false, message: "Unauthorized request." });
    }

    const fullName = clean(payload.fullName, 100);
    const email = clean(payload.email, 150).toLowerCase();
    const company = clean(payload.company, 150);
    const plan = clean(payload.plan, 30);
    const message = clean(payload.message, 1000);
    const allowedPlans = ["Starter", "Growth", "Business"];

    if (!fullName || !company || !email || !allowedPlans.includes(plan)) {
      return jsonResponse({ success: false, message: "Invalid request data." });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse({ success: false, message: "Invalid email address." });
    }

    const sheetId = PropertiesService.getScriptProperties().getProperty("FOODVISION_SHEET_ID");
    if (!sheetId) {
      throw new Error("FOODVISION_SHEET_ID is not configured.");
    }

    const spreadsheet = SpreadsheetApp.openById(sheetId);
    const sheet = spreadsheet.getSheetByName("Access Requests") || spreadsheet.insertSheet("Access Requests");
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
    }

    const submittedAt = new Date();
    sheet.appendRow([
      submittedAt,
      fullName,
      email,
      company,
      plan,
      message,
      "Pending",
      "",
      "",
    ]);

    try {
      sendAccessRequest_({
        email: email,
        status: "pending",
        full_name: fullName,
        company: company,
        plan: plan,
        business_need: message,
        submitted_at: submittedAt.toISOString(),
      });
    } catch (syncError) {
      // Keep the Sheet as the review queue if the dashboard is temporarily asleep.
      // Approving or denying the row will retry the dashboard sync.
      console.error(syncError);
    }

    return jsonResponse({ success: true });
  } catch (error) {
    console.error(error);
    return jsonResponse({ success: false, message: "Could not save the request." });
  }
}

function clean(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml_(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
