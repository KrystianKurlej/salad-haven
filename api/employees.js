const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.get("/", (req, res) => {
	fs.readFile(
		path.join(__dirname, "./database/employees.json"),
		(err, data) => {
			if (err) {
				console.error(err);
				res.status(500).send("Wystąpił błąd podczas odczytywania bazy danych.");
				return;
			}
			const employees = JSON.parse(data);
			res.json(employees);
		}
	);
});

module.exports = router;
