const db = require('../database');

function addTodo(req, res) {
	const { title, description } = req.body;

	if (!title) {
		return res.status(400).json({message: 'Le titre est obligatoire'});
	}

	const public_id = req.user.id;
	db.query('INSERT INTO to_do (titre, description, Id_utilisateur) VALUES (?, ?, ?)', [title, description, public_id], (err, result) => {
		console.log('Erreur SQL:', err);
		if (err) return res.status(500).json({ error: err.message });
		res.status(201).json({ message: 'Todo créé', id: result.insertId, "titre du todo": title, "description du todo": description });
	});
}

function getAllTodos(req, res) {
	const public_id = req.user.id;
	
	db.query('SELECT * FROM to_do WHERE Id_utilisateur = ?', [public_id], (err, result) => {
		if (err) return res.status(500).json({ error: err.message });
		res.status(200).json(result);
	});
}

function getTodo(req, res) {
	const { title } = req.query;
	const public_id = req.user.id;

	if (!title) {
		return res.status(400).json({message: 'Le titre est obligatoire'});
	}
	db.query('SELECT * FROM to_do WHERE titre = ? AND Id_utilisateur = ?'[title], (err, result) => {
		if (err) return res.status(500).json({error: err.message});
		if (result.length === 0) return res.status(404).json({ message: 'Todo non trouvé' });
		res.status(200).json(result);
	});
}

function deleteTodo(req, res) {
	const { id } = req.params;
	const public_id = req.user.id;

	db.query('DELETE FROM to_do WHERE id_todo = ? AND Id_utilisateur= ?', [id, public_id], (err, result) => {
		if (err) return res.status(500).json({error: err.message});
		if (result.affectedRows === 0) return res.status(404).json({ message: 'Todo non trouvé' });
		res.status(200).json({message: 'Todo supprimé avec succès!'});
	});
}


function editTodo(req, res) {
	const { id } = req.params;
	const public_id = req.user.id;

	db.query('UPDATE to_do SET ? WHERE id_todo = ? AND Id_utilisateur = ?', [req.body, id, public_id], (err, result) => {
		if (err) return res.status(500).json({error: err.message});
		if (result.affectedRows === 0) return res.status(404).json({ message: 'vous devez remplir' });
		res.status(200).json({message: 'Todo modifié avec succès!'});
	});
}


module.exports = {
	addTodo,
	getAllTodos,
	getTodo,
	deleteTodo,
	editTodo
};
