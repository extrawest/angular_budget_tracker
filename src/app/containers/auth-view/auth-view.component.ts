import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth-view.component.html',
  styleUrls: ['./auth-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthViewComponent {
}
