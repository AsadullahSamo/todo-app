//        Dynamic Todo height
const todoCard = document.querySelector('.todo-card');
let todoCardHeight = todoCard.getBoundingClientRect().height;

const todoListArray = [];

const todoButton = document.querySelector('.todo-button');
todoButton.addEventListener('click', function(e) {
  createTodoList();
});


const todo = document.querySelector('.todo');
const todoListDiv = document.querySelector('.todo-list-div');
const todoListLabel = document.querySelector('.todo-list-label');

const createTodoList = () => {
  // <label for="todo" class="todo-list-label">
  const label = document.createElement('label');
  label.setAttribute('for', 'todo');
  label.classList.add('todo-list-label');

  const input = document.createElement('input');
  input.classList.add('todo-list');
  input.cssText = `type: text; name: todo; class: todo-list; value: ${todo.value};`;
  input.value = todo.value;
  // todoListDiv.appendChild(todoList);

  // <img src="./assets/icons/close.svg" class="close-icon" alt="Close icon"></img>
  const img = document.createElement('img');
  img.src = "./assets/icons/close.svg";
  img.classList.add('close-icon');
  img.setAttribute('alt', 'Close icon');
  
  label.appendChild(input);
  label.appendChild(img);
  todoListDiv.appendChild(label);

  todoCardHeight = todoCardHeight + 40;
  todoCard.style.height = `${todoCardHeight}px`;
  todoListArray.push(input.value);
  // console.log(todoListArray)

  // Close icon event listener  
  
  removeTodo();
  showCactusTodo();
}    // end of createTodoList() function


let closeIcon = document.getElementsByClassName('close-icon');

const showCactusTodo = () => {
  const cactusTodo = document.getElementById('cactus-todo');
  if(todoListArray.length === 0) {
    cactusTodo.style.display = 'block';
  } else {  
    cactusTodo.style.display = 'none';
  }
}    // end of showCactusTodo() function

console.log(todoListArray);
const removeTodo = () => {
  closeIcon = Array.from(closeIcon)

  closeIcon.map((icon) => {
    icon.addEventListener('click', function(e) {
      icon.parentElement.remove();
      todoListArray = todoListArray.filter((todo) => todo !== icon.previousElementSibling.value);
      // console.log(elmRemoved);
      console.log(todoListArray)
    })
  })
}  // end of removeTodo() function