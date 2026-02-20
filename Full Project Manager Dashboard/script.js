const totalProjects = document.getElementById("totalProjects");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");
const projectList = document.getElementById("projectList");

let projects = JSON.parse(localStorage.getItem("projects")) || [];

function updateDashboard() {
    totalProjects.textContent = projects.length;

    let tasks = 0;
    let completed = 0;

    projects.forEach(p => {
        tasks += p.tasks;
        completed += p.completed;
    });

    totalTasks.textContent = tasks;
    completedTasks.textContent = completed;
    pendingTasks.textContent = tasks - completed;
}

function displayProjects() {
    projectList.innerHTML = "";

    projects.forEach((project, index) => {
        let progressPercent = (project.completed / project.tasks) * 100;

        const div = document.createElement("div");
        div.className = "project-card";

        div.innerHTML = `
            <h3>${project.name}</h3>
            <p>Tasks: ${project.completed}/${project.tasks}</p>
            <div class="progress-bar">
                <div class="progress" style="width:${progressPercent}%"></div>
            </div>
            <button class="small-btn" onclick="completeTask(${index})">Complete Task</button>
            <button class="small-btn" onclick="deleteProject(${index})">Delete</button>
        `;

        projectList.appendChild(div);
    });

    updateDashboard();
}

function addProject() {
    const name = document.getElementById("projectName").value;
    const taskCount = parseInt(document.getElementById("taskCount").value);

    if (!name || !taskCount) return;

    projects.push({
        name: name,
        tasks: taskCount,
        completed: 0
    });

    localStorage.setItem("projects", JSON.stringify(projects));

    document.getElementById("projectName").value = "";
    document.getElementById("taskCount").value = "";

    displayProjects();
}

function completeTask(index) {
    if (projects[index].completed < projects[index].tasks) {
        projects[index].completed++;
        localStorage.setItem("projects", JSON.stringify(projects));
        displayProjects();
    }
}

function deleteProject(index) {
    projects.splice(index, 1);
    localStorage.setItem("projects", JSON.stringify(projects));
    displayProjects();
}

function toggleMode() {
    document.body.classList.toggle("dark-mode");
}

displayProjects();
