import { useEffect, useState } from "react";
import decompressHexGzip from "./decompressHexGzip";
import compressJsonToHexGzip from "./compressJsonToGzip";
import "./App.css";

const prettyJson = (json) => {
  return JSON.stringify(JSON.parse(json), null, 2)
}

function App() {
  const [leftWindowText, setLeftWindowText] = useState("");
  const [rightWindowText, setRightWindowText] = useState("");
  const [conversionMode, setConversionMode] = useState(true) // true - gunzipping, false - gzipping
  const [prettyPrintEnabled, setPrettyPrintEnabled] = useState(true);

  useEffect(() => {
    try {
      if (leftWindowText === undefined || leftWindowText === "") {
        setRightWindowText("")
        return
      };
      let outputText = conversionMode ? decompressHexGzip(leftWindowText) : compressJsonToHexGzip(leftWindowText);
      setRightWindowText(prettyPrintEnabled && conversionMode ? prettyJson(outputText) : outputText);
    } catch (error) {
      setRightWindowText("Konvertering feilet");
    }
  }, [leftWindowText, conversionMode, prettyPrintEnabled]);

  const gunIcon = <span onClick={() => setConversionMode(!conversionMode)}>🔫</span>

  return (
    <div className="app">
      <h3>
        {gunIcon}ZIP BYTEARRAY{
          !conversionMode && <span> (gzip mode enabled, click {gunIcon} to disable)</span>
        }
      </h3>
      <div className="pretty-print">
        <label>Pretty JSON: </label>
        <input
          className="pretty-print-checkbox"
          type="checkbox"
          checked={prettyPrintEnabled}
          onChange={(e) => setPrettyPrintEnabled(e.target.checked)}
        />
      </div>
      <div className="textboxes">
        <textarea
          placeholder={conversionMode ? "Put gzipped bytearray here..." : "Put JSON here..."}
          className="textbox"
          value={leftWindowText}
          onChange={(e) => setLeftWindowText(e.target.value)}
        />
        <textarea
          placeholder={conversionMode ? "... and JSON appears here" : "... and gzipped bytearray appears here"}
          className="textbox"
          readOnly={true}
          value={rightWindowText}
        />
      </div>
    </div>
  );
}

export default App;
