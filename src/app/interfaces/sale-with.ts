export interface SaleWith {
  id?: number,
  total_price?: number,
  sold_data?: Date,
  customer_id: number,
  seller_id: number,
  car_id: number,
  car_image: string,
  payment_method_id: number,
  customer_name: string,
  seller_name: string,
  payment_name: string
}

