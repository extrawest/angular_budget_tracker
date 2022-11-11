import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePeriodTabsComponent } from './date-period-tabs.component';

describe('PeriodTabsComponent', () => {
  let component: DatePeriodTabsComponent;
  let fixture: ComponentFixture<DatePeriodTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatePeriodTabsComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(DatePeriodTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
