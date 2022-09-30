import { ChangeDetectionStrategy, Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';

import { AppRoute } from '../../../../enums/app-route.enum';
import { AuthService } from '../../../../shared/services/auth.service';
import { passwordMatchingValidator } from '../../../../shared/validators/password-matching.validator';
import { AuthRoute } from '../../enums/auth-route.enum';

@Component({
  selector: 'app-sign-up',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterViewComponent {
  public readonly AuthRoute = AuthRoute;
  public readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
  }, { validators: passwordMatchingValidator });

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
  ) {}

  public onSubmit(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.getRawValue();

    this.authService.register(email, password).then(() => {
      this.router.navigate(['../', AppRoute.Auth, AuthRoute.VerifyEmail]);
    });
  }

  public onSignUpWithGoogle(): void {
    this.authService.signInWithGoogle();
  }

  public onSignUpWithFacebook(): void {
    this.authService.signInWithFacebook();
  }
}
