import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavAfterComponent } from './nav-after.component';

describe('NavAfterComponent', () => {
  let component: NavAfterComponent;
  let fixture: ComponentFixture<NavAfterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavAfterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavAfterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
