import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  iconPaths = {
    password: {
      passwordVisible: 'assets/password_visible.svg',
      passwordHidden: 'assets/password_hidden.svg',
    },
  };

  constructor() {}

  getPasswordIcon(passwordVisibility: boolean) {
    return this.iconPaths.password[
      passwordVisibility ? 'passwordVisible' : 'passwordHidden'
    ];
  }

  getProjects() {
    const projects = localStorage.getItem('projects');
    return projects ? JSON.parse(projects) : [];
  }

  createProject(projectName: string, userName: string) {
    const projects = this.getProjects();
    projects.push({
      id: projects.length,
      name: projectName,
      users: [
        { id: 1, name: userName },
        { id: 2, name: userName },
        { id: 3, name: userName },
        { id: 4, name: userName },
        { id: 5, name: userName },
      ],
    });
    localStorage.setItem('projects', JSON.stringify(projects));
  }

  removeProject(index: number) {
    const projects = this.getProjects();
    projects.splice(index, 1);
    localStorage.setItem('projects', JSON.stringify(projects));
  }
}
