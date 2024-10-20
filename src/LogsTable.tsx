import React, { useState } from "react";

// Convert hex to ASCII and remove non-printable characters
const hexToAscii = (hex: string) => {
  let asciiStr = "";
  for (let i = 0; i < hex.length; i += 2) {
    const hexChar = hex.substr(i, 2);
    asciiStr += String.fromCharCode(parseInt(hexChar, 16));
  }

  // Remove non-printable characters (characters outside the range of printable ASCII)
  return asciiStr.replace(/[^\x20-\x7E]/g, "");
};

// Parse log data into meaningful values
const parseLogData = (logValue: string) => {
  // Step 1: Parse the string using '|' as the separator
  const parsedValues = logValue.split("|");

  // Step 2: Clean each value in the parsed array
  const cleanedValues = parsedValues.map(
    (value: any) =>
      value
        .replace(/[\^]+/g, "") // Remove '^'
        .replace(/[^\x20-\x7E]/g, "") // Remove illegal/non-printable characters
  );

  // Step 3: Parse the date if it's in the last element (ignore extra characters like '8A')
  const lastValue = cleanedValues[cleanedValues.length - 1];
  const datePart = lastValue.slice(0, 14); // Extract the date portion
  if (datePart.length === 14) {
    const year = datePart.slice(0, 4);
    const month = datePart.slice(4, 6);
    const day = datePart.slice(6, 8);
    const formattedDate = `${day}/${month}/${year}`;

    // Replace the last value with the formatted date
    cleanedValues[cleanedValues.length - 1] = formattedDate;
  }

  // Step 4: Remove empty values
  const filteredValues = cleanedValues.filter(value => value.trim() !== "");

  // Return the cleaned and parsed values without empty spaces
  return filteredValues;
};

const LogsTable = ({ logs }: any) => {
  const [selectedHex, setSelectedHex] = useState<string | null>(null);
  const [asciiValue, setAsciiValue] = useState<string | null>(null);
  const [parsedValue, setParsedValue] = useState<string[] | null>(null);

  // Handle row click
  const handleRowClick = (log: any) => {
    if (log.action === "Received (hex)") {
      setSelectedHex(log.value); // Set original hex value
      const ascii = hexToAscii(log.value); // Convert to ASCII
      setAsciiValue(ascii); // Set ASCII value
      const parsed = parseLogData(ascii); // Parse ASCII data
      setParsedValue(parsed); // Set parsed data
    }
  };

  return (
    <div className="container mx-auto mt-10 p-4">
      {/* Scrollable container */}
      <div className="overflow-x-auto max-h-[600px] mb-4">
        <table className="table-auto w-full text-left border-collapse border border-gray-300 shadow-md">
          {/* Sticky header */}
          <thead className="bg-blue-500 text-white sticky top-0">
            <tr>
              <th className="px-4 py-2 w-1/6 border border-gray-300">
                Timestamp
              </th>
              <th className="px-4 py-2 w-1/6 border border-gray-300">Action</th>
              <th className="px-4 py-2 w-1/3 border border-gray-300">
                Parsed Value (ASCII)
              </th>
            </tr>
          </thead>

          {/* Table body */}
          <tbody>
            {logs.map((log: any, index: number) => (
              <tr
                key={index}
                // Conditional background color for "Sent", "Received (hex)", and "EOT" rows
                className={`${
                  log.action === "Received (hex)"
                    ? "bg-green-100" // Color for Received (hex)
                    : log.action === "Sent"
                    ? "bg-yellow-100" // Color for Sent
                    : log.value.includes("<EOT>")
                    ? "bg-red-200" // Color for <EOT>
                    : ""
                } hover:bg-gray-100 transition-all duration-150 ease-in-out cursor-pointer`}
                onClick={() => handleRowClick(log)} // Add click handler for rows
              >
                <td className="px-4 py-2 border border-gray-300 text-gray-700 font-medium">
                  {log.timestamp}
                </td>
                <td className="px-4 py-2 border border-gray-300 text-gray-700">
                  {log.action}
                </td>

                <td className="px-4 py-2 border border-gray-300 text-gray-600">
                  {log.action === "Received (hex)"
                    ? hexToAscii(log.value)
                    : log.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedHex && asciiValue && parsedValue && (
        <div className="mt-4">
          <label className="block text-gray-700 text-lg font-medium mb-2">
            Selected Received (hex) Value:
          </label>
          <div className="p-2 border border-gray-300 rounded-lg">
            <p>
              <span className="font-bold text-blue-600">Original Hex: </span>
              <span>{selectedHex}</span>
            </p>
            <p>
              <span className="font-bold text-green-600">ASCII Value: </span>
              <span>{asciiValue}</span>
            </p>
            <p>
              <span className="font-bold text-purple-600">Parsed Value: </span>
              <span>{parsedValue.join(", ")}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogsTable;
