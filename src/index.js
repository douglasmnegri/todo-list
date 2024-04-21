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
  deleteTask
} from "./scripts/app.js";
import { toggleSideBar } from "./scripts/side-bar.js";

toggleSideBar();
printFinishedTasks(closedTasks);
printTodayTasks(allTasks);
printWeeklyTasks(allTasks);
printInbox();
initializeForm();
clearTasks();
deleteTask();