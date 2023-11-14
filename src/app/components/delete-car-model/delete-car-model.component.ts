import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CarModelValues } from 'src/app/interfaces/car-model-values';

@Component({
  selector: 'app-delete-car-model',
  templateUrl: './delete-car-model.component.html',
  styleUrls: ['./delete-car-model.component.scss']
})
export class DeleteCarModelComponent {

  title!: string;
  constructor(
    public dialogRef: MatDialogRef<DeleteCarModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CarModelValues,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.title = `Deseja realmente excluuir o modelo ${this.data.name}`
  }

  onDeleteClick(): void {
    this.dialogRef.close({ ...this.data });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
