import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormCustomer } from 'src/app/interfaces/form-customer';

@Component({
  selector: 'app-form-customer',
  templateUrl: './form-customer.component.html',
  styleUrls: ['./form-customer.component.scss']
})
export class FormCustomerComponent {

  title!: string;
  customerForm!: FormGroup;
  @ViewChild('inputName') inputName!: ElementRef;
  @ViewChild('inputAge') inputAge!: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<FormCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormCustomer,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.title = this.data.isAddMode ? "Adicionar Vendedor" : "Alterar Vendedor";
    if (this.data.isAddMode) {
      this.customerForm = new FormGroup({
        name: new FormControl("", [Validators.required, Validators.min(3)]),
        age: new FormControl("", [Validators.required])
      })
    } else {
      this.customerForm = new FormGroup({
        name: new FormControl(this.data.name, [Validators.required, Validators.min(3)]),
        age: new FormControl(this.data.age, [Validators.required])
      })
    }
  }

  onSubmit(): void {
    if (!this.customerForm.invalid) {
      let value;
      if (this.data.isAddMode) {
        value = { ...this.customerForm.value }
      } else {
        value = { ...this.customerForm.value, id: this.data.id }
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

      this.inputAge.nativeElement.focus();
      this.inputAge.nativeElement.blur();
    }
  }
  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
