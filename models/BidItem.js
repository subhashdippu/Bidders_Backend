const mongoose = require("mongoose");

const bidItemSchema = new mongoose.Schema({
  description: { type: String, required: true },
  baseAmount: { type: Number, required: true },
  bids: [{ type: mongoose.Schema.Types.ObjectId, ref: "BidEntry" }],
});

const BidItem = mongoose.model("BidItem", bidItemSchema);

module.exports = BidItem;
