const mysql = require('mysql2')
const connection = mysql.createConnection({
	host: '172.30.48.1',
	user: 'root',
	password: 'todolist',
	database: 'todolist'
})

connection.connect((err) => {
	if (err){
		console.error("Erreur de connexio : "+err.stack)
		return;
	}
	console.log("Connexion réussie à la bdd !")
});

module.exports = connection;