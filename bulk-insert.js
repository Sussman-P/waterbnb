import { faker } from "@faker-js/faker";
import pg from "pg";
import fs from "fs";

const db = new pg.Pool({
	connectionString: "postgres://localhost/waterbnb",
});

const writableStream = fs.createWriteStream("data.csv");

await db.query(`DELETE FROM users`);

for (let i = 0; i < 1_000; i++) {
	const username = faker.internet.userName();
	const email = faker.internet.email();
	const password = faker.internet.password();
	writableStream.write(`${username}, ${email}, ${password}\n`);
}

writableStream.close();
db.end();

await db.query(
	`COPY users (username, email, password) FROM '/Users/phillip/Code/SDC/waterbnb/data.csv' WITH DELIMITER ',' CSV`
);
