import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import './SyllabusForm.css'

function Upload() {
  const [fileData, setFileData] = useState([]);
  const [headers, setHeaders] = useState([]);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      
      // Assuming the data is in the first sheet
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Convert the sheet to JSON
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // Extract headers
      const headers = jsonData[0];

      // Remove header row
      jsonData.shift();

      setHeaders(headers);
      setFileData(jsonData);
    };
    reader.readAsArrayBuffer(uploadedFile);
  };

  return (
    <div className="form-container">
      <h2>SyllabusForm</h2>
      <form>
        <div className="form-group">
          <label htmlFor="file">Upload Excel file:</label>
          <input type="file" id="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
        </div>
      </form>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fileData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Upload;
