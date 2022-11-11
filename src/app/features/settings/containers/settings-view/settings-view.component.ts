import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { take } from 'rxjs';

import { Currency } from '../../../../enums/currency.enum';
import { Theme } from '../../../../enums/theme.enum';
import { LOCAL_STORAGE_CURRENCY_KEY, LOCAL_STORAGE_THEME_KEY } from '../../../../shared/constants/local-storage';
import { CurrencyService } from '../../../../shared/services/currency.service';
import { ThemeService } from '../../../../shared/services/theme.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings-view.component.html',
  styleUrls: ['./settings-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsViewComponent {
  public readonly themes$ = this.themeService.themes$;
  public readonly selectedTheme$ = this.themeService.currentTheme$;

  public readonly currencies$ = this.currencyService.currencies$;
  public readonly selectedCurrency$ = this.currencyService.currentCurrency$;

  constructor(
    private readonly themeService: ThemeService,
    private readonly currencyService: CurrencyService,
    private readonly storage: StorageMap,
  ) {}

  public onThemeChange(theme: Theme): void {
    this.themeService.setTheme(theme);
    this.storage.set(LOCAL_STORAGE_THEME_KEY, theme).pipe(take(1)).subscribe();
  }

  public onCurrencyChange(currency: Currency): void {
    this.currencyService.setCurrency(currency);
    this.storage.set(LOCAL_STORAGE_CURRENCY_KEY, currency).pipe(take(1)).subscribe();
  }
}
