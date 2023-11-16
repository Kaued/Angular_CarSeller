import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faRectangleList, faPen, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { DeleteCarComponent } from 'src/app/components/delete-car/delete-car.component';
import { FormCarComponent } from 'src/app/components/form-car/form-car.component';
import { InfoCarComponent } from 'src/app/components/info-car/info-car.component';
import { Actions } from 'src/app/interfaces/actions';
import { CarValues } from 'src/app/interfaces/car-values';
import { CarWithModel } from 'src/app/interfaces/car-with-model';
import { ColumnsTable } from 'src/app/interfaces/columns-table';
import { Search } from 'src/app/interfaces/search';
import { BrandService } from 'src/app/services/brand.service';
import { CarServiceService } from 'src/app/services/car-service.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent {
  isLoading: boolean = false;

  faRectangleList = faRectangleList;
  faPen = faPen;
  faTrash = faTrash;
  faPlus = faPlus;

  columns: ColumnsTable[] = [
    { column: "id", field: "id", name: "Id", type: "text" },
    { column: "image_url", field: "image_url", name: "Imagem", type: "image", baseApiUrL: true },
    { column: "name", field: "name", name: "Modelo", type: "text" },
    { column: "year", field: "year", name: "Ano", type: "text" },
    { column: "price", field: "price", name: "Preço", type: "money" },
    { column: "km", field: "km", name: "Km", type: "text" },
    { column: "sold", field: "sold", name: "Vendido", type: "boolean" },
  ]

  actions: Actions[] = [
    { target: 'show', action: (id: number) => this.openInfoCar(id) },
    { target: 'edit', action: (id: number) => this.openDialogEdit(id) },
    { target: 'remove', action: (id: number) => this.openDeleteCar(id) },
  ];

  cars: CarValues[] = [];
  carsList: CarWithModel[] = [];
  carsListAuxiliar: CarWithModel[] = [];

  displayedColumns: string[] = ["id", "image_url", "name", "year", "sold", "price", "km", "actions"];

  constructor(public dialog: MatDialog, private carService: CarServiceService, private brandService: BrandService) { }

  ngOnInit() {
    this.carService.getAllCar().subscribe((result) => {
      this.cars = result;
      this.carsListAuxiliar = [];
      this.cars.map((car) => {
        this.carsListAuxiliar.push({ ...car, abs: car.car_model?.abs!, name: car.car_model?.name!, year:car.car_model?.year!, doors: car.car_model?.doors!, airbag: car.car_model?.airbag!, brand_id:car.car_model?.brand_id!, seat: car.car_model?.seat! });
      });
      this.carsList = this.carsListAuxiliar;
      console.log(this.carsListAuxiliar);
    })
  }

  openDialogCreate(): void {
    const dialogRef = this.dialog.open(FormCarComponent, {
      data: { name: "", year: "", doors: 0, seat: 0, airbag: false, abs: false, brand_id: 0, isAddMode: true },
    });

    dialogRef.afterClosed().subscribe(resultCreate => {

      if (resultCreate) {
        const form = new FormData();
        form.append("car_model_id", resultCreate.car_model_id);
        form.append("price", resultCreate.price);
        form.append("km", resultCreate.km);
        form.append("image", resultCreate.image[0]);
        this.carService.createCar(form).subscribe(() => {
          this.carService.getAllCar().subscribe((result) => {
            this.cars = result;
            this.carsListAuxiliar = [];
            this.cars.map((car) => {
              this.carsListAuxiliar.push({ ...car, abs: car.car_model?.abs!, name: car.car_model?.name!, year:car.car_model?.year!, doors: car.car_model?.doors!, airbag: car.car_model?.airbag!, brand_id:car.car_model?.brand_id!, seat: car.car_model?.seat! });
            });
            this.carsList = this.carsListAuxiliar;
          })
        });
      }
    });
  }

  openDialogEdit(id: number): void {

    this.carService.getCar(id).subscribe((result) => {
      const dialogRef = this.dialog.open(FormCarComponent, {
        data: { ...result, isAddMode: false },
      });

      dialogRef.afterClosed().subscribe(resultEdit => {
        if (resultEdit) {
          const form = new FormData();
          form.append("car_model_id", resultEdit.car_model_id);
          form.append("id", resultEdit.id);
          form.append("price", resultEdit.price);
          form.append("km", resultEdit.km);
          form.append("image", resultEdit.image[0]);
          form.append("sold", resultEdit.sold ? '1' : '0');
          form.append("_method", "put");

          this.carService.updateCar(form).subscribe(() => {
            this.carService.getAllCar().subscribe((resultConst) => {
              this.cars = resultConst;
              this.carsListAuxiliar = [];
              this.cars.map((car) => {
                this.carsListAuxiliar.push({ ...car, abs: car.car_model?.abs!, name: car.car_model?.name!, year:car.car_model?.year!, doors: car.car_model?.doors!, airbag: car.car_model?.airbag!, brand_id:car.car_model?.brand_id!, seat: car.car_model?.seat! });
              });
              this.carsList = this.carsListAuxiliar;
            })
          });
        }
      });

    })

  }

  openInfoCar(id: number) {
    this.carService.getCar(id).subscribe((result) => {
      const dialogRef = this.dialog.open(InfoCarComponent, {
        data: { ...result, isAddMode: false },
      });
      dialogRef.afterClosed().subscribe();
    });
  }

  openDeleteCar(id: number) {
    this.carService.getCar(id).subscribe((result) => {
      const dialogRef = this.dialog.open(DeleteCarComponent, {
        data: { ...result, isAddMode: false },
      });
      dialogRef.afterClosed().subscribe(resultDel => {
        if (resultDel) {
          this.carService.removeCar(resultDel.id).subscribe(() => {
            this.carService.getAllCar().subscribe((result) => {
              this.cars = result;
              this.carsListAuxiliar = [];
              this.cars.map((car) => {
                this.carsListAuxiliar.push({ ...car, abs: car.car_model?.abs!, name: car.car_model?.name!, year:car.car_model?.year!, doors: car.car_model?.doors!, airbag: car.car_model?.airbag!, brand_id:car.car_model?.brand_id!, seat: car.car_model?.seat! });
              });
              this.carsList = this.carsListAuxiliar;
            })
          });
        }
      });
    });
  }

  searchCar(search: Search) {
    this.carService.getAllCar(search.search).subscribe((result) => {
      this.cars = result;
      this.carsListAuxiliar = [];
      this.cars.map((car) => {
        this.carsListAuxiliar.push({ ...car, abs: car.car_model?.abs!, name: car.car_model?.name!, year:car.car_model?.year!, doors: car.car_model?.doors!, airbag: car.car_model?.airbag!, brand_id:car.car_model?.brand_id!, seat: car.car_model?.seat! });
      });
      this.carsList = this.carsListAuxiliar;
    })
  }
}
