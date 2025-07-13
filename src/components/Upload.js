import React, { useState } from "react";
import * as XLSX from "xlsx";
import './Upload.css'

function transformData(input) {
  const output = {};

  input.forEach(obj => {
      Object.entries(obj).forEach(([key, value]) => {
          output[key] = output[key] || {};
          output[key][value] = (output[key][value] || 0) + 1;
      });
  });

  return output;
}

function Upload({ onOutputChange }) {
  const [fileData, setFileData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const keysToRemove = ["Student Name", "Seq No.", "Student Code"];

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = XLSX.read(data, { type: "array" }).Sheets[
        workbook.SheetNames[0]
      ];

      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      const headers = jsonData[0];

      const filteredData = XLSX.utils.sheet_to_json(sheet).map((obj) => {
        for (const key of keysToRemove) {
          delete obj[key];
        }
        return obj;
      });

      console.log(filteredData);

      onOutputChange(transformData(filteredData, 1, 5));

      jsonData.shift();
      setHeaders(headers);
      setFileData(jsonData);
    };
    reader.readAsArrayBuffer(uploadedFile);
  };

  return (
    <div className="form-container">
      <h2>Score Sheet</h2>
      <form>
        <div className="form-group">
          <label htmlFor="file">Upload Excel file:</label>
          <input
            type="file"
            id="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
          />
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