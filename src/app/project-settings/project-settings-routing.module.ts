import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectSettingsPage } from './project-settings.page';

const routes: Routes = [
  {
    path: '',
    component: ProjectSettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectSettingsPageRoutingModule {}
