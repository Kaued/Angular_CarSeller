import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormSeller } from 'src/app/interfaces/form-seller';

@Component({
  selector: 'app-form-seller',
  templateUrl: './form-seller.component.html',
  styleUrls: ['./form-seller.component.scss']
})
export class FormSellerComponent {

  title!: string;
  sellerForm!: FormGroup;
  @ViewChild('inputName') inputName!: ElementRef;
  @ViewChild('inputSalary') inputSalary!: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<FormSellerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormSeller,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.title = this.data.isAddMode ? "Adicionar Vendedor" : "Alterar Vendedor";
    if (this.data.isAddMode) {
      this.sellerForm = new FormGroup({
        name: new FormControl("", [Validators.required, Validators.min(3)]),
        salary: new FormControl("", [Validators.required])
      })
    } else {
      this.sellerForm = new FormGroup({
        name: new FormControl(this.data.name, [Validators.required, Validators.min(3)]),
        salary: new FormControl(this.data.salary, [Validators.required])
      })
    }
  }

  onSubmit(): void {
    if (!this.sellerForm.invalid) {
      let value;
      if (this.data.isAddMode) {
        value = { ...this.sellerForm.value }
      } else {
        value = { ...this.sellerForm.value, id: this.data.id }
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

      this.inputSalary.nativeElement.focus();
      this.inputSalary.nativeElement.blur();
    }
  }
  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
