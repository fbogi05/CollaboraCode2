import { Component } from '@angular/core';
import * as monaco from 'monaco-editor';
import loader from '@monaco-editor/loader';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent {

  editorOptions = {theme: 'vs-dark', language: 'python', automaticLayout: true, scrollBeyondLastLine: false, minimap: {enabled: false}};
  code: string= 'print("Hello World!")';
}
