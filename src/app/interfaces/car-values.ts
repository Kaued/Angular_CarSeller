import { CarModelValues } from "./car-model-values"

export interface CarValues {
  id?: number,
  car_model_id: number,
  price: number,
  km: number,
  sold: boolean,
  image_url:string,
  car_model?: CarModelValues
}

