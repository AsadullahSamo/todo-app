import  { addEventListeners} from './eventListeners.js';

let todoCard = document.querySelector('.todo-card');
let todoCardHeight = todoCard.getBoundingClientRect().height;
let todoListArray = [];
let checkedMap = new Map([])

//  TASKS STATUS
const tasks = document.getElementById('tasks')
const remainingTasks = document.getElementById('remaining-tasks')
const totalTasks = document.getElementById('total-tasks')
const todoModeImg = document.getElementById('mode');
const inputTodoList = document.querySelector('.todo-card label input.todo');

//  TODO BUTTON
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

const map = new Map(JSON.parse(localStorage.getItem('checked')))
const createTodoList = (value) => {
  // <label for= "todo" class= "todo-list-label" >
  //   <input type="checkbox" name="task-status" id="task-status"></input>
  //   <input type="text" name="todo" class="todo-list" value="A">
  //   <img src="./assets/icons/close.svg" class="close-icon" alt="Close icon">
  // </label> 
  let inputValue = String(todo.value).trim();

  const label = document.createElement('label');
  label.setAttribute('for', 'todo');
  label.classList.add('todo-list-label');

  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.setAttribute('name', 'task-status');
  checkbox.className = "task-status"

  if (map.get(`${value}`)) {
    checkbox.className += " appearance"
    checkbox.setAttribute('checked', 'true')
  } else {
    checkbox.className += " hide-appearance"
  }

  const input = document.createElement('input');
  input.classList.add('todo-list');
  input.setAttribute('type', 'text');
  input.setAttribute('name', 'todo');
  if(todoModeImg.src.includes('light-mode')) {
    input.setAttribute('style', 'border: 1px solid #fff; color: #fff');
  } else {
    input.setAttribute('style', 'border: 1px solid #000; color: #000');
  }
  input.value = inputValue || value;

  const img = document.createElement('img');
  img.src = "./assets/icons/close.svg";
  img.classList.add('close-icon');
  img.setAttribute('alt', 'Close icon');

  // Append elements
  label.appendChild(checkbox);
  label.appendChild(input);
  label.appendChild(img);
  
  if (checkbox.classList.contains('appearance')) {
    todoListDiv.prepend(label);
  } else {
    todoListDiv.appendChild(label);
  }


  todoListArray.push(input.value);
  todoListArray = [...new Set(todoListArray)];
  checkedArray.push(false)


  checkedArray.set(`${input.value}`, false)

  if (value === undefined) {
    localStorage.setItem('todoList', JSON.stringify(todoListArray));
    localStorage.setItem('checked', JSON.stringify(Array.from(checkedMap.entries())))
  }

  updateTodoCardHeight('add');
  showTasksStatus()
  showCactusTodo();
}    // end of createTodoList() function

// Update todo card height based on todo list length dynamically
const updateTodoCardHeight = (operator) => {
  operator === "add" ? todoCardHeight += 50 : todoCardHeight -= 50;
  todoCard.style.height = `${todoCardHeight}px`;
}    // end of updateTodoCardHeight() function

// Show cactus todo image when todo list is empty
const showCactusTodo = () => {
  const cactusTodo = document.getElementById('cactus-todo');
  todoListArray.length === 0 ? cactusTodo.style.display = 'block' : cactusTodo.style.display = 'none';
}    // end of showCactusTodo() function

const showTasksStatus = (operator) => {
  
  const checkedMap = new Map(JSON.parse(localStorage.getItem('checked')));
  console.log(checkedMap.get('a'))

  if(todoListArray.length === 0) {
    totalTasks.innerText = 0;
  } else {
    totalTasks.innerText = todoListArray.length;
  }
}


// Add remove functionality to todo list
todoListDiv.addEventListener('click', function (e) {
  if (e.target.classList.contains('close-icon')) {
    e.target.parentElement.remove();
    todoListArray = todoListArray.filter((todo) => todo !== e.target.previousElementSibling.value);
    updateTodoCardHeight('remove');
    showTasksStatus()
    showCactusTodo();

  localStorage.setItem('todoList', JSON.stringify(todoListArray));

  if (e.target.classList.contains(`task-status`)) {
    e.target.nextElementSibling.classList.toggle('line-through')
    e.target.classList.toggle('appearance');
    e.target.classList.toggle('hide-appearance');
    checkedArray.get(`${e.target.nextElementSibling.value}`)
    updateTodoCardHeight('add')

    if(e.target.classList.contains('appearance')) {
      remainingTasks.innerText = Number(remainingTasks.innerText) + 1;
    } else {
      remainingTasks.textContent = Number(remainingTasks.textContent) - 1
    }
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