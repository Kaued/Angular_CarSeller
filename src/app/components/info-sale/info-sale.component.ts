import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrandValues } from 'src/app/interfaces/brand-values';
import { SaleValues } from 'src/app/interfaces/sale-values';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-info-sale',
  templateUrl: './info-sale.component.html',
  styleUrls: ['./info-sale.component.scss']
})
export class InfoSaleComponent {
  title!: string;
  brand!: BrandValues;
  image!: string;
  constructor(
    public dialogRef: MatDialogRef<InfoSaleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SaleValues,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.title = `Venda ${this.data.id}`;
    this.image = `${environment.baseApiUrl}/storage/${this.data.car.image_url}`;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
