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
  localStorage.setItem('todoList', JSON.stringify(todoListArray));

  updateTodoCardHeight('add');
  // console.log(todoListArray)
  showCactusTodo();
}    // end of createTodoList() function


// let closeIcon = document.getElementsByClassName('close-icon');
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


todoListArray = JSON.parse(localStorage.getItem('todoList'));
if (todoListArray) {
  // todoListDiv.innerHTML = ""
  todoListArray.forEach((todo) => {
    createTodoList(todo);
  })
  todoListArray = []
} else {
  todoListArray = [];
}

localStorage.clear()

