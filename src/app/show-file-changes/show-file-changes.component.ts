import {
  AfterViewInit,
  Component,
  HostListener,
  Input,
  NgModule,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ProjectDetailsPage } from '../project-details/project-details.page';
import { HungarianDatePipe } from '../pipes/hungarian-date.pipe';
import { Router } from '@angular/router';
import * as CodeMirror from 'codemirror';

import 'codemirror/mode/python/python';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/sql/sql';
import 'codemirror/mode/php/php';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/matchtags';
import 'codemirror/addon/selection/active-line';
import { BaseService } from '../services/base.service';

@Component({
  selector: 'app-show-file-changes',
  templateUrl: './show-file-changes.component.html',
  styleUrls: ['./show-file-changes.component.scss'],
  providers: [HungarianDatePipe],
})
export class ShowFileChangesComponent implements OnInit, AfterViewInit {
  @Input() lastEditInformation?: any;
  @Input() currentProjectName?: string;
  @Input() fileChangesOpened = false;
  codeMirror: CodeMirror.EditorFromTextArea | null = null;
  hideFileChanges = () => {
    this.projectDetails.hideFileChanges();
  };
  getLastEditedTime = () => {
    if (!this.lastEditInformation) return '';
    else {
      return this.datePipe.transform(this.lastEditInformation.lastEditedTime);
    }
  };

  constructor(
    private router: Router,
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

  ngAfterViewInit() {
    const retryCount = 30;

    let tries = 0;
    const interval = setInterval(() => {
      if (this.lastEditInformation || ++tries >= retryCount) {
        this.initializeEditor();
        clearInterval(interval);
      }
    }, 100);
  }

  async initializeEditor() {
    const editor = CodeMirror.fromTextArea(
      document.getElementById('codeEditor') as HTMLTextAreaElement,
      {
        lineNumbers: true,
        mode: 'python',
        theme: 'ayu-dark',
        autoCloseBrackets: true,
        autoCloseTags: true,
        matchBrackets: true,
        matchTags: true,
        showCursorWhenSelecting: true,
        showHint: true,
      }
    );

    try {
      if (this.lastEditInformation) {
        editor.setValue(await this.getFileContentAsString());
      }
    } catch (error) {
      console.error(error);
    }

    editor.setSize('100%', '100%');
    editor.focus();

    editor.on('change', () => {
      this.baseService
        .editFileContent(this.lastEditInformation!.id, editor.getValue())
        .subscribe(() => {
          this.baseService
            .getLastEditInformation(this.lastEditInformation!.id)
            .subscribe((info: any) => {
              this.lastEditInformation = info;
              editor.setValue(info.content);
              editor.refresh();
            });
        });
    });

    // Real time content update
    this.baseService
      .getFileContent(this.lastEditInformation!.id)
      .subscribe((content: any) => {
        editor.setValue(content as string);
        editor.refresh();
      });
  }

  changeLanguage() {
    if (!this.codeMirror) return;
    const mode = (document.getElementById('languages') as HTMLSelectElement)
      .value;
    this.codeMirror!.setOption('mode', mode);
    this.codeMirror!.refresh();
  }

  getFileContentAsString(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (!this.lastEditInformation) {
        console.error('lastEditInformation is null or undefined');
        reject(new Error('lastEditInformation is null or undefined'));
        return;
      }

      const fileId = this.lastEditInformation.id;
      if (!fileId) {
        console.error('lastEditInformation.id is null or undefined');
        reject(new Error('lastEditInformation.id is null or undefined'));
        return;
      }

      this.baseService.getFileContent(fileId).subscribe(
        (data: any) => {
          if (!data) {
            console.error('data is null or undefined');
            reject(new Error('data is null or undefined'));
            return;
          }
          if (!data.content) {
            console.error('data.content is null or undefined');
            reject(new Error('data.content is null or undefined'));
            return;
          }
          resolve(data.content);
        },
        (error: Error) => {
          console.error(`Error getting file content: ${error.message}`, error);
          reject(error);
        }
      );
    });
  }

  openFileSettings() {
    this.router.navigate(['/tabs/projects/file-settings']);
  }
}
