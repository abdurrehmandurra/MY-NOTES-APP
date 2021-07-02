import React, { useState, useEffect } from "react";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import { Link } from "react-router-dom";
// import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
// import NoteCard from "../../Components/NoteCard/NoteCard";
import NoteServices from "../../Services/NoteServices";
import "./Home.css";
import Card from "../../Components/Card/Card";
import Message from "../../Components/Message/Message";
import Modal from "../../Components/Modal/Modal";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		// backgroundColor: "#ccc",
	},
}));

const Home = () => {
	const classes = useStyles();
	const [note, setNote] = useState({ title: "", description: "" });
	const [notes, setNotes] = useState([]);
	const [message, setMessage] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [getTitle, setTitle] = useState("");
	const [getDescription, setDescription] = useState("");
	const [getID, setID] = useState("");
	// const [newNote, setNewNote] = useState({
	// 	updateTitle: getTitle,
	// 	updateDescription: getDescription,
	// });

	const inputChangeHandler = (e) => {
		setNote({ ...note, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		NoteServices.getNotes().then((data) => {
			console.log(data);
			setNotes(data);
		});
	}, []);

	const submit = (e) => {
		e.preventDefault();
		if (note.title !== "" || note.description !== "") {
			NoteServices.addNote(note).then((data) => {
				console.log(data);
			});
			setNote({ title: "", description: "" });
			window.location.reload();
		}
	};

	const deleteNote = (id) => {
		NoteServices.deleteNote(id).then((data) => {
			const { message } = data;
			setMessage(message);
			setTimeout(() => {
				setMessage(null);
			}, 1000);
		});
		window.location.reload();
	};

	const editNote = (id) => {
		setShowModal(true);
		setID(id);
		NoteServices.getNote(id).then((data) => {
			console.log(data);
			setTitle(data.title);
			setDescription(data.description);
			console.log(data.title, data.description);
		});
		console.log(getTitle, getDescription);
	};

	const updateNote = (e) => {
		e.preventDefault();
		console.log(getID, note);
		// console.log(getTitle, getDescription);
		NoteServices.updateNote(note, getID).then((data) => console.log(data));
		setShowModal(false);
		// window.location.reload();
	};

	const closeModal = () => setShowModal(false);

	return (
		<Container component="main" maxWidth="md">
			{/* <CssBaseline /> */}
			<div className={classes.paper}>
				{/* <Typography component="h1" variant="h5"> */}
				<h1>MyNotes</h1>
				{/* </Typography> */}
				{/* <NoteCard submit={submit} title={note.title} description={note.description} /> */}
				<Modal
					// titleState={getTitle}
					// descriptionState={getTitle}
					submit={updateNote}
					open={showModal}
					close={closeModal}
					title={getTitle}
					description={getDescription}
				/>
				<div id="card">
					<div id="card-header-body">
						<form onSubmit={submit}>
							<input
								type="text"
								className="form-control form-control-lg"
								id="title"
								placeholder="Title"
								name="title"
								value={note.title}
								onChange={inputChangeHandler}
							/>
							<textarea
								placeholder="Take a note..."
								className="form-control form-control-lg"
								id="textNote"
								cols="30"
								rows="2"
								name="description"
								value={note.description}
								onChange={inputChangeHandler}
							></textarea>
							{/* <i className="fas fa-plus" id="addBtn"></i> */}
							<div className="ButtonBlock">
								<button type="submit" className="fas fa-plus" id="addBtn"></button>
							</div>
						</form>
					</div>
				</div>
				<div className="my-5">
					{message ? <Message>{message}</Message> : null}
					<div className="card-columns py-5">
						{notes.map((notes) => (
							<Card
								key={notes._id}
								title={notes.title}
								description={notes.description}
								time={new Date(notes.createdAt).getUTCMinutes()}
								click={() => deleteNote(notes._id)}
								Edit={() => editNote(notes._id)}
							/>
						))}
					</div>
				</div>
			</div>
		</Container>
	);
};

export default Home;
