import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-wallet-dialog',
  templateUrl: './add-wallet-dialog.component.html',
  styleUrls: ['./add-wallet-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddWalletDialogComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
}
