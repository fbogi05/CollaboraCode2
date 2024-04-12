import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectSettingsPage } from './project-settings.page';

describe('ProjectSettingsPage', () => {
  let component: ProjectSettingsPage;
  let fixture: ComponentFixture<ProjectSettingsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProjectSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
