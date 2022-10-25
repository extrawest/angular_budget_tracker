import {
  Directive, DoCheck,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { VALIDATION_ERRORS_CONFIG, ValidationErrorsConfig } from './validation-errors-config';

@Directive({
  selector: 'app-error[control], [app-error]',
})
export class ValidationErrorsDirective implements OnInit, OnDestroy, DoCheck {
  @Input() control: AbstractControl;
  @Input() field?: string;

  private readonly destroy$ = new Subject<void>();
  private isTouched!: boolean;

  constructor(
    private readonly renderer: Renderer2,
    private readonly viewContainerRef: ViewContainerRef,
    @Inject(VALIDATION_ERRORS_CONFIG) private readonly config: ValidationErrorsConfig,
  ) {}

  public ngDoCheck(): void {
    if (this.control.touched && this.isTouched !== this.control.touched) {
      this.checkControlStatus();
    }

    this.isTouched = this.control.touched;
  }

  public ngOnInit(): void {
    this.control.statusChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.checkControlStatus());
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private checkControlStatus(): void {
    this.renderer.setProperty(this.viewContainerRef.element.nativeElement, 'innerHTML', '');

    if (this.control.status !== 'INVALID') {
      return;
    }

    const errors = this.control.errors ?? {};

    for (const errorName of Object.keys(errors)) {
      const errorBuilder = this.config[errorName] || (() => errorName);
      const errorElement = this.renderer.createElement('small');
      const errorMessage = errorBuilder(errors[errorName], this.field);

      this.renderer.setProperty(errorElement, 'innerHTML', errorMessage);
      this.renderer.addClass(errorElement, 'p-error');
      this.renderer.appendChild(this.viewContainerRef.element.nativeElement, errorElement);
    }
  }
}
