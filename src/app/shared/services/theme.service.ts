import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';

import { Theme } from '../../enums/theme.enum';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  public readonly currentTheme$: Observable<Theme>;
  public readonly themes$: Observable<Theme[]>;

  private readonly themesSubject$ = new BehaviorSubject([Theme.Light, Theme.Dark]);
  private readonly currentThemeSubject$ = new BehaviorSubject(Theme.Light);
  private readonly themeEl$ = new BehaviorSubject<HTMLLinkElement>(null);

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
  ) {
    this.currentTheme$ = this.currentThemeSubject$.asObservable();
    this.themes$ = this.themesSubject$.asObservable();
  }

  public setTheme(theme: Theme): void {
    this.currentThemeSubject$.next(theme);

    this.themeEl$
      .pipe(take(1))
      .subscribe((el) => {
        el.setAttribute('href', `theme-${theme.toLowerCase()}.css`);
      });
  }

  public init(): void {
    const el = this.createLinkElement();

    this.document.head.appendChild(el);
    this.themeEl$.next(el);
  }

  private createLinkElement(): HTMLLinkElement {
    const el = this.document.createElement('link');

    el.setAttribute('rel', 'stylesheet');
    el.setAttribute('type', 'text/css');

    return el;
  }
}
