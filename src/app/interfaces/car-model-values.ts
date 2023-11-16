import { BrandValues } from "./brand-values";

export interface CarModelValues {
    id?: number,
    name: string,
    year: number,
    doors: number,
    seat: number,
    airbag:boolean,
    abs:boolean,
    brand_id: number,
    brand: BrandValues
}
