const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.get("/", (req, res) => {
	fs.readFile(
		path.join(__dirname, "./database/orderHistory.json"),
		(err, data) => {
			if (err) {
				console.error(err);
				res.status(500).send("Wystąpił błąd podczas odczytywania bazy danych.");
				return;
			}
			const orderHistory = JSON.parse(data);
			res.json(orderHistory);
		}
	);
});

router.get("/:clientId", (req, res) => {
	const clientId = parseInt(req.params.clientId);
	fs.readFile(
		path.join(__dirname, "./database/orderHistory.json"),
		(err, data) => {
			if (err) {
				console.error(err);
				res.status(500).send("Wystąpił błąd podczas odczytywania bazy danych.");
				return;
			}
			const orderHistory = JSON.parse(data);
			const clientOrderHistory = orderHistory.find(
				(item) => item.clientId === clientId
			);
			if (clientOrderHistory) {
				res.json(clientOrderHistory.history);
			} else {
				res
					.status(404)
					.send("Nie znaleziono historii zamówień dla tego klienta.");
			}
		}
	);
});

module.exports = router;
