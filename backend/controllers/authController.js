const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const signToken = (id) => {
	// Sign the jwt token with the current id
	return jwt.sign(
		{
			id: id,
		},
		process.env.JWT_SECRET,
		{
			expiresIn: process.env.JWT_EXPIRES_IN,
		}
	);
};

const createSendToken = (user, statusCode, res) => {
	// Create the jwt token
	const token = signToken(user._id);

	// Calculate expiration time in UTC + 2 (because Romania is at UTC + 2 and my mongo server is at UTC)
	const expirationTime =
		Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000;
	const expirationTimeUTC2 = expirationTime + 2 * 60 * 60 * 1000; // UTC + 2

	const cookieOptions = {
		expires: new Date(expirationTimeUTC2),
		origin: true,
		credentials: true,
		httpOnly: true,
	};

	// Add the jwt token to the cookies
	if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
	res.cookie("jwt", token, cookieOptions);

	// Don't send the hashed password along with the response
	user.password = undefined;

	// Send the jwt token wrapped in a cookie along with the user information
	res.status(statusCode).json({
		status: "success",
		token,
		data: {
			user,
		},
	});
};

exports.register = catchAsync(async (req, res, next) => {
	// Create a new user based on the received data
	const newUser = await User.create({
		email: req.body.email,
		password: req.body.password,
		passwordConfirm: req.body.passwordConfirm,
	});

	// Handle req data
	if (!newUser) {
		return next(new AppError("Incorrect email or password!", 401));
	}

	// Don't send the hashed password along with the response
	newUser.password = undefined;

	// Send the user info attached to the response if he was succesfully registered
	res.status(201).json({
		status: "success",
		data: {
			newUser,
		},
	});
});

exports.login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	// Check if email and password exists
	if (!email || !password) {
		return next(new AppError("Please provide email or password!", 400));
	}

	// Check if user exists and provided password is correct
	const user = await User.findOne({
		email: email,
	}).select("+password");

	// Check if the provided plain password is the same as the encrypted password
	if (!user || !(await user.correctPassword(password, user.password))) {
		return next(new AppError("Incorrect email or password!", 401));
	}

	// If everything is ok, send the token to client
	createSendToken(user, 200, res);
});

exports.logout = (req, res) => {
	// Get the current time (Romania is at UTC + 2)
	const expirationTimeUTC2 = Date.now() + 2 * 60 * 60 * 1000 + 10 * 1000; // UTC + 2

	// Sending fake token to the client that expires 10 seconds later
	res.cookie("jwt", "loggedout", {
		expires: new Date(expirationTimeUTC2),
		httpOnly: true,
		origin: true,
		credentials: true,
		httpOnly: true,
	});

	res.status(200).json({
		data: {
			status: "success",
		},
	});
};

exports.checkToken = catchAsync(async (req, res) => {
	if (req.cookies.jwt && req.cookies.jwt !== "loggedout") {
		// Check if token is valid
		const decoded = await promisify(jwt.verify)(
			req.cookies.jwt,
			process.env.JWT_SECRET
		);

		// Check if user still exists
		const currentUser = await User.findById(decoded.id);
		if (currentUser) {
			// Send the id of that token
			return res.status(201).json({
				status: "success",
				id: decoded.id,
			});
		} else {
			return next(new AppError("User does not exists!", 401));
		}
	} else {
		return res.status(201).json({
			status: "fail",
		});
	}
});
