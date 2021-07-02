import axios from "axios";

class AuthService {
	login(email, password) {
		return axios
			.post("/login", { email, password })
			.then((res) => res.data)
			.then((data) => data);
	}

	register(user) {
		return fetch("/register", {
			method: "post",
			body: JSON.stringify(user),
			headers: { "Content-Type": "application/json" },
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => data);
	}

	logout() {
		return axios
			.get("/logout")
			.then((res) => res.data)
			.then((data) => data);
	}

	isAuthenticated() {
		return fetch("/authenticated", {
			headers: { "Content-Type": "application/json" },
		}).then((res) => {
			if (res.status !== 401) {
				return res.json().then((data) => data);
			} else {
				return { isAuthenticated: false };
			}
		});
	}
}

export default new AuthService();
