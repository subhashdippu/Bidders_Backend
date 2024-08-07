const mongoose = require("mongoose");

const bidEntrySchema = new mongoose.Schema({
  bid: { type: mongoose.Schema.Types.ObjectId, ref: "Bid", required: true },
  bidder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bidder",
    required: true,
  },
  bidItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BidItem",
    required: true,
  },
  amount: { type: Number, required: true },
});

const BidEntry = mongoose.model("BidEntry", bidEntrySchema);

module.exports = BidEntry;
