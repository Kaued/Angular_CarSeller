import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CarValues } from 'src/app/interfaces/car-values';
import { CustomerValues } from 'src/app/interfaces/customer-values';
import { FormSale } from 'src/app/interfaces/form-sale';
import { PaymentValues } from 'src/app/interfaces/payment-values';
import { SellerValues } from 'src/app/interfaces/seller-values';
import { CarServiceService } from 'src/app/services/car-service.service';
import { CustomerService } from 'src/app/services/customer.service';
import { PaymentService } from 'src/app/services/payment.service';
import { SellerService } from 'src/app/services/seller.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-form-sale',
  templateUrl: './form-sale.component.html',
  styleUrls: ['./form-sale.component.scss']
})
export class FormSaleComponent {
  title!: string;
  saleForm!: FormGroup;
  customers!: CustomerValues[];
  sellers!: SellerValues[];
  cars!: CarValues[];
  payments!: PaymentValues[];
  dateSelect!: Date|null
  @ViewChild('inputCar') inputCar!: ElementRef;
  @ViewChild('inputCustomer') inputCustomer!: ElementRef;
  @ViewChild('inputSeller') inputSeller!: ElementRef;
  @ViewChild('inputPayment') inputPayment!: ElementRef;
  @ViewChild('inputSold') inputSold!: ElementRef;
  baseFileUrl: string = `${environment.baseApiUrl}/storage/`;

  constructor(
    public dialogRef: MatDialogRef<FormSaleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormSale,
    private _snackBar: MatSnackBar, private customerService: CustomerService, private carService: CarServiceService,
    private sellerService: SellerService, private paymentService: PaymentService
  ) { }

  ngOnInit() {
    this.title = this.data.isAddMode ? "Adicionar Modelo" : "Alterar Modelo";
    if (this.data.isAddMode) {
      this.saleForm = new FormGroup({
        customer_id: new FormControl("", [Validators.required, Validators.min(1)]),
        seller_id: new FormControl(0, [Validators.required, Validators.min(1)]),
        car_id: new FormControl(0, [Validators.required, Validators.min(1)]),
        payment_method_id: new FormControl(0, [Validators.required, Validators.min(1)]),
        sold_data: new FormControl(new Date(), [Validators.required])
      })
      this.dateSelect = new Date();
    } else {
      this.saleForm = new FormGroup({
        customer_id: new FormControl(this.data.customer_id, [Validators.required, Validators.min(1)]),
        seller_id: new FormControl(this.data.seller_id, [Validators.required, Validators.min(1)]),
        car_id: new FormControl(this.data.car_id, [Validators.required, Validators.min(1)]),
        payment_method_id: new FormControl(this.data.payment_method_id, [Validators.required, Validators.min(1)]),
        sold_data: new FormControl(this.data.sold_data, [Validators.required]),
        total_price: new FormControl(this.data.total_price, [Validators.required, Validators.min(1)]),

      })
      this.dateSelect = this.data.sold_data!;
    }

    this.customerService.getAllCustomer().subscribe((customers) => {
      this.customers = customers;
    });
    this.carService.getNotSoldCar().subscribe((cars) => {
      this.cars = cars;
    });
    this.sellerService.getAllSeller().subscribe((sellers) => {
      this.sellers = sellers;
    });
    this.paymentService.getAllPayment().subscribe((payments) => {
      this.payments = payments;
    });
  }

  onSubmit(): void {
    this.saleForm.controls['sold_data'].setValue(this.dateSelect);
    if (!this.saleForm.invalid) {
      let value;
      if (this.data.isAddMode) {
        value = { ...this.saleForm.value }
      } else {
        value = { ...this.saleForm.value, id: this.data.id }
      }
      this.dialogRef.close(value);
    } else {
      this._snackBar.open("Campos Invalidos", "Ok", {
        horizontalPosition: "right",
        verticalPosition: "top",
        duration: 5000
      });

      this.inputCar.nativeElement.focus();
      this.inputCar.nativeElement.blur();

      this.inputCustomer.nativeElement.focus();
      this.inputCustomer.nativeElement.blur();

      this.inputSeller.nativeElement.focus();
      this.inputSeller.nativeElement.blur();

      this.inputPayment.nativeElement.focus();
      this.inputPayment.nativeElement.blur();

      this.inputSold.nativeElement.focus();
      this.inputSold.nativeElement.blur();
    }
  }
  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
