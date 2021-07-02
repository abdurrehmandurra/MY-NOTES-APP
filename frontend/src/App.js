import "./App.css";
import React, { useContext } from "react";
import Login from "./Pages/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import Register from "./Pages/Register/Register";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./Pages/Home/Home";
import { AuthContext } from "./Context/AuthContext";

function App() {
	const { isAuthenticated } = useContext(AuthContext);
	// const _id = user._id;

	return (
		<div>
			<Navbar />
			<Route exact path="/" component={Login} />
			{isAuthenticated ? (
				<Switch>
					<Route path="/home" component={Home} />
				</Switch>
			) : (
				<Switch>
					<Route path="/register" component={Register} />
					{/* <Redirect to="/" /> */}
				</Switch>
			)}
		</div>
	);
}

export default App;
