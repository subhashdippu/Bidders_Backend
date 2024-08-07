const Bidder = require("../models/Bidder");
const BidEntry = require("../models/BidEntry");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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
    const bidder = await Bidder.findById(req.user._id);
    if (!bidder) return res.status(404).json({ message: "Bidder not found" });

    // Logic to accept the bid
    // ...

    res.status(200).json({ message: "Bid accepted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Reject a bid request
const rejectBid = async (req, res) => {
  try {
    const bidder = await Bidder.findById(req.user._id);
    if (!bidder) return res.status(404).json({ message: "Bidder not found" });

    // Implement logic to reject the bid

    res.status(200).json({ message: "Bid rejected" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Place a bid
const placeBid = async (req, res) => {
  const { bidItemId, amount } = req.body;

  try {
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
    // Implement logic to calculate and return the current rank

    res.status(200).json({ rank: "current rank" });
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
