const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
	title: String,
	note: String,
});

module.exports = mongoose.model("notes", noteSchema);
