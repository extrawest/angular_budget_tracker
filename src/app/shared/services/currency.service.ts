import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Currency } from '../../enums/currency.enum';

@Injectable({ providedIn: 'root' })
export class CurrencyService {
  public readonly currentCurrency$: Observable<Currency>;
  public readonly currencies$: Observable<Currency[]>;

  private readonly currenciesSubject$ = new BehaviorSubject<Currency[]>([Currency.UAH, Currency.USD, Currency.EUR]);
  private readonly currentCurrencySubject$ = new BehaviorSubject<Currency>(Currency.USD);

  constructor(
  ) {
    this.currentCurrency$ = this.currentCurrencySubject$.asObservable();
    this.currencies$ = this.currenciesSubject$.asObservable();
  }

  public setCurrency(currency: Currency): void {
    this.currentCurrencySubject$.next(currency);
  }
}
