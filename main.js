var todos = {};

var Todo = function(tarea) {

	this.id = Date.now();

	this.texto = tarea;

	this.finalizada = false;

	this.eliminar = (id) => {
		delete todos[id]
		renderPendientes();
	}

	this.completar = (id) => {
		todos[id].finalizada = true;
		renderPendientes();
	}

	this.comenzar = (id) => {
		todos[id].finalizada = false;
		renderPendientes();
	}
}


function renderPendientes()  {
	var TDContainer = document.querySelector('div#TodoContainer')
	TDContainer.innerHTML = '';
	for(id of Object.keys(todos)) {
		var tarea = todos[id]
		if(tarea.finalizada == false && tarea) {
			let id = tarea.id;
			var paragraph = document.createElement('p');
			paragraph.innerText = tarea.texto;
			paragraph.setAttribute('data-pendiente', tarea.id)
			TDContainer.append(paragraph);

			var botones = document.createElement('div');
			paragraph.appendChild(botones)
			var deleteButton = document.createElement('button');
			deleteButton.innerText = '🗑';
			deleteButton.setAttribute('data-pendiente', tarea.id)
			deleteButton.setAttribute('class', 'btn btn-outline-danger mt-2');
			botones.append(deleteButton);

			deleteButton.addEventListener('click', function(e) {
				let id = e.target.dataset.pendiente;
				todos[id].eliminar(id);
				
			})

			paragraph.addEventListener('click', (e) => {
				let id = e.target.dataset.pendiente;
				if(todos[id]) todos[id].completar(id);
			})

			

		}
		else {
			var paragraph = document.createElement('p');
			paragraph.innerText = tarea.texto;
			paragraph.style.textDecoration = "line-through";
			TDContainer.append(paragraph)

			var botones = document.createElement('div');
			paragraph.appendChild(botones)

			var iniciarButton = document.createElement('button');
			iniciarButton.innerText = '▶';
			iniciarButton.setAttribute('data-pendiente', tarea.id)
			iniciarButton.setAttribute('class', 'btn btn-outline-primary');
			botones.append(iniciarButton)

			

			var deleteButton = document.createElement('button');
			deleteButton.innerText = '🗑';
			deleteButton.setAttribute('data-pendiente', tarea.id)
			deleteButton.setAttribute('class', 'btn btn-outline-danger m-2');
			botones.append(deleteButton);

			iniciarButton.addEventListener('click', function(e) {
				let id = e.target.dataset.pendiente;
				todos[id].comenzar(id);
			})

			deleteButton.addEventListener('click', function(e) {
				let id = e.target.dataset.pendiente;
				todos[id].eliminar(id);
			})
		}
	}
}

function agregarAPendientes(texto) {
	var tarea = new Todo(texto);
	todos[tarea.id] = tarea;
	inputField.value = "";
	renderPendientes()
}

function renderApp() {
	var app = document.querySelector('div#app');

	var titleText = document.createElement('h1');
	var title = document.createTextNode('To Do List');
	titleText.setAttribute('class', 'display-1')
	titleText.appendChild(title);	
	app.appendChild(titleText);


	var instructionText = document.createElement('p');
	var tutorial = document.createTextNode('To add a task, type it on the input field and click on \'Add\' button. To  complete a task, click once on it, and to delete a task, just click on the respective \'Delete\' button of the task.')
	instructionText.append(tutorial);
	app.appendChild(instructionText);

	var toolbar = document.createElement('form');
	toolbar.setAttribute('class', 'd-flex');
	app.appendChild(toolbar);

	var inputField = document.createElement('input');
	inputField.id = 'inputField';
	inputField.type = 'text';
	inputField.placeholder = '✍ Type your task please'
	inputField.setAttribute('class', 'w-100')
	inputField.name = 'input'
	toolbar.appendChild(inputField);
	inputField.focus();

	var resetButton = document.createElement('button');
	resetButton.id = 'resetInput';
	resetButton.innerHTML = '↩️';
	resetButton.setAttribute('class', 'btn btn-primary mx-2');
	resetButton.type = "reset";
	toolbar.appendChild(resetButton);

	var addButton = document.createElement('button');
	addButton.id = 'addToDo';
	addButton.innerText = '➕';
	addButton.setAttribute('class', 'btn btn-success');
	addButton.type = "submit"
	toolbar.appendChild(addButton);

	var taskContainer = document.createElement('div');
	taskContainer.class = 'to-dos';
	taskContainer.id = 'TodoContainer';
	app.appendChild(taskContainer);

	toolbar.addEventListener('submit', (e) => {
		e.preventDefault(true)
		var tarea = new Todo(inputField.value);
		todos[tarea.id] = tarea;
		toolbar.reset();
		renderPendientes();
	})
}

renderApp();
