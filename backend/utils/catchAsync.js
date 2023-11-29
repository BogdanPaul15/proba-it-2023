// Catch the error and send it directly to the global error middleware
module.exports = (fn) => {
	return (req, res, next) => {
		fn(req, res, next).catch((err) => next(err));
	};
};
