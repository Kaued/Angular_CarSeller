import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faRectangleList, faPen, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { DeletePaymentComponent } from 'src/app/components/delete-payment/delete-payment.component';
import { FormPaymentComponent } from 'src/app/components/form-payment/form-payment.component';
import { InfoPaymentComponent } from 'src/app/components/info-payment/info-payment.component';
import { Actions } from 'src/app/interfaces/actions';
import { ColumnsTable } from 'src/app/interfaces/columns-table';
import { PaymentValues } from 'src/app/interfaces/payment-values';
import { Search } from 'src/app/interfaces/search';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {

  isLoading: boolean = false;

  faRectangleList = faRectangleList;
  faPen = faPen;
  faTrash = faTrash;
  faPlus = faPlus;

  columns: ColumnsTable[] = [
    { column: "id", field: "id", name: "Id", type: "text" },
    { column: "name", field: "name", name: "Nome", type: "text" },
    { column: "tax", field: "tax", name: "Taxa", type: "text" },
  ]

  actions: Actions[] = [
    { target: 'show', action: (id: number) => this.openInfoPayment(id) },
    { target: 'edit', action: (id: number) => this.openDialogEdit(id) },
    { target: 'remove', action: (id: number) => this.openDeletePayment(id) },
  ];

  paymentsList: PaymentValues[] = [];

  displayedColumns: string[] = ["id", "name", "tax", "actions"];

  constructor(public dialog: MatDialog, private paymentService: PaymentService) { }

  ngOnInit() {
    this.paymentService.getAllPayment().subscribe((result) => {
      this.paymentsList = result;
    })
  }

  openDialogCreate(): void {
    const dialogRef = this.dialog.open(FormPaymentComponent, {
      data: { name: "", tax: "", isAddMode: true },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        console.log(result);
        this.paymentService.createPayment(result).subscribe(() => {
          this.paymentService.getAllPayment().subscribe((result) => {
            this.paymentsList = result
          })
        });
      }
    });
  }

  openDialogEdit(id: number): void {

    this.paymentService.getPayment(id).subscribe((result) => {
      const dialogRef = this.dialog.open(FormPaymentComponent, {
        data: { ...result, isAddMode: false },
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.paymentService.updatePayment(result).subscribe(() => {
            this.paymentService.getAllPayment().subscribe((result) => {
              this.paymentsList = result
            })
          });
        }
      });

    })

  }

  openInfoPayment(id: number) {
    this.paymentService.getPayment(id).subscribe((result) => {
      const dialogRef = this.dialog.open(InfoPaymentComponent, {
        data: { ...result, isAddMode: false },
      });
      dialogRef.afterClosed().subscribe();
    });
  }

  openDeletePayment(id: number) {
    this.paymentService.getPayment(id).subscribe((result) => {
      const dialogRef = this.dialog.open(DeletePaymentComponent, {
        data: { ...result, isAddMode: false },
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.paymentService.removePayment(result.id).subscribe(() => {
            console.log(1);
            this.paymentService.getAllPayment().subscribe((result) => {
              this.paymentsList = result;
            })
          });
        }
      });
    });
  }

  searchPayment(search: Search) {
    this.paymentService.getAllPayment(search.search).subscribe((result) => {
      this.paymentsList = result;
    })
  }
}
