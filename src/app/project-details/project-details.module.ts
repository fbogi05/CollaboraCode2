import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProjectDetailsPageRoutingModule } from './project-details-routing.module';

import { ProjectDetailsPage } from './project-details.page';
import { FileCardComponent } from '../file-card/file-card.component';
import { ShowFileChangesComponent } from '../show-file-changes/show-file-changes.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProjectDetailsPageRoutingModule,
  ],
  declarations: [ProjectDetailsPage, FileCardComponent, ShowFileChangesComponent],
})
export class ProjectDetailsPageModule {}
