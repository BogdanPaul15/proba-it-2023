const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
	res.status(201).json({
		message: "Merge",
	});
});

app.listen(3000, () => {
	console.log(`App is running at http://localhost:3000.`);
});
