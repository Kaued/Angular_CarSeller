import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CarModelValues } from 'src/app/interfaces/car-model-values';
import { FormCar } from 'src/app/interfaces/form-car';
import { CarModelService } from 'src/app/services/car-model.service';
import { DownloadFileService } from 'src/app/services/download-file.service';

@Component({
  selector: 'app-form-car',
  templateUrl: './form-car.component.html',
  styleUrls: ['./form-car.component.scss']
})
export class FormCarComponent {
  title!: string;
  carForm!: FormGroup;
  carModels!: CarModelValues[];
  @ViewChild('inputName') inputName!: ElementRef;
  initialFile: File[] = [];

  constructor(
    public dialogRef: MatDialogRef<FormCarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormCar,
    private _snackBar: MatSnackBar, private downloadService: DownloadFileService, private carModelsService: CarModelService
  ) { }

  ngOnInit() {
    this.title = this.data.isAddMode ? "Adicionar Marca" : "Alterar Marca";
    if (this.data.isAddMode) {
      this.carForm = new FormGroup({
        car_model_id: new FormControl(0, [Validators.required]),
        price: new FormControl(0, [Validators.required, Validators.min(1)]),
        km: new FormControl(0, [Validators.required, Validators.min(0)]),
        image: new FormControl([], [Validators.required])
      })
    } else {

      this.carForm = new FormGroup({
        car_model_id: new FormControl(this.data.car_model_id, [Validators.required]),
        price: new FormControl(this.data.price, [Validators.required, Validators.min(1)]),
        km: new FormControl(this.data.km, [Validators.required, Validators.min(0)]),
        sold: new FormControl(this.data.sold, [Validators.required, Validators.min(0)]),
        image: new FormControl([], [Validators.required])
      });
      this.downloadService.getFile(this.data.image_url!).subscribe((result) => {
        this.initialFile.push(new File([result], String(this.data.id)));
        this.carForm.controls["image"].setValue(this.initialFile);
      });

    }

    this.carModelsService.getAllCarModel().subscribe((result)=>{
      this.carModels=result;
    })
  }

  onChangeFile(event: File[]) {
    this.carForm.controls["image"].setValue(event);
  }
  onSubmit(): void {
    if (!this.carForm.invalid) {
      let value;
      if (this.data.isAddMode) {
        value = { ...this.carForm.value }
      } else {
        value = { ...this.carForm.value, id: this.data.id }
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
    }
  }
  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
