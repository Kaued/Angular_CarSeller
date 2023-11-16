import { CarValues } from "./car-values";
import { CustomerValues } from "./customer-values";
import { PaymentValues } from "./payment-values";
import { SellerValues } from "./seller-values";

export interface SaleValues {
  id?: number,
  total_price?: number,
  sold_data?: Date,
  customer_id: number,
  seller_id: number,
  car_id: number,
  payment_method_id: number,
  customer: CustomerValues,
  car: CarValues,
  seller: SellerValues,
  payment_method: PaymentValues
}
