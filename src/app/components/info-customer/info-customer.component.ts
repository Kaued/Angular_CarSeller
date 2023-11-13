import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerValues } from 'src/app/interfaces/customer-values';

@Component({
  selector: 'app-info-customer',
  templateUrl: './info-customer.component.html',
  styleUrls: ['./info-customer.component.scss']
})
export class InfoCustomerComponent {

  title!: string;
  constructor(
    public dialogRef: MatDialogRef<InfoCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CustomerValues,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.title = `Usuário ${this.data.name}`
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
