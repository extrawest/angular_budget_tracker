import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsViewComponent } from './settings-view.component';

describe('SettingsComponent', () => {
  let component: SettingsViewComponent;
  let fixture: ComponentFixture<SettingsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsViewComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(SettingsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
