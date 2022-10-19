import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-data-card',
  templateUrl: './data-card.component.html',
  styleUrls: ['./data-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataCardComponent {
  @Input() title: string;
  @Input() subtitle: string;
  @Input() isHeaderVisible: boolean = true;

  @Input() loading: boolean;
  @Input() loaded: boolean;
  @Input() error: HttpErrorResponse | Error | null;
  @Input() styleClass: string;
}
