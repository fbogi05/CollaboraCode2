import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as monaco from 'monaco-editor';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements AfterViewInit {

  @ViewChild('editorContainer') editorContainer: ElementRef;

  constructor(private elementRef: ElementRef) {
    this.editorContainer = this.elementRef.nativeElement;
  }

  ngAfterViewInit() {
    monaco.editor.create(this.editorContainer.nativeElement, {
      value: "public Class Elso(){}",
      language: 'java',
      theme: 'vs-dark'
    })
  }

}
