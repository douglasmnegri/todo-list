import { drop } from "lodash";
import { allTasks } from "./app";

// Need to make tasks smaller when they're being dragged
function dragTasks() {
  const taskCard = document.querySelectorAll(".container-current-tasks");
  const dropZone = document.querySelectorAll(".target-project");

  taskCard.forEach((element) => {
    element.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", event.target.id);
    });
  });

  dropZone.forEach((element) => {
    element.addEventListener("dragover", (event) => {
      event.preventDefault();
    });

    element.addEventListener("drop", (event) => {
      event.preventDefault();

      // Get the dragged task card ID from the data transfer
      let taskCardID = event.dataTransfer.getData("text/plain");
      let dropZoneID = event.target.dataset.id;


      // Update the project-id for the dragged task card
      for (let i = 0; i < allTasks.length; i++) {
        let task = allTasks[i];
        if (task.id === parseInt(taskCardID)) {
          task["project-id"] = parseInt(dropZoneID);
          break;
        }
      }

      console.log(allTasks);
    });
  });
}

export default dragTasks;
