document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task));

    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const task = { text: taskText, completed: false };
            tasks.push(task);
            addTaskToDOM(task);
            saveTasks();
            taskInput.value = '';
        }
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            const taskItem = e.target.parentElement;
            const taskIndex = Array.from(taskList.children).indexOf(taskItem);
            tasks.splice(taskIndex, 1);
            taskItem.remove();
            saveTasks();
        } else if (e.target.classList.contains('task')) {
            const taskItem = e.target;
            const taskIndex = Array.from(taskList.children).indexOf(taskItem);
            tasks[taskIndex].completed = !tasks[taskIndex].completed;
            taskItem.classList.toggle('completed');
            saveTasks();
        }
    });

    function addTaskToDOM(task) {
        const taskItem = document.createElement('li');
        taskItem.className = `task ${task.completed ? 'completed' : ''}`;
        taskItem.textContent = task.text;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete';
        taskItem.appendChild(deleteBtn);
        taskList.appendChild(taskItem);
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});