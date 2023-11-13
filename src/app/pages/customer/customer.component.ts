import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faPen, faPlus, faRectangleList, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DeleteCustomerComponent } from 'src/app/components/delete-customer/delete-customer.component';
import { FormCustomerComponent } from 'src/app/components/form-customer/form-customer.component';
import { InfoCustomerComponent } from 'src/app/components/info-customer/info-customer.component';
import { Actions } from 'src/app/interfaces/actions';
import { ColumnsTable } from 'src/app/interfaces/columns-table';
import { CustomerValues } from 'src/app/interfaces/customer-values';
import { Search } from 'src/app/interfaces/search';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {
  isLoading: boolean = false;

  faRectangleList = faRectangleList;
  faPen = faPen;
  faTrash = faTrash;
  faPlus = faPlus;

  columns: ColumnsTable[] = [
    { column: "id", field: "id", name: "Id", type: "text" },
    { column: "name", field: "name", name: "Nome", type: "text" },
    { column: "age", field: "age", name: "Idade", type: "text" },
  ]

  actions: Actions[] = [
    { target: 'show', action: (id: number) => this.openInfoCustomer(id) },
    { target: 'edit', action: (id: number) => this.openDialogEdit(id) },
    { target: 'remove', action: (id: number) => this.openDeleteCustomer(id) },
  ];

  customersList: CustomerValues[] = [];

  displayedColumns: string[] = ["id", "name", "age", "actions"];

  constructor(public dialog: MatDialog, private customerService: CustomerService) { }

  ngOnInit() {
    this.customerService.getAllCustomer().subscribe((result) => {
      this.customersList = result;
    })
  }

  openDialogCreate(): void {
    const dialogRef = this.dialog.open(FormCustomerComponent, {
      data: { name: "", age: "", isAddMode: true },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        console.log(result);
        this.customerService.createCustomer(result).subscribe(() => {
          this.customerService.getAllCustomer().subscribe((result) => {
            this.customersList = result
          })
        });
      }
    });
  }

  openDialogEdit(id: number): void {

    this.customerService.getCustomer(id).subscribe((result) => {
      const dialogRef = this.dialog.open(FormCustomerComponent, {
        data: { ...result, isAddMode: false },
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.customerService.updateCustomer(result).subscribe(() => {
            this.customerService.getAllCustomer().subscribe((result) => {
              this.customersList = result
            })
          });
        }
      });

    })

  }

  openInfoCustomer(id: number) {
    this.customerService.getCustomer(id).subscribe((result) => {
      const dialogRef = this.dialog.open(InfoCustomerComponent, {
        data: { ...result, isAddMode: false },
      });
      dialogRef.afterClosed().subscribe();
    });
  }

  openDeleteCustomer(id: number) {
    this.customerService.getCustomer(id).subscribe((result) => {
      const dialogRef = this.dialog.open(DeleteCustomerComponent, {
        data: { ...result, isAddMode: false },
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.customerService.removeCustomer(result.id).subscribe(() => {
            console.log(1);
            this.customerService.getAllCustomer().subscribe((result) => {
              this.customersList = result;
            })
          });
        }
      });
    });
  }

  searchCustomer(search: Search) {
    this.customerService.getAllCustomer(search.search).subscribe((result) => {
      this.customersList = result;
    })
  }
}
