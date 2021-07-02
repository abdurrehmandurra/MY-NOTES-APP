const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const app = express();

// const mongoURI =
// 	"mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false";

const URI = "mongodb://localhost:27017/MyNoteApp";

mongoose
	.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("Connected to Database........"))
	.catch((err) => console.log("Sorry can't connected to Database"));

// app.set("view engine", "ejs");
// app.use(express.static("css"));
// app.use(express.static("views"));
app.use(methodOverride("_method"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", require("./src/routes/User"));
app.use("/", require("./src/routes/Notes"));

const port = 1000;
app.listen(port, (err) => {
	if (err) {
		console.log("Sorry can't connect to server there might be a problem");
	} else {
		console.log(`Server Connected at Port : ${port}`);
	}
});
