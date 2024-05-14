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

function getIngredientById(id) {
	return new Promise((resolve, reject) => {
		fs.readFile(
		path.join(__dirname, "./database/ingredients.json"),
		(err, data) => {
			if (err) {
			console.error(err);
			reject("Wystąpił błąd podczas odczytywania bazy danych.");
			} else {
			const ingredients = JSON.parse(data);
			const ingredient = ingredients.find(ing => ing.id === parseInt(id, 10));
			if (ingredient) {
				resolve(ingredient);
			} else {
				reject("Nie znaleziono składnika oo podanym ID.");
			}
			}
		}
		);
	});
}

router.get("/:id", async (req, res) => {
	const { id } = req.params;
	try {
	  const ingredient = await getIngredientById(id);
	  res.json(ingredient);
	} catch (error) {
	  console.error(error);
	  res.status(404).send("Nie znaleziono składnika o podanym ID.");
	}
  });
  

module.exports = router;
