import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrandValues } from 'src/app/interfaces/brand-values';
import { FormCarModel } from 'src/app/interfaces/form-car-model';
import { BrandService } from 'src/app/services/brand.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-form-car-model',
  templateUrl: './form-car-model.component.html',
  styleUrls: ['./form-car-model.component.scss']
})
export class FormCarModelComponent {
  title!: string;
  carModelForm!: FormGroup;
  brands!:BrandValues[];
  @ViewChild('inputName') inputName!: ElementRef;
  @ViewChild('inputYear') inputYear!: ElementRef;
  @ViewChild('inputDoors') inputDoors!: ElementRef;
  @ViewChild('inputSeat') inputSeat!: ElementRef;
  @ViewChild('inputBrandId') inputBrandId!: ElementRef;
  baseFileUrl: string = `${environment.baseApiUrl}/storage/`;

  constructor(
    public dialogRef: MatDialogRef<FormCarModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormCarModel,
    private _snackBar: MatSnackBar, private brandService : BrandService
  ) { }

  ngOnInit() {
    this.title = this.data.isAddMode ? "Adicionar Modelo" : "Alterar Modelo";
    if (this.data.isAddMode) {
      this.carModelForm = new FormGroup({
        name: new FormControl("", [Validators.required, Validators.min(3)]),
        year: new FormControl(0, [Validators.required]),
        doors: new FormControl(0, [Validators.required]),
        seat: new FormControl(0, [Validators.required]),
        airbag: new FormControl(false, [Validators.required]),
        abs: new FormControl(false, [Validators.required]),
        brand_id: new FormControl("", [Validators.required]),
      })
    } else {
      this.carModelForm = new FormGroup({
        name: new FormControl(this.data.name, [Validators.required, Validators.min(3)]),
        year: new FormControl(this.data.year, [Validators.required]),
        doors: new FormControl(this.data.doors, [Validators.required]),
        seat: new FormControl(this.data.seat, [Validators.required]),
        airbag: new FormControl(this.data.airbag, [Validators.required]),
        abs: new FormControl(this.data.abs, [Validators.required]),
        brand_id: new FormControl(this.data.brand_id, [Validators.required]),
      })
    }

    this.brandService.getAllBrand().subscribe((brands)=>{
      this.brands=brands;
    });
  }

  onSubmit(): void {
    if (!this.carModelForm.invalid) {
      let value;
      if (this.data.isAddMode) {
        value = { ...this.carModelForm.value }
      } else {
        value = { ...this.carModelForm.value, id: this.data.id }
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

      this.inputYear.nativeElement.focus();
      this.inputYear.nativeElement.blur();

      this.inputDoors.nativeElement.focus();
      this.inputDoors.nativeElement.blur();

      this.inputSeat.nativeElement.focus();
      this.inputSeat.nativeElement.blur();

      this.inputBrandId.nativeElement.focus();
      this.inputBrandId.nativeElement.blur();
    }
  }
  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
