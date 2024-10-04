document.addEventListener('DOMContentLoaded', loadTasks);
document.getElementById('task-form').addEventListener('submit', addTask);

// Function to add a task
function addTask(e) {
    e.preventDefault();
    
    const taskName = document.getElementById('task-name').value;
    const dueDate = document.getElementById('due-date').value;
    const project = document.getElementById('project').value;
    
    const id = Date.now(); // Unique identifier
    
    const taskRow = document.createElement('tr');
    taskRow.setAttribute('data-id', id);
    taskRow.innerHTML = `
        <td>${taskName}</td>
        <td>${dueDate}</td>
        <td>${project}</td>
        <td><button class="delete-btn">Delete</button></td>
    `;
    
    document.getElementById('task-list').appendChild(taskRow);
    
    storeTaskInLocalStorage({ id, taskName, dueDate, project });
    
    document.getElementById('task-form').reset();
}

// Event delegation for deleting a task
document.getElementById('task-list').addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-btn')) {
        const taskRow = e.target.parentElement.parentElement;
        const taskId = taskRow.getAttribute('data-id');
        
        taskRow.remove(); // Remove from DOM
        
        removeTaskFromLocalStorage(taskId); // Remove from localStorage
    }
});

// Store task in localStorage
function storeTaskInLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage on page load
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    tasks.forEach(task => {
        const taskRow = document.createElement('tr');
        taskRow.setAttribute('data-id', task.id);
        taskRow.innerHTML = `
            <td>${task.taskName}</td>
            <td>${task.dueDate}</td>
            <td>${task.project}</td>
            <td><button class="delete-btn">Delete</button></td>
        `;
        
        document.getElementById('task-list').appendChild(taskRow);
    });
}

// Remove task from localStorage by ID
function removeTaskFromLocalStorage(taskId) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    // Ensure taskId is an integer
    tasks = tasks.filter(task => task.id !== parseInt(taskId));
    
    // Update localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}