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
  taskPriority,
  taskDueDate,
  cancelTaskModal,
  closeTaskModal,
} from "./dom";

export function createProjectUI(project) {
  const li = document.createElement("li");
  li.classList.add("project_item");
  li.setAttribute("id", `${project.id}`);

  const projectIcon = document.createElement("i");
  project.icon.forEach((element) => {
    projectIcon.classList.add(element);
  });

  const pText = document.createElement("p");
  pText.classList.add("project_name");
  pText.textContent = project.title;

  const editIcon = document.createElement("i");
  const editClass = ["fa-solid", "fa-pen-to-square"];
  editClass.forEach((classes) => {
    editIcon.classList.add(classes);
  });

  const deleteIcon = document.createElement("i");
  const deleteClass = ["fa-solid", "fa-trash"];
  deleteClass.forEach((classes) => {
    deleteIcon.classList.add(classes);
  });

  li.appendChild(projectIcon);
  li.appendChild(pText);
  li.appendChild(editIcon);
  li.appendChild(deleteIcon);

  projectList.appendChild(li);
}

export function createTaskHeader(name) {
  const title = document.createElement("h3");
  title.classList.add("main_title");
  title.textContent = name;

  taskHeader.appendChild(title);
  createAddBtn();
}

export function createTaskUI(task) {
  const li = document.createElement("li");
  li.classList.add("task_item");
  if (task.status === "complete") {
    li.classList.add("completed");
  }
  li.setAttribute("id", `${task.id}`);

  const boxIcon = document.createElement("i");
  if (task.status === "incomplete") {
    const boxClass = ["fa-regular", "fa-square", "uncheck"];
    boxClass.forEach((classes) => {
      boxIcon.classList.add(classes);
    });
  } else {
    const boxClass = ["fa-regular", "fa-square-check"];
    boxClass.forEach((classes) => {
      boxIcon.classList.add(classes);
    });
  }

  const taskText = document.createElement("p");
  taskText.classList.add("task_content");
  taskText.textContent = task.name;

  const date = document.createElement("span");
  date.classList.add("date");
  date.textContent = task.dueDate;

  const editIcon = document.createElement("i");
  const editClass = ["fa-solid", "fa-pen-to-square"];
  editClass.forEach((classes) => {
    editIcon.classList.add(classes);
  });

  const deleteIcon = document.createElement("i");
  const deleteClass = ["fa-solid", "fa-trash"];
  deleteClass.forEach((classes) => {
    deleteIcon.classList.add(classes);
  });

  li.appendChild(boxIcon);
  li.appendChild(taskText);
  li.appendChild(date);
  li.appendChild(editIcon);
  li.appendChild(deleteIcon);

  taskTree.appendChild(li);
}

export function clearUI() {
  projectList.innerHTML = "";
  taskHeader.innerHTML = "";
  taskTree.innerHTML = "";
}

function createAddBtn() {
  const btn = document.createElement("button");
  btn.classList.add("add_task");
  btn.textContent = "Add +";

  btn.addEventListener("click", () => {
    taskModal.classList.remove("hidden");
  });

  taskHeader.appendChild(btn);
}
