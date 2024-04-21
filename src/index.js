import _ from "lodash";
import "./style.css";
import {
  initializeForm,
  clearTasks,
  printFinishedTasks,
  printTodayTasks,
  allTasks,
  removeTask,
  printWeeklyTasks,
} from "./scripts/app.js";
import { toggleSideBar } from "./scripts/side-bar.js";

initializeForm();
clearTasks();
toggleSideBar();
printFinishedTasks();
printTodayTasks(allTasks);
removeTask();
printWeeklyTasks(allTasks);