import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProjectSettingsPageRoutingModule } from './project-settings-routing.module';

import { ProjectSettingsPage } from './project-settings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProjectSettingsPageRoutingModule
  ],
  declarations: [ProjectSettingsPage]
})
export class ProjectSettingsPageModule {}
