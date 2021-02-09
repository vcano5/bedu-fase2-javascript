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

			var deleteButton = document.createElement('button');
			deleteButton.innerText = '🗑';
			deleteButton.setAttribute('data-pendiente', tarea.id)
			paragraph.append(deleteButton);

			deleteButton.addEventListener('click', function(e) {
				let id = e.target.dataset.pendiente;
				alert(id)
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

			var iniciarButton = document.createElement('button');
			iniciarButton.innerText = '▶';
			iniciarButton.setAttribute('data-pendiente', tarea.id)
			paragraph.append(iniciarButton)

			

			var deleteButton = document.createElement('button');
			deleteButton.innerText = '🗑';
			deleteButton.setAttribute('data-pendiente', tarea.id)
			paragraph.append(deleteButton);

			iniciarButton.addEventListener('click', function(e) {
				let id = e.target.dataset.pendiente;
				console.log(e)
				todos[id].comenzar(id);
			})

			deleteButton.addEventListener('click', function(e) {
				let id = e.target.dataset.pendiente;
				todos[id].eliminar(id);
			})
		}
	}
}

function renderApp() {
	var app = document.querySelector('div#app');

	var titleText = document.createElement('h1');
	var title = document.createTextNode('To Do List');
	titleText.appendChild(title);	
	app.appendChild(titleText);


	var instructionText = document.createElement('p');
	var tutorial = document.createTextNode('To add a task, type it on the input field and click on \'Add\' button. To  complete a task, click once on it, and to delete a task, just click on the respective \'Delete\' button of the task.')
	instructionText.append(tutorial);
	app.appendChild(instructionText);

	var inputField = document.createElement('input');
	inputField.id = 'inputField';
	inputField.type = 'text';
	inputField.placeholder = '✍ Type your task please'
	app.appendChild(inputField);
	inputField.focus();

	var resetButton = document.createElement('button');
	resetButton.id = 'resetInput';
	resetButton.innerHTML = '↩️';
	app.appendChild(resetButton);

	var addButton = document.createElement('button');
	addButton.id = 'addToDo';
	addButton.innerText = '➕';
	app.appendChild(addButton);

	var taskContainer = document.createElement('div');
	taskContainer.class = 'to-dos';
	taskContainer.id = 'TodoContainer';
	app.appendChild(taskContainer);

	resetButton.addEventListener('click', () => {
		inputField.value = '';
	})

	addButton.addEventListener('click', (e) => {
		if(inputField.value !== '') {
			var tarea = new Todo(inputField.value);
			todos[tarea.id] = tarea;
			inputField.value = "";
			console.log(todos);
			renderPendientes()
		}
		
	})
}

renderApp();