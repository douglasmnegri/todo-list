import { create } from "lodash";
import { format, compareAsc } from "date-fns";

const allTasks = [
  {
    name: "Super Market",
    description: "Buy eggs, milk and bread.",
    date: "2024-04-29",
  },
  {
    name: "Read Book",
    description: "Start to read the new novel from Stephen King",
    date: "2024-05-01",
  },
];

const closedTasks = [
  {
    name: "Gym",
    description: "Renew the gym membership.",
    date: "2024-05-02",
  },
];

const content = document.querySelector(".content");
const addTaskBox = document.querySelector(".add-task-box");
const addButton = document.querySelector(".add-task");

function initializeForm() {
  addButton.addEventListener("click", () => {
    clearTasks();
    const form = document.createElement("form");
    const taskDiv = document.createElement("div");
    taskDiv.className = "taskContainer";

    const taskNameInput = document.createElement("input");
    taskNameInput.type = "text";
    taskNameInput.className = "task-name";

    const taskNameLabel = document.createElement("label");
    taskNameLabel.textContent = "Task Name: ";

    const taskDescriptionInput = document.createElement("input");
    taskDescriptionInput.type = "text";
    taskDescriptionInput.className = "task-description";

    const taskDescriptionLabel = document.createElement("label");
    taskDescriptionLabel.textContent = "Description: ";

    const taskDateInput = document.createElement("input");
    taskDateInput.type = "date";
    taskDateInput.className = "task-date";

    const taskDateLabel = document.createElement("label");
    taskDateLabel.textContent = "Due date: ";

    const taskButtonDiv = document.createElement("div");
    taskButtonDiv.className = "task-button-div";

    const addTaskButton = document.createElement("button");
    addTaskButton.textContent = "Add task";
    addTaskButton.className = "task-button-add";

    const cancelTaskButton = document.createElement("button");
    cancelTaskButton.textContent = "Cancel";
    cancelTaskButton.className = "task-button-cancel";

    form.appendChild(taskNameLabel);
    form.appendChild(taskNameInput);
    form.appendChild(taskDescriptionLabel);
    form.appendChild(taskDescriptionInput);
    form.appendChild(taskDateLabel);
    form.appendChild(taskDateInput);
    taskButtonDiv.appendChild(addTaskButton);
    taskButtonDiv.appendChild(cancelTaskButton);
    form.appendChild(taskButtonDiv);

    taskDiv.appendChild(form);
    addTaskBox.appendChild(taskDiv);

    addButton.disabled = true;

    addTaskButton.addEventListener("click", (e) => {
      e.preventDefault();
      addNewTask();
      printTask(allTasks);
      addButton.disabled = false;
    });

    cancelTaskButton.addEventListener("click", (e) => {
      e.preventDefault();
      removeForm();
      addButton.disabled = false;
    });
  });
}

function printTask(tasks) {
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];

    const taskName = task.name;
    const taskDescription = task.description;
    const taskDate = task.date;

    const taskBox = document.createElement("div");
    taskBox.className = "task-box";

    const containerCurrentTasks = document.createElement("div");
    containerCurrentTasks.className = "container-current-tasks";

    const tasksDiv = document.createElement("div");
    tasksDiv.className = "tasks-div";

    const taskProgress = document.createElement("input");
    taskProgress.type = "checkbox";
    taskProgress.className = "task-progress";

    const taskNamePrint = document.createElement("div");
    taskNamePrint.textContent = taskName;

    const taskDescriptionPrint = document.createElement("div");
    taskDescriptionPrint.textContent = taskDescription;

    const taskDatePrint = document.createElement("div");
    taskDatePrint.textContent = taskDate;

    tasksDiv.append(taskProgress);
    taskBox.append(taskNamePrint, taskDescriptionPrint, taskDatePrint);
    containerCurrentTasks.append(tasksDiv, taskBox);
    content.append(containerCurrentTasks);
  }

  removeForm();
  removeTask();
}

function removeForm() {
  const taskContainer = document.querySelector(".taskContainer");
  taskContainer.remove();
}

function removeTask() {
  const taskProgress = document.querySelectorAll(".task-progress");
  taskProgress.forEach((element, index) => {
    element.addEventListener("click", () => {
      const currentTask = element.closest(".container-current-tasks");
      if (currentTask) {
        currentTask.remove();
        let finishedTask = allTasks.splice(index, 1)[0];
        closedTasks.push(finishedTask);
        console.log(finishedTask, closedTasks);
      }
    });
  });
}
function addNewTask() {
  const taskNameInput = document.querySelector(".task-name");
  const taskDescriptionInput = document.querySelector(".task-description");
  const taskDateInput = document.querySelector(".task-date");

  const taskName = taskNameInput.value;
  const taskDescription = taskDescriptionInput.value;
  const taskDate = taskDateInput.value;

  allTasks.push({
    name: taskName,
    description: taskDescription,
    taskDate: taskDate,
  });
}

function clearTasks() {
  const allCurrentTasks = document.querySelectorAll(".container-current-tasks");
  if (allCurrentTasks) {
    allCurrentTasks.forEach((element) => {
      console.log(element);
      element.remove();
    });
  }
}

function printFinishedTasks() {
  const sideBarButtons = document.querySelector(".tasks ul");
  const finishedTask = sideBarButtons.children[2];
  finishedTask.addEventListener("click", () => {
    clearTasks();
    printTask(closedTasks);
  });
}

export { initializeForm, clearTasks, printFinishedTasks };
