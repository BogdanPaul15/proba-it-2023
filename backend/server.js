// Imported all required packages
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");

// Replacing '<password>' in the DATABASE connection string using env variables
const DB = process.env.DATABASE.replace(
	"<password>",
	process.env.DATABASE_PASSWORD
);

// Connect to the mongodb
mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Database is running."));

// Running the server
const port = process.env.PORT;
app.listen(port, () => {
	console.log(`App is running at http://localhost:${port}.`);
});
