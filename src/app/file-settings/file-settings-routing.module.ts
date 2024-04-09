import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FileSettingsPage } from './file-settings.page';

const routes: Routes = [
  {
    path: '',
    component: FileSettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FileSettingsPageRoutingModule {}
