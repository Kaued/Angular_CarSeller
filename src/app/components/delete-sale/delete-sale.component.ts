import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SaleValues } from 'src/app/interfaces/sale-values';

@Component({
  selector: 'app-delete-sale',
  templateUrl: './delete-sale.component.html',
  styleUrls: ['./delete-sale.component.scss']
})
export class DeleteSaleComponent {
  title!: string;
  constructor(
    public dialogRef: MatDialogRef<DeleteSaleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SaleValues,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.title = `Deseja realmente excluuir a venda ${this.data.id}`
  }

  onDeleteClick(): void {
    this.dialogRef.close({ ...this.data });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
