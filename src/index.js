import _ from "lodash";
import "./style.css";
import { initializeForm, clearTasks } from "./scripts/app.js";
import toggleSideBar from "./scripts/side-bar.js";

initializeForm();
clearTasks();
toggleSideBar();
