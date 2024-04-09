import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../services/base.service';

@Component({
  selector: 'app-file-card',
  templateUrl: './file-card.component.html',
  styleUrls: ['./file-card.component.scss'],
})
export class FileCardComponent implements OnInit {
  @Input() file: any;

  constructor(private baseService: BaseService, private router: Router) {}

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

  openFile(file: any) {
    // Add show-file-changes component to body
    
    //this.router.navigate(['/tabs/projects/file/' + file.name]);
  }
}
