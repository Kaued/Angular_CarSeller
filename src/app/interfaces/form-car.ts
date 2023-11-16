import { CarModelValues } from "./car-model-values";

export interface FormCar {
  isAddMode: boolean,
  id?: number,
  car_model_id: number,
  price: number,
  km: number,
  sold: boolean,
  image_url?:string,
  image: File,
  car_model?: CarModelValues
}
