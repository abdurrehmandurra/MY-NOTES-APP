import React, { useContext, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import AuthService from "../../Services/AuthServices";
import { AuthContext } from "../../Context/AuthContext";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	title: {
		flexGrow: 1,
		textTransform: "capitalize",
		fontSize: "30px",
		fontWeight: "800",
	},
	Link: {
		fontWeight: "500",
		fontSize: "18px",
		color: "white",
		textDecoration: "none",
	},
}));

const Navbar = (props) => {
	const classes = useStyles();
	const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);
	const onClickLogoutHandler = () => {
		AuthService.logout().then((data) => {
			if (data.success) {
				setUser(data.user);
				setIsAuthenticated(false);
				props.history.push("/");
			}
		});
	};

	const unauthenticatedNavBar = () => {
		return (
			<>
				<Link to="/" style={{ textDecoration: "none" }}>
					<Button className={classes.Link} color="inherit">
						Login
					</Button>
				</Link>
				<Link to="/register" style={{ textDecoration: "none" }}>
					<Button className={classes.Link} color="inherit">
						Register
					</Button>
				</Link>
			</>
		);
	};

	const authenticatedNavBar = () => {
		return (
			<>
				<Link to="/home" style={{ textDecoration: "none" }}>
					<Button className={classes.Link} color="inherit">
						Home
					</Button>
				</Link>
				<Button
					type="button"
					className={classes.Link}
					onClick={onClickLogoutHandler}
					color="inherit"
				>
					Logout
				</Button>
			</>
		);
	};

	// const Title = !isAuthenticated ? "My Notes" : user.username;
	return (
		<div className={classes.root}>
			<AppBar position="sticky">
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						My Notes
					</Typography>
					{!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default withRouter(Navbar);
