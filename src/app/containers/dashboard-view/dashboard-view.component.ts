import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardViewComponent {
}
