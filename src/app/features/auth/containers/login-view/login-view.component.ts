import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AuthRoute } from '../../enums/auth-route.enum';

@Component({
  selector: 'app-auth',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginViewComponent {
  public readonly AuthRoute = AuthRoute;
}
