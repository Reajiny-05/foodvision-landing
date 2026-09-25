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

    sheet.appendRow([
      new Date(),
      fullName,
      email,
      company,
      plan,
      message,
      "Pending",
      "",
      "",
    ]);

    return jsonResponse({ success: true });
  } catch (error) {
    console.error(error);
    return jsonResponse({ success: false, message: "Could not save the request." });
  }
}

function clean(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
