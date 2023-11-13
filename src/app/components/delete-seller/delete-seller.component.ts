import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SellerValues } from 'src/app/interfaces/seller-values';

@Component({
  selector: 'app-delete-seller',
  templateUrl: './delete-seller.component.html',
  styleUrls: ['./delete-seller.component.scss']
})
export class DeleteSellerComponent {
  title!: string;
  constructor(
    public dialogRef: MatDialogRef<DeleteSellerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SellerValues,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.title = `Deseja realmente exlcuir o usúario ${this.data.name}`
  }

  onDeleteClick(): void{
    this.dialogRef.close({...this.data});
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
