// SHEET NAMES
const SHEET_FMS = "FMS";
const SHEET_DOER = "Doer_Name";
const SHEET_USER = "User";

function doGet() {
  return HtmlService.createHtmlOutputFromFile("Index")
    .setTitle("Help Ticket Dashboard")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// --- LOGIN FUNCTION ---
function doLogin(email, password) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_USER);
  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    let row = data[i];
    if (
      String(row[2]).trim().toLowerCase() ==
        String(email).trim().toLowerCase() &&
      String(row[1]).trim() == String(password).trim()
    ) {
      return {
        success: true,
        username: row[0],
        role: row[3] || "User",
      };
    }
  }
  return { success: false };
}

// --- DROPDOWN DATA ---
function getDropdownData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_DOER);
  const data = sheet.getDataRange().getValues();

  let raisedByList = [];
  let pcList = [];

  for (let i = 1; i < data.length; i++) {
    if (data[i][1]) raisedByList.push(data[i][1]);
    if (data[i][2]) pcList.push(data[i][2]);
  }

  return {
    raisedBy: [...new Set(raisedByList)],
    pc: [...new Set(pcList)],
  };
}

// --- SUBMIT NEW TICKET ---
function submitTicket(form) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_FMS);

  // Generate UID
  let nextId = "001";
  const lastRow = sheet.getLastRow();
  if (lastRow >= 5) {
    const lastUid = sheet.getRange(lastRow, 2).getValue();
    let num = parseInt(lastUid);
    if (!isNaN(num)) nextId = (num + 1).toString().padStart(3, "0");
  }

  const timestamp = new Date();

  sheet.appendRow([
    timestamp, // A
    nextId, // B
    form.raisedBy, // C
    form.pcAccountable, // D
    form.issue, // E
    form.problemSolver, // F
    "",
    "",
    "",
    "", // G, H, I, J (Follow Up)
    "",
    "",
    "",
    "", // K, L, M, N (Problem Solving)
  ]);

  return "Ticket Raised Successfully! UID: " + nextId;
}

// --- GET OPEN TICKET UIDS ---
function getOpenTicketUIDs() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_FMS);
  const lastRow = sheet.getLastRow();
  if (lastRow < 5) return [];

  const data = sheet.getRange(5, 2, lastRow - 4, 1).getValues();
  return data.flat().filter((uid) => uid !== "");
}

// --- SUBMIT FOLLOW UP (Columns G, H, I, J) ---
function submitFollowUp(form) {
  // Start Column G is index 7
  return updateDataInSheet(form, 7, "Follow-Up");
}

// --- SUBMIT PROBLEM SOLVING (Columns K, L, M, N) ---
function submitProblemSolving(form) {
  // Start Column K is index 11
  return updateDataInSheet(form, 11, "Problem Solving");
}

// --- HELPER FUNCTION TO UPDATE ROW ---
function updateDataInSheet(form, startCol, typeName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_FMS);
  const data = sheet.getDataRange().getValues();

  // Find Row by UID
  for (let i = 4; i < data.length; i++) {
    // Data starts at Row 5 (index 4)
    if (String(data[i][1]) == String(form.ticketUid)) {
      const rowNum = i + 1; // 1-based row index

      // Update basic 3 columns (Planned, Actual, Status)
      sheet.getRange(rowNum, startCol).setValue(form.planned); // Planned
      sheet.getRange(rowNum, startCol + 1).setValue(form.actual); // Actual
      sheet.getRange(rowNum, startCol + 2).setValue(form.status); // Status

      // Handle "Follow-Up" Delay (4th column in section)
      if (typeName === "Follow-Up" && form.delay) {
        sheet.getRange(rowNum, startCol + 3).setValue(form.delay);
      }

      // Handle "Problem Solving" Desired Date (4th column in section)
      // Problem Solving starts at 11 (K). 11+3 = 14 (N).
      if (typeName === "Problem Solving" && form.desiredDate) {
        sheet.getRange(rowNum, startCol + 3).setValue(form.desiredDate);
      }

      return typeName + " Updated for UID: " + form.ticketUid;
    }
  }
  return "Error: UID Not Found";
}

// --- VIEW DATA (ADMIN) ---
function getDashboardData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_FMS);
  return sheet.getDataRange().getDisplayValues();
}
