import { create } from "lodash";

const content = document.querySelector(".content");
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

    const addTaskButton = document.createElement("button");
    addTaskButton.textContent = "Add task"
    addTaskButton.className = "task-button-add"

    form.appendChild(taskNameLabel);
    form.appendChild(taskNameInput);
    form.appendChild(taskDescriptionLabel);
    form.appendChild(taskDescriptionInput);
    form.appendChild(taskDateLabel);
    form.appendChild(taskDateInput);
    form.appendChild(addTaskButton);

    taskDiv.appendChild(form);
    content.appendChild(taskDiv);
  });
}

export default initializeForm;
