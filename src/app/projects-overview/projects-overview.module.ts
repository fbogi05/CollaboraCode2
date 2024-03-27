import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProjectsOverviewPageRoutingModule } from './projects-overview-routing.module';

import { ProjectsOverviewPage } from './projects-overview.page';
import { ProjectCardComponent } from '../project-card/project-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProjectsOverviewPageRoutingModule
  ],
  declarations: [ProjectsOverviewPage, ProjectCardComponent],
})
export class ProjectsOverviewPageModule {}
