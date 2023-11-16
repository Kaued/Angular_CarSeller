import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { CarValues } from '../interfaces/car-values';
import { FormCar } from '../interfaces/form-car';

@Injectable({
  providedIn: 'root'
})
export class CarServiceService {

  private apiUrl = `${environment.baseApiUrl}/api`;

  constructor(private http: HttpClient) { }

  createCar(formCar: FormData): Observable<FormCar> {
    return this.http.post<FormCar>(`${this.apiUrl}/car`, formCar);
  }

  getAllCar(filter: string = ""): Observable<CarValues[]> {

    if (filter !== "") {
      return this.http.get<CarValues[]>(`${this.apiUrl}/car?filter=price:>=:${filter}&with=carModel`);
    }
    return this.http.get<CarValues[]>(`${this.apiUrl}/car?with=carModel`);
  }

  getCar(id: number): Observable<CarValues[]> {

    return this.http.get<CarValues[]>(`${this.apiUrl}/car/${id}`);
  }

  updateCar(formCar: FormData): Observable<FormCar> {
    return this.http.post<FormCar>(`${this.apiUrl}/car/${formCar.get("id")}`, formCar);
  }

  removeCar(id: number): Observable<number> {
    return this.http.delete<number>(`${this.apiUrl}/car/${id}`);
  }
}
