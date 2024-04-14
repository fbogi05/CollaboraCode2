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
import { CompileService } from '../compile.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent implements AfterViewInit {
  isLanguageDropdownOpen: boolean = false;
  @ViewChild('codemirror')
  codeMirror: any;
  source_code: any;
  options = { lineNumbers: true, theme: '3024-night', mode: 'python' }
  output: string = '';

  constructor(
    private auth: AuthService, 
    private projectService: ProjectService, 
    private backendService: BackendService, 
    private compileService: CompileService
  ) { }

  ngAfterViewInit(): void {
    let textarea = document.getElementById('codemirror') as HTMLTextAreaElement;
    this.codeMirror = CodeMirror.fromTextArea(textarea, this.options);

    const token = this.auth.getToken();
    if (token) {
      this.openFile(this.projectService.getFileNameFromUrl());
    } else {
      console.error('Nincs token. Nem lehet a fájlt megnyitni. ');
    }
  }


  toggleLanguageDropdown() {
    this.isLanguageDropdownOpen = !this.isLanguageDropdownOpen;
  }

  closeLanguageDropdown() {
    this.isLanguageDropdownOpen = false;
  }

  changeLanguage(mode: string) {
    const language_id = this.getlanguage_id(mode);

    if (!language_id) {
      console.error('Error: Unsupported language:', mode);
      return;
    }

    this.options = { ...this.options, mode };
    this.codeMirror.setOption('mode', mode);
  }

  getlanguage_id(mode: string): number | undefined {
    const languageMap = {
      python: 71,
      javascript: 93,
      clike: 75,
      sql: 82,
      php: 68
    };

    const language_id = languageMap[mode as keyof typeof languageMap];
    if (language_id === null) {
      console.error('Error: Unsupported language:', mode);
      return undefined;
    }
    return language_id;
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

  compileAndRun() {
    let source_code = this.codeMirror.getValue();
    const language = this.options.mode;


    let language_id: number | undefined;
    switch (language) {
      case 'python':
        language_id = 71;
        break;
      case 'javascript':
        language_id = 93;
        break;
      case 'clike':
        language_id = 75;
        break;
      case 'sql':
        language_id = 82;
        break;
      case 'php':
        language_id = 68;
        break;
      default:
        console.error('Error: Unsupported language:', language);
        return;
    }

    if (!language_id) {
      return; 
    }

    this.compileService.createSubmission(language_id, source_code)
      .subscribe({
        next: (response) => {
          const createResponse = response as { token?: string };
          if (!createResponse.token) {
            console.error('Error: Missing token in Create Submission response');
            return;
          }

          const token = createResponse.token;

          this.compileService.getSubmission(token).subscribe({
            next: (submissionResponse) => {
              const judge0Response = submissionResponse as { stdout?: string, stderr?: string };
              let output = '';
              if (judge0Response.stdout) {
                output = judge0Response.stdout;
              } else if (judge0Response.stderr) {
                output = judge0Response.stderr;
              }
              console.log('Judge0 Output:', output);
              this.output = output;
            },
            error: (error:any) => {
              console.error('Error: Get Submission failed:', error);
              this.output = 'Error: Get Submission failed';
            }
            });
        },
        error: (error) => {
          console.error('Error: Create Submission failed:', error);
          this.output = 'Error: Create Submission failed';
        }
      });
  }


}