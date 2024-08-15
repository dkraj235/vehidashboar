import * as XLSX from 'xlsx';

export const exportToExcel = (data, fileName) => {
  // Create a new workbook and a worksheet from the data
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // Generate Excel file and trigger download
  XLSX.writeFile(workbook, fileName);
};
