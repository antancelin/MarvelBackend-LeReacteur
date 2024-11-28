// import des packages
const express = require("express");

// import du middleware
const isAuthenticated = require("../middleware/isAuthenticated");

// import du modèle
const Favorite = require("../models/Favorite");

// utiliation du 'Router'
const router = express.Router();

// CREATE => POST (enregistrement des favoris en base de données)
router.post("/favorites", isAuthenticated, async (req, res) => {
  try {
    const userId = req.user._id;
    const itemType = req.body.name ? "character" : "comic";
    const itemData = req.body;

    // recherche d'un favoris existant pour l'utilisateur connecté
    const existingFavorite = await Favorite.findOne({
      user: userId,
      type: itemType,
      body: itemData,
    });

    if (existingFavorite) {
      // si un favoris existe, on le supprime
      await Favorite.findByIdAndDelete(existingFavorite._id);
      res.status(200).json({ message: "Favoris supprimé" });
    } else {
      // sinon on le créé
      const newFavorite = new Favorite({
        body: itemData,
        type: itemType,
        user: userId,
      });

      await newFavorite.save();

      res.status(201).json(newFavorite);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// READ => GET (affichage des favoris d'un utilisateur)
router.get("/favorites", isAuthenticated, async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user._id });

    res.status(200).json(favorites);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
