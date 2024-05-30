import { Projects } from "./project";

export class Group {
  constructor() {
    this.projects = [];
  }

  getProjectById(id) {
    return this.projects.find((project) => project.id === id);
  }

  createProject(data) {
    this.projects.push(new Projects(data));
  }

  deleteProject(id) {
    const filteredProject = this.projects.filter(
      (project) => project.id !== id
    );
    this.projects = filteredProject;
  }

  editProject(id) {}
}
