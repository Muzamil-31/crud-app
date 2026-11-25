let taskForm = document.getElementById('taskForm');
let taskInput = document.getElementById('taskInput');
let taskList = document.getElementById('taskList');
let submitBtn = taskForm.querySelector('button[type="submit"]');

let tasks = JSON.parse(localStorage.getItem('simpleTasks') || '[]');
let editingId = null;

function saveTasks() {
    localStorage.setItem('simpleTasks', JSON.stringify(tasks));
    renderTasks();
}

function resetForm() {
    editingId = null;
    taskInput.value = '';
    submitBtn.textContent = 'Add Task';
}

// Load the selected task into the input
function editTask(task) {
    editingId = task.id;
    taskInput.value = task.text;
    submitBtn.textContent = 'Update Task';
    taskInput.focus();
}

// Use the same form to add or update a task
taskForm.onsubmit = function (event) {
    event.preventDefault();

    let text = taskInput.value.trim();
    if (!text) return;

    if (editingId === null) {
        tasks.push({ id: Date.now(), text: text });
    } else {
        let task = tasks.find(task => task.id === editingId);
        if (task) task.text = text;
    }

    resetForm();
    saveTasks();
};

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);

    if (editingId === id) {
        resetForm();
    }

    saveTasks();
}

function renderTasks() {
    taskList.textContent = '';

    for (let task of tasks) {
        let li = document.createElement('li');
        li.className = 'task-item';

        let span = document.createElement('span');
        span.className = 'task-text';
        span.textContent = task.text;

        let editBtn = document.createElement('button');
        editBtn.type = 'button';
        editBtn.className = 'edit-btn';
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => editTask(task);

        let deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteTask(task.id);

        li.append(span, editBtn, deleteBtn);
        taskList.appendChild(li);
    }
}

renderTasks();