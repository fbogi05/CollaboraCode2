import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsPage } from './settings.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage,
    children: [
      { path: '', redirectTo: 'options', pathMatch: 'full' },
      { path: 'options', loadChildren: () => import('../settings-options/settings-options.module').then(m => m.SettingsOptionsPageModule) },
      { path: 'account', loadChildren: () => import('../account-settings/account-settings.module').then(m => m.AccountSettingsPageModule) },
      { path: 'theme', loadChildren: () => import('../theme-settings/theme-settings.module').then(m => m.ThemeSettingsPageModule) },
      { path: 'about', loadChildren: () => import('../about/about.module').then(m => m.AboutPageModule) },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsPageRoutingModule {}
