import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaymentValues } from 'src/app/interfaces/payment-values';

@Component({
  selector: 'app-delete-payment',
  templateUrl: './delete-payment.component.html',
  styleUrls: ['./delete-payment.component.scss']
})
export class DeletePaymentComponent {

  title!: string;
  constructor(
    public dialogRef: MatDialogRef<DeletePaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PaymentValues,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.title = `Deseja realmente excluuir o usúario ${this.data.name}`
  }

  onDeleteClick(): void {
    this.dialogRef.close({ ...this.data });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
