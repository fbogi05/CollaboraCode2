import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeSettingsPage } from './theme-settings.page';

describe('ThemeSettingsPage', () => {
  let component: ThemeSettingsPage;
  let fixture: ComponentFixture<ThemeSettingsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ThemeSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
