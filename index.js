// import des packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// va chercher mes variables dans mon '.env'
require("dotenv").config();

// création du serveur
const app = express();
// port utilisé pour faire tourner le serveur
const port = process.env.PORT;

// connexion/création de la BDD
mongoose.connect(process.env.MONGODB_URI);

// import des routes
const charactersRoute = require("./routes/characters");
const comicsRoute = require("./routes/comics");
const userRoute = require("./routes/user");
const userFavorites = require("./routes/favorites");

app.use(cors());
// permet de lire les 'body' dans les requêtes
app.use(express.json());

// utilisation des routes
app.use(charactersRoute);
app.use(comicsRoute);
app.use(userRoute);
app.use(userFavorites);

app.get("/", (req, res) => {
  try {
    res.status(200).json({ message: "Bienvenue sur le site Marvel" });
  } catch (error) {
    res.status(500).json({ message: error.response });
  }
});

app.all("*", (req, res) => {
  try {
    res.status(404).json({ message: "Page not found" });
  } catch (error) {
    res.status(500).json({ message: error.response });
  }
});

app.listen(port, () => {
  console.log("Server has started... 🌍");
});
