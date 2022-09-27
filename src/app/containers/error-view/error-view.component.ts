import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-view',
  templateUrl: './error-view.component.html',
  styleUrls: ['./error-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorViewComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
}
