import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faRectangleList, faPen, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { DeleteSaleComponent } from 'src/app/components/delete-sale/delete-sale.component';
import { FormSaleComponent } from 'src/app/components/form-sale/form-sale.component';
import { InfoSaleComponent } from 'src/app/components/info-sale/info-sale.component';
import { Actions } from 'src/app/interfaces/actions';
import { ColumnsTable } from 'src/app/interfaces/columns-table';
import { SaleValues } from 'src/app/interfaces/sale-values';
import { SaleWith } from 'src/app/interfaces/sale-with';
import { Search } from 'src/app/interfaces/search';
import { BrandService } from 'src/app/services/brand.service';
import { SaleService } from 'src/app/services/sale.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent {
  isLoading: boolean = false;

  faRectangleList = faRectangleList;
  faPen = faPen;
  faTrash = faTrash;
  faPlus = faPlus;

  columns: ColumnsTable[] = [
    { column: "id", field: "id", name: "Id", type: "text" },
    { column: "total_price", field: "total_price", name: "Total", type: "money" },
    { column: "sold_data", field: "sold_data", name: "Data", type: "date" },
    { column: "customer_name", field: "customer_name", name: "Cliente", type: "text" },
    { column: "seller_name", field: "seller_name", name: "Vendedor", type: "text" },
    { column: "car_image", field: "car_image", name: "Carro", type: "image", baseApiUrL:true },
    { column: "payment_name", field: "payment_name", name: "Pagamento", type: "text" }
  ]

  actions: Actions[] = [
    { target: 'show', action: (id: number) => this.openInfoSale(id) },
    { target: 'edit', action: (id: number) => this.openDialogEdit(id) },
    { target: 'remove', action: (id: number) => this.openDeleteSale(id) },
  ];

  sales: SaleValues[] = [];
  salesList: SaleWith[] = [];
  salesListAuxiliar: SaleWith[] = [];

  displayedColumns: string[] = ["id", "total_price", "sold_data", "customer_name", "seller_name", "car_image", "payment_name", "actions"];

  constructor(public dialog: MatDialog, private saleService: SaleService, private brandService: BrandService) { }

  ngOnInit() {
    this.saleService.getAllSale().subscribe((result) => {
      this.sales = result;
      this.salesListAuxiliar = [];
      this.sales.map((sale) => {
        this.salesListAuxiliar.push({ ...sale, customer_name:sale.customer.name, seller_name:sale.seller.name, payment_name:sale.payment_method.name, car_image: sale.car.image_url });
      });
      this.salesList = this.salesListAuxiliar;
    })
  }

  openDialogCreate(): void {
    const dialogRef = this.dialog.open(FormSaleComponent, {
      data: { name: "", year: "", doors: 0, seat: 0, airbag: false, abs: false, brand_id: 0, isAddMode: true },
    });

    dialogRef.afterClosed().subscribe(resultCreate => {

      if (resultCreate) {
        this.saleService.createSale(resultCreate).subscribe(() => {
          this.saleService.getAllSale().subscribe((result) => {
            this.sales = result;
            this.salesListAuxiliar = [];
            this.sales.map((sale) => {
              this.salesListAuxiliar.push({ ...sale, customer_name:sale.customer.name, seller_name:sale.seller.name, payment_name:sale.payment_method.name, car_image: sale.car.image_url });
            });
            this.salesList = this.salesListAuxiliar;
          })
        });
      }
    });
  }

  openDialogEdit(id: number): void {

    this.saleService.getSale(id).subscribe((result) => {
      const dialogRef = this.dialog.open(FormSaleComponent, {
        data: { ...result, isAddMode: false },
      });

      dialogRef.afterClosed().subscribe(resultEdit => {
        if (resultEdit) {
          this.saleService.updateSale(resultEdit).subscribe(() => {
            this.saleService.getAllSale().subscribe((result) => {
              this.sales = result;
              this.salesListAuxiliar = [];
              this.sales.map((sale) => {
                this.salesListAuxiliar.push({ ...sale, customer_name:sale.customer.name, seller_name:sale.seller.name, payment_name:sale.payment_method.name, car_image: sale.car.image_url });
              });
              this.salesList = this.salesListAuxiliar;
            })
          });
        }
      });

    })

  }

  openInfoSale(id: number) {
    this.saleService.getSale(id).subscribe((result) => {
      const dialogRef = this.dialog.open(InfoSaleComponent, {
        data: { ...result, isAddMode: false },
      });
      dialogRef.afterClosed().subscribe();
    });
  }

  openDeleteSale(id: number) {
    this.saleService.getSale(id).subscribe((result) => {
      const dialogRef = this.dialog.open(DeleteSaleComponent, {
        data: { ...result, isAddMode: false },
      });
      dialogRef.afterClosed().subscribe(resultDel => {
        if (resultDel) {
          this.saleService.removeSale(resultDel.id).subscribe(() => {
            this.saleService.getAllSale().subscribe((result) => {
              this.sales = result;
              this.salesListAuxiliar = [];
              this.sales.map((sale) => {
                this.salesListAuxiliar.push({ ...sale, customer_name:sale.customer.name, seller_name:sale.seller.name, payment_name:sale.payment_method.name, car_image: sale.car.image_url });
              });
              this.salesList = this.salesListAuxiliar;
            })
          });
        }
      });
    });
  }

  searchSale(search: Search) {
    this.saleService.getAllSale(search.search).subscribe((result) => {
      this.sales = result;
      this.salesListAuxiliar = [];
      this.sales.map((sale) => {
        this.salesListAuxiliar.push({ ...sale, customer_name:sale.customer.name, seller_name:sale.seller.name, payment_name:sale.payment_method.name, car_image: sale.car.image_url });
      });
      this.salesList = this.salesListAuxiliar;
    })
  }
}
