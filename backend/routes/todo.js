const express = require("express")
const router = express.Router()
const db = require('../database');

// Creer un todo
router.post('/', (req, res) => {
  const { title } = req.body;
  const { description } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Le titre est obligatoire' });
  }

  db.query('INSERT INTO to_do (titre, description, id_utilisateur) VALUES (?, ?, ?)', [title, description, 1], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Todo créé', id: result.insertId, "titre du todo": title, "description du todo": description });
  });
});


module.exports = router;