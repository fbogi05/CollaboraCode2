import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsOptionsPage } from './settings-options.page';

describe('SettingsOptionsPage', () => {
  let component: SettingsOptionsPage;
  let fixture: ComponentFixture<SettingsOptionsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SettingsOptionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
