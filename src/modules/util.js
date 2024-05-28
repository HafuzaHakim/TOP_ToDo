import { Group } from "./group";
import { Projects } from "./project";
import { Tasks } from "./task";

export function generateID() {
  const digits = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
  ];

  let id = 0;

  for (let i = 0; i < 15; i++) {
    id = id + digits[Math.floor(Math.random() * digits.length)];
  }

  return id;
}

export function loadData() {
  const storedData = localStorage.getItem("data");
  if (!storedData) {
    return null;
  }
  const plainData = JSON.parse(storedData);
  Object.setPrototypeOf(plainData, Group.prototype);
  plainData.projects.forEach((prj) => {
    Object.setPrototypeOf(prj, Projects.prototype);

    prj.tasks.forEach((tsk) => {
      Object.setPrototypeOf(tsk, Tasks.prototype);
    });
  });

  return plainData;
}

export function loadActiveProject() {
  const storedActive = localStorage.getItem("active");
  if (!storedActive) {
    return null;
  }

  const focusProject = JSON.parse(storedActive);
  Object.setPrototypeOf(focusProject, Projects.prototype);
  focusProject.tasks.forEach((tsk) => {
    Object.setPrototypeOf(tsk, Tasks.prototype);
  });

  return focusProject;
}

export function storeData(data, active) {
  localStorage.setItem("data", JSON.stringify(data));
  localStorage.setItem("active", JSON.stringify(active));
}
