var todos = [];

Array.prototype.remove = function(from, to) {
	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
  };


var Todo = function(tarea) {
	this.id = todos.length;
	todos.length;
	this.texto = tarea;
	this.finalizada = false;
	this.creado = new Date();
	this.eliminar = () => {
		todos.remove(this.id)
		//todos.splice(this.id, 1);
		renderPendientes();
	}
	this.completar = () => {
		todos[this.id].finalizada = true;
		renderPendientes();
	}
}


function renderPendientes()  {
	var TDContainer = document.querySelector('div#TodoContainer')
	TDContainer.innerHTML = '';
	for(tarea of todos) {
		if(tarea.finalizada == false) {
			var id = tarea.id;
			var paragraph = document.createElement('p');
			paragraph.innerText = tarea.texto;
			paragraph.setAttribute('data-pendiente', tarea.id)
			TDContainer.append(paragraph)


			var deleteButton = document.createElement('button');
			deleteButton.innerText = '🗑';
			deleteButton.setAttribute('data-pendiente', tarea.id)
			TDContainer.append(deleteButton);

			deleteButton.addEventListener('click', function(e) {
				todos[e.target.dataset.pendiente].eliminar();
			})

			paragraph.addEventListener('click', (e) => {
				todos[e.target.dataset.pendiente].completar();

			})

		}
		else {
			var paragraph = document.createElement('p');
			paragraph.innerText = tarea.texto;
			paragraph.style.textDecoration = "line-through";
			TDContainer.append(paragraph)

			var deleteButton = document.createElement('button');
			deleteButton.innerText = '🗑';
			deleteButton.setAttribute('data-pendiente', tarea.id)
			TDContainer.append(deleteButton);

			deleteButton.addEventListener('click', function(e) {
				//document.querySelector(`[data-pendiente="${tarea.id}"]`)
				todos[tarea.id].eliminar();
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
	var tutorial = document.createTextNode('To add a task, type it on the input field and click on \'Add\' button. To  complete a task, click once on it, and to delete a task, just clkick on the respective \'Delete\' button of the task.')
	instructionText.append(tutorial);
	app.appendChild(instructionText);

	var inputField = document.createElement('input');
	inputField.id = 'inputField';
	inputField.type = 'text';
	inputField.placeholder = '✍ Type your task please'
	app.appendChild(inputField);

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
			todos[todos.length] = new Todo(inputField.value);
			inputField.value = "";
			console.log(todos);
			renderPendientes()
		}
		
	})
}

renderApp();