import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthViewComponent } from './auth-view.component';

describe('AuthComponent', () => {
  let component: AuthViewComponent;
  let fixture: ComponentFixture<AuthViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthViewComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(AuthViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
