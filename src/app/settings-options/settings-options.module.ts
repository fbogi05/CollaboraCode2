import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsOptionsPageRoutingModule } from './settings-options-routing.module';

import { SettingsOptionsPage } from './settings-options.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsOptionsPageRoutingModule
  ],
  declarations: [SettingsOptionsPage]
})
export class SettingsOptionsPageModule {}
