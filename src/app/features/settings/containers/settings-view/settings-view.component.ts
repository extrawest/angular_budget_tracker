import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Currency } from '../../../../enums/currency.enum';
import { Theme } from '../../../../enums/theme.enum';
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
  public readonly currencies$ = this.currencyService.currencies$;

  constructor(
    private readonly themeService: ThemeService,
    private readonly currencyService: CurrencyService,
  ) {}

  public onThemeChange(theme: Theme): void {
    this.themeService.setTheme(theme);
  }

  public onCurrencyChange(currency: Currency): void {
    this.currencyService.setCurrency(currency);
  }
}
