import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaymentValues } from 'src/app/interfaces/payment-values';

@Component({
  selector: 'app-info-payment',
  templateUrl: './info-payment.component.html',
  styleUrls: ['./info-payment.component.scss']
})
export class InfoPaymentComponent {

  title!: string;
  constructor(
    public dialogRef: MatDialogRef<InfoPaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PaymentValues,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.title = `Usuário ${this.data.name}`
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
