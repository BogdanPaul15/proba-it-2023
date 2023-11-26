const mongoose = require("mongoose");

// Defining the poll schema
const pollSchema = new mongoose.Schema({
	question: {
		type: String,
		required: [true, "Please provide a question for the poll."],
	},
	created_by: String,
	options: {
		option1: {
			name: {
				type: String,
				required: [true, "Please provide your first option."],
			},
			votes: {
				quantity: {
					type: Number,
					default: 0,
				},
				voted_by: [String],
			},
		},
		option2: {
			name: {
				type: String,
				required: [true, "Please provide your second option."],
			},
			votes: {
				quantity: {
					type: Number,
					default: 0,
				},
				voted_by: [String],
			},
		},
		option3: {
			name: {
				type: String,
				required: [true, "Please provide your third option."],
			},
			votes: {
				quantity: {
					type: Number,
					default: 0,
				},
				voted_by: [String],
			},
		},
	},
});

const Poll = mongoose.model("Poll", pollSchema);

module.exports = Poll;
