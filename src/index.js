import "../src/style.css";
import {
  generateID,
  loadData,
  storeData,
  loadActiveProject,
} from "./modules/util";
import { Group } from "./modules/group";
import { Projects } from "./modules/project";
import { Tasks } from "./modules/task";
import {
  all,
  important,
  completed,
  overdue,
  addProjectBtn,
  projectList,
  projectModal,
  projectForm,
  projectTitle,
  projectIcon,
  cancelProjectModal,
  closeProjectModal,
  taskHeader,
  taskTree,
  taskModal,
  taskForm,
  taskName,
  cancelTaskModal,
  closeTaskModal,
} from "./modules/dom";
import {
  createProjectUI,
  createTaskHeader,
  createTaskUI,
  clearUI,
  render,
} from "./modules/ui";

const data = loadData() || new Group();
let activeProject = loadActiveProject() || null;

document.addEventListener("DOMContentLoaded", () => {
  render(data, activeProject);
});

addProjectBtn.addEventListener("click", () => {
  projectModal.classList.remove("hidden");
});

closeProjectModal.addEventListener("click", () => {
  projectModal.classList.add("hidden");
});

cancelProjectModal.addEventListener("click", () => {
  projectModal.classList.add("hidden");
});

projectForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const checkedIcon = document.querySelector('input[name="icons"]:checked');
  const iconValue = checkedIcon.value || null;

  const newProject = {
    id: generateID(),
    title: projectTitle.value,
    icon: iconValue.split(" "),
  };

  data.createProject(newProject);
  activeProject = data.getProjectById(newProject.id);

  storeData(data, activeProject);

  render(data, activeProject);

  projectForm.reset();
  projectModal.classList.add("hidden");
});

closeTaskModal.addEventListener("click", () => {
  taskModal.classList.add("hidden");
});

cancelTaskModal.addEventListener("click", () => {
  taskModal.classList.add("hidden");
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  taskTree.innerHTML = "";

  const getPriority = document.querySelector("#priority");
  let prio = getPriority.value || null;

  const getDate = document.querySelector("#date");
  const taskDate = getDate.value || null;

  const newTask = {
    id: generateID(),
    name: taskName.value,
    priority: prio,
    dueDate: taskDate,
    status: "incomlpete",
  };

  activeProject.createTask(newTask);
  storeData(data, activeProject);

  render(data, activeProject);

  taskForm.reset();
  taskModal.classList.add("hidden");
});

console.log(data);
console.log(localStorage);
