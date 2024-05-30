import { Tasks } from "./task";

export class Projects {
  constructor(project) {
    this.id = project.id;
    this.title = project.title;
    this.icon = project.icon;
    this.tasks = [];
  }

  getTaskById(id) {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(data) {
    this.tasks.push(new Tasks(data));
  }

  deleteTask(id) {
    const filteredTask = this.tasks.filter((task) => task.id !== id);
    this.tasks = filteredTask;
  }
}
