import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { filter, take } from 'rxjs';

import { Currency } from '../../enums/currency.enum';
import { Theme } from '../../enums/theme.enum';
import { LOCAL_STORAGE_CURRENCY_KEY, LOCAL_STORAGE_THEME_KEY } from '../../shared/constants/local-storage';
import { isNotNullOrUndefined } from '../../shared/helpers/not-null-or-undefined';
import { CurrencyService } from '../../shared/services/currency.service';
import { ThemeService } from '../../shared/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './root-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RootViewComponent implements OnInit {
  private readonly selectedTheme$ = this.storage.get<Theme>(LOCAL_STORAGE_THEME_KEY, { type: 'string' });
  private readonly selectedCurrency$ = this.storage.get<Currency>(LOCAL_STORAGE_CURRENCY_KEY, { type: 'string' });

  constructor(
    private readonly themeService: ThemeService,
    private readonly currencyService: CurrencyService,
    private readonly storage: StorageMap,
  ) {}

  public ngOnInit(): void {
    this.themeService.init();

    this.selectedTheme$
      .pipe(
        take(1),
        filter(isNotNullOrUndefined),
      )
      .subscribe((theme) => {
        this.themeService.setTheme(theme);
      });

    this.selectedCurrency$
      .pipe(
        take(1),
        filter(isNotNullOrUndefined),
      )
      .subscribe((currency) => {
        this.currencyService.setCurrency(currency);
      });
  }
}
