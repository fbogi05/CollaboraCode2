import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsPage } from './settings.page';
import { GeneralSettingsComponent } from '../general-settings/general-settings.component';
import { UserSettingsComponent } from '../user-settings/user-settings.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage,
    children: [
      { path: '', redirectTo: 'general', pathMatch: 'full' },
      { path: 'general', component: GeneralSettingsComponent },
      { path: 'user', component: UserSettingsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsPageRoutingModule {}
