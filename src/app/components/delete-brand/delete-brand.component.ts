import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrandValues } from 'src/app/interfaces/brand-values';

@Component({
  selector: 'app-delete-brand',
  templateUrl: './delete-brand.component.html',
  styleUrls: ['./delete-brand.component.scss']
})
export class DeleteBrandComponent {
  title!: string;
  constructor(
    public dialogRef: MatDialogRef<DeleteBrandComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BrandValues,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.title = `Deseja realmente excluir a marca ${this.data.name}`
  }

  onDeleteClick(): void {
    this.dialogRef.close({ ...this.data });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
