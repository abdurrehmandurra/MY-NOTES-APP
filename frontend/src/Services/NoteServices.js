import axios from "axios";

export default {
	getNotes() {
		return axios.get("/notes").then((res) => res.data);
	},

	addNote: (note) => {
		return fetch("/note", {
			method: "post",
			body: JSON.stringify(note),
			headers: {
				"Content-Type": "application/json",
			},
		}).then((response) => {
			if (response.status !== 401) {
				return response.json().then((data) => data);
			} else return { message: { msgBody: "UnAuthorized" }, msgError: true };
		});
	},

	deleteNote(id) {
		return axios
			.delete(`/note/${id}`)
			.then((res) => res.data)
			.then((data) => data);
	},

	getNote(id) {
		return axios.get(`/note/${id}`).then((res) => res.data);
	},

	updateNote(note, id) {
		console.log(note);
		return axios.post(`/note/${id}`, { note }).then((res) => res.data);
	},
};

// class Note {
// 	addNote = (note) => {
// 		return axios
// 			.post(
// 				"/note",
// 				{ note },
// 				{
// 					body: JSON.stringify(note),
// 					headers: {
// 						"Content-Type": "application/json",
// 					},
// 				}
// 			)
// 			.then((res) => res.data)
// 			.then((data) => console.log(data));
// 	};

// 	getNotes() {
// 		return axios.get("/notes").then((res) => res.data);
// 	}

// 	// getAllComplaints() {
// 	// 	return axios.get("/allcomplaints").then((res) => res.data);
// 	// }

// 	// deleteComplaint(id) {
// 	// 	return axios.delete("/complaint/" + id).then((res) => res.data);
// 	// }
// }

// export default new Note();
