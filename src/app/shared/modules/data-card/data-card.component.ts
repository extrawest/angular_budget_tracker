import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-data-card',
  templateUrl: './data-card.component.html',
  styleUrls: ['./data-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataCardComponent {
  @Input() title: string;
  @Input() subtitle: string;
  @Input() isHeaderVisible = true;

  @Input() loading: boolean;
  @Input() loaded: boolean;
  @Input() error: HttpErrorResponse | Error | null;
  @Input() styleClass: string;
}
