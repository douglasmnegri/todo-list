import _ from "lodash";
import "./style.css";
import {
  initializeForm,
  clearTasks,
  printFinishedTasks,
  printTodayTasks,
  allTasks,
  printWeeklyTasks,
  closedTasks,
  printInbox,
  changeTask,
  loadTasksFromLocalStorage,
} from "./scripts/app.js";

import {
  toggleSideBar,
  initializeProjectForm,
  allProjects,
} from "./scripts/side-bar.js";


// Local storage
const [loadedTasks, loadedClosedTasks] = loadTasksFromLocalStorage();
allTasks.push(...loadedTasks.filter(task => task.name)); 
closedTasks.push(...loadedClosedTasks.filter(task => task.name)); 

// Print loaded closed tasks to the UI
printFinishedTasks(closedTasks);

// App functions
toggleSideBar();
printTodayTasks(allTasks);
printWeeklyTasks(allTasks);
printInbox();
initializeForm();
clearTasks();
changeTask();

// Side-tab
initializeProjectForm();
