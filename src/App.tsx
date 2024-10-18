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
      }
    });

    return parsedLogs;
  };

  return (
    <div className="container mx-auto">
      <input type="file" onChange={handleFileUpload} className="mb-4" />
      {logs.length > 0 && <LogsTable logs={logs} />}
    </div>
  );
};

export default App;
