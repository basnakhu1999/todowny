/**
 * Google Apps Script - Valentine Surprise Form Handler
 * 
 * วิธีใช้งาน:
 * 1. สร้าง Google Sheet ใหม่
 * 2. ไปที่ Extensions > Apps Script
 * 3. ลบโค้ดเดิมทั้งหมด แล้ววางโค้ดนี้
 * 4. กด Deploy > New deployment
 * 5. เลือก Type: Web app
 * 6. ตั้งค่า:
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 7. กด Deploy และคัดลอก URL ไปใส่ใน script.js
 */

// ชื่อ Sheet ที่จะเก็บข้อมูล
const SHEET_NAME = 'Responses';

/**
 * ฟังก์ชันหลักสำหรับรับ POST request
 */
function doPost(e) {
    try {
        // Parse JSON data
        const data = JSON.parse(e.postData.contents);

        // Get or create sheet
        const ss = SpreadsheetApp.getActiveSpreadsheet();
        let sheet = ss.getSheetByName(SHEET_NAME);

        // Create sheet if not exists
        if (!sheet) {
            sheet = ss.insertSheet(SHEET_NAME);
            // Add headers
            sheet.getRange(1, 1, 1, 4).setValues([['Timestamp', 'Nickname', 'Message', 'Raw Timestamp']]);
            sheet.getRange(1, 1, 1, 4).setFontWeight('bold');
            sheet.setFrozenRows(1);
        }

        // Format timestamp for Thai timezone
        const timestamp = new Date();
        const formattedTime = Utilities.formatDate(
            timestamp,
            'Asia/Bangkok',
            'dd/MM/yyyy HH:mm:ss'
        );

        // Append data
        sheet.appendRow([
            formattedTime,
            data.nickname || 'ไม่ระบุชื่อ',
            data.message || '',
            data.timestamp || ''
        ]);

        // Return success response
        return ContentService
            .createTextOutput(JSON.stringify({
                success: true,
                message: 'Data saved successfully'
            }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        // Return error response
        return ContentService
            .createTextOutput(JSON.stringify({
                success: false,
                error: error.toString()
            }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

/**
 * ฟังก์ชันสำหรับ GET request (ใช้ทดสอบ)
 */
function doGet(e) {
    return ContentService
        .createTextOutput(JSON.stringify({
            status: 'ok',
            message: 'Valentine Form API is running 💕'
        }))
        .setMimeType(ContentService.MimeType.JSON);
}

/**
 * ฟังก์ชันสำหรับดึงข้อมูลทั้งหมด (สำหรับแสดง "กำแพงหัวใจ")
 */
function getAllResponses() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
        return [];
    }

    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const responses = [];

    for (let i = 1; i < data.length; i++) {
        responses.push({
            timestamp: data[i][0],
            nickname: data[i][1],
            message: data[i][2]
        });
    }

    return responses;
}

/**
 * API endpoint สำหรับดึงข้อมูล
 */
function doGet(e) {
    const action = e.parameter.action;

    if (action === 'getAll') {
        const responses = getAllResponses();
        return ContentService
            .createTextOutput(JSON.stringify({
                success: true,
                data: responses
            }))
            .setMimeType(ContentService.MimeType.JSON);
    }

    // Get latest message
    if (action === 'getLatest') {
        const ss = SpreadsheetApp.getActiveSpreadsheet();
        const sheet = ss.getSheetByName(SHEET_NAME);

        if (!sheet || sheet.getLastRow() < 2) {
            return ContentService
                .createTextOutput(JSON.stringify({
                    success: false,
                    message: null
                }))
                .setMimeType(ContentService.MimeType.JSON);
        }

        // Get the last row's message (column 3)
        const lastRow = sheet.getLastRow();
        const message = sheet.getRange(lastRow, 3).getValue();

        return ContentService
            .createTextOutput(JSON.stringify({
                success: true,
                message: message
            }))
            .setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService
        .createTextOutput(JSON.stringify({
            status: 'ok',
            message: 'Valentine Form API is running 💕',
            usage: 'Use ?action=getAll or ?action=getLatest'
        }))
        .setMimeType(ContentService.MimeType.JSON);
}
