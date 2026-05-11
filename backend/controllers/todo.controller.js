const db = require('../database');

function addTodo(req, res) {
	const { title, description } = req.body;

	if (!title) {
		return res.status(400).json({message: 'Le titre est obligatoire'});
	}

	db.query('INSERT INTO to_do (titre, description, id_utilisateur) VALUES (?, ?, ?)', [title, description, 1], (err, result) => {
		if (err) return res.status(500).json({ error: err.message });
		res.status(201).json({ message: 'Todo créé', id: result.insertId, "titre du todo": title, "description du todo": description });
	});
}

function getAllTodos(req, res) {
	db.query('SELECT * FROM to_do', (err, result) => {
		if (err) return res.status(500).json({ error: err.message });
		res.status(200).json(result);
	});
}

function getTodo(req, res) {
	const { title } = req.query;

	if (!title) {
		return res.status(400).json({message: 'Le titre est obligatoire'});
	}
	db.query('SELECT * FROM to_do WHERE titre = ?', [title], (err, result) => {
		if (err) return res.status(500).json({error: err.message});
		if (result.length === 0) return res.status(404).json({ message: 'Todo non trouvé' });
		res.status(200).json(result);
	});
}

function deleteTodo(req, res) {
	const { id } = req.params;
	db.query('DELETE FROM to_do WHERE id_todo = ?', [id], (err, result) => {
		if (err) return res.status(500).json({error: err.message});
		if (result.affectedRows === 0) return res.status(404).json({ message: 'Todo non trouvé' });
		res.status(200).json({message: 'Todo supprimé avec succès!'});
	});
}


function editTodo(req, res) {
	const { id } = req.params;
	db.query('UPDATE to_do SET ? WHERE id_todo = ?', [req.body, id], (err, result) => {
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
