//        Dynamic Todo height
let todoCard = document.querySelector('.todo-card');
let todoCardHeight = todoCard.getBoundingClientRect().height;
let todoListArray = [];

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
  //   <input type="text" name="todo" class="todo-list" value="A">
  //   <img src="./assets/icons/close.svg" class="close-icon" alt="Close icon">
  // </label> 

  const label = document.createElement('label');
  label.setAttribute('for', 'todo');
  label.classList.add('todo-list-label');

  const input = document.createElement('input');
  input.classList.add('todo-list');
  input.cssText = `type: text; name: todo; class: todo-list; value: ${todo.value};`;
  input.value = todo.value || value;

  const img = document.createElement('img');
  img.src = "./assets/icons/close.svg";
  img.classList.add('close-icon');
  img.setAttribute('alt', 'Close icon');

  // Append elements
  label.appendChild(input);
  label.appendChild(img);
  todoListDiv.appendChild(label);


  todoListArray.push(input.value);
  todoListArray = [...new Set(todoListArray)];
  console.log(todoListArray)
  if (value === undefined) {
    localStorage.setItem('todoList', JSON.stringify(todoListArray));
  }

  updateTodoCardHeight('add');
  showCactusTodo();
}    // end of createTodoList() function

console.log(todoListArray)



const updateTodoCardHeight = (operator) => {
  if (operator === 'add') {
    todoCardHeight = todoCardHeight + 40;
  } else {
    todoCardHeight = todoCardHeight - 40;
  }
  todoCard.style.height = `${todoCardHeight}px`;
}    // end of updateTodoCardHeight() function


const showCactusTodo = () => {
  const cactusTodo = document.getElementById('cactus-todo');
  if (todoListArray.length === 0) {
    cactusTodo.style.display = 'block';
  } else {
    cactusTodo.style.display = 'none';
  }
}    // end of showCactusTodo() function



todoListDiv.addEventListener('click', function (e) {
  if (e.target.classList.contains('close-icon')) {
    e.target.parentElement.remove();
    todoListArray = todoListArray.filter((todo) => todo !== e.target.previousElementSibling.value);
    console.log(todoListArray)
  }
  updateTodoCardHeight('remove');
  showCactusTodo();

  localStorage.setItem('todoList', JSON.stringify(todoListArray));
})




if (todoListArray.length === 0) {
  todoListArray = JSON.parse(localStorage.getItem('todoList')) || [];
}

// Load todoListArray into the DOM
if (todoListArray.length > 0) {
  todoListArray.forEach((todo) => {
    createTodoList(todo);
  });
}

// localStorage.clear()