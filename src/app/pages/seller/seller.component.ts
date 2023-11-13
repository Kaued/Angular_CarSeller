import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faPen, faPlus, faRectangleList, faTrash, fas } from '@fortawesome/free-solid-svg-icons';
import { DeleteSellerComponent } from 'src/app/components/delete-seller/delete-seller.component';
import { FormSellerComponent } from 'src/app/components/form-seller/form-seller.component';
import { InfoSellerComponent } from 'src/app/components/info-seller/info-seller.component';
import { Actions } from 'src/app/interfaces/actions';
import { ColumnsTable } from 'src/app/interfaces/columns-table';
import { FormSeller } from 'src/app/interfaces/form-seller';
import { Search } from 'src/app/interfaces/search';
import { SellerValues } from 'src/app/interfaces/seller-values';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss']
})
export class SellerComponent {

  isLoading: boolean = false;

  faRectangleList = faRectangleList;
  faPen = faPen;
  faTrash = faTrash;
  faPlus = faPlus;

  columns: ColumnsTable[] = [
    { column: "id", field: "id", name: "Id", type: "text" },
    { column: "name", field: "name", name: "Nome", type: "text" },
    { column: "salary", field: "salary", name: "Salário", type: "money" },
  ]

  actions: Actions[] = [
    { target: 'show', action: (id: number) => this.openInfoSeller(id) },
    { target: 'edit', action: (id: number) => this.openDialogEdit(id) },
    { target: 'remove', action: (id: number) => this.openDeleteSeller(id) },
  ];

  sellersList: SellerValues[] = [];

  displayedColumns: string[] = ["id", "name", "salary", "actions"];

  constructor(public dialog: MatDialog, private sellerService: SellerService) { }

  ngOnInit() {
    this.sellerService.getAllSeller().subscribe((result) => {
      this.sellersList = result;
    })
  }

  openDialogCreate(): void {
    const dialogRef = this.dialog.open(FormSellerComponent, {
      data: { name: "", salary: "", isAddMode: true },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        console.log(result);
        this.sellerService.createSeller(result).subscribe(() => {
          this.sellerService.getAllSeller().subscribe((result) => {
            this.sellersList = result
          })
        });
      }
    });
  }

  openDialogEdit(id: number): void {

    this.sellerService.getSeller(id).subscribe((result) => {
      const dialogRef = this.dialog.open(FormSellerComponent, {
        data: { ...result, isAddMode: false },
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.sellerService.updateSeller(result).subscribe(() => {
            this.sellerService.getAllSeller().subscribe((result) => {
              this.sellersList = result
            })
          });
        }
      });

    })

  }

  openInfoSeller(id: number) {
    this.sellerService.getSeller(id).subscribe((result) => {
      const dialogRef = this.dialog.open(InfoSellerComponent, {
        data: { ...result, isAddMode: false },
      });
      dialogRef.afterClosed().subscribe();
    });
  }

  openDeleteSeller(id: number) {
    this.sellerService.getSeller(id).subscribe((result) => {
      const dialogRef = this.dialog.open(DeleteSellerComponent, {
        data: { ...result, isAddMode: false },
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.sellerService.removeSeller(result.id).subscribe(() => {
            console.log(1); 
            this.sellerService.getAllSeller().subscribe((result) => {
              this.sellersList = result;
            })
          });
        }
      });
    });
  }

  searchSeller(search: Search) {
      this.sellerService.getAllSeller(search.search).subscribe((result) => {
        this.sellersList = result;
      })
    }
}
