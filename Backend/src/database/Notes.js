const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
	title: { type: String },
	description: { type: String },
	postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Note", noteSchema);
