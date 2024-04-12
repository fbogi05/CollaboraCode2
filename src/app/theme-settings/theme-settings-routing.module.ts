import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThemeSettingsPage } from './theme-settings.page';

const routes: Routes = [
  {
    path: '',
    component: ThemeSettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThemeSettingsPageRoutingModule {}
