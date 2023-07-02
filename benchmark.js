import http from "k6/http";
import { sleep } from "k6";

let username = "whatever";

export default function () {
	const counter = Math.floor(Math.random() * 1000000);
	const payload = JSON.stringify({
		username: username + counter,
		email: `${username}${counter}@gmail.com`,
		password: "asdsadfsaf",
	});

	const params = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	http.post("http://localhost:3000/api/signup", payload, params);
}

export const options = {
	vus: 10,
	duration: "5s",
	httpDebug: "full",
};
