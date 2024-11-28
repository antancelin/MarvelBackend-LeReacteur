// import des packages
const express = require("express");
const axios = require("axios");

// utiliation du 'Router'
const router = express.Router();

// READ => GET (récupération de tous les comics)
router.get("/comics", async (req, res) => {
  try {
    let limit = 100;

    // filtres
    let filters = "";
    if (req.query.title) {
      filters += `&title=${req.query.title}`;
    }
    if (req.query.limit) {
      limit = req.query.limit;
    }
    if (req.query.page) {
      filters += `&skip=${(req.query.page - 1) * limit}`;
    }

    const response = await axios.get(
      `${process.env.API_URL}/comics?apiKey=${process.env.API_KEY}${filters}&limit=${limit}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ => GET (récupération de tous les comics en fonction de l'ID d'un personnage commun)
router.get("/comics/:characterId", async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/comics/${req.params.characterId}?apiKey=${process.env.API_KEY}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ => GET (récupération d'un comic en fonction de son ID)
router.get("/comic/:comicId", async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/comic/${req.params.comicId}?apiKey=${process.env.API_KEY}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    es.status(500).json({ error: error.message });
  }
});

module.exports = router;
