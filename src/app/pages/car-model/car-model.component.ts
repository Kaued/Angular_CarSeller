import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faRectangleList, faPen, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { DeleteCarModelComponent } from 'src/app/components/delete-car-model/delete-car-model.component';
import { FormCarModelComponent } from 'src/app/components/form-car-model/form-car-model.component';
import { InfoCarModelComponent } from 'src/app/components/info-car-model/info-car-model.component';
import { Actions } from 'src/app/interfaces/actions';
import { CarModelValues } from 'src/app/interfaces/car-model-values';
import { ColumnsTable } from 'src/app/interfaces/columns-table';
import { Search } from 'src/app/interfaces/search';
import { CarModelService } from 'src/app/services/car-model.service';

@Component({
  selector: 'app-car-model',
  templateUrl: './car-model.component.html',
  styleUrls: ['./car-model.component.scss']
})
export class CarModelComponent {
  isLoading: boolean = false;

  faRectangleList = faRectangleList;
  faPen = faPen;
  faTrash = faTrash;
  faPlus = faPlus;

  columns: ColumnsTable[] = [
    { column: "id", field: "id", name: "Id", type: "text" },
    { column: "name", field: "name", name: "Nome", type: "text" },
    { column: "year", field: "year", name: "Ano", type: "text" },
    { column: "doors", field: "doors", name: "Portas", type: "text" },
    { column: "seat", field: "seat", name: "Assentos", type: "text" },
    { column: "airbag", field: "airbag", name: "Airbag", type: "text" },
    { column: "abs", field: "abs", name: "abs", type: "text" },
    { column: "brand", field: "brand_id", name: "Marca", type: "text" },
  ]

  actions: Actions[] = [
    { target: 'show', action: (id: number) => this.openInfoCarModel(id) },
    { target: 'edit', action: (id: number) => this.openDialogEdit(id) },
    { target: 'remove', action: (id: number) => this.openDeleteCarModel(id) },
  ];

  carModelsList: CarModelValues[] = [];

  displayedColumns: string[] = ["id", "name", "year", "doors", "seat", "airbag", "abs", "brand", "actions"];

  constructor(public dialog: MatDialog, private carModelService: CarModelService) { }

  ngOnInit() {
    this.carModelService.getAllCarModel().subscribe((result) => {
      this.carModelsList = result;
    })
  }

  openDialogCreate(): void {
    const dialogRef = this.dialog.open(FormCarModelComponent, {
      data: { name: "", year: "", doors: 0, seat:0, airbag:false, abs: false, brand_id:0, isAddMode: true },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        console.log(result);
        this.carModelService.createCarModel(result).subscribe(() => {
          this.carModelService.getAllCarModel().subscribe((result) => {
            this.carModelsList = result
          })
        });
      }
    });
  }

  openDialogEdit(id: number): void {

    this.carModelService.getCarModel(id).subscribe((result) => {
      const dialogRef = this.dialog.open(FormCarModelComponent, {
        data: { ...result, isAddMode: false },
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.carModelService.updateCarModel(result).subscribe(() => {
            this.carModelService.getAllCarModel().subscribe((result) => {
              this.carModelsList = result
            })
          });
        }
      });

    })

  }

  openInfoCarModel(id: number) {
    this.carModelService.getCarModel(id).subscribe((result) => {
      const dialogRef = this.dialog.open(InfoCarModelComponent, {
        data: { ...result, isAddMode: false },
      });
      dialogRef.afterClosed().subscribe();
    });
  }

  openDeleteCarModel(id: number) {
    this.carModelService.getCarModel(id).subscribe((result) => {
      const dialogRef = this.dialog.open(DeleteCarModelComponent, {
        data: { ...result, isAddMode: false },
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.carModelService.removeCarModel(result.id).subscribe(() => {
            console.log(1);
            this.carModelService.getAllCarModel().subscribe((result) => {
              this.carModelsList = result;
            })
          });
        }
      });
    });
  }

  searchCarModel(search: Search) {
    this.carModelService.getAllCarModel(search.search).subscribe((result) => {
      this.carModelsList = result;
    })
  }
}
