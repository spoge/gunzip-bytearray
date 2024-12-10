import pako from "pako";

const compressJsonToGzip = (jsonString) => {
  try {
    const compactJsonString = JSON.stringify(JSON.parse(jsonString));
    const compressedData = pako.gzip(compactJsonString, { to: "uint8array" });
    return compressedData;
  } catch (error) {
    console.error("Failed to compress JSON data:", error);
    throw new Error("Compression failed.");
  }
};

const uint8ArrayToHex = (byteArray) => {
  return (
    "0x" +
    Array.from(byteArray)
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("")
  );
};

const compressJsonToHexGzip = (jsonString) => {
  const compressedData = compressJsonToGzip(jsonString);
  return uint8ArrayToHex(compressedData);
};

export default compressJsonToHexGzip;
