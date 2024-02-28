import Church from "../database/models/church.js";
import generateQRCode from "../utils/generateQRCode.js";
import User from "../database/models/user.js";
export const addChurch = async (req, res) => {
  try {
    const { userId, name, sloganMessage } = req.body;

    // Create a new church instance
    const newChurch = new Church({
      userId,
      name,
      sloganMessage,
    });

    // Save the church to the database
    const savedChurch = await newChurch.save();

    // Generate a link to access the website of the created church
    // const churchWebsiteLink = `https://your-website.com/church/${savedChurch._id}`;
    const churchWebsiteLink = `https://www.npmjs.com/package/bwip-js`;

    // Generate a QR code using the church ID and website link
    const qrCode = await generateQRCode(savedChurch._id, churchWebsiteLink);

    // Save the QR code data in the database
    savedChurch.qrCodeData = qrCode.dataURI;
    await savedChurch.save();

    return res.status(201).json({
      success: true,
      church: savedChurch,
      churchWebsiteLink,
      qrCode: qrCode.dataURI,
    });
  } catch (error) {
    console.error("Error creating church:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
