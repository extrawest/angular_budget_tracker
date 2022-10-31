import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-date-period-tabs',
  templateUrl: './date-period-tabs.component.html',
  styleUrls: ['./date-period-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePeriodTabsComponent {
  public readonly period: MenuItem[] = [
    { label: 'Daily', command: this.onSelectPeriod('') },
    { label: 'Weekly' },
    { label: 'Monthly' },
    { label: 'Yearly' },
  ];

  @Output() selectPeriod = new EventEmitter<MenuItem>();

  public onSelectPeriod(period: MenuItem): void {
    this.selectPeriod.emit(period);
  }
}
