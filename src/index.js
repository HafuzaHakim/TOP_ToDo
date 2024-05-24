import "../src/style.css";
import { generateID } from "./modules/util";
import { Group } from "./modules/group";
import { Projects } from "./modules/project";
import { Tasks } from "./modules/task";
import {
  dataField,
  all,
  important,
  completed,
  overdue,
  addProjectBtn,
  projectList,
  projectModal,
  projectForm,
  projectTitle,
  cancelProjectModal,
  closeProjectModal,
  taskModal,
  taskForm,
  taskName,
  taskPriority,
  taskDueDate,
  cancelTaskModal,
  closeTaskModal,
} from "./modules/dom";

const data = new Group();

const proj1 = {
  id: generateID(),
  title: "Project One",
  icon: "https://kit.fontawesome.com/7a916139ac.js",
};

const proj2 = {
  id: generateID(),
  title: "Project Two",
  icon: "https://kit.fontawesome.com/7a916139ac.js",
};

const tsk = {
  id: generateID(),
  name: "Task",
  priority: "Low",
  dueDate: "Date",
  status: "incomplete",
};

data.createProject(proj1);
data.createProject(proj2);

console.log(data);
