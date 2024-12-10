import { useEffect, useState } from "react";
import decompressHexGzip from "./decompressHexGzip";
//import compressJsonToHexGzip from "./compressJsonToGzip";
import "./App.css";

function App() {
  const [byteArrayText, setByteArrayText] = useState("");
  const [jsonText, setJsonText] = useState("");
  const [prettyPrintEnabled, setPrettyPrintEnabled] = useState(true);

  useEffect(() => {
    try {
      if (byteArrayText === undefined || byteArrayText === "") return;
      let decompressedJson = decompressHexGzip(byteArrayText);
      if (prettyPrintEnabled) {
        let actualJson = JSON.parse(decompressedJson);
        setJsonText(JSON.stringify(actualJson, null, 2));
      } else {
        setJsonText(decompressedJson, null, 2);
      }
    } catch (error) {
      setJsonText("Konvertering feilet");
    }
  }, [byteArrayText, prettyPrintEnabled]);

  return (
    <div className="app">
      <h3>🔫ZIP BYTEARRAY</h3>
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
          placeholder="Put gzipped bytearray here..."
          className="textbox"
          value={byteArrayText}
          onChange={(e) => setByteArrayText(e.target.value)}
        />
        <textarea
          placeholder="... and JSON appears here"
          className="textbox"
          readOnly={true}
          value={jsonText}
        />
      </div>
    </div>
  );
}

export default App;
