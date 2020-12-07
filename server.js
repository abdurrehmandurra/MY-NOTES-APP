const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const notes = require("./database/noteDB");
const app = express();
const mongoURI =
	"mongodb+srv://mass_4367:mass_4367@portfoliodb.qwvm4.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority";

mongoose
	.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("Connected to Database........"))
	.catch((err) => console.log("Sorry can't connected to Database"));

app.set("view engine", "ejs");
app.use(express.static("css"));
app.use(express.static("views"));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Display Note Route
app.get("/", (req, res) => {
	notes.find({}, (err, allnotes) => {
		if (err) {
			return res.json({ err: err });
		} else {
			res.render("index", { notes: allnotes });
		}
	});
	// res.render("index");
});

// Post Note Route
app.post("/", (req, res) => {
	console.log(req.body);
	const note = new notes({
		title: req.body.title,
		note: req.body.note,
	});
	if (note.title != "" && note.note != "") {
		note.save();
		console.log("data save");
		res.redirect("/");
	} else if (note.title != "" || note.note != "") {
		note.save();
		console.log("data save");
		res.redirect("/");
	} else {
		console.log("not saved");
		res.redirect("/");
	}
});

// Delete Note Route
app.delete("/:id", (req, res) => {
	notes.findByIdAndDelete({ _id: req.params.id }, (err, noteDeleted) => {
		if (err) {
			return res.json({ err: err });
		} else {
			res.redirect("/");
		}
	});
});

// Edit Note Route
app.get("/:id/edit", (req, res) => {
	notes.findById(req.params.id, (err, noteFound) => {
		if (err) {
			res.json({ err: "Error" });
		} else {
			res.render("edit", { notes: noteFound });
		}
	});
});

app.put("/:id", (req, res) => {
	let textAreaOutput = req.body.note;
	textAreaOutput = textAreaOutput;
	console.log(req.body);
	notes.findByIdAndUpdate(
		{ _id: req.params.id },
		{ title: req.body.title, note: textAreaOutput },
		(err, edited) => {
			if (err) {
				res.json({ err: "sorry can't updated note" });
			} else {
				res.redirect("/");
			}
		}
	);
});

const port = 1000;
app.listen(port, (err) => {
	if (err) {
		console.log("Sorry can't connect to server there might be a problem");
	} else {
		console.log(`Server Connected at Port : ${port}`);
	}
});
