import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../../../shared/services/api/user.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileViewComponent {
  public readonly user$ = this.userService.currentUser$;

  public readonly form = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
  });

  public processing = false;

  constructor(
    private readonly userService: UserService,
  ) {}
}
