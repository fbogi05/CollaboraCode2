import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAfterComponent } from './home-after.component';

describe('HomeAfterComponent', () => {
  let component: HomeAfterComponent;
  let fixture: ComponentFixture<HomeAfterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeAfterComponent]
    });
    fixture = TestBed.createComponent(HomeAfterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
