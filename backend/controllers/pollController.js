const Poll = require("../models/pollModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllPolls = catchAsync(async (req, res, next) => {
	const polls = await Poll.find();
	res.status(200).json({
		status: "success",
		results: polls.length,
		data: {
			polls,
		},
	});
});

exports.createPoll = catchAsync(async (req, res, next) => {
	// console.log(req.body);
	const decoded = await promisify(jwt.verify)(
		req.cookies.jwt,
		process.env.JWT_SECRET
	);
	// const newOptions = req.body.options;
	const newPoll = await Poll.create({
		question: req.body.question,
		options: req.body.options,
		created_by: decoded.id,
	});
	res.status(201).json({
		status: "success",
		data: {
			poll: newPoll,
		},
	});
});

exports.deletePoll = catchAsync(async (req, res, next) => {
	if (req.cookies.jwt && req.cookies.jwt !== "loggedout") {
		// verify token
		const decoded = await promisify(jwt.verify)(
			req.cookies.jwt,
			process.env.JWT_SECRET
		);

		// check if user still exists
		const currentUser = await User.findById(decoded.id);
		if (!currentUser) {
			return next(new AppError("No user found with that id", 404));
		}
		const poll_find = await Poll.findById(req.params.id);
		if (!poll_find) {
			return next(new AppError("No poll found with that ID.", 404));
		}
		if (currentUser.id === poll_find.created_by) {
			const poll = await Poll.findByIdAndDelete(req.params.id);

			if (!poll) {
				return next(new AppError("No poll found with that ID", 404));
			}

			res.status(201).json({
				status: "success",
				data: null,
			});
		}
	} else {
		return res.status(201).json({
			status: "fail",
		});
	}
});

exports.votePoll = catchAsync(async (req, res, next) => {
	const { currentUserId, selectedOption } = req.body;
	if (!selectedOption) {
		return next(new AppError("You must select an option.", 404));
	}

	const poll = await Poll.findById(req.params.id);
	if (!poll) {
		return next(new AppError("No poll found with that ID.", 404));
	}

	const optionToVote = poll.options.find(
		(option) => option._id.toString() === selectedOption
	);
	if (!optionToVote) {
		return next(
			new AppError("Selected option not found in the poll.", 400)
		);
	}

	const votedInPoll = optionToVote.votes.voters.includes(currentUserId);
	if (votedInPoll) {
		return next(new AppError("You have already voted in this poll", 400));
	}

	const optionId = optionToVote._id.toString();

	const update = {
		$inc: { [`options.$[elem].votes.quantity`]: 1 },
		$push: {
			[`options.$[elem].votes.voters`]: currentUserId,
		},
	};

	const optionsFilter = [{ "elem._id": optionId }];
	const updatedPoll = await Poll.findOneAndUpdate(
		{ _id: req.params.id },
		update,
		{ new: true, arrayFilters: optionsFilter }
	);

	if (!updatedPoll) {
		return next(new AppError("No poll found with that ID.", 404));
	}
	res.status(201).json({
		status: "success",
		data: {
			poll: updatedPoll,
		},
	});
});
