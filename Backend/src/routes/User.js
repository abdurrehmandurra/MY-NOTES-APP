const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const User = require("../database/User");

const signToken = (userID) => {
	return JWT.sign(
		{
			iss: "Noteapp",
			sub: userID,
		},
		"Noteapp",
		{ expiresIn: "24h" }
	);
};

// Login Route
router.post("/login", passport.authenticate("local", { session: false }), (req, res) => {
	if (req.isAuthenticated()) {
		const { _id, email, username } = req.user;
		const token = signToken(_id);
		res.cookie("token", token, { httpOnly: true, sameSite: true });
		res.status(200).json({ isAuthenticated: true, user: { _id } });
	}
});

// Register User
router.post("/register", (req, res) => {
	const { email, username, password } = req.body;
	User.findOne({ email }, (err, user) => {
		if (err) res.status(500).json({ message: "Error has occured" });
		if (user)
			res.status(400).json({
				message: "This email is already register",
			});
		else {
			const newUser = new User({
				email,
				username,
				password,
			});
			// console.log(newUser);
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) console.log(err);
					newUser.password = hash;
					newUser.save((err) => {
						if (err) {
							res.status(500).json({
								message: "Error has occured",
							});
						} else {
							res.status(200).json({
								message: "Account successfully created",
							});
						}
					});
				});
			});
		}
	});
});

router.get("/logout", passport.authenticate("jwt", { session: false }), (req, res) => {
	res.clearCookie("token");
	res.json({ success: true });
});

router.get("/authenticated", passport.authenticate("jwt", { session: false }), (req, res) => {
	const { _id, email, username } = req.user;
	res.status(200).json({ isAuthenticated: true, user: { username } });
});

module.exports = router;
