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
  editProjectModal,
  editProjectForm,
  editProjectTitle,
  editCancelProjectModal,
  editCloseProjectModal,
  editTaskModal,
  editTaskForm,
  cancelEditTaskModal,
  closeEditTaskModal,
} from "./modules/dom";
import {
  createProjectUI,
  createTaskHeader,
  createTaskUI,
  clearUI,
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
    status: "incomplete",
  };

  activeProject.createTask(newTask);
  storeData(data, activeProject);

  render(data, activeProject);

  taskForm.reset();
  taskModal.classList.add("hidden");
});

editCloseProjectModal.addEventListener("click", () => {
  editProjectModal.classList.add("hidden");
});

editCancelProjectModal.addEventListener("click", () => {
  editProjectModal.classList.add("hidden");
});

cancelEditTaskModal.addEventListener("click", () => {
  editTaskModal.classList.add("hidden");
});

closeEditTaskModal.addEventListener("click", () => {
  editTaskModal.classList.add("hidden");
});

function render(main, submain) {
  clearUI();
  main.projects.forEach((proj) => {
    createProjectUI(proj);
  });

  if (!submain) {
    return;
  } else {
    createTaskHeader(submain.title);

    submain.tasks.forEach((task) => {
      createTaskUI(task);
    });
  }

  //Read and Display Individual Project

  const projectNodes = document.querySelectorAll(".project_item");
  projectNodes.forEach((node) => {
    node.addEventListener("click", (e) => {
      activeProject = data.getProjectById(node.id);
      storeData(data, activeProject);
      render(data, activeProject);
    });
  });

  //Delete the corresponding project

  const deleteProjectNodes = document.querySelectorAll(
    ".project_item .fa-trash"
  );
  const firstChild = projectList.firstElementChild;
  deleteProjectNodes.forEach((node) => {
    node.addEventListener("click", (e) => {
      e.stopPropagation();
      const target = node.parentElement;

      if (target === target.parentElement.firstElementChild) {
        if (target.nextElementSibling) {
          activeProject = data.getProjectById(target.nextElementSibling.id);
        } else {
          activeProject = null;
        }
      } else {
        if (target.previousElementSibling) {
          activeProject = data.getProjectById(target.previousElementSibling.id);
        } else if (target.nextElementSibling) {
          activeProject = data.getProjectById(target.nextElementSibling.id);
        } else {
          activeProject = null;
        }
      }
      data.deleteProject(target.id);
      storeData(data, activeProject);
      render(data, activeProject);
    });
  });

  // Update the corresponding project

  const editProjectNodes = document.querySelectorAll(
    ".project_item .fa-pen-to-square"
  );
  editProjectNodes.forEach((node) => {
    node.addEventListener("click", (e) => {
      e.stopPropagation();
      const targetNode = node.parentElement;
      activeProject = data.getProjectById(targetNode.id);

      editProjectTitle.value = activeProject.title;

      editProjectModal.classList.remove("hidden");
      editProjectForm.addEventListener("submit", (e) => {
        e.preventDefault();

        activeProject.title = editProjectTitle.value;

        const checkedIcon = document.querySelector(
          'input[name="icons_edit"]:checked'
        );
        const iconValue = checkedIcon.value || null;

        activeProject.icon = iconValue.split(" ");

        editProjectModal.classList.add("hidden");
        storeData(data, activeProject);
        render(data, activeProject);
      });
    });
  });

  // Change the task status
  const taskNodes = document.querySelectorAll(".task_item");
  taskNodes.forEach((node) => {
    node.addEventListener("click", () => {
      const targetTask = activeProject.getTaskById(node.id);
      if (targetTask.status === "incomplete") {
        targetTask.completeTask();
      } else if (targetTask.status === "complete") {
        targetTask.incompleteTask();
      }
      storeData(data, activeProject);
      render(data, activeProject);
    });
  });

  // Update the task
  const editTaskNodes = document.querySelectorAll(
    ".task_item .fa-pen-to-square"
  );
  editTaskNodes.forEach((node) => {
    node.addEventListener("click", (e) => {
      e.stopPropagation();
      const targetNode = node.parentElement;
      const targetTask = activeProject.getTaskById(targetNode.id);
      console.log(targetTask);

      const targetTitle = document.querySelector("#taskEdit");
      const targetPriority = document.querySelector("#priorityEdit");
      const targetDate = document.querySelector("#dateEdit");

      targetTitle.value = targetTask.name;
      targetPriority.value = targetTask.priority;
      targetDate.value = targetTask.dueDate;

      editTaskModal.classList.remove("hidden");

      editTaskForm.addEventListener("submit", (e) => {
        e.preventDefault();

        targetTask.name = document.querySelector("#taskEdit").value;
        targetTask.priority = document.querySelector("#priorityEdit").value;
        targetTask.dueDate = document.querySelector("#dateEdit").value;

        editTaskModal.classList.add("hidden");
        storeData(data, activeProject);
        render(data, activeProject);
      });
    });
  });
}
