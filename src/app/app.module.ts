import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SellerComponent } from './pages/seller/seller.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TableComponent } from './components/table/table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormSellerComponent } from './components/form-seller/form-seller.component';
import { InfoSellerComponent } from './components/info-seller/info-seller.component';
import { DeleteSellerComponent } from './components/delete-seller/delete-seller.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { FormCustomerComponent } from './components/form-customer/form-customer.component';
import { InfoCustomerComponent } from './components/info-customer/info-customer.component';
import { DeleteCustomerComponent } from './components/delete-customer/delete-customer.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { FormPaymentComponent } from './components/form-payment/form-payment.component';
import { InfoPaymentComponent } from './components/info-payment/info-payment.component';
import { DeletePaymentComponent } from './components/delete-payment/delete-payment.component';
import { BrandComponent } from './pages/brand/brand.component';
import { FormBrandComponent } from './components/form-brand/form-brand.component';
import { DeleteBrandComponent } from './components/delete-brand/delete-brand.component';
import { InfoBrandComponent } from './components/info-brand/info-brand.component';
import { DropzoneComponent } from './components/dropzone/dropzone.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CarModelComponent } from './pages/car-model/car-model.component';
import { FormCarModelComponent } from './components/form-car-model/form-car-model.component';
import { DeleteCarModelComponent } from './components/delete-car-model/delete-car-model.component';
import { InfoCarModelComponent } from './components/info-car-model/info-car-model.component';

@NgModule({
  declarations: [
    AppComponent,
    SellerComponent,
    SideNavComponent,
    TableComponent,
    FormSellerComponent,
    InfoSellerComponent,
    DeleteSellerComponent,
    CustomerComponent,
    FormCustomerComponent,
    InfoCustomerComponent,
    DeleteCustomerComponent,
    PaymentComponent,
    FormPaymentComponent,
    InfoPaymentComponent,
    DeletePaymentComponent,
    BrandComponent,
    FormBrandComponent,
    DeleteBrandComponent,
    InfoBrandComponent,
    DropzoneComponent,
    CarModelComponent,
    FormCarModelComponent,
    DeleteCarModelComponent,
    InfoCarModelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatButtonModule,
    FontAwesomeModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    HttpClientModule,
    NgxDropzoneModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
