/**
 * WCC 2026 Registration Backend
 * Google Apps Script — Web App
 *
 * Required Script Properties:
 * BREVO_API_KEY
 * SENDER_EMAIL
 * ADMIN_PASSWORD
 *
 * Optional:
 * REPLY_TO_EMAIL
 * ADMIN_EMAIL
 */
const SPREADSHEET_ID = '1r1iTiHJ6SYfqYmSxOSlbX0FpMH4XuWgVJEQpYCVyEjc';
const REGISTRATION_SHEET_NAME = '';
const CHECKINS_SHEET_NAME = 'Checkins';
const EMAIL_LOG_SHEET_NAME = 'EmailLog';
const TIME_ZONE = 'Africa/Lagos';
const ADMIN_TOKEN_TTL_SECONDS = 21600;
const WCC_SESSIONS = [
  'Wednesday Evening', 'Thursday Morning', 'Thursday Evening',
  'Friday Morning', 'Friday Evening', 'Saturday Morning', 'Sunday Morning'
];
const REGISTRATION_HEADERS = [
  'registrationId',
  'checkInCode',
  'submittedAt',
  'name',
  'email',
  'phone',
  'attendedWccBefore',
  'expectations',
  'isTrueLighter',
  'isWorker',
  'unit',
  'church',
  'locationScope',
  'locationDetail',
  'needsAccommodation',
  'isPastor',
  'pastorChurch',
  'registrationKind',
  'childAge',
  'guardianName',
  'guardianEmail',
  'status',
  'checkedIn',
  'checkedInAt'
];
const CHECKIN_HEADERS = [
  'timestamp',
  'registrationId',
  'checkInCode',
  'name',
  'email',
  'phone',
  'checkedInBy'
];
const EMAIL_LOG_HEADERS = [
  'timestamp',
  'registrationId',
  'email',
  'status',
  'details'
];
/**
 * Handles form submissions and admin POST requests.
 */
function doPost(e) {
  if (
    !e ||
    !e.postData ||
    typeof e.postData.contents !== 'string' ||
    !e.postData.contents.trim()
  ) {
    return jsonOutput_({
      ok: false,
      error: 'This endpoint must be called through the deployed web app. Do not test doPost with the Run button.'
    });
  }
  try {
    const body = parseRequestBody_(e);
    const action = normalizeAction_(
      body.action || body.formType || body.type || 'register'
    );
    let result;
    if (
      action === 'register' ||
      action === 'registration' ||
      action === 'wcc-registration'
    ) {
      result = registerAttendee_(body);
    } else if (
      action === 'adminlogin' ||
      action === 'login' ||
      action === 'admin-login'
    ) {
      result = adminLogin_(body);
    } else if (
      action === 'checkin' ||
      action === 'check-in'
    ) {
      result = checkInAttendee_(body);
    } else if (
      action === 'listregistrations' ||
      action === 'list-registrations'
    ) {
      result = listRegistrations_(body);
    } else if (
      action === 'sendtestemail' ||
      action === 'send-test-email'
    ) {
      requireAdminPassword_(body);
      result = sendTestEmail_();
    } else {
      result = {
        ok: false,
        error: 'Unknown action: ' + action
      };
    }
    return jsonOutput_(result);
  } catch (error) {
    console.error(error && error.stack ? error.stack : error);
    return jsonOutput_({
      ok: false,
      status: error && error.wccUnauthorized ? 'unauthorized' : 'error',
      error: String(error && error.message ? error.message : error)
    });
  }
}
/**
 * Health check and JSONP registration verification.
 */
function doGet(e) {
  const params = (e && e.parameter) || {};
  const action = normalizeAction_(params.action || 'health');
  let result;
  try {
    if (
      action === 'verifyregistration' ||
      action === 'verify-registration'
    ) {
      result = verifyRegistration_(
        String(params.registrationId || '').trim()
      );
    } else if (action === 'health' || action === 'ping' || action === 'status') {
      result = {
        ok: true,
        service: 'WCC 2026 registration',
        duplicateProtection: true,
        timestamp: new Date().toISOString()
      };
    } else if (action === 'sessions') {
      result = { ok: true, sessions: WCC_SESSIONS };
    } else if (action === 'lookup' || action === 'history' || action === 'dashboard') {
      requireAdminToken_(params);
      if (action === 'lookup') result = lookupCheckinMembers_(params.q || '');
      if (action === 'history') result = checkinHistory_(params.registrationId || params.checkInCode || '');
      if (action === 'dashboard') result = checkinDashboard_();
    } else {
      result = {
        ok: false,
        error: 'Unknown GET action: ' + action
      };
    }
  } catch (error) {
    result = {
      ok: false,
      status: error && error.wccUnauthorized ? 'unauthorized' : 'error',
      error: String(error && error.message ? error.message : error)
    };
  }
  const callback = String(params.callback || '');
  // Only allow a simple JavaScript callback identifier.
  if (callback && /^[A-Za-z_$][0-9A-Za-z_$]*$/.test(callback)) {
    return ContentService
      .createTextOutput(callback + '(' + JSON.stringify(result) + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return jsonOutput_(result);
}
/**
 * Parses the JSON body sent by the React form.
 */
function parseRequestBody_(e) {
  if (
    !e ||
    !e.postData ||
    typeof e.postData.contents !== 'string' ||
    !e.postData.contents.trim()
  ) {
    throw new Error('Request body is empty.');
  }
  let parsed;
  try {
    parsed = JSON.parse(e.postData.contents);
  } catch (error) {
    throw new Error('Invalid JSON request body.');
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('Request must be a JSON object.');
  }
  return parsed;
}
function normalizeAction_(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[\s_]+/g, '')
    .replace(/[^a-z-]/g, '');
}
/**
 * Saves an adult or child registration.
 */
function registerAttendee_(body) {
  const registrationId = String(
    body.registrationId || body.checkInCode || ''
  ).trim();
  if (!registrationId) {
    throw new Error('Missing registrationId/checkInCode.');
  }
  const name = String(body.name || body.childName || '').trim();
  if (!name) {
    throw new Error('Attendee name is required.');
  }
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  let savedRecord;
  try {
    const sheet = getRegistrationSheet_();
    const headers = ensureHeaders_(sheet, REGISTRATION_HEADERS);
    const existing = findExistingAttendee_(sheet, headers, body);
    if (existing) {
      return {
        ok: true, found: true, duplicate: true, duplicateProtection: true,
        registrationId: String(existing.registrationId || '').trim(),
        checkInCode: String(existing.checkInCode || existing.registrationId || '').trim(),
        emailSent: null,
        message: 'You are already registered. Use your original check-in code.'
      };
    }
    // A random identifier collision must not return another attendee's code.
    if (findRegistrationRow_(sheet, headers, registrationId) ||
        (body.checkInCode && findRegistrationRow_(sheet, headers, String(body.checkInCode).trim()))) {
      throw new Error('This registration code is already in use. Please submit again to generate a new code.');
    }
    const record = {
      registrationId: registrationId,
      checkInCode: String(
        body.checkInCode || registrationId
      ).trim(),
      submittedAt: String(
        body.submittedAt || new Date().toISOString()
      ),
      name: name,
      email: String(
        body.email || body.guardianEmail || ''
      ).trim(),
      guardianEmail: String(
        body.guardianEmail || body.email || ''
      ).trim(),
      phone: String(body.phone || '').trim(),
      attendedWccBefore: String(body.attendedWccBefore || ''),
      expectations: String(body.expectations || ''),
      isTrueLighter: String(body.isTrueLighter || ''),
      isWorker: String(body.isWorker || ''),
      unit: String(body.unit || ''),
      church: String(body.church || ''),
      locationScope: String(body.locationScope || ''),
      locationDetail: String(body.locationDetail || ''),
      needsAccommodation: String(body.needsAccommodation || ''),
      isPastor: String(body.isPastor || ''),
      pastorChurch: String(body.pastorChurch || ''),
      registrationKind: String(body.registrationKind || 'adult'),
      childAge: String(body.childAge || ''),
      guardianName: String(body.guardianName || ''),
      status: 'Registered',
      checkedIn: 'No',
      checkedInAt: ''
    };
    const row = headers.map(function (header) {
      const value = Object.prototype.hasOwnProperty.call(record, header)
        ? record[header]
        : '';
      return safeCell_(value);
    });
    sheet.appendRow(row);
    SpreadsheetApp.flush();
    savedRecord = record;
  } finally {
    lock.releaseLock();
  }
  // Save the registration even if email delivery fails.
  let emailResult = {
    ok: false,
    skipped: true,
    message: 'No email address supplied.'
  };
  if (savedRecord.email) {
    try {
      emailResult = sendRegistrationEmail_(savedRecord);
    } catch (emailError) {
      emailResult = {
        ok: false,
        error: String(emailError.message || emailError)
      };
      console.error(
        'Registration saved but email failed: ' + emailResult.error
      );
    }
    logEmail_(
      savedRecord.registrationId,
      savedRecord.email,
      emailResult.ok ? 'sent' : 'failed',
      emailResult.error || emailResult.message || ''
    );
  }
  return {
    ok: true,
    found: true,
    registrationId: registrationId,
    checkInCode: savedRecord.checkInCode,
    duplicate: false,
    duplicateProtection: true,
    message: 'Registration saved.',
    emailSent: Boolean(emailResult.ok)
  };
}
/**
 * Confirms that a registration exists in the spreadsheet.
 */
function verifyRegistration_(registrationId) {
  if (!registrationId) {
    return {
      ok: false,
      found: false,
      error: 'Missing registrationId.'
    };
  }
  const sheet = getRegistrationSheet_();
  const headers = ensureHeaders_(sheet, REGISTRATION_HEADERS);
  const rowNumber = findRegistrationRow_(
    sheet,
    headers,
    registrationId
  );
  if (!rowNumber) {
    return {
      ok: true,
      found: false,
      registrationId: registrationId
    };
  }
  const record = readRecord_(sheet, headers, rowNumber);
  const email = String(
    record.email || record.guardianEmail || ''
  ).trim();
  let emailSent = null;
  let emailStatus = email ? 'pending' : 'not-provided';
  if (email) {
    const spreadsheet = getSpreadsheet_();
    const logSheet = spreadsheet.getSheetByName(
      EMAIL_LOG_SHEET_NAME
    );
    if (logSheet && logSheet.getLastRow() > 1) {
      const logHeaders = logSheet
        .getRange(1, 1, 1, logSheet.getLastColumn())
        .getDisplayValues()[0];
      const idIndex = logHeaders.indexOf('registrationId');
      const statusIndex = logHeaders.indexOf('status');
      if (idIndex >= 0 && statusIndex >= 0) {
        const logs = logSheet
          .getRange(
            2,
            1,
            logSheet.getLastRow() - 1,
            logHeaders.length
          )
          .getDisplayValues();
        for (let i = logs.length - 1; i >= 0; i--) {
          if (
            String(logs[i][idIndex]).trim() === registrationId
          ) {
            emailStatus = String(
              logs[i][statusIndex] || ''
            ).toLowerCase();
            emailSent = emailStatus === 'sent';
            break;
          }
        }
      }
    }
  }
  return {
    ok: true,
    found: true,
    registrationId: registrationId,
    emailSent: emailSent,
    emailStatus: emailStatus
  };
}
/**
 * Checks the admin password.
 */
function adminLogin_(body) {
  const expected = PropertiesService.getScriptProperties().getProperty('ADMIN_PASSWORD');
  if (!expected) {
    return { ok: false, authenticated: false,
      error: 'ADMIN_PASSWORD is not configured in Script Properties.' };
  }
  const supplied = String(body.password || body.adminPassword || '');
  if (supplied !== expected) {
    return { ok: false, authenticated: false, error: 'Incorrect password.' };
  }
  const token = Utilities.getUuid();
  CacheService.getScriptCache().put('wcc_admin_' + token, 'authorized', ADMIN_TOKEN_TTL_SECONDS);
  return { ok: true, authenticated: true, token: token,
    expiresInSeconds: ADMIN_TOKEN_TTL_SECONDS, message: 'Login successful.' };
}

/**
 * Checks an attendee in and records the check-in.
 */
function checkInAttendee_(body) {
  requireAdminPassword_(body);
  if (Object.prototype.hasOwnProperty.call(body, 'session')) {
    return checkInSession_(body);
  }
  const code = String(
    body.checkInCode || body.registrationId || body.code || ''
  ).trim();
  if (!code) {
    throw new Error('Enter a check-in code.');
  }
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const sheet = getRegistrationSheet_();
    const headers = ensureHeaders_(sheet, REGISTRATION_HEADERS);
    const rowNumber = findRegistrationRow_(
      sheet,
      headers,
      code
    );
    if (!rowNumber) {
      return {
        ok: false,
        found: false,
        error: 'No registration was found for that code.'
      };
    }
    const record = readRecord_(sheet, headers, rowNumber);
    if (String(record.checkedIn).toLowerCase() === 'yes') {
      return {
        ok: true,
        found: true,
        alreadyCheckedIn: true,
        attendee: record,
        message: 'This attendee has already checked in.'
      };
    }
    setCellByHeader_(
      sheet, headers, rowNumber, 'checkedIn', 'Yes'
    );
    setCellByHeader_(
      sheet,
      headers,
      rowNumber,
      'checkedInAt',
      new Date().toISOString()
    );
    setCellByHeader_(
      sheet, headers, rowNumber, 'status', 'Checked in'
    );
    const logSheet = getOrCreateSheet_(
      CHECKINS_SHEET_NAME,
      CHECKIN_HEADERS
    );
    logSheet.appendRow([
      new Date(),
      record.registrationId,
      record.checkInCode,
      record.name,
      record.email || record.guardianEmail || '',
      record.phone,
      'Admin'
    ]);
    SpreadsheetApp.flush();
    return {
      ok: true,
      found: true,
      alreadyCheckedIn: false,
      attendee: record,
      message: 'Check-in successful.'
    };
  } finally {
    lock.releaseLock();
  }
}
/**
 * Returns registrations to an authenticated admin.
 */
function listRegistrations_(body) {
  requireAdminPassword_(body);
  const sheet = getRegistrationSheet_();
  const headers = ensureHeaders_(sheet, REGISTRATION_HEADERS);
  if (sheet.getLastRow() < 2) {
    return {
      ok: true,
      registrations: []
    };
  }
  const values = sheet
    .getRange(
      2,
      1,
      sheet.getLastRow() - 1,
      headers.length
    )
    .getValues();
  const registrations = values.map(function (row) {
    const record = {};
    headers.forEach(function (header, index) {
      if (header) record[header] = row[index];
    });
    return record;
  }).reverse();
  return {
    ok: true,
    registrations: registrations
  };
}
/**
 * Sends the registration confirmation email through Brevo.
 */
function sendRegistrationEmail_(record) {
  const props = PropertiesService.getScriptProperties();
  const apiKey = props.getProperty('BREVO_API_KEY');
  const senderEmail = props.getProperty('SENDER_EMAIL');
  if (!apiKey || !senderEmail) {
    throw new Error(
      'Set BREVO_API_KEY and SENDER_EMAIL in Script Properties to enable registration emails.'
    );
  }
  if (!record.email) {
    throw new Error('No recipient email address was supplied.');
  }
  const safeReference = escapeHtml_(
    record.registrationId || record.checkInCode
  );
  const safeName = escapeHtml_(record.name);
  const safeCode = escapeHtml_(record.checkInCode);
  const subject = 'WCC 2026 — Registration confirmed';
  const html =
    '<div style="font-family:Arial,sans-serif;color:#431407;line-height:1.6">' +
      '<h2 style="color:#9a3412">WCC 2026 — Registration confirmed</h2>' +
      '<p>Hello ' + safeName + ',</p>' +
      '<p>Your registration for World Changers Convention 2026 has been recorded.</p>' +
      '<p>Your check-in code is:</p>' +
      '<p style="font-size:30px;font-weight:bold;letter-spacing:5px;color:#c2410c">' +
        safeCode +
      '</p>' +
      '<p>Please save this code and present it when you arrive.</p>' +
      '<p style="font-size:12px;color:#7c2d12">Registration reference: ' +
        safeReference +
      '</p>' +
      '<p><strong>Truelight Glory House</strong><br>' +
        'WCC 2026 — The Takeover Generation</p>' +
    '</div>';
  const payload = {
    sender: {
      name: 'WCC 2026 | Truelight Glory House',
      email: senderEmail
    },
    to: [{
      email: record.email,
      name: record.name
    }],
    subject: subject,
    htmlContent: html,
    textContent:
      'Hello ' + record.name +
      '. Your WCC 2026 registration is recorded. Check-in code: ' +
      record.checkInCode +
      '. Registration reference: ' +
      (record.registrationId || record.checkInCode) +
      '. Please save this code and present it when you arrive.'
  };
  const replyTo = props.getProperty('REPLY_TO_EMAIL');
  if (replyTo) {
    payload.replyTo = { email: replyTo };
  }
  const response = UrlFetchApp.fetch(
    'https://api.brevo.com/v3/smtp/email',
    {
      method: 'post',
      contentType: 'application/json',
      headers: {
        'api-key': apiKey,
        accept: 'application/json'
      },
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    }
  );
  const status = response.getResponseCode();
  const responseText = response.getContentText();
  if (status < 200 || status >= 300) {
    throw new Error(
      'Brevo returned HTTP ' + status + ': ' + responseText
    );
  }
  return {
    ok: true,
    message: 'Email sent.'
  };
}
/**
 * Sends a test email to ADMIN_EMAIL or SENDER_EMAIL.
 */
function sendTestEmail_() {
  const props = PropertiesService.getScriptProperties();
  const recipient =
    props.getProperty('ADMIN_EMAIL') ||
    props.getProperty('SENDER_EMAIL');
  if (!recipient) {
    throw new Error(
      'Set ADMIN_EMAIL or SENDER_EMAIL in Script Properties first.'
    );
  }
  const fakeRecord = {
    name: 'WCC Admin',
    email: recipient,
    registrationId: 'WCC-TEST',
    checkInCode: '123456'
  };
  const result = sendRegistrationEmail_(fakeRecord);
  return {
    ok: true,
    message: 'Test email sent to ' + recipient,
    details: result
  };
}
/**
 * Requires the configured admin password.
 */
function requireAdminPassword_(body) {
  if (body.token) {
    requireAdminToken_(body);
    return;
  }
  const expected = PropertiesService
    .getScriptProperties()
    .getProperty('ADMIN_PASSWORD');
  if (!expected) {
    throw new Error(
      'ADMIN_PASSWORD is not configured in Script Properties.'
    );
  }
  const supplied = String(
    body.password || body.adminPassword || ''
  );
  if (supplied !== expected) {
    throw new Error('Unauthorized.');
  }
}
/**
 * Opens the configured spreadsheet.
 */
function getSpreadsheet_() {
  return SpreadsheetApp.openById(SPREADSHEET_ID);
}
/**
 * Returns the registration sheet, creating it if necessary.
 */
function getRegistrationSheet_() {
  const spreadsheet = getSpreadsheet_();
  let sheet = REGISTRATION_SHEET_NAME
    ? spreadsheet.getSheetByName(REGISTRATION_SHEET_NAME)
    : spreadsheet.getSheets()[0];
  if (!sheet) {
    sheet = spreadsheet.insertSheet(
      REGISTRATION_SHEET_NAME || 'Registrations'
    );
  }
  ensureHeaders_(sheet, REGISTRATION_HEADERS);
  return sheet;
}
/**
 * Returns an existing logging sheet or creates it.
 */
function getOrCreateSheet_(name, headers) {
  const spreadsheet = getSpreadsheet_();
  let sheet = spreadsheet.getSheetByName(name);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(name);
  }
  ensureHeaders_(sheet, headers);
  return sheet;
}
/**
 * Adds missing column headers without deleting existing columns.
 */
function ensureHeaders_(sheet, requiredHeaders) {
  const lastColumn = sheet.getLastColumn();
  if (lastColumn === 0) {
    sheet.getRange(
      1, 1, 1, requiredHeaders.length
    ).setValues([requiredHeaders]);
    sheet.setFrozenRows(1);
    return requiredHeaders.slice();
  }
  const firstRow = sheet
    .getRange(1, 1, 1, lastColumn)
    .getDisplayValues()[0];
  const headers = firstRow.map(function (value) {
    return String(value || '').trim();
  });
  if (!headers.some(Boolean)) {
    sheet.getRange(
      1, 1, 1, requiredHeaders.length
    ).setValues([requiredHeaders]);
    sheet.setFrozenRows(1);
    return requiredHeaders.slice();
  }
  requiredHeaders.forEach(function (header) {
    if (headers.indexOf(header) === -1) {
      headers.push(header);
      sheet.getRange(1, headers.length).setValue(header);
    }
  });
  sheet.setFrozenRows(1);
  return headers;
}
/**
 * Finds a registration by registration ID or check-in code.
 */
function findRegistrationRow_(sheet, headers, registrationId) {
  const idIndex = headers.indexOf('registrationId');
  const codeIndex = headers.indexOf('checkInCode');
  if (
    (idIndex < 0 && codeIndex < 0) ||
    sheet.getLastRow() < 2
  ) {
    return 0;
  }
  const values = sheet
    .getRange(
      2,
      1,
      sheet.getLastRow() - 1,
      headers.length
    )
    .getDisplayValues();
  for (let i = 0; i < values.length; i++) {
    const matchesId =
      idIndex >= 0 &&
      String(values[i][idIndex]).trim() === registrationId;
    const matchesCode =
      codeIndex >= 0 &&
      String(values[i][codeIndex]).trim() === registrationId;
    if (matchesId || matchesCode) {
      return i + 2;
    }
  }
  return 0;
}
/**
 * Reads a spreadsheet row into an object.
 */
function readRecord_(sheet, headers, rowNumber) {
  const values = sheet
    .getRange(rowNumber, 1, 1, headers.length)
    .getValues()[0];
  const record = {};
  headers.forEach(function (header, index) {
    if (header) record[header] = values[index];
  });
  return record;
}
/**
 * Updates a cell using its column header.
 */
function setCellByHeader_(
  sheet,
  headers,
  rowNumber,
  header,
  value
) {
  const index = headers.indexOf(header);
  if (index >= 0) {
    sheet.getRange(rowNumber, index + 1).setValue(value);
  }
}
/**
 * Records email delivery results.
 */
function logEmail_(
  registrationId,
  email,
  status,
  details
) {
  try {
    const sheet = getOrCreateSheet_(
      EMAIL_LOG_SHEET_NAME,
      EMAIL_LOG_HEADERS
    );
    sheet.appendRow([
      new Date(),
      registrationId,
      email,
      status,
      details
    ]);
  } catch (error) {
    console.error('Could not write email log: ' + error);
  }
}
/**
 * Prevents user input from being interpreted as a spreadsheet formula.
 */
function safeCell_(value) {
  if (value === null || value === undefined) {
    return '';
  }
  const stringValue = String(value);
  return /^[=+@]/.test(stringValue)
    ? "'" + stringValue
    : stringValue;
}
/**
 * Escapes text inserted into HTML email content.
 */
function escapeHtml_(value) {
  return String(value || '').replace(/[&<>"']/g, function (character) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[character];
  });
}
/**
 * Returns a JSON response.
 */
function jsonOutput_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
/**
 * Run manually once to test spreadsheet access.
 */
function testSpreadsheetAccess() {
  const sheet = getRegistrationSheet_();
  Logger.log(
    'Spreadsheet connected. Registration tab: ' + sheet.getName()
  );
  Logger.log(
    'Current attendee rows: ' +
    Math.max(sheet.getLastRow() - 1, 0)
  );
}
/**
 * Run manually to test Brevo email delivery.
 */
function sendTestEmail() {
  const result = sendTestEmail_();
  Logger.log(JSON.stringify(result));
  return result;
}

/** Token authentication for the existing React check-in website. */
function requireAdminToken_(body) {
  const token = String(body.token || '');
  if (!token || CacheService.getScriptCache().get('wcc_admin_' + token) !== 'authorized') {
    const error = new Error('Admin login has expired. Please log in again.');
    error.wccUnauthorized = true;
    throw error;
  }
}

/** Read identifiers as displayed, preserving leading zeroes. */
function checkinRecords_(sheet) {
  if (!sheet || sheet.getLastRow() < 2) return [];
  const rows = sheet.getDataRange().getDisplayValues();
  const headers = rows.shift().map(function (header) { return String(header).trim(); });
  return rows.map(function (row) {
    const record = {};
    headers.forEach(function (header, index) { if (header) record[header] = row[index]; });
    return record;
  });
}

function checkinMember_(record) {
  return {
    registrationId: String(record.registrationId || '').trim(),
    checkInCode: String(record.checkInCode || '').trim(),
    name: String(record.name || '').trim()
  };
}

function lookupCheckinMembers_(query) {
  query = String(query || '').trim().toLowerCase();
  if (!query) return { ok: true, members: [] };
  const members = checkinRecords_(getRegistrationSheet_()).map(checkinMember_).filter(function (member) {
    return [member.registrationId, member.checkInCode, member.name].some(function (value) {
      return value.toLowerCase().indexOf(query) !== -1;
    });
  }).slice(0, 20);
  return { ok: true, members: members };
}

function sessionCheckinRecords_() {
  // Reading does not create or modify the existing check-in sheet.
  return checkinRecords_(getSpreadsheet_().getSheetByName(CHECKINS_SHEET_NAME));
}

function checkinHistory_(identifier) {
  identifier = String(identifier || '').trim();
  if (!identifier) return { ok: true, sessions: [] };
  const member = checkinRecords_(getRegistrationSheet_()).find(function (record) {
    return String(record.registrationId || '').trim() === identifier ||
      String(record.checkInCode || '').trim() === identifier;
  });
  if (!member) return { ok: true, sessions: [] };
  const sessions = sessionCheckinRecords_().filter(function (record) {
    return WCC_SESSIONS.indexOf(record.session) !== -1 && sameCheckinMember_(record, member);
  }).map(function (record) {
    return { session: record.session, timestamp: record.timestamp };
  });
  return { ok: true, member: checkinMember_(member), sessions: sessions };
}

function sameCheckinMember_(record, member) {
  const id = String(member.registrationId || '').trim();
  const code = String(member.checkInCode || '').trim();
  return Boolean((id && String(record.registrationId || '').trim() === id) ||
    (code && String(record.checkInCode || '').trim() === code));
}

function checkinDashboard_() {
  const sessions = {};
  WCC_SESSIONS.forEach(function (session) { sessions[session] = 0; });
  const records = sessionCheckinRecords_();
  const attendees = {};
  let totalCheckins = 0;
  records.forEach(function (record) {
    // Legacy entries have no session; keep them intact without inventing a session.
    if (WCC_SESSIONS.indexOf(record.session) === -1) return;
    sessions[record.session]++;
    totalCheckins++;
    const id = String(record.registrationId || record.checkInCode || '').trim();
    if (id) attendees[id] = true;
  });
  const registrations = checkinRecords_(getRegistrationSheet_()).filter(function (record) {
    return record.registrationId || record.checkInCode;
  });
  return { ok: true, totalRegistered: registrations.length,
    totalCheckins: totalCheckins, uniqueAttendees: Object.keys(attendees).length,
    sessions: sessions };
}

/** Session check-in compatibility; the original no-session path is preserved. */
function checkInSession_(body) {
  const session = String(body.session || '').trim();
  if (WCC_SESSIONS.indexOf(session) === -1) {
    return { ok: false, status: 'invalid', error: 'Invalid WCC check-in session.' };
  }
  const code = String(body.checkInCode || body.registrationId || body.code || '').trim();
  if (!code) return { ok: false, status: 'invalid', error: 'Enter a check-in code.' };
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const sheet = getRegistrationSheet_();
    const headers = ensureHeaders_(sheet, REGISTRATION_HEADERS);
    const rowNumber = findRegistrationRow_(sheet, headers, code);
    if (!rowNumber) return { ok: false, status: 'not_found', error: 'No registration was found for that code.' };
    const displayed = sheet.getRange(rowNumber, 1, 1, headers.length).getDisplayValues()[0];
    const record = {};
    headers.forEach(function (header, index) { if (header) record[header] = displayed[index]; });
    const member = checkinMember_(record);
    const previous = sessionCheckinRecords_().find(function (entry) {
      return entry.session === session && sameCheckinMember_(entry, member);
    });
    if (previous) return { ok: true, status: 'already_checked_in', member: member,
      session: session, timestamp: previous.timestamp };
    // Append only the missing session column; never rewrite existing columns or records.
    const logSheet = getOrCreateSheet_(CHECKINS_SHEET_NAME, CHECKIN_HEADERS.concat(['session']));
    const logHeaders = ensureHeaders_(logSheet, CHECKIN_HEADERS.concat(['session']));
    const timestamp = new Date();
    const entry = { timestamp: timestamp, registrationId: member.registrationId,
      checkInCode: member.checkInCode, name: member.name,
      email: record.email || record.guardianEmail || '', phone: record.phone || '',
      checkedInBy: 'Admin', session: session };
    const nextRow = logSheet.getLastRow() + 1;
    ['registrationId', 'checkInCode'].forEach(function (header) {
      const index = logHeaders.indexOf(header);
      if (index >= 0) logSheet.getRange(nextRow, index + 1).setNumberFormat('@');
    });
    logSheet.getRange(nextRow, 1, 1, logHeaders.length).setValues([
      logHeaders.map(function (header) {
        if (header === 'timestamp') return timestamp;
        return safeCell_(Object.prototype.hasOwnProperty.call(entry, header) ? entry[header] : '');
      })
    ]);
    setCellByHeader_(sheet, headers, rowNumber, 'checkedIn', 'Yes');
    setCellByHeader_(sheet, headers, rowNumber, 'checkedInAt', timestamp.toISOString());
    setCellByHeader_(sheet, headers, rowNumber, 'status', 'Checked in');
    SpreadsheetApp.flush();
    return { ok: true, status: 'checked_in', member: member, session: session,
      timestamp: timestamp.toISOString() };
  } finally {
    lock.releaseLock();
  }
}

/** Normalize contact details without merging different people sharing a contact. */
function normalizeAttendeeName_(value) {
  return String(value || '').normalize('NFKC').trim().replace(/\s+/g, ' ').toLowerCase();
}
function normalizeAttendeeEmail_(value) {
  return String(value || '').trim().toLowerCase();
}
function normalizeAttendeePhone_(value) {
  let digits = String(value || '').replace(/\D/g, '');
  if (digits.indexOf('00') === 0) digits = digits.slice(2);
  // Treat Nigerian local and international phone formats as the same number.
  if (/^0\d{10}$/.test(digits)) digits = '234' + digits.slice(1);
  return digits;
}
function sameAttendee_(record, body) {
  const kind = String(body.registrationKind || 'adult').trim().toLowerCase();
  const savedKind = String(record.registrationKind || 'adult').trim().toLowerCase();
  if (kind !== savedKind) return false;
  const name = normalizeAttendeeName_(body.name || body.childName);
  if (!name || normalizeAttendeeName_(record.name || record.childName) !== name) return false;
  const email = normalizeAttendeeEmail_(body.email || body.guardianEmail);
  const phone = normalizeAttendeePhone_(body.phone || body.guardianPhone);
  return Boolean((email && normalizeAttendeeEmail_(record.email || record.guardianEmail) === email) ||
    (phone && normalizeAttendeePhone_(record.phone || record.guardianPhone) === phone));
}
/** Called while the registration lock is held, before writing or sending email. */
function findExistingAttendee_(sheet, headers, body) {
  if (sheet.getLastRow() < 2) return null;
  const rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, headers.length).getDisplayValues();
  for (let i = 0; i < rows.length; i++) {
    const record = {};
    headers.forEach(function (header, index) { if (header) record[header] = rows[i][index]; });
    if ((record.registrationId || record.checkInCode) && sameAttendee_(record, body)) return record;
  }
  return null;
}
