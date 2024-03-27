import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountSettingsPageRoutingModule } from './account-settings-routing.module';

import { AccountSettingsPage } from './account-settings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountSettingsPageRoutingModule
  ],
  declarations: [AccountSettingsPage]
})
export class AccountSettingsPageModule {}
