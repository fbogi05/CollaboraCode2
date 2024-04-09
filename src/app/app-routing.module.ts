import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterPageModule),
  },
  {
    path: 'error',
    loadChildren: () =>
      import('./error/error.module').then((m) => m.ErrorPageModule),
  },
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error',
  },  {
    path: 'create-file',
    loadChildren: () => import('./create-file/create-file.module').then( m => m.CreateFilePageModule)
  },
  {
    path: 'project-settings',
    loadChildren: () => import('./project-settings/project-settings.module').then( m => m.ProjectSettingsPageModule)
  },
  {
    path: 'file-settings',
    loadChildren: () => import('./file-settings/file-settings.module').then( m => m.FileSettingsPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
