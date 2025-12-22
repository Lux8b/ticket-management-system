function createAdminUser() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_USER);

  // Safety check
  if (!sheet) {
    throw new Error("User sheet not found. Check sheet name.");
  }

  // Admin credentials
  const adminName = "System Admin";
  const adminEmail = "admin@test.com";
  const adminPassword = "admin123"; // plain text as per your login logic
  const adminRole = "Admin";

  // Prevent duplicate admin
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][2]).trim().toLowerCase() === adminEmail.toLowerCase()) {
      Logger.log("Admin already exists");
      return "Admin already exists";
    }
  }

  // Column order MUST match doLogin()
  sheet.appendRow([
    adminName, // Col A → Name
    adminPassword, // Col B → Password
    adminEmail, // Col C → Email
    adminRole, // Col D → User Type
  ]);

  return "Admin user created successfully";
}
