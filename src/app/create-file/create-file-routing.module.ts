import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateFilePage } from './create-file.page';

const routes: Routes = [
  {
    path: '',
    component: CreateFilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateFilePageRoutingModule {}
