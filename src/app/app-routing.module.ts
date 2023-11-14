import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerComponent } from './pages/seller/seller.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { BrandComponent } from './pages/brand/brand.component';
import { CarModelComponent } from './pages/car-model/car-model.component';

const routes: Routes = [
  {path:"seller", component:SellerComponent},
  {path:"customer", component:CustomerComponent},
  {path:"payment", component:PaymentComponent},
  {path:"brand", component:BrandComponent},
  {path:"carModel", component:CarModelComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
