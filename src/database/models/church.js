import mongoose from "mongoose";

const churchSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  sloganMessage: {
    type: String,
  },
  qrCodeData: {
    type: String,
  },
});

const Church = mongoose.model("Church", churchSchema);

export default Church;
