import React from "react";

const hexToAscii = (hex: string) => {
  let asciiStr = "";
  for (let i = 0; i < hex.length; i += 2) {
    const hexChar = hex.substr(i, 2);
    asciiStr += String.fromCharCode(parseInt(hexChar, 16));
  }
  return asciiStr;
};

const LogsTable = ({ logs }: any) => {
  return (
    <div className="container mx-auto mt-10 p-4">
      {/* Scrollable container */}
      <div className="overflow-x-auto max-h-[600px]">
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
                className="hover:bg-gray-100 transition-all duration-150 ease-in-out"
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
    </div>
  );
};

export default LogsTable;
