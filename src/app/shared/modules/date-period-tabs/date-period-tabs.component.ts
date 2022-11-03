import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MenuItem } from 'primeng/api';

import { DatePeriod } from '../../../enums/date-period.enum';

import { DATE_PERIODS_CONFIG } from './constants/date-periods-config';

@Component({
  selector: 'app-date-period-tabs',
  templateUrl: './date-period-tabs.component.html',
  styleUrls: ['./date-period-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePeriodTabsComponent implements OnInit {
  @Input()
  public activePeriod: DatePeriod;

  @Output()
  public readonly activePeriodChange = new EventEmitter<DatePeriod>();

  public periods: MenuItem[];
  public activePeriodValue: MenuItem;

  private readonly datePeriodsConfig = DATE_PERIODS_CONFIG;

  public ngOnInit(): void {
    this.periods = this.buildDatePeriods();
    this.activePeriodValue = this.periods.find(({ label }) => this.datePeriodsConfig[this.activePeriod]?.label === label);
  }

  public onSelectPeriod(period: DatePeriod): void {
    this.activePeriodChange.emit(period);
  }

  private buildDatePeriods(): MenuItem[] {
    return Object.values(this.datePeriodsConfig).map(({ label, value }) => {
      return {
        label,
        command: () => this.onSelectPeriod(value),
      };
    });
  }
}
