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

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

// Routes
app.use("/api/users", userRouter);
app.use("/api/polls", pollRouter);

// Handle all other routes that are not defined
app.all("*", (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global error handling middleware
app.use(globalErrorHandler);

module.exports = app;
