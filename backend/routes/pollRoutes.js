const express = require("express");
const pollController = require("../controllers/pollController");

const router = express.Router();

// Poll available routes

router
	.route("/")
	.get(pollController.getAllPolls)
	.post(pollController.createPoll);
router.route("/:id").delete(pollController.deletePoll);
router.route("/vote/:id").patch(pollController.votePoll);

module.exports = router;
