import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RootViewComponent } from './root-view.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [RootViewComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(RootViewComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'budget-tracker-app'`, () => {
    const fixture = TestBed.createComponent(RootViewComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('budget-tracker-app');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(RootViewComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain(
      'budget-tracker-app app is running!',
    );
  });
});
