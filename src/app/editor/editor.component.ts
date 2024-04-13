import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { ProjectService } from '../project.service';
import { BackendService } from '../backend.service';

import CodeMirror from 'codemirror';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/css/css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/php/php';
import 'codemirror/mode/python/python';
import 'codemirror/mode/sql/sql';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent implements AfterViewInit {
  isLanguageDropdownOpen: boolean = false;
  @ViewChild('codemirror')
  codeMirror: any;
  code: any;
  options = { lineNumbers: true, theme: '3024-night', mode: 'python', autocomplete: true }

  constructor(private auth: AuthService, private projectService: ProjectService, private backendService: BackendService) { }

  ngAfterViewInit(): void {
    let textarea = document.getElementById('codemirror') as HTMLTextAreaElement;
    this.codeMirror = CodeMirror.fromTextArea(textarea, this.options);

    const token = this.auth.getToken();
    if (token) {
      this.openFile(this.projectService.getFileNameFromUrl());
    } else {
      console.error('No token available. Cannot open file.');
    }
  }


  toggleLanguageDropdown() {
    this.isLanguageDropdownOpen = !this.isLanguageDropdownOpen;
  }

  closeLanguageDropdown() {
    this.isLanguageDropdownOpen = false;
  }

  changeLanguage(mode: string) {
  this.options = { ...this.options, mode };
  this.codeMirror.setOption('mode', mode);
}

  openFile(fileName: string) {
    this.backendService.openFile(fileName, this.auth.getToken()!)
      .subscribe({
        next: (result: any) => {
          console.log('A fájl tartalma lekérve:', result);

          if (result && typeof result === 'object' && result.content) {
            let content = result.content;
            this.codeMirror.setValue(content);
            console.log('Szerkesztő tartalma beállítva:', result.content);
          } else {
            console.error('Helytelen adatformátum.');
          }
        },
        error: (error: any) => {
          console.error('Hiba a fájl lekérése közben:', error);
        }
      });
  }

  editCode() {
    const token: string = this.auth.getToken()!;
    let fileName = this.projectService.getFileNameFromUrl();
    let content = this.codeMirror.getValue();

    this.backendService.editCode(fileName, content, token).subscribe({
      next: (result: any) => {
        alert("Fájl sikeresen elmentve.");
        console.log('Fájl sikeresen elmentve:', result);
      },
      error: (error: any) => {
        alert("Hiba a fájl mentése közben. Próbálja újra.");
        console.error('Hiba a fájl mentése közben:', error);
      }
    });
  }
}