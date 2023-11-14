import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faRectangleList, faPen, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { DeleteBrandComponent } from 'src/app/components/delete-brand/delete-brand.component';
import { FormBrandComponent } from 'src/app/components/form-brand/form-brand.component';
import { InfoBrandComponent } from 'src/app/components/info-brand/info-brand.component';
import { Actions } from 'src/app/interfaces/actions';
import { BrandValues } from 'src/app/interfaces/brand-values';
import { ColumnsTable } from 'src/app/interfaces/columns-table';
import { Search } from 'src/app/interfaces/search';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent {
  isLoading: boolean = false;

  faRectangleList = faRectangleList;
  faPen = faPen;
  faTrash = faTrash;
  faPlus = faPlus;

  columns: ColumnsTable[] = [
    { column: "id", field: "id", name: "Id", type: "text" },
    { column: "name", field: "name", name: "Nome", type: "text" },
    { column: "image_url", field: "image_url", name: "Imagem", type: "image", baseApiUrL:true },
  ]

  actions: Actions[] = [
    { target: 'show', action: (id: number) => this.openInfoBrand(id) },
    { target: 'edit', action: (id: number) => this.openDialogEdit(id) },
    { target: 'remove', action: (id: number) => this.openDeleteBrand(id) },
  ];

  brandsList: BrandValues[] = [];

  displayedColumns: string[] = ["id", "name", "image_url", "actions"];

  constructor(public dialog: MatDialog, private brandService: BrandService) { }

  ngOnInit() {
    this.brandService.getAllBrand().subscribe((result) => {
      this.brandsList = result;
    })
  }

  openDialogCreate(): void {
    const dialogRef = this.dialog.open(FormBrandComponent, {
      data: { name: "", image_url: "", isAddMode: true },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        const form = new FormData;

        form.append("name", result.name);
        form.append("image", result.image[0]);
        this.brandService.createBrand(form).subscribe(() => {
          this.brandService.getAllBrand().subscribe((result) => {
            this.brandsList = result
          })
        });
      }
    });
  }

  openDialogEdit(id: number): void {

    this.brandService.getBrand(id).subscribe((result) => {
      const dialogRef = this.dialog.open(FormBrandComponent, {
        data: { ...result, isAddMode: false },
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const form = new FormData;

          form.append("id", result.id);
          form.append("name", result.name);
          form.append("image", result.image[0]);
          form.append("_method", "put");


          this.brandService.updateBrand(form).subscribe(() => {
            this.brandService.getAllBrand().subscribe((result) => {
              this.brandsList = result
            })
          });
        }
      });

    })

  }

  openInfoBrand(id: number) {
    this.brandService.getBrand(id).subscribe((result) => {
      const dialogRef = this.dialog.open(InfoBrandComponent, {
        data: { ...result, isAddMode: false },
      });
      dialogRef.afterClosed().subscribe();
    });
  }

  openDeleteBrand(id: number) {
    this.brandService.getBrand(id).subscribe((result) => {
      const dialogRef = this.dialog.open(DeleteBrandComponent, {
        data: { ...result, isAddMode: false },
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.brandService.removeBrand(result.id).subscribe(() => {
            console.log(1);
            this.brandService.getAllBrand().subscribe((result) => {
              this.brandsList = result;
            })
          });
        }
      });
    });
  }

  searchBrand(search: Search) {
    this.brandService.getAllBrand(search.search).subscribe((result) => {
      this.brandsList = result;
    })
  }
}
