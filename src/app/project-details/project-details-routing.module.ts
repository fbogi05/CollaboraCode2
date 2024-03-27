import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectDetailsPage } from './project-details.page';

const routes: Routes = [
  {
    path: '',
    component: ProjectDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectDetailsPageRoutingModule {}
