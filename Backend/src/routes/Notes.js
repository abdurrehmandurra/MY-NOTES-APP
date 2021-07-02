const express = require("express");
const passport = require("passport");
const Notes = require("../database/Notes");
const router = express.Router();
const User = require("../database/User");

// Display Note Route
router.get("/notes", passport.authenticate("jwt", { session: false }), (req, res) => {
	Notes.find({ postedBy: req.user._id }, (err, notes) => {
		if (err) {
			return res.json({ err: err });
		} else {
			res.json(notes);
			// res.render("index", { notes: allnotes });
		}
	});
});

// Post Note Route
router.post("/note", passport.authenticate("jwt", { session: false }), (req, res) => {
	const newNote = new Notes({
		title: req.body.title,
		description: req.body.description,
		postedBy: req.user._id,
	});
	// console.log(newNote);
	if (newNote.title === "" || newNote.note === "") {
		// 	note.save();
		// 	console.log("data save");
		// } else if (note.title != "" || note.note != "") {
		// 	note.save();
		// 	console.log("data save");
		// } else {
		// 	console.log("not saved");
		// }
		return res.status(400).json({ message: "Fill one of the field" });
	} else {
		newNote.save((err) => {
			if (err) {
				res.status(500).json({
					message: "Note not added",
				});
			} else {
				req.user.notes.push(newNote);
				req.user.save((err) => {
					if (err)
						res.status(500).json({
							message: "Error has occured",
						});
					else
						res.status(200).json({
							message: "Successfully added",
						});
				});
			}
		});
	}
});

// Delete Note Route
router.delete("/note/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
	Notes.deleteOne({ _id: req.params.id }, (err, deleted) => {
		if (err) {
			res.status(500).json({
				message: "Note is not deleted",
			});
		} else {
			User.updateOne(
				{ _id: req.user._id },
				{ $pull: { notes: req.params.id } },
				(err, deleted) => {
					if (err) {
						res.status(500).json({ message: "Note not deleted" });
					} else {
						res.status(200).json({
							message: "Note successfully deleted",
						});
					}
				}
			);
		}
	});
});

// Edit Note Route
router.get("/note/:id", (req, res) => {
	Notes.findById(req.params.id, (err, note) => {
		if (err) {
			res.json({ err: "Error" });
		} else {
			res.json(note);
			// res.render("edit", { notes: noteFound });
		}
	});
});

router.put("/editnote/:id", (req, res) => {
	console.log(req.body);
	Notes.findByIdAndUpdate(
		{ _id: req.params.id },
		{ title: req.body.title, description: req.body.description },
		(err, edited) => {
			if (err) {
				res.json({ err: "sorry can't updated note" });
			} else {
				res.json({ message: "updated" });
			}
			console.log(edited);
		}
	);
});

router.post("/note/:id", (req, res) => {
	console.log(req.body);

	Notes.findById(req.params.id)
		.then((note) => {
			title = req.body.title;
			description = req.body.description;
			note
				.save()
				.then(() => res.json("Note Updated"))
				.catch((err) => res.status(400).json("Error :" + err));
		})
		.catch((err) => res.status(400).json("Error :" + err));
	// Notes.findByIdAndUpdate(
	// 	{ _id: req.params.id },
	// 	{ title: req.body.title, description: req.body.description },
	// 	(err, edited) => {
	// 		if (err) {
	// 			res.json({ err: "sorry can't updated note" });
	// 		} else {
	// 			res.json({ message: "updated" });
	// 		}
	// 		console.log(edited);
	// 	}
	// );
	// Notes.save();
});

module.exports = router;
