const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const employeesRouter = require("./employees");
const ingredientsRouter = require("./ingredients");
const orderHistoryRouter = require("./orderHistory");

app.use(cors({
    origin: '*', // Dopuszcza wszystkie źródła
    methods: ['GET', 'POST'], // Dopuszcza tylko GET i POST
    allowedHeaders: ['Content-Type'] // Dozwala na nagłówek Content-Type
  }));
app.use(express.json()); 

app.get("/", (req, res) => {
	res.send(`
        <ol>
            <li><a href="/employees">Pracownicy</a></li>
            <li><a href="/ingredients">Składniki do sałatek</a></li>
            <li><a href="/orderHistory">Historia zamówień</a></li>
        </ol>
    `);
});

app.use("/employees", employeesRouter);
app.use("/ingredients", ingredientsRouter);
app.use("/orderHistory", orderHistoryRouter);

app.listen(port, () => {
	console.log(`Serwer działa na http://localhost:${port}`);
});
