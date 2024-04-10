import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import * as monaco from 'monaco-editor';
import { ContentsService } from '../contents.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent implements OnInit {
  isLanguageDropdownOpen: boolean = false;


  editorOptions = {theme: 'vs-dark', language: 'python', automaticLayout: true, scrollBeyondLastLine: false, minimap: {enabled: false}};
  code: string= 'print("Hello World!")';

  constructor(private http: HttpClient, private contentService: ContentsService) { }

  ngOnInit(): void {
    this.contentService.fileContent.subscribe(content => {
      this.code = content;
    });

    const saveButton = document.getElementById('saveButton');
    if (saveButton) {
      saveButton.addEventListener('click', this.saveCode.bind(this));
    }
  }

  saveCode() {
    const filename = (document.getElementById('filename') as HTMLInputElement).value;
    const code = this.code;
    const language = this.editorOptions.language;

    this.http.post(environment.apiUrl + '/saveCode', { filename, code, language }).subscribe(response => {
      console.log('Kód sikeresen mentve:', response);
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
