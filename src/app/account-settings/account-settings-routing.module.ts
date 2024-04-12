import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountSettingsPage } from './account-settings.page';

const routes: Routes = [
  {
    path: '',
    component: AccountSettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountSettingsPageRoutingModule {}
