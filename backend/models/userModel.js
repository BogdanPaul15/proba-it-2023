const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Defining the user schema
const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, "Please provide a email!"],
		unique: true,
		lowecase: true,
		validate: {
			validator: function (el) {
				// Use a regex to check if the email ends with @gmail.com
				return /\b[A-Za-z0-9._%+-]+@gmail\.com\b/.test(el);
			},
			message: "The field must end in @gmail.com!",
		},
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

// Hash the password using 'bcrypt'
userSchema.pre("save", async function (next) {
	// Only run this function if password was actually modified
	if (!this.isModified("password")) return next();

	// Hash the password with cost of 12
	this.password = await bcrypt.hash(this.password, 12);

	// Don't save the confirmed password to the collection
	this.passwordConfirm = undefined;
	next();
});

// Check plain password with encrypted password
userSchema.methods.correctPassword = async function (
	candidatePassword,
	userPassword
) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
