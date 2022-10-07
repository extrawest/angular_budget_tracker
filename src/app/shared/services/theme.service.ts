import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

enum Theme {
  Light = 'light',
  Dark = 'dark',
}

@Injectable({ providedIn: 'root' })
export class ThemeService {
  public readonly theme$ = new BehaviorSubject(Theme.Light);
  public readonly themes$ = [Theme.Light, Theme.Dark];

  constructor(
    private readonly domSanitizer: DomSanitizer,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {}

  public setTheme(name: Theme): void {
    const el = this.document.createElement('link');

    el.setAttribute('href', this.getThemeUrl(name) as string);
    el.setAttribute('rel', 'stylesheet');
    el.setAttribute('type', 'text/css');

    this.document.head.appendChild(el);
  }

  private getThemeUrl(name: Theme): SafeStyle {
    return this.domSanitizer.bypassSecurityTrustStyle(name + '-theme');
  }
}
