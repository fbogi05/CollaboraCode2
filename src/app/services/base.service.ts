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

  addProject() {
    const projects = this.getProjects();
    projects.push({
      id: projects.length,
      name: `Projekt ${projects.length + 1}`,
      users: [
        { id: 1, name: 'Felhasználó 1' },
        { id: 2, name: 'Felhasználó 2' },
        { id: 3, name: 'Felhasználó 3' },
        { id: 4, name: 'Felhasználó 4' },
        { id: 5, name: 'Felhasználó 5' },
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
