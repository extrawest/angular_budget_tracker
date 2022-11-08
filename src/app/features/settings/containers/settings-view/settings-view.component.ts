import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Theme } from '../../../../enums/theme.enum';
import { ThemeService } from '../../../../shared/services/theme.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings-view.component.html',
  styleUrls: ['./settings-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsViewComponent {
  public readonly themes$ = this.themeService.themes$;

  constructor(
    public readonly themeService: ThemeService,
  ) {}

  public onThemeChange(theme: Theme): void {
    this.themeService.setTheme(theme);
  }
}
