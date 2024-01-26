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
todoButton.addEventListener('click', function () {
  if(todo.value.length > 0) {
    createTodoList();
  }
});

const todo = document.querySelector('.todo');
const todoListDiv = document.querySelector('.todo-list-div');

window.addEventListener('keyup', function (e) {
  if(todo.value.length > 0) {
    if (e.key === 'Enter') {
      createTodoList();
    }
  }
})

const map = new Map(JSON.parse(localStorage.getItem('checked')))
const createTodoList = (value) => {
  // <label for= "todo" class= "todo-list-label" >
  //   <input type="checkbox" name="task-status" id="task-status" disabled></input>
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
  input.setAttribute('disabled', 'true')

  if(todoModeImg.src.includes('light-mode')) {
    input.setAttribute('style', 'border: 1px solid #fff; color: #fff');
  } else {
    input.setAttribute('style', 'border: 1px solid #000; color: #000');
  }
  input.value = inputValue || value;

  const pencilImg = document.createElement('img');
  pencilImg.src = "./assets/icons/pencil.svg";
  pencilImg.classList.add('pencil-icon');
  pencilImg.setAttribute('alt', 'Pencil icon');

  const closeImg = document.createElement('img');
  closeImg.src = "./assets/icons/close.svg";
  closeImg.classList.add('close-icon');
  closeImg.setAttribute('alt', 'Close icon');

  // Append elements
  label.appendChild(checkbox);
  label.appendChild(input);
  label.appendChild(pencilImg);
  label.appendChild(closeImg);
  
  if (checkbox.classList.contains('appearance')) {
    todoListDiv.prepend(label);
  } else {
    todoListDiv.appendChild(label);
  }

  todoListArray.push(input.value);
  todoListArray = [...new Set(todoListArray)];

  if(map.get(`${value}`)) {
    checkedMap.set(`${input.value}`, true)
  } else {
    checkedMap.set(`${input.value}`, false)
  }

  if (value === undefined) {
    updateLocalStorage();
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

const showTasksStatus = () => {
  totalTasks.textContent = todoListArray.length;
}

// Add remove functionality to todo list
todoListDiv.addEventListener('click', function (e) {
  // Remove todo list
  if (e.target.classList.contains('close-icon')) {
    e.target.parentElement.remove();
    todoListArray = todoListArray.filter((todo) => todo !== e.target.previousElementSibling.previousElementSibling.value);
    updateTodoCardHeight('remove');
    showTasksStatus()
    showCactusTodo();

    remainingTasks.textContent = document.querySelectorAll('.appearance').length
    checkedMap.delete(`${e.target.previousElementSibling.previousElementSibling.value}`)
    updateLocalStorage();
  } // end of remove todo list
  
  if(e.target.classList.contains('pencil-icon')) {
    const checkedArray = Array.from(checkedMap.values())
    localStorage.removeItem('checked')

    const inputField = e.target.previousElementSibling;
    const index = todoListArray.findIndex(item => item === inputField.value);
    inputField.removeAttribute('disabled');
    inputField.focus();

    inputField.addEventListener('keyup', function (e) {
      if (e.key === 'Enter') {
        handleEditTodoList(e)
        
      }

      inputField.addEventListener('blur', function (e) {
        handleEditTodoList(e)
      })
    }) // end of inputField event listener

    const handleEditTodoList = (e) => {
      checkedMap.clear()
      inputField.setAttribute('disabled', 'true');

      todoListArray.splice(index, 1, inputField.value);

      for(let i = 0; i < todoListArray.length; i++) {
        if(inputField.value === todoListArray[i]) {
          checkedMap.set(`${todoListArray[i]}`, inputField.previousElementSibling.classList.contains('appearance'))
        } else {
          checkedMap.set(`${todoListArray[i]}`, checkedArray[i])
        }
      }

      updateLocalStorage();
      inputField.blur();
    } // end of handleEditTodoList() function

  } // end of edit todo list

  // Complete/Incomplete task
  if (e.target.classList.contains(`task-status`)) {
    e.target.nextElementSibling.classList.toggle('line-through')
    e.target.classList.toggle('appearance');
    e.target.classList.toggle('hide-appearance');

    if(e.target.classList.contains('appearance')) {
      checkedMap.set(`${e.target.nextElementSibling.value}`, true)
      remainingTasks.textContent = Number(remainingTasks.textContent) + 1
    } else {
      checkedMap.set(`${e.target.nextElementSibling.value}`, false)
      remainingTasks.textContent = Number(remainingTasks.textContent) - 1
    }

    localStorage.setItem('checked', JSON.stringify(Array.from(checkedMap.entries())))
  }

}) // end of todoListDiv event listener

// Light/Dark mode
todoModeImg.addEventListener('click', function (e) {
  if (todoModeImg.src.includes('light-mode')) {
    changeTodoMode('./assets/icons/dark-mode.svg', '#000', '#fff', '#000', 'none')
  } else {
    changeTodoMode('./assets/icons/light-mode.svg', '#fff', '#24273D', '#fff', 'block')
  }
})   // end of todoModeImg event listener

const changeTodoMode = (modeImg, color, bgColor, borderColor, showCactusTodo) => {
  todoCard.style.backgroundColor = bgColor;
  todo.style.cssText = `border: 1px solid ${borderColor}; color: ${color};`;
  tasks.style.cssText = `color: ${color};`
  todoModeImg.src = modeImg;

  let todoList = Array.from(document.getElementsByClassName('todo-list'))
  todoList.forEach((todo) => {
    todo.style.cssText = `border: 1px solid ${borderColor}; color: ${color};`;
  });

  const cactusTodo = document.getElementById('cactus-todo');
  cactusTodo.style.display = `${showCactusTodo}`

  const cactusTodoCaption = document.getElementById('cactus-todo-caption');
  cactusTodoCaption.style.color = `${color}`
}   // end of changeTodoMode() function

//  Load todoListArray from localStorage on page load
if (localStorage.length > 0) {
  todoListArray = JSON.parse(localStorage.getItem('todoList'));
  todoListArray.forEach((todo) => {
    createTodoList(todo);
  });
  remainingTasks.textContent = document.querySelectorAll('.appearance').length
}

function updateLocalStorage() {
  localStorage.setItem('todoList', JSON.stringify(todoListArray));
  localStorage.setItem('checked', JSON.stringify(Array.from(checkedMap.entries())))
}