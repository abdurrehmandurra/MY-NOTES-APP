import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	paper: {
		position: "absolute",
		width: 400,
		left: "35%",
		right: "50%",
		top: "20%",
		backgroundColor: theme.palette.background.paper,
		borderColor: "lightgray",
		// border: "2px solid #000",
		// boxShadow: theme.shadows[5],
		boxShadow: "0 0 4px rgb(160, 158, 158)",
		borderRadius: "5px",
		margin: "auto",
		padding: theme.spacing(2, 4, 3),
	},
}));

const Modall = (props) => {
	const classes = useStyles();
	const [note, setNote] = useState({ title: "", description: "" });

	const inputChangeHandler = (e) => {
		// console.log({ ...note, [e.target.name]: e.target.value });
		setNote({ ...note, [e.target.name]: e.target.value });
	};

	return (
		<div>
			<Modal
				open={props.open}
				onClose={props.close}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				<form className={classes.paper} onSubmit={props.submit}>
					<div className="form-group">
						<label htmlFor="recipient-name" className="col-form-label">
							Title
						</label>
						<input
							type="text"
							value={note.title}
							className="form-control"
							id="recipient-name"
							name="title"
							placeholder="Title"
							onChange={inputChangeHandler}
							// defaultValue={props.title}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="message-text" className="col-form-label">
							Description
						</label>
						<textarea
							name="description"
							className="form-control"
							id="message-text"
							value={note.description}
							placeholder="Description"
							onChange={inputChangeHandler}
							// defaultValue={props.description}
						></textarea>
					</div>
					<div className="ButtonBlock">
						<button type="submit" className="fas fa-plus" id="addBtn"></button>
					</div>
				</form>
			</Modal>
		</div>
	);
};

export default Modall;
