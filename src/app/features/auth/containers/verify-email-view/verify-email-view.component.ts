import { ChangeDetectionStrategy, Component } from '@angular/core';
import { User } from 'firebase/auth';

import { AuthService } from '../../../../shared/services/api/auth.service';
import { UserService } from '../../../../shared/services/api/user.service';
import { AuthRoute } from '../../enums/auth-route.enum';

@Component({
  selector: 'app-verify-email-view',
  templateUrl: './verify-email-view.component.html',
  styleUrls: ['./verify-email-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyEmailViewComponent {
  public readonly currentUser$ = this.userService.currentUser$;

  public readonly AuthRoute = AuthRoute;

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  public onResendVerificationEmail(user: User): void {
    this.authService.sendEmailVerification(user).subscribe();
  }
}
