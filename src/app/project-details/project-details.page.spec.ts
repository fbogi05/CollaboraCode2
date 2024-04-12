import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectDetailsPage } from './project-details.page';

describe('ProjectDetailsPage', () => {
  let component: ProjectDetailsPage;
  let fixture: ComponentFixture<ProjectDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProjectDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
