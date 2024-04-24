import { format, compareAsc } from "date-fns";
import { clearTasks } from "./app";

const allProjects = [];

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
    
    overlay.style.display = "none";
    modal.style.display = "none";

    addNewProject();
  });

}
function addNewProject() {
  const projectNameInput = document.getElementById("project-name");
  const projectDescriptionInput = document.getElementById(
    "project-description"
  );

  const projectName = projectNameInput.value;
  const projectDescription = projectDescriptionInput.value;

  allProjects.push({
    project: projectName,
    "project-description": projectDescription,
  });

  const newProjectTab = document.querySelector(".projects-container ol");
  console.log(newProjectTab);
  const projectTab = document.createElement("li");
  projectTab.textContent = projectName;
  newProjectTab.append(projectTab);
}

export { toggleSideBar, initializeProjectForm };
