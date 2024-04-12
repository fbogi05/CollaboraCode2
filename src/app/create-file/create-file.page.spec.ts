import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateFilePage } from './create-file.page';

describe('CreateFilePage', () => {
  let component: CreateFilePage;
  let fixture: ComponentFixture<CreateFilePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreateFilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
