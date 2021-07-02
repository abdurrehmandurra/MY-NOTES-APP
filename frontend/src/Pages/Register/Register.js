import React, { useState } from "react";
import AuthService from "../../Services/AuthServices";
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
import Message from "../../Components/Message/Message";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%",
		marginTop: theme.spacing(3),
	},
	submit: {
		padding: "15px",
		margin: theme.spacing(1, 0, 2),
	},
}));

const Register = (props) => {
	const classes = useStyles();
	const [user, setUser] = useState({ email: "", username: "", password: "" });
	const [message, setMessage] = useState(null);

	const inputChangeHandler = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const Submit = (e) => {
		e.preventDefault();
		AuthService.register(user).then((data) => {
			// console.log(data);
			const { message } = data;
			setMessage(message);
			setTimeout(() => {
				setMessage(null);
				props.history.push("/");
			}, 1500);
		});
		setUser({ email: "", username: "", password: "" });
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
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
						id="username"
						label="Username"
						name="username"
						autoComplete="username"
						autoFocus
						onChange={inputChangeHandler}
						value={user.username}
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
						onChange={inputChangeHandler}
						value={user.password}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign Up
					</Button>
					<Grid container justify="flex-end">
						<Grid item>
							<Link to="/">Already have an account? Sign in</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
};

export default Register;
