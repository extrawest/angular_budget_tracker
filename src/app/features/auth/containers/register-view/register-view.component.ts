import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AuthRoute } from '../../enums/auth-route.enum';

@Component({
  selector: 'app-sign-up',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterViewComponent {
  public readonly AuthRoute = AuthRoute;
}
