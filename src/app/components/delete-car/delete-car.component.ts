import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CarValues } from 'src/app/interfaces/car-values';

@Component({
  selector: 'app-delete-car',
  templateUrl: './delete-car.component.html',
  styleUrls: ['./delete-car.component.scss']
})
export class DeleteCarComponent {
  title!: string;
  constructor(
    public dialogRef: MatDialogRef<DeleteCarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CarValues,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.title = `Deseja realmente excluuir o modelo ${this.data.id}`
  }

  onDeleteClick(): void {
    this.dialogRef.close({ ...this.data });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
