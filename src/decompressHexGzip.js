import pako from "pako";

const hexToUint8Array = (hexString) => {
  // Remove the 0x prefix if it exists
  if (hexString.startsWith("0x")) {
    hexString = hexString.slice(2);
  } else if (hexString.startsWith("x")) {
    hexString = hexString.slice(1);
  }

  // Convert hex string to byte array
  const byteArray = new Uint8Array(
    hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))
  );
  return byteArray;
};

const decompressHexGzip = (hexString) => {
  try {
    const byteArray = hexToUint8Array(hexString); // Convert hex to Uint8Array
    const decompressedData = pako.ungzip(byteArray, { to: "string" }); // Decompress
    return decompressedData.trim();
  } catch (error) {
    throw new Error("Decompression failed.");
  }
};

export default decompressHexGzip;
