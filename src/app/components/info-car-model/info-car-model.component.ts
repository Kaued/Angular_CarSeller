import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrandValues } from 'src/app/interfaces/brand-values';
import { CarModelValues } from 'src/app/interfaces/car-model-values';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-info-car-model',
  templateUrl: './info-car-model.component.html',
  styleUrls: ['./info-car-model.component.scss']
})
export class InfoCarModelComponent {

  title!: string;
  brand!: BrandValues;
  constructor(
    public dialogRef: MatDialogRef<InfoCarModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CarModelValues,
    private _snackBar: MatSnackBar, private brandService: BrandService
  ) { }

  ngOnInit() {
    this.title = `Usuário ${this.data.name}`;
    this.brandService.getBrand(this.data.brand_id).subscribe((brand)=>{
      this.brand = brand[0];
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
