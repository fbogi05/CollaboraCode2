import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import * as monaco from 'monaco-editor';
import { ContentsService } from '../contents.service';
import { AuthService } from '../auth.service';
import { ProjectService } from '../project.service';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent implements OnInit {
  isLanguageDropdownOpen: boolean = false;


  editorOptions = {theme: 'vs-dark', language: 'python', automaticLayout: true, scrollBeyondLastLine: false, minimap: {enabled: false}};
  fileContent: string= 'print(Hello World!)';

  constructor(private http: HttpClient, private contentService: ContentsService, private auth: AuthService, private projectService: ProjectService, private backendService: BackendService) { }

  ngOnInit(): void {
    this.contentService.fileContent.subscribe(content => {
      this.fileContent = content;
    });
  }

  editCode() {
    const token: string = this.auth.getToken()!;
    let fileName = this.projectService.getFileNameFromUrl();
    let content = this.fileContent;

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

  toggleLanguageDropdown() {
    this.isLanguageDropdownOpen = !this.isLanguageDropdownOpen;
  }

  closeLanguageDropdown(){
    this.isLanguageDropdownOpen = false;
  }

  changeLanguage(language: string) {
    this.editorOptions = { ...this.editorOptions, language };
  }

}
