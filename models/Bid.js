const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
  title: { type: String, required: true },
  startTime: { type: Date, required: false },
  endTime: { type: Date, required: false },
  status: {
    type: String,
    enum: ["pending", "active", "closed"],
    default: "pending",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bidder",
    required: true,
  },
  bidItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "BidItem" }],
  invitedBidders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bidder" }],
});

module.exports = mongoose.model("Bid", bidSchema);
