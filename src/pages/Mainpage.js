import React, { useRef, useState } from "react";
import Upload from "../components/Upload";
import "../assets/css/mainpage.css";
import { CSVLink } from "react-csv";

export default function Mainpage() {
  const [output, setOutput] = useState([]);

  const handleOutputChange = (newOutput) => {
    setOutput(newOutput);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="upload-section">
          <Upload onOutputChange={handleOutputChange} />
        </div>
        <div className="outcome-section">
          <div className="example-outcome">Example Outcome</div>
          <DataTable data={output} />
        </div>
      </div>
    </div>
  );
}

const DataTable = ({ data }) => {
  const tableRef = useRef(null);

  if (!data || Object.keys(data).length === 0) {
    return <div>No data to display</div>;
  }

  const columns = Object.keys(data[Object.keys(data)[0]]);
  const rows = Object.keys(data);

  const transformedData = transformData(data);

  return (
    <div>
      <table className="data-table" ref={tableRef}>
        <thead>
          <tr>
            <th></th>
            {columns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
            <th>Target(60%)</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>PI:{row}</td>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>{data[row][col]}</td>
              ))}
              
              <td>{parseFloat(data[row]["4"]) + parseFloat(data[row]["5"])}</td>
  <td>
  {(parseFloat(data[row]["4"]) + parseFloat(data[row]["5"])) > (0.6 * (parseFloat(data[row]["1"])+parseFloat(data[row]["2"])+parseFloat(data[row]["3"])+ parseFloat(data[row]["4"]) + parseFloat(data[row]["5"]))) ? "Pass" : "Failed"}
  </td>

            </tr>
          ))}
        </tbody>
      </table>

      <div className="bg-white">
        <CSVLink data={transformedData} filename={"score.csv"}>Export Score</CSVLink>
      </div>
    </div>
  );
};

function transformData(originalData) {
  const transformedData = [];

  // Iterate over each indicator in the originalData
  for (const indicator in originalData) {
    const indicatorData = originalData[indicator];

    // Sum the points within the target group (4 and 5)
    const targetPointsSum = parseFloat(indicatorData["4"]) + parseFloat(indicatorData["5"]);

    // Calculate the total sum of all points (1 to 5)
    const totalPointsSum = Object.keys(indicatorData)
      .filter(key => key !== "indicator") // Exclude the indicator key
      .reduce((sum, key) => sum + parseFloat(indicatorData[key]), 0);

    // Calculate 60% of the total points sum
    const sixtyPercentOfTotal = 0.6 * totalPointsSum;

    // Determine if the target group exceeds 60% of all points
    const result = targetPointsSum > sixtyPercentOfTotal ? "Pass" : "Failed";

    // Create the transformed item
    const transformedItem = {
      indicator: indicator,
      ...indicatorData,
      "Target(60%)": sixtyPercentOfTotal,
      Result: result,
    };

    // Push the transformed item to the transformedData array
    transformedData.push(transformedItem);
  }

  console.log(transformedData);

  return transformedData;
}

