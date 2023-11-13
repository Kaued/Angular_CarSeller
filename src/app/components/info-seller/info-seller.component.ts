import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormSeller } from 'src/app/interfaces/form-seller';
import { SellerValues } from 'src/app/interfaces/seller-values';

@Component({
  selector: 'app-info-seller',
  templateUrl: './info-seller.component.html',
  styleUrls: ['./info-seller.component.scss']
})
export class InfoSellerComponent {

  title!: string;
  constructor(
    public dialogRef: MatDialogRef<InfoSellerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SellerValues,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(){
    this.title=`Usuário ${this.data.name}`
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
