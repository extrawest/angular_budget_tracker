import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../../shared/services/auth.service';
import { AuthRoute } from '../../enums/auth-route.enum';

@Component({
  selector: 'app-auth',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginViewComponent {
  public readonly AuthRoute = AuthRoute;
  public readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
  ) {}

  public onSubmit(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
    }

    const { email, password } = this.form.getRawValue();

    this.authService.login(email, password).then(() => {
      this.redirectToHomePage();
    });
  }

  public onSignUpWithGoogle(): void {
    this.authService.signInWithGoogle().then(() => {
      this.redirectToHomePage();
    });
  }

  public onSignUpWithFacebook(): void {
    this.authService.signInWithFacebook().then(() => {
      this.redirectToHomePage();
    });
  }

  private redirectToHomePage(): void {
    this.router.navigate(['/']);
  }
}
