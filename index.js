let todoCard = document.querySelector('.todo-card');
let todoCardHeight = todoCard.getBoundingClientRect().height;
let todoListArray = [];
let checkedArray = new Map([]);

const todoButton = document.querySelector('.todo-button');
todoButton.addEventListener('click', function (e) {
  createTodoList();
});

const todo = document.querySelector('.todo');
const todoListDiv = document.querySelector('.todo-list-div');

window.addEventListener('keyup', function (e) {
  if (e.key === 'Enter') {
    createTodoList();
  }
})

const createTodoList = (value) => {
  // <label for= "todo" class= "todo-list-label" >
  //   <input type="checkbox" name="task-status" id="task-status"></input>
  //   <input type="text" name="todo" class="todo-list" value="A">
  //   <img src="./assets/icons/close.svg" class="close-icon" alt="Close icon">
  // </label> 
  const inputValue = String(todo.value).trim();

  const label = document.createElement('label');
  label.setAttribute('for', 'todo');
  label.classList.add('todo-list-label');

  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.setAttribute('name', 'task-status');
  checkbox.className = "task-status hide-appearance"

  const input = document.createElement('input');
  input.classList.add('todo-list');
  input.cssText = `type: text; name: todo; class: todo-list; value: ${todo.value};`;
  input.value = inputValue || value;

  const img = document.createElement('img');
  img.src = "./assets/icons/close.svg";
  img.classList.add('close-icon');
  img.setAttribute('alt', 'Close icon');

  // Append elements
  label.appendChild(checkbox);
  label.appendChild(input);
  label.appendChild(img);
  todoListDiv.appendChild(label);


  todoListArray.push(input.value);
  todoListArray = [...new Set(todoListArray)];


  checkedArray.set([`${input.value}`, false])

  if (value === undefined) {
    localStorage.setItem('todoList', JSON.stringify(todoListArray));
    localStorage.setItem('checked', JSON.stringify(checkedArray))
  }

  updateTodoCardHeight('add');
  showCactusTodo();
}    // end of createTodoList() function

// Update todo card height based on todo list length dynamically
const updateTodoCardHeight = (operator) => {
  operator === "add" ? todoCardHeight += 40 : todoCardHeight -= 40;
  todoCard.style.height = `${todoCardHeight}px`;
}    // end of updateTodoCardHeight() function

// Show cactus todo image when todo list is empty
const showCactusTodo = () => {
  const cactusTodo = document.getElementById('cactus-todo');
  todoListArray.length === 0 ? cactusTodo.style.display = 'block' : cactusTodo.style.display = 'none';
}    // end of showCactusTodo() function

// Add remove functionality to todo list
todoListDiv.addEventListener('click', function (e) {
  if (e.target.classList.contains('close-icon')) {
    e.target.parentElement.remove();
    todoListArray = todoListArray.filter((todo) => todo !== e.target.previousElementSibling.value);
  }
  updateTodoCardHeight('remove');
  showCactusTodo();

  localStorage.setItem('todoList', JSON.stringify(todoListArray));

  if (e.target.classList.contains(`task-status`)) {
    e.target.nextElementSibling.classList.toggle('line-through')
    e.target.classList.toggle('appearance');
    e.target.classList.toggle('hide-appearance');
    checkedArray.get(`${e.target.nextElementSibling.value}`)
    updateTodoCardHeight('add')
  }
})

//  Load todoListArray from localStorage on page load
if (localStorage.length > 0) {
  todoListArray = JSON.parse(localStorage.getItem('todoList'));
  todoListArray.forEach((todo) => {
    createTodoList(todo);
  });
}

// localStorage.clear()