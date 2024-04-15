const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const employeesRouter = require("./employees");
const ingridientsRouter = require("./ingridients");

app.use(cors());

app.get("/", (req, res) => {
	res.send(`
        <ol>
            <li><a href="/employees">Pracownicy</a></li>
            <li><a href="/ingridients">Składniki do sałatek</a></li>
        </ol>
    `);
});

app.use("/employees", employeesRouter);
app.use("/ingridients", ingridientsRouter);

app.listen(port, () => {
	console.log(`Serwer działa na http://localhost:${port}`);
});
