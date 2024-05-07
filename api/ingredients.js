const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.get("/", (req, res) => {
	fs.readFile(
		path.join(__dirname, "./database/ingredients.json"),
		(err, data) => {
			if (err) {
				console.error(err);
				res.status(500).send("Wystąpił błąd podczas odczytywania bazy danych.");
				return;
			}
			const ingredients = JSON.parse(data);
			res.json(ingredients);
		}
	);
});

module.exports = router;
