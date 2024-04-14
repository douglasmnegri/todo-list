const sideTab = document.querySelector(".side-tab");
const hamburgerIcon = document.querySelector(".hamburger"); 
function toggleSideBar() {
  hamburgerIcon.addEventListener("click", () => {
    sideTab.classList.toggle("active");
  });
}

export default toggleSideBar;
