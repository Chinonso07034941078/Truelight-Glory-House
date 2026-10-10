/******************************************************
 * WCC 2026 — REGISTRATION + LIVE CHECK-IN API
 *
 * IMPORTANT:
 * - Existing registration POST behavior is preserved.
 * - Registration data remains in the existing sheet.
 * - Check-ins are stored in a separate "Checkins" sheet.
 * - Registration IDs / check-in codes are forced to TEXT.
 * - Check-in/dashboard/lookup require admin login.
 * - Registration submission remains public so the
 *   existing registration frontend keeps working.
 * - Registration confirmation emails are queued on
 *   registration and sent through Brevo by a time-driven
 *   trigger (see EMAIL AUTOMATION section at the bottom).
 ******************************************************/


const SPREADSHEET_ID =
  "1r1iTiHJ6SYfqYmSxOSlbX0FpMH4XuWgVJEQpYCVyEjc";


const SHEET_NAME = "";


/*
 * Admin password requested for the WCC check-in app.
 *
 * The frontend should NEVER contain this password.
 * Login is checked here in Apps Script.
 */
const ADMIN_PASSWORD = "Truelightcc223";


/*
 * Existing registration columns.
 * Keep these exactly as they are because the
 * registration frontend already uses these fields.
 */
const HEADERS = [
  "registrationId",
  "checkInCode",
  "submittedAt",
  "name",
  "email",
  "phone",
  "attendedWccBefore",
  "expectations",
  "isTrueLighter",
  "isWorker",
  "unit",
  "church",
  "locationScope",
  "needsAccommodation",
  "isPastor",
  "pastorChurch",
];


const CHECKINS_SHEET_NAME = "Checkins";


const CHECKIN_HEADERS = [
  "registrationId",
  "checkInCode",
  "name",
  "session",
  "timestamp",
];


const SESSIONS = [
  "Wednesday Evening",
  "Thursday Morning",
  "Thursday Evening",
  "Friday Morning",
  "Friday Evening",
  "Saturday Morning",
  "Sunday Morning",
];


/******************************************************
 * EMAIL AUTOMATION (BREVO)
 *
 * - Three new columns are added at the END of the
 *   registration sheet:
 *     emailStatus, sentAt, brevoMessageId
 * - Registration only marks a row "Queued". It never
 *   waits on Brevo, so a Brevo outage cannot block
 *   registration.
 * - processEmailQueue() runs on a 5-minute trigger and
 *   sends queued emails within a daily quota.
 * - Newest rows (live registrations) are processed first
 *   so they win the daily budget over the backlog.
 *
 * Requires these Script Properties:
 *   BREVO_API_KEY  = your Brevo API key
 *   SENDER_EMAIL   = Info.truelight9@gmail.com
 *                  (must be verified in Brevo under
 *                   Settings -> Senders & IP -> Senders)
 ******************************************************/

const EMAIL_HEADERS = [
  "emailStatus",
  "sentAt",
  "brevoMessageId",
];


/*
 * Brevo free plan allows 300 transactional emails/day.
 * 250 leaves a buffer for new registrations.
 */
const EMAIL_DAILY_ALLOWANCE = 250;




/******************************************************
 * GET
 ******************************************************/


function doGet(e) {
  try {
    const params = e && e.parameter ? e.parameter : {};
    const action = params.action || "status";


    if (action === "status") {
      return jsonResponse({
        ok: true,
        service: "wcc-registration-checkin",
        message: "WCC registration and check-in endpoint is running.",
      });
    }


    /*
     * Public endpoint used by the existing frontend to
     * confirm the service is alive.
     */
    if (action === "sessions") {
      return jsonResponse({
        ok: true,
        sessions: SESSIONS,
      });
    }


    /*
     * Everything below this point is protected.
     */
    if (!isValidToken(params.token)) {
      return unauthorizedResponse();
    }


    if (action === "lookup") {
      return jsonResponse(
        lookupMembers(params.q || "")
      );
    }


    if (action === "history") {
      return jsonResponse(
        getMemberHistory(
          params.registrationId ||
          params.checkInCode ||
          ""
        )
      );
    }


    if (action === "dashboard") {
      return jsonResponse(
        getDashboard()
      );
    }


    return jsonResponse({
      ok: false,
      error: "Unknown action.",
    });


  } catch (error) {
    console.error(error);


    return jsonResponse({
      ok: false,
      error: error.message || String(error),
    });
  }
}




/******************************************************
 * POST
 ******************************************************/


function doPost(e) {
  const lock = LockService.getScriptLock();
  let lockAcquired = false;


  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("No request payload was received.");
    }


    const payload =
      JSON.parse(e.postData.contents);


    /*
     * Support the login action names used by both the
     * current and earlier WCC frontend builds.
     *
     * Some builds send:
     *   action: "login"
     * Others may send:
     *   action: "adminLogin"
     *   action: "authenticate"
     *
     * A password-only request is also treated as a login
     * request when no action is supplied.
     */
    const rawAction =
      payload.action === undefined ||
      payload.action === null
        ? ""
        : String(payload.action).trim();


    const normalizedAction =
      rawAction.toLowerCase();


    const isLoginRequest =
      normalizedAction === "login" ||
      normalizedAction === "adminlogin" ||
      normalizedAction === "authenticate" ||
      normalizedAction === "admin_login" ||
      (
        !rawAction &&
        payload.password !== undefined
      );


    const action =
      isLoginRequest
        ? "login"
        : (rawAction || "registration");




    /**************************************************
     * ADMIN LOGIN
     **************************************************/


    if (action === "login") {
      return jsonResponse(
        adminLogin(
          payload.password || ""
        )
      );
    }




    /**************************************************
     * EXISTING PUBLIC REGISTRATION
     *
     * DO NOT REQUIRE ADMIN AUTH HERE.
     * This keeps the registration frontend working.
     **************************************************/


    if (action === "registration") {


      lock.waitLock(30000);
      lockAcquired = true;


      const sheet =
        getRegistrationSheet();


      ensureHeaders(sheet);


      /*
       * IMPORTANT:
       * Registration IDs and check-in codes are written
       * as TEXT so Google Sheets does not turn:
       *
       * 00123 -> 123
       *
       * or otherwise alter the identifier.
       */
      prepareTextColumns(sheet);


      const row = HEADERS.map(
        function(header) {
          return normalizeCell(
            payload[header]
          );
        }
      );


      const nextRow =
        sheet.getLastRow() + 1;


      sheet
        .getRange(
          nextRow,
          1,
          1,
          HEADERS.length
        )
        .setNumberFormat("@")
        .setValues([row]);


      /*
       * Live email automation:
       * The row is only queued. A time-driven trigger
       * sends it through Brevo separately, so the
       * registration response never depends on email.
       */
      ensureEmailHeaders(sheet);


      const hasEmail =
        normalizeCell(payload.email).trim() &&
        normalizeCell(
          payload.checkInCode ||
          payload.registrationId ||
          ""
        ).trim();


      sheet
        .getRange(
          nextRow,
          HEADERS.length + 1
        )
        .setValue(
          hasEmail ? "Queued" : "No email"
        );


      return jsonResponse({
        ok: true,
        sheet: sheet.getName(),
        registrationId:
          normalizeCell(payload.registrationId),
        checkInCode:
          normalizeCell(
            payload.checkInCode ||
            payload.registrationId ||
            ""
          ),
      });
    }




    /**************************************************
     * CHECK-IN
     **************************************************/


    if (action === "checkin") {


      if (!isValidToken(payload.token)) {
        return unauthorizedResponse();
      }


      lock.waitLock(30000);
      lockAcquired = true;


      return jsonResponse(
        processCheckIn(payload)
      );
    }




    return jsonResponse({
      ok: false,
      error: "Unknown POST action.",
    });


  } catch (error) {


    console.error(error);


    return jsonResponse({
      ok: false,
      error: error.message || String(error),
    });


  } finally {


    if (lockAcquired) {
      lock.releaseLock();
    }
  }
}




/******************************************************
 * ADMIN LOGIN
 *
 * Returns a temporary token.
 *
 * The password itself is never returned to the client.
 ******************************************************/


function adminLogin(password) {


  if (
    String(password || "") !==
    ADMIN_PASSWORD
  ) {
    return {
      ok: false,
      authenticated: false,
      error: "Incorrect admin password.",
    };
  }


  /*
   * Create a random temporary token.
   * CacheService keeps it server-side.
   *
   * Token expires after 6 hours.
   */
  const token =
    Utilities.getUuid();


  CacheService
    .getScriptCache()
    .put(
      "admin_" + token,
      "authorized",
      21600
    );


  return {
    ok: true,
    authenticated: true,
    token: token,
    expiresInSeconds: 21600,
  };
}




/******************************************************
 * TOKEN VALIDATION
 ******************************************************/


function isValidToken(token) {


  if (!token) {
    return false;
  }


  const value =
    CacheService
      .getScriptCache()
      .get(
        "admin_" + String(token)
      );


  return value === "authorized";
}




/******************************************************
 * REGISTRATION SHEET
 ******************************************************/


function getRegistrationSheet() {


  const spreadsheet =
    SpreadsheetApp.openById(
      SPREADSHEET_ID
    );


  const sheets =
    spreadsheet.getSheets();


  if (!sheets.length) {
    throw new Error(
      "This spreadsheet does not contain a worksheet tab."
    );
  }


  if (SHEET_NAME.trim()) {


    const namedSheet =
      spreadsheet.getSheetByName(
        SHEET_NAME.trim()
      );


    if (!namedSheet) {
      throw new Error(
        'Worksheet tab "' +
        SHEET_NAME +
        '" was not found.'
      );
    }


    return namedSheet;
  }


  return sheets[0];
}




/******************************************************
 * CHECKINS SHEET
 ******************************************************/


function getCheckinsSheet() {


  const spreadsheet =
    SpreadsheetApp.openById(
      SPREADSHEET_ID
    );


  let sheet =
    spreadsheet.getSheetByName(
      CHECKINS_SHEET_NAME
    );


    if (!sheet) {


    sheet =
      spreadsheet.insertSheet(
        CHECKINS_SHEET_NAME
      );


    sheet
      .getRange(
        1,
        1,
        1,
        CHECKIN_HEADERS.length
      )
      .setNumberFormat("@")
      .setValues([
        CHECKIN_HEADERS
      ]);


    sheet.setFrozenRows(1);

  } else {


    ensureCheckinHeaders(sheet);
  }


  /*
   * Keep identifiers as text.
   */
  sheet
    .getRange(
      1,
      1,
      Math.max(sheet.getMaxRows(), 1),
      2
    )
    .setNumberFormat("@");


  return sheet;
}




/******************************************************
 * ENSURE CHECK-IN HEADERS
 ******************************************************/


function ensureCheckinHeaders(sheet) {


  const existing =
    sheet
      .getRange(
        1,
        1,
        1,
        CHECKIN_HEADERS.length
      )
      .getDisplayValues()[0]
      .map(
        function(value) {
          return String(value).trim();
        }
      );


  const matches =
    CHECKIN_HEADERS.every(
      function(header, index) {
        return existing[index] === header;
      }
    );


  if (!matches) {
    sheet
      .getRange(
        1,
        1,
        1,
        CHECKIN_HEADERS.length
      )
      .setNumberFormat("@")
      .setValues([
        CHECKIN_HEADERS
      ]);
  }
}




/******************************************************
 * ENSURE REGISTRATION HEADERS
 ******************************************************/


function ensureHeaders(sheet) {


  const existingHeaders =
    sheet
      .getRange(
        1,
        1,
        1,
        HEADERS.length
      )
      .getDisplayValues()[0]
      .map(
        function(value) {
          return String(value).trim();
        }
      );


  const headersMatch =
    HEADERS.every(
      function(header, index) {
        return existingHeaders[index] === header;
      }
    );


  if (!headersMatch) {


    sheet
      .getRange(
        1,
        1,
        1,
        HEADERS.length
      )
      .setValues([
        HEADERS
      ]);
  }


  prepareTextColumns(sheet);
}




/******************************************************
 * PROTECT IDENTIFIER COLUMNS
 ******************************************************/


function prepareTextColumns(sheet) {


  /*
   * Column 1 = registrationId
   * Column 2 = checkInCode
   *
   * Applying TEXT formatting to these columns prevents
   * Google Sheets from changing numeric-looking IDs.
   */
  sheet
    .getRange(
      1,
      1,
      Math.max(sheet.getMaxRows(), 1),
      2
    )
    .setNumberFormat("@");
}




/******************************************************
 * LOOKUP
 ******************************************************/


function lookupMembers(query) {


  query =
    String(query || "")
      .trim()
      .toLowerCase();


  if (!query) {
    return {
      ok: true,
      members: [],
    };
  }


  const sheet =
    getRegistrationSheet();


  ensureHeaders(sheet);


  /*
   * getDisplayValues() is intentional.
   *
   * It reads exactly what Google Sheets displays,
   * avoiding numeric conversion problems.
   */
  const values =
    sheet
      .getDataRange()
      .getDisplayValues();


  if (values.length < 2) {


    return {
      ok: true,
      members: [],
    };
  }


  const headers =
    values[0].map(
      function(value) {
        return String(value).trim();
      }
    );


  const registrationIdIndex =
    headers.indexOf(
      "registrationId"
    );


  const checkInCodeIndex =
    headers.indexOf(
      "checkInCode"
    );


  const nameIndex =
    headers.indexOf(
      "name"
    );


  if (
    registrationIdIndex === -1 ||
    checkInCodeIndex === -1 ||
    nameIndex === -1
  ) {
    throw new Error(
      "Required registration columns were not found."
    );
  }


  const members = [];


  for (
    let i = 1;
    i < values.length;
    i++
  ) {


    const registrationId =
      String(
        values[i][registrationIdIndex] || ""
      ).trim();


    const checkInCode =
      String(
        values[i][checkInCodeIndex] || ""
      ).trim();


    const name =
      String(
        values[i][nameIndex] || ""
      ).trim();


    if (
      !registrationId &&
      !checkInCode &&
      !name
    ) {
      continue;
    }


    const matchesId =
      registrationId
        .toLowerCase()
        .includes(query);


    const matchesCode =
      checkInCode
        .toLowerCase()
        .includes(query);


    const matchesName =
      name
        .toLowerCase()
        .includes(query);


    if (
      matchesId ||
      matchesCode ||
      matchesName
    ) {


      members.push({
        registrationId:
          registrationId,


        checkInCode:
          checkInCode,


        name:
          name,
      });
    }


    if (members.length >= 20) {
      break;
    }
  }


  return {
    ok: true,
    members: members,
  };
}




/******************************************************
 * CHECK-IN
 ******************************************************/


function processCheckIn(payload) {


  const registrationId =
    String(
      payload.registrationId || ""
    ).trim();


  const checkInCode =
    String(
      payload.checkInCode || ""
    ).trim();


  const session =
    String(
      payload.session || ""
    ).trim();


  if (
    !registrationId &&
    !checkInCode
  ) {
    return {
      ok: false,
      status: "invalid",
      error:
        "Registration ID or check-in code is required.",
    };
  }


  if (!session) {
    return {
      ok: false,
      status: "invalid",
      error:
        "Check-in session is required.",
    };
  }


  if (!SESSIONS.includes(session)) {
    return {
      ok: false,
      status: "invalid",
      error:
        "Invalid WCC check-in session.",
    };
  }


  const member =
    findRegisteredMember(
      registrationId,
      checkInCode
    );


  if (!member) {
    return {
      ok: false,
      status: "not_found",
      error:
        "This person is not registered.",
    };
  }




  /****************************************************
   * DUPLICATE CHECK
   ****************************************************/


  const checkinsSheet =
    getCheckinsSheet();


  const values =
    checkinsSheet
      .getDataRange()
      .getDisplayValues();


  for (
    let i = 1;
    i < values.length;
    i++
  ) {


    const existingRegistrationId =
      String(
        values[i][0] || ""
      ).trim();


    const existingCode =
      String(
        values[i][1] || ""
      ).trim();


    const existingSession =
      String(
        values[i][3] || ""
      ).trim();


    const samePerson =
      (
        registrationId &&
        existingRegistrationId ===
        registrationId
      ) ||
      (
        checkInCode &&
        existingCode ===
        checkInCode
      );


    if (
      samePerson &&
      existingSession ===
      session
    ) {


      return {
        ok: true,
        status: "already_checked_in",


        member: member,


        session: session,


        timestamp:
          values[i][4],
      };
    }
  }




  /****************************************************
   * SAVE CHECK-IN
   ****************************************************/


  const timestamp =
    new Date();


  const nextRow =
    checkinsSheet.getLastRow() + 1;


  checkinsSheet
    .getRange(
      nextRow,
      1,
      1,
      CHECKIN_HEADERS.length
    )
    .setNumberFormat("@")
    .setValues([
      [
        member.registrationId,
        member.checkInCode,
        member.name,
        session,
        timestamp,
      ],
    ]);


  /*
   * Restore a useful date format for timestamp.
   */
  checkinsSheet
    .getRange(
      nextRow,
      5
    )
    .setNumberFormat(
      "dd/MM/yyyy HH:mm:ss"
    );


  return {
    ok: true,
    status: "checked_in",


    member: member,


    session: session,


    timestamp: timestamp,
  };
}




/******************************************************
 * FIND REGISTERED MEMBER
 ******************************************************/


function findRegisteredMember(
  registrationId,
  checkInCode
) {


  const sheet =
    getRegistrationSheet();


  ensureHeaders(sheet);


  const values =
    sheet
      .getDataRange()
      .getDisplayValues();


  if (values.length < 2) {
    return null;
  }


  const headers =
    values[0].map(
      function(value) {
        return String(value).trim();
      }
    );


  const registrationIdIndex =
    headers.indexOf(
      "registrationId"
    );


  const checkInCodeIndex =
    headers.indexOf(
      "checkInCode"
    );


  const nameIndex =
    headers.indexOf(
      "name"
    );


  if (
    registrationIdIndex === -1 ||
    checkInCodeIndex === -1 ||
    nameIndex === -1
  ) {
    throw new Error(
      "Required registration columns were not found."
    );
  }


  const wantedId =
    String(
      registrationId || ""
    ).trim();


  const wantedCode =
    String(
      checkInCode || ""
    ).trim();


  for (
    let i = 1;
    i < values.length;
    i++
  ) {


    const rowRegistrationId =
      String(
        values[i][registrationIdIndex] || ""
      ).trim();


    const rowCheckInCode =
      String(
        values[i][checkInCodeIndex] || ""
      ).trim();


    if (
      (
        wantedId &&
        rowRegistrationId === wantedId
      ) ||
      (
        wantedCode &&
        rowCheckInCode === wantedCode
      )
    ) {


      return {
        registrationId:
          rowRegistrationId,


        checkInCode:
          rowCheckInCode,


        name:
          String(
            values[i][nameIndex] || ""
          ).trim(),
      };
    }
  }


  return null;
}




/******************************************************
 * MEMBER HISTORY
 ******************************************************/


function getMemberHistory(identifier) {


  identifier =
    String(identifier || "")
      .trim();


  if (!identifier) {
    return {
      ok: false,
      error:
        "Registration ID is required.",
    };
  }


  const member =
    findRegisteredMember(
      identifier,
      identifier
    );


  if (!member) {
    return {
      ok: false,
      status: "not_found",
      error:
        "Registration not found.",
    };
  }


  const sheet =
    getCheckinsSheet();


  const values =
    sheet
      .getDataRange()
      .getDisplayValues();


  const history = [];


  for (
    let i = 1;
    i < values.length;
    i++
  ) {


    const rowRegistrationId =
      String(
        values[i][0] || ""
      ).trim();


    const rowCode =
      String(
        values[i][1] || ""
      ).trim();


    if (
      rowRegistrationId ===
        member.registrationId ||
      rowCode ===
        member.checkInCode
    ) {


      history.push({
        registrationId:
          rowRegistrationId,


        checkInCode:
          rowCode,


        name:
          values[i][2],


        session:
          values[i][3],


        timestamp:
          values[i][4],
      });
    }
  }


  return {
    ok: true,
    member: member,
    sessions: history,
  };
}




/******************************************************
 * DASHBOARD
 ******************************************************/


function getDashboard() {


  const sheet =
    getCheckinsSheet();


  const values =
    sheet
      .getDataRange()
      .getDisplayValues();


  const sessionCounts = {};


  SESSIONS.forEach(
    function(session) {
      sessionCounts[session] = 0;
    }
  );


  for (
    let i = 1;
    i < values.length;
    i++
  ) {


    const session =
      String(
        values[i][3] || ""
      ).trim();


    if (
      Object.prototype.hasOwnProperty.call(
        sessionCounts,
        session
      )
    ) {
      sessionCounts[session]++;
    }
  }


  let totalCheckins = 0;


  Object.keys(
    sessionCounts
  ).forEach(
    function(session) {
      totalCheckins +=
        sessionCounts[session];
    }
  );


  return {
    ok: true,
    totalCheckins:
      totalCheckins,
    sessions:
      sessionCounts,
  };
}




/******************************************************
 * SETUP
 ******************************************************/


function setupSheet() {


  const sheet =
    getRegistrationSheet();


  ensureHeaders(sheet);


  /*
   * Do not modify existing registration rows.
   * Only ensure the identifier columns are text.
   */
  prepareTextColumns(sheet);


  /*
   * Prepare Checkins sheet now so it exists before
   * the first check-in.
   */
  getCheckinsSheet();


  return jsonResponse({
    ok: true,
    message:
      "WCC registration and check-in sheets are ready.",
    registrationSheet:
      sheet.getName(),
    checkinsSheet:
      CHECKINS_SHEET_NAME,
    sessions:
      SESSIONS,
  });
}




/******************************************************
 * LIST SHEET TABS
 ******************************************************/


function listSheetTabs() {


  const spreadsheet =
    SpreadsheetApp.openById(
      SPREADSHEET_ID
    );


  const names =
    spreadsheet
      .getSheets()
      .map(
        function(sheet) {
          return sheet.getName();
        }
      );


  console.log(names);


  return jsonResponse({
    ok: true,
    sheets: names,
  });
}




/******************************************************
 * NORMALIZE CELL
 ******************************************************/


function normalizeCell(value) {


  if (
    value === null ||
    value === undefined
  ) {
    return "";
  }


  if (
    typeof value === "object"
  ) {
    return JSON.stringify(value);
  }


  return String(value);
}




/******************************************************
 * JSON RESPONSE
 ******************************************************/


function jsonResponse(body) {


  return ContentService
    .createTextOutput(
      JSON.stringify(body)
    )
    .setMimeType(
      ContentService.MimeType.JSON
    );
}




/******************************************************
 * UNAUTHORIZED RESPONSE
 ******************************************************/


function unauthorizedResponse() {


  return jsonResponse({
    ok: false,
    authenticated: false,
    status: "unauthorized",
    error:
      "Admin login is required.",
  });
}




/******************************************************
 * EMAIL AUTOMATION — ENSURE EMAIL COLUMNS
 *
 * Adds emailStatus, sentAt and brevoMessageId at the
 * end of the registration sheet. Existing columns and
 * rows are never touched.
 ******************************************************/


function ensureEmailHeaders(sheet) {


  const range =
    sheet.getRange(
      1,
      HEADERS.length + 1,
      1,
      EMAIL_HEADERS.length
    );


  const existing =
    range.getDisplayValues()[0];


  const needsColumns =
    EMAIL_HEADERS.some(
      function(header, index) {
        return (
          String(existing[index] || "")
            .trim() !==
          header
        );
      }
    );


  if (needsColumns) {
    range
      .setNumberFormat("@")
      .setValues([
        EMAIL_HEADERS
      ]);
  }
}




/******************************************************
 * EMAIL AUTOMATION — SEND ONE CONFIRMATION VIA BREVO
 ******************************************************/


function sendRegistrationEmail(name, email, code) {


  const props =
    PropertiesService
      .getScriptProperties();


  const apiKey =
    props.getProperty(
      "BREVO_API_KEY"
    );


  const senderEmail =
    props.getProperty(
      "SENDER_EMAIL"
    );


  if (!apiKey || !senderEmail) {
    throw new Error(
      "Brevo configuration missing: add BREVO_API_KEY and SENDER_EMAIL script properties."
    );
  }


  const replyTo =
    props.getProperty(
      "REPLY_TO_EMAIL"
    ) || senderEmail;


  const response =
    UrlFetchApp.fetch(
      "https://api.brevo.com/v3/smtp/email",
      {
        method: "post",
        contentType: "application/json",
        headers: {
          "api-key": apiKey,
        },
        payload: JSON.stringify({
          sender: {
            name: "WCC 2026 Registration",
            email: senderEmail,
          },
          replyTo: {
            email: replyTo,
          },
          to: [
            {
              email: email,
              name: name || email,
            },
          ],
          subject:
            "Your WCC 2026 Registration Confirmation",
          textContent:
            buildConfirmationText(name, code),
          htmlContent:
            buildConfirmationHtml(name, code),
        }),
        muteHttpExceptions: true,
      }
    );


  const status =
    response.getResponseCode();


  if (status !== 201) {
    throw new Error(
      "Brevo error " +
      status +
      ": " +
      response.getContentText()
    );
  }


  return JSON.parse(
    response.getContentText()
  ).messageId;
}




/******************************************************
 * EMAIL AUTOMATION — EMAIL CONTENT
 ******************************************************/


function buildConfirmationText(name, code) {


  return (
    "Hello " + name + ",\n\n" +
    "Thank you for registering for WCC 2026 at Truelight Glory House.\n\n" +
    "Your registration is confirmed.\n\n" +
    "YOUR CHECK-IN CODE: " + code + "\n\n" +
    "Keep this code safe and present it at the venue for check-in.\n\n" +
    "We look forward to seeing you.\n\n" +
    "Warm regards,\n" +
    "Truelight Glory House — WCC 2026 Team"
  );
}


function buildConfirmationHtml(name, code) {


  return (
    '<div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#111;">' +
    '<h2 style="margin:0 0 8px;">Hello ' + name + '</h2>' +
    '<p>Thank you for registering for WCC 2026 at Truelight Glory House.</p>' +
    '<p>Your registration is confirmed. Present this code at the venue for check-in:</p>' +
    '<div style="margin:24px 0;padding:20px;background:#f5f5ff;border:2px dashed #3b5bdb;border-radius:8px;text-align:center;font-size:36px;font-weight:bold;letter-spacing:4px;color:#1c3fa8;">' +
    code +
    '</div>' +
    '<p>Keep this code safe and bring it with you. The code alone is all you need for check-in.</p>' +
    '<p>Warm regards,<br/>Truelight Glory House — WCC 2026 Team</p>' +
    '</div>'
  );
}




/******************************************************
 * EMAIL AUTOMATION — DAILY QUOTA TRACKING
 ******************************************************/


function getEmailQuotaInfo() {


  const props =
    PropertiesService
      .getScriptProperties();


  const todayKey =
    Utilities.formatDate(
      new Date(),
      Session.getScriptTimeZone(),
      "yyyy-MM-dd"
    );


  if (
    props.getProperty(
      "EMAIL_QUOTA_DATE"
    ) !== todayKey
  ) {
    return {
      todayKey: todayKey,
      sentToday: 0,
    };
  }


  return {
    todayKey: todayKey,
    sentToday:
      parseInt(
        props.getProperty(
          "EMAIL_QUOTA_COUNT"
        ) || "0",
        10
      ),
  };
}


function recordEmailQuota(todayKey, count) {


  const props =
    PropertiesService
      .getScriptProperties();


  props.setProperty(
    "EMAIL_QUOTA_DATE",
    todayKey
  );


  props.setProperty(
    "EMAIL_QUOTA_COUNT",
    String(count)
  );
}




/******************************************************
 * EMAIL AUTOMATION — SEND QUEUED EMAILS
 *
 * Trigger function. Processes newest rows first so live
 * registrations take the daily budget before the backlog.
 *
 * Status meanings:
 *   Queued    - ready to send
 *   Sending   - send in progress (retried if stuck)
 *   Sent      - delivered to Brevo
 *   Failed    - send failed, retried next run
 *   Pending   - paused manually, never sent automatically
 *   No email  - no email address or code on the row
 ******************************************************/


function processEmailQueue() {


  return processEmailQueueMax(
    EMAIL_DAILY_ALLOWANCE
  );
}


function processEmailQueueMax(maxEmails) {


  const lock =
    LockService.getScriptLock();


  lock.waitLock(30000);


  try {


    const sheet =
      getRegistrationSheet();


    ensureHeaders(sheet);
    ensureEmailHeaders(sheet);


    const values =
      sheet
        .getDataRange()
        .getDisplayValues();


    if (values.length < 2) {
      return jsonResponse({
        ok: true,
        sent: 0,
        message:
          "No registrations to process.",
      });
    }


    const headers =
      values[0].map(
        function(header) {
          return String(header).trim();
        }
      );


    const iStatus =
      headers.indexOf("emailStatus");


    const iSentAt =
      headers.indexOf("sentAt");


    const iMessageId =
      headers.indexOf(
        "brevoMessageId"
      );


    const iName =
      headers.indexOf("name");


    const iEmail =
      headers.indexOf("email");


    const iCode =
      headers.indexOf("checkInCode");


    if (
      iStatus === -1 ||
      iSentAt === -1 ||
      iMessageId === -1 ||
      iName === -1 ||
      iEmail === -1 ||
      iCode === -1
    ) {
      throw new Error(
        "Required email columns were not found."
      );
    }


    const quota =
      getEmailQuotaInfo();


    let sentToday =
      quota.sentToday;


    let sent = 0;
    let skipped = 0;


    /*
     * New registrations are appended at the bottom.
     * Iterate bottom-up so live sends win the budget.
     */
    for (
      let i = values.length - 1;
      i >= 1;
      i--
    ) {


      const status =
        String(
          values[i][iStatus] || ""
        ).trim();


      const emailValue =
        String(
          values[i][iEmail] || ""
        ).trim();


      const code =
        String(
          values[i][iCode] || ""
        ).trim();


      const name =
        String(
          values[i][iName] || ""
        ).trim();


      if (
        status === "Sent" ||
        status === "No email" ||
        status === "Pending"
      ) {
        continue;
      }


      if (!emailValue || !code) {


        sheet
          .getRange(
            i + 1,
            iStatus + 1
          )
          .setValue("No email");


        skipped++;
        continue;
      }


      if (
        sentToday >=
        (maxEmails || 0)
      ) {
        break;
      }


      sheet
        .getRange(
          i + 1,
          iStatus + 1
        )
        .setValue("Sending");


      try {


        const messageId =
          sendRegistrationEmail(
            name,
            emailValue,
            code
          );


        sheet
          .getRange(
            i + 1,
            iStatus + 1,
            1,
            3
          )
          .setValues([
            [
              "Sent",
              new Date(),
              messageId,
            ],
          ]);


        sentToday++;
        sent++;
        recordEmailQuota(
          quota.todayKey,
          sentToday
        );


      } catch (error) {


        sheet
          .getRange(
            i + 1,
            iStatus + 1
          )
          .setValue("Failed");


        console.error(
          "Email failed for row " +
          (i + 1) +
          ": " +
          error.message
        );
      }
    }


    return jsonResponse({
      ok: true,
      sent: sent,
      skipped: skipped,
      sentToday: sentToday,
      stoppedAtDailyQuota:
        sentToday >= (maxEmails || 0),
    });


  } finally {


    lock.releaseLock();
  }
}




/******************************************************
 * EMAIL AUTOMATION — BACKFILL EXISTING REGISTRATIONS
 *
 * Marks every row that has an email and a code as
 * "Queued". Rows already marked are left untouched.
 *
 * Run this once for the existing 177 registrations.
 ******************************************************/


function backfillEmails() {


  const sheet =
    getRegistrationSheet();


  ensureHeaders(sheet);
  ensureEmailHeaders(sheet);


  const values =
    sheet
      .getDataRange()
      .getDisplayValues();


  if (values.length < 2) {
    return jsonResponse({
      ok: true,
      enqueued: 0,
      message:
        "No registrations to backfill.",
    });
  }


  const headers =
    values[0].map(
      function(header) {
        return String(header).trim();
      }
    );


  const iStatus =
    headers.indexOf("emailStatus");


  const iEmail =
    headers.indexOf("email");


  const iCode =
    headers.indexOf("checkInCode");


  let enqueued = 0;


  for (
    let i = 1;
    i < values.length;
    i++
  ) {


    const status =
      String(
        values[i][iStatus] || ""
      ).trim();


    if (
      status === "Sent" ||
      status === "Queued" ||
      status === "Pending" ||
      status === "Failed" ||
      status === "No email"
    ) {
      continue;
    }


    const emailValue =
      String(
        values[i][iEmail] || ""
      ).trim();


    const code =
      String(
        values[i][iCode] || ""
      ).trim();


    sheet
      .getRange(
        i + 1,
        iStatus + 1
      )
      .setValue(
        !emailValue || !code
          ? "No email"
          : "Queued"
      );


    if (emailValue && code) {
      enqueued++;
    }
  }


  return jsonResponse({
    ok: true,
    enqueued: enqueued,
    message:
      enqueued +
      " registrations queued for email.",
  });
}




/******************************************************
 * EMAIL AUTOMATION — TEST EMAIL
 ******************************************************/


function sendTestEmail(emailAddress) {


  const messageId =
    sendRegistrationEmail(
      "Test Attendee",
      emailAddress,
      "123456"
    );


  return jsonResponse({
    ok: true,
    messageId: messageId,
    message:
      "Test email sent to " +
      emailAddress +
      ".",
  });
}




/******************************************************
 * EMAIL AUTOMATION — SETUP
 *
 * Run this once after adding the BREVO_API_KEY and
 * SENDER_EMAIL script properties.
 *
 * It adds the email columns and installs a 5-minute
 * trigger that drains the queue.
 ******************************************************/


function setupEmailAutomation() {


  const sheet =
    getRegistrationSheet();


  ensureHeaders(sheet);
  ensureEmailHeaders(sheet);


  ScriptApp
    .getProjectTriggers()
    .forEach(
      function(trigger) {
        if (
          trigger.getHandlerFunction() ===
          "processEmailQueue"
        ) {
          ScriptApp.deleteTrigger(
            trigger
          );
        }
      }
    );


  ScriptApp
    .newTrigger("processEmailQueue")
    .timeBased()
    .everyMinutes(5)
    .create();


  return jsonResponse({
    ok: true,
    message:
      "Email columns ready and a 5-minute trigger was installed.",
  });
}
