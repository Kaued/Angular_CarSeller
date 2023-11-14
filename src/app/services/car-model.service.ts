import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { CarModelValues } from '../interfaces/car-model-values';
import { FormCarModel } from '../interfaces/form-car-model';

@Injectable({
  providedIn: 'root'
})
export class CarModelService {

  private apiUrl = `${environment.baseApiUrl}/api`;

  constructor(private http: HttpClient) { }

  createCarModel(formCarModel: FormCarModel): Observable<FormCarModel> {
    return this.http.post<FormCarModel>(`${this.apiUrl}/carModel`, formCarModel);
  }

  getAllCarModel(filter: string = ""): Observable<CarModelValues[]> {

    if (filter !== "") {
      return this.http.get<CarModelValues[]>(`${this.apiUrl}/carModel?filter=name:like:%${filter}%&with=brand`);
    }
    return this.http.get<CarModelValues[]>(`${this.apiUrl}/carModel?with=brand`);
  }

  getCarModel(id: number): Observable<CarModelValues[]> {

    return this.http.get<CarModelValues[]>(`${this.apiUrl}/carModel/${id}`);
  }

  updateCarModel(formCarModel: FormCarModel): Observable<FormCarModel> {
    return this.http.put<FormCarModel>(`${this.apiUrl}/carModel/${formCarModel.id}`, formCarModel);
  }

  removeCarModel(id: number): Observable<number> {
    return this.http.delete<number>(`${this.apiUrl}/carModel/${id}`);
  }
}
