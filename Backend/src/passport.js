const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const jwtStrategy = require("passport-jwt").Strategy;
const bcrypt = require("bcrypt");
const User = require("./database/User");

const cookieExtractor = (req) => {
	let token = null;
	if (req && req.cookies) {
		token = req.cookies["token"];
	}
	return token;
};

// Authorization
passport.use(
	new jwtStrategy(
		{
			jwtFromRequest: cookieExtractor,
			secretOrKey: "Noteapp",
		},
		(payload, done) => {
			User.findById({ _id: payload.sub }, (err, user) => {
				if (err) return done(err, false);
				if (user) return done(null, user);
				else return done(null, false);
			});
		}
	)
);

// Authentication local strategy using email and password
passport.use(
	new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
		User.findOne({ email }, (err, user) => {
			// something went wrong with database
			if (err) {
				return done(err);
			}
			// if no user exist
			if (!user) {
				return done(null, false);
			}
			// check if password is correct
			bcrypt.compare(password, user.password, (err, isMatch) => {
				if (err) throw err;

				if (isMatch) {
					return done(null, user, {
						message: "Incorrect Password",
					});
				}
			});
		});
	})
);
