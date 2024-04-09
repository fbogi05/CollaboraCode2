import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FileSettingsPageRoutingModule } from './file-settings-routing.module';

import { FileSettingsPage } from './file-settings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FileSettingsPageRoutingModule
  ],
  declarations: [FileSettingsPage]
})
export class FileSettingsPageModule {}
