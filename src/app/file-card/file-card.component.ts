import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../services/base.service';
import { Method } from 'ionicons/dist/types/stencil-public-runtime';
import { last, Observable, Subscription } from 'rxjs';
import { ProjectDetailsPage } from '../project-details/project-details.page';
import { HungarianDatePipe } from '../pipes/hungarian-date.pipe';

@Component({
  selector: 'app-file-card',
  templateUrl: './file-card.component.html',
  styleUrls: ['./file-card.component.scss'],
  providers: [HungarianDatePipe],
})
export class FileCardComponent implements OnInit {
  @Input() file: any;
  showFileChanges = () => {
    this.projectDetails.showFileChanges(this.file);
  };
  getLastEditTime = () => {
    if (!this.file.lastEditInformation) return '';
    else {
      let editedTime = new Date(
        this.file.lastEditInformation.lastEditedTime
      ).getTime();
      let editedDate = new Date(this.file.lastEditInformation.lastEditedTime);
      let currentDate = new Date();
      let daysSinceLastEdit = this.daysBetween(editedDate, currentDate);
      console.log(daysSinceLastEdit);

      let currentTime = new Date().getTime();
      let lastEditTime = currentTime - editedTime;
      let hours = Math.floor((lastEditTime / 1000 / 60 / 60) % 24);
      let minutes = Math.floor((lastEditTime / 1000 / 60) % 60);
      let seconds = Math.floor((lastEditTime / 1000) % 60);
      if (daysSinceLastEdit < 1) {
        return `${hours > 0 ? hours + ' órával' : ''}${
          hours > 0 && minutes > 0 ? ', ' : ''
        }${minutes > 0 ? minutes + ' perccel' : ''}${
          minutes < 1 && seconds > 0 ? ', ' : ''
        }${
          minutes < 1 && seconds > 0 ? seconds + ' másodperccel' : ''
        } ezelőtt`;
      } else {
        if (daysSinceLastEdit < 30) {
          return `${daysSinceLastEdit} nappal ezelőtt`;
        } else {
          return this.datePipe.transform(
            this.file.lastEditInformation.lastEditedTime
          );
        }
      }
    }
  };

  constructor(
    private projectDetails: ProjectDetailsPage,
    private datePipe: HungarianDatePipe,
    private baseService: BaseService
  ) {}

  ngOnInit() {
    if (
      localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  daysBetween(first: Date, second: Date) {
    // Copy date parts of the timestamps, discarding the time parts.
    let one = new Date(first.getFullYear(), first.getMonth(), first.getDate());
    let two = new Date(
      second.getFullYear(),
      second.getMonth(),
      second.getDate()
    );

    // Do the math.
    let millisecondsPerDay = 1000 * 60 * 60 * 24;
    let millisBetween = two.getTime() - one.getTime();
    let days = millisBetween / millisecondsPerDay;

    return days;
  }
}
