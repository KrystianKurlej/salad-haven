const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.use(express.json());

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

// dodawanie nowego klienta
router.post("/", (req, res) => {
	const newOrderHistory = req.body;
  
	// Sprawdzenie, czy newOrderHistory i clientId istnieją
	if (!newOrderHistory ||!newOrderHistory.clientId) {
	  res.status(400).send("Brak wymaganych danych w ciele żądania.");
	  return;
	}
  
	fs.readFile(path.join(__dirname, "./database/orderHistory.json"), (err, data) => {
	  if (err) {
		console.error(err);
		res.status(500).send("Wystąpił błąd podczas odczytywania bazy danych.");
		return;
	  }
  
	  let orderHistory = JSON.parse(data);
	  const existingClient = orderHistory.find(item => item.clientId === newOrderHistory.clientId);
  
	  if (existingClient) {
		// Jeśli klient już istnieje, aktualizujemy jego historię
		existingClient.history.push(...newOrderHistory.history);
		res.send("Historia zamówień została zaktualizowana.");
	  } else {
		// Jeśli klient nie istnieje, dodajemy nowy obiekt do listy
		orderHistory.push(newOrderHistory);
		fs.writeFile(path.join(__dirname, "./database/orderHistory.json"), JSON.stringify(orderHistory, null, 2), err => {
		  if (err) {
			console.error(err);
			res.status(500).send("Wystąpił błąd podczas zapisywania bazy danych.");
			return;
		  }
		  res.send("Nowa historia zamówień została utworzona.");
		});
	  }
	});
  });

// odczytywanie zamówień dla danego klienta
router.get("/:clientId", (req, res) => {
	const clientId = req.params.clientId;
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
router.post("/:clientId", (req, res) => {
	const clientId = req.params.clientId;
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
  
		// Dodawanie nowego zamówienia do historii klienta
		const newOrderId = clientOrderHistory.history.length > 0? clientOrderHistory.history[clientOrderHistory.history.length - 1].orderId + 1 : 1;
		newOrder.orderId = newOrderId;
  
		clientOrderHistory.history.push(newOrder);
		clientOrderHistory.lastOrderId = newOrderId;
  
		fs.writeFile(
		  path.join(__dirname, "./database/orderHistory.json"),
		  JSON.stringify(orderHistory, null, 2),
		  (err) => {
			if (err) {
			  console.error(err);
			  res.status(500).send("Wystąpił błąd podczas zapisywania bazy danych.");
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
