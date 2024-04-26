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
} from "./scripts/app.js";
import { toggleSideBar, initializeProjectForm } from "./scripts/side-bar.js";

toggleSideBar();
printFinishedTasks(closedTasks);
printTodayTasks(allTasks);
printWeeklyTasks(allTasks);
printInbox();
initializeForm();
clearTasks();
changeTask();

//Side-tab
initializeProjectForm();
