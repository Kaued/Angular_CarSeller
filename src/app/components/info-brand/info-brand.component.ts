import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrandValues } from 'src/app/interfaces/brand-values';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-info-brand',
  templateUrl: './info-brand.component.html',
  styleUrls: ['./info-brand.component.scss']
})
export class InfoBrandComponent {
  title!: string;
  image!: string
  constructor(
    public dialogRef: MatDialogRef<InfoBrandComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BrandValues,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.title = `Marca ${this.data.name}`;
    this.image = `${environment.baseApiUrl}/${this.data.image_url}`;
  }
  onNoClick(): void {
    this.dialogRef.close();
    this.image = `${environment.baseApiUrl}/${this.data.image_url}`;
  }
}
