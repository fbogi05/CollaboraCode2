import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThemeSettingsPageRoutingModule } from './theme-settings-routing.module';

import { ThemeSettingsPage } from './theme-settings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThemeSettingsPageRoutingModule
  ],
  declarations: [ThemeSettingsPage]
})
export class ThemeSettingsPageModule {}
