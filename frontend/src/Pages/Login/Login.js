import React, { useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { AuthContext } from "../../Context/AuthContext";
import AuthService from "../../Services/AuthServices";
import Message from "../../Components/Message/Message";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		// backgroundColor: "#ccc",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%",
		marginTop: theme.spacing(1),
	},
	submit: {
		padding: "15px",
		margin: theme.spacing(1, 0, 2),
	},
}));

const Login = (props) => {
	const classes = useStyles();

	const [user, setUser] = useState({ email: "", password: "" });
	const [message, setMessage] = useState(null);
	const authContext = useContext(AuthContext);

	const inputChangeHandler = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const Submit = (e) => {
		e.preventDefault();
		AuthService.login(user.email, user.password).then((data) => {
			console.log(data);
			const { isAuthenticated, user } = data;
			if (isAuthenticated) {
				authContext.setUser(user);
				authContext.setIsAuthenticated(isAuthenticated);
				setMessage("Login Successful");
				setTimeout(() => {
					setMessage(null);
					props.history.push("/home");
				}, 1500);
			}
		});
		setUser({ ...user, email: "", password: "" });
	};
	return (
		<div>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<form className={classes.form} noValidate onSubmit={Submit}>
						{message ? <Message>{message}</Message> : null}
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							type="email"
							id="email"
							label="Email"
							name="email"
							autoComplete="email"
							autoFocus
							value={user.email}
							onChange={inputChangeHandler}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							value={user.password}
							onChange={inputChangeHandler}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Sign In
						</Button>
						<Grid container justify="flex-end">
							<Grid item>
								<Link to="/register">Don't have an account? Sign Up</Link>
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>
		</div>
	);
};

export default Login;
