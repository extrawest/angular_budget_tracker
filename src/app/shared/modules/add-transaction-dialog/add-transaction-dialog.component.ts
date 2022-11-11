import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { mergeWith, take, tap } from 'rxjs';

import { AddTransactionDialogParams } from '../../../models/add-transaction-dialog-params.model';
import { AccountsFacade, CategoriesFacade, TransactionsFacade } from '../../../state';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-add-transaction-dialog',
  templateUrl: './add-transaction-dialog.component.html',
  styleUrls: ['./add-transaction-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTransactionDialogComponent implements OnInit {
  public readonly accounts$ = this.accountsFacade.accounts$;
  public readonly categories$ = this.categoriesFacade.categories$;
  public readonly currencies$ = this.currencyService.currencies$;

  public readonly form = new FormGroup({
    amount: new FormControl(0, [Validators.required]),
    income: new FormControl(false, [Validators.required]),
    currency: new FormControl(null, [Validators.required]),
    categoryId: new FormControl(null, [Validators.required]),
    accountId: new FormControl(this.dialogConfig.data.selectedAccountId, [Validators.required]),
    description: new FormControl(''),
    date: new FormControl(new Date(), [Validators.required]),
  });

  public processing = false;

  constructor(
    private readonly dialogRef: DynamicDialogRef,
    private readonly dialogConfig: DynamicDialogConfig<AddTransactionDialogParams>,
    private readonly accountsFacade: AccountsFacade,
    private readonly categoriesFacade: CategoriesFacade,
    private readonly transactionsFacade: TransactionsFacade,
    private readonly currencyService: CurrencyService,
  ) {}

  public ngOnInit(): void {
    this.accountsFacade.loadAccounts();

    this.currencyService.currentCurrency$
      .pipe(take(1))
      .subscribe((currency) => {
        this.form.patchValue({ currency });
      });
  }

  public onSubmit(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const { amount, income, date, description, currency, accountId, categoryId } = this.form.getRawValue();

    this.processing = true;
    this.transactionsFacade.addTransaction({
      amount: income ? amount : -amount,
      income,
      currency,
      createdAt: date.valueOf(),
      accountId,
      categoryId,
      description,
    });

    this.transactionsFacade.onAddTransactionError$.pipe(
      mergeWith(this.transactionsFacade.onAddTransactionSuccess$.pipe(
        tap(() => this.dialogRef.close())),
      ),
      tap(() => this.processing = false),
    ).pipe(take(1)).subscribe();
  }
}
