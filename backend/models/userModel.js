const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

// Defining the user schema
const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, "Please provide a email!"],
		unique: [true, "That email is already in use!"],
		lowecase: true,
		validate: [validator.isEmail, "Please provide a valid email!"],
	},
	password: {
		type: String,
		required: [true, "Please provide a password!"],
		minlength: [8, "The provided password is too weak!"],
		maxlength: [32, "The provided password is too large!"],
		select: false,
	},
	passwordConfirm: {
		type: String,
		required: [true, "Please confirm your password!"],
		validate: {
			// This only works on CREATE and SAVE!
			validator: function (el) {
				return el === this.password;
			},
			message: "The provided passwords are not the same!",
		},
	},
});

userSchema.pre("save", async function (next) {
	// Only run this function if password was actually modified
	if (!this.isModified("password")) return next();

	// Hash the password with cost of 12
	this.password = await bcrypt.hash(this.password, 12);

	// Don't save the confirmed password to the collection
	this.passwordConfirm = undefined;
	next();
});

userSchema.methods.correctPassword = async function (
	candidatePassword,
	userPassword
) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
