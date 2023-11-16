import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CarValues } from 'src/app/interfaces/car-values';
import { BrandService } from 'src/app/services/brand.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-info-car',
  templateUrl: './info-car.component.html',
  styleUrls: ['./info-car.component.scss']
})
export class InfoCarComponent {
  title!: string;
  image!: string;
  constructor(
    public dialogRef: MatDialogRef<InfoCarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CarValues,
    private _snackBar: MatSnackBar, private brandService: BrandService
  ) { }

  ngOnInit() {
    this.title = `Carro ${this.data.car_model?.name}`;
    this.image = `${environment.baseApiUrl}/storage/${this.data.image_url}`;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
