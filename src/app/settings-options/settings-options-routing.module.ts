import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsOptionsPage } from './settings-options.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsOptionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsOptionsPageRoutingModule {}
