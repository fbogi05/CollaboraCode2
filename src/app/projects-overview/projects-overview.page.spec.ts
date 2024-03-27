import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsOverviewPage } from './projects-overview.page';

describe('ProjectsOverviewPage', () => {
  let component: ProjectsOverviewPage;
  let fixture: ComponentFixture<ProjectsOverviewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProjectsOverviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
