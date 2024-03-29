import Church from "../database/models/church.js";
import generateQRCode from "../utils/generateQRCode.js";
import User from "../database/models/user.js";

export const addChurch = async (req, res) => {
  try {
    const { userId, name, sloganMessage, charityActions, iban } = req.body;

    if (!userId || !name) {
      return res.status(400).json({
        success: false,
        error: "UserId and Name are required fields.",
      });
    }

    const userExist = await User.findOne({ _id: userId });
    if (!userExist) {
      return res.status(404).json({
        success: false,
        error: "User does not exist",
      });
    }

    if (userExist.role === "normal") {
      return res.status(401).json({
        success: false,
        error: "Privilege goes to admin or manager",
      });
    }

    // Create a new church instance
    const newChurch = new Church({
      userId,
      name,
      sloganMessage,
      charityActions,
      iban,
    });

    // Check if an image file was uploaded
    if (req.file) {
      // Assuming multer middleware handles file upload and sets req.file
      newChurch.logo = req.file.path; // Use req.file to get the path
    }

    // Save the church to the database
    const savedChurch = await newChurch.save();

    // Generate a link to access the website of the created church
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
    console.error("Error creating or saving church:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const getAllChurches = async (req, res) => {
  try {
    const churches = await Church.find().populate({
      path: "userId",
      select: "name", // Project only the 'name' field of the user
    });

    // Extract user names from populated user objects
    const populatedChurches = churches.map((church) => ({
      _id: church._id,
      name: church.name,
      sloganMessage: church.sloganMessage,
      charityActions: church.charityActions,
      Manager: church.userId ? church.userId.name : null,
    }));

    return res.status(200).json({
      success: true,
      churches: populatedChurches,
    });
  } catch (error) {
    console.log("Error fetching All churches: ", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const getChurchById = async (req, res) => {
  try {
    const { churchId } = req.params;
    const church = await Church.findById(churchId);
    if (!church) {
      return res.status(404).json({
        success: false,
        error: "Church not found",
      });
    }
    const user = await User.findById(church.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found for this church",
      });
    }
    return res.status(200).json({
      success: true,
      church: {
        ...church.toObject(),
        user: user.toObject(),
      },
    });
  } catch (error) {
    console.error("Error Fetching church:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const updateChurch = async (req, res) => {
  try {
    const { churchId } = req.params;
    const { name, sloganMessage, charityActions } = req.body;
    const church = await Church.findById(churchId);

    if (!church) {
      return res.status(404).json({
        success: false,
        error: "Church not found",
      });
    }
    console.log("Name", name);
    // Update church properties only if provided in the request
    church.name = name || church.name;
    church.sloganMessage = sloganMessage || church.sloganMessage;
    church.charityActions = charityActions || church.charityActions;

    // Save the updated church
    const updatedChurch = await church.save();
    return res.status(200).json({
      success: true,
      church: updatedChurch,
    });
  } catch (error) {
    console.error("Error updating church:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const deleteChurch = async (req, res) => {
  try {
    const { churchId } = req.params;
    const church = await Church.findById(churchId);
    if (!church) {
      return res.status(404).json({
        success: false,
        error: "Church not found",
      });
    }
    await church.deleteOne();
    return res.status(200).json({
      success: true,
      message: "Church deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting church", error);
    return res.status(500).json({
      success: false,
      error: "Internal Server error",
    });
  }
};
