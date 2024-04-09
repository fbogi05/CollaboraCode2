import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectsPage } from './projects.page';

const routes: Routes = [
  {
    path: '',
    component: ProjectsPage,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      {
        path: 'overview',
        loadChildren: () =>
          import('../projects-overview/projects-overview.module').then(
            (m) => m.ProjectsOverviewPageModule
          ),
      },
      {
        path: 'create-project',
        loadChildren: () =>
          import('../create-project/create-project.module').then(
            (m) => m.CreateProjectPageModule
          ),
      },
      {
        path: 'create-file',
        loadChildren: () =>
          import('../create-file/create-file.module').then(
            (m) => m.CreateFilePageModule
          ),
      },
      {
        path: 'details/:name',
        loadChildren: () =>
          import('../project-details/project-details.module').then(
            (m) => m.ProjectDetailsPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsPageRoutingModule {}
