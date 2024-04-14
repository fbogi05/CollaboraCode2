import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompileService {

  private compileUrl = 'http://localhost:3000/compile';

  constructor(private http: HttpClient) { }

  compile(code: string) {
    return this.http.post(this.compileUrl, code, { responseType: 'arraybuffer' });
  }
}
