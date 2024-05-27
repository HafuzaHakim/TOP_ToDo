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

  deleteProject(e) {
    const currentProject = this.projects;
    this.projects = currentProject.filter((project) => {
      return project.id !== e.id;
    });
  }
}
