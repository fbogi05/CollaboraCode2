import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBeforeComponent } from './home-before.component';

describe('HomeBeforeComponent', () => {
  let component: HomeBeforeComponent;
  let fixture: ComponentFixture<HomeBeforeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeBeforeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeBeforeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
