let tasks = [];

function validateInput() {
    const taskInput = document.getElementById('task-input').value;
    const taskDateInput = document.getElementById('task-date-input').value;

    if (!taskInput || !taskDateInput) {
        document.getElementById('error-message').innerText = 'Please enter both a task and a due date.';
        return;
    } else {
        addTaskToList(taskInput, taskDateInput);

    console.log('Task:', taskInput);
    console.log('Due Date:', taskDateInput);
    }   
}

function addTaskToList(taskInput, taskDateInput) {
    const taskItem = {
        task: taskInput,
        dueDate: taskDateInput,
        completed: false
    };
    tasks.push(taskItem);
    renderTasks();

}

function deleteAllTasks() {
    tasks = [];
    renderTasks();
}  

function filterTasks() {
    const status = document.getElementById('filter-status').value;
    let filteredTasks = tasks;
    if (status === 'all') {
    renderFilteredTasks(tasks);
    return;
}
    if (status === 'pending') {
        filteredTasks = tasks.filter(taskItem => !taskItem.completed);
    } else if (status === 'complete') {
        filteredTasks = tasks.filter(taskItem => taskItem.completed);
    }
    renderFilteredTasks(filteredTasks);

}

function renderFilteredTasks(filteredTasks) {
    const todoList = document.getElementById('todo-list').getElementsByTagName('tbody')[0];
    todoList.innerHTML = '';
    if (filteredTasks.length === 0) {
        todoList.innerHTML = `<tr><td colspan="5" class="border px-2 py-1">No tasks match your filter.</td></tr>`;
        return;
    }
    filteredTasks.forEach((taskItem, index) => {
        todoList.innerHTML += `
            <tr>
                <td class="border px-2 py-1">${index + 1}</td>
                <td class="border px-2 py-1">${taskItem.task}</td>
                <td class="border px-2 py-1">${taskItem.dueDate}</td>
                <td class="border px-2 py-1">${taskItem.completed ? 'Complete' : 'Pending'}</td>
                <td class="border px-2 py-1">
                    <button onclick="editTask(${index})" class="bg-yellow-400 rounded px-2 py-1 mx-1">Edit</button>
                    <button onclick="completeTask(${index})" class="bg-green-400 rounded px-2 py-1 mx-1">Complete</button>
                    <button onclick="deleteTask(${index})" class="bg-red-400 rounded px-2 py-1 mx-1">Delete</button>
                </td>
            </tr>
        `;
    });
}

function renderTasks() {
    const todoList = document.getElementById('todo-list').getElementsByTagName('tbody')[0];
    todoList.innerHTML = '';
    if (tasks.length === 0) {
        todoList.innerHTML = `<tr><td colspan="5" class="border px-2 py-1">No task added yet.</td></tr>`;
        return;
    }
    tasks.forEach((taskItem, index) => {
        todoList.innerHTML += `
            <tr>
                <td class="border px-2 py-1">${index + 1}</td>
                <td class="border px-2 py-1">${taskItem.task}</td>
                <td class="border px-2 py-1">${taskItem.dueDate}</td>
                <td class="border px-2 py-1">${taskItem.completed ? 'Complete' : 'Pending'}</td>
                <td class="border px-2 py-1">
                    <div class="action-buttons">
        <button onclick="editTask(${index})" class="bg-yellow-400 rounded px-2 py-1">Edit</button>
        <button onclick="completeTask(${index})" class="bg-green-400 rounded px-2 py-1">Complete</button>
        <button onclick="deleteTask(${index})" class="bg-red-400 rounded px-2 py-1">Delete</button>
    </div>
                </td>
            </tr>
        `;
    });
}

function editTask(index) {
    const taskItem = tasks[index];
    document.getElementById('task-input').value = taskItem.task;
    document.getElementById('task-date-input').value = taskItem.dueDate;
    // Simpan index yang sedang diedit
    window.editingIndex = index;
}

function completeTask(index) {
    tasks[index].completed = true;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Update addTaskToList agar mendukung edit
function addTaskToList(taskInput, taskDateInput) {
    if (window.editingIndex !== undefined) {
        tasks[window.editingIndex].task = taskInput;
        tasks[window.editingIndex].dueDate = taskDateInput;
        window.editingIndex = undefined;
    } else {
        const taskItem = {
            task: taskInput,
            dueDate: taskDateInput,
            completed: false
        };
        tasks.push(taskItem);
    }
    renderTasks();
}
