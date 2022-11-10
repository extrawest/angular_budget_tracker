import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { switchMap, take } from 'rxjs';

import { FileUploadService } from '../../../../shared/services/api/file-upload.service';
import { UserService } from '../../../../shared/services/api/user.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService],
})
export class ProfileViewComponent implements OnInit {
  @ViewChild(FileUpload) fileUpload: FileUpload;

  public readonly user$ = this.userService.currentUser$;

  public readonly form = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
  });

  public processing = false;

  constructor(
    private readonly userService: UserService,
    private readonly fileUploadService: FileUploadService,
    private readonly messageService: MessageService,
  ) {}

  public ngOnInit(): void {
    this.user$
      .pipe(take(1))
      .subscribe(({ displayName }) => {
        if (displayName) {
          const [firstname, lastname] = displayName.split(' ');
          this.form.patchValue({ firstname, lastname });
        }
      });
  }

  public onUploadPhoto(photo: File): void {
    this.fileUploadService.upload(photo)
      .pipe(
        take(1),
        switchMap((photoURL) => this.userService.updateUserPhoto(photoURL)),
      )
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Update photo',
          detail: 'Photo was successfully updated!',
        });

        this.fileUpload.clear();
      });
  }

  public onUpdateInfo(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const { firstname, lastname } = this.form.getRawValue();

    this.processing = true;
    this.userService.updateUserInfo(`${firstname} ${lastname}`)
      .pipe(
        take(1),
      )
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Update photo',
          detail: 'Photo was successfully updated!',
        });

        this.processing = false;
      });
  }
}
