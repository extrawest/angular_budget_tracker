import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import { MenuItem } from 'primeng/api';
import {DateTime, DateTimeUnit} from "luxon";

@Component({
  selector: 'app-date-period-tabs',
  templateUrl: './date-period-tabs.component.html',
  styleUrls: ['./date-period-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePeriodTabsComponent implements OnInit {
  public readonly periods: MenuItem[] = [
    { label: 'Daily', command: () => this.onSelectPeriod('day') },
    { label: 'Weekly', command: () => this.onSelectPeriod('week') },
    { label: 'Monthly', command: () => this.onSelectPeriod('month') },
    { label: 'Yearly', command: () => this.onSelectPeriod('year') },
  ];
  public readonly defaultActivePeriod: MenuItem = this.periods[2];

  @Output() public readonly selectPeriod = new EventEmitter<number>();

  public ngOnInit(): void {
    this.defaultActivePeriod.command();
  }

  public onSelectPeriod(period: DateTimeUnit): void {
    this.selectPeriod.emit(DateTime.local().startOf(period).valueOf());
  }
}
