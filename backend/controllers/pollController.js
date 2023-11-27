const Poll = require("../models/pollModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllPolls = catchAsync(async (req, res, next) => {
	const polls = await Poll.find();
	// console.log(polls);
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
	const newPoll = await Poll.create({
		question: req.body.question,
		options: {
			option1: {
				name: req.body.options.option1.name,
				votes: {
					voted_by: req.body.options.option1.votes.voted_by,
				},
			},
			option2: {
				name: req.body.options.option2.name,
				votes: {
					voted_by: req.body.options.option2.votes.voted_by,
				},
			},
			option3: {
				name: req.body.options.option3.name,
				votes: {
					voted_by: req.body.options.option3.votes.voted_by,
				},
			},
		},
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
	// console.log(selectedOption);
	if (!selectedOption) {
		return next(new AppError("You must select an option.", 404));
	}
	const option = `options.${selectedOption}.votes.quantity`;
	const poll = await Poll.findById(req.params.id);
	if (!poll) {
		return next(new AppError("No poll found with that ID.", 404));
	}
	const votedInPoll = Object.values(poll.options).some((option) =>
		option.votes.voted_by.includes(currentUserId)
	);
	if (votedInPoll) {
		// return res
		// 	.status(400)
		// 	.json({ message: "You have already voted in this poll" });
		return next(new AppError("You have already voted in this poll", 400));
	}
	const updatedPoll = await Poll.findByIdAndUpdate(
		req.params.id,
		{
			$inc: { [option]: 1 },
			$push: {
				[`options.${selectedOption}.votes.voted_by`]: currentUserId,
			},
		},
		{ new: true }
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
