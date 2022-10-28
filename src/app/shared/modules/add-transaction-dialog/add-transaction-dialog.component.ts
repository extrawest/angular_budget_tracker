import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { mergeWith, take, tap } from 'rxjs';

import { AccountsFacade, TransactionsFacade } from '../../../state';

@Component({
  selector: 'app-add-transaction-dialog',
  templateUrl: './add-transaction-dialog.component.html',
  styleUrls: ['./add-transaction-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTransactionDialogComponent implements OnInit {
  public readonly accounts$ = this.accountsFacade.accounts$;

  public readonly form = new FormGroup({
    amount: new FormControl(null, [Validators.required]),
    category: new FormControl(null, [Validators.required]),
    accountId: new FormControl(this.activatedRoute.snapshot.paramMap.get('accountId'), [Validators.required]),
    description: new FormControl(''),
    createdAt: new FormControl(new Date(), [Validators.required]),
  });

  // TODO: Remove when Categories API will be ready
  public readonly categories = [
    { name: 'Food' },
    { name: 'Car' },
  ];

  public processing = false;

  constructor(
    private readonly dialogRef: DynamicDialogRef,
    private readonly activatedRoute: ActivatedRoute,
    private readonly accountsFacade: AccountsFacade,
    private readonly transactionsFacade: TransactionsFacade,
  ) {}

  public ngOnInit(): void {
    this.accountsFacade.loadAccounts();
  }

  public onSubmit(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.processing = true;
    this.transactionsFacade.addTransaction({ ...this.form.getRawValue() });

    this.transactionsFacade.onAddTransactionError$.pipe(
      mergeWith(this.transactionsFacade.onAddTransactionSuccess$.pipe(
        tap(() => this.dialogRef.close())),
      ),
      tap(() => this.processing = false),
    ).pipe(take(1)).subscribe();
  }
}
