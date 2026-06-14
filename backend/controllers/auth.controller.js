const db = require('../database');
const bcrypt = require('bcrypt');
const { v4: uuidv4} = require('uuid');
const jwt = require('jsonwebtoken');


async function register(req, res) {
	const { pseudo, email, mot_de_passe } = req.body;

	if (!pseudo || !email || !mot_de_passe)
		return res.status(400).json({ message: 'Tous les champs sont requis' });

	db.query('SELECT * FROM utilisateur WHERE email = ?', [email], async (err, results) => {
		if (err)
			return res.status(500).json({ message: err.message });
		
		if (results.length > 0)
			return res.status(400).json({message: 'Email déjà enregistré' });

		const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
		const public_id = uuidv4();

		const sql = 'INSERT INTO utilisateur (public_id, pseudo, email, mot_de_passe) VALUES (?, ?, ?, ?)';
		db.query(sql, [public_id, pseudo, email, hashedPassword], err => {
			if (err) {
				console.error('Database error2:', err);
				return res.status(500).json({ message: 'err.message '});
			}

			res.json({ message: 'Utilisateur enregistré!' });
		});
	});
}

async function login(req, res) {
	const { email, mot_de_passe } = req.body;

	if (!email || !mot_de_passe)
		return res.status(400).json({ message: 'Tous les champs sont requis'});

	db.query('SELECT * FROM utilisateur WHERE email = ?', [email], async (err, results) => {
		if (err)
			return res.status(500).json({ message: 'Database error' });

		if (results.length === 0)
			return res.status(404).json({ message: 'Utilisateur introuvable'});

		const user = results[0];
		const validPassword = await bcrypt.compare(mot_de_passe, user.mot_de_passe);

		if(!validPassword)
			return res.status(401).json({ message: 'Mot de passe incorrect'});

		const token = jwt.sign(
			{ id: user.id_utilisateur , email: user.email },
			process.env.SECRET_KEY,
			{ expiresIn: '1h' }
		);
		res.json({ message: 'Connexion réussie', token});
	});
}


module.exports = {
	register,
	login
};