import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentsService {
  private fileContentSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  fileContent$: Observable<string> = this.fileContentSubject.asObservable();

  constructor() { }

  // updateFileContent(content: string) {
  //   try {
  //     const jsonData = JSON.parse(content);
  //     const fileContent = jsonData.content;
  //     this.fileContentSubject.next(fileContent);
  //   } 
  //   catch (error) {
  //     console.error('Error parsing JSON content:', error);
  //   }
  // }
}