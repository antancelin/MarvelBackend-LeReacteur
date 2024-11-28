// import des packages
const express = require("express");
const axios = require("axios");

// utiliation du 'Router'
const router = express.Router();

// READ => GET (récupération de tous les personnages)
router.get("/characters", async (req, res) => {
  try {
    let limit = 100;

    // filtres
    let filters = "";
    if (req.query.name) {
      filters += `&name=${req.query.name}`;
    }
    if (req.query.limit) {
      limit = req.query.limit;
    }
    if (req.query.page) {
      filters += `&skip=${(req.query.page - 1) * limit}`;
    }

    const response = await axios.get(
      `${process.env.API_URL}/characters?apiKey=${process.env.API_KEY}${filters}&limit=${limit}`
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ => GET (récupération d'un peronnage en fonction de son ID)
router.get("/character/:characterId", async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/character/${req.params.characterId}?apiKey=${process.env.API_KEY}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
