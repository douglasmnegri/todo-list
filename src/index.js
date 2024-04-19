import _ from "lodash";
import "./style.css";
import { initializeForm, clearTasks, printFinishedTasks, printTasksToday, allTasks, removeTask } from "./scripts/app.js";
import { toggleSideBar } from "./scripts/side-bar.js";

initializeForm();
clearTasks();
toggleSideBar();
printFinishedTasks();
printTasksToday(allTasks);

removeTask();