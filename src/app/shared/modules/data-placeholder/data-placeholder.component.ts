import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-data-placeholder',
  templateUrl: './data-placeholder.component.html',
  styleUrls: ['./data-placeholder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataPlaceholderComponent {
  @Input() icon: string;
  @Input() description: string;
}
