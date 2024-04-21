const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// odczytywanie wszystkich zamówień
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

// odczytywanie zamówień dla danego klienta
router.get("/:clientId", (req, res) => {
	const clientId = parseInt(req.params.clientId, 10);
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

// dodawanie zamówienia do historii
router.use(express.json());

router.post("/:clientId", (req, res) => {
	const clientId = parseInt(req.params.clientId, 10);
	const newOrder = req.body;

	fs.readFile(
		path.join(__dirname, "./database/orderHistory.json"),
		(err, data) => {
			if (err) {
				console.error(err);
				res.status(500).send("Wystąpił błąd podczas odczytywania bazy danych.");
				return;
			}
			let orderHistory = JSON.parse(data);
			const clientOrderHistory = orderHistory.find(
				(item) => item.clientId === clientId
			);

			if (!clientOrderHistory) {
				res
					.status(404)
					.send("Nie znaleziono historii zamówień dla tego klienta.");
				return;
			}

			const newOrderId = clientOrderHistory.lastOrderId + 1;
			newOrder.orderId = newOrderId;

			clientOrderHistory.history.push(newOrder);
			clientOrderHistory.lastOrderId = newOrderId;

			fs.writeFile(
				path.join(__dirname, "./database/orderHistory.json"),
				JSON.stringify(orderHistory, null, 2),
				(err) => {
					if (err) {
						console.error(err);
						res
							.status(500)
							.send("Wystąpił błąd podczas zapisywania bazy danych.");
						return;
					}
					res.send("Nowe zamówienie dodane do historii.");
				}
			);
		}
	);
});

// przykład dla postowania zamowienia do historii

// fetch('http://localhost:3000/orderHistory/{{clientId}}', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//         orderId: 3,
//         date: "2024-04-22",
//         products: [
//             {
//                 id: 1,
//                 status: "new",
//                 title: "Sałatka Makaron pełnoziarnisty",
//                 shortDescription: "Makaron pełnoziarnisty\nPomidory\nKurczak\nSos winegret",
//                 price: 42,
//                 thumbnailUrl: "https://example.com/image.jpg"
//             }
//         ]
//     }),
// })

module.exports = router;
