const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  registerBidder,
  loginBidder,
  acceptBid,
  rejectBid,
  placeBid,
  viewRank,
  updateBid,
} = require("../controllers/bidderController");

const router = express.Router();

router.post("/register", registerBidder);
router.post("/login", loginBidder);
router.put("/:bidId/accept", protect, acceptBid);
router.put("/:bidId/reject", protect, rejectBid);
router.post("/:bidId/place", protect, placeBid);
router.get("/:bidId/rank", protect, viewRank);
router.put("/:bidId/update", protect, updateBid);

module.exports = router;
