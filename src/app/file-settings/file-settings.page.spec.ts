import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileSettingsPage } from './file-settings.page';

describe('FileSettingsPage', () => {
  let component: FileSettingsPage;
  let fixture: ComponentFixture<FileSettingsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FileSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
