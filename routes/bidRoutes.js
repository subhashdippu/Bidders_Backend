const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  createBid,
  inviteBidders,
  setBidTimes,
  publishBid,
  monitorBids,
  viewBidSummary,
} = require("../controllers/bidController");

const router = express.Router();

router.post("/", protect, createBid);
router.post("/:id/invite", protect, inviteBidders);
router.put("/:id/times", protect, setBidTimes);
router.put("/:id/publish", protect, publishBid);
router.get("/:id/monitor", protect, monitorBids);
router.get("/:id/summary", protect, viewBidSummary);

module.exports = router;
