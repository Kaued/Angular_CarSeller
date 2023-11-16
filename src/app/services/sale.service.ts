import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { FormSale } from '../interfaces/form-sale';
import { SaleValues } from '../interfaces/sale-values';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  private apiUrl = `${environment.baseApiUrl}/api`;

  constructor(private http: HttpClient) { }

  createSale(formSale: FormSale): Observable<FormSale> {
    return this.http.post<FormSale>(`${this.apiUrl}/sale`, formSale);
  }

  getAllSale(filter: string = ""): Observable<SaleValues[]> {

    if (filter !== "") {
      return this.http.get<SaleValues[]>(`${this.apiUrl}/sale?filter=name:like:%${filter}%&with=car,customer,seller,payment`);
    }
    return this.http.get<SaleValues[]>(`${this.apiUrl}/sale?with=car,customer,seller,paymentMethod`);
  }

  getSale(id: number): Observable<SaleValues[]> {

    return this.http.get<SaleValues[]>(`${this.apiUrl}/sale/${id}`);
  }

  updateSale(formSale: FormSale): Observable<FormSale> {
    return this.http.put<FormSale>(`${this.apiUrl}/sale/${formSale.id}`, formSale);
  }

  removeSale(id: number): Observable<number> {
    return this.http.delete<number>(`${this.apiUrl}/sale/${id}`);
  }
}
