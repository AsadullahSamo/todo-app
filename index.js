//        Dynamic Todo height
const todoCard = document.querySelector('.todo-card');
let todoCardHeight = todoCard.getBoundingClientRect().height;

const todoListArray = [];

const todoButton = document.querySelector('.todo-button');
todoButton.addEventListener('click', function(e) {
  console.log(e.target.value);
  createTodoList();
});

const todo = document.querySelector('.todo');
todo.addEventListener('click', function(e) {
  console.log(`I todo am clicked`)
});



const todoListDiv = document.querySelector('.todo-list-div');

todoListDiv.addEventListener('click', function(e) {
  console.log(`I am clicked`)
});



const createTodoList = () => {
  const todoList = document.createElement('input');
  todoList.classList.add('todo-list');
  todoList.setAttribute('type', 'text');
  todoList.value = todo.value
  todoListDiv.appendChild(todoList);
  todoCardHeight = todoCardHeight + 40;
  todoCard.style.height = `${todoCardHeight}px`;
  todoListArray.push(todoList.value);
  console.log(todoListArray)
}




