
export class Tasks {
  constructor(task) {
    this.id = task.id;
    this.name = task.name;
    this.priority = task.priority;
    this.dueDate = task.dueDate;
    this.status = task.status;
  }

  completeTask() {
    this.status = "complete";
  }

  incompleteTask() {
    this.status = "incomplete";
  }

}
