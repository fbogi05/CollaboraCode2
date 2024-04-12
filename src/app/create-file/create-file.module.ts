import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateFilePageRoutingModule } from './create-file-routing.module';

import { CreateFilePage } from './create-file.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateFilePageRoutingModule
  ],
  declarations: [CreateFilePage]
})
export class CreateFilePageModule {}
