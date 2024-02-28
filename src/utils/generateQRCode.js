// generateQRCode.js

import qrcode from "qrcode";

const generateQRCode = async (churchId, websiteLink) => {
  // Ensure that churchId is a string
  const qrCodeValue = String(churchId);

  try {
    // Generate QR code as a data URI
    const qrCodeDataURI = await qrcode.toDataURL(websiteLink);

    return {
      value: qrCodeValue,
      dataURI: qrCodeDataURI,
    };
  } catch (error) {
    console.error("Error generating QR code:", error);
    throw error; // Rethrow the error
  }
};

export default generateQRCode;
