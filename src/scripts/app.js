import { create, remove } from "lodash";
import { format, compareAsc, add, intervalToDuration } from "date-fns";
import { clearProject } from "./side-bar";
import dragTasks from "./drag-tasks.js";

let taskIdCounter = 2;

const allTasks = [
  {
    name: "Super Market",
    description: "Buy eggs, milk and bread.",
    date: "24-04-2024",
    id: "0",
  },
  {
    name: "Read Book",
    description: "Start to read the new novel from Stephen King",
    date: "26-04-2024",
    id: "1",
  },
];

const closedTasks = [];

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

    const tagSelect = document.createElement("select");
    tagSelect.className = "task-tags";

    const tagOptions = [
      "Personal",
      "Work",
      "Study",
      "Health",
      "Home",
      "Urgent",
    ];
    tagOptions.forEach((tag) => {
      const option = document.createElement("option");
      option.text = tag;
      option.value = tag.toLowerCase();
      tagSelect.add(option);
    });

    const tagLabel = document.createElement("label");
    tagLabel.textContent = "Tags: ";

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
    form.appendChild(tagLabel);
    form.appendChild(tagSelect);
    taskButtonDiv.appendChild(addTaskButton);
    taskButtonDiv.appendChild(cancelTaskButton);
    form.appendChild(taskButtonDiv);

    taskDiv.appendChild(form);
    addTaskBox.appendChild(taskDiv);

    addTaskButton.addEventListener("click", (e) => {
      e.preventDefault();
      addNewTask();
      printTask(allTasks);
      addButton.disabled = false;
    });

    cancelTaskButton.addEventListener("click", (e) => {
      e.preventDefault();
      removeForm();
      printTask(allTasks);
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
    containerCurrentTasks.id = task.id;
    containerCurrentTasks.draggable = true;

    const tasksDiv = document.createElement("div");
    tasksDiv.className = "tasks-div";

    const taskProgress = document.createElement("input");
    taskProgress.type = "checkbox";
    taskProgress.className = "task-progress";
    taskProgress.dataset.id = task.id;

    const taskNamePrint = document.createElement("div");
    taskNamePrint.textContent = taskName;

    const taskDescriptionPrint = document.createElement("div");
    taskDescriptionPrint.textContent = taskDescription;

    const taskDatePrint = document.createElement("div");
    taskDatePrint.textContent = taskDate;

    const iconDiv = document.createElement("div");
    iconDiv.className = "icon-div";

    const editButton = document.createElement("button");
    editButton.className = "edit-button";

    const editIcon = document.createElement("i");
    editIcon.className = "fa-regular fa-pen-to-square";

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";

    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fa-solid fa-trash";

    deleteButton.appendChild(deleteIcon);
    editButton.appendChild(editIcon);

    iconDiv.append(editButton, deleteButton);
    tasksDiv.append(taskProgress);
    taskBox.append(taskNamePrint, taskDescriptionPrint, taskDatePrint);
    containerCurrentTasks.append(tasksDiv, taskBox, iconDiv);
    content.append(containerCurrentTasks);
  }

  removeForm();
  removeTask();
  changeTask();
  dragTasks();
}

function removeForm() {
  const taskContainer = document.querySelector(".taskContainer");
  if (taskContainer) {
    taskContainer.remove();
  }
}

function removeTask() {
  const taskProgress = document.querySelectorAll(".task-progress");
  if (taskProgress.length > 0) {
    taskProgress.forEach((element) => {
      element.addEventListener("click", (event) => {
        const taskID = event.target.dataset.id;
        console.log(taskID);
        const taskIndex = allTasks.findIndex((t) => t.id == taskID);
        const removedTask = allTasks.splice(taskIndex, 1);
        let today = new Date();
        let dateOfEnd = format(today, "dd-MM-yyyy");
        removedTask[0].end = dateOfEnd;
        closedTasks.push(removedTask[0]);

        const taskBoxRemove = document.getElementById(taskID);
        taskBoxRemove.remove();
      });
    });
  }
}

function addNewTask() {
  const taskNameInput = document.querySelector(".task-name");
  const taskDescriptionInput = document.querySelector(".task-description");
  const taskDateInput = document.querySelector(".task-date");
  const taskTagInput = document.querySelector(".task-tags");
  const dateBeforeFormat = taskDateInput.value;
  const [year, month, day] = dateBeforeFormat.split("-");

  const taskName = taskNameInput.value;
  const taskDescription = taskDescriptionInput.value;
  const taskDate = format(new Date(year, month - 1, day), "dd-MM-yyyy");
  const taskId = ++taskIdCounter;
  const taskTag = taskTagInput.value;

  allTasks.push({
    name: taskName,
    description: taskDescription,
    date: taskDate,
    id: taskId,
    tag: taskTag,
  });
}

function clearTasks() {
  const allCurrentTasks = document.querySelectorAll(".container-current-tasks");
  const tasksAvailable = document.querySelector(".no-tasks");
  if (allCurrentTasks) {
    allCurrentTasks.forEach((element) => {
      console.log(element);
      element.remove();
    });
  }
  if (tasksAvailable) {
    tasksAvailable.remove();
  }
}

function printFinishedTasks(tasks) {
  const sideBarButtons = document.querySelector(".tasks ul");
  const finishedTask = sideBarButtons.children[3];
  const listOfFinishedTasks = document.createElement("h1");

  finishedTask.addEventListener("click", () => {
    clearProject();
    hideInbox();
    clearTasks();
    for (let i = 0; i < tasks.length; i++) {
      let task = tasks[i];

      const containerCurrentTasks = document.createElement("div");
      containerCurrentTasks.className = "container-current-tasks";

      const boxOfFinishedTasks = document.createElement("div");
      boxOfFinishedTasks.className = "box-finished-tasks";

      const taskWrapper = document.createElement("div");
      taskWrapper.className = "task-wrapper";

      const finishMark = document.createElement("span");
      finishMark.textContent = "✓";
      finishMark.className = "finish-mark";

      const taskName = document.createElement("div");
      taskName.textContent = task.name;

      const endDate = document.createElement("div");
      endDate.textContent = task.end;

      taskWrapper.append(finishMark, taskName);
      boxOfFinishedTasks.append(taskWrapper, endDate);
      containerCurrentTasks.append(boxOfFinishedTasks);
      content.append(listOfFinishedTasks, containerCurrentTasks);
    }
  });
}

function printTodayTasks(tasks) {
  const sideBarButtons = document.querySelector(".tasks ul");
  const tasksForToday = sideBarButtons.children[1];
  const content = document.querySelector(".content");
  const today = new Date();
  const todayCorrectFormat = format(today, "dd-MM-yyyy");
  tasksForToday.addEventListener("click", () => {
    clearTasks();
    removeTask();
    hideInbox();
    clearProject();
    const tasksToday = tasks.filter((task) => task.date === todayCorrectFormat);
    if (tasksToday.length > 0) {
      printTask(tasksToday);
    } else {
      const noTasksAvailable = document.createElement("div");
      noTasksAvailable.className = "no-tasks";
      noTasksAvailable.textContent = "There's no tasks for today! ";
      content.append(noTasksAvailable);
    }
  });
}

function printWeeklyTasks(tasks) {
  const sideBarButtons = document.querySelector(".tasks ul");
  const weeklyTasks = sideBarButtons.children[2];
  const content = document.querySelector(".content");

  const result = add(new Date(), {
    weeks: 1,
  });

  weeklyTasks.addEventListener("click", () => {
    clearTasks();
    removeTask();
    hideInbox();
    clearProject();

    const tasksThisWeek = tasks.filter((task) => {
      const date = task.date;
      const [day, month, year] = date.split("-");
      const currentDate = new Date(year, month - 1, day);

      const interval = intervalToDuration({
        start: currentDate,
        end: result,
      });
      return interval.days > 0 && interval.days <= 7;
    });

    if (tasksThisWeek.length > 0) {
      console.log(tasksThisWeek.length, tasksThisWeek);
      printTask(tasksThisWeek);
    } else {
      const noTasksAvailable = document.createElement("div");
      noTasksAvailable.className = "no-tasks";
      noTasksAvailable.textContent = "There's no tasks for this week! ";
      content.append(noTasksAvailable);
    }
  });
}

function printInbox() {
  const sideBarButtons = document.querySelector(".tasks ul");
  const inbox = sideBarButtons.children[0];

  inbox.addEventListener("click", () => {
    clearTasks();
    showInbox();
    clearProject();
    printTask(allTasks);
  });
}

function changeTask() {
  const containerCurrentTasks = document.querySelectorAll(
    ".container-current-tasks"
  );
  containerCurrentTasks.forEach((taskContainer) => {
    const deleteButton = taskContainer.querySelector(".delete-button");
    const editButton = taskContainer.querySelector(".edit-button");
    const taskName = taskContainer.querySelector(".task-box > div:first-child");
    const taskDescription = taskContainer.querySelector(
      ".task-box > div:nth-child(2)"
    );
    const taskDate = taskContainer.querySelector(
      ".task-box > div:nth-child(3)"
    );

    deleteButton.addEventListener("click", (event) => {
      const taskID = event.currentTarget.parentElement.parentElement.id;
      const taskIndex = allTasks.findIndex((t) => t.id == taskID);
      allTasks.splice(taskIndex, 1);
      const taskBoxRemove = document.getElementById(taskID);
      taskBoxRemove.remove();
    });

    editButton.addEventListener("click", (event) => {
      if (!editButton.classList.contains("editing")) {
        const inputName = document.createElement("input");
        const inputDescription = document.createElement("input");
        const inputDate = document.createElement("input");

        inputDate.type = "date";
        inputDate.value = inputDate.textContent;
        taskDate.textContent = "";
        taskDate.appendChild(inputDate);

        inputDescription.type = "text";
        inputDescription.value = taskDescription.textContent;
        taskDescription.textContent = "";
        taskDescription.appendChild(inputDescription);

        inputName.type = "text";
        inputName.value = taskName.textContent;
        taskName.textContent = "";
        taskName.appendChild(inputName);

        editButton.textContent = "Save";
        editButton.classList.add("editing");
      }

      if (editButton.classList.contains("editing")) {
        const updatedTaskName = taskName.querySelector("input").value;
        const updatedTaskDescription =
          taskDescription.querySelector("input").value;
        const updatedTaskDate = taskDate.querySelector("input").value;
        const [year, month, day] = updatedTaskDate.split("-").map(Number);
        const formattedDate = format(
          new Date(year, month - 1, day),
          "dd-MM-yyyy"
        );

        const taskID = event.currentTarget.parentElement.parentElement.id;
        const taskIndex = allTasks.findIndex((t) => t.id == taskID);
        allTasks[taskIndex].name = updatedTaskName;
        allTasks[taskIndex].description = updatedTaskDescription;
        allTasks[taskIndex].date = formattedDate;

        taskName.textContent = "";
        taskName.textContent = updatedTaskName;

        taskDescription.textContent = "";
        taskDescription.textContent = updatedTaskDescription;

        taskDate.textContent = "";
        taskDate.textContent = formattedDate;

       // Append the edit icon back to the button
       const editIcon = document.createElement("i");
       editIcon.className = "fa-regular fa-pen-to-square";
       editButton.textContent = "";
       editButton.appendChild(editIcon);
       
       editButton.classList.remove("editing");
      }
    });
  });
}

function hideInbox() {
  const inboxTitle = document.querySelector(".inbox");
  const addTaskButton = document.querySelector(".add-task");
  const addTaskTitle = document.querySelector(".add-task-title");
  inboxTitle.style.display = "none";
  addTaskButton.style.display = "none";
  addTaskTitle.style.display = "none";
}

function showInbox() {
  const inboxTitle = document.querySelector(".inbox");
  const addTaskButton = document.querySelector(".add-task");
  const addTaskTitle = document.querySelector(".add-task-title");

  inboxTitle.style.display = "";
  addTaskButton.style.display = "";
  addTaskTitle.style.display = "";
}

export {
  initializeForm,
  clearTasks,
  printFinishedTasks,
  printTodayTasks,
  allTasks,
  removeTask,
  printWeeklyTasks,
  closedTasks,
  printInbox,
  changeTask,
  hideInbox,
  printTask
};
