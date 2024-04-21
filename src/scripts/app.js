import { create } from "lodash";
import { format, compareAsc, add, intervalToDuration } from "date-fns";

let taskIdCounter = 2;

const allTasks = [
  {
    name: "Super Market",
    description: "Buy eggs, milk and bread.",
    date: "21-04-2024",
    id: "0",
  },
  {
    name: "Read Book",
    description: "Start to read the new novel from Stephen King",
    date: "22-04-2024",
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
    containerCurrentTasks.id = task.id;

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
        const taskIndex = allTasks.findIndex((t) => t.id == taskID);
        const removedTask = allTasks.splice(taskIndex, 1);
        let today = new Date();
        let dateOfEnd = format(today, "dd-MM-yyyy");
        console.log(dateOfEnd);
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
  const dateBeforeFormat = taskDateInput.value;
  const [year, month, day] = dateBeforeFormat.split("-");

  const taskName = taskNameInput.value;
  const taskDescription = taskDescriptionInput.value;
  const taskDate = format(new Date(year, month - 1, day), "dd-MM-yyyy");
  const taskId = ++taskIdCounter;

  allTasks.push({
    name: taskName,
    description: taskDescription,
    date: taskDate,
    id: taskId,
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

function printFinishedTasks(tasks) {
  const sideBarButtons = document.querySelector(".tasks ul");
  const finishedTask = sideBarButtons.children[2];
  const listOfFinishedTasks = document.createElement("h1");

  finishedTask.addEventListener("click", () => {
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
  const tasksForToday = sideBarButtons.children[0];

  const today = new Date();
  const todayCorrectFormat = format(today, "dd-MM-yyyy");
  tasksForToday.addEventListener("click", () => {
    clearTasks();
    removeTask();
    const tasksToday = tasks.filter((task) => task.date === todayCorrectFormat);
    if (tasksToday.length > 0) {
      printTask(tasksToday);
    }
    console.log("There's no tasks for today");
  });
}

function printWeeklyTasks(tasks) {
  const sideBarButtons = document.querySelector(".tasks ul");
  const weeklyTasks = sideBarButtons.children[1];
  const result = add(new Date(), {
    weeks: 1,
  });

  weeklyTasks.addEventListener("click", () => {
    clearTasks();
    removeTask();

    const tasksThisWeek = tasks.filter((task) => {
      const date = task.date;
      const [day, month, year] = date.split("-");
      const currentDate = new Date(year, month - 1, day);

      const interval = intervalToDuration({
        start: currentDate,
        end: result,
      });

      return interval.days > 0 && interval.days < 7;
    });

    if (tasksThisWeek.length > 0) {
      printTask(tasksThisWeek);
    }
  });
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
};
