import { Tasks } from "./task";

export class Projects {
  constructor(project) {
    this.id = project.id;
    this.title = project.title;
    this.icon = project.icon;
    this.tasks = [];
  }

  createTask(data) {
    this.tasks.push(new Tasks(data));
  }

  deleteTask(e) {
    const currentTask = this.tasks;
    this.tasks = currentTask.filter((task) => {
      return task.id !== e.id;
    });
  }
}
