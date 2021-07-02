import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		// backgroundColor: "#ccc",
	},
	form: {
		width: "100%",
		marginTop: theme.spacing(2),
		// backgroundColor: "red",
		"& .MuiOutlinedInput-root": {
			borderRadius: "0",
			backgroundColor: "white",
			margin: "0",
		},
		"& .makeStyles-form-38 .MuiFormControl-marginNormal": {
			margin: "0",
		},
		"& .MuiFormControl-marginNormal": {
			margin: "0",
		},

		"& .MuiFormControl-marginNormal": {
			border: "none",
		},
		"& .MuiOutlinedInput-notchedOutline": {
			border: "none",
		},
	},
	textArea: {
		marginBottom: theme.spacing(0),
		border: "none",
	},
	submit: {
		padding: "15px",
		margin: theme.spacing(1, 0, 2),
	},
}));

const NoteCard = (props) => {
	const classes = useStyles();
	const [note, setNote] = useState({ title: "", description: "" });

	const inputChangeHandler = (e) => {
		setNote({ [e.target.name]: e.target.value });
	};

	return (
		// <div class="container">
		// <form className={classes.form} noValidate>
		// 	{/* {message ? <Message message={message} /> : null} */}
		// 	<TextField
		// 		variant="outlined"
		// 		margin="normal"
		// 		required
		// 		fullWidth
		// 		type="email"
		// 		id="email"
		// 		label="Email"
		// 		name="email"
		// 		autoComplete="email"
		// 		autoFocus
		// 		// onChange={inputChangeHandler}
		// 	/>
		// 	<TextField
		// 		className={classes.textArea}
		// 		label="Enter Description Here ..."
		// 		name="description"
		// 		rows={4}
		// 		fullWidth
		// 		multiline
		// 		variant="outlined"
		// 		// onChange={inputChangeHandler}
		// 	/>
		// 	<Button
		// 		type="submit"
		// 		fullWidth
		// 		variant="contained"
		// 		color="primary"
		// 		className={classes.submit}
		// 	>
		// 		Sign In
		// 	</Button>
		// </form>
		<div>
			<div className="row">
				<div className="col">
					<h1>MyNotes</h1>
					<section id="edit-card-section"></section>
					<div id="card">
						<div id="card-header-body">
							<form onSubmit={props.submit}>
								<input
									type="text"
									className="form-control form-control-lg"
									id="title"
									placeholder="Title"
									name={props.title}
									onChange={inputChangeHandler}
								/>
								<textarea
									placeholder="Take a note..."
									className="form-control form-control-lg"
									id="textNote"
									cols="30"
									rows="2"
									name={props.description}
									onChange={inputChangeHandler}
								></textarea>
								<i className="fas fa-plus" id="addBtn"></i>
								<button type="submit">Add</button>
							</form>
						</div>
					</div>
					<small>You must complete at least one field</small>
				</div>
			</div>
			<section id="section"></section>
		</div>
	);
};

export default NoteCard;
