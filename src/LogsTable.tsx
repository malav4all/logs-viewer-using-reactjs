import React, { useState } from "react";

const hexToAscii = (hex: string) => {
  let asciiStr = "";
  for (let i = 0; i < hex.length; i += 2) {
    const hexChar = hex.substr(i, 2);
    asciiStr += String.fromCharCode(parseInt(hexChar, 16));
  }
  return asciiStr;
};

const LogsTable = ({ logs }: any) => {
  const [selectedHex, setSelectedHex] = useState<string | null>(null);

  // Handle row click
  const handleRowClick = (log: any) => {
    if (log.action === "Received (hex)") {
      setSelectedHex(log.value); // Set the selected hex value to show in the text box
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

      {/* Text box showing selected Received (hex) value */}
      {selectedHex && (
        <div className="mt-4">
          <label className="block text-gray-700 text-lg font-medium mb-2">
            Selected Received (hex) Value:
          </label>
          <textarea
            className="w-full h-24 p-2 border border-gray-300 rounded-lg"
            readOnly
            value={hexToAscii(selectedHex)}
          />
        </div>
      )}
    </div>
  );
};

export default LogsTable;
