import { format, compareAsc } from "date-fns";
import {
  clearTasks,
  hideInbox,
  printTask,
  allTasks,
} from "./app";

const allProjects = [];

let projectIdCounter = 0;

const sideTab = document.querySelector(".side-tab");
const hamburgerIcon = document.querySelector(".hamburger");
function toggleSideBar() {
  hamburgerIcon.addEventListener("click", () => {
    sideTab.classList.toggle("active");
  });
}

function initializeProjectForm() {
  const content = document.querySelector(".content");

  const overlay = document.createElement("div");
  overlay.id = "overlay";
  overlay.style.display = "none";

  const modal = document.createElement("div");
  modal.id = "modal";
  modal.style.display = "none";

  const closeButton = document.createElement("span");
  closeButton.classList.add("close");
  closeButton.innerHTML = "&times;";

  const header = document.createElement("h2");
  header.innerText = "Add New Project";

  const projectNameInput = document.createElement("input");
  projectNameInput.type = "text";
  projectNameInput.id = "project-name";
  projectNameInput.placeholder = "Project Name";

  const projectDescriptionTextarea = document.createElement("textarea");
  projectDescriptionTextarea.id = "project-description";
  projectDescriptionTextarea.placeholder = "Project Description";

  const createButton = document.createElement("button");
  createButton.id = "create-project";
  createButton.innerText = "Create Project";

  modal.appendChild(closeButton);
  modal.appendChild(header);
  modal.appendChild(projectNameInput);
  modal.appendChild(document.createElement("br"));
  modal.appendChild(projectDescriptionTextarea);
  modal.appendChild(document.createElement("br"));
  modal.appendChild(createButton);

  content.appendChild(overlay);
  content.appendChild(modal);

  const newProjectButton = document.querySelector("#new-project");
  newProjectButton.addEventListener("click", () => {
    clearTasks();
    overlay.style.display = "block";
    modal.style.display = "block";
  });

  closeButton.addEventListener("click", () => {
    overlay.style.display = "none";
    modal.style.display = "none";
  });

  createButton.addEventListener("click", (e) => {
    e.preventDefault();
    addNewProject();
    printProject();
    overlay.style.display = "none";
    modal.style.display = "none";
  });
}

function addNewProject() {
  const projectNameInput = document.getElementById("project-name");
  const projectDescriptionInput = document.getElementById(
    "project-description"
  );

  const projectName = projectNameInput.value;
  const projectDescription = projectDescriptionInput.value;
  const projectId = ++projectIdCounter;

  allProjects.push({
    "project-name": projectName,
    "project-description": projectDescription,
    "project-id": projectId,
  });

  printProjectList(projectName, projectId);
}

function printProjectList(projectName, projectId) {
  const projectList = document.querySelector(".projects-container ol");
  const projectTab = document.createElement("li");
  projectTab.textContent = projectName;
  projectTab.className = "target-project";

  projectTab.dataset.id = projectId;
  projectTab.draggable = true;
  projectList.appendChild(projectTab);
}

function printProject() {
  const projectTabs = document.querySelectorAll(".target-project");
  const projectContent = document.querySelector(".project-content");
  if (projectTabs.length > 0) {
    projectTabs.forEach((element) => {
      element.addEventListener("click", (event) => {
        hideInbox();
        clearProject();
        clearTasks();


        //Need to fix the layout of how tasks are being add
        const projectID = event.target.dataset.id;
        const matchingTasks = allTasks.filter(
          (t) => t["project-id"] == projectID
        );

        if (matchingTasks.length > 0) {
          printTask(matchingTasks);
        }

        for (let i = 0; i < allProjects.length; i++) {
          const projects = allProjects[i];
          if (projects["project-id"] == projectID) {
            const projectBox = document.createElement("div");
            projectBox.className = "project-box";

            const printProjectTitle = document.createElement("div");
            printProjectTitle.textContent = projects["project-name"];
            printProjectTitle.className = "project-print-title";

            const printProjectDescription = document.createElement("div");
            printProjectDescription.textContent =
              projects["project-description"];
            printProjectDescription.className = "project-print-description";

            projectBox.append(printProjectTitle, printProjectDescription);
            projectContent.appendChild(projectBox);
          }
        }
      });
    });
  }
}


function clearProject() {
  const projectBox = document.querySelectorAll(".project-box");
  projectBox.forEach((element) => {
    element.remove();
  });
}
export {
  toggleSideBar,
  initializeProjectForm,
  clearProject,
  printProject,
  allProjects,
};
