const mongoose = require("mongoose");

// Defining the option schema
const optionSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please provide the option name!"],
	},
	votes: {
		quantity: {
			type: Number,
			default: 0,
		},
		voters: {
			type: [String],
			default: [],
		},
	},
});

// Defining the poll schema
const pollSchema = new mongoose.Schema({
	question: {
		type: String,
		required: [true, "Please provide a question for the poll!"],
	},
	created_by: String,
	options: [optionSchema],
});

// Get all the voters from the current poll by iterating over voters from all options
pollSchema.virtual("voters").get(function () {
	let allVoters = [];
	this.options.forEach((option) => {
		allVoters = allVoters.concat(option.votes.voters);
	});
	return allVoters;
});

// Get all the votes from the current poll by iterating over votes from all options
pollSchema.virtual("total_votes").get(function () {
	let totalVotes = 0;
	this.options.forEach((option) => {
		totalVotes += option.votes.quantity;
	});
	return totalVotes;
});

pollSchema.set("toJSON", { virtuals: true });

const Poll = mongoose.model("Poll", pollSchema);

module.exports = Poll;
