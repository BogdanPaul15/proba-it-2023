const express = require("express");
const morgan = require("morgan");
const AppError = require("./utils/appError");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const globalErrorHandler = require("./controllers/errorController");

// Importing routers
const userRouter = require("./routes/userRoutes");
const pollRouter = require("./routes/pollRoutes");

const app = express();

// Defining Middlewares

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

// Test middleware
app.use((req, res, next) => {
	console.log(req.cookies);
	next();
});

// Routes
app.use("/api/users", userRouter);
app.use("/api/polls", pollRouter);

app.all("*", (req, res, next) => {
	// Skip all middlewares
	next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
