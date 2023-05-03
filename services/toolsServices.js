const axios = require('axios');
const XLSX = require('xlsx');
const fs = require('fs');

/**
 * Gets the original bench report and puts it in a
 * JSON object
 * @param {*} excelFileUrl 
 * @returns 
 */
async function getRemoteBenchReport(excelFileUrl) {
  try {
    const response = await axios.get(excelFileUrl, { responseType: 'arraybuffer' });
    const excelFileBuffer = Buffer.from(response.data);

    const workbook = XLSX.read(excelFileBuffer, { type: 'buffer' });

    // MDC Bench is the second tab...
    const sheetName = workbook.SheetNames[1];
    const worksheet = workbook.Sheets[sheetName];

    // Convert the worksheet data to JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    return jsonData;
  } catch (error) {
    console.error('Error fetching and processing remote Excel file:', error);
  }
}

/**
 * 
 * @param {*} pathToBenchReport 
 * @returns 
 */
async function getLocalBenchReport(pathToBenchReport){
  try {
    const fileContent = fs.readFileSync(pathToBenchReport);
    const workbook = XLSX.read(fileContent, { type: 'buffer' });

    // MDC Bench is the second tab...
    const sheetName = workbook.SheetNames[1];
    const worksheet = workbook.Sheets[sheetName];

    // Convert the worksheet data to JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    return jsonData;
  } catch (error) {
    console.error('Error fetching and processing remote Excel file:', error);
  }
}

module.exports = {
  getRemoteBenchReport,
  getLocalBenchReport
};