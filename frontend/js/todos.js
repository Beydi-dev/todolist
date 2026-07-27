const API = 'http://localhost:5000';
let allTodos = [];
let currentFilter = 'todo';

function getToken() {
    const token = localStorage.getItem('token');
    //if (!token) {
    //   window.location.href = 'index.html';
    //}
    return token;
}

// Charger tous les todos
async function loadTodos() {
    const response = await fetch(`${API}/todos`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });

    allTodos = await response.json();
    displayTodos();
}

// Afficher les todos selon le filtre
function displayTodos() {
    const list = document.getElementById('todos-list');
    list.innerHTML = '';

    const filtered = allTodos.filter(todo => {
        if (currentFilter === 'todo') return !todo.effectue;
        if (currentFilter === 'done') return todo.effectue;
    });

    filtered.forEach(todo => {
        const card = document.createElement('div');
        card.className = 'todo-card';
        card.innerHTML = `
            <h3>${todo.titre}</h3>
            <p>${todo.description || 'description....'}</p>
            <div class="actions">
                <button onclick="editTodo(${todo.id_todo})">✏️</button>
                <button onclick="deleteTodo(${todo.id_todo})">🗑️</button>
                <button onclick="toggleDone(${todo.id_todo}, ${todo.effectue})">✅</button>
            </div>
        `;
        list.appendChild(card);
    });
}

// Créer un todo
async function createTodo() {
    const title = document.getElementById('title-input').value;
    const description = document.getElementById('description-input').value;

    if (!title) return alert('Le titre est obligatoire');

    await fetch(`${API}/todos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({ title, description })
    });

    document.getElementById('title-input').value = '';
    document.getElementById('description-input').value = '';
    loadTodos();
}

// Supprimer un todo
async function deleteTodo(id) {
    await fetch(`${API}/todos/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    loadTodos();
}

// Modifier un todo
async function editTodo(id) {
    const newTitle = prompt('Nouveau titre :');
	const newDescription = prompt('Nouveau contenu :')
    if (!newTitle || !newDescription) return;

    await fetch(`${API}/todos/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({ titre: newTitle, description: newDescription })
    });
    loadTodos();
}

// Marquer comme fait / pas fait
async function toggleDone(id, currentStatus) {
    await fetch(`${API}/todos/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({ effectue: !currentStatus })
    });
    loadTodos();
}

// Filtrer
function filterTodos(filter) {
    currentFilter = filter;
    displayTodos();
}

function logout() {
	localStorage.removeItem('token');
	window.location.href = 'index.html';
}

// Lancer au chargement
loadTodos();