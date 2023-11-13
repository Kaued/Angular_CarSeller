import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormPayment } from 'src/app/interfaces/form-payment';

@Component({
  selector: 'app-form-payment',
  templateUrl: './form-payment.component.html',
  styleUrls: ['./form-payment.component.scss']
})
export class FormPaymentComponent {

  title!: string;
  paymentForm!: FormGroup;
  @ViewChild('inputName') inputName!: ElementRef;
  @ViewChild('inputTax') inputTax!: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<FormPaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormPayment,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.title = this.data.isAddMode ? "Adicionar Vendedor" : "Alterar Vendedor";
    if (this.data.isAddMode) {
      this.paymentForm = new FormGroup({
        name: new FormControl("", [Validators.required, Validators.min(3)]),
        tax: new FormControl("", [Validators.required])
      })
    } else {
      this.paymentForm = new FormGroup({
        name: new FormControl(this.data.name, [Validators.required, Validators.min(3)]),
        tax: new FormControl(this.data.tax, [Validators.required])
      })
    }
  }

  onSubmit(): void {
    if (!this.paymentForm.invalid) {
      let value;
      if (this.data.isAddMode) {
        value = { ...this.paymentForm.value }
      } else {
        value = { ...this.paymentForm.value, id: this.data.id }
      }
      this.dialogRef.close(value);
    } else {
      this._snackBar.open("Campos Invalidos", "Ok", {
        horizontalPosition: "right",
        verticalPosition: "top",
        duration: 5000
      });

      this.inputName.nativeElement.focus();
      this.inputName.nativeElement.blur();

      this.inputTax.nativeElement.focus();
      this.inputTax.nativeElement.blur();
    }
  }
  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
