const express = require("express")
const db = require("./database"); //import de la BDD
const cors = require("cors");
const port = process.env.PORT || 5000

const app = express();

app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
//Middleware qui permet de traiter les données de ma Request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/todos", require("./routes/todo"));
app.use("/auth", require ("./routes/auth"));


app.get("/", (req, res) => {
	res.send("Hello World !")
})

app.listen(port, () => {
	console.log("Serveur est en ligne !");
})