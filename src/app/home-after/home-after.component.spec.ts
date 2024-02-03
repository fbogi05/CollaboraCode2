import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAfterComponent } from './home-after.component';

describe('HomeAfterComponent', () => {
  let component: HomeAfterComponent;
  let fixture: ComponentFixture<HomeAfterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeAfterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeAfterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
