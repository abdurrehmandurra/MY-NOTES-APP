const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
	email: { type: String, required: true },
	username: { type: String, required: true },
	password: { type: String, required: true },
	notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
	createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", User);
