import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectsOverviewPage } from './projects-overview.page';

const routes: Routes = [
  {
    path: '',
    component: ProjectsOverviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsOverviewPageRoutingModule {}
