import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentsService {

  private fileContentSource = new Subject<string>();
  fileContent = this.fileContentSource.asObservable();

  constructor() { }

  updateFileContent(content: string) {
    this.fileContentSource.next(content);
  }
}
