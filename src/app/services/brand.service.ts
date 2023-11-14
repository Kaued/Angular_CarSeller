import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { FormBrand } from '../interfaces/form-brand';
import { BrandValues } from '../interfaces/brand-values';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private apiUrl = `${environment.baseApiUrl}/api`;

  constructor(private http: HttpClient) { }

  createBrand(formBrand: FormData): Observable<FormBrand> {
    return this.http.post<FormBrand>(`${this.apiUrl}/brand`, formBrand);
  }

  getAllBrand(filter: string = ""): Observable<BrandValues[]> {

    if (filter !== "") {
      return this.http.get<BrandValues[]>(`${this.apiUrl}/brand?filter=name:like:%${filter}%`);
    }
    return this.http.get<BrandValues[]>(`${this.apiUrl}/brand`);
  }

  getBrand(id: number): Observable<BrandValues[]> {

    return this.http.get<BrandValues[]>(`${this.apiUrl}/brand/${id}`);
  }

  updateBrand(formBrand: FormData): Observable<FormBrand> {
    return this.http.post<FormBrand>(`${this.apiUrl}/brand/${formBrand.get("id")}`, formBrand);
  }

  removeBrand(id: number): Observable<number> {
    return this.http.delete<number>(`${this.apiUrl}/brand/${id}`);
  }
}

