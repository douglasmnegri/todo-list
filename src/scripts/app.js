import { create } from "lodash";

const allTasks = [];

class Tasks {
  constructor(name, description, date) {
    this.name = name;
    this.description = description;
    this.date = date;
  }
}

const content = document.querySelector(".content");
const addTaskBox = document.querySelector(".add-task-box");
const addButton = document.querySelector(".add-task");

function initializeForm() {
  addButton.addEventListener("click", () => {
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
      printTask();
      addButton.disabled = false;
    });

    cancelTaskButton.addEventListener("click", (e) => {
      e.preventDefault();
      removeForm();
      addButton.disabled = false;
    });
  });
}

function printTask() {
  const taskName = document.querySelector(".task-name").value;
  const taskDescription = document.querySelector(".task-description").value;
  const taskDate = document.querySelector(".task-date").value;

  const newTask = new Tasks(taskName, taskDescription, taskDate);
  allTasks.push(newTask);

  const containerCurrentTasks = document.createElement("div");
  containerCurrentTasks.className = "container-current-tasks";

  const taskNamePrint = document.createElement("div");
  taskNamePrint.textContent = taskName;

  const taskDescriptionPrint = document.createElement("div");
  taskDescriptionPrint.textContent = taskDescription;

  const taskDatePrint = document.createElement("div");
  taskDatePrint.textContent = taskDate;

  containerCurrentTasks.appendChild(taskNamePrint);
  containerCurrentTasks.appendChild(taskDescriptionPrint);
  containerCurrentTasks.appendChild(taskDatePrint);
  content.append(containerCurrentTasks);

  removeForm();
}

function removeForm() {
  const taskContainer = document.querySelector(".taskContainer");
  taskContainer.remove();
}

export default initializeForm;
