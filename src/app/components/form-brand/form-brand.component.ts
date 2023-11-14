import { trigger } from '@angular/animations';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBrand } from 'src/app/interfaces/form-brand';
import { DownloadFileService } from 'src/app/services/download-file.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-form-brand',
  templateUrl: './form-brand.component.html',
  styleUrls: ['./form-brand.component.scss']
})
export class FormBrandComponent {
  title!: string;
  brandForm!: FormGroup;
  @ViewChild('inputName') inputName!: ElementRef;
  initialFile: File[] = [];

  constructor(
    public dialogRef: MatDialogRef<FormBrandComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormBrand,
    private _snackBar: MatSnackBar, private downloadService: DownloadFileService
  ) { }

  ngOnInit() {
    this.title = this.data.isAddMode ? "Adicionar Marca" : "Alterar Marca";
    if (this.data.isAddMode) {
      this.brandForm = new FormGroup({
        name: new FormControl("", [Validators.required, Validators.min(3)]),
        image: new FormControl([], [Validators.required])
      })
    } else {

      this.brandForm = new FormGroup({
        name: new FormControl(this.data.name, [Validators.required, Validators.min(3)]),
        image: new FormControl([], [Validators.required])
      });
      this.downloadService.getFile(this.data.image_url!).subscribe((result) => {
        this.initialFile.push(new File([result], this.data.name));
        this.brandForm.controls["image"].setValue(this.initialFile);
      });


    }
  }

  onChangeFile(event: File[]) {
    this.brandForm.controls["image"].setValue(event);
  }
  onSubmit(): void {
    if (!this.brandForm.invalid) {
      let value;
      if (this.data.isAddMode) {
        value = { ...this.brandForm.value }
      } else {
        value = { ...this.brandForm.value, id: this.data.id }
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
