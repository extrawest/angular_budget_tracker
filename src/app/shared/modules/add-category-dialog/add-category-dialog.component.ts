import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { mergeWith, take, tap } from 'rxjs';

import { CategoriesFacade } from '../../../state';

@Component({
  selector: 'app-add-category-dialog',
  templateUrl: './add-category-dialog.component.html',
  styleUrls: ['./add-category-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCategoryDialogComponent {
  public readonly form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    icon: new FormControl(''),
  });

  public processing = false;

  constructor(
    private readonly dialogRef: DynamicDialogRef,
    private readonly categoriesFacade: CategoriesFacade,
  ) {}

  public onSubmit(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.processing = true;
    this.categoriesFacade.addCategory({ ...this.form.getRawValue() });

    this.categoriesFacade.onAddCategoryError$.pipe(
      mergeWith(
        this.categoriesFacade.onAddCategorySuccess$.pipe(tap(() => this.dialogRef.close())),
      ),
      tap(() => this.processing = false),
    ).pipe(
      take(1),
    ).subscribe();
  }
}
