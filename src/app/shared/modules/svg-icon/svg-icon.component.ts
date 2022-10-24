import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-svg-icon',
  template: `
    <svg [ngClass]="['svg-icon-' + size]" [style.width.px]="size" [style.height.px]="size" class="icon svg-icon">
      <use attr.xlink:href="assets/icons/symbol-defs.svg#{{ icon }}"></use>
    </svg>
  `,
  styleUrls: ['./svg-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgIconComponent {
  @Input() icon: string;
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number = 'md';
  @Input() styles: string;
}
