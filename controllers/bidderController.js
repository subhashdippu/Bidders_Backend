const Bidder = require("../models/Bidder");
const BidEntry = require("../models/BidEntry");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Bid = require("../models/Bid");
// Register a new bidder
const registerBidder = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const bidder = new Bidder({ name, email, password });
    await bidder.save();

    const token = jwt.sign({ id: bidder._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login a bidder
const loginBidder = async (req, res) => {
  const { email, password } = req.body;

  try {
    const bidder = await Bidder.findOne({ email });
    if (!bidder || !(await bcrypt.compare(password, bidder.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: bidder._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Accept a bid request
const acceptBid = async (req, res) => {
  try {
    const bidder = await Bidder.findById(req.user._id).populate("invitedBids");

    if (!bidder) return res.status(404).json({ message: "Bidder not found" });

    const bid = await Bid.findById(req.params.bidId);
    if (!bid) return res.status(404).json({ message: "Bid not found" });

    const isBidInvited = bidder.invitedBids.find(
      (invitedBid) => invitedBid._id.toString() === req.params.bidId
    );

    if (!isBidInvited) {
      return res.status(403).json({
        message: "You are not invited to this bid, hence cannot accept it.",
      });
    }

    bid.status = "accepted";
    await bid.save();

    res.status(202).json({ message: "Bid accepted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Reject a bid request
const rejectBid = async (req, res) => {
  try {
    const bidder = await Bidder.findById(req.user._id);
    if (!bidder) return res.status(404).json({ message: "Bidder not found" });
    res.status(200).json({ message: "Bid rejected" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Place a bid
const placeBid = async (req, res) => {
  const { bidItemId, amount } = req.body;

  try {
    const bid = await Bid.findById(req.params.bidId);

    if (!bid) {
      return res.status(404).json({ message: "Bid not found" });
    }

    // Create a new BidEntry
    const bidEntry = new BidEntry({
      bid: req.params.bidId,
      bidder: req.user._id,
      bidItem: bidItemId,
      amount,
    });
    await bidEntry.save();

    res.status(201).json(bidEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// View current rank
const viewRank = async (req, res) => {
  try {
    const bidEntries = await BidEntry.find({ bid: req.params.bidId })
      .populate("bidder", "name")
      .sort({ amount: 1 });

    if (bidEntries.length === 0) {
      return res
        .status(404)
        .json({ message: "No bids found for this auction." });
    }

    const highestBidAmount = bidEntries[bidEntries.length - 1].amount;

    const bidders = bidEntries.map((entry) => ({
      _id: entry.bidder._id,
      name: entry.bidder.name,
      bidAmount: entry.amount,
    }));

    res.status(200).json({
      bidders,
      highestBidAmount,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update bid amounts
const updateBid = async (req, res) => {
  const { bidItemId, amount } = req.body;

  try {
    const bidEntry = await BidEntry.findOne({
      bid: req.params.bidId,
      bidder: req.user._id,
      bidItem: bidItemId,
    });

    if (!bidEntry)
      return res.status(404).json({ message: "Bid entry not found" });

    bidEntry.amount = amount;
    await bidEntry.save();

    res.status(200).json(bidEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  registerBidder,
  loginBidder,
  acceptBid,
  rejectBid,
  placeBid,
  viewRank,
  updateBid,
};
