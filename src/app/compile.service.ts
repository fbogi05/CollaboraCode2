import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompileService {

  private readonly url = 'https://judge0-ce.p.rapidapi.com/submissions';
  private readonly apiKey:string = 'd298e8fe37mshc05794899660063p161e0bjsn52c55b29146b'

  constructor(private http: HttpClient) { }

  createSubmission(language_id: number, source_code: string) {
    let data = {
      language_id: language_id,
      source_code: source_code
    };

    const headers = {
      'content-type': 'application/json',
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': this.apiKey,
      'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
    };

    return this.http.post(this.url, data, {headers});
  }

  getSubmission(token: string): Observable<any> {
    return new Observable(observer => {
      const timer = setInterval(() => {
        const url = `https://judge0-ce.p.rapidapi.com/submissions/${token}`;

        const headers = {
          'X-RapidAPI-Key': this.apiKey,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        };

        this.http.get(url, { headers })
          .subscribe({
            next: (response) => {
              if ((response as { status: { id: number } }).status.id !== 1) {
                clearInterval(timer);
                observer.next(response);
                observer.complete();
              }
            },
            error: (error) => {
              clearInterval(timer);
              observer.error(error);
            }
          });
      }, 1000);

    return () => clearInterval(timer);
    });
  }

}
