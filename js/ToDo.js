const form = document.querySelector('#form')
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach( (task) => renderTask(task));
}

checkEmptyList();
form.addEventListener('submit', addTask);
tasksList.addEventListener('click', deleteTask);
tasksList.addEventListener('click', doneTask);

function addTask(e) {
    e.preventDefault();
    const taskText = taskInput.value
    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    };

    tasks.push(newTask)

    saveToLocalStorage();

    renderTask(newTask);

    taskInput.value = ""
    taskInput.focus();

    checkEmptyList();
}

function deleteTask(e) {
    if (e.target.dataset.action !== 'delete') return;
    const parenNode = e.target.closest('li');
    const id = Number(parenNode.id);

    tasks = tasks.filter( (task) => task.id !== id);
    
    saveToLocalStorage();

    parenNode.remove();

    checkEmptyList();
}

function doneTask(e) {
    if(e.target.dataset.action !== 'done') return;
    const parentNode = e.target.closest('li');
    
    const id = Number(parentNode.id);
    const task = tasks.find( (task) => task.id === id);
    
    task.done = !task.done

    saveToLocalStorage();

    const taskTitle = parentNode.querySelector('span');
    taskTitle.classList.toggle('task__title--done');
    
}

function checkEmptyList () {
    if (tasks.length === 0) {
        const emptyListHTML = `
            <li id="emptyList" class="list__group-item empty-list">
                        <img class="list__group-img" src="./img/header/1.png" alt="">
                        <p class="ToDo__text">Список дел пуст</p>
                    </li>`;
                tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);
    }

    if (tasks.length > 0) {
        const emptyListEl = document.querySelector('#emptyList');
        emptyListEl ? emptyListEl.remove() : null;
    }
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task) {
    const cssClass = task.done ? 'task__title task__title--done' : 'task-title';

    const taskHTML = `
    <li id="${task.id}" class="list__group-item d-flex">
        <span class="${cssClass}">${task.text}</span>
        <div class="task__item-buttons">
            <button type="button" data-action="done" class="btn-action">
                <img src="./img/ToDo/tick.svg" alt="" width="18" height="1">
            </button>
            <button type="button" data-action="delete" class="btn-action">
                <img src="./img/ToDo/cross.svg" alt="" width="18" height="1">
            </button>
        </div>
    </li>`;
    tasksList.insertAdjacentHTML('beforeend', taskHTML);
}