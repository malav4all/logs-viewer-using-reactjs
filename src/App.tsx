import "./App.css";

import React, { useState } from "react";
import LogsTable from "./LogsTable";

const App = () => {
  const [logs, setLogs] = useState<any>([]);

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const text = e.target.result;
      const parsedLogs = parseLogs(text);
      setLogs(parsedLogs);
    };

    reader.readAsText(file);
  };

  // Updated parser to handle Sent and Received logs.
  const parseLogs = (text: any) => {
    const lines = text.split("\n");
    const parsedLogs: any = [];

    lines.forEach((line: any, index: any) => {
      if (line.startsWith("Sent")) {
        parsedLogs.push({
          timestamp: `Line ${index + 1}`,
          action: "Sent",
          value: line.replace("Sent: ", "").trim(),
        });
      } else if (line.startsWith("Received (hex)")) {
        parsedLogs.push({
          timestamp: `Line ${index + 1}`,
          action: "Received (hex)",
          value: line.replace("Received (hex): ", "").trim(),
        });
      } else if (line.includes("<EOT>")) {
        // Handle the case where EOT is received
        parsedLogs.push({
          timestamp: `Line ${index + 1}`,
          action: "Received: <EOT>",
          value: line.trim(),
        });
      }
    });

    return parsedLogs;
  };
  return (
    <div className="container mx-auto mt-10 p-6">
      {/* App Heading */}
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        Log Viewer App
      </h1>

      {/* File Upload Section */}
      <div className="mb-4">
        <label className="block text-gray-700 text-lg font-medium mb-2">
          Upload Log File
        </label>
        <input
          type="file"
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-500
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-500 file:text-white
                   hover:file:bg-blue-600
                   cursor-pointer"
        />
      </div>

      {/* Logs Table */}
      {logs.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-4">
          <LogsTable logs={logs} />
        </div>
      )}
    </div>
  );
};

export default App;
