import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { filter, Subject, take, takeUntil } from 'rxjs';

import { Theme } from '../../enums/theme.enum';
import { isNotNullOrUndefined } from '../../shared/helpers/not-null-or-undefined';
import { ThemeService } from '../../shared/services/theme.service';

const LOCAL_STORAGE_THEME_KEY = 'theme';

@Component({
  selector: 'app-root',
  templateUrl: './root-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RootViewComponent implements OnInit, OnDestroy {
  private readonly selectedTheme$ = this.storage.get<Theme>(LOCAL_STORAGE_THEME_KEY, { type: 'string' });

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly themeService: ThemeService,
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

    this.themeService.currentTheme$
      .pipe(takeUntil(this.destroy$))
      .subscribe((theme) => {
        this.storage.set(LOCAL_STORAGE_THEME_KEY, theme);
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
